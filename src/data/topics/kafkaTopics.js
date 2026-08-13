import { createTopicSchema } from './createTopicSchema.js';

export const kafkaTopics = {
  // 1. KAFKA CORE ARCHITECTURE
  "kafka-basics": createTopicSchema({
    id: "kafka-basics",
    techId: "kafka",
    title: "Apache Kafka Core Architecture: Topics, Partitions & Log Streams",
    category: "Event Streaming",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["Message Queue Basics"],
    definition: "Apache Kafka is a distributed event streaming platform built on an append-only commit log stream. Data is organized into Topics divided across distributed Partitions stored on Kafka Brokers.",
    simpleExplanation: "Kafka acts as a massive distributed event log. Producers write event records to topics, and consumers read logs in real time.",
    whyDoesItExist: "Handles millions of real-time event messages per second with fault tolerance and retention durability.",
    basicExample: `# 1. NODE.JS KAFKA PRODUCER (kafkajs)
import { Kafka } from 'kafkajs';
const kafka = new Kafka({ clientId: 'node-app', brokers: ['localhost:9092'] });
const producer = kafka.producer();

await producer.connect();
await producer.send({
  topic: 'order-events',
  messages: [{ key: 'order-101', value: JSON.stringify({ id: 101, status: 'PAID' }) }]
});

# 2. LARAVEL KAFKA PRODUCER (mateusjunges/laravel-kafka)
use Junges\\Kafka\\Facades\\Kafka;

Kafka::publishOn('order-events')
    ->withBodyKey('id', 101)
    ->withBodyKey('status', 'PAID')
    ->send();`,
    howItWorks: [
      "1. Producers publish messages to specific Kafka Topics.",
      "2. Topics are partitioned across cluster brokers for horizontal throughput.",
      "3. Consumers track progress using persistent Offsets stored in Kafka."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Producer (Node/Laravel) -&gt; Kafka Topic (Partition 0 / 1 / 2) -&gt; Consumer Groups</text></svg>`,
    realWorldExample: `// Node.js Kafka Consumer Example (kafkajs):
const consumer = kafka.consumer({ groupId: 'order-processors' });
await consumer.connect();
await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log(\`Received: \${message.value.toString()}\`);
  }
});`,
    commonUseCases: [
      "High-volume log aggregation and metric collection",
      "Real-time event-driven microservice communication",
      "Streaming ETL pipelines and Change Data Capture (CDC)"
    ],
    commonMistakes: [
      "Creating too few partitions on high-throughput topics (limits consumer concurrency!)",
      "Not setting a message key causing random non-deterministic partition distribution"
    ],
    bestPractices: [
      "Use message keys to ensure related events route to the exact same partition",
      "Set partition counts based on expected peak consumer throughput"
    ],
    whenToUse: ["When building high-throughput event streaming systems"],
    whenNotToUse: ["Do not use Kafka as a simple background task queue if Redis or BullMQ suffices"],
    relatedConcepts: ["Topics", "Partitions", "KafkaJS", "Laravel-Kafka"],
    comparison: {
      title: "Kafka vs RabbitMQ",
      headers: ["Metric", "Apache Kafka", "RabbitMQ"],
      rows: [
        ["Model", "Distributed Append-Only Event Log", "AMQP Message Broker"],
        ["Retention", "Retains messages on disk based on retention time", "Deletes messages immediately after consumer ACK"],
        ["Throughput", "Ultra Massive (Millions msg/sec)", "High (Thousands msg/sec)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is a Partition in Apache Kafka and why is it essential for throughput?", answer: "A Partition is a single append-only log sequence within a Kafka Topic. Partitions allow topics to be split across multiple cluster brokers, enabling parallel write and read execution across multiple consumers." }
    ],
    practiceProblem: {
      description: "Write KafkaJS package import statement.",
      starterCode: `import { Kafka } from 'kafkajs';`,
      testAssertion: "true",
      solution: `import { Kafka } from 'kafkajs';`
    },
    quickRevision: "★ Kafka is a distributed append-only event log.\n★ Partitions enable parallel consumer reads.\n★ Message keys route events to specific partitions."
  }),

  // 2. PRODUCERS & PARTITIONING
  "kafka-producers": createTopicSchema({
    id: "kafka-producers",
    techId: "kafka",
    title: "Kafka Producers: Acks, Partitioning & Idempotence",
    category: "Event Streaming",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["kafka-basics"],
    definition: "Kafka Producers publish records to topics, controlling message delivery guarantees via Acks (0 = no wait, 1 = leader ack, all = min.insync.replicas ack) and Idempotent Producer settings.",
    simpleExplanation: "Producers send messages to Kafka. Setting acks=all guarantees zero data loss by waiting for all backup brokers to acknowledge the message.",
    whyDoesItExist: "Provides configurable trade-offs between write latency and zero data loss durability.",
    basicExample: `# 1. NODE.JS IDEMPOTENT PRODUCER (kafkajs)
const producer = kafka.producer({
  allowAutoTopicCreation: false,
  transactionTimeout: 30000,
  idempotent: true // Guarantees exactly-once delivery per partition!
});

# 2. LARAVEL KAFKA PRODUCER WITH ACKS
use Junges\\Kafka\\Facades\\Kafka;

Kafka::publishOn('payments')
    ->withConfigOptions(['acks' => 'all']) // Wait for all in-sync replicas!
    ->withBodyKey('amount', 500)
    ->send();`,
    howItWorks: [
      "1. Producer hashes message key to select target Partition ID.",
      "2. Sends batch payload to Partition Leader Broker.",
      "3. Waits for required Acks (acks=all) before resolving promise."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Producer -&gt; Leader Broker -&gt; Syncs to Follower Replicas -&gt; Return ACK (all)</text></svg>`,
    realWorldExample: `// Laravel Kafka Consumer handler:
use Junges\\Kafka\\Contracts\\KafkaConsumerMessage;

class ProcessPaymentJob {
    public function __invoke(KafkaConsumerMessage $message) {
        $data = $message->getBody();
        // Process payment in Laravel DB...
    }
}`,
    commonUseCases: [
      "Publishing financial transactions with acks=all for zero data loss",
      "Using idempotent producers to prevent duplicate message publishing",
      "Routing user events by userId key to maintain strict event ordering"
    ],
    commonMistakes: [
      "Using acks=0 for critical financial transactions (risks silent data loss if broker crashes!)",
      "Not handling producer retry errors"
    ],
    bestPractices: [
      "Use \`acks='all'\` and \`enable.idempotence=true\` for critical data streams",
      "Use consistent record keys to enforce ordered processing per entity"
    ],
    whenToUse: ["In all production Kafka producer implementations"],
    whenNotToUse: ["Do not use acks=0 for non-replaceable transactional data"],
    relatedConcepts: ["Acks", "Idempotent Producer", "Record Key", "Partition Leader"],
    comparison: {
      title: "Kafka Producer Acks Comparison",
      headers: ["Acks Setting", "Latency", "Durability Guarantee"],
      rows: [
        ["acks = 0", "Lowest (Fire and forget)", "Zero (High risk of silent message loss)"],
        ["acks = 1", "Medium", "Leader acknowledged (Safe unless leader crashes before replication)"],
        ["acks = all (-1)", "Higher", "Maximum (Waits for all in-sync replicas; zero data loss)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between acks=1 and acks=all in Kafka producers?", answer: "\`acks=1\` returns success as soon as the partition Leader acknowledges the write. \`acks=all\` waits for both the Leader and all min.insync.replicas to acknowledge, guaranteeing zero data loss." }
    ],
    practiceProblem: {
      description: "Write producer setting string for maximum durability acks.",
      starterCode: `acks: 'all'`,
      testAssertion: "true",
      solution: `acks: 'all'`
    },
    quickRevision: "★ acks=all guarantees maximum zero data loss durability.\n★ Idempotent producers prevent duplicate message publishing.\n★ Record keys enforce strict ordering within a partition."
  }),

  // 3. CONSUMERS & REBALANCING
  "kafka-consumers": createTopicSchema({
    id: "kafka-consumers",
    techId: "kafka",
    title: "Kafka Consumer Groups, Offsets & Rebalance Protocol",
    category: "Event Streaming",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["kafka-producers"],
    definition: "Consumer Groups allow multiple workers to share partition reading workloads. Kafka tracks progress via Offsets, triggering Rebalances when workers join or leave the group.",
    simpleExplanation: "Consumer groups share the work of reading a topic's partitions. If one worker dies, Kafka automatically reassigns its partitions to other workers in the group.",
    whyDoesItExist: "Enables horizontal scaling of event processing workers with fault tolerance.",
    basicExample: `# 1. NODE.JS CONSUMER GROUP (kafkajs)
const consumer = kafka.consumer({ groupId: 'billing-workers' });
await consumer.connect();
await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

await consumer.run({
  autoCommit: false, // Manual offset commit!
  eachMessage: async ({ topic, partition, message }) => {
    console.log(\`Offset \${message.offset}: \${message.value.toString()}\`);
    await consumer.commitOffsets([
      { topic, partition, offset: (BigInt(message.offset) + 1n).toString() }
    ]);
  }
});

# 2. LARAVEL KAFKA CONSUMER
Kafka::createConsumer(['order-events'])
    ->withConsumerGroupId('laravel-billing-workers')
    ->withAutoCommit(false)
    ->withHandler(fn ($msg) => Log::info($msg->getBody()))
    ->build()->consume();`,
    howItWorks: [
      "1. Group Coordinator Broker manages active consumer membership.",
      "2. Assignor strategy allocates topic partitions across active workers.",
      "3. Rebalance protocol reassigns partitions when members join or leave."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Topic (4 Partitions) -&gt; Consumer Group (3 Workers) -&gt; Offset Commit</text></svg>`,
    realWorldExample: `// Manual Offset commit in KafkaJS after successful DB transaction:
await db.transaction(async () => {
  await processPayment(payload);
  await consumer.commitOffsets([{ topic, partition, offset }]);
});`,
    commonUseCases: [
      "Scaling background worker instances in Node.js and Laravel",
      "Manual offset management to prevent data loss on worker crash",
      "Using Cooperative Sticky Assignor to minimize rebalance pauses"
    ],
    commonMistakes: [
      "Having more consumer instances than topic partitions (excess consumers sit idle!)",
      "Using auto-commit with slow async processing (risks data loss on crash)"
    ],
    bestPractices: [
      "Disable auto-commit and commit offsets manually after DB processing",
      "Ensure partition count >= maximum expected consumer worker instances"
    ],
    whenToUse: ["In all consumer group processing setups"],
    whenNotToUse: ["Do not create extra consumer instances exceeding total partition count"],
    relatedConcepts: ["Consumer Group", "Offset", "Rebalance", "Cooperative Sticky"],
    comparison: {
      title: "Auto Commit vs Manual Commit",
      headers: ["Strategy", "Data Loss Risk", "Control"],
      rows: [
        ["Auto Commit", "High (Commits on timer regardless of processing status)", "Zero code control"],
        ["Manual Commit", "Zero (Commits strictly AFTER business logic finishes)", "Exact application control"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What happens when you add more consumers than partitions in a Kafka topic?", answer: "The extra consumer instances will sit completely idle, receiving zero partitions. In a single consumer group, a partition can be assigned to at most ONE consumer instance." }
    ],
    practiceProblem: {
      description: "Write consumer config property disabling auto commit.",
      starterCode: `autoCommit: false`,
      testAssertion: "true",
      solution: `autoCommit: false`
    },
    quickRevision: "★ Max active consumers in a group = total partition count.\n★ Manual offset commits prevent message loss.\n★ Rebalance reassigns partitions when workers join/leave."
  }),

  // 4. KAFKA CONNECT
  "kafka-connect": createTopicSchema({
    id: "kafka-connect",
    techId: "kafka",
    title: "Kafka Connect & Change Data Capture (Debezium CDC)",
    category: "Integration",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["kafka-consumers"],
    definition: "Kafka Connect is a framework for streaming data between Kafka and external databases without writing code. Debezium CDC captures database binary logs into Kafka events.",
    simpleExplanation: "Kafka Connect automatically streams database changes (PostgreSQL/MySQL inserts and updates) into Kafka topics in real time.",
    whyDoesItExist: "Eliminates custom ETL pipeline code and dual-write database synchronization bugs.",
    basicExample: `# Debezium PostgreSQL Source Connector Configuration (JSON)
{
  "name": "postgres-source-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "plugin.name": "pgoutput",
    "database.hostname": "postgres-db",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "secret",
    "database.dbname": "app_db",
    "topic.prefix": "cdc-events"
  }
}`,
    howItWorks: [
      "1. Debezium reads database binary transaction logs (pgoutput WAL / MySQL binlog).",
      "2. Converts database INSERT/UPDATE/DELETE rows into structured JSON events.",
      "3. Publishes CDC events directly into Kafka topics."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">PostgreSQL WAL Log -&gt; Debezium CDC -&gt; Kafka Topic -&gt; Elasticsearch Sink</text></svg>`,
    realWorldExample: `// Consuming Debezium CDC payload in Node.js:
const cdcEvent = JSON.parse(message.value.toString());
if (cdcEvent.payload.op === 'c') { // 'c' = Create / Insert
  await syncToElasticsearch(cdcEvent.payload.after);
}`,
    commonUseCases: [
      "Real-time Change Data Capture (CDC) from PostgreSQL / MySQL into Kafka",
      "Syncing SQL database changes to Elasticsearch search indexes",
      "Building event-driven microservices without dual-write bugs"
    ],
    commonMistakes: [
      "Performing dual-writes in application code instead of using CDC (causes inconsistent database vs event state!)",
      "Forgetting to enable logical replication in PostgreSQL (`wal_level=logical`)"
    ],
    bestPractices: [
      "Use Debezium CDC to avoid dual-write transactional bugs",
      "Configure `wal_level=logical` on PostgreSQL databases for Debezium"
    ],
    whenToUse: ["When streaming database changes to external search or analytics engines"],
    whenNotToUse: ["Do not use manual polling SQL scripts if Kafka Connect CDC is available"],
    relatedConcepts: ["Kafka Connect", "Debezium", "CDC", "WAL Log", "Elasticsearch Sink"],
    comparison: {
      title: "Dual-Write App Logic vs Debezium CDC",
      headers: ["Approach", "Data Consistency", "Application Overhead"],
      rows: [
        ["Dual-Write Code", "Poor (If DB succeeds but Kafka fails, state is corrupt)", "High manual code maintenance"],
        ["Debezium CDC", "Guaranteed (Streams from DB WAL log automatically)", "Zero application code overhead"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Change Data Capture (CDC) and why is it superior to application-level dual-writes?", answer: "CDC reads database binary transaction logs (like Postgres WAL) to stream change events automatically. Unlike application dual-writes (where a DB save succeeds but a network glitch drops the Kafka publish), CDC guarantees event consistency." }
    ],
    practiceProblem: {
      description: "Write Debezium operation code string for insert/create.",
      starterCode: `c`,
      testAssertion: "true",
      solution: `c`
    },
    quickRevision: "★ Debezium streams database changes from binary transaction logs.\n★ Eliminates application dual-write inconsistency bugs.\n★ Requires `wal_level=logical` in PostgreSQL."
  }),

  // 5. KAFKA STREAMS
  "kafka-streams": createTopicSchema({
    id: "kafka-streams",
    techId: "kafka",
    title: "Kafka Streams: KStream, KTable & Windowing Aggregations",
    category: "Event Processing",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["kafka-connect"],
    definition: "Kafka Streams is a client library for building real-time stream processing applications, featuring KStream (event stream), KTable (changelog state table), and Windowed Aggregations.",
    simpleExplanation: "Kafka Streams processes and aggregates data in real time (like computing total sales every 5 minutes) directly on incoming event streams.",
    whyDoesItExist: "Enables real-time stream analytics and event transformation without external Spark clusters.",
    basicExample: `# Kafka Streams Core Concepts:
- KStream: Immutable append-only event stream (e.g. click1, click2, click3).
- KTable: Mutable state table (e.g. user_id -> current_address).
- Tumbling Window: 5-minute fixed non-overlapping time window.`,
    howItWorks: [
      "1. Streams topology reads records from input Kafka topic.",
      "2. Performs windowing, joins, or aggregations using local RocksDB state stores.",
      "3. Writes computed real-time metrics to output Kafka topic."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Input KStream -&gt; 5-Min Tumbling Window Aggregation -&gt; Output Topic</text></svg>`,
    realWorldExample: `// Equivalent Node.js streaming aggregation concept:
// Process streaming click counts over rolling windows in Node.js/Laravel workers!`,
    commonUseCases: [
      "Real-time fraud detection on payment streams",
      "Calculating rolling 5-minute user activity metrics",
      "Joining event streams with state tables (KStream-KTable Join)"
    ],
    commonMistakes: [
      "Confusing KStream (unbounded event facts) with KTable (latest snapshot state)",
      "Unbounded window sizes causing RocksDB memory growth"
    ],
    bestPractices: [
      "Use Tumbling Windows for fixed non-overlapping metrics",
      "Use KTable for current snapshot state representations"
    ],
    whenToUse: ["When performing real-time stateful stream transformations"],
    whenNotToUse: ["Do not use for static batch processing jobs"],
    relatedConcepts: ["KStream", "KTable", "Tumbling Window", "RocksDB", "Stream Join"],
    comparison: {
      title: "KStream vs KTable",
      headers: ["Concept", "Abstractions", "Data Representation"],
      rows: [
        ["KStream", "Event Log (Insert-only stream)", "Every new record is an independent fact"],
        ["KTable", "Database Table (Changelog snapshot)", "New record with existing key updates previous state"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between a KStream and a KTable in Kafka Streams?", answer: "A KStream is an append-only event log where every record is an independent fact. A KTable is a changelog snapshot (like a DB table) where new records with an existing key overwrite the previous value." }
    ],
    practiceProblem: {
      description: "Write Kafka Streams concept for immutable event log stream.",
      starterCode: `KStream`,
      testAssertion: "true",
      solution: `KStream`
    },
    quickRevision: "★ KStream = Append-only event log.\n★ KTable = Database table snapshot (upsert logic).\n★ Tumbling Windows calculate non-overlapping time metrics."
  }),

  // 6. SCHEMA REGISTRY & AVRO
  "kafka-schema-registry": createTopicSchema({
    id: "kafka-schema-registry",
    techId: "kafka",
    title: "Confluent Schema Registry & Apache Avro Serialization",
    category: "Data Governance",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["kafka-streams"],
    definition: "Schema Registry enforces data contracts using Apache Avro binary serialization, preventing breaking schema changes between producers and consumers via compatibility rules.",
    simpleExplanation: "Schema Registry acts as a centralized gatekeeper that validates event payloads against pre-approved Avro schemas before publishing.",
    whyDoesItExist: "Prevents malformed producer payloads from breaking downstream consumer applications.",
    basicExample: `# Apache Avro Schema Definition (user-event.avsc)
{
  "type": "record",
  "name": "UserEvent",
  "namespace": "com.company.events",
  "fields": [
    { "name": "userId", "type": "string" },
    { "name": "email", "type": "string" },
    { "name": "signupTimestamp", "type": "long" }
  ]
}`,
    howItWorks: [
      "1. Producer registers Avro schema with Schema Registry service.",
      "2. Schema Registry assigns unique Schema ID to payload header.",
      "3. Consumer fetches Schema ID from Registry to deserialize binary Avro payload."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Producer -&gt; Check Schema Registry -&gt; Binary Avro Payload -&gt; Consumer</text></svg>`,
    realWorldExample: `// Node.js Schema Registry integration (@kafkajs/confluent-schema-registry):
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';
const registry = new SchemaRegistry({ host: 'http://localhost:8081' });`,
    commonUseCases: [
      "Enforcing strict data contracts across multi-team microservices",
      "Using Apache Avro binary encoding for compact network payload sizes",
      "Enforcing BACKWARD / FORWARD schema evolution rules"
    ],
    commonMistakes: [
      "Making breaking schema changes (deleting required fields) without default values",
      "Using un-validated JSON strings in enterprise multi-service pipelines"
    ],
    bestPractices: [
      "Always set default values for new fields to maintain BACKWARD compatibility",
      "Use Confluent Schema Registry in enterprise production clusters"
    ],
    whenToUse: ["In enterprise multi-team microservice event streaming"],
    whenNotToUse: ["Do not introduce Schema Registry overhead for simple single-developer apps"],
    relatedConcepts: ["Schema Registry", "Apache Avro", "Schema Evolution", "BACKWARD Compatibility"],
    comparison: {
      title: "JSON String vs Avro Binary Serialization",
      headers: ["Format", "Payload Size", "Type Safety"],
      rows: [
        ["JSON String", "Large (Includes key names in every message)", "None (Prone to missing key runtime errors)"],
        ["Apache Avro Binary", "Ultra Compact (Sends raw binary data + Schema ID)", "Strict (Enforced by Schema Registry)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is BACKWARD compatibility in Kafka Schema Registry?", answer: "BACKWARD compatibility means consumers using a NEW schema version can still successfully read data published by producers using the PREVIOUS schema version." }
    ],
    practiceProblem: {
      description: "Write schema compatibility mode where new schema reads old data.",
      starterCode: `BACKWARD`,
      testAssertion: "true",
      solution: `BACKWARD`
    },
    quickRevision: "★ Schema Registry enforces Avro data contracts.\n★ Avro binary encoding is much smaller than JSON strings.\n★ BACKWARD compatibility allows new consumers to read old data."
  }),

  // 7. KRAFT CONSENSUS & OPERATIONS
  "kafka-operations": createTopicSchema({
    id: "kafka-operations",
    techId: "kafka",
    title: "KRaft Consensus, Security (SASL/SSL) & Cluster Operations",
    category: "DevOps & Security",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["kafka-schema-registry"],
    definition: "Modern Kafka uses KRaft (Kafka Raft Consensus) to manage cluster metadata without ZooKeeper, secured with SASL/SSL authentication and monitored via Prometheus metrics.",
    simpleExplanation: "KRaft replaces ZooKeeper with a built-in Raft consensus engine, enabling faster cluster failover and supporting millions of partitions.",
    whyDoesItExist: "Eliminates ZooKeeper operational complexity and accelerates metadata failover.",
    basicExample: `# KRaft Server Properties Snippet (server.properties)
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:9093
listeners=PLAINTEXT://:9092,CONTROLLER://:9093`,
    howItWorks: [
      "1. KRaft controller nodes elect an active Controller Leader using Raft consensus algorithm.",
      "2. Metadata changes stored in dedicated `@metadata` internal partition.",
      "3. SASL/SCRAM-512 authenticates client connections over TLS/SSL."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">KRaft Raft Quorum -&gt; Internal @metadata Partition -&gt; Sub-Second Failover</text></svg>`,
    realWorldExample: `# Formatting KRaft storage directory:
kafka-storage.sh format -t $CLUSTER_ID -c server.properties`,
    commonUseCases: [
      "Operating high-performance modern KRaft Kafka clusters without ZooKeeper",
      "Securing client access with SASL/SCRAM-512 and SSL encryption",
      "Monitoring cluster health metrics with Prometheus and Grafana"
    ],
    commonMistakes: [
      "Deploying legacy ZooKeeper for new Kafka 3.x+ cluster installations",
      "Not monitoring UnderReplicatedPartitions metric (indicates replica sync failure!)"
    ],
    bestPractices: [
      "Adopt KRaft mode for all new production Kafka clusters",
      "Set alerts on `UnderReplicatedPartitions > 0` metric"
    ],
    whenToUse: ["In all modern Kafka production cluster deployments"],
    whenNotToUse: ["Do not deploy legacy ZooKeeper for new Kafka installations"],
    relatedConcepts: ["KRaft", "Raft Consensus", "SASL/SCRAM", "UnderReplicatedPartitions"],
    comparison: {
      title: "ZooKeeper Mode vs KRaft Mode",
      headers: ["Feature", "ZooKeeper Mode (Legacy)", "KRaft Mode (Modern Kafka 3.x+)"],
      rows: [
        ["Metadata Storage", "External ZooKeeper cluster", "Internal @metadata topic partition"],
        ["Partition Limit", "~200,000 partitions max", "1,000,000+ partitions per cluster"],
        ["Failover Speed", "Minutes (ZooKeeper metadata sync delay)", "Sub-second Raft controller failover"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is KRaft mode in Apache Kafka and why does it replace ZooKeeper?", answer: "KRaft (Kafka Raft Metadata Mode) replaces ZooKeeper with an internal Raft-based consensus protocol. It eliminates external cluster dependencies, speeds up failover times to sub-seconds, and allows scaling to millions of partitions." }
    ],
    practiceProblem: {
      description: "Write consensus engine name replacing ZooKeeper in Kafka 3.x+.",
      starterCode: `KRaft`,
      testAssertion: "true",
      solution: `KRaft`
    },
    quickRevision: "★ KRaft replaces ZooKeeper with Raft consensus.\n★ Supports 1,000,000+ partitions with sub-second failover.\n★ Monitor UnderReplicatedPartitions > 0 metric for health alerts."
  })
};
