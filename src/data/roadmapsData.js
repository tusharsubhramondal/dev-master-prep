export const roadmapsData = {
  laravel: {
    techId: "laravel",
    title: "Laravel Developer Learning Roadmap",
    steps: [
      { step: 1, title: "PHP Prerequisites", desc: "OOP, Namespaces, Interfaces, Traits, Composer", topicId: "php-basics" },
      { step: 2, title: "Laravel Basics", desc: "Installation, Folder Structure, Environment Config", topicId: "laravel-basics" },
      { step: 3, title: "Routing & Controllers", desc: "Web & API Routes, Named Routes, Resource Controllers", topicId: "laravel-routing" },
      { step: 4, title: "Blade Templating", desc: "Components, Directives, Layout Inheritance", topicId: "laravel-blade" },
      { step: 5, title: "Database & Migrations", desc: "Schema Builder, Migrations, Seeders, Factories", topicId: "laravel-database" },
      { step: 6, title: "Eloquent ORM", desc: "Relationships (1:1, 1:N, N:N, Polymorphic), Scopes", topicId: "laravel-eloquent" },
      { step: 7, title: "Authentication & Authorization", desc: "Breeze/Sanctum, Policies, Gates, JWT", topicId: "laravel-auth" },
      { step: 8, title: "APIs & Resource Transformers", desc: "REST API, API Resources, Rate Limiting", topicId: "laravel-apis" },
      { step: 9, title: "Service Container & Providers", desc: "Dependency Injection, Binding, Singletons", topicId: "laravel-service-container" },
      { step: 10, title: "Events & Listeners", desc: "Event Dispatcher, Observer Pattern, Sync vs Async", topicId: "laravel-events" },
      { step: 11, title: "Jobs & Queues", desc: "Database/Redis Drivers, Horizon, Failed Jobs", topicId: "laravel-queues" },
      { step: 12, title: "Redis Caching & Session", desc: "Cache Drivers, Tags, Redis Pub/Sub", topicId: "laravel-redis" },
      { step: 13, title: "Testing (Pest / PHPUnit)", desc: "Feature Tests, Unit Tests, Database Resetting", topicId: "laravel-testing" },
      { step: 14, title: "Security Best Practices", desc: "SQL Injection, CSRF, XSS, Mass Assignment Protection", topicId: "laravel-security" },
      { step: 15, title: "Performance Tuning", desc: "Eager Loading (N+1 Solution), Route Caching, Octane", topicId: "laravel-performance" },
      { step: 16, title: "System Design & Architecture", desc: "Repository Pattern, Domain Driven Design, Multi-Tenancy", topicId: "laravel-architecture" }
    ]
  },

  nodejs: {
    techId: "nodejs",
    title: "Node.js Backend Engineer Roadmap",
    steps: [
      { step: 1, title: "JavaScript ES6+ Core", desc: "Prototypes, Closures, Promises, Async/Await", topicId: "javascript-closure" },
      { step: 2, title: "Node Fundamentals", desc: "Global Objects, Process, Buffer, Path, FS", topicId: "nodejs-fundamentals" },
      { step: 3, title: "Modules & NPM", desc: "CommonJS vs ESM, package.json, NPM scripts", topicId: "nodejs-modules" },
      { step: 4, title: "Async Programming", desc: "Callbacks, Promises, Async/Await Error Handling", topicId: "nodejs-async" },
      { step: 5, title: "Event Loop & libuv", desc: "Call Stack, Phases, nextTick, Thread Pool", topicId: "nodejs-event-loop" },
      { step: 6, title: "HTTP & Express.js", desc: "HTTP Server, Middleware, Routing, Request/Response", topicId: "nodejs-express" },
      { step: 7, title: "REST API & Validation", desc: "JSON APIs, Zod/Joi validation, Status Codes", topicId: "nodejs-rest" },
      { step: 8, title: "Authentication & Security", desc: "JWT, OAuth2, Bcrypt, Helmet, Rate Limiting", topicId: "nodejs-auth" },
      { step: 9, title: "Databases (SQL & NoSQL)", desc: "PostgreSQL, MongoDB, Prisma, Mongoose ORM", topicId: "nodejs-databases" },
      { step: 10, title: "Streams & Buffer", desc: "Readable, Writable, Transform Streams, Backpressure", topicId: "nodejs-streams" },
      { step: 11, title: "Worker Threads & Clustering", desc: "CPU bound tasks, Cluster Module, Thread Pool", topicId: "nodejs-workers" },
      { step: 12, title: "Queues & Redis", desc: "BullMQ, Redis Caching, Pub/Sub Messaging", topicId: "nodejs-redis" },
      { step: 13, title: "Performance & Scaling", desc: "Garbage Collection, Memory Leaks, PM2, Clustering", topicId: "nodejs-scaling" },
      { step: 14, title: "System Architecture", desc: "Microservices, Distributed Tracing, Docker Containerization", topicId: "nodejs-architecture" }
    ]
  },

  javascript: {
    techId: "javascript",
    title: "JavaScript Mastery Roadmap",
    steps: [
      { step: 1, title: "Variables & Data Types", desc: "var vs let vs const, Primitive vs Reference Types", topicId: "js-variables" },
      { step: 2, title: "Functions & Scope", desc: "Function Declarations, Arrow Functions, Block Scope", topicId: "js-functions" },
      { step: 3, title: "Hoisting & Temporal Dead Zone", desc: "Execution Context Creation Phase", topicId: "js-hoisting" },
      { step: 4, title: "Closures & Lexical Scope", desc: "Scope Chains, Data Privacy, Module Pattern", topicId: "javascript-closure" },
      { step: 5, title: "this & Execution Context", desc: "Implicit binding, explicit bind/call/apply", topicId: "js-this" },
      { step: 6, title: "Prototypes & Inheritance", desc: "Prototype Chain, __proto__, ES6 Classes", topicId: "js-prototypes" },
      { step: 7, title: "Objects & Array Methods", desc: "map, filter, reduce, Object.freeze, Destructuring", topicId: "js-arrays" },
      { step: 8, title: "Promises & Async/Await", desc: "Microtasks, Promise chaining, Promise.all", topicId: "js-promises" },
      { step: 9, title: "Browser Event Loop", desc: "Call stack, Web APIs, Task Queue, Microtask Queue", topicId: "js-event-loop" },
      { step: 10, title: "Advanced JavaScript", desc: "Generators, Proxy, Reflect, Garbage Collection", topicId: "js-advanced" }
    ]
  }
};
