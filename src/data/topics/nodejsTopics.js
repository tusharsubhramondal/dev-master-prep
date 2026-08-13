import { createTopicSchema } from './createTopicSchema.js';

export const nodejsTopics = {
  // 1. NODE.JS ES6+ CORE
  "nodejs-es6": createTopicSchema({
    id: "nodejs-es6",
    techId: "nodejs",
    title: "Node.js ES6+ Core & Asynchronous Mechanics",
    category: "Node.js Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["JavaScript Basics"],
    definition: "Node.js executes JavaScript on Chrome's V8 engine server-side. Mastering ES6+ syntax (Arrow Functions, Promises, Async/Await, Destructuring) is essential for non-blocking asynchronous backend code.",
    simpleExplanation: "Node.js runs JavaScript on a server instead of inside a browser, letting you write APIs, interact with databases, and handle backend files using modern ES6+ syntax.",
    whyDoesItExist: "Allows full-stack developers to write both frontend and backend code in unified JavaScript without learning a separate backend language like C# or PHP.",
    basicExample: `// Asynchronous file reading using ES Module & Promises
import { readFile } from 'node:fs/promises';

async function loadConfig() {
  try {
    const data = await readFile('./config.json', 'utf-8');
    const config = JSON.parse(data);
    console.log("Server Config Loaded:", config.port);
  } catch (err) {
    console.error("Config Load Failed:", err.message);
  }
}
loadConfig();`,
    howItWorks: [
      "1. Node.js V8 engine parses ES6 JavaScript code into bytecode.",
      "2. Async functions wrap execution in Promises handled by V8 call stack.",
      "3. Uncaught async rejections trigger process 'unhandledRejection' events."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">V8 Engine Server-Side Execution Flow</text></svg>`,
    realWorldExample: `// Asynchronous API handler returning JSON response
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'UP', timestamp: Date.now() }));
  }
});
server.listen(3000);`,
    commonUseCases: [
      "Writing asynchronous non-blocking web servers",
      "Parsing JSON configuration files on boot",
      "Encapsulating server utility functions with ES Modules"
    ],
    commonMistakes: [
      "Using synchronous FS calls (readFileSync) in HTTP request handlers",
      "Forgetting try/catch blocks around awaited promises in route handlers"
    ],
    bestPractices: [
      "Always use node: prefixed built-in imports (e.g. node:fs/promises)",
      "Prefer async/await over raw nested promise .then() chains"
    ],
    whenToUse: ["In all modern Node.js backend services and microservices"],
    whenNotToUse: ["When building static browser-only HTML pages without a server"],
    relatedConcepts: ["V8 Engine", "Promises", "Async/Await", "Event Loop"],
    comparison: {
      title: "Node.js Async vs Synchronous Backend Patterns",
      headers: ["Metric", "Async Non-Blocking (Node.js)", "Sync Blocking"],
      rows: [
        ["Throughput", "High (Thousands of req/sec)", "Low (Threads blocked on I/O)"],
        ["Memory Usage", "Low (Single thread)", "High (Thread-per-request)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is Node.js considered single-threaded?", answer: "Node.js executes user JavaScript code on a single V8 main thread, while delegating I/O tasks to libuv background thread pool worker threads." }
    ],
    practiceProblem: {
      description: "Write an async function loadPortConfig that resolves a default port 8080 if input is null.",
      starterCode: `async function loadPortConfig(inputPort) {\n  return inputPort ?? 8080;\n}\nconsole.log(await loadPortConfig(null));`,
      testAssertion: "loadPortConfig(null) === 8080",
      solution: `async function loadPortConfig(inputPort) {\n  return inputPort ?? 8080;\n}`
    },
    quickRevision: "★ Node.js executes JS via V8 server-side.\n★ Always use async non-blocking operations for I/O tasks.\n★ Use node: imports for standard modules."
  }),

  // 2. NODE FUNDAMENTALS
  "nodejs-fundamentals": createTopicSchema({
    id: "nodejs-fundamentals",
    techId: "nodejs",
    title: "Node.js Fundamentals (Global Objects, Process, Buffer & FS)",
    category: "Node.js Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "11 min",
    prerequisites: ["nodejs-es6"],
    definition: "Node.js built-in global objects (global, process, Buffer) and core modules (node:path, node:fs) provide low-level operating system APIs without external dependencies.",
    simpleExplanation: "Node gives you global variables to inspect server processes (process.env, process.cwd()), read binary files (Buffer), and manipulate filesystem paths (fs, path).",
    whyDoesItExist: "Enables JavaScript to read/write operating system files, manage system environment variables, and process raw binary data packets.",
    basicExample: `import process from 'node:process';
import path from 'node:path';

// Environment variables & process directory
const PORT = process.env.PORT || 5000;
const configPath = path.join(process.cwd(), 'config', 'app.json');

console.log("Running on Port:", PORT);
console.log("Resolved Path:", configPath);`,
    howItWorks: [
      "1. process object exposes current Node process info and kill signals.",
      "2. Buffer allocates fixed-length memory outside V8 heap for binary data.",
      "3. path module normalizes cross-platform path separators (/ vs \\)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Node Core Modules: process | Buffer | fs | path</text></svg>`,
    realWorldExample: `import { readFile } from 'node:fs/promises';
import Buffer from 'node:buffer';

// Reading binary image into Buffer and encoding to base64
async function encodeImage(filePath) {
  const fileBuffer = await readFile(filePath);
  const base64String = fileBuffer.toString('base64');
  return \`data:image/png;base64,\${base64String}\`;
}`,
    commonUseCases: [
      "Reading environment secrets from process.env",
      "Manipulating local filesystem files asynchronously",
      "Decoding binary network buffers into UTF-8 strings"
    ],
    commonMistakes: [
      "Hardcoding Windows backslashes (\\\\) instead of using path.join()",
      "Using process.exit() abruptly without cleaning up open database connections"
    ],
    bestPractices: [
      "Use path.join() or path.resolve() for platform-agnostic file paths",
      "Handle process SIGTERM signals gracefully for zero-downtime server reboots"
    ],
    whenToUse: ["In any Node.js CLI script, web backend, or file processor"],
    whenNotToUse: ["In client-side web browser JavaScript where filesystem access is blocked"],
    relatedConcepts: ["Buffer", "process.env", "node:fs", "node:path"],
    comparison: {
      title: "Buffer vs V8 ArrayBuffer",
      headers: ["Feature", "Node.js Buffer", "JS ArrayBuffer"],
      rows: [
        ["Allocation", "Allocated outside V8 heap (Unsafe/Fast)", "Standard V8 heap allocation"],
        ["Primary Use", "TCP streams, File I/O binary data", "TypedArrays in browser/canvas"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is a Buffer in Node.js?", answer: "A Buffer is a built-in Node class used to store raw binary byte data allocated outside the V8 heap memory." }
    ],
    practiceProblem: {
      description: "Write a function getEnvPort that returns process.env.PORT converted to integer or fallback 3000.",
      starterCode: `function getEnvPort(envObj) {\n  return parseInt(envObj?.PORT, 10) || 3000;\n}\nconsole.log(getEnvPort({ PORT: "8080" }));`,
      testAssertion: "getEnvPort({ PORT: '8080' }) === 8080",
      solution: `function getEnvPort(envObj) {\n  return parseInt(envObj?.PORT, 10) || 3000;\n}`
    },
    quickRevision: "★ Use process.env for environment secrets.\n★ Use Buffer for raw binary streams.\n★ Use node:path for cross-platform file paths."
  }),

  // 3. MODULES & NPM
  "nodejs-modules": createTopicSchema({
    id: "nodejs-modules",
    techId: "nodejs",
    title: "Node.js Module System (CommonJS vs ESM & NPM)",
    category: "Architecture",
    difficulty: "Beginner",
    experienceBand: "0–2 years",
    readingTime: "10 min",
    prerequisites: ["nodejs-fundamentals"],
    definition: "Node.js supports CommonJS (require/module.exports) and native ES Modules (import/export). Package management is driven by NPM package.json & semantic versioning.",
    simpleExplanation: "Modules let you split backend code into clean files. NPM lets you install thousands of open-source packages (like express, mongoose, jsonwebtoken).",
    whyDoesItExist: "Organizes monolithic server code into modular components and enables dependency management.",
    basicExample: `// ES Module Export (logger.js)
export function logInfo(msg) {
  console.log(\`[\${new Date().toISOString()}] INFO: \${msg}\`);
}

// ES Module Import (app.js)
import { logInfo } from './logger.js';
logInfo("Server booting...");`,
    howItWorks: [
      "1. CommonJS resolves modules synchronously at runtime via require().",
      "2. ES Modules parse static import graphs asynchronously before execution.",
      "3. npm install reads package.json and locks exact versions in package-lock.json."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">CommonJS (require) vs ES Modules (import)</text></svg>`,
    realWorldExample: `// Dynamically importing optional plugin module
async function loadPaymentGateway(gatewayName) {
  if (gatewayName === 'stripe') {
    const { processStripe } = await import('./gateways/stripe.js');
    return processStripe;
  }
  const { processPaypal } = await import('./gateways/paypal.js');
  return processPaypal;
}`,
    commonUseCases: [
      "Creating reusable npm libraries and internal packages",
      "Locking production dependency versions using package-lock.json",
      "Structuring code using clean controllers, services, and repositories"
    ],
    commonMistakes: [
      "Mixing require() and import in the same file without configuring 'type': 'module'",
      "Deleting package-lock.json causing accidental breaking dependency updates in production"
    ],
    bestPractices: [
      "Set 'type': 'module' in package.json for modern ES Module codebases",
      "Commit package-lock.json to Git for deterministic deployment builds"
    ],
    whenToUse: ["In every Node.js application codebase"],
    whenNotToUse: ["When writing a single-line inline bash script"],
    relatedConcepts: ["CommonJS", "ESM", "NPM", "package-lock.json"],
    comparison: {
      title: "CommonJS vs ES Modules in Node.js",
      headers: ["Aspect", "CommonJS (CJS)", "ES Modules (ESM)"],
      rows: [
        ["Syntax", "require() / module.exports", "import / export"],
        ["Loading", "Synchronous at runtime", "Asynchronous static parsing"],
        ["Top-level await", "Not supported", "Fully supported"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the purpose of package-lock.json?", answer: "package-lock.json records the exact version tree of all installed npm dependencies to ensure reproducible builds across different environments." }
    ],
    practiceProblem: {
      description: "Write a function parseSemverMajor that takes a semver string '^18.12.1' and returns major number 18.",
      starterCode: `function parseSemverMajor(versionStr) {\n  const clean = versionStr.replace(/[^0-9.]/g, '');\n  return parseInt(clean.split('.')[0], 10);\n}\nconsole.log(parseSemverMajor("^18.12.1"));`,
      testAssertion: "parseSemverMajor('^18.12.1') === 18",
      solution: `function parseSemverMajor(versionStr) {\n  const clean = versionStr.replace(/[^0-9.]/g, '');\n  return parseInt(clean.split('.')[0], 10);\n}`
    },
    quickRevision: "★ ESM uses import/export, CJS uses require().\n★ package-lock.json ensures exact dependency versions.\n★ Use 'type': 'module' in package.json for modern ESM."
  }),

  // 4. NODE STREAMS
  "nodejs-streams": createTopicSchema({
    id: "nodejs-streams",
    techId: "nodejs",
    title: "Node.js Streams, Pipes & Backpressure Handling",
    category: "Advanced I/O",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["nodejs-fundamentals"],
    definition: "Streams are data-handling channels in Node.js that process data piece-by-piece (chunks) without buffering entire files into memory. Backpressure handles flow control.",
    simpleExplanation: "Instead of loading a 5GB video entirely into RAM before serving it, streams pipe chunks of video data continuously to the browser client.",
    whyDoesItExist: "Prevents memory exhaustion (heap out of memory errors) when handling massive files or real-time network sockets.",
    basicExample: `import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

// Compress file using stream piping & automatic backpressure
async function compressFile(inputPath, outputPath) {
  await pipeline(
    createReadStream(inputPath),
    createGzip(),
    createWriteStream(outputPath)
  );
  console.log("File compression complete!");
}`,
    howItWorks: [
      "1. Readable Stream emits 'data' chunks into internal buffer.",
      "2. Writable Stream returns false if internal buffer fills (Backpressure).",
      "3. pipeline() automatically pauses readable stream until buffer drains."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/><text x="350" y="95" fill="#22d3ee" font-weight="bold" text-anchor="middle">Readable Stream -&gt; Transform Stream -&gt; Writable Stream</text></svg>`,
    realWorldExample: `import http from 'node:http';
import { createReadStream } from 'node:fs';

// Stream video file response to client
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'video/mp4' });
  const videoStream = createReadStream('./large-video.mp4');
  videoStream.pipe(res);
}).listen(8080);`,
    commonUseCases: [
      "Streaming large file downloads/uploads",
      "Compressing/Encrypting data streams on the fly",
      "Parsing massive multi-gigabyte CSV/JSON files chunk by chunk"
    ],
    commonMistakes: [
      "Using fs.readFile() for 2GB files causing Node process Out Of Memory crash",
      "Using raw stream .pipe() without proper error handlers (use pipeline() instead)"
    ],
    bestPractices: [
      "Always use stream/promises pipeline() for safe resource cleanup and error handling",
      "Respect backpressure when writing custom Transform streams"
    ],
    whenToUse: ["Whenever processing files or payloads larger than available RAM memory"],
    whenNotToUse: ["When reading tiny 1KB config JSON files into memory"],
    relatedConcepts: ["Readable", "Writable", "Transform", "Backpressure", "pipeline"],
    comparison: {
      title: "Buffer vs Stream Memory Comparison",
      headers: ["Metric", "fs.readFile (Buffer)", "fs.createReadStream (Stream)"],
      rows: [
        ["RAM Allocation", "Equal to full file size (e.g. 2GB RAM)", "Constant chunk size (e.g. 64KB RAM)"],
        ["Time to First Byte", "Delayed until full file read", "Immediate on first chunk read"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Backpressure in Node.js Streams?", answer: "Backpressure is a flow-control signal emitted when a writable stream receives data faster than it can process, pausing the upstream readable stream to prevent memory overflow." }
    ],
    practiceProblem: {
      description: "Write a function processChunkCount that calculates number of 64KB chunks in a 256KB buffer.",
      starterCode: `function processChunkCount(totalBytes, chunkSize = 65536) {\n  return Math.ceil(totalBytes / chunkSize);\n}\nconsole.log(processChunkCount(262144));`,
      testAssertion: "processChunkCount(262144) === 4",
      solution: `function processChunkCount(totalBytes, chunkSize = 65536) {\n  return Math.ceil(totalBytes / chunkSize);\n}`
    },
    quickRevision: "★ Streams process data chunk-by-chunk with low RAM usage.\n★ Always use stream/promises pipeline() to handle backpressure safely.\n★ 4 Stream types: Readable, Writable, Duplex, Transform."
  }),

  // 5. NODE EVENT LOOP
  "nodejs-event-loop": createTopicSchema({
    id: "nodejs-event-loop",
    techId: "nodejs",
    title: "Node.js Event Loop & libuv Architecture",
    category: "Runtime Internals",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["nodejs-streams"],
    definition: "The Node.js Event Loop handles non-blocking I/O operations via libuv through 6 distinct execution phases: Timers, Pending Callbacks, Idle/Prepare, Poll, Check, and Close Callbacks.",
    simpleExplanation: "The Event Loop continuously checks timers, network sockets, and file tasks. Between phases, it drains microtasks (process.nextTick & Promises) before continuing.",
    whyDoesItExist: "Allows Node.js to handle tens of thousands of concurrent database and network requests on a single main thread.",
    basicExample: `import process from 'node:process';

console.log("1: Main Call Stack");

setTimeout(() => console.log("4: Timers Phase (setTimeout)"), 0);
setImmediate(() => console.log("5: Check Phase (setImmediate)"));
Promise.resolve().then(() => console.log("3: Microtask (Promise)"));
process.nextTick(() => console.log("2: nextTick Queue"));

// Output: 1 -> 2 -> 3 -> 4 -> 5`,
    howItWorks: [
      "1. Timers Phase: Executes callbacks scheduled by setTimeout and setInterval.",
      "2. Poll Phase: Retrieves new I/O events and executes I/O related callbacks.",
      "3. Check Phase: Executes setImmediate() callbacks immediately after Poll phase."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="350" y="95" fill="#fbbf24" font-weight="bold" text-anchor="middle">libuv Event Loop Phases: Timers -&gt; Poll -&gt; Check</text></svg>`,
    realWorldExample: `// Yielding long-running CPU loop to event loop using setImmediate
function asyncChunkTask(array, processItem) {
  return new Promise((resolve) => {
    let index = 0;
    function nextChunk() {
      const end = Math.min(index + 1000, array.length);
      for (; index < end; index++) {
        processItem(array[index]);
      }
      if (index < array.length) {
        setImmediate(nextChunk);
      } else {
        resolve();
      }
    }
    nextChunk();
  });
}`,
    commonUseCases: [
      "Understanding order of execution between Promises, setImmediate, and setTimeout",
      "Breaking heavy CPU loops with setImmediate to prevent thread starvation",
      "Configuring libuv thread pool size (UV_THREADPOOL_SIZE)"
    ],
    commonMistakes: [
      "Blocking the main thread with expensive CPU calculations",
      "Confusing process.nextTick() with setImmediate() (nextTick runs BEFORE event loop continues!)"
    ],
    bestPractices: [
      "Use setImmediate() to defer tasks after I/O poll phase without starving I/O",
      "Increase UV_THREADPOOL_SIZE (default 4) for thread-heavy crypto/zlib/fs workloads"
    ],
    whenToUse: ["When optimizing Node.js backend latency and event loop execution queues"],
    whenNotToUse: ["When writing client-side browser JavaScript where libuv does not exist"],
    relatedConcepts: ["libuv", "process.nextTick", "setImmediate", "Timers Phase", "Poll Phase"],
    comparison: {
      title: "process.nextTick vs setImmediate vs setTimeout",
      headers: ["API", "Execution Phase", "Priority"],
      rows: [
        ["process.nextTick()", "Immediately after current operation before next tick", "Highest (Microtask-like)"],
        ["Promise.then()", "Microtask queue after current stack", "High"],
        ["setImmediate()", "Check Phase of Event Loop", "Medium (Post I/O)"],
        ["setTimeout(fn, 0)", "Timers Phase of Event Loop", "Lower"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between setImmediate() and setTimeout(fn, 0)?", answer: "setImmediate() executes during the Check phase after I/O polling, while setTimeout(fn, 0) executes during the Timers phase when the timer threshold expires." }
    ],
    practiceProblem: {
      description: "Write a function getPriorityName that returns 'HIGHEST' for nextTick and 'CHECK' for setImmediate.",
      starterCode: `function getPriorityName(type) {\n  return type === 'nextTick' ? 'HIGHEST' : 'CHECK';\n}\nconsole.log(getPriorityName('nextTick'));`,
      testAssertion: "getPriorityName('nextTick') === 'HIGHEST'",
      solution: `function getPriorityName(type) {\n  return type === 'nextTick' ? 'HIGHEST' : 'CHECK';\n}`
    },
    quickRevision: "★ libuv drives 6 Event Loop phases.\n★ process.nextTick runs BEFORE next phase.\n★ Never block main thread with CPU intensive loops."
  }),

  // 6. NODE EXPRESS
  "nodejs-express": createTopicSchema({
    id: "nodejs-express",
    techId: "nodejs",
    title: "HTTP Server & Express.js Middleware Architecture",
    category: "Web Frameworks",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["nodejs-event-loop"],
    definition: "Express.js is a minimal, flexible Node.js web framework providing a middleware routing pipeline to handle HTTP request/response lifecycles.",
    simpleExplanation: "Express lets you easily handle URL routes (GET /users, POST /login), run security middleware, and return JSON responses.",
    whyDoesItExist: "Simplifies raw HTTP module req/res parsing, URL parameter routing, and error handling middleware.",
    basicExample: `import express from 'express';

const app = express();
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log(\`[\${req.method}] \${req.url}\`);
  next();
});

// Route Handler
app.get('/api/v1/users', (req, res) => {
  res.status(200).json([{ id: 1, name: "Alice" }]);
});

app.listen(3000, () => console.log("Express running on port 3000"));`,
    howItWorks: [
      "1. Incoming HTTP request matches Express routing stack layers.",
      "2. Middleware functions execute sequentially via next() callback.",
      "3. Error handling middleware (err, req, res, next) catches unhandled route errors."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Request -&gt; Middleware 1 -&gt; Middleware 2 -&gt; Route Handler -&gt; Response</text></svg>`,
    realWorldExample: `const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/orders/:id', asyncHandler(async (req, res) => {
  const order = await findOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order Not Found" });
  res.json(order);
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Internal Server Error" });
});`,
    commonUseCases: [
      "Building RESTful JSON API web services",
      "Handling authentication headers using middleware",
      "Serving static assets and HTML templates"
    ],
    commonMistakes: [
      "Forgetting to call next() in middleware causing request to hang infinitely",
      "Not wrapping async route handlers causing unhandled promise rejections"
    ],
    bestPractices: [
      "Separate code into Route, Controller, Service, and Repository layers",
      "Use centralized 4-parameter error handling middleware (err, req, res, next)"
    ],
    whenToUse: ["When building REST APIs or monolithic web backends with Node.js"],
    whenNotToUse: ["When building high-throughput gRPC microservices"],
    relatedConcepts: ["Middleware", "req/res", "Routing", "asyncHandler", "Express Router"],
    comparison: {
      title: "Express.js vs Fastify",
      headers: ["Metric", "Express.js", "Fastify"],
      rows: [
        ["Ecosystem", "Massive (Industry standard)", "Growing"],
        ["Performance", "Standard", "High-throughput (Fast schema serialization)"],
        ["Async Routing", "Requires manual wrapper/v5", "Built-in native async/await support"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Express Middleware?", answer: "Middleware is a function with access to req, res, and next() that executes during the request-response lifecycle to perform tasks like parsing bodies, auth checks, or logging." }
    ],
    practiceProblem: {
      description: "Write a function createSuccessPayload returning object { status: 'success', data }.",
      starterCode: `function createSuccessPayload(data) {\n  return { status: 'success', data };\n}\nconsole.log(createSuccessPayload([1, 2]));`,
      testAssertion: "createSuccessPayload('OK').status === 'success'",
      solution: `function createSuccessPayload(data) {\n  return { status: 'success', data };\n}`
    },
    quickRevision: "★ Express processes HTTP requests via middleware pipeline.\n★ Always call next() or send res.json() to avoid hanging requests.\n★ Use 4-arg middleware for global error catching."
  }),

  // 7. NODE DATABASE
  "nodejs-database": createTopicSchema({
    id: "nodejs-database",
    techId: "nodejs",
    title: "Node.js Database Access (ORMs, Connection Pooling & Drivers)",
    category: "Data Persistence",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["nodejs-express"],
    definition: "Database integration in Node.js connects backend servers to SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases using database drivers, connection pools, and ORMs (Prisma, Mongoose, TypeORM).",
    simpleExplanation: "Node uses connection pooling to reuse database connections, preventing your database from crashing when thousands of users hit your API.",
    whyDoesItExist: "Manages database client connections efficiently and abstracts SQL queries into type-safe JavaScript methods.",
    basicExample: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(email, name) {
  const user = await prisma.user.create({
    data: { email, name }
  });
  return user;
}`,
    howItWorks: [
      "1. Connection pool initializes reusable TCP sockets to DB server.",
      "2. ORM serializes JS objects into parameterized SQL queries.",
      "3. Parameterized queries prevent SQL Injection attacks."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Express App -&gt; Connection Pool (PoolSize: 10) -&gt; PostgreSQL/MongoDB</text></svg>`,
    realWorldExample: `import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  max: 20,
  idleTimeoutMillis: 30000
});

export async function queryUserByEmail(email) {
  const res = await pool.query('SELECT id, email, role FROM users WHERE email = $1', [email]);
  return res.rows[0];
}`,
    commonUseCases: [
      "Executing database CRUD operations inside API routes",
      "Managing database migrations using Prisma/Sequelize CLI",
      "Optimizing query response time with connection pooling"
    ],
    commonMistakes: [
      "Creating a new DB connection per HTTP request instead of using a Connection Pool",
      "Concatenating raw SQL strings leading to SQL Injection vulnerabilities"
    ],
    bestPractices: [
      "Always use connection pools (e.g. max pool size 10–20 connections)",
      "Always use parameterized queries ($1, $2) or ORM query builders"
    ],
    whenToUse: ["In any database-backed Node.js API server"],
    whenNotToUse: ["When building a stateless utility CLI script"],
    relatedConcepts: ["Prisma", "Mongoose", "Connection Pool", "SQL Injection", "Migrations"],
    comparison: {
      title: "Prisma ORM vs Mongoose vs Raw SQL Driver",
      headers: ["Aspect", "Prisma ORM", "Mongoose", "Raw SQL Driver (pg)"],
      rows: [
        ["Database Support", "PostgreSQL, MySQL, SQLite, Mongo", "MongoDB Only", "PostgreSQL Only"],
        ["Type Safety", "Full auto-generated TypeScript types", "Schema-based types", "Manual typing"],
        ["Query Control", "High-level API", "Document-based API", "100% Raw SQL control"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Connection Pooling and why is it important in Node.js?", answer: "Connection Pooling maintains a cache of reusable database connections, avoiding the high overhead of establishing a new TCP connection on every HTTP request." }
    ],
    practiceProblem: {
      description: "Write a function buildQueryString that formats a SQL parameterized query for $1.",
      starterCode: `function buildQueryString(tableName) {\n  return \`SELECT * FROM \${tableName} WHERE id = $1\`;\n}\nconsole.log(buildQueryString('users'));`,
      testAssertion: "buildQueryString('users') === 'SELECT * FROM users WHERE id = $1'",
      solution: `function buildQueryString(tableName) {\n  return \`SELECT * FROM \${tableName} WHERE id = $1\`;\n}`
    },
    quickRevision: "★ Always use Connection Pools to limit DB socket overhead.\n★ Never concatenate raw SQL strings (prevent SQL Injection).\n★ ORMs like Prisma provide type-safe queries."
  }),

  // 8. NODE AUTH
  "nodejs-auth": createTopicSchema({
    id: "nodejs-auth",
    techId: "nodejs",
    title: "Authentication, JWT & Backend Security Best Practices",
    category: "Security",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["nodejs-express"],
    definition: "Backend security in Node.js protects API endpoints using Stateless JWT (JSON Web Token) authentication, password hashing (bcrypt/argon2), rate limiting, and HTTP security headers (Helmet).",
    simpleExplanation: "Authenticate users with encrypted passwords, issue JWT tokens on login, verify tokens in middleware, and protect your server against attacks.",
    whyDoesItExist: "Prevents unauthorized API access, protects user passwords from leaks, and stops brute-force attacks.",
    basicExample: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';

export async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}`,
    howItWorks: [
      "1. User logs in with email/password -> bcrypt compares hash.",
      "2. Server issues signed JWT token containing user payload.",
      "3. Client sends Authorization: Bearer <token> -> Middleware verifies signature."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Client (Bearer Token) -&gt; Auth Middleware -&gt; Protected Controller</text></svg>`,
    realWorldExample: `import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, try again later." }
});
app.use('/api/', limiter);`,
    commonUseCases: [
      "Stateless user authentication for Single Page Applications (SPAs) & Mobile Apps",
      "Enforcing Role-Based Access Control (RBAC) on API endpoints",
      "Protecting APIs against brute-force DDoS attacks"
    ],
    commonMistakes: [
      "Storing passwords in plain text instead of salted bcrypt/argon2 hashes",
      "Storing JWT secrets inside code repositories instead of environment variables"
    ],
    bestPractices: [
      "Use HttpOnly cookies or short-lived Access Tokens + Refresh Tokens",
      "Always set Helmet security headers and express-rate-limit"
    ],
    whenToUse: ["In all production Node.js web backends and API endpoints"],
    whenNotToUse: ["When serving public read-only static files"],
    relatedConcepts: ["JWT", "bcrypt", "Helmet", "Rate Limiting", "RBAC"],
    comparison: {
      title: "JWT Token vs Stateful Session Cookies",
      headers: ["Metric", "JWT Token", "Stateful Session Cookie"],
      rows: [
        ["State Storage", "Stateless (Decoded from token signature)", "Stateful (Stored in Redis/Database)"],
        ["Scalability", "High (No DB lookup needed)", "Requires central Redis cache store"],
        ["Revocation", "Requires blacklist/short TTL", "Instant (Delete session from DB)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What are the 3 parts of a JSON Web Token (JWT)?", answer: "A JWT consists of Header (algorithm & token type), Payload (claims/data), and Signature (signed with secret key)." }
    ],
    practiceProblem: {
      description: "Write a function formatBearerToken that extracts token from 'Bearer xyz123'.",
      starterCode: `function formatBearerToken(headerStr) {\n  return headerStr?.split(' ')[1] || null;\n}\nconsole.log(formatBearerToken("Bearer token123"));`,
      testAssertion: "formatBearerToken('Bearer token123') === 'token123'",
      solution: `function formatBearerToken(headerStr) {\n  return headerStr?.split(' ')[1] || null;\n}`
    },
    quickRevision: "★ Never store plain text passwords; use bcrypt/argon2.\n★ JWT format: Header.Payload.Signature.\n★ Use Helmet & Rate Limiter on all Express APIs."
  }),

  // 9. NODE WORKERS
  "nodejs-workers": createTopicSchema({
    id: "nodejs-workers",
    techId: "nodejs",
    title: "Worker Threads & Cluster Module Multi-Core Processing",
    category: "Concurrency",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nodejs-auth"],
    definition: "Node.js supports multi-core CPU scaling via the Worker Threads module (node:worker_threads) for CPU-bound tasks and the Cluster module (node:cluster) for multi-process HTTP load distribution.",
    simpleExplanation: "Node main thread is single-threaded. Worker Threads let you offload heavy CPU math (video encoding, PDF generation, AI) to separate thread pools.",
    whyDoesItExist: "Prevents heavy CPU operations from blocking the main Event Loop and starving HTTP web server requests.",
    basicExample: `import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(import.meta.filename, { workerData: { num: 40 } });
  worker.on('message', (result) => console.log("Fibonacci Result:", result));
} else {
  function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }
  parentPort.postMessage(fib(workerData.num));
}`,
    howItWorks: [
      "1. Main Thread spawns Worker Thread running isolated V8 instance.",
      "2. Parent and Worker communicate via message passing (postMessage).",
      "3. SharedArrayBuffer allows zero-copy memory sharing between threads."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Main Event Loop -&gt; Message Channel -&gt; Worker Threads (CPU Pool)</text></svg>`,
    realWorldExample: `import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';

if (cluster.isPrimary) {
  const numCpus = os.cpus().length;
  for (let i = 0; i < numCpus; i++) cluster.fork();
} else {
  http.createServer((req, res) => {
    res.end(\`Handled by process PID: \${process.pid}\`);
  }).listen(8000);
}`,
    commonUseCases: [
      "Offloading CPU-bound tasks (image resizing, PDF generation, hashing)",
      "Spawning worker processes across multi-core CPU servers with Cluster module",
      "Zero-copy shared memory operations with SharedArrayBuffer"
    ],
    commonMistakes: [
      "Using Worker Threads for simple I/O tasks",
      "Spawning new Worker instances per request (Worker creation overhead is high; use thread pools)"
    ],
    bestPractices: [
      "Use thread pool libraries (piscina) to reuse worker instances",
      "Use Cluster module or PM2 cluster mode for multi-core HTTP web servers"
    ],
    whenToUse: ["When executing heavy CPU calculations in Node.js"],
    whenNotToUse: ["For standard asynchronous database and network API endpoints"],
    relatedConcepts: ["Worker Threads", "Cluster Module", "SharedArrayBuffer", "PM2"],
    comparison: {
      title: "Worker Threads vs Cluster Module",
      headers: ["Feature", "Worker Threads", "Cluster Module"],
      rows: [
        ["Execution Unit", "Multiple Threads inside 1 Process", "Multiple Independent OS Processes"],
        ["Memory Sharing", "SharedArrayBuffer memory sharing", "Isolated memory space"],
        ["Primary Use", "Heavy CPU calculations", "Multi-core HTTP server load balancing"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "When should you use Worker Threads vs Cluster Module in Node.js?", answer: "Use Worker Threads for heavy CPU computation within a single process. Use Cluster Module to fork multiple HTTP server processes across multi-core CPUs." }
    ],
    practiceProblem: {
      description: "Write a function getCpuCoreCount that returns os.cpus().length fallback to 4.",
      starterCode: `function getCpuCoreCount(cpusArray) {\n  return cpusArray?.length || 4;\n}\nconsole.log(getCpuCoreCount([1, 2, 3, 4, 5, 6, 7, 8]));`,
      testAssertion: "getCpuCoreCount([1, 2, 3, 4]) === 4",
      solution: `function getCpuCoreCount(cpusArray) {\n  return cpusArray?.length || 4;\n}`
    },
    quickRevision: "★ Node is single-threaded by default.\n★ Use Worker Threads for CPU intensive tasks.\n★ Use Cluster module / PM2 for multi-core HTTP scaling."
  }),

  // 10. NODE REDIS & QUEUES
  "nodejs-redis": createTopicSchema({
    id: "nodejs-redis",
    techId: "nodejs",
    title: "Background Queues (BullMQ) & Redis Caching",
    category: "Distributed Systems",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nodejs-workers"],
    definition: "Redis in Node.js serves as an in-memory caching layer and background job queue backing store (BullMQ) to process asynchronous tasks reliably.",
    simpleExplanation: "Offload slow tasks (like sending welcome emails or processing video uploads) to background job queues (BullMQ) backed by Redis.",
    whyDoesItExist: "Prevents API timeouts by instantly returning 202 Accepted responses while background workers process long-running jobs.",
    basicExample: `import { Queue, Worker } from 'bullmq';

const connection = { host: 'localhost', port: 6379 };

const emailQueue = new Queue('emailQueue', { connection });

export async function sendWelcomeEmail(userEmail) {
  await emailQueue.add('sendEmail', { email: userEmail });
  console.log("Email job queued!");
}

const worker = new Worker('emailQueue', async (job) => {
  console.log("Processing email for:", job.data.email);
}, { connection });`,
    howItWorks: [
      "1. Producer API adds job payload into Redis data structure.",
      "2. Redis emits event notifying BullMQ Background Worker.",
      "3. Worker processes job with automatic retries and exponential backoff."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Express API -&gt; Redis BullMQ Queue -&gt; Background Worker Process</text></svg>`,
    realWorldExample: `import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

export async function getCachedProducts(req, res, next) {
  const cacheKey = 'products:all';
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  const products = await fetchProductsFromDB();
  await redisClient.setEx(cacheKey, 60, JSON.stringify(products));
  res.json(products);
}`,
    commonUseCases: [
      "Sending asynchronous transactional emails & SMS notifications",
      "Caching heavy SQL/MongoDB queries to achieve sub-millisecond response times",
      "Managing rate limiting and session stores across microservices"
    ],
    commonMistakes: [
      "Executing heavy queue jobs inside the HTTP request loop instead of offloading",
      "Not setting TTL expiration on Redis cache keys causing infinite memory growth"
    ],
    bestPractices: [
      "Set TTL (Time To Live) on all Redis cache keys",
      "Use BullMQ with automatic retries and Dead Letter Queues (DLQ) for failed jobs"
    ],
    whenToUse: ["In high-scale production web applications requiring caching or background jobs"],
    whenNotToUse: ["In simple single-user local CLI tools"],
    relatedConcepts: ["BullMQ", "Redis Cache", "Job Queue", "TTL", "Pub/Sub"],
    comparison: {
      title: "In-Memory RAM Cache vs Redis Cache",
      headers: ["Metric", "In-Memory JS Map", "Redis Cache"],
      rows: [
        ["Persistence", "Lost on process restart", "Persisted to disk (RDB/AOF)"],
        ["Microservices Sharing", "Isolated to single process", "Shared across multiple Node servers"],
        ["Memory Limit", "V8 heap limit (~2GB)", "Scalable to multi-GB RAM"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why should you offload email sending to BullMQ background queues?", answer: "Because SMTP email delivery can take several seconds or fail due to network glitches. Queuing returns an instant 202 HTTP status and allows automated retry mechanisms." }
    ],
    practiceProblem: {
      description: "Write a function formatCacheKey that generates key string 'user:123'.",
      starterCode: `function formatCacheKey(entity, id) {\n  return \`\${entity}:\${id}\`;\n}\nconsole.log(formatCacheKey('user', 123));`,
      testAssertion: "formatCacheKey('user', 123) === 'user:123'",
      solution: `function formatCacheKey(entity, id) {\n  return \`\${entity}:\${id}\`;\n}`
    },
    quickRevision: "★ Use Redis for sub-millisecond caching.\n★ Set TTL expiration on all Redis cache keys.\n★ Use BullMQ for background async job processing."
  }),

  // 11. NODE TESTING
  "nodejs-testing": createTopicSchema({
    id: "nodejs-testing",
    techId: "nodejs",
    title: "Node.js Automated Testing, Heap Snapshots & Profiling",
    category: "Quality & Debugging",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nodejs-redis"],
    definition: "Testing and profiling Node.js applications involves Unit/Integration testing (Vitest, Jest, Supertest), memory profiling via Heap Snapshots, and performance bottleneck analysis using Node inspector.",
    simpleExplanation: "Automated tests catch bugs before deployment, while memory profiling helps identify memory leaks and performance bottlenecks in your server.",
    whyDoesItExist: "Ensures production stability, prevents regression bugs, and identifies memory leak sources.",
    basicExample: `import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('GET /api/v1/health', () => {
  it('should return 200 OK with status UP', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
  });
});`,
    howItWorks: [
      "1. Vitest/Jest executes test suites inside isolated worker environments.",
      "2. Supertest invokes Express app HTTP handler without spawning network ports.",
      "3. v8.getHeapSnapshot() writes memory heap dump for Chrome DevTools analysis."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Jest/Vitest Suite -&gt; Supertest API Runner -&gt; Assertions Passed</text></svg>`,
    realWorldExample: `import v8 from 'node:v8';
import fs from 'node:fs';

export function captureMemorySnapshot() {
  const stream = v8.getHeapSnapshot();
  const fileName = \`./heap-\${Date.now()}.heapsnapshot\`;
  const writeStream = fs.createWriteStream(fileName);
  stream.pipe(writeStream);
  console.log("Memory Heap Snapshot captured:", fileName);
}`,
    commonUseCases: [
      "Writing unit tests for service business logic",
      "Writing integration tests for Express API endpoints with Supertest",
      "Debugging memory leaks in Chrome DevTools Memory Inspector"
    ],
    commonMistakes: [
      "Testing against production database instead of isolated mock/test DB",
      "Ignoring heap memory leak warnings until production server crashes"
    ],
    bestPractices: [
      "Use Vitest or Jest with Supertest for fast automated API testing",
      "Inspect memory heap snapshots using --inspect flag and Chrome DevTools"
    ],
    whenToUse: ["In all production Node.js applications and CI/CD pipelines"],
    whenNotToUse: ["When throwing together a 1-minute experimental scratch script"],
    relatedConcepts: ["Vitest", "Jest", "Supertest", "Heap Snapshot", "v8"],
    comparison: {
      title: "Unit Testing vs Integration Testing",
      headers: ["Type", "Scope", "Execution Speed"],
      rows: [
        ["Unit Test", "Isolated function/class logic with mocks", "Ultra Fast (Milliseconds)"],
        ["Integration Test", "Full API endpoint request/response with DB", "Fast (Seconds)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you detect and fix a Memory Leak in a Node.js server?", answer: "Take baseline Heap Snapshots using node --inspect and Chrome DevTools, generate load, capture a second snapshot, and compare memory retainers to find uncleaned event listeners or global object references." }
    ],
    practiceProblem: {
      description: "Write a function formatTestSummary returning '3 Passed, 0 Failed'.",
      starterCode: `function formatTestSummary(passed, failed) {\n  return \`\${passed} Passed, \${failed} Failed\`;\n}\nconsole.log(formatTestSummary(3, 0));`,
      testAssertion: "formatTestSummary(3, 0) === '3 Passed, 0 Failed'",
      solution: `function formatTestSummary(passed, failed) {\n  return \`\${passed} Passed, \${failed} Failed\`;\n}`
    },
    quickRevision: "★ Use Vitest/Jest + Supertest for API testing.\n★ Use node --inspect for Chrome DevTools memory profiling.\n★ Capture Heap Snapshots to isolate memory leak sources."
  }),

  // 12. NODE SCALING
  "nodejs-scaling": createTopicSchema({
    id: "nodejs-scaling",
    techId: "nodejs",
    title: "Node.js Production Scaling, Microservices & Docker Deployment",
    category: "DevOps & Scaling",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["nodejs-testing"],
    definition: "Production deployment and scaling of Node.js applications utilizes containerization (Docker), process managers (PM2), microservices architecture, and cloud orchestrators (Kubernetes/AWS ECS).",
    simpleExplanation: "Package your Node application into a Docker container, run process managers like PM2 to auto-restart on crashes, and scale horizontally across servers.",
    whyDoesItExist: "Ensures high availability, fault tolerance, zero-downtime deployments, and horizontal auto-scaling under massive traffic loads.",
    basicExample: `# Production Dockerfile for Node.js App
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
    howItWorks: [
      "1. Alpine Docker image packages Node.js runtime and minimal OS dependencies.",
      "2. Process Manager (PM2 / K8s) monitors process PID and restarts on crash.",
      "3. Load balancer distributes HTTP traffic across multiple container instances."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Load Balancer (Nginx/ALB) -&gt; Docker Container 1 | Docker Container 2</text></svg>`,
    realWorldExample: `module.exports = {
  apps: [{
    name: "express-backend",
    script: "./server.js",
    instances: "max",
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};`,
    commonUseCases: [
      "Containerizing Node.js applications with multi-stage Docker builds",
      "Configuring zero-downtime deployments with PM2 cluster mode",
      "Building microservices communicating via gRPC or RabbitMQ"
    ],
    commonMistakes: [
      "Running Docker containers as root user instead of unprivileged 'USER node'",
      "Not handling process SIGTERM signal causing active database transactions to abort during deployment"
    ],
    bestPractices: [
      "Use multi-stage Docker builds and lightweight Alpine node images",
      "Listen for SIGTERM signals to close HTTP server gracefully"
    ],
    whenToUse: ["In all enterprise production Node.js deployments"],
    whenNotToUse: ["When running temporary local dev code"],
    relatedConcepts: ["Docker", "PM2", "Kubernetes", "Microservices", "SIGTERM"],
    comparison: {
      title: "Monolith vs Microservices Node.js Architecture",
      headers: ["Aspect", "Monolithic Architecture", "Microservices Architecture"],
      rows: [
        ["Deployment", "Single codebase & pipeline", "Decoupled independent containers"],
        ["Scaling", "Scale entire application stack", "Scale specific heavy traffic services independently"],
        ["Complexity", "Low initial complexity", "High ops & network telemetry complexity"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you achieve Zero-Downtime Deployment in Node.js?", answer: "By running process managers like PM2 in cluster mode or Kubernetes rolling updates, where new container instances pass health checks before old instances receive SIGTERM." }
    ],
    practiceProblem: {
      description: "Write a function formatHealthCheck returning { status: 'UP', uptime }.",
      starterCode: `function formatHealthCheck(uptimeSec) {\n  return { status: 'UP', uptime: uptimeSec };\n}\nconsole.log(formatHealthCheck(3600));`,
      testAssertion: "formatHealthCheck(3600).status === 'UP'",
      solution: `function formatHealthCheck(uptimeSec) {\n  return { status: 'UP', uptime: uptimeSec };\n}`
    },
    quickRevision: "★ Use multi-stage Docker builds with Alpine images.\n★ Run PM2 or Kubernetes for auto-restart on crashes.\n★ Gracefully handle SIGTERM signals for zero-downtime."
  })
};
