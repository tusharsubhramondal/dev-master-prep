# Complete Apache Kafka Master Learning & Interview Guide

A comprehensive, production-grade guide covering **Apache Kafka** architecture, event streaming fundamentals, producer mechanics, consumer group rebalancing, Kafka Connect, Kafka Streams, Schema Registry, and KRaft cluster operations. Each module includes step-by-step working code examples for both **Node.js** (`kafkajs`) and **Laravel** (`mateusjunges/laravel-kafka`).

---

## Table of Contents
1. [Module 1: Apache Kafka Core Architecture](#module-1-apache-kafka-core-architecture)
2. [Module 2: Producer Mechanics, Partitioning & Idempotence](#module-2-producer-mechanics-partitioning--idempotence)
3. [Module 3: Consumer Groups, Offset Commit & Rebalance Protocol](#module-3-consumer-groups-offset-commit--rebalance-protocol)
4. [Module 4: Kafka Connect & Change Data Capture (CDC)](#module-4-kafka-connect--change-data-capture-cdc)
5. [Module 5: Kafka Streams & Event Processing (KStream vs KTable)](#module-5-kafka-streams--event-processing-kstream-vs-ktable)
6. [Module 6: Schema Registry & Apache Avro Serialization](#module-6-schema-registry--apache-avro-serialization)
7. [Module 7: KRaft Consensus, Security (SASL/SSL) & Monitoring](#module-7-kraft-consensus-security-saslssl--monitoring)
8. [Module 8: Top Kafka Interview Questions & Answers](#module-8-top-kafka-interview-questions--answers)

---

# Module 1: Apache Kafka Core Architecture

### 1.1 What is Apache Kafka?
Apache Kafka is a distributed event streaming platform built around an **immutable, append-only commit log**. Unlike traditional message brokers (like RabbitMQ) that push messages to consumers and delete them upon acknowledgment, Kafka persists all records into ordered log files on disk for a configurable retention period (e.g., 7 days or log compaction).

### 1.2 Key Architecture Components
- **Brokers:** Servers in a Kafka cluster that store messages on disk and serve client requests.
- **Topics:** Logical categories or feed names to which records are published.
- **Partitions:** Sub-logs within a topic distributed across multiple brokers for horizontal scaling.
- **Offsets:** Sequential integer IDs assigned to each record within a partition.
- **Producers:** Applications that write records to Kafka topics.
- **Consumers:** Applications that subscribe to topics and read records by tracking their offset position.

```
+-----------------------------------------------------------------------+
|                            KAFKA CLUSTER                              |
|                                                                       |
|  +---------------------------+     +-------------------------------+  |
|  |     BROKER 1              |     |         BROKER 2              |  |
|  |  Topic: order-events      |     |  Topic: order-events          |  |
|  |  +---------------------+  |     |  +-------------------------+  |  |
|  |  | Partition 0 (Leader)|  |     |  | Partition 1 (Leader)    |  |  |
|  |  | Offset: 0, 1, 2, 3..|  |     |  | Offset: 0, 1, 2, 3..    |  |  |
|  |  +---------------------+  |     |  +-------------------------+  |  |
|  +---------------------------+     +-------------------------------+  |
+-----------------------------------------------------------------------+
        ▲                                          │
        │ Writes (Key Hashed)                      │ Reads via Offset
+-------┴-------------+                    +-------▼------------------+
|  PRODUCER           |                    |  CONSUMER GROUP          |
|  (Node.js / Laravel)|                    |  (Notification / Billing)|
+---------------------+                    +--------------------------+
```

---

### 1.3 Node.js & Laravel Implementation (Module 1)

#### A. Node.js (`kafkajs`) Setup:
```javascript
// producer-basic.js
import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner
});

export async function publishOrder() {
  await producer.connect();
  
  await producer.send({
    topic: 'order-events',
    messages: [
      {
        key: 'user-101', // Hash key routes all user-101 events to SAME partition!
        value: JSON.stringify({ orderId: 'ord_99', amount: 250.00, status: 'CREATED' })
      }
    ]
  });

  console.log('Event appended to Kafka commit log.');
  await producer.disconnect();
}
```

#### B. Laravel (`mateusjunges/laravel-kafka`) Setup:
```php
<?php
namespace App\Services;

use Junges\Kafka\Facades\Kafka;
use Junges\Kafka\Message\Message;

class OrderEventPublisher
{
    public function publishOrderCreated(array $order): void
    {
        $message = new Message(
            key: (string) $order['user_id'],
            body: [
                'orderId' => $order['id'],
                'amount' => $order['amount'],
                'status' => 'CREATED',
                'timestamp' => now()->toIso8601String()
            ]
        );

        Kafka::publishOn('order-events')
            ->setMessage($message)
            ->send();
    }
}
```

---

# Module 2: Producer Mechanics, Partitioning & Idempotence

### 2.1 Producer Acknowledgments (`acks`)
The `acks` config dictates how many broker replicas must acknowledge a message write before the producer considers the request successful:
- `acks = 0`: **Fire and Forget.** Highest throughput, but high risk of silent data loss.
- `acks = 1`: **Leader Acknowledged.** Returns as soon as the partition leader writes to its local log.
- `acks = all` (`-1`): **Full In-Sync Replicas (ISR) Acknowledged.** Waits for the leader and all `min.insync.replicas` to confirm the write. **Guarantees zero data loss.**

### 2.2 Idempotent Producers
Network glitches can cause producers to retry a request that the broker actually received, resulting in duplicate entries. Setting `enable.idempotence = true` attaches a **Producer ID (PID)** and a **Sequence Number** to every batch, allowing Kafka brokers to automatically deduplicate redundant retries.

```javascript
// Node.js Idempotent Producer
const producer = kafka.producer({
  idempotent: true,
  maxInFlightRequests: 1 // Preserves order during retries
});
```

```php
// Laravel Config for Zero Data Loss
Kafka::publishOn('payments')
    ->withConfigOptions([
        'acks' => 'all',
        'enable.idempotence' => 'true'
    ]);
```

---

# Module 3: Consumer Groups, Offset Commit & Rebalance Protocol

### 3.1 Consumer Groups
A Consumer Group consists of multiple worker instances sharing the same `group.id`. Kafka automatically assigns partitions within a topic to consumers in the group so that **each partition is consumed by exactly one worker** in the group.

```
Topic: user-events (4 Partitions: P0, P1, P2, P3)
Consumer Group A (3 Instances):
├── Worker 1 ---> Reads P0, P1
├── Worker 2 ---> Reads P2
└── Worker 3 ---> Reads P3
```

### 3.2 Manual Offset Commit Strategy
Automatic offset commits (`enable.auto.commit = true`) can cause message loss if a worker crashes midway through processing. **Manual offset committing** ensures an offset is marked complete only after business logic completes.

#### A. Node.js Manual Offset Commit:
```javascript
// consumer-manual.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'billing-app', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'billing-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  await consumer.run({
    autoCommit: false, // Disable auto commit!
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      
      // 1. Process Domain Business Logic
      await processBillingTransaction(event);

      // 2. Explicitly commit next offset
      await consumer.commitOffsets([
        { topic, partition, offset: (BigInt(message.offset) + 1n).toString() }
      ]);
    }
  });
}
run();
```

#### B. Laravel Consumer Command:
```php
<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Junges\Kafka\Contracts\KafkaConsumerMessage;
use Junges\Kafka\Facades\Kafka;

class ConsumeOrderEvents extends Command
{
    protected $signature = 'kafka:consume-billing';

    public function handle()
    {
        $consumer = Kafka::createConsumer(['order-events'])
            ->withConsumerGroupId('laravel-billing-group')
            ->withAutoCommit(false)
            ->withHandler(function (KafkaConsumerMessage $message) {
                $payload = $message->getBody();
                
                // Process Billing in Laravel
                app(\App\Services\BillingService::class)->process($payload);
            })
            ->build();

        $consumer->consume();
    }
}
```

---

# Module 4: Kafka Connect & Change Data Capture (CDC)

### 4.1 What is Kafka Connect?
Kafka Connect is a scalable, fault-tolerant framework for streaming data between Apache Kafka and external databases or storage systems without writing custom application code.
- **Source Connectors:** Import data from external databases (e.g., PostgreSQL, MySQL) into Kafka.
- **Sink Connectors:** Export data from Kafka topics into downstream datastores (e.g., Elasticsearch, Snowflake, S3).

### 4.2 Debezium Change Data Capture (CDC)
Debezium reads database binary transaction logs (e.g., PostgreSQL `pgoutput` or MySQL `binlog`) and emits real-time INSERT, UPDATE, and DELETE event streams directly into Kafka.

```
PostgreSQL Database (Writes/Updates)
        │ (Reads WAL Binary Log)
        ▼
Debezium Source Connector (Kafka Connect)
        │ (Streams JSON Change Events)
        ▼
Kafka Topic: db.public.users
        │
        ├── > Node.js Search Indexer (Syncs to Elasticsearch)
        └── > Laravel Cache Invalidator (Flushes Redis Cache)
```

---

# Module 5: Kafka Streams & Event Processing (KStream vs KTable)

### 5.1 KStream vs KTable
- **KStream (Event Stream):** An append-only sequence of immutable events (e.g., every individual click or purchase).
- **KTable (Changelog Stream):** Represents the current state of data (like a database table view). Each new key update overwrites the previous value.

### 5.2 Windowing Operations
Kafka Streams supports stateful aggregations over time windows:
- **Tumbling Windows:** Fixed-size, non-overlapping time windows (e.g., total sales every 5 minutes).
- **Hopping Windows:** Fixed-size, overlapping time windows (e.g., 5-minute sales recalculated every 1 minute).
- **Sliding Windows:** Continuous rolling windows triggered whenever an event arrives.

---

# Module 6: Schema Registry & Apache Avro Serialization

### 6.1 Why Use Schema Registry?
JSON payloads lack explicit type enforcement and schema validation. If a producer renames a field (e.g., `user_id` to `userId`), downstream consumers crash. Confluent **Schema Registry** enforces **Apache Avro** binary schemas.

### 6.2 Schema Evolution Compatibility Modes
1. **BACKWARD:** New schema can read data written by previous schema version.
2. **FORWARD:** Old schema can read data written by new schema version.
3. **FULL:** Schemas are both backward and forward compatible.

---

# Module 7: KRaft Consensus, Security (SASL/SSL) & Monitoring

### 7.1 KRaft (Kafka Raft Metadata Mode)
Legacy Kafka relied on Apache ZooKeeper to manage cluster metadata. Modern Kafka uses **KRaft** (Kafka Raft), replacing ZooKeeper with an internal Raft quorum controller, allowing Kafka to scale to millions of partitions per cluster with sub-second failover times.

### 7.2 Security Hardening
- **Encryption in Transit:** TLS/SSL for server-to-server and client-to-broker communication.
- **Authentication:** SASL/PLAIN, SASL/SCRAM-512, or Mutual TLS (mTLS).
- **Authorization:** Access Control Lists (ACLs) managing read/write permissions per topic.

---

# Module 8: Top Kafka Interview Questions & Answers

#### Q1: How does Kafka guarantee message ordering?
**Answer:** Kafka guarantees strict message ordering **only within a single partition**. By assigning a consistent record key (e.g., `orderId`), all events sharing that key are routed to the exact same partition and written sequentially.

#### Q2: What happens during a Consumer Group Rebalance?
**Answer:** When a consumer joins or leaves a group (or if a broker dies), Kafka triggers a rebalance. Partition ownership is reassigned across remaining consumers in the group. Cooperative Sticky Rebalancing allows uninterrupted processing for unaffected partitions.

#### Q3: What is Log Compaction in Kafka?
**Answer:** Log Compaction retains at least the last known value for each record key within a partition, deleting older superseded records. This converts a topic partition into a persistent key-value state store.

---
*Guide compiled for Developer Master Portal | Node.js & Laravel Ready*
