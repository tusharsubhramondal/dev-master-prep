import { createTopicSchema } from './createTopicSchema.js';

export const bullmqTopics = {
  // 1. BULLMQ CORE CONCEPTS
  "bullmq-basics": createTopicSchema({
    id: "bullmq-basics",
    techId: "bullmq",
    title: "BullMQ Core Architecture & Redis Queue Setup",
    category: "Job Queues",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Redis Basics"],
    definition: "BullMQ is a fast, reliable NodeJS background job and message queue library built on Redis data structures (Streams, Hashes, Sorted Sets) providing job scheduling, retries, and rate-limiting.",
    simpleExplanation: "BullMQ manages background jobs (sending emails, video encoding) backed by high-speed Redis memory.",
    whyDoesItExist: "Provides robust, zero-latency job queuing for Node.js and Laravel microservice environments.",
    basicExample: `# 1. NODE.JS BULLMQ SETUP (bullmq)
import { Queue, Worker } from 'bullmq';

const connection = { host: 'localhost', port: 6379 };

// Producer Queue
const emailQueue = new Queue('emails', { connection });
await emailQueue.add('sendWelcome', { email: 'user@example.com' });

// Worker Processor
const worker = new Worker('emails', async (job) => {
  console.log(\`Sending email to \${job.data.email}\`);
}, { connection });

# 2. LARAVEL REDIS QUEUE COMPARISON (Illuminate\\Queue)
// Laravel natively uses Redis queues similar to BullMQ!
// config/queue.php -> 'default' => 'redis'
ProcessEmailJob::dispatch($user->email)->onQueue('emails');`,
    howItWorks: [
      "1. Queue pushes job payload object into Redis stream / sorted set.",
      "2. Worker polls Redis atomically using BRPOPLPUSH lua scripts.",
      "3. Executes async processing function and updates job state (Completed / Failed)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Producer Queue -&gt; Redis Memory Store -&gt; Worker (Atomic Lua Script) -&gt; Job Completed</text></svg>`,
    realWorldExample: `// Adding a Delayed Job (Runs after 5 seconds!):
await emailQueue.add('sendReminder', { userId: 42 }, { delay: 5000 });`,
    commonUseCases: [
      "Offloading slow background tasks (sending emails, generating PDFs)",
      "Scheduling delayed jobs and repeatable cron tasks",
      "Interfacing Node.js BullMQ workers with Laravel Horizon Redis queue monitoring"
    ],
    commonMistakes: [
      "Re-using a single global Redis connection instance for multiple workers without maxListeners tuning",
      "Forgetting to handle worker error events (`worker.on('failed', (job, err) => ...)`)"
    ],
    bestPractices: [
      "Always attach error listeners to Worker instances to catch failed jobs",
      "Use ioredis connection options tuned for BullMQ"
    ],
    whenToUse: ["In all Node.js and Redis-backed background job queue architectures"],
    whenNotToUse: ["Do not use BullMQ without a running Redis server instance"],
    relatedConcepts: ["BullMQ Queue", "Worker", "Redis Backend", "Delayed Jobs"],
    comparison: {
      title: "BullMQ vs Traditional RabbitMQ",
      headers: ["Metric", "BullMQ (Redis)", "RabbitMQ (AMQP)"],
      rows: [
        ["Infrastructure", "Requires Redis server", "Requires RabbitMQ server"],
        ["Node.js Integration", "Native JS/TS first-class developer experience", "AMQP driver library"],
        ["Job Dashboard", "Bull-Board UI / Horizon", "RabbitMQ Management UI"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What storage backend does BullMQ require and how does it manage job states?", answer: "BullMQ requires Redis. It uses atomic Redis Lua scripts and data structures (Hashes, Sorted Sets, Streams) to move jobs between Waiting, Active, Completed, Delayed, and Failed states." }
    ],
    practiceProblem: {
      description: "Write BullMQ Queue instantiation line for 'reports'.",
      starterCode: `const reportQueue = new Queue('reports', { connection });`,
      testAssertion: "true",
      solution: `const reportQueue = new Queue('reports', { connection });`
    },
    quickRevision: "★ BullMQ manages background jobs using Redis.\n★ Queue adds jobs; Worker processes jobs.\n★ Supports delayed, repeatable, and priority jobs."
  }),

  // 2. WORKERS & CONCURRENCY
  "bullmq-workers": createTopicSchema({
    id: "bullmq-workers",
    techId: "bullmq",
    title: "BullMQ Workers, Concurrency & Rate-Limiting",
    category: "Job Queues",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["bullmq-basics"],
    definition: "BullMQ Workers process jobs from queues. Concurrency controls parallel job execution per worker, while Rate-Limiting caps jobs per time window to prevent third-party API rate limit bans.",
    simpleExplanation: "Concurrency lets 1 worker process 10 jobs at once. Rate-limiting caps job execution (e.g. max 100 jobs per 60 seconds).",
    whyDoesItExist: "Prevents background worker overload and respects external API rate limits.",
    basicExample: `# 1. NODE.JS BULLMQ WORKER WITH CONCURRENCY & RATE LIMIT
const worker = new Worker('pdf-queue', async (job) => {
  await generatePdf(job.data);
}, {
  connection,
  concurrency: 5, // Process 5 jobs in parallel!
  limiter: {
    max: 10,       // Max 10 jobs
    duration: 1000 // Per 1000ms (1 second)
  }
});

# 2. LARAVEL REDIS QUEUE WORKER EQUIVALENT
# Command: php artisan queue:work redis --queue=pdf-queue --concurrency=5`,
    howItWorks: [
      "1. Worker fetches N jobs in parallel up to `concurrency` setting.",
      "2. Limiter checks Redis sliding counter before assigning job to worker.",
      "3. If limit exceeded, jobs remain in Waiting state until rate window resets."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Queue -&gt; Rate Limiter (Max 10/sec) -&gt; Worker Pool (Concurrency: 5)</text></svg>`,
    realWorldExample: `// Worker event monitoring:
worker.on('completed', job => console.log(\`Job \${job.id} done!\`));
worker.on('failed', (job, err) => console.error(\`Job \${job.id} failed: \${err.message}\`));`,
    commonUseCases: [
      "Scaling PDF generation speed by increasing worker concurrency",
      "Rate-limiting third-party API requests (e.g. OpenAI / Stripe API limits)",
      "Distributing worker tasks across multiple CPU cores"
    ],
    commonMistakes: [
      "Setting concurrency too high on CPU-bound tasks (causes thread starvation; match concurrency to available CPU cores!)",
      "Forgetting to handle unhandled exceptions inside worker functions"
    ],
    bestPractices: [
      "Match concurrency to system CPU capacity for CPU-heavy tasks",
      "Attach 'completed' and 'failed' event handlers to monitor worker health"
    ],
    whenToUse: ["In all BullMQ worker pool configurations"],
    whenNotToUse: ["Do not set infinite concurrency"],
    relatedConcepts: ["Concurrency", "Rate Limiter", "Worker Events", "Bull-Board"],
    comparison: {
      title: "Concurrency vs Parallel Worker Instances",
      headers: ["Mechanism", "Scale Location", "Best Used For"],
      rows: [
        ["Worker Concurrency", "Inside a single Node.js process (`concurrency: 5`)", "Async I/O-bound jobs (network requests, DB queries)"],
        ["Parallel Worker Processes", "Multiple PM2 process instances or container replicas", "CPU-bound heavy compute jobs"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between concurrency and running multiple worker instances in BullMQ?", answer: "`concurrency` controls how many jobs a single Node.js worker process executes concurrently using async event loop ticks. Running multiple worker instances scales across separate CPU cores or server nodes." }
    ],
    practiceProblem: {
      description: "Write BullMQ worker option setting concurrency to 10.",
      starterCode: `{ concurrency: 10 }`,
      testAssertion: "true",
      solution: `{ concurrency: 10 }`
    },
    quickRevision: "★ `concurrency` controls parallel jobs per worker process.\n★ `limiter` caps job executions per time window.\n★ Attach 'failed' event listeners to catch errors."
  })
};
