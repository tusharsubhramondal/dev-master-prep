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
      "Interfacing Node.js BullMQ workers with Redis queue monitoring"
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
});`,
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
      "Setting concurrency too high on CPU-bound tasks (causes thread starvation)",
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
  }),

  // 3. RETRIES, BACKOFF & DELAY JOBS
  "bullmq-retries": createTopicSchema({
    id: "bullmq-retries",
    techId: "bullmq",
    title: "BullMQ Job Retries, Exponential Backoff & Delay Jobs",
    category: "Job Queues",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["bullmq-workers"],
    definition: "BullMQ supports automatic job retries with exponential backoff algorithms, delayed executions, priority ordering, and repeatable cron schedules.",
    simpleExplanation: "If a job fails, BullMQ retries it automatically after waiting 2s, 4s, 8s. You can also delay jobs or schedule repeating cron jobs.",
    whyDoesItExist: "Ensures background tasks recover automatically from temporary network failures.",
    basicExample: `# 1. RETRIES & EXPONENTIAL BACKOFF
await emailQueue.add('sendEmail', payload, {
  attempts: 5,
  backoff: {
    type: 'exponential', // Retries after 2s, 4s, 8s, 16s...
    delay: 2000
  }
});

# 2. REPEATABLE CRON JOB
await emailQueue.add('dailyReport', {}, {
  repeat: { cron: '0 0 * * *' } // Runs daily at midnight!
});`,
    howItWorks: [
      "1. Failed job is caught by worker try-catch handler.",
      "2. BullMQ moves job to Redis Delayed Sorted Set with target execution timestamp (`Date.now() + backoffDelay`).",
      "3. When timer expires, job is moved back to Waiting list for worker retry."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Failed Job -&gt; Exponential Backoff Timer (Redis Sorted Set) -&gt; Re-queued for Worker Retry</text></svg>`,
    realWorldExample: `// Automatic Job Cleanup Options:
await emailQueue.add('cleanupJob', data, {
  removeOnComplete: true, // Delete from Redis immediately when completed!
  removeOnFail: { count: 100 } // Keep last 100 failed jobs for debugging
});`,
    commonUseCases: [
      "Retrying failed SMTP email sends with exponential backoff",
      "Scheduling reminder emails after 24 hours (`delay: 86400000`)",
      "Running midnight database cleanup cron jobs"
    ],
    commonMistakes: [
      "Not setting `removeOnComplete` causing Redis memory bloat from millions of finished job objects",
      "Using fixed backoff for third-party API retries (risks hammering API during outages; use exponential backoff!)"
    ],
    bestPractices: [
      "Use `type: 'exponential'` backoff for third-party API requests",
      "Always configure `removeOnComplete: true` to conserve Redis RAM"
    ],
    whenToUse: ["In all background job queue configurations"],
    whenNotToUse: ["Do not use infinite retry attempts"],
    relatedConcepts: ["Exponential Backoff", "Delay Jobs", "Cron Repeatable", "removeOnComplete"],
    comparison: {
      title: "Fixed vs Exponential Backoff",
      headers: ["Strategy", "Delay Pattern (delay: 2000)", "Best Used For"],
      rows: [
        ["Fixed Backoff", "2s, 2s, 2s, 2s", "Quick internal database reconnects"],
        ["Exponential Backoff", "2s, 4s, 8s, 16s", "External third-party API rate limits & network recovery"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How does exponential backoff work in BullMQ retries?", answer: "Exponential backoff doubles the delay between consecutive retry attempts (e.g. 2s, 4s, 8s, 16s). This prevents overwhelming failed downstream services or third-party APIs during outages." }
    ],
    practiceProblem: {
      description: "Write backoff type string for exponential backoff.",
      starterCode: `exponential`,
      testAssertion: "true",
      solution: `exponential`
    },
    quickRevision: "★ Exponential backoff doubles retry delays (2s, 4s, 8s).\n★ Delayed jobs execute after a set millisecond timer.\n★ Set `removeOnComplete: true` to prevent Redis RAM bloat."
  }),

  // 4. PARENT-CHILD FLOWS & BULL-BOARD
  "bullmq-flows": createTopicSchema({
    id: "bullmq-flows",
    techId: "bullmq",
    title: "BullMQ Parent-Child Job Flows & Bull-Board Dashboard UI",
    category: "Job Queues",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["bullmq-retries"],
    definition: "FlowProducer manages complex parent-child job dependencies (executing child jobs first before starting parent job). Bull-Board provides a visual web dashboard UI for queue management.",
    simpleExplanation: "Flows let you create job trees where child jobs execute first (e.g. process 3 image sizes) before triggering the parent job (send email notification).",
    whyDoesItExist: "Manages complex multi-step background workflows and provides visual queue monitoring.",
    basicExample: `# 1. BULLMQ FLOWPRODUCER (Parent-Child Dependency)
import { FlowProducer } from 'bullmq';
const flowProducer = new FlowProducer({ connection });

await flowProducer.add({
  name: 'send-final-email', // Parent Job (runs LAST!)
  queueName: 'email-queue',
  children: [
    { name: 'resize-small', queueName: 'image-queue', data: { size: 'small' } },
    { name: 'resize-large', queueName: 'image-queue', data: { size: 'large' } }
  ]
});

# 2. BULL-BOARD DASHBOARD SETUP
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
createBullBoard({ queues: [new BullMQAdapter(emailQueue)], serverAdapter });
app.use('/admin/queues', serverAdapter.getRouter());`,
    howItWorks: [
      "1. FlowProducer registers parent job and child jobs in Redis dependency tree.",
      "2. Parent job waits in WaitingChildren state until ALL child jobs succeed.",
      "3. Once all children complete, parent job automatically moves to Active queue for execution."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Child Jobs (Resize Small/Large) -&gt; Complete -&gt; Parent Job (Send Email)</text></svg>`,
    realWorldExample: `// Monitoring job flow progress in Bull-Board UI at http://localhost:3000/admin/queues`,
    commonUseCases: [
      "Creating multi-step video encoding & thumbnail generation pipelines",
      "Visualizing queue active, failed, and completed states in Bull-Board UI",
      "Retrying failed child jobs without restarting the entire workflow"
    ],
    commonMistakes: [
      "Forgetting to mount Bull-Board under authentication middleware in production (exposes job data!)",
      "Creating circular dependencies in job flows"
    ],
    bestPractices: [
      "Secure Bull-Board UI endpoints with admin basic-auth in production",
      "Use FlowProducer for complex multi-stage background pipelines"
    ],
    whenToUse: ["In all complex multi-job dependency workflows"],
    whenNotToUse: ["Do not use FlowProducer for simple 1-off background jobs"],
    relatedConcepts: ["FlowProducer", "Parent-Child Flow", "Bull-Board UI", "WaitingChildren"],
    comparison: {
      title: "Single Queue vs FlowProducer",
      headers: ["Pattern", "Dependency Management", "Use Case"],
      rows: [
        ["Single Queue", "Independent jobs executed in order", "Simple email sending, webhook delivery"],
        ["FlowProducer", "Parent waits for array of child jobs to complete first", "Multi-resolution video encoding, bulk report aggregations"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do Parent-Child Job Flows work in BullMQ FlowProducer?", answer: "FlowProducer builds a dependency tree in Redis. Parent jobs are placed in a `WaitingChildren` state. Worker nodes execute all child jobs first. Only when every child job succeeds does BullMQ automatically move the parent job to the active queue." }
    ],
    practiceProblem: {
      description: "Write BullMQ class name used for parent-child job flows.",
      starterCode: `FlowProducer`,
      testAssertion: "true",
      solution: `FlowProducer`
    },
    quickRevision: "★ FlowProducer builds parent-child job dependency trees.\n★ Parent waits in `WaitingChildren` until all child jobs finish.\n★ Bull-Board provides visual web UI for queue telemetry."
  })
};
