export const roadmapsData = {
  javascript: {
    techId: "javascript",
    title: "Complete JavaScript Mastery Roadmap (33 Steps)",
    steps: [
      { step: 1, title: "JavaScript Basics", desc: "Introduction, V8 engine execution context, scripting vs compiled runtime.", topicId: "js-basics", level: "Beginner" },
      { step: 2, title: "Variables & Data Types", desc: "var vs let vs const, Primitives (string, number, boolean, null, undefined, symbol, bigint) vs Objects.", topicId: "js-variables", level: "Beginner" },
      { step: 3, title: "Operators & Control Flow", desc: "Logical, arithmetic, nullish coalescing (??), optional chaining (?.), if/else, switch, and loops.", topicId: "js-operators", level: "Beginner" },
      { step: 4, title: "Functions", desc: "Declarations, expressions, arrow functions, parameter defaults, rest parameters, and IIFEs.", topicId: "js-functions", level: "Beginner" },
      { step: 5, title: "Scope", desc: "Global, function, block, and lexical scoping rules.", topicId: "js-scope", level: "Beginner" },
      { step: 6, title: "Hoisting & TDZ", desc: "Variable and function hoisting mechanics, Temporal Dead Zone (TDZ).", topicId: "js-hoisting", level: "Beginner" },
      { step: 7, title: "Objects & Arrays", desc: "Object literal syntax, property descriptors, array mutation vs non-mutation methods (map, filter, reduce).", topicId: "js-objects-arrays", level: "Beginner" },
      { step: 8, title: "Destructuring & Spread", desc: "Object & Array destructuring, default values, spread syntax, and rest parameters.", topicId: "js-destructuring", level: "Intermediate" },
      { step: 9, title: "Closures", desc: "Lexical scope preservation, private variables, function factories, and memoization.", topicId: "javascript-closure", level: "Intermediate" },
      { step: 10, title: "this Keyword", desc: "Implicit binding, explicit binding, default binding, and lexical arrow function this.", topicId: "js-this", level: "Intermediate" },
      { step: 11, title: "call / apply / bind", desc: "Explicit function context invocation, method borrowing, partial application, and currying.", topicId: "js-call-apply-bind", level: "Intermediate" },
      { step: 12, title: "Execution Context", desc: "Creation Phase vs Execution Phase, Variable Environment, Lexical Environment records.", topicId: "js-execution-context", level: "Intermediate" },
      { step: 13, title: "Call Stack", desc: "Stack frames, execution order, call stack LIFO mechanics, and Call Stack Overflow.", topicId: "js-call-stack", level: "Intermediate" },
      { step: 14, title: "Asynchronous JavaScript", desc: "Single-threaded non-blocking I/O model, asynchronous callback patterns.", topicId: "js-async-overview", level: "Intermediate" },
      { step: 15, title: "Callbacks", desc: "Higher-order callback functions, callback hell, inversion of control issues.", topicId: "js-callbacks", level: "Intermediate" },
      { step: 16, title: "Promises", desc: "Promise states (Pending, Fulfilled, Rejected), chaining, Promise.all, allSettled, race, any.", topicId: "js-promises", level: "Intermediate" },
      { step: 17, title: "Async / Await", desc: "Syntactic sugar over Promises, try/catch async error handling, concurrent execution.", topicId: "js-async-await", level: "Intermediate" },
      { step: 18, title: "Event Loop", desc: "Call Stack, Web APIs (timers, DOM events, fetch), Task Queue vs Microtask Queue execution loop.", topicId: "js-event-loop", level: "Senior" },
      { step: 19, title: "Microtask / Macrotask", desc: "Microtask queue priority (Promises, queueMicrotask) vs Macrotask queue (setTimeout, setImmediate).", topicId: "js-microtask-macrotask", level: "Senior" },
      { step: 20, title: "Prototype", desc: "Prototype chain (__proto__), Object.prototype, prototypal inheritance vs class inheritance.", topicId: "js-prototypes", level: "Senior" },
      { step: 21, title: "Classes", desc: "ES6 class syntax, constructors, static methods, inheritance (extends, super), private fields (#field).", topicId: "js-classes", level: "Senior" },
      { step: 22, title: "Map / Set / WeakMap", desc: "Keyed collections, Set uniqueness, memory-efficient garbage collection via WeakMap & WeakSet.", topicId: "js-map-set-weakmap", level: "Senior" },
      { step: 23, title: "Iterators / Generators", desc: "Symbol.iterator protocol, custom iterables, generator functions (function*), yield operator.", topicId: "js-iterators-generators", level: "Senior" },
      { step: 24, title: "Modules", desc: "CommonJS (require/module.exports) vs ES Modules (import/export), dynamic imports, tree-shaking.", topicId: "js-modules", level: "Senior" },
      { step: 25, title: "Error Handling", desc: "Error object hierarchy, custom Error classes, re-throwing errors, unhandled promise rejections.", topicId: "js-error-handling", level: "Senior" },
      { step: 26, title: "Memory Management", desc: "Mark-and-Sweep garbage collection algorithm, identifying and resolving Memory Leaks.", topicId: "js-memory-management", level: "Senior" },
      { step: 27, title: "DOM & Events", desc: "DOM tree navigation, Event bubbling, capturing, event delegation pattern, performance optimizations.", topicId: "js-dom-events", level: "Senior" },
      { step: 28, title: "Fetch / HTTP / CORS", desc: "Fetch API, HTTP methods, headers, status codes, Same-Origin policy, CORS preflight requests.", topicId: "js-fetch-cors", level: "Senior" },
      { step: 29, title: "Security", desc: "Preventing XSS (Cross-Site Scripting), CSRF, Content Security Policy (CSP), secure token storage.", topicId: "js-security", level: "Senior" },
      { step: 30, title: "Performance", desc: "Debouncing, throttling, memoization techniques, layout reflow vs repaint optimization.", topicId: "js-performance", level: "Senior" },
      { step: 31, title: "Design Patterns", desc: "Singleton, Factory, Observer, Pub/Sub, Module, and Proxy design patterns in JavaScript.", topicId: "js-design-patterns", level: "Senior" },
      { step: 32, title: "JavaScript Internals", desc: "V8 engine architecture: Ignition Interpreter, TurboFan JIT Compiler, Inline Caches, Hidden Classes.", topicId: "js-v8-internals", level: "Senior" },
      { step: 33, title: "Senior-Level System & Coding Problems", desc: "Custom polyfills (Promise.all, Array.prototype.flat, deepClone), LRU Cache, Event Emitter architecture.", topicId: "js-senior-coding", level: "Senior" }
    ]
  },

  laravel: {
    techId: "laravel",
    title: "Laravel Developer Learning Roadmap",
    steps: [
      { step: 1, title: "PHP Prerequisites", desc: "OOP, Namespaces, Interfaces, Traits, Composer", topicId: "php-basics", level: "Beginner" },
      { step: 2, title: "Laravel Basics", desc: "Installation, Folder Structure, Environment Config", topicId: "laravel-basics", level: "Beginner" },
      { step: 3, title: "Routing & Controllers", desc: "Web & API Routes, Named Routes, Resource Controllers", topicId: "laravel-routing", level: "Beginner" },
      { step: 4, title: "Blade Templating", desc: "Components, Directives, Layout Inheritance", topicId: "laravel-blade", level: "Beginner" },
      { step: 5, title: "Database & Migrations", desc: "Schema Builder, Migrations, Seeders, Factories", topicId: "laravel-database", level: "Intermediate" },
      { step: 6, title: "Eloquent ORM", desc: "Relationships (1:1, 1:N, N:N, Polymorphic), Scopes", topicId: "laravel-eloquent", level: "Intermediate" },
      { step: 7, title: "Authentication & Authorization", desc: "Breeze/Sanctum, Policies, Gates, JWT", topicId: "laravel-auth", level: "Intermediate" },
      { step: 8, title: "APIs & Resource Transformers", desc: "REST API, API Resources, Rate Limiting", topicId: "laravel-apis", level: "Intermediate" },
      { step: 9, title: "Service Container & Providers", desc: "Dependency Injection, Binding, Singletons", topicId: "laravel-service-container", level: "Senior" },
      { step: 10, title: "Events & Listeners", desc: "Event Dispatcher, Observer Pattern, Sync vs Async", topicId: "laravel-events", level: "Senior" },
      { step: 11, title: "Jobs & Queues", desc: "Database/Redis Drivers, Horizon, Failed Jobs", topicId: "laravel-queues", level: "Senior" },
      { step: 12, title: "System Design & Architecture", desc: "Repository Pattern, Domain Driven Design, Multi-Tenancy", topicId: "laravel-architecture", level: "Senior" }
    ]
  },

  nodejs: {
    techId: "nodejs",
    title: "Node.js Backend Engineer Roadmap",
    steps: [
      { step: 1, title: "JavaScript ES6+ Core", desc: "Prototypes, Closures, Promises, Async/Await", topicId: "javascript-closure", level: "Beginner" },
      { step: 2, title: "Node Fundamentals", desc: "Global Objects, Process, Buffer, Path, FS", topicId: "nodejs-fundamentals", level: "Beginner" },
      { step: 3, title: "Modules & NPM", desc: "CommonJS vs ESM, package.json, NPM scripts", topicId: "nodejs-modules", level: "Beginner" },
      { step: 4, title: "Async Programming", desc: "Callbacks, Promises, Async/Await Error Handling", topicId: "nodejs-async", level: "Intermediate" },
      { step: 5, title: "Event Loop & libuv", desc: "Call Stack, Phases, nextTick, Thread Pool", topicId: "nodejs-event-loop", level: "Intermediate" },
      { step: 6, title: "HTTP & Express.js", desc: "HTTP Server, Middleware, Routing, Request/Response", topicId: "nodejs-express", level: "Intermediate" },
      { step: 7, title: "Worker Threads & Clustering", desc: "CPU bound tasks, Cluster Module, Thread Pool", topicId: "nodejs-workers", level: "Senior" },
      { step: 8, title: "Queues & Redis", desc: "BullMQ, Redis Caching, Pub/Sub Messaging", topicId: "nodejs-redis", level: "Senior" },
      { step: 9, title: "Performance & Scaling", desc: "Garbage Collection, Memory Leaks, PM2, Clustering", topicId: "nodejs-scaling", level: "Senior" }
    ]
  }
};
