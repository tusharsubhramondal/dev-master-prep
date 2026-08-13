import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function IntegrationPage() {
  const [activeTech, setActiveTech] = useState('kafka'); // 'kafka' | 'rabbitmq' | 'bullmq'
  const [activeLang, setActiveLang] = useState('node'); // 'node' | 'laravel'
  const [activeStep, setActiveStep] = useState('overview'); // 'overview' | 'producer' | 'consumer' | 'docker'

  const integrations = {
    kafka: {
      id: "kafka",
      name: "Apache Kafka",
      badge: "Distributed Event Streaming Log",
      color: "#231f20",
      accent: "from-amber-500/20 via-orange-500/10 to-slate-900",
      borderColor: "border-amber-500/30",
      icon: "fa-solid fa-stream",
      overview: `Apache Kafka is a distributed event streaming platform built on an immutable, append-only commit log stream. Unlike traditional message brokers that push messages to consumers and delete them upon acknowledgment, Kafka persists all published records into ordered log files called **Topics** on disk for a configurable retention window (e.g. 7 days). Topics are partitioned across multiple **Kafka Brokers** in a cluster for horizontal throughput and fault-tolerant replication. When a **Producer** publishes an event (containing a key, payload, timestamp, and headers), Kafka hashes the key to assign the event to a specific **Partition** lead broker, guaranteeing that events with the same key (such as a user_id or order_id) are appended in strict sequential order. **Consumers** subscribe to topics as part of a **Consumer Group**, tracking their read position in the stream using an **Offset** counter. This architecture allows multiple autonomous microservice consumer groups (such as Billing, Inventory, and Notification services) to read the exact same event stream in parallel at their own independent processing speeds without impacting each other or mutating the underlying event log.`,
      dockerCompose: `version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1`,
      node: {
        producer: `// producer.js (Node.js Kafka Producer using KafkaJS)
import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
  idempotent: true // Guarantees exactly-once delivery per partition!
});

export async function publishOrderCreatedEvent(orderData) {
  await producer.connect();
  console.log('Connected to Kafka Producer');

  const result = await producer.send({
    topic: 'order-events',
    acks: -1, // acks='all': Waits for all in-sync replicas!
    messages: [
      {
        key: String(orderData.userId), // Hash key enforces sequential ordering!
        value: JSON.stringify({
          eventId: \`evt_\${Date.now()}\`,
          eventType: 'ORDER_CREATED',
          timestamp: new Date().toISOString(),
          data: orderData
        }),
        headers: { correlationId: 'corr_xyz123' }
      }
    ]
  });

  console.log('Event Published Successfully to Partition:', result[0].partition);
  await producer.disconnect();
}`,
        consumer: `// consumer.js (Node.js Kafka Consumer Group using KafkaJS)
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({
  groupId: 'notification-group',
  sessionTimeout: 30000
});

async function startNotificationConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  await consumer.run({
    autoCommit: false, // Manual offset commit for strict reliability
    eachMessage: async ({ topic, partition, message }) => {
      const eventPayload = JSON.parse(message.value.toString());
      console.log(\`[Partition \${partition} | Offset \${message.offset}] Processing Event:\`, eventPayload);

      // Business Logic: Send notification email/SMS
      await sendOrderConfirmationEmail(eventPayload.data);

      // Commit offset manually after successful processing
      await consumer.commitOffsets([
        { topic, partition, offset: (BigInt(message.offset) + 1n).toString() }
      ]);
    }
  });
}

startNotificationConsumer().catch(console.error);`
      },
      laravel: {
        producer: `<?php
// app/Services/KafkaOrderProducer.php
namespace App\\Services;

use Junges\\Kafka\\Facades\\Kafka;
use Junges\\Kafka\\Message\\Message;

class KafkaOrderProducer
{
    public function publishOrderCreated(array $orderData): void
    {
        $message = new Message(
            headers: ['correlationId' => 'corr_xyz123'],
            key: (string) $orderData['userId'],
            body: [
                'eventId' => 'evt_' . time(),
                'eventType' => 'ORDER_CREATED',
                'timestamp' => now()->toIso8601String(),
                'data' => $orderData
            ]
        );

        // Publish to topic with acks='all' for zero data loss
        Kafka::publishOn('order-events')
            ->withConfigOptions(['acks' => 'all'])
            ->setMessage($message)
            ->send();

        \\Log::info("Order Event Published to Kafka for Order #{$orderData['id']}");
    }
}`,
        consumer: `<?php
// app/Console/Commands/KafkaOrderConsumer.php
namespace App\\Console\\Commands;

use Illuminate\\Console\\Command;
use Junges\\Kafka\\Contracts\\KafkaConsumerMessage;
use Junges\\Kafka\\Facades\\Kafka;

class KafkaOrderConsumer extends Command
{
    protected $signature = 'kafka:consume-orders';
    protected $description = 'Consume order events from Apache Kafka';

    public function handle()
    {
        $consumer = Kafka::createConsumer(['order-events'])
            ->withConsumerGroupId('laravel-inventory-group')
            ->withBrokers('localhost:9092')
            ->withAutoCommit(false)
            ->withHandler(function (KafkaConsumerMessage $message) {
                $payload = $message->getBody();
                \\Log::info("Kafka Event Received in Laravel:", $payload);

                // Execute domain inventory reduction logic
                app(\\App\\Services\\InventoryService::class)->deductStock($payload['data']);
            })
            ->build();

        $consumer->consume();
    }
}`
      }
    },

    rabbitmq: {
      id: "rabbitmq",
      name: "RabbitMQ",
      badge: "AMQP Message Broker & Routing",
      color: "#ff6600",
      accent: "from-orange-500/20 via-amber-500/10 to-slate-900",
      borderColor: "border-orange-500/30",
      icon: "fa-solid fa-exchange-alt",
      overview: `RabbitMQ is an open-source message broker implementing the **AMQP 0-9-1** (Advanced Message Queuing Protocol) standard, designed for asynchronous task queuing and flexible message routing. In RabbitMQ, Producers never publish messages directly into a queue; instead, they publish messages to an **Exchange**, specifying a **Routing Key**. The Exchange acts as a message router that inspects the routing key, headers, and exchange type (**Direct**, **Fanout**, **Topic**, or **Headers**) to determine which bound **Queues** should receive the message. Queues are memory or disk-backed buffers that hold messages until active **Consumer** workers consume them. RabbitMQ manages delivery reliability using a **Push model** with consumer **Prefetch Limits** (controlling how many unacknowledged messages a worker can pull concurrently) and explicit **Acknowledgments (ACKs)**. If a worker process crashes or returns a NACK (Negative Acknowledgment), RabbitMQ automatically re-queues the message or routes it to a designated **Dead Letter Exchange (DLX)** for inspection, guaranteeing at-least-once task execution across distributed background workers.`,
      dockerCompose: `version: '3.8'
services:
  rabbitmq:
    image: rabbitmq:3.13-management
    ports:
      - "5672:5672"    # AMQP Protocol Port
      - "15672:15672"  # Web Management UI Port
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: secret123`,
      node: {
        producer: `// producer.js (Node.js RabbitMQ Producer using amqplib)
import amqp from 'amqplib';

export async function publishTask(routingKey, taskPayload) {
  const connection = await amqp.connect('amqp://admin:secret123@localhost:5672');
  const channel = await connection.createChannel();

  const exchange = 'app_events_exchange';
  
  // Assert Topic Exchange for flexible wildcard routing
  await channel.assertExchange(exchange, 'topic', { durable: true });

  const messageBuffer = Buffer.from(JSON.stringify(taskPayload));

  // Publish message with persistent delivery mode
  channel.publish(exchange, routingKey, messageBuffer, {
    persistent: true,
    headers: { contentType: 'application/json' }
  });

  console.log(\`Message published to exchange '\${exchange}' with key '\${routingKey}'\`);
  await channel.close();
  await connection.close();
}

// Example Invocation:
publishTask('user.eu.registered', { userId: 42, email: 'user@example.com' });`,
        consumer: `// consumer.js (Node.js RabbitMQ Worker using amqplib)
import amqp from 'amqplib';

async function startRabbitWorker() {
  const connection = await amqp.connect('amqp://admin:secret123@localhost:5672');
  const channel = await connection.createChannel();

  const exchange = 'app_events_exchange';
  const queue = 'email_notification_queue';

  await channel.assertExchange(exchange, 'topic', { durable: true });
  await channel.assertQueue(queue, { durable: true });

  // Bind queue to topic pattern 'user.*.registered'
  await channel.bindQueue(queue, exchange, 'user.*.registered');

  // Enforce prefetch=1 so worker receives 1 unacknowledged message at a time
  channel.prefetch(1);

  console.log(\`[*] Worker listening on queue '\${queue}'...\`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const payload = JSON.parse(msg.content.toString());
      console.log(\`[Received \${msg.fields.routingKey}]:\`, payload);

      try {
        // Execute background email task
        await processEmailSending(payload);
        
        // Manual Acknowledgment
        channel.ack(msg);
      } catch (err) {
        console.error('Job Failed, sending NACK to DLQ:', err);
        channel.nack(msg, false, false); // Re-routes to Dead Letter Exchange!
      }
    }
  });
}

startRabbitWorker().catch(console.error);`
      },
      laravel: {
        producer: `<?php
// app/Jobs/ProcessPaymentJob.php
namespace App\\Jobs;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;

class ProcessPaymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public array $paymentData) {}

    public function handle(): void
    {
        // Executed by Laravel RabbitMQ Worker
        \\Log::info("Processing RabbitMQ Payment Job:", $this->paymentData);
    }
}

// In Controller:
// ProcessPaymentJob::dispatch(['orderId' => 101, 'amount' => 99.99])->onQueue('payments');`,
        consumer: `# Run Laravel RabbitMQ Worker command in Terminal:
php artisan queue:work rabbitmq --queue=payments --tries=3 --timeout=90`
      }
    },

    bullmq: {
      id: "bullmq",
      name: "BullMQ",
      badge: "Redis-Backed Node & Laravel Queue",
      color: "#e0234e",
      accent: "from-rose-500/20 via-pink-500/10 to-slate-900",
      borderColor: "border-rose-500/30",
      icon: "fa-solid fa-bullhorn",
      overview: `BullMQ is a high-performance NodeJS and TypeScript background job and queue management engine built on top of **Redis** data structures. Designed specifically for low-latency asynchronous processing, BullMQ leverages atomic **Redis Lua Scripts** alongside specialized Redis data types—including **Hashes** (for storing job payloads and metadata), **Sorted Sets** (for managing delayed jobs, repeatable cron schedules, and priority ordering), and **Streams / Lists** (for active, waiting, and completed job states). When a **Queue** instance adds a job, BullMQ assigns a unique UUID, serializes the payload object, and writes it into Redis in a sub-millisecond atomic operation. **Worker** instances poll Redis using atomic blocking commands (BRPOPLPUSH), fetching jobs up to a configured **Concurrency** threshold. BullMQ handles job lifecycle events (Active, Completed, Failed, Delayed), supporting exponential backoff retries, rate-limiting (to prevent third-party API rate limit breaches), and parent-child job flow hierarchies, while displaying live cluster telemetry through **Bull-Board** or **Laravel Horizon** monitoring UIs.`,
      dockerCompose: `version: '3.8'
services:
  redis:
    image: redis:7.2-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes`,
      node: {
        producer: `// producer.js (Node.js BullMQ Queue Producer)
import { Queue } from 'bullmq';

const connection = { host: 'localhost', port: 6379 };

// Create Queue instance
export const emailQueue = new Queue('email-queue', { connection });

export async function addEmailJobToQueue(userData) {
  // Add Job with Delayed Execution, Exponential Retries & Priority
  const job = await emailQueue.add('sendWelcomeEmail', userData, {
    delay: 5000,           // Run after 5 seconds delay!
    priority: 1,           // High Priority
    attempts: 3,           // Retry 3 times on failure
    backoff: {
      type: 'exponential', // Exponential backoff (2s, 4s, 8s)
      delay: 2000
    },
    removeOnComplete: true // Auto-clean completed jobs from Redis
  });

  console.log(\`Job \${job.id} added to BullMQ Queue 'email-queue'\`);
}`,
        consumer: `// worker.js (Node.js BullMQ Worker Processor)
import { Worker } from 'bullmq';

const connection = { host: 'localhost', port: 6379 };

const emailWorker = new Worker('email-queue', async (job) => {
  console.log(\`[Job \${job.id}] Processing \${job.name} for \${job.data.email}\`);

  // Execute Async Job Work
  if (!job.data.email) throw new Error('Email address missing');

  await sendMailViaSMTP(job.data);
  return { status: 'SENT', timestamp: new Date() };
}, {
  connection,
  concurrency: 5, // Process 5 jobs concurrently!
  limiter: {
    max: 10,       // Rate Limiting: Max 10 jobs
    duration: 1000 // Per 1000ms (1 second)
  }
});

// Worker Telemetry Event Hooks
emailWorker.on('completed', (job, returnvalue) => {
  console.log(\`[Job \${job.id}] Completed successfully:\`, returnvalue);
});

emailWorker.on('failed', (job, err) => {
  console.error(\`[Job \${job.id}] Failed with error:\`, err.message);
});`
      },
      laravel: {
        producer: `<?php
// app/Jobs/GeneratePdfReport.php (Laravel Redis Queue Job)
namespace App\\Jobs;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;

class GeneratePdfReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $timeout = 120;

    public function __construct(public int $userId) {}

    public function handle(): void
    {
        // Executes asynchronously via Redis Queue Worker
        \\Log::info("Generating PDF Report for User #{$this->userId}");
    }
}

// In Controller:
// GeneratePdfReport::dispatch(42)->onQueue('reports')->delay(now()->addSeconds(5));`,
        consumer: `# Run Laravel Redis Queue Worker in Terminal:
php artisan queue:work redis --queue=reports --tries=3 --concurrency=5

# Or Monitor via Laravel Horizon Dashboard:
php artisan horizon`
      }
    },

    prisma: {
      id: "prisma",
      name: "Prisma ORM",
      badge: "Type-Safe DB & Migrations Engine",
      color: "#2d3748",
      accent: "from-slate-700/30 via-slate-800/20 to-slate-900",
      borderColor: "border-slate-600/40",
      icon: "fa-solid fa-gem",
      overview: `Prisma ORM is a next-generation open-source object-relational mapping tool for Node.js, TypeScript, and serverless environments. Unlike traditional ORMs that rely on ActiveRecord classes or raw SQL string concatenation, Prisma uses a single declarative schema file (schema.prisma) to model database entities, scalar fields, enums, and relationships (1-to-1, 1-to-Many, Many-to-Many). Running npx prisma generate compiles the schema into an optimized Rust Query Engine binary and auto-generates a strongly-typed Prisma Client JS/TS library. When application code invokes a query method (such as prisma.user.create() or prisma.post.findMany()), Prisma Client serializes the JavaScript query object into a structured AST (Abstract Syntax Tree) and passes it to the Rust Query Engine over an IPC channel. The Rust engine optimizes query execution, translates the AST into targeted dialect SQL (PostgreSQL, MySQL, SQLite, CockroachDB), manages connection pools, and returns type-safe JavaScript objects. Prisma also handles database schema evolution via Prisma Migrate (npx prisma migrate dev), tracking migration history files and generating deterministic SQL DDL scripts for development and production deployments.`,
      dockerCompose: `version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123password
      POSTGRES_DB: app_db`,
      node: {
        producer: `// prisma/schema.prisma (Schema Blueprint)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

enum Role {
  USER
  ADMIN
}

// -------------------------------------------------------------
// src/services/userService.ts (Type-Safe Node.js Query Execution)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUserWithPosts() {
  // Nested relational create in 1 single transaction!
  const user = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Smith',
      role: 'ADMIN',
      posts: {
        create: [
          { title: 'Getting Started with Next.js 15', published: true },
          { title: 'Prisma ORM Best Practices', published: true }
        ]
      }
    },
    include: { posts: true } // Return user + posts!
  });

  console.log('Created User ID:', user.id);
  console.log('User Posts:', user.posts.length);
  return user;
}`,
        consumer: `// src/services/queryService.ts (Advanced Queries & Interactive Transactions)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 1. Filtered Query with Select (Targeted Columns)
export async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
      author: { role: 'ADMIN' }
    },
    select: {
      id: true,
      title: true,
      author: {
        select: { name: true, email: true }
      }
    },
    orderBy: { id: 'desc' },
    take: 10
  });
}

// 2. Interactive Transaction ($transaction)
export async function transferOwnership(postId: number, newAuthorId: number) {
  return await prisma.$transaction(async (tx) => {
    const post = await tx.post.findUnique({ where: { id: postId } });
    if (!post) throw new Error('Post not found');

    const updatedPost = await tx.post.update({
      where: { id: postId },
      data: { authorId: newAuthorId }
    });

    return updatedPost;
  });
}`
      },
      laravel: {
        producer: `<?php
// 1. Laravel Migration (database/migrations/2026_01_01_000000_create_users_table.php)
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('email')->unique();
    $table->string('name');
    $table->enum('role', ['USER', 'ADMIN'])->default('USER');
    $table->timestamps();
});

// 2. Laravel Eloquent Model (app/Models/User.php)
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;

class User extends Model
{
    protected $fillable = ['email', 'name', 'role'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// 3. Creating User with Posts in Laravel (Controller / Service)
$user = DB::transaction(function () {
    $user = User::create([
        'email' => 'alice@example.com',
        'name' => 'Alice Smith',
        'role' => 'ADMIN'
    ]);

    $user->posts()->createMany([
        ['title' => 'Getting Started with Next.js 15', 'published' => true],
        ['title' => 'Prisma vs Eloquent', 'published' => true]
    ]);

    return $user->load('posts');
});`,
        consumer: `# Run Prisma CLI commands in Terminal:
npx prisma migrate dev --name init # Run migrations & generate client
npx prisma studio                   # Launch interactive GUI browser editor
npx prisma db pull                  # Introspect existing database schema`
      }
    }
  };

  const current = integrations[activeTech];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <SEO 
        title={`${current.name} Integration & Architecture Lab | DEV MASTER`}
        description={`Production integration guide for ${current.name} (${current.badge}). Includes Node.js and Laravel code setups, Docker Compose configs, Producers, and Consumers.`}
      />
      
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-[#121722] border border-slate-800/80 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <i className="fa-solid fa-diagram-project"></i> Integration Workflows & Execution Pipelines
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Message Queues & Event Streaming Integrations
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Explore complete end-to-end working flow examples for high-performance event streaming and task queuing engines. Compare architectures and copy production-ready code for <strong className="text-emerald-400">Node.js</strong> and <strong className="text-red-400">Laravel</strong>.
          </p>
        </div>
      </div>

      {/* Technology Selector Tabs - Refined Compact Pills */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {Object.values(integrations).map((tech) => (
          <button
            key={tech.id}
            onClick={() => { setActiveTech(tech.id); setActiveStep('overview'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm ${
              activeTech === tech.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/20'
                : 'bg-[#121722] text-slate-300 hover:text-white border-slate-800 hover:bg-slate-800/40'
            }`}
          >
            <i className={`${tech.icon} text-sm`}></i>
            <span>{tech.name}</span>
          </button>
        ))}
      </div>

      {/* Main Integration Card */}
      <div className="rounded-2xl bg-[#121722] border border-slate-800/80 p-5 sm:p-7 space-y-6 shadow-xl">
        
        {/* Card Title & Language Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl shadow-inner flex-shrink-0">
              <i className={current.icon}></i>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                {current.name} Integration
              </h2>
              <span className="text-xs font-semibold text-slate-400">{current.badge}</span>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#0b0e14] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveLang('node')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLang === 'node'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-brands fa-node-js text-emerald-400"></i> Node.js
            </button>
            <button
              onClick={() => setActiveLang('laravel')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLang === 'laravel'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-brands fa-laravel text-red-400"></i> Laravel
            </button>
          </div>
        </div>

        {/* First Paragraph: Detailed Architecture & How It Works */}
        <div className="space-y-2 bg-[#0b0e14] p-5 rounded-xl border border-slate-800/80 shadow-inner">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <i className="fa-solid fa-circle-info"></i> What is {current.name} & How It Works in Detail
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            {current.overview}
          </p>
        </div>

        {/* Execution Flow Steps Navigation */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Execution Flow Steps:
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setActiveStep('overview')}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                activeStep === 'overview'
                  ? 'bg-indigo-500/10 border-indigo-500 text-white font-bold'
                  : 'bg-[#0b0e14] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[9px] uppercase font-bold text-indigo-400">Step 1</div>
              <div className="text-xs font-semibold truncate">Architecture Flow</div>
            </button>

            <button
              onClick={() => setActiveStep('producer')}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                activeStep === 'producer'
                  ? 'bg-indigo-500/10 border-indigo-500 text-white font-bold'
                  : 'bg-[#0b0e14] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[9px] uppercase font-bold text-emerald-400">Step 2</div>
              <div className="text-xs font-semibold truncate">Producer ({activeLang === 'node' ? 'Node.js' : 'Laravel'})</div>
            </button>

            <button
              onClick={() => setActiveStep('consumer')}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                activeStep === 'consumer'
                  ? 'bg-indigo-500/10 border-indigo-500 text-white font-bold'
                  : 'bg-[#0b0e14] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[9px] uppercase font-bold text-amber-400">Step 3</div>
              <div className="text-xs font-semibold truncate">Consumer / Worker</div>
            </button>

            <button
              onClick={() => setActiveStep('docker')}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                activeStep === 'docker'
                  ? 'bg-indigo-500/10 border-indigo-500 text-white font-bold'
                  : 'bg-[#0b0e14] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[9px] uppercase font-bold text-sky-400">Step 4</div>
              <div className="text-xs font-semibold truncate">Docker Compose</div>
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="bg-[#0b0e14] rounded-xl border border-slate-800/80 overflow-hidden shadow-xl">
          <div className="bg-[#121722] px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-xs font-mono text-slate-400">
                {activeStep === 'docker'
                  ? 'docker-compose.yml'
                  : activeStep === 'producer'
                  ? activeLang === 'node' ? 'producer.js' : 'OrderProducer.php'
                  : activeStep === 'consumer'
                  ? activeLang === 'node' ? 'consumer.js' : 'OrderConsumerWorker.php'
                  : 'architecture-flow.md'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {activeLang === 'node' ? 'Node.js ESM' : 'Laravel PHP 8.2+'}
            </span>
          </div>

          <div className="p-4 overflow-x-auto">
            <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
              <code>
                {activeStep === 'docker' && current.dockerCompose}
                {activeStep === 'producer' && current[activeLang].producer}
                {activeStep === 'consumer' && current[activeLang].consumer}
                {activeStep === 'overview' && (
                  activeLang === 'node'
                    ? `// PRODUCER (Node.js):\n${current.node.producer}\n\n// CONSUMER (Node.js):\n${current.node.consumer}`
                    : `// PRODUCER (Laravel):\n${current.laravel.producer}\n\n// CONSUMER (Laravel):\n${current.laravel.consumer}`
                )}
              </code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
