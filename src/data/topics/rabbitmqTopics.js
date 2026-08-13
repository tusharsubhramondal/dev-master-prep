import { createTopicSchema } from './createTopicSchema.js';

export const rabbitmqTopics = {
  // 1. RABBITMQ FUNDAMENTALS & AMQP
  "rabbitmq-basics": createTopicSchema({
    id: "rabbitmq-basics",
    techId: "rabbitmq",
    title: "RabbitMQ Architecture: AMQP 0-9-1, Exchanges, Queues & Bindings",
    category: "Message Queues",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["Message Queue Basics"],
    definition: "RabbitMQ is a reliable AMQP 0-9-1 message broker where Producers publish messages to Exchanges, which route messages into Queues via Binding Keys for Consumer processing.",
    simpleExplanation: "Producers send messages to an Exchange. The Exchange routes messages into Queues based on routing rules. Worker applications pull messages from queues to execute background jobs.",
    whyDoesItExist: "Provides high-speed, flexible message routing and asynchronous task queuing.",
    basicExample: `# 1. NODE.JS RABBITMQ PRODUCER (amqplib)
import amqp from 'amqplib';

const connection = await amqp.connect('amqp://localhost');
const channel = await connection.createChannel();

const queue = 'task_queue';
await channel.assertQueue(queue, { durable: true });
channel.sendToQueue(queue, Buffer.from('Send Welcome Email'), { persistent: true });

# 2. LARAVEL RABBITMQ CONFIGURATION (vladimir-yuldashev/laravel-queue-rabbitmq)
// config/queue.php -> connection: 'rabbitmq'
// Dispatch job in Laravel code:
SendWelcomeEmailJob::dispatch($user)->onQueue('task_queue');`,
    howItWorks: [
      "1. Producer sends message to Exchange with a Routing Key.",
      "2. Exchange evaluates Binding rules and routes message to target Queue.",
      "3. Consumer worker fetches message, processes job, and sends ACK (Acknowledgment)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Producer (Node/Laravel) -&gt; Exchange -&gt; Binding Key -&gt; Queue -&gt; Worker ACK</text></svg>`,
    realWorldExample: `// Node.js Worker Consumer (amqplib):
await channel.assertQueue('task_queue', { durable: true });
channel.prefetch(1); // Process 1 job at a time!

channel.consume('task_queue', (msg) => {
  console.log(\`Processing: \${msg.content.toString()}\`);
  channel.ack(msg); // Send ACK!
});`,
    commonUseCases: [
      "Offloading slow background jobs (email sending, image processing) in Node.js and Laravel",
      "Decoupling microservice notifications using Publish/Subscribe exchanges",
      "Enforcing message persistence with durable queues"
    ],
    commonMistakes: [
      "Publishing to non-durable queues (messages will be wiped if RabbitMQ server restarts!)",
      "Forgetting to call `channel.ack(msg)` in consumers (causes message memory leaks in RabbitMQ server!)"
    ],
    bestPractices: [
      "Set `{ durable: true }` on queues and `{ persistent: true }` on messages",
      "Set `prefetch(1)` on workers to prevent overloading a single worker process"
    ],
    whenToUse: ["In all background job processing and AMQP microservice architectures"],
    whenNotToUse: ["Do not use RabbitMQ if simple in-memory Redis queues (BullMQ) satisfy lightweight Node app needs"],
    relatedConcepts: ["Exchange", "Queue", "Binding Key", "amqplib", "Laravel-Queue-RabbitMQ"],
    comparison: {
      title: "RabbitMQ vs Redis Pub/Sub",
      headers: ["Metric", "RabbitMQ Broker", "Redis Pub/Sub"],
      rows: [
        ["Message Persistence", "Durable queues store messages on disk until ACKed", "Transient (Messages lost if no subscriber connected)"],
        ["Routing Complexity", "Flexible (Direct, Fanout, Topic, Headers exchanges)", "Simple channel string matching"],
        ["Work Queuing", "Built-in consumer load balancing & retries", "Requires custom queue management"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between an Exchange and a Queue in RabbitMQ?", answer: "An Exchange receives messages from Producers and routes them to Queues based on binding rules. A Queue is a buffer on disk/RAM that stores messages until Consumer workers read and acknowledge them." }
    ],
    practiceProblem: {
      description: "Write amqplib assertQueue option object for disk persistence.",
      starterCode: `{ durable: true }`,
      testAssertion: "true",
      solution: `{ durable: true }`
    },
    quickRevision: "★ Producers send messages to Exchanges; Exchanges route to Queues.\n★ Queues store messages until workers send ACK.\n★ Set { durable: true } for persistent queue storage."
  }),

  // 2. EXCHANGES & ROUTING
  "rabbitmq-exchanges": createTopicSchema({
    id: "rabbitmq-exchanges",
    techId: "rabbitmq",
    title: "RabbitMQ Exchange Types: Direct, Fanout, Topic & Headers",
    category: "Message Queues",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["rabbitmq-basics"],
    definition: "Exchanges inspect routing keys and headers to forward messages: Direct (exact key match), Fanout (broadcast to all queues), Topic (wildcard routing pattern e.g. *.orders.#), and Headers.",
    simpleExplanation: "Fanout sends a message to EVERY queue. Direct sends to 1 matching queue. Topic uses wildcards like 'user.*.created' to route selectively.",
    whyDoesItExist: "Provides flexible, declarative message routing patterns for complex microservices.",
    basicExample: `# 1. NODE.JS TOPIC EXCHANGE (amqplib)
await channel.assertExchange('app_events', 'topic', { durable: true });
// Publish to Topic:
channel.publish('app_events', 'user.eu.registered', Buffer.from(payload));

# 2. LARAVEL RABBITMQ FANOUT BROADCAST
use Junges\\Kafka\\Facades\\Kafka; // Or Laravel RabbitMQ Fanout exchange driver!
// Broadcasts event to all bound queues (Payment, Email, Analytics services!)`,
    howItWorks: [
      "1. Direct Exchange matches exact routing key (`order.created` === `order.created`).",
      "2. Fanout Exchange ignores routing key and broadcasts to all bound queues.",
      "3. Topic Exchange matches wildcard keys (`*` = 1 word, `#` = 0 or more words)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Fanout (Broadcast All) | Direct (Exact Key) | Topic (*.orders.# Wildcard)</text></svg>`,
    realWorldExample: `// Topic Binding Example:
// Queue 1 binds with: 'orders.*'
// Queue 2 binds with: 'orders.eu.#'`,
    commonUseCases: [
      "Broadcasting user registration events to 5 microservices with Fanout Exchange",
      "Routing log severity categories (error.db, info.auth) using Topic Exchange wildcards",
      "Direct targeted queue dispatching with Direct Exchange"
    ],
    commonMistakes: [
      "Confusing Topic wildcard symbols (`*` matches exactly 1 word; `#` matches zero or more words)",
      "Binding queues to non-existent exchanges"
    ],
    bestPractices: [
      "Use Fanout Exchange for pure Publish/Subscribe notification events",
      "Use Topic Exchange for hierarchical event category routing"
    ],
    whenToUse: ["In all RabbitMQ pub/sub routing setups"],
    whenNotToUse: ["Do not use complex Topic exchanges when a simple Direct queue suffices"],
    relatedConcepts: ["Direct Exchange", "Fanout Exchange", "Topic Exchange", "Routing Key"],
    comparison: {
      title: "Exchange Types Comparison",
      headers: ["Exchange Type", "Matching Algorithm", "Primary Use Case"],
      rows: [
        ["Direct", "Exact routing key string match", "Targeted point-to-point task routing"],
        ["Fanout", "Ignores key; broadcasts to ALL bound queues", "Publish / Subscribe notification fan-out"],
        ["Topic", "Wildcard pattern match (* and #)", "Hierarchical multi-category routing (e.g. logs)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What do the wildcard symbols '*' and '#' mean in RabbitMQ Topic exchanges?", answer: "In Topic exchanges, `*` matches exactly ONE word (e.g. `order.*.created`), while `#` matches ZERO or more words (e.g. `order.#`)." }
    ],
    practiceProblem: {
      description: "Write RabbitMQ topic wildcard symbol matching zero or more words.",
      starterCode: `#`,
      testAssertion: "true",
      solution: `#`
    },
    quickRevision: "★ Direct = Exact key match.\n★ Fanout = Broadcasts to all queues.\n★ Topic = Wildcard key matching (* = 1 word, # = 0+ words)."
  })
};
