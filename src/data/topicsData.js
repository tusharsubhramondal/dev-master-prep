export const topicsData = {
  // ==========================================
  // JAVASCRIPT: CLOSURE
  // ==========================================
  "javascript-closure": {
    id: "javascript-closure",
    techId: "javascript",
    category: "Advanced JavaScript",
    title: "Closures in JavaScript",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "10 min",
    prerequisites: ["Functions", "Scope", "Lexical Environment"],

    // 1. Definition
    definition: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In JavaScript, closures give inner functions access to an outer function's scope even after the outer function has returned.",

    // 2. Simple Explanation
    simpleExplanation: "Think of a closure like a backpack that a function carries. Whenever a function is created, it packs all the variables available in its surrounding outer environment into its backpack. Even if you call that function somewhere else or long after the outer function finished running, it still opens its backpack and retrieves those variables.",

    // 3. Why Does It Exist?
    whyDoesItExist: "JavaScript uses lexical scoping, meaning function execution relies on the location where variables were declared. Closures exist to preserve state between function invocations without polluting the global scope, enabling data encapsulation, stateful functions, memoization, and callback handlers.",

    // 4. Basic Example
    basicExample: `function createCounter() {
    let count = 0; // State held in lexical scope

    return function increment() {
        count++;
        return count;
    };
}

const counter = createCounter();

console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
console.log(counter()); // Output: 3`,

    // 5. How It Works
    howItWorks: [
      "1. Execution context for `createCounter()` is created on the Call Stack.",
      "2. Variable `count` is initialized to 0 inside `createCounter`'s Environment Record.",
      "3. `createCounter()` returns the inner `increment` function reference.",
      "4. `createCounter()` pops off the Call Stack, but its Lexical Environment is retained in heap memory because `increment` keeps an internal [[Scope]] reference to it.",
      "5. Calling `counter()` executes `increment()`, which checks its local scope, finds no `count`, and traverses up the closure chain to locate and mutate `count`."
    ],

    // 6. Visual Diagram
    visualDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="w-full rounded-lg bg-slate-900 border border-slate-800 p-2">
      <!-- Outer scope -->
      <rect x="20" y="20" width="660" height="200" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="40" y="45" fill="#60a5fa" font-weight="bold" font-family="sans-serif">Outer Scope: createCounter()</text>
      <text x="40" y="75" fill="#e2e8f0" font-family="monospace">let count = 0 (Preserved in Heap)</text>
      
      <!-- Inner Closure scope -->
      <rect x="320" y="90" width="340" height="110" rx="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="340" y="115" fill="#34d399" font-weight="bold" font-family="sans-serif">Inner Closure Function: increment()</text>
      <text x="340" y="145" fill="#94a3b8" font-family="monospace">returns count++</text>
      <text x="340" y="175" fill="#a7f3d0" font-size="12" font-family="sans-serif">✓ Accesses 'count' via internal [[Scope]] link</text>

      <!-- Arrow -->
      <path d="M 320 145 L 240 75" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)" stroke-dasharray="4"/>
    </svg>`,

    // 7. Real-World Example
    realWorldExample: `// Module Pattern for Data Privacy in Payment Gateways
const PaymentGateway = (function () {
    let apiKey = "secret_live_key_998811"; // Private state hidden from outside global scope

    return {
        processPayment: function (amount) {
            console.log(\`Processing $\${amount} with API Key: \${apiKey.slice(0, 6)}***\`);
            return { status: "success", txId: Math.random().toString(36).substring(7) };
        }
    };
})();

// Outside code cannot overwrite apiKey directly!
PaymentGateway.processPayment(250); 
console.log(PaymentGateway.apiKey); // Output: undefined`,

    // 8. Common Use Cases
    commonUseCases: [
      "Data Privacy & Encapsulation (Private variables)",
      "Function Factories (Generating custom functions with preset arguments)",
      "Event Handlers and Callback Listeners",
      "Currying and Partial Application",
      "Memoization and Caching computed results",
      "Emulating Module Patterns before ES6 import/export"
    ],

    // 9. Common Mistakes
    commonMistakes: [
      "Creating closures inside loops with `var` instead of `let` (all callbacks share the same mutated loop variable).",
      "Accidentally retaining large objects or DOM references inside outer scopes, causing Memory Leaks.",
      "Overusing closures where simple object parameters or class properties would be more readable."
    ],

    // 10. Best Practices
    bestPractices: [
      "Use `let` or `const` in block-scoped loops to automatically capture distinct closure bindings per iteration.",
      "Explicitly clean up event listeners or nullify closure references when destroying components to prevent memory retention.",
      "Keep closure functions focused on single responsibilities to ensure predictable state mutation."
    ],

    // 11. When To Use
    whenToUse: [
      "When you need persistent private state across multiple method calls without exposing properties on global objects.",
      "When creating custom middleware or event listener wrappers with pre-configured settings."
    ],

    // 12. When NOT To Use
    whenNotToUse: [
      "Inside high-frequency animation frames or performance-critical tight loops where thousands of dynamic functions will be allocated needlessly.",
      "When state should be easily inspected or reset globally during unit testing."
    ],

    // 13. Related Concepts
    relatedConcepts: ["Lexical Scope", "Execution Context", "Call Stack", "Garbage Collection", "Currying", "Higher-Order Functions"],

    // 14. Comparison
    comparison: {
      title: "Closure vs Global Scope vs Object State",
      headers: ["Feature", "Closure", "Global Scope", "Object Property"],
      rows: [
        ["Encapsulation", "High (Private variables)", "None (Globally mutable)", "Medium (Public by default)"],
        ["Memory Overhead", "Retains outer scope references", "Low (Stays until page unload)", "Standard object memory allocation"],
        ["State Protection", "Cannot be altered from outside", "Vulnerable to collisions", "Can be overwritten unless frozen"]
      ]
    },

    // 15. Interview Questions
    interviewQuestions: [
      {
        level: "Beginner",
        question: "What is a closure in JavaScript and how do you create one?",
        answer: "A closure is created when an inner function accesses variables from an outer function's scope even after the outer function has finished executing."
      },
      {
        level: "Intermediate",
        question: "What will this code log: `for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 100); }`?",
        answer: "It will log `3, 3, 3` because `var` is function-scoped. By the time `setTimeout` fires, `i` has reached 3. Fixing it requires `let` or an IIFE closure."
      },
      {
        level: "Senior",
        question: "How can closures cause memory leaks in production applications and how do you diagnose them?",
        answer: "If a closure references large variables or detached DOM nodes, garbage collection cannot reclaim that memory as long as the closure reference exists. You diagnose this using Chrome DevTools Memory Heap Snapshots."
      }
    ],

    // 16. Practice Problem
    practiceProblem: {
      description: "Write a function `createLimiter(limit)` that returns a closure function `request()`. The `request()` function should return true when invoked within the `limit` threshold, and return false once the invocation count exceeds `limit`.",
      starterCode: `function createLimiter(limit) {
  // Write your code here
}

const limiter = createLimiter(2);
console.log(limiter()); // Should log true
console.log(limiter()); // Should log true
console.log(limiter()); // Should log false`,
      testAssertion: "limiter() === true && limiter() === true && limiter() === false",
      solution: `function createLimiter(limit) {
  let count = 0;
  return function request() {
    if (count < limit) {
      count++;
      return true;
    }
    return false;
  };
}`
    },

    // 17. Quick Revision
    quickRevision: "★ A Closure preserves access to outer lexical scope variables after the outer function returns.\n★ Created automatically whenever a function is declared inside another function.\n★ Crucial for data privacy, currying, and memoization.\n★ Watch out for stale values and memory retention when holding large objects in scope."
  },

  // ==========================================
  // NODE.JS: EVENT LOOP
  // ==========================================
  "nodejs-event-loop": {
    id: "nodejs-event-loop",
    techId: "nodejs",
    category: "Node.js Fundamentals",
    title: "The Node.js Event Loop & libuv",
    difficulty: "Advanced",
    experienceBand: "3–6 years",
    readingTime: "15 min",
    prerequisites: ["Async JavaScript", "Call Stack", "libuv Architecture"],

    definition: "The Event Loop is the heart of Node.js asynchronous architecture. Powered by libuv, it continuously offloads non-blocking I/O tasks to the operating system or worker thread pool and executes their corresponding callbacks on a single thread.",

    simpleExplanation: "Imagine a master chef operating a kitchen alone (the Single Thread Call Stack). Instead of waiting 15 minutes by the oven for bread to bake (blocking I/O), the chef sets a timer and immediately takes the next customer's order. When the oven timer dings, the chef finishes the current action and retrieves the baked bread.",

    whyDoesItExist: "Traditional multi-threaded web servers (like Apache) create a new OS thread for every incoming connection, leading to huge RAM consumption and context-switching overhead. The Node.js Event Loop allows handling 100,000+ concurrent connections on a single thread efficiently.",

    basicExample: `console.log("1: Start Script");

setTimeout(() => console.log("2: setTimeout Callback (Timer Phase)"), 0);

Promise.resolve().then(() => console.log("3: Promise Microtask"));

process.nextTick(() => console.log("4: process.nextTick (Microtask Queue)"));

setImmediate(() => console.log("5: setImmediate Callback (Check Phase)"));

console.log("6: End Script");

/* Output Order:
1: Start Script
6: End Script
4: process.nextTick (Microtask Queue)
3: Promise Microtask
2: setTimeout Callback (Timer Phase)
5: setImmediate Callback (Check Phase)
*/`,

    howItWorks: [
      "1. Script execution populates Call Stack synchronously.",
      "2. Async tasks are registered with OS kernel or libuv Thread Pool.",
      "3. Microtask Queue (process.nextTick, Promise.then) is completely drained immediately after Call Stack empties.",
      "4. Event Loop enters Phase 1: Timers (executes expired setTimeout/setInterval callbacks).",
      "5. Phase 2: Pending Callbacks (I/O callbacks deferred from previous loops).",
      "6. Phase 3: Idle / Prepare (internal Node.js maintenance).",
      "7. Phase 4: Poll (retrieves new I/O events; blocks here if no timers scheduled).",
      "8. Phase 5: Check (executes setImmediate callbacks).",
      "9. Phase 6: Close Callbacks (executes socket.on('close') handlers).",
      "10. Microtask queues are checked and drained between EVERY phase transition!"
    ],

    visualDiagram: `<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" class="w-full rounded-lg bg-slate-900 border border-slate-800 p-2">
      <!-- Circle of Phases -->
      <circle cx="350" cy="130" r="95" fill="none" stroke="#6366f1" stroke-width="4" stroke-dasharray="8 6"/>
      
      <!-- Phase Nodes -->
      <rect x="290" y="15" width="120" height="36" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
      <text x="350" y="38" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">1. Timers</text>
      
      <rect x="470" y="65" width="140" height="36" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="540" y="88" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">2. Pending Callbacks</text>
      
      <rect x="470" y="155" width="140" height="36" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="540" y="178" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">3. Poll (I/O Events)</text>
      
      <rect x="290" y="205" width="120" height="36" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
      <text x="350" y="228" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">4. Check (setImmediate)</text>
      
      <rect x="90" y="110" width="140" height="42" rx="6" fill="#0f172a" stroke="#ec4899" stroke-width="2"/>
      <text x="160" y="130" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">Microtask Queue</text>
      <text x="160" y="144" fill="#cbd5e1" font-size="9" text-anchor="middle">nextTick &amp; Promises</text>
    </svg>`,

    realWorldExample: `// Building High-Throughput Non-blocking HTTP API in Node.js
import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    if (req.url === '/async-data') {
        // Non-blocking file read offloaded to libuv thread pool
        const data = await fs.readFile('./large_log.txt', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ logLength: data.length }));
    } else {
        res.writeHead(200);
        res.end("Server Active!");
    }
});

server.listen(3000, () => console.log("Node API listening on 3000"));`,

    commonUseCases: [
      "Building real-time I/O applications (WebSocket servers, Chat apps).",
      "Handling thousands of concurrent microservice HTTP REST/GraphQL API requests.",
      "Streaming large video files or DB data without loading entire files into RAM."
    ],

    commonMistakes: [
      "Performing heavy CPU-bound computation (e.g. JSON parsing 500MB payloads or sync crypto) on the main thread, freezing all incoming traffic.",
      "Recursive `process.nextTick()` calls starving the Event Loop, preventing Phase 1 Timers and I/O from running.",
      "Mixing `fs.readFileSync` inside request handlers."
    ],

    bestPractices: [
      "Offload CPU-heavy work (image processing, encryption) to Worker Threads or external background queue workers (BullMQ/Redis).",
      "Prefer Streams (`fs.createReadStream`) over buffers when reading or uploading files.",
      "Always set timeout limits on database connection pools and HTTP fetch calls."
    ],

    whenToUse: ["I/O intensive applications", "JSON REST APIs", "Real-time streaming", "Single Page App Backends"],

    whenNotToUse: ["Heavy CPU computation applications (Video encoding, Machine Learning, Heavy 3D Math) without worker thread isolation."],

    relatedConcepts: ["libuv", "Call Stack", "Microtasks vs Macrotasks", "Thread Pool UV_THREADPOOL_SIZE", "Worker Threads"],

    comparison: {
      title: "process.nextTick vs setImmediate vs setTimeout",
      headers: ["API", "Phase Trigger", "Priority", "Typical Usage"],
      rows: [
        ["process.nextTick", "Before Event Loop phase transition", "Highest (Pre-empts timers)", "Error handling, cleanup before I/O"],
        ["setImmediate", "Check Phase (immediately after Poll)", "Medium", "Executing code after current I/O poll"],
        ["setTimeout(fn, 0)", "Timers Phase", "Lowest among the three", "Scheduling callbacks after minimum threshold"]
      ]
    },

    interviewQuestions: [
      {
        level: "Intermediate",
        question: "What is the difference between process.nextTick() and setImmediate()?",
        answer: "process.nextTick() executes immediately after the current operation finishes before the Event Loop advances to the next phase. setImmediate() runs in the Check phase of the Event Loop."
      },
      {
        level: "Senior",
        question: "How does Node.js handle async file operations if JavaScript is single-threaded?",
        answer: "Node offloads file and crypto operations to libuv's C++ Thread Pool (default 4 threads), freeing the main thread to handle incoming requests."
      }
    ],

    practiceProblem: {
      description: "Write an async handler `orderLog()` that executes sync log 'A', enqueues microtask 'B' via Promise, enqueues 'C' via process.nextTick, and logs sync 'D'. What is the exact execution sequence?",
      starterCode: `function orderLog() {
  console.log('A');
  Promise.resolve().then(() => console.log('B'));
  process.nextTick(() => console.log('C'));
  console.log('D');
}
orderLog();`,
      testAssertion: "true",
      solution: "Log sequence will strictly be: A -> D -> C -> B"
    },

    quickRevision: "★ Node.js is single-threaded for JS execution, but multi-threaded under the hood via libuv.\n★ Event Loop Phases: Timers -> Pending Callbacks -> Poll -> Check -> Close Callbacks.\n★ Microtask Queue (nextTick + Promises) drains between every single phase.\n★ NEVER block the main thread with heavy CPU math."
  },

  // ==========================================
  // LARAVEL: SERVICE CONTAINER
  // ==========================================
  "laravel-service-container": {
    id: "laravel-service-container",
    techId: "laravel",
    category: "Architecture",
    title: "Laravel Service Container & Dependency Injection",
    difficulty: "Advanced",
    experienceBand: "4–6 years",
    readingTime: "12 min",
    prerequisites: ["PHP OOP", "Dependency Injection", "Service Providers"],

    definition: "The Laravel Service Container is a powerful dependency injection container tool for managing class dependencies and performing dependency injection. It acts as the central heart of the Laravel framework architecture.",

    simpleExplanation: "Think of the Service Container as a smart factory clerk. When a controller needs a `PaymentService` interface, it doesn't build it manually with `new StripeGateway(new Config(...))`. It asks the Container, which inspects the type-hint, resolves all required dependencies recursively, and delivers the ready-to-use object.",

    whyDoesItExist: "In large enterprise apps, instantiating deeply nested classes creates tight coupling and messy boilerplate. The Service Container decouples interfaces from concrete implementations, making applications flexible, maintainable, and easily unit-testable via mock objects.",

    basicExample: `// 1. Interface definition
interface PaymentGateway {
    public function charge(int $amount): bool;
}

// 2. Concrete implementation
class StripePaymentGateway implements PaymentGateway {
    public function charge(int $amount): bool {
        // Charge logic...
        return true;
    }
}

// 3. Register binding in AppServiceProvider.php
$this->app->bind(PaymentGateway::class, StripePaymentGateway::class);

// 4. Automatic Dependency Injection in Controller
class OrderController extends Controller {
    public function store(PaymentGateway $payment) {
        $payment->charge(100);
        return response()->json(['status' => 'Order Placed']);
    }
}`,

    howItWorks: [
      "1. Controller method type-hints `PaymentGateway`.",
      "2. Laravel Route Invoker uses PHP Reflection API (`ReflectionClass`) to analyze parameters.",
      "3. Container checks its bindings map for `PaymentGateway`.",
      "4. Container locates `StripePaymentGateway` mapping.",
      "5. Container inspects `StripePaymentGateway` constructor, recursively resolving nested dependencies.",
      "6. Instantiated object graph is injected directly into the controller action!"
    ],

    visualDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="w-full rounded-lg bg-slate-900 border border-slate-800 p-2">
      <rect x="20" y="30" width="160" height="60" rx="8" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
      <text x="100" y="65" fill="#fb7185" font-weight="bold" text-anchor="middle">Controller Action</text>

      <rect x="260" y="30" width="180" height="150" rx="10" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
      <text x="350" y="60" fill="#818cf8" font-weight="bold" text-anchor="middle">Service Container</text>
      <text x="350" y="90" fill="#94a3b8" font-size="11" text-anchor="middle">1. Reflection Analysis</text>
      <text x="350" y="115" fill="#94a3b8" font-size="11" text-anchor="middle">2. Interface Binding Lookup</text>
      <text x="350" y="140" fill="#34d399" font-size="11" text-anchor="middle">3. Recursive Instantiation</text>

      <rect x="510" y="110" width="170" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="595" y="145" fill="#34d399" font-weight="bold" text-anchor="middle">StripeGateway Object</text>
    </svg>`,

    realWorldExample: `// Contextual Binding Example in Laravel Service Provider
public function register(): void {
    // Inject RazorpayGateway into VideoStoreController
    $this->app->when(VideoStoreController::class)
              ->needs(PaymentGatewayInterface::class)
              ->give(RazorpayGateway::class);

    // Inject StripeGateway into ECommerceController
    $this->app->when(ECommerceController::class)
              ->needs(PaymentGatewayInterface::class)
              ->give(StripeGateway::class);
}`,

    commonUseCases: [
      "Binding Interfaces to Concrete Implementations.",
      "Registering Singletons (shared instance across application lifecycle).",
      "Contextual Bindings (injecting different concrete implementations based on consuming class).",
      "Tagging related bindings for bulk resolving."
    ],

    commonMistakes: [
      "Using the static `App::make()` facade everywhere instead of clean constructor/method Dependency Injection.",
      "Over-binding simple data Transfer Objects (DTOs) that have no dependencies."
    ],

    bestPractices: [
      "Bind interfaces in dedicated `ServiceProviders` rather than controllers.",
      "Use `$this->app->singleton()` when object instantiation is expensive and stateless (e.g. API clients)."
    ],

    whenToUse: ["Whenever writing decouplable service classes", "Interfacing third-party APIs", "Unit testing codebases"],

    whenNotToUse: ["Simple value objects or models like Eloquent entities."],

    relatedConcepts: ["Service Providers", "Dependency Injection", "Reflection API", "Facades", "Inversion of Control (IoC)"],

    comparison: {
      title: "bind() vs singleton() vs instance()",
      headers: ["Method", "Lifecycle", "Re-instantiated per resolve?"],
      rows: [
        ["bind()", "Transient", "Yes, new instance every time requested"],
        ["singleton()", "Application Lifecycle", "No, created once and reused for all subsequent calls"],
        ["instance()", "Pre-existing Object", "No, binds an already instantiated object into container"]
      ]
    },

    interviewQuestions: [
      {
        level: "Senior",
        question: "How does Laravel auto-resolve classes without manual bindings in the Service Container?",
        answer: "Laravel uses PHP's Reflection API. If a class has no interface parameters and all constructor parameters are type-hinted concrete classes, the container automatically instantiates them recursively."
      }
    ],

    practiceProblem: {
      description: "Write the PHP ServiceProvider syntax to register `UserAnalyticsInterface` as a singleton returning `GoogleAnalyticsService`.",
      starterCode: `public function register() {
    // Write your binding code here
}`,
      testAssertion: "true",
      solution: `$this->app->singleton(UserAnalyticsInterface::class, GoogleAnalyticsService::class);`
    },

    quickRevision: "★ Service Container is Laravel's Inversion of Control (IoC) engine.\n★ Uses PHP Reflection API for zero-config resolution of concrete classes.\n★ `bind()` creates new instances; `singleton()` caches one shared instance.\n★ Enables effortless mock injection during PHPUnit testing."
  },

  // ==========================================
  // REACT: HOOKS & FIBER
  // ==========================================
  "react-hooks": {
    id: "react-hooks",
    techId: "react",
    category: "React Core",
    title: "React Hooks Deep Dive & Fiber Engine",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "12 min",
    prerequisites: ["React Basics", "JSX", "Component Lifecycle"],

    definition: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components without writing class components.",

    simpleExplanation: "Before React 16.8, if you wanted a component to hold state, you had to convert it into a class component with `this.state` and `this.setState`. Hooks allow simple function components to hold state, handle side-effects, and memoize values cleanly.",

    whyDoesItExist: "Classes in JS had issues: hard to reuse stateful logic between components without wrapper hell (HOCs/Render Props), confusing `this` binding, and complex lifecycle methods where related code was split across `componentDidMount` and `componentWillUnmount`.",

    basicExample: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(data => { if (isMounted) setUser(data); });

        return () => { isMounted = false; }; // Cleanup closure
    }, [userId]);

    return user ? <div>{user.name}</div> : <p>Loading...</p>;
}`,

    howItWorks: [
      "1. React maintains an internal linked list of Hook Nodes for each component Fiber Node.",
      "2. On every render, React traverses hooks in the exact order declared.",
      "3. `useState` reads current value from current Fiber node slot.",
      "4. `useEffect` registers effect function to execute in Fiber's Commit phase after DOM update."
    ],

    visualDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="w-full rounded-lg bg-slate-900 border border-slate-800 p-2">
      <rect x="30" y="60" width="130" height="70" rx="8" fill="#1e293b" stroke="#61dafb" stroke-width="2"/>
      <text x="95" y="95" fill="#61dafb" font-weight="bold" text-anchor="middle">Fiber Node</text>
      <text x="95" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">memoizedState</text>

      <path d="M 160 95 L 220 95" stroke="#61dafb" stroke-width="2" marker-end="url(#arrow)"/>

      <rect x="220" y="60" width="130" height="70" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="285" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Hook 1 (useState)</text>
      <text x="285" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">next -> Hook 2</text>

      <path d="M 350 95 L 410 95" stroke="#10b981" stroke-width="2"/>

      <rect x="410" y="60" width="130" height="70" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
      <text x="475" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Hook 2 (useEffect)</text>
    </svg>`,

    realWorldExample: `// Custom Hook for Window Resizing with Cleanup
function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}`,

    commonUseCases: ["Managing local state", "Data fetching", "Subscribing to external stores (`useSyncExternalStore`)", "DOM manipulation (`useRef`)"],

    commonMistakes: [
      "Calling hooks conditionally or inside loops (violates Rules of Hooks).",
      "Missing dependencies in `useEffect` dependency array causing Stale Closures."
    ],

    bestPractices: [
      "Always use ESLint plugin `eslint-plugin-react-hooks`.",
      "Extract reusable stateful logic into custom hooks starting with `use`."
    ],

    whenToUse: ["In all modern React functional components."],

    whenNotToUse: ["Inside non-React plain JavaScript helper functions."],

    relatedConcepts: ["Virtual DOM", "Fiber Architecture", "Reconciliation", "Concurrent React", "useTransition"],

    comparison: {
      title: "useMemo vs useCallback",
      headers: ["Hook", "Returns", "Primary Purpose"],
      rows: [
        ["useMemo", "Memoized result of calculation", "Avoiding expensive recalculations on re-render"],
        ["useCallback", "Memoized function instance", "Preventing child component re-renders by reference stability"]
      ]
    },

    interviewQuestions: [
      {
        level: "Senior",
        question: "Why can't hooks be called conditionally inside an if block?",
        answer: "React relies on the exact call order of hooks on every render to map state slots in the internal Fiber linked list. Changing hook call order throws off slot alignment."
      }
    ],

    practiceProblem: {
      description: "Fix the memory leak in this effect component.",
      starterCode: `useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
}, []);`,
      testAssertion: "true",
      solution: `useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  return () => clearInterval(timer);
}, []);`
    },

    quickRevision: "★ Hooks link component state to Fiber linked lists.\n★ Never call hooks inside loops or condition blocks.\n★ Always provide complete dependency arrays in useEffect to avoid stale closures."
  },

  // ==========================================
  // SYSTEM DESIGN: RATE LIMITING
  // ==========================================
  "system-design-rate-limiting": {
    id: "system-design-rate-limiting",
    techId: "system-design",
    category: "Distributed Architecture",
    title: "Rate Limiting Architecture & Token Bucket Algorithm",
    difficulty: "Architect",
    experienceBand: "6–10+ years",
    readingTime: "18 min",
    prerequisites: ["HTTP REST APIs", "Redis", "Distributed Systems"],

    definition: "Rate Limiting is a system defense strategy used to control the rate of traffic sent by a client or service, blocking request surges to protect infrastructure from DDoS, brute force, and resource exhaustion.",

    simpleExplanation: "Think of rate limiting like a security guard at an amusement park ride entrance allowing only 10 people per minute. If 50 people try to rush in, the guard turns away 40 with a HTTP 429 'Too Many Requests' response.",

    whyDoesItExist: "Without rate limiting, malicious users or malfunctioning bots can flood APIs with millions of requests, causing database outages, high cloud bills, and denial of service for legitimate users.",

    basicExample: `// Express.js + Redis Rate Limiter Middleware
import redis from './redisClient.js';

async function rateLimiter(req, res, next) {
    const ip = req.ip;
    const key = \`rate:\${ip}\`;
    
    const requests = await redis.incr(key);
    if (requests === 1) {
        await redis.expire(key, 60); // 1 minute window
    }

    if (requests > 100) {
        return res.status(429).json({ error: "Too Many Requests. Retry in 60s." });
    }

    next();
}`,

    howItWorks: [
      "1. Client sends HTTP request with API Key or IP.",
      "2. API Gateway/Middleware extracts identifying token.",
      "3. Token Bucket Algorithm checks Redis store: refill tokens based on elapsed time.",
      "4. If tokens >= 1, decrement token count and pass request to backend.",
      "5. If tokens == 0, reject immediately with HTTP 429 Too Many Requests and `Retry-After` header."
    ],

    visualDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="w-full rounded-lg bg-slate-900 border border-slate-800 p-2">
      <rect x="20" y="80" width="120" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="80" y="110" fill="#38bdf8" font-weight="bold" text-anchor="middle">Client HTTP</text>

      <path d="M 140 105 L 230 105" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>

      <rect x="230" y="40" width="220" height="130" rx="10" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
      <text x="340" y="70" fill="#c084fc" font-weight="bold" text-anchor="middle">Token Bucket Limiter</text>
      <text x="340" y="100" fill="#e2e8f0" font-size="11" text-anchor="middle">Capacity: 100 Tokens</text>
      <text x="340" y="125" fill="#34d399" font-size="11" text-anchor="middle">Refill Rate: 10 tokens/sec</text>

      <!-- Allowed -->
      <path d="M 450 85 L 560 55" stroke="#10b981" stroke-width="2"/>
      <rect x="560" y="30" width="120" height="45" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
      <text x="620" y="58" fill="#34d399" font-weight="bold" text-anchor="middle">200 OK</text>

      <!-- Rejected -->
      <path d="M 450 125 L 560 155" stroke="#f43f5e" stroke-width="2"/>
      <rect x="560" y="140" width="120" height="45" rx="6" fill="#4c0519" stroke="#f43f5e" stroke-width="2"/>
      <text x="620" y="168" fill="#fb7185" font-weight="bold" text-anchor="middle">429 Rate-Limited</text>
    </svg>`,

    realWorldExample: `// Distributed Rate Limiting via Lua Script in Redis (Atomic Execution)
const luaTokenBucket = \`
  local key = KEYS[1]
  local limit = tonumber(ARGV[1])
  local window = tonumber(ARGV[2])
  local current = redis.call('INCR', key)
  if current == 1 then
    redis.call('EXPIRE', key, window)
  end
  if current > limit then
    return 0
  else
    return 1
  end
\`;`,

    commonUseCases: ["Preventing brute-force login attempts", "API Monetization Tier enforcement (Free tier 1k calls/day vs Pro 100k calls/day)", "Preventing scrapers and DDoS attacks"],

    commonMistakes: [
      "Storing rate limit state in local app memory instead of Redis (fails when scaling horizontally across multiple web nodes).",
      "Not handling race conditions in multi-threaded nodes."
    ],

    bestPractices: [
      "Use Redis Lua Scripts for atomic counter evaluation across distributed nodes.",
      "Include standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`."
    ],

    whenToUse: ["All public-facing API gateways", "Authentication endpoints"],

    whenNotToUse: ["Internal inter-microservice high-speed RPC calls behind protected VPCs without external exposure."],

    relatedConcepts: ["Leaky Bucket Algorithm", "Sliding Window Log", "Redis Atomic Commands", "API Gateways (Kong, AWS API Gateway)"],

    comparison: {
      title: "Token Bucket vs Leaky Bucket vs Sliding Window",
      headers: ["Algorithm", "Handles Burst Traffic?", "Memory Usage", "Best Used For"],
      rows: [
        ["Token Bucket", "Yes, up to max bucket capacity", "Very Low (Counter + Timestamp)", "General REST APIs"],
        ["Leaky Bucket", "No, smooths out traffic at constant rate", "Low (FIFO Queue)", "Background Queue Rate Shaping"],
        ["Sliding Window Counter", "Yes, smoothly", "Medium (Window buckets)", "Strict window precision requirements"]
      ]
    },

    interviewQuestions: [
      {
        level: "Architect",
        question: "How do you rate limit APIs across a distributed cluster of 100 microservices without creating a single point of failure at Redis?",
        answer: "Use Local Memory Bucket with periodic async sync to Redis, or partition Redis via Consistent Hashing sharding cluster."
      }
    ],

    practiceProblem: {
      description: "What HTTP Status code and headers must be returned when a client exceeds rate limits?",
      starterCode: `// Return HTTP status and response headers`,
      testAssertion: "true",
      solution: "Status: 429 Too Many Requests. Headers: X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After"
    },

    quickRevision: "★ Rate limiting protects APIs from abuse & outage.\n★ Algorithms: Token Bucket (burst allowed), Leaky Bucket (smooth rate), Sliding Window.\n★ Distributed Nodes require atomic Redis operations (Lua Scripts)."
  }
};
