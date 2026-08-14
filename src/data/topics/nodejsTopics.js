import { createTopicSchema } from './createTopicSchema.js';

export const nodejsTopics = {
  // 1. NODE.JS FUNDAMENTALS & RUNTIME
  "nodejs-fundamentals-runtime": createTopicSchema({
    id: "nodejs-fundamentals-runtime",
    techId: "nodejs",
    title: "Node.js Runtime Architecture, V8 & libuv",
    category: "Node.js Fundamentals & Runtime",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "15 min",
    prerequisites: ["JavaScript Core"],
    definition: "Single-threaded event-driven asynchronous runtime built on Google V8 engine and libuv library.",
    simpleExplanation: "Explains how Node.js executes JavaScript on V8's call stack while delegating asynchronous I/O operations (file system, network, crypto) to libuv C++ worker threads and native OS kernel events.",
    whyDoesItExist: "Provides an ultra-fast non-blocking backend server runtime capable of handling thousands of concurrent HTTP connections without thread overhead.",
    basicExample: `// Asynchronous non-blocking file system execution via node:fs/promises
import { readFile } from 'node:fs/promises';

async function loadData() {
  console.log('1. Call Stack: Starting read');
  const data = await readFile('./data.json', 'utf-8');
  console.log('2. Event Loop: Async data received');
}
loadData();
console.log('3. Call Stack: Main thread continues executing without blocking');`,
    howItWorks: [
      "1. V8 compiles JavaScript into native machine code.",
      "2. Synchronous code executes on V8 Call Stack.",
      "3. Asynchronous I/O calls are offloaded to libuv thread pool or OS kernel.",
      "4. Upon completion, libuv pushes callback to Event Loop queue.",
      "5. Event Loop pops callback to Call Stack when empty."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">V8 Call Stack</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="310" y="95" fill="#34d399" font-size="12" text-anchor="middle">libuv ThreadPool / OS</text><path d="M390 90 L450 90" stroke="#64748b" stroke-width="2"/><rect x="450" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="530" y="95" fill="#f87171" font-size="12" text-anchor="middle">Event Loop Queue</text></svg>`,
    realWorldExample: `// Adjusting libuv Thread Pool size for CPU-intensive crypto/FS tasks
process.env.UV_THREADPOOL_SIZE = 8; // Doubles thread capacity from default 4 to 8`,
    commonUseCases: [
      "Building high-throughput non-blocking REST APIs",
      "Handling real-time WebSocket connections",
      "Offloading file I/O to libuv without blocking the main event loop"
    ],
    commonMistakes: [
      "Executing CPU-heavy synchronous operations (fs.readFileSync, dense loops) on the main thread",
      "Using process.nextTick() excessively, starving the event loop microtask queue"
    ],
    bestPractices: [
      "Always use non-blocking async APIs (fs.promises)",
      "Set UV_THREADPOOL_SIZE appropriately for I/O heavy worker servers"
    ],
    whenToUse: ["In high-concurrency I/O bound backend architectures"],
    whenNotToUse: ["In pure single-threaded synchronous CPU matrix computations (use Worker Threads instead)"],
    relatedConcepts: ["V8 Engine", "libuv", "Call Stack", "Event Loop", "process.nextTick"],
    comparison: {
      title: "V8 Call Stack vs libuv Thread Pool",
      headers: ["Component", "Execution Model", "Primary Role"],
      rows: [
        ["V8 Call Stack", "Single-Threaded Synchronous", "Executes JavaScript bytecode"],
        ["libuv Thread Pool", "Multi-Threaded C++ (Default 4)", "Offloads blocking FS, Crypto, DNS tasks"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Is Node.js truly single-threaded?", answer: "JavaScript execution on the V8 call stack is single-threaded, but Node.js runtime is multi-threaded under the hood via libuv C++ worker threads for I/O, cryptography, and compression." }
    ],
    practiceProblem: {
      description: "Set libuv thread pool size to 8 in Node.js.",
      starterCode: `// Code\n`,
      testAssertion: "Thread pool set",
      solution: `process.env.UV_THREADPOOL_SIZE = 8;`
    },
    quickRevision: "★ V8 = JS Bytecode Execution.\n★ libuv = Event Loop + C++ Thread Pool.\n★ UV_THREADPOOL_SIZE default is 4."
  }),

  // 2. EVENT LOOP & ASYNC PROGRAMMING
  "nodejs-event-loop-async": createTopicSchema({
    id: "nodejs-event-loop-async",
    techId: "nodejs",
    title: "Event Loop Phases, Microtasks & Worker Threads",
    category: "Event Loop & Async Programming — Senior Level",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "17 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Deep analysis of libuv's 6 event loop phases, microtask queue execution order, event-loop lag monitoring, and Worker Threads vs Cluster.",
    simpleExplanation: "Explains how libuv iterates through Timers, Pending Callbacks, Poll, Check, and Close phases, prioritizing process.nextTick and Promise microtasks after every phase.",
    whyDoesItExist: "Crucial for identifying and eliminating event-loop lag and process starvation in enterprise applications.",
    basicExample: `// Event Loop Microtask Execution Order Verification
setTimeout(() => console.log('1. Macrotask (Timers Phase)'), 0);
setImmediate(() => console.log('2. Macrotask (Check Phase)'));
Promise.resolve().then(() => console.log('3. Microtask (Promise)'));
process.nextTick(() => console.log('4. Microtask (nextTick)'));

// Output Order:
// 4. Microtask (nextTick)
// 3. Microtask (Promise)
// 1. Macrotask (Timers Phase)
// 2. Macrotask (Check Phase)`,
    howItWorks: [
      "1. Timers phase runs expired setTimeout/setInterval callbacks.",
      "2. Pending phase executes deferred I/O callbacks.",
      "3. Poll phase retrieves new I/O events.",
      "4. Check phase executes setImmediate() callbacks.",
      "5. Microtasks (nextTick, Promises) run IMMEDIATELY after any operation completes."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="130" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="95" y="95" fill="#f87171" font-size="12" text-anchor="middle">1. Timers</text><path d="M160 90 L220 90" stroke="#64748b" stroke-width="2"/><rect x="220" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="290" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">2. Poll (I/O)</text><path d="M360 90 L420 90" stroke="#64748b" stroke-width="2"/><rect x="420" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="495" y="95" fill="#34d399" font-size="12" text-anchor="middle">3. Check (setImmediate)</text></svg>`,
    realWorldExample: `// Offloading CPU-bound tasks to Worker Threads
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: { num: 42 } });
  worker.on('message', (result) => console.log('CPU Worker Result:', result));
} else {
  // Runs in background Worker Thread without blocking main Event Loop!
  const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
  parentPort.postMessage(fib(workerData.num));
}`,
    commonUseCases: [
      "Offloading CPU-intensive algorithms to Worker Threads",
      "Monitoring event-loop lag using perf_hooks monitorEventLoopDelay()",
      "Using setImmediate() to defer non-blocking background tasks"
    ],
    commonMistakes: [
      "Recursive process.nextTick() calls causing infinite loop starvation",
      "Running heavy image processing on the main V8 thread"
    ],
    bestPractices: [
      "Use setImmediate() over process.nextTick() for deferring tasks",
      "Use Worker Threads for shared-memory CPU computation"
    ],
    whenToUse: ["In high-load async server optimization"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Timers Phase", "Poll Phase", "Check Phase", "Worker Threads", "Event-Loop Lag"],
    comparison: {
      title: "Worker Threads vs Cluster Module",
      headers: ["Metric", "Worker Threads", "Cluster Module"],
      rows: [
        ["Memory Space", "Shared (SharedArrayBuffer)", "Isolated (Separate OS Processes)"],
        ["V8 Instance", "Multiple Isolates in 1 Process", "Multiple OS Processes"],
        ["Best Used For", "CPU-heavy algorithms", "Scaling HTTP server ports"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why can excessive process.nextTick() usage starve the Event Loop?", answer: "process.nextTick() callbacks are processed in the microtask queue immediately after current operation completes. If process.nextTick() recursively calls itself, Node.js never advances to Event Loop I/O phases." }
    ],
    practiceProblem: {
      description: "Monitor event loop delay using monitorEventLoopDelay.",
      starterCode: `// Code\n`,
      testAssertion: "Histogram enabled",
      solution: `const h = monitorEventLoopDelay(); h.enable();`
    },
    quickRevision: "★ Microtasks (nextTick/Promises) run before next phase.\n★ Poll phase waits for I/O.\n★ Worker Threads share memory; Cluster forks processes."
  }),

  // 3. JAVASCRIPT ADVANCED FOR NODE.JS
  "nodejs-js-advanced": createTopicSchema({
    id: "nodejs-js-advanced",
    techId: "nodejs",
    title: "Advanced JavaScript Mechanics for Backend Engineering",
    category: "JavaScript Advanced for Node.js",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Core JavaScript execution engine mechanics: closures, prototype chain, memory management, shallow vs deep cloning, Promises, and Generators.",
    simpleExplanation: "Covers advanced backend JS patterns including lexical scoping, closure-based state encapsulation, Object.freeze vs seal, and async generators.",
    whyDoesItExist: "Essential for writing robust, memory-safe backend frameworks and libraries.",
    basicExample: `// Encapsulating Private Middleware State via Closures
function createMemoryStore(ttlMs = 60000) {
  const cache = new Map(); // Lexically scoped private variable

  return {
    set(key, value) { cache.set(key, { value, expires: Date.now() + ttlMs }); },
    get(key) {
      const item = cache.get(key);
      if (!item || Date.now() > item.expires) { cache.delete(key); return null; }
      return item.value;
    }
  };
}`,
    howItWorks: [
      "1. Inner function maintains reference to outer scope variables.",
      "2. V8 retains outer Scope Record in memory as long as closure functions exist.",
      "3. Enables private state encapsulation without ES class private fields."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="110" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Outer Function</text><path d="M190 90 L250 90" stroke="#64748b" stroke-width="2"/><rect x="250" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="330" y="95" fill="#34d399" font-size="12" text-anchor="middle">Lexical State Map</text><path d="M410 90 L470 90" stroke="#64748b" stroke-width="2"/><rect x="470" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="550" y="95" fill="#f87171" font-size="12" text-anchor="middle">Closure Function</text></svg>`,
    realWorldExample: `// Deep Copying objects using built-in structuredClone()
const deepCopy = structuredClone(originalObject); // Safe deep clone supported natively in Node.js 17+`,
    commonUseCases: [
      "Writing reusable middleware factory functions",
      "Preventing object mutation using Object.freeze()",
      "Deep cloning configuration payloads with structuredClone()"
    ],
    commonMistakes: [
      "Using JSON.parse(JSON.stringify()) for objects with Dates, Maps, or Functions (loses type fidelity!)",
      "Leaking memory by retaining references in global closures"
    ],
    bestPractices: [
      "Use structuredClone() instead of Lodash cloneDeep",
      "Use Map/Set for frequent key insertions/deletions"
    ],
    whenToUse: ["In all Node.js backend development"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Closures", "Prototype Chain", "structuredClone", "Map / Set", "Generators"],
    comparison: {
      title: "Object.freeze() vs Object.seal()",
      headers: ["Method", "Add New Properties?", "Modify Existing?", "Delete Properties?"],
      rows: [
        ["Object.freeze()", "NO", "NO", "NO"],
        ["Object.seal()", "NO", "YES", "NO"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the primary difference between Map and Object in Node.js?", answer: "Map keys can be any data type (objects, functions, primitives), maintains insertion order, has fast size lookup (.size), and is optimized for frequent key additions/deletions." }
    ],
    practiceProblem: {
      description: "Deep clone an object using structuredClone.",
      starterCode: `const copy = {};`,
      testAssertion: "Cloned",
      solution: `const copy = structuredClone(original);`
    },
    quickRevision: "★ Closure = Function + Lexical Scope.\n★ Deep Clone: Use structuredClone().\n★ Map allows any key type."
  }),

  // 4. MODULES & PACKAGE MANAGEMENT
  "nodejs-modules-packages": createTopicSchema({
    id: "nodejs-modules-packages",
    techId: "nodejs",
    title: "Modules (CommonJS vs ESM), NPM & Dependency Management",
    category: "Modules & Package Management",
    difficulty: "Intermediate",
    experienceBand: "3–8 years",
    readingTime: "14 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Module resolution algorithms (CommonJS vs ES Modules), package.json configuration, lockfiles, semantic versioning, and security vulnerability audits.",
    simpleExplanation: "Explains require() vs import syntax, package-lock.json deterministic builds, and structuring large enterprise Node.js applications.",
    whyDoesItExist: "Ensures module reusability, dependency isolation, and reproducible production deployments.",
    basicExample: `// Modern ES Module setup (package.json: { "type": "module" })
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFilePath = (fileName) => join(__dirname, 'uploads', fileName);`,
    howItWorks: [
      "1. Node.js resolves 'type': 'module' in package.json to parse .js as ESM.",
      "2. ESM uses static top-level parsing before executing code.",
      "3. CommonJS uses dynamic runtime loading via require()."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="110" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">CommonJS (require)</text><path d="M190 90 L250 90" stroke="#64748b" stroke-width="2"/><rect x="250" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="330" y="95" fill="#34d399" font-size="12" text-anchor="middle">Runtime Dynamic Load</text></svg>`,
    realWorldExample: `// Deterministic CI Deployment Command
// npm ci (Deletes node_modules and installs EXACT versions from package-lock.json)`,
    commonUseCases: [
      "Converting legacy CommonJS projects to modern ES Modules",
      "Using npm audit fix to resolve dependency vulnerabilities",
      "Managing package versioning with Semantic Versioning (^1.2.3 vs ~1.2.3)"
    ],
    commonMistakes: [
      "Running npm install in CI servers instead of npm ci (causes non-deterministic dependency versions!)",
      "Mixing require() and import in the same file without proper config"
    ],
    bestPractices: [
      "Always commit package-lock.json to version control",
      "Use npm ci in all automated CI/CD pipelines"
    ],
    whenToUse: ["In all Node.js projects"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["CommonJS", "ES Modules", "package-lock.json", "npm ci", "SemVer"],
    comparison: {
      title: "npm install vs npm ci",
      headers: ["Command", "Lockfile Behavior", "Speed in CI", "Use Case"],
      rows: [
        ["npm install", "Can update package-lock.json", "Slower", "Local Development"],
        ["npm ci", "Strictly enforces lockfile", "Fast (Clean install)", "Automated CI/CD"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you use npm ci instead of npm install in CI pipelines?", answer: "npm ci deletes node_modules and installs exact dependency versions directly from package-lock.json, guaranteeing 100% reproducible builds and preventing unintended minor version upgrades." }
    ],
    practiceProblem: {
      description: "Write the command for clean deterministic CI installation.",
      starterCode: `// Command\n`,
      testAssertion: "Correct command",
      solution: `npm ci`
    },
    quickRevision: "★ ESM = import/export; CommonJS = require/exports.\n★ CI Pipeline: ALWAYS use npm ci.\n★ package-lock.json guarantees reproducible builds."
  }),

  // 5. EXPRESS.JS FUNDAMENTALS
  "nodejs-express-fundamentals": createTopicSchema({
    id: "nodejs-express-fundamentals",
    techId: "nodejs",
    title: "Express.js Architecture, Middleware Pipeline & Errors",
    category: "Express.js Fundamentals",
    difficulty: "Intermediate",
    experienceBand: "3–8 years",
    readingTime: "15 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Express.js web framework fundamentals: routing, application vs router middleware, next(), static body parsing, and 4-argument global error handlers.",
    simpleExplanation: "Covers how Express passes incoming requests through a pipeline of middleware layers, terminating either with res.json() or delegating errors to (err, req, res, next).",
    whyDoesItExist: "Simplifies raw HTTP server routing, request body parsing, and middleware composition.",
    basicExample: `// Global Error Handling Middleware in Express
import express from 'express';

const app = express();
app.use(express.json());

// Async Route Handler
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) throw new Error('User Not Found');
    res.json(user);
  } catch (err) {
    next(err); // Delegates error to 4-argument middleware!
  }
});

// 4-Argument Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});`,
    howItWorks: [
      "1. Express matches request URL against route layer stack.",
      "2. Executes middleware sequentially via next().",
      "3. If next(err) is invoked with an error argument, Express skips all standard routes and jumps directly to the 4-argument error handler."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">HTTP Request</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="310" y="95" fill="#34d399" font-size="12" text-anchor="middle">Middleware Stack</text><path d="M390 60 L470 30" stroke="#10b981" stroke-width="2"/><rect x="470" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="550" y="35" fill="#34d399" font-size="10" text-anchor="middle">res.json() Response</text><path d="M390 120 L470 150" stroke="#ef4444" stroke-width="2"/><rect x="470" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="550" y="155" fill="#f87171" font-size="10" text-anchor="middle">next(err) -> 4-Arg Error</text></svg>`,
    realWorldExample: `// Reusable Async Handler Wrapper eliminating try/catch boilerplate
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/orders', asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
}));`,
    commonUseCases: [
      "Building modular RESTful APIs with express.Router()",
      "Parsing JSON body payloads with express.json()",
      "Centralizing error handling with 4-argument error middleware"
    ],
    commonMistakes: [
      "Creating an error handler with only 3 arguments (Express treats it as standard middleware!)",
      "Forgetting to call next() inside custom middleware, hanging the request"
    ],
    bestPractices: [
      "Always define error middleware at the very end of app.js after all routes",
      "Use asyncHandler wrappers for async route functions"
    ],
    whenToUse: ["In all Express web applications"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Middleware Pipeline", "express.Router", "4-Argument Error Middleware", "asyncHandler"],
    comparison: {
      title: "Standard Middleware vs Error Middleware",
      headers: ["Type", "Arity (Arguments Count)", "Signature"],
      rows: [
        ["Standard Middleware", "3 Arguments", "(req, res, next) => {}"],
        ["Global Error Handler", "4 Arguments", "(err, req, res, next) => {}"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why must Express error-handling middleware explicitly define four arguments?", answer: "Express uses Function.length to check function arity. Only functions with exactly 4 parameters (err, req, res, next) are identified as error-handling middleware layers in the internal route stack." }
    ],
    practiceProblem: {
      description: "Write 4-argument error handling middleware signature.",
      starterCode: `app.use((req, res, next) => {});`,
      testAssertion: "Error handler defined",
      solution: `app.use((err, req, res, next) => { res.status(500).json({ error: err.message }); });`
    },
    quickRevision: "★ Middleware = (req, res, next).\n★ Error Handler MUST have 4 args: (err, req, res, next).\n★ Use asyncHandler to catch rejected promises."
  }),

  // 6 - 27 DEEP TOPICS AGGREGATED
  "nodejs-express-architecture": createTopicSchema({
    id: "nodejs-express-architecture",
    techId: "nodejs",
    title: "Enterprise Express Architecture: Controller-Service-Repository",
    category: "Express Architecture",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-express-fundamentals"],
    definition: "Layered architecture decoupling Route Controllers, Business Services, and Data Repositories.",
    simpleExplanation: "Prevents fat route handlers by delegating business logic to Service classes and database queries to Repositories.",
    whyDoesItExist: "Enables unit testability, clean code boundaries, and domain reusability.",
    basicExample: `// Controller -> Service -> Repository Flow
class OrderService {
  constructor(private orderRepo: OrderRepository) {}
  async placeOrder(dto) {
    const order = await this.orderRepo.create(dto);
    return order;
  }
}`,
    howItWorks: ["1. Controller handles HTTP request/response.", "2. Service executes domain rules.", "3. Repository queries database."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Controller -> Service -> Repository</text></svg>`,
    realWorldExample: `// Modular folder structure: src/modules/users/(controller, service, repository, routes)`,
    commonUseCases: ["Large enterprise Express applications"],
    commonMistakes: ["Writing database queries directly inside route handlers"],
    bestPractices: ["Keep controllers under 20 lines of code"],
    whenToUse: ["Enterprise backend apps"],
    whenNotToUse: ["10-line scripts"],
    relatedConcepts: ["Controller-Service-Repository", "Dependency Injection"],
    comparison: { title: "Fat Route Handler vs Layered Architecture", headers: ["Metric", "Fat Route", "Layered Architecture"], rows: [["Testability", "Hard", "Easy"], ["Reusability", "Zero", "High"]] },
    interviewQuestions: [{ level: "Senior", question: "Explain the Controller-Service-Repository pattern.", answer: "Controllers handle HTTP requests/responses, Services execute domain logic, and Repositories handle database persistence." }],
    practiceProblem: { description: "Define OrderService class.", starterCode: `class OrderService {}`, testAssertion: "Class created", solution: `class OrderService { async create() {} }` },
    quickRevision: "★ Controller = HTTP layer.\n★ Service = Business logic.\n★ Repository = Database access."
  }),

  "nodejs-rest-api-design": createTopicSchema({
    id: "nodejs-rest-api-design",
    techId: "nodejs",
    title: "Production REST API Design, Idempotency & Cursor Pagination",
    category: "REST API Design",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-express-architecture"],
    definition: "Designing production-ready REST APIs, URI versioning, idempotency keys, and cursor pagination.",
    simpleExplanation: "Covers REST standards, idempotency headers for payment endpoints, and O(1) cursor pagination for large datasets.",
    whyDoesItExist: "Ensures API contract stability and high-performance querying.",
    basicExample: `// Cursor Pagination query: WHERE id > cursor LIMIT 20`,
    howItWorks: ["Uses X-Idempotency-Key in Redis to prevent duplicate operations."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">REST API Design Envelope</text></svg>`,
    realWorldExample: `// Standard JSON Envelope: { success: true, data: [...], pagination: { cursor: "xyz" } }`,
    commonUseCases: ["Public REST APIs"],
    commonMistakes: ["Using offset pagination on tables with 1M+ rows"],
    bestPractices: ["Use cursor-based pagination for high-volume endpoints"],
    whenToUse: ["REST API endpoints"],
    whenNotToUse: ["Internal RPC"],
    relatedConcepts: ["Idempotency", "Cursor Pagination", "API Versioning"],
    comparison: { title: "Offset vs Cursor Pagination", headers: ["Metric", "Offset", "Cursor"], rows: [["SQL Performance", "O(N) Degrading", "O(1) Constant"]] },
    interviewQuestions: [{ level: "Senior", question: "Why is cursor pagination better than offset pagination for large tables?", answer: "Cursor pagination uses indexed WHERE id > cursor LIMIT 20 queries, maintaining fast O(1) performance regardless of offset size." }],
    practiceProblem: { description: "Write cursor pagination SQL query.", starterCode: `SELECT * FROM users;`, testAssertion: "Query written", solution: `SELECT * FROM users WHERE id > ? ORDER BY id ASC LIMIT 20;` },
    quickRevision: "★ Idempotency: Redis key lock.\n★ Cursor Pagination: WHERE id > cursor LIMIT N."
  }),

  "nodejs-auth": createTopicSchema({
    id: "nodejs-auth",
    techId: "nodejs",
    title: "Authentication (JWT & OAuth2) and Role-Based Authorization",
    category: "Authentication & Authorization",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-express-fundamentals"],
    definition: "JWT token authentication, refresh token rotation, HttpOnly cookies, and RBAC authorization middleware.",
    simpleExplanation: "Authenticates users via JWT access tokens (15m TTL) and refresh tokens stored in HttpOnly cookies, enforcing RBAC permissions.",
    whyDoesItExist: "Secures user endpoints against unauthorized access and XSS token theft.",
    basicExample: `// JWT Refresh Token Rotation Flow`,
    howItWorks: ["Verifies JWT signature using secret key in middleware."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">JWT Auth Flow</text></svg>`,
    realWorldExample: `// Storing Refresh Tokens in HttpOnly, Secure, SameSite cookies`,
    commonUseCases: ["User login, RBAC permission verification"],
    commonMistakes: ["Storing JWT tokens in localStorage (vulnerable to XSS!)"],
    bestPractices: ["Store refresh tokens in HttpOnly cookies"],
    whenToUse: ["Stateless REST APIs"],
    whenNotToUse: ["Traditional server-rendered session apps"],
    relatedConcepts: ["JWT", "Refresh Token Rotation", "HttpOnly Cookies", "RBAC"],
    comparison: { title: "localStorage vs HttpOnly Cookie", headers: ["Storage", "XSS Vulnerable?", "CSRF Vulnerable?"], rows: [["localStorage", "YES", "NO"], ["HttpOnly Cookie", "NO (Secure)", "Mitigated with SameSite"]] },
    interviewQuestions: [{ level: "Senior", question: "Where should refresh tokens be stored?", answer: "In HttpOnly, Secure, SameSite cookies to protect against XSS token theft." }],
    practiceProblem: { description: "Set HttpOnly cookie options.", starterCode: `res.cookie('token', token);`, testAssertion: "Cookie set", solution: `res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });` },
    quickRevision: "★ Access Token = Short TTL (15m).\n★ Refresh Token = HttpOnly Cookie.\n★ RBAC = Role middleware check."
  }),

  "nodejs-express-security": createTopicSchema({
    id: "nodejs-express-security",
    techId: "nodejs",
    title: "Express Security Hardening, Helmet, CORS & OWASP Defense",
    category: "Express Security",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-express-fundamentals"],
    definition: "Hardening Express apps against OWASP Top 10 using Helmet, CORS, rate limiting, and NoSQL/SQL injection prevention.",
    simpleExplanation: "Protects applications by setting security headers via Helmet, sanitizing inputs against NoSQL injection, and enforcing rate-limit bounds.",
    whyDoesItExist: "Prevents severe security vulnerabilities and data breaches in production.",
    basicExample: `import helmet from 'helmet';\nimport rateLimit from 'express-rate-limit';\napp.use(helmet());\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));`,
    howItWorks: ["Helmet sets 15+ HTTP headers like Content-Security-Policy and X-Frame-Options."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Helmet Security Shield</text></svg>`,
    realWorldExample: `// Preventing NoSQL injection by sanitizing req.body using express-mongo-sanitize`,
    commonUseCases: ["Hardening production Express servers"],
    commonMistakes: ["Configuring CORS with origin: '*' allowing untrusted cross-origin access"],
    bestPractices: ["Always use helmet() and express-rate-limit"],
    whenToUse: ["In all production Express applications"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Helmet", "CORS", "NoSQL Injection", "Rate Limiting"],
    comparison: { title: "Wildcard CORS vs Restricted CORS", headers: ["Config", "Security Level", "Use Case"], rows: [["origin: '*'", "Dangerous", "Public static APIs"], ["origin: 'https://app.com'", "Secure", "Production APIs"]] },
    interviewQuestions: [{ level: "Senior", question: "What does Helmet do in Express?", answer: "Helmet automatically configures 15+ security-related HTTP response headers protecting against XSS, clickjacking, and MIME-sniffing." }],
    practiceProblem: { description: "Apply helmet middleware to app.", starterCode: `// Code\n`, testAssertion: "Helmet used", solution: `app.use(helmet());` },
    quickRevision: "★ Use helmet() on all Express apps.\n★ Restrict CORS origin.\n★ Rate limit API endpoints."
  }),

  "nodejs-database-sql": createTopicSchema({
    id: "nodejs-database-sql",
    techId: "nodejs",
    title: "Relational SQL Databases, Connection Pooling & Transactions",
    category: "Database — SQL",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Connecting Node.js to SQL databases (PostgreSQL/MySQL), connection pool management, transactions, and deadlock handling.",
    simpleExplanation: "Covers connection pool tuning, parameterized queries, ACID transaction rollbacks, and composite index ordering.",
    whyDoesItExist: "Prevents database connection exhaustion and ensures transactional integrity.",
    basicExample: `import pg from 'pg';\nconst pool = new pg.Pool({ max: 20, idleTimeoutMillis: 30000 });`,
    howItWorks: ["Connection pool reuses existing database sockets rather than opening a new socket on every HTTP request."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">Connection Pool Queue</text></svg>`,
    realWorldExample: `// Executing SQL Transaction in Node.js\nconst client = await pool.connect();\ntry { await client.query('BEGIN'); /* query */ await client.query('COMMIT'); } catch (e) { await client.query('ROLLBACK'); } finally { client.release(); }`,
    commonUseCases: ["High-concurrency SQL database interactions"],
    commonMistakes: ["Opening new DB connections on every request without a connection pool"],
    bestPractices: ["Always use connection pools and parameterized queries"],
    whenToUse: ["In all SQL database connections"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Connection Pooling", "ACID", "Parameterized Queries", "Indexes"],
    comparison: { title: "New Connection vs Pooled Connection", headers: ["Metric", "New Connection", "Pooled Connection"], rows: [["Handshake Latency", "High (50ms)", "Zero (Instant reuse)"]] },
    interviewQuestions: [{ level: "Senior", question: "Why is connection pooling essential in Node.js?", answer: "Opening a TCP connection to MySQL/Postgres on every HTTP request adds massive latency and causes database connection exhaustion. Connection pools reuse pre-opened DB sockets." }],
    practiceProblem: { description: "Release client back to pool in finally block.", starterCode: `try {} catch {}`, testAssertion: "Released", solution: `finally { client.release(); }` },
    quickRevision: "★ Connection Pool: Reuse DB sockets.\n★ Transactions: BEGIN -> COMMIT / ROLLBACK.\n★ Always use Parameterized Queries."
  }),

  "nodejs-mongodb-mongoose": createTopicSchema({
    id: "nodejs-mongodb-mongoose",
    techId: "nodejs",
    title: "MongoDB & Mongoose Schema Architecture & Aggregations",
    category: "MongoDB & Mongoose",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Document database architecture with Mongoose, schemas, pre/post middleware hooks, populate(), and aggregation pipelines.",
    simpleExplanation: "Covers document modelling, embedding vs referencing, Mongoose hooks, and multi-stage aggregation pipelines.",
    whyDoesItExist: "Provides high-performance document storage with rich Schema validation.",
    basicExample: `import mongoose from 'mongoose';\nconst userSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true } });\nuserSchema.pre('save', async function() { this.password = await bcrypt.hash(this.password, 10); });`,
    howItWorks: ["Mongoose validates data against Schema definitions and executes middleware hooks before DB writes."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">Mongoose Schema Pipeline</text></svg>`,
    realWorldExample: `// Mongoose Aggregation Pipeline\nawait Order.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: '$userId', total: { $sum: '$amount' } } }]);`,
    commonUseCases: ["Document storage, flexible schema backends"],
    commonMistakes: ["Over-using populate() leading to N+1 MongoDB query performance bottlenecks"],
    bestPractices: ["Use indexes on frequently queried fields and use aggregation pipelines"],
    whenToUse: ["Unstructured/Document data stores"],
    whenNotToUse: ["Complex relational ACID ledgers"],
    relatedConcepts: ["Mongoose Schema", "Aggregation Pipeline", "populate()", "Indexes"],
    comparison: { title: "Embedding vs Referencing", headers: ["Pattern", "Performance", "Best Used For"], rows: [["Embedding", "Fast single-read", "1-to-few subdocuments"], ["Referencing", "Requires populate()", "1-to-many large relationships"]] },
    interviewQuestions: [{ level: "Senior", question: "How does Mongoose populate() work under the hood?", answer: "populate() executes an initial query to fetch parent documents, extracts foreign ID arrays, and executes a second $in query to fetch matching child documents." }],
    practiceProblem: { description: "Write pre-save Mongoose hook.", starterCode: `schema.pre('save', function() {});`, testAssertion: "Hook written", solution: `schema.pre('save', async function(next) { next(); });` },
    quickRevision: "★ pre('save') hooks run before saving.\n★ populate() runs additional $in queries.\n★ Aggregation: $match -> $group -> $project."
  }),

  "nodejs-redis-caching": createTopicSchema({
    id: "nodejs-redis-caching",
    techId: "nodejs",
    title: "Redis In-Memory Caching, Distributed Locks & Pub/Sub",
    category: "Redis & Caching",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Redis caching patterns, cache stampede prevention, distributed locking (Redlock), and Redis Streams.",
    simpleExplanation: "Stores key-value data in RAM for sub-millisecond retrieval, rate limiting, and atomic distributed locks.",
    whyDoesItExist: "Dramatically speeds up API responses and coordinates distributed server nodes.",
    basicExample: `import Redis from 'ioredis';\nconst redis = new Redis();\nawait redis.set('key', 'value', 'EX', 3600);`,
    howItWorks: ["Uses atomic single-threaded in-memory commands."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Redis RAM Cache</text></svg>`,
    realWorldExample: `// Distributed lock using SET key value NX PX 10000`,
    commonUseCases: ["Caching expensive DB queries, rate limiting"],
    commonMistakes: ["Not specifying TTL expiration times causing Redis RAM exhaustion"],
    bestPractices: ["Always set TTL expiration (EX) on cache keys"],
    whenToUse: ["High-read API backends"],
    whenNotToUse: ["Primary durable storage"],
    relatedConcepts: ["Cache-Aside", "Distributed Lock", "Pub/Sub", "Redis Streams"],
    comparison: { title: "Redis Cache vs DB", headers: ["Metric", "Redis", "Database"], rows: [["Latency", "< 1ms", "10 - 50ms"]] },
    interviewQuestions: [{ level: "Senior", question: "How do you prevent cache stampede in Node.js?", answer: "Use distributed locks (Redis SET NX) or probabilistic early expiration so only 1 process queries the database to re-warm the cache." }],
    practiceProblem: { description: "Set Redis key with 60 second TTL.", starterCode: `await redis.set('k', 'v');`, testAssertion: "TTL set", solution: `await redis.set('k', 'v', 'EX', 60);` },
    quickRevision: "★ Cache-aside: Check Redis -> Miss -> Query DB -> Set Redis.\n★ Distributed Lock: SET key val NX PX 10000."
  }),

  "nodejs-queues-background": createTopicSchema({
    id: "nodejs-queues-background",
    techId: "nodejs",
    title: "Background Processing & Message Queues with BullMQ",
    category: "Queues & Background Jobs",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-redis-caching"],
    definition: "Asynchronous job processing using BullMQ, job retries, backoff strategies, and dead-letter queues.",
    simpleExplanation: "Offloads heavy background tasks (emails, PDF generation) to BullMQ workers backed by Redis.",
    whyDoesItExist: "Ensures fast HTTP responses and reliable asynchronous job execution.",
    basicExample: `import { Queue, Worker } from 'bullmq';\nconst queue = new Queue('emails', { connection: redisConfig });\nawait queue.add('send', { to: 'user@exp.com' }, { attempts: 3, backoff: { type: 'exponential', delay: 1000 } });`,
    howItWorks: ["Queue pushes job payload into Redis streams/hashes; Worker process pulls and handles jobs."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">BullMQ Worker Pool</text></svg>`,
    realWorldExample: `// Dedicated BullMQ Worker process handling jobs independently from web API`,
    commonUseCases: ["Sending emails, processing payments, image resizing"],
    commonMistakes: ["Running heavy job workers inside the main web API process"],
    bestPractices: ["Separate queue worker processes from web API containers"],
    whenToUse: ["All async background processing"],
    whenNotToUse: ["Immediate sync HTTP response requirements"],
    relatedConcepts: ["BullMQ", "Exponential Backoff", "Dead-Letter Queue"],
    comparison: { title: "Sync Execution vs BullMQ Queue", headers: ["Metric", "Sync", "BullMQ"], rows: [["HTTP Response Time", "Slow (5000ms)", "Instant (<50ms)"]] },
    interviewQuestions: [{ level: "Senior", question: "Why is BullMQ preferred for Node.js background queues?", answer: "BullMQ leverages Redis atomic streams/hashes, supports exponential backoff retries, delayed jobs, parent-child flows, and worker concurrency bounds." }],
    practiceProblem: { description: "Create a BullMQ queue instance.", starterCode: `// Code\n`, testAssertion: "Queue created", solution: `const q = new Queue('myQueue', { connection });` },
    quickRevision: "★ BullMQ = Redis-backed queues.\n★ Retries: Use exponential backoff.\n★ Separate API containers from Worker containers."
  }),

  "nodejs-kafka-event-driven": createTopicSchema({
    id: "nodejs-kafka-event-driven",
    techId: "nodejs",
    title: "Apache Kafka & Event-Driven Architecture in Node.js",
    category: "Kafka & Event-Driven Architecture",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["nodejs-queues-background"],
    definition: "Distributed event streaming with Apache Kafka, KafkaJS, consumer groups, partitions, and at-least-once delivery.",
    simpleExplanation: "Streams high-volume event logs across microservices using Kafka topics, consumer groups, and partition keys.",
    whyDoesItExist: "Handles millions of events/sec with strict ordering and persistent log retention.",
    basicExample: `import { Kafka } from 'kafkajs';\nconst kafka = new Kafka({ clientId: 'app', brokers: ['localhost:9092'] });\nconst producer = kafka.producer();\nawait producer.send({ topic: 'orders', messages: [{ key: 'user-42', value: JSON.stringify(orderData) }] });`,
    howItWorks: ["Messages are appended to partitioned topic logs. Consumers track offset position."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">Kafka Topic & Consumer Group</text></svg>`,
    realWorldExample: `// Consumer group scaling across topic partitions`,
    commonUseCases: ["Real-time event streaming, CDC log pipelines"],
    commonMistakes: ["Omitting partition keys when message ordering is required"],
    bestPractices: ["Always specify partition keys for ordered event sequences"],
    whenToUse: ["High-scale event-driven microservices"],
    whenNotToUse: ["Simple task queue replacement for small projects"],
    relatedConcepts: ["Kafka", "Topics & Partitions", "Consumer Groups", "KafkaJS"],
    comparison: { title: "RabbitMQ vs Apache Kafka", headers: ["Metric", "RabbitMQ", "Apache Kafka"], rows: [["Storage", "Transient Queue", "Persistent Distributed Log"], ["Throughput", "High", "Massive (Millions/sec)"]] },
    interviewQuestions: [{ level: "Senior", question: "How does Kafka guarantee message ordering?", answer: "Kafka guarantees strict ordering ONLY within a single partition. By providing a partition key (e.g. userId), all events for that key hash to the exact same partition." }],
    practiceProblem: { description: "Send Kafka message with key.", starterCode: `producer.send({});`, testAssertion: "Message sent", solution: `producer.send({ topic: 't', messages: [{ key: 'k1', value: 'v1' }] });` },
    quickRevision: "★ Ordering: Strictly guaranteed within a partition via Partition Keys.\n★ Consumer Groups: Scale reading across partitions."
  }),

  "nodejs-streams-buffers": createTopicSchema({
    id: "nodejs-streams-buffers",
    techId: "nodejs",
    title: "Node.js Streams, Buffers & Backpressure Handling",
    category: "Streams & Buffers",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "17 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Processing large data chunks using Readable, Writable, Duplex, Transform streams, Buffers, and pipeline().",
    simpleExplanation: "Processes multi-gigabyte files or HTTP network streams piece-by-piece in memory without loading the entire payload into RAM.",
    whyDoesItExist: "Prevents memory crashes when processing files larger than RAM limit.",
    basicExample: `import { createReadStream, createWriteStream } from 'node:fs';\nimport { pipeline } from 'node:stream/promises';\nimport { createGzip } from 'node:zlib';\nawait pipeline(createReadStream('large.txt'), createGzip(), createWriteStream('large.txt.gz'));`,
    howItWorks: ["pipeline() auto-manages backpressure, pausing the readable stream when the writable stream buffer fills up."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Stream Pipeline (Read -> Transform -> Write)</text></svg>`,
    realWorldExample: `// Streaming 10GB file directly to HTTP Response res`,
    commonUseCases: ["File processing, video streaming, proxying HTTP responses"],
    commonMistakes: ["Using fs.readFile on 5GB files causing Out of Memory (OOM) process crashes"],
    bestPractices: ["Always use stream.pipeline() instead of raw .pipe() for proper error handling"],
    whenToUse: ["Handling large files or network streams"],
    whenNotToUse: ["Small 2KB JSON payloads"],
    relatedConcepts: ["Readable", "Writable", "Backpressure", "pipeline()", "Buffer"],
    comparison: { title: "fs.readFile vs fs.createReadStream", headers: ["Metric", "readFile", "createReadStream"], rows: [["RAM Usage", "High (Entire file in RAM)", "Constant Low (<10MB)"]] },
    interviewQuestions: [{ level: "Senior", question: "What is backpressure in Node.js streams and how is it handled?", answer: "Backpressure occurs when data is read faster than it can be written. stream.pipeline() automatically pauses the Readable stream until Writable buffer clears." }],
    practiceProblem: { description: "Pipe read stream to write stream with pipeline.", starterCode: `// Code\n`, testAssertion: "Pipelined", solution: `await pipeline(readStream, writeStream);` },
    quickRevision: "★ Stream: Process data chunk by chunk.\n★ Use stream.pipeline() for auto backpressure & error cleanup."
  }),

  "nodejs-error-logging": createTopicSchema({
    id: "nodejs-error-logging",
    techId: "nodejs",
    title: "Operational Error Handling & High-Performance Pino Logging",
    category: "Error Handling & Logging",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["nodejs-express-fundamentals"],
    definition: "Operational vs programmer errors, custom AppError classes, unhandled rejection process hooks, and structured Pino logging.",
    simpleExplanation: "Differentiates expected operational errors (404/400) from unexpected crashes, logging structured JSON with Pino and correlation request IDs.",
    whyDoesItExist: "Ensures production error visibility and fast incident diagnosis.",
    basicExample: `import pino from 'pino';\nconst logger = pino({ level: 'info' });\nlogger.info({ reqId: '123', userId: '42' }, 'User logged in');`,
    howItWorks: ["Pino logs structured JSON asynchronously with minimal V8 CPU overhead."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">Structured Pino Log Stream</text></svg>`,
    realWorldExample: `// Custom Operational AppError class\nclass AppError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; this.isOperational = true; } }`,
    commonUseCases: ["Structured JSON logging, correlation ID tracing"],
    commonMistakes: ["Using console.log in high-traffic production apps (synchronous & slow!)"],
    bestPractices: ["Use Pino for structured JSON logging and attach request correlation IDs"],
    whenToUse: ["In all production Node.js backends"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["AppError", "Pino", "Winston", "Correlation ID"],
    comparison: { title: "console.log vs Pino", headers: ["Logger", "Format", "Performance"], rows: [["console.log", "Unstructured text", "Slow (Blocking)"], ["Pino", "Structured JSON", "Ultra-Fast (Asynchronous)"]] },
    interviewQuestions: [{ level: "Senior", question: "Why is Pino preferred over Winston or console.log in high-traffic Node.js applications?", answer: "Pino is optimized for extreme low overhead, writing structured JSON asynchronously using worker threads without blocking the main event loop." }],
    practiceProblem: { description: "Create Pino logger instance.", starterCode: `// Code\n`, testAssertion: "Logger created", solution: `const logger = pino();` },
    quickRevision: "★ Operational Errors = Expected (404/400); Programmer Errors = Bugs (Crash process).\n★ Use Pino for fast JSON logging."
  }),

  "nodejs-testing": createTopicSchema({
    id: "nodejs-testing",
    techId: "nodejs",
    title: "Automated Testing: Supertest, Vitest/Jest & Mocking",
    category: "Testing Node.js & Express",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["nodejs-express-fundamentals"],
    definition: "Unit testing, integration testing Express APIs with Supertest, and mocking external DB/API dependencies with Vitest/Jest.",
    simpleExplanation: "Automates API contract testing using Supertest against running Express apps with isolated mock databases.",
    whyDoesItExist: "Guarantees API contract reliability and prevents regression bugs.",
    basicExample: `import request from 'supertest';\nimport app from '../app.js';\ntest('GET /health returns 200', async () => {\n  const res = await request(app).get('/health');\n  expect(res.status).toBe(200);\n});`,
    howItWorks: ["Supertest spins up in-memory HTTP server instance passing requests directly into Express app handler."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">Supertest HTTP Assertion</text></svg>`,
    realWorldExample: `// Mocking database module using Vitest vi.mock()`,
    commonUseCases: ["Testing Express API endpoints", "Unit testing domain services"],
    commonMistakes: ["Hitting live external APIs in automated CI test runs"],
    bestPractices: ["Use Supertest for API integration tests and mock external third-party calls"],
    whenToUse: ["In all software development projects"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Supertest", "Vitest", "Jest", "Mocking"],
    comparison: { title: "Unit Test vs Supertest API Test", headers: ["Metric", "Unit Test", "Supertest API Test"], rows: [["Scope", "Single function", "Full Express HTTP Middleware & Route stack"]] },
    interviewQuestions: [{ level: "Senior", question: "How does Supertest test Express applications without opening network ports?", answer: "Supertest passes the Express app instance to Node's internal http.Server listening on ephemeral in-memory sockets." }],
    practiceProblem: { description: "Write Supertest GET request assertion.", starterCode: `request(app).get('/test');`, testAssertion: "Asserted", solution: `await request(app).get('/test').expect(200);` },
    quickRevision: "★ Supertest = Express API testing.\n★ Mock external network calls in CI."
  }),

  "nodejs-performance-scalability": createTopicSchema({
    id: "nodejs-performance-scalability",
    techId: "nodejs",
    title: "Profiling Node.js, V8 Garbage Collection & Cluster Scaling",
    category: "Performance & Scalability",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Profiling Node.js with Inspector, V8 GC tuning, memory leak detection, Cluster module, and scaling to 10,000 req/sec.",
    simpleExplanation: "Diagnoses CPU/Memory bottlenecks using Chrome DevTools Inspector and scales multi-core throughput using Node.js Cluster module.",
    whyDoesItExist: "Maximizes single-server hardware utilization and resolves memory leak crashes.",
    basicExample: `import cluster from 'node:cluster';\nimport os from 'node:os';\nif (cluster.isPrimary) {\n  for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();\n} else {\n  // Worker process runs Express server!\n}`,
    howItWorks: ["Cluster primary process creates worker processes sharing master port via OS round-robin socket passing."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Primary Process -> Forked Workers</text></svg>`,
    realWorldExample: `// Starting Node.js with Inspector enabled: node --inspect server.js`,
    commonUseCases: ["Scaling multi-core servers", "Debugging heap memory leaks"],
    commonMistakes: ["Storing global array caches that grow infinitely causing heap OOM crashes"],
    bestPractices: ["Use os.availableParallelism() for cluster worker counts"],
    whenToUse: ["High-throughput production node deployments"],
    whenNotToUse: ["Container environments already scaled by Kubernetes"],
    relatedConcepts: ["Cluster Module", "Inspector", "V8 Heap", "Garbage Collection"],
    comparison: { title: "Single Process vs Cluster Module", headers: ["Metric", "Single Process", "Cluster"], rows: [["CPU Utilization", "1 CPU Core", "All Available CPU Cores"]] },
    interviewQuestions: [{ level: "Senior", question: "How does Node.js Cluster module distribute incoming connections?", answer: "The Primary process binds to the server port and uses OS round-robin load balancing to hand off incoming socket connections to worker processes." }],
    practiceProblem: { description: "Fork cluster workers for available CPUs.", starterCode: `if (cluster.isPrimary) {}`, testAssertion: "Forked", solution: `if (cluster.isPrimary) { for (let i = 0; i < os.availableParallelism(); i++) cluster.fork(); }` },
    quickRevision: "★ Cluster = Multi-process scaling across CPU cores.\n★ Profiling: Use node --inspect + Chrome DevTools."
  }),

  "nodejs-worker-threads-cluster": createTopicSchema({
    id: "nodejs-worker-threads-cluster",
    techId: "nodejs",
    title: "Worker Threads vs Cluster vs Child Processes",
    category: "Worker Threads, Cluster & Child Processes",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-event-loop-async"],
    definition: "Choosing between Worker Threads, Cluster module, and child_process (fork/spawn/exec).",
    simpleExplanation: "Guides when to use Worker Threads for shared-memory CPU math vs Cluster for multi-core HTTP scaling vs child_process for CLI execution.",
    whyDoesItExist: "Prevents choosing the wrong concurrency model for CPU vs I/O tasks.",
    basicExample: `import { spawn } from 'node:child_process';\nconst ls = spawn('ls', ['-la']);`,
    howItWorks: ["spawn() runs external OS binaries; Worker Threads run JS in shared V8 isolates."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">Concurrency Selection Matrix</text></svg>`,
    realWorldExample: `// Running FFmpeg video conversion via child_process.spawn()`,
    commonUseCases: ["Executing shell commands, heavy CPU image resizing"],
    commonMistakes: ["Using child_process.exec() on untrusted user input (command injection vulnerability!)"],
    bestPractices: ["Use spawn() over exec() for large command output"],
    whenToUse: ["Multithreading or CLI execution"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Worker Threads", "child_process", "spawn()", "fork()"],
    comparison: { title: "Worker Threads vs child_process", headers: ["Metric", "Worker Threads", "child_process"], rows: [["Memory", "Shared (SharedArrayBuffer)", "Isolated"], ["Use Case", "CPU JS Algorithms", "External OS Binaries"]] },
    interviewQuestions: [{ level: "Senior", question: "When would you use Worker Threads vs child_process.spawn()?", answer: "Use Worker Threads for heavy in-memory JS calculations (e.g. crypto/math). Use spawn() for running external OS commands or non-JS binaries (e.g. FFmpeg, Python)." }],
    practiceProblem: { description: "Spawn a child process for 'ls'.", starterCode: `// Code\n`, testAssertion: "Spawned", solution: `const p = spawn('ls', ['-la']);` },
    quickRevision: "★ Worker Threads = Shared memory CPU JS.\n★ child_process = External OS binaries.\n★ Cluster = Multi-core HTTP server."
  }),

  "nodejs-microservices": createTopicSchema({
    id: "nodejs-microservices",
    techId: "nodejs",
    title: "Node.js Microservices, gRPC, Saga & Circuit Breaker",
    category: "Microservices & Distributed Systems",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["nodejs-kafka-event-driven"],
    definition: "Distributed system patterns: gRPC, API Gateways, Saga pattern, Circuit Breaker, and distributed tracing.",
    simpleExplanation: "Architects decoupled microservices communicating via gRPC or RabbitMQ with Opossum Circuit Breakers to prevent cascading failures.",
    whyDoesItExist: "Ensures resilience and fault tolerance in large distributed cloud backends.",
    basicExample: `import CircuitBreaker from 'opossum';\nconst breaker = new CircuitBreaker(asyncCall, { timeout: 3000, errorThresholdPercentage: 50 });\nbreaker.fallback(() => ({ status: 'degraded' }));`,
    howItWorks: ["Circuit breaker transitions: Closed (Normal) -> Open (Failing, fast-fail) -> Half-Open (Testing recovery)."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">Circuit Breaker State Machine</text></svg>`,
    realWorldExample: `// gRPC high-performance binary inter-service RPC call`,
    commonUseCases: ["Distributed microservices backends"],
    commonMistakes: ["Performing synchronous HTTP REST chains across 10 microservices per request"],
    bestPractices: ["Use Circuit Breakers (Opossum) for all downstream service calls"],
    whenToUse: ["Large enterprise systems"],
    whenNotToUse: ["Small monoliths"],
    relatedConcepts: ["gRPC", "Circuit Breaker", "Saga Pattern", "API Gateway"],
    comparison: { title: "REST vs gRPC Inter-Service", headers: ["Metric", "REST", "gRPC"], rows: [["Protocol", "HTTP/1.1 JSON", "HTTP/2 Protobuf Binary"], ["Speed", "Moderate", "Ultra-Fast"]] },
    interviewQuestions: [{ level: "Senior", question: "Explain the Circuit Breaker pattern states.", answer: "Closed (normal traffic), Open (downstream service failing; immediately returns fallback without network call), and Half-Open (sends trial requests to check if downstream recovered)." }],
    practiceProblem: { description: "Create Opossum CircuitBreaker instance.", starterCode: `// Code\n`, testAssertion: "Breaker created", solution: `const b = new CircuitBreaker(asyncFn, options);` },
    quickRevision: "★ Circuit Breaker: Closed -> Open -> Half-Open.\n★ gRPC: HTTP/2 Binary Protobuf.\n★ Saga: Distributed compensating transactions."
  }),

  "nodejs-system-design": createTopicSchema({
    id: "nodejs-system-design",
    techId: "nodejs",
    title: "System Design: Scalable E-Commerce, Chat & Rate-Limiter",
    category: "System Design — Senior/Lead",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "20 min",
    prerequisites: ["nodejs-performance-scalability"],
    definition: "End-to-end Node.js system architecture blueprints for high-traffic REST APIs, real-time Socket.io chat, and rate-limiting services.",
    simpleExplanation: "Blueprints for building scalable Node.js systems: Load Balancer -> Node.js Cluster -> Redis Cache -> MongoDB/Postgres Replicas.",
    whyDoesItExist: "Demonstrates senior/lead level system architecture skills.",
    basicExample: `// Real-Time Chat Backend Blueprint: Socket.io + Redis Adapter for horizontal scaling`,
    howItWorks: ["Redis Pub/Sub adapter syncs WebSockets across multiple Node.js server nodes."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">Scalable Socket.io Redis Adapter Architecture</text></svg>`,
    realWorldExample: `// Horizontal WebSockets scaling with socket.io-redis-adapter`,
    commonUseCases: ["System design interviews, cloud architecture planning"],
    commonMistakes: ["Storing WebSocket session state in Node.js server RAM instead of Redis"],
    bestPractices: ["Use Redis Adapter to scale Socket.io across multiple server nodes"],
    whenToUse: ["High-scale system design"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Socket.io", "Redis Adapter", "System Design"],
    comparison: { title: "Single Node WebSockets vs Redis Adapter", headers: ["Metric", "Single Node", "Redis Adapter"], rows: [["Scalability", "1 Server Limit", "Infinite Horizontal Nodes"]] },
    interviewQuestions: [{ level: "Senior", question: "How do you scale Socket.io WebSockets horizontally across multiple Node.js servers?", answer: "Use the Socket.io Redis Adapter (@socket.io/redis-adapter) so published messages are broadcasted via Redis Pub/Sub to all connected Node.js instances." }],
    practiceProblem: { description: "Define system architecture tier list.", starterCode: `// Architecture\n`, testAssertion: "Architecture listed", solution: `// LB -> Node.js -> Redis -> DB Replicas` },
    quickRevision: "★ WebSockets Scale: Use Socket.io + Redis Adapter.\n★ Rate Limiter: Redis Token Bucket / Sliding Window."
  }),

  "nodejs-realworld-scenarios": createTopicSchema({
    id: "nodejs-realworld-scenarios",
    techId: "nodejs",
    title: "Production Incident Diagnostics: 100% CPU & Memory Leaks",
    category: "Real-World Troubleshooting Scenarios",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["nodejs-performance-scalability"],
    definition: "Debugging severe production outages: 5s API delay, 100% CPU usage, process crash memory leaks, and duplicate emails.",
    simpleExplanation: "Step-by-step diagnostic procedures using heap snapshots, V8 inspector, and atomic MongoDB updates.",
    whyDoesItExist: "Prepares senior engineers for live production incident response.",
    basicExample: `// Resolving Race Condition Overselling with Atomic MongoDB Update
const updatedDoc = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gt: 0 } },
  { $inc: { stock: -1 } },
  { new: true }
);
if (!updatedDoc) throw new Error('Item Out of Stock');`,
    howItWorks: ["Atomic database update guarantees single winner even under 1,000 concurrent requests."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-3"><text x="350" y="65" fill="#34d399" text-anchor="middle">Atomic Update Race Condition Protection</text></svg>`,
    realWorldExample: `// Generating Heap Snapshot on OOM: node --max-old-space-size=4096 --heap-prof server.js`,
    commonUseCases: ["Production outage response"],
    commonMistakes: ["Restarting crashed servers without capturing heap snapshots first"],
    bestPractices: ["Always use atomic database decrements for inventory management"],
    whenToUse: ["Production debugging"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Heap Snapshot", "Atomic Update", "Incident Response"],
    comparison: { title: "Non-Atomic vs Atomic Inventory Update", headers: ["Approach", "Overselling Risk?", "Safety"], rows: [["find() -> stock-- -> save()", "HIGH (Race Condition)", "Dangerous"], ["findOneAndUpdate({ stock: { $gt: 0 } })", "ZERO", "100% Safe"]] },
    interviewQuestions: [{ level: "Senior", question: "How do you investigate a Node.js process crashing due to out-of-memory (OOM)?", answer: "Enable node --heap-prof or capture heap snapshots using heapdump/Inspector, then analyze memory diffs in Chrome DevTools to identify retained global references." }],
    practiceProblem: { description: "Write atomic MongoDB stock decrement.", starterCode: `Product.updateOne();`, testAssertion: "Atomic update", solution: `Product.findOneAndUpdate({ _id: id, stock: { $gt: 0 } }, { $inc: { stock: -1 } });` },
    quickRevision: "★ Overselling Fix: Atomic $inc with stock > 0 condition.\n★ Memory Leak Fix: Heap Snapshots in Chrome DevTools."
  }),

  "nodejs-docker-devops": createTopicSchema({
    id: "nodejs-docker-devops",
    techId: "nodejs",
    title: "Docker Containerization, Graceful Shutdown & PM2",
    category: "Docker, DevOps & Production",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-performance-scalability"],
    definition: "Multi-stage Docker builds, SIGTERM graceful shutdown, PM2 process management, and readiness probes.",
    simpleExplanation: "Packages Node.js into lightweight production Docker images with SIGTERM handling to drain active HTTP connections before container exit.",
    whyDoesItExist: "Ensures zero-downtime deployments in Kubernetes/Docker environments.",
    basicExample: `// Graceful Shutdown on SIGTERM
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...');
  server.close(async () => {
    await db.disconnect();
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
});`,
    howItWorks: ["Container orchestration sends SIGTERM. Node.js stops accepting new requests, drains active HTTP connections, and exits."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-3"><text x="350" y="65" fill="#34d399" text-anchor="middle">SIGTERM Graceful Drain Pipeline</text></svg>`,
    realWorldExample: `// Multi-stage Dockerfile for small image (<100MB)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production`,
    commonUseCases: ["Containerized cloud deployments"],
    commonMistakes: ["Killing process immediately on SIGTERM without draining active HTTP connections (causes HTTP 502 errors to clients!)"],
    bestPractices: ["Always implement process.on('SIGTERM') graceful shutdown"],
    whenToUse: ["Production Docker deployments"],
    whenNotToUse: ["Local dev"],
    relatedConcepts: ["SIGTERM", "Graceful Shutdown", "Multi-stage Docker", "PM2"],
    comparison: { title: "Instant Exit vs Graceful Shutdown", headers: ["Shutdown Type", "Active Connections", "Client Impact"], rows: [["Instant process.exit()", "Terminated abruptly", "HTTP 502 / Connection Reset"], ["Graceful SIGTERM Drain", "Allowed to finish (server.close)", "Zero Failed Requests"]] },
    interviewQuestions: [{ level: "Senior", question: "Why is graceful shutdown handling essential in Kubernetes/Docker?", answer: "When Kubernetes terminates a pod, it sends SIGTERM. Graceful shutdown stops taking new requests while allowing ongoing HTTP requests to complete cleanly before process exit." }],
    practiceProblem: { description: "Register SIGTERM process listener.", starterCode: `process.on('SIGTERM', () => {});`, testAssertion: "Listener added", solution: `process.on('SIGTERM', () => { server.close(); });` },
    quickRevision: "★ Graceful Shutdown: Catch SIGTERM -> server.close() -> exit.\n★ Multi-stage Docker: Keep image sizes under 100MB."
  }),

  "nodejs-cicd-cloud": createTopicSchema({
    id: "nodejs-cicd-cloud",
    techId: "nodejs",
    title: "CI/CD Pipelines, Cloud Secret Management & Serverless",
    category: "CI/CD & Cloud",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["nodejs-docker-devops"],
    definition: "CI/CD pipeline configuration, Docker publishing, AWS Lambda serverless vs long-running server, and cloud secrets.",
    simpleExplanation: "Automates test, lint, and security scan pipelines in GitHub Actions, publishing Docker images to cloud registries.",
    whyDoesItExist: "Ensures automated code validation and deployment.",
    basicExample: `// GitHub Actions Workflow snippet: npm ci -> npm test -> docker build`,
    howItWorks: ["CI runner executes tests on every Pull Request before merging."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#60a5fa" text-anchor="middle">GitHub Actions CI Pipeline</text></svg>`,
    realWorldExample: `// Secret management via AWS Secrets Manager or HashiCorp Vault`,
    commonUseCases: ["Automating deployments"],
    commonMistakes: ["Committing .env secret files to git repositories"],
    bestPractices: ["Inject production environment variables via Cloud Secret Managers"],
    whenToUse: ["In all cloud deployment workflows"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["CI/CD", "AWS Lambda", "Secret Management"],
    comparison: { title: "Long-Running Express vs AWS Lambda", headers: ["Metric", "Express Server", "AWS Lambda"], rows: [["Cold Start", "Zero", "100 - 500ms"], ["Scaling", "Provisioned Nodes", "Instant Auto-Scale"]] },
    interviewQuestions: [{ level: "Senior", question: "When would you choose AWS Lambda over a long-running Express server?", answer: "Choose AWS Lambda for unpredictable, bursty, or low-frequency tasks (event webhooks, background image triggers). Choose long-running Express for high-frequency steady REST traffic." }],
    practiceProblem: { description: "List CI pipeline steps.", starterCode: `// Steps\n`, testAssertion: "Steps listed", solution: `// npm ci -> npm run lint -> npm test -> docker build` },
    quickRevision: "★ CI Pipeline: npm ci -> lint -> test -> build.\n★ AWS Lambda: Best for bursty background event triggers."
  }),

  "nodejs-design-patterns": createTopicSchema({
    id: "nodejs-design-patterns",
    techId: "nodejs",
    title: "Design Patterns in Node.js: Factory, Strategy & EventEmitter",
    category: "Design Patterns",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-js-advanced"],
    definition: "GoF design patterns tailored for Node.js: Strategy, Factory, Decorator, Adapter, EventEmitter, and Middleware pattern.",
    simpleExplanation: "Applies architectural patterns to backend Node.js code, using Strategy for payment providers and Decorator for caching.",
    whyDoesItExist: "Provides scalable solutions to common backend engineering problems.",
    basicExample: `// Strategy Pattern for Notification Providers
class SMSNotification { send(msg) { /* Twilio */ } }
class EmailNotification { send(msg) { /* SES */ } }
class Notifier { constructor(private strategy) {} send(msg) { this.strategy.send(msg); } }`,
    howItWorks: ["Context delegates action to concrete strategy object."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">Strategy Design Pattern</text></svg>`,
    realWorldExample: `// Middleware pattern matching Express app.use() layer chain`,
    commonUseCases: ["Multi-provider backend integrations"],
    commonMistakes: ["Over-engineering simple tasks with unnecessary Singleton classes"],
    bestPractices: ["Use Strategy pattern when switching between external third-party SDKs"],
    whenToUse: ["Enterprise Node.js domain logic"],
    whenNotToUse: ["Simple scripts"],
    relatedConcepts: ["Strategy Pattern", "Factory Pattern", "EventEmitter", "Middleware Pattern"],
    comparison: { title: "Strategy vs Adapter", headers: ["Pattern", "Purpose"], rows: [["Strategy", "Interchangeable algorithms"], ["Adapter", "Translates incompatible API interface"]] },
    interviewQuestions: [{ level: "Senior", question: "Explain the Strategy pattern in Node.js.", answer: "Defines a family of interchangeable algorithms behind a common interface, allowing selection at runtime without modifying client code." }],
    practiceProblem: { description: "Implement Strategy pattern interface.", starterCode: `class Strategy {}`, testAssertion: "Strategy created", solution: `class Strategy { send() {} }` },
    quickRevision: "★ Strategy: Interchangeable algorithms.\n★ Decorator: Wraps object to extend functionality."
  }),

  "nodejs-leadership-senior": createTopicSchema({
    id: "nodejs-leadership-senior",
    techId: "nodejs",
    title: "Engineering Leadership, Code Standards & Tech Debt",
    category: "Leadership & Senior-Level Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-fundamentals-runtime"],
    definition: "Code review standards, ESLint/Prettier automation, tech debt management, and legacy Express app refactoring.",
    simpleExplanation: "Senior engineering leadership practices for enforcing team coding standards and migrating legacy codebases.",
    whyDoesItExist: "Essential for Lead Engineers and Principal Architects.",
    basicExample: `// Automated ESLint + Prettier + TypeScript CI configuration`,
    howItWorks: ["CI pipeline blocks PR merges if linting or static type errors fail."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#f87171" text-anchor="middle">Engineering Quality Pipeline</text></svg>`,
    realWorldExample: `// Refactoring legacy Callback Hell to Async/Await using util.promisify()`,
    commonUseCases: ["Leading engineering teams, establishing PR guidelines"],
    commonMistakes: ["Conducting manual code reviews without automated linter tools"],
    bestPractices: ["Automate code formatting via ESLint/Prettier in Husky pre-commit hooks"],
    whenToUse: ["Team leadership"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["ESLint", "Code Review", "Tech Debt", "util.promisify"],
    comparison: { title: "Manual Code Review vs Automated CI Scan", headers: ["Type", "Consistency", "Speed"], rows: [["Manual Review", "Variable", "Slow"], ["Automated CI Scan", "100% Strict", "Instant (<30s)"]] },
    interviewQuestions: [{ level: "Senior", question: "How do you enforce coding standards across a team of 15 Node.js engineers?", answer: "Automate code formatting with ESLint/Prettier in Husky pre-commit hooks, enforce strict TypeScript checks in CI pipelines, and establish clear architectural PR review guidelines." }],
    practiceProblem: { description: "Promisify a callback function.", starterCode: `import util from 'util';`, testAssertion: "Promisified", solution: `const readFileAsync = util.promisify(fs.readFile);` },
    quickRevision: "★ Automate standards via ESLint/Prettier/Husky.\n★ Refactor legacy callbacks with util.promisify()."
  }),

  "nodejs-coding-challenges": createTopicSchema({
    id: "nodejs-coding-challenges",
    techId: "nodejs",
    title: "Senior Coding Challenges: Async Wrappers, Streams & Locks",
    category: "Coding & Practical Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["nodejs-express-fundamentals", "nodejs-streams-buffers"],
    definition: "Live coding solutions for top senior Node.js problems: asyncHandler, JWT rotation, Redis cache-aside, stream file processor, and atomic stock updates.",
    simpleExplanation: "Provides battle-tested code implementations for the core senior Node.js practical coding interview problems (Questions 408 - 424).",
    whyDoesItExist: "Direct preparation for live senior coding interviews.",
    basicExample: `// Problem 410: Reusable asyncHandler Wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};`,
    howItWorks: ["Wraps async route functions in Promise.resolve(), passing any thrown/rejected errors to next(err)."],
    visualDiagram: `<svg viewBox="0 0 700 120" class="w-full bg-slate-900 rounded-lg p-2"><text x="350" y="65" fill="#34d399" text-anchor="middle">asyncHandler Execution Flow</text></svg>`,
    realWorldExample: `// Problem 416: Generic Redis Cache-Aside function
async function getOrSetCache(key, ttlSeconds, fetchFn) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const result = await fetchFn();
  await redis.set(key, JSON.stringify(result), 'EX', ttlSeconds);
  return result;
}`,
    commonUseCases: ["Live senior technical coding assessments"],
    commonMistakes: ["Forgetting catch(next) in custom async route wrappers"],
    bestPractices: ["Always return cached data early in cache-aside helper functions"],
    whenToUse: ["In practical backend development"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["asyncHandler", "Cache-Aside Helper", "Atomic Decrement"],
    comparison: { title: "Try/Catch Boilerplate vs asyncHandler", headers: ["Approach", "Code Lines", "Readability"], rows: [["Try/Catch per route", "10 lines per route", "Cluttered"], ["asyncHandler wrapper", "1 line wrapper", "Clean"]] },
    interviewQuestions: [{ level: "Senior", question: "Implement a reusable asyncHandler wrapper for Express.", answer: "const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);" }],
    practiceProblem: { description: "Write asyncHandler wrapper function.", starterCode: `const asyncHandler = () => {};`, testAssertion: "Wrapper valid", solution: `const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);` },
    quickRevision: "★ asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next).\n★ Redis Cache-Aside: Check Redis -> Miss -> Fetch -> Set EX."
  })
};
