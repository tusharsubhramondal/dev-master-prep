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
      "Use `acks='all'` and `enable.idempotence=true` for critical data streams",
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
      { level: "Beginner", question: "What is the difference between acks=1 and acks=all in Kafka producers?", answer: "`acks=1` returns success as soon as the partition Leader acknowledges the write. `acks=all` waits for both the Leader and all min.insync.replicas to acknowledge, guaranteeing zero data loss." }
    ],
    practiceProblem: {
      description: "Write producer setting string for maximum durability acks.",
      starterCode: `acks: 'all'`,
      testAssertion: "true",
      solution: `acks: 'all'`
    },
    quickRevision: "★ acks=all guarantees maximum zero data loss durability.\n★ Idempotent producers prevent duplicate message publishing.\n★ Record keys enforce strict ordering within a partition."
  })
};
