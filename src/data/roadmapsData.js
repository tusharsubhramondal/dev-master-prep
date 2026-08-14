export const roadmapsData = {
  javascript: {
    techId: "javascript",
    title: "Complete JavaScript Mastery Roadmap",
    steps: [
      { step: 1, title: "JavaScript Basics", desc: "Introduction, V8 engine execution context, scripting vs compiled runtime.", topicId: "js-basics", level: "Beginner" },
      { step: 2, title: "Variables & Data Types", desc: "var vs let vs const, Primitives vs Objects.", topicId: "js-variables", level: "Beginner" },
      { step: 3, title: "Operators & Control Flow", desc: "Logical, arithmetic, nullish coalescing (??), optional chaining (?.), if/else, switch, loops.", topicId: "js-operators", level: "Beginner" },
      { step: 4, title: "Functions", desc: "Declarations, expressions, arrow functions, parameter defaults, rest parameters, IIFEs.", topicId: "js-functions", level: "Beginner" },
      { step: 5, title: "Scope", desc: "Global, function, block, and lexical scoping rules.", topicId: "js-scope", level: "Beginner" },
      { step: 6, title: "Hoisting & TDZ", desc: "Variable and function hoisting mechanics, Temporal Dead Zone (TDZ).", topicId: "js-hoisting", level: "Beginner" },
      { step: 7, title: "Objects & Arrays", desc: "Object literal syntax, property descriptors, array mutation vs non-mutation methods (map, filter, reduce).", topicId: "js-objects-arrays", level: "Beginner" },
      { step: 8, title: "Destructuring & Spread", desc: "Object & Array destructuring, default values, spread syntax, rest parameters.", topicId: "js-destructuring", level: "Intermediate" },
      { step: 9, title: "Closures", desc: "Lexical scope preservation, private variables, function factories, memoization.", topicId: "javascript-closure", level: "Intermediate" },
      { step: 10, title: "this Keyword", desc: "Implicit binding, explicit binding, default binding, lexical arrow function this.", topicId: "js-this", level: "Intermediate" },
      { step: 11, title: "call / apply / bind", desc: "Explicit function context invocation, method borrowing, partial application, currying.", topicId: "js-call-apply-bind", level: "Intermediate" },
      { step: 12, title: "Execution Context", desc: "Creation Phase vs Execution Phase, Variable Environment, Lexical Environment records.", topicId: "js-execution-context", level: "Intermediate" },
      { step: 13, title: "Call Stack", desc: "Stack frames, execution order, call stack LIFO mechanics, Call Stack Overflow.", topicId: "js-call-stack", level: "Intermediate" },
      { step: 14, title: "Asynchronous JavaScript", desc: "Single-threaded non-blocking I/O model, asynchronous callback patterns.", topicId: "js-async-overview", level: "Intermediate" },
      { step: 15, title: "Callbacks", desc: "Higher-order callback functions, callback hell, inversion of control issues.", topicId: "js-callbacks", level: "Intermediate" },
      { step: 16, title: "Promises", desc: "Promise states (Pending, Fulfilled, Rejected), chaining, Promise.all, allSettled, race, any.", topicId: "js-promises", level: "Intermediate" },
      { step: 17, title: "Async / Await", desc: "Syntactic sugar over Promises, try/catch async error handling, concurrent execution.", topicId: "js-async-await", level: "Intermediate" },
      { step: 18, title: "Event Loop", desc: "Call Stack, Web APIs, Task Queue vs Microtask Queue execution loop.", topicId: "js-event-loop", level: "Senior" },
      { step: 19, title: "Microtask / Macrotask", desc: "Microtask queue priority (Promises, queueMicrotask) vs Macrotask queue (setTimeout).", topicId: "js-microtask-macrotask", level: "Senior" },
      { step: 20, title: "Prototype", desc: "Prototype chain (__proto__), Object.prototype, prototypal inheritance vs class inheritance.", topicId: "js-prototypes", level: "Senior" },
      { step: 21, title: "Classes", desc: "ES6 class syntax, constructors, static methods, inheritance (extends, super), private fields (#field).", topicId: "js-classes", level: "Senior" },
      { step: 22, title: "Map / Set / WeakMap", desc: "Keyed collections, Set uniqueness, memory-efficient garbage collection via WeakMap.", topicId: "js-map-set-weakmap", level: "Senior" },
      { step: 23, title: "Iterators / Generators", desc: "Symbol.iterator protocol, custom iterables, generator functions (function*), yield operator.", topicId: "js-iterators-generators", level: "Senior" },
      { step: 24, title: "Modules", desc: "CommonJS (require/module.exports) vs ES Modules (import/export), dynamic imports, tree-shaking.", topicId: "js-modules", level: "Senior" },
      { step: 25, title: "Error Handling", desc: "Error object hierarchy, custom Error classes, re-throwing errors, unhandled promise rejections.", topicId: "js-error-handling", level: "Senior" },
      { step: 26, title: "Memory Management", desc: "Mark-and-Sweep garbage collection algorithm, identifying and resolving Memory Leaks.", topicId: "js-memory-management", level: "Senior" },
      { step: 27, title: "DOM & Events", desc: "DOM tree navigation, Event bubbling, capturing, event delegation pattern.", topicId: "js-dom-events", level: "Senior" },
      { step: 28, title: "Fetch / HTTP / CORS", desc: "Fetch API, HTTP methods, headers, status codes, Same-Origin policy, CORS preflight.", topicId: "js-fetch-cors", level: "Senior" },
      { step: 29, title: "Security", desc: "Preventing XSS, CSRF, Content Security Policy (CSP), secure token storage.", topicId: "js-security", level: "Senior" },
      { step: 30, title: "Performance", desc: "Debouncing, throttling, memoization techniques, layout reflow vs repaint optimization.", topicId: "js-performance", level: "Senior" },
      { step: 31, title: "Design Patterns", desc: "Singleton, Factory, Observer, Pub/Sub, Module, and Proxy design patterns.", topicId: "js-design-patterns", level: "Senior" },
      { step: 32, title: "JavaScript Internals", desc: "V8 engine architecture: Ignition Interpreter, TurboFan JIT Compiler, Inline Caches.", topicId: "js-v8-internals", level: "Senior" },
      { step: 33, title: "Senior-Level System & Coding Problems", desc: "Custom polyfills (Promise.all, Array.prototype.flat), LRU Cache, Event Emitter architecture.", topicId: "js-senior-coding", level: "Senior" }
    ]
  },

  react: {
    techId: "react",
    title: "React Frontend Engineer Roadmap",
    steps: [
      { step: 1, title: "React Fundamentals & JSX", desc: "Virtual DOM, JSX syntax, Rendering elements, React element tree.", topicId: "react-basics", level: "Beginner" },
      { step: 2, title: "Components, Props & State", desc: "Functional components, Props validation, State management with useState hook.", topicId: "react-props-state", level: "Beginner" },
      { step: 3, title: "Side Effects & Lifecycle", desc: "Managing side effects, data fetching, and subscriptions with useEffect hook.", topicId: "react-useeffect", level: "Beginner" },
      { step: 4, title: "Forms & Controlled Components", desc: "Controlled vs uncontrolled inputs, Form validation, React Hook Form library.", topicId: "react-forms", level: "Beginner" },
      { step: 5, title: "Custom Hooks & Logic Reuse", desc: "Building reusable custom hooks, encapsulating stateful component logic.", topicId: "react-custom-hooks", level: "Intermediate" },
      { step: 6, title: "Context API & Global State", desc: "Prop drilling resolution, Context provider pattern, Redux Toolkit & Zustand.", topicId: "react-context-state", level: "Intermediate" },
      { step: 7, title: "Client-Side Routing", desc: "React Router v6 setup, Dynamic routes, Protected routes, Layouts.", topicId: "react-router", level: "Intermediate" },
      { step: 8, title: "Performance Optimization", desc: "React.memo, useMemo, useCallback, Code splitting with React.lazy & Suspense.", topicId: "react-performance", level: "Intermediate" },
      { step: 9, title: "Advanced Hooks & Concurrent React", desc: "useReducer, useRef, useId, useTransition, useDeferredValue for responsive UI.", topicId: "react-advanced-hooks", level: "Senior" },
      { step: 10, title: "React 19 & Server Components", desc: "Server Actions, React Server Components (RSC), Optimistic UI updates with useOptimistic.", topicId: "react-19-rsc", level: "Senior" },
      { step: 11, title: "Testing React Applications", desc: "Unit & Integration testing with React Testing Library and Jest/Vitest.", topicId: "react-testing", level: "Senior" },
      { step: 12, title: "Micro-Frontends & Design Systems", desc: "Building UI Component Libraries, Module Federation, Component Architecture at scale.", topicId: "react-architecture", level: "Senior" }
    ]
  },

  typescript: {
    techId: "typescript",
    title: "TypeScript Engineer Roadmap",
    steps: [
      { step: 1, title: "TypeScript Setup & Primitives", desc: "ts-node, tsc compiler, explicit typing vs inference, basic primitive types.", topicId: "ts-basics", level: "Beginner" },
      { step: 2, title: "Interfaces & Type Aliases", desc: "Defining object shapes, interface vs type alias differences, optional & readonly properties.", topicId: "ts-interfaces", level: "Beginner" },
      { step: 3, title: "Unions & Intersections", desc: "Union types (|), Intersection types (&), Discriminated Unions pattern.", topicId: "ts-unions", level: "Beginner" },
      { step: 4, title: "Function Types & Overloads", desc: "Typing function parameters, return values, function type signatures, function overloading.", topicId: "ts-functions", level: "Beginner" },
      { step: 5, title: "Generics Fundamentals", desc: "Generic functions, generic interfaces, generic type constraints (extends).", topicId: "ts-generics", level: "Intermediate" },
      { step: 6, title: "Built-in Utility Types", desc: "Partial, Required, Readonly, Record, Pick, Omit, Exclude, Extract, ReturnType.", topicId: "ts-utility-types", level: "Intermediate" },
      { step: 7, title: "Type Narrowing & Guards", desc: "typeof, instanceof, in operator, custom Type Guard functions (is keyword).", topicId: "ts-type-guards", level: "Intermediate" },
      { step: 8, title: "Classes & OOP in TypeScript", desc: "Public, private, protected access modifiers, abstract classes, implementing interfaces.", topicId: "ts-classes", level: "Intermediate" },
      { step: 9, title: "Advanced Generics & Conditional Types", desc: "Conditional types (T extends U ? X : Y), infer keyword, recursive type definitions.", topicId: "ts-conditional-types", level: "Senior" },
      { step: 10, title: "Mapped & Template Literal Types", desc: "Mapped type modifiers, Key Remapping, Template literal types for dynamic string types.", topicId: "ts-mapped-types", level: "Senior" },
      { step: 11, title: "Compiler Configuration & Strict Mode", desc: "tsconfig.json optimization, strictNullChecks, noImplicitAny, project references.", topicId: "ts-compiler-config", level: "Senior" },
      { step: 12, title: "Declaration Files & Library Typing", desc: "DefinitelyTyped (@types), writing custom .d.ts files, Ambient Declarations.", topicId: "ts-declarations", level: "Senior" }
    ]
  },

  php: {
    techId: "php",
    title: "PHP Core & Modern Backend Roadmap",
    steps: [
      { step: 1, title: "PHP Syntax & Data Types", desc: "Variables, Strings, Numbers, Booleans, Arrays, Variable scope, Superglobals.", topicId: "php-basics", level: "Beginner" },
      { step: 2, title: "Control Structures & Loops", desc: "if/else, switch, match expression (PHP 8), while, for, foreach loops.", topicId: "php-control-flow", level: "Beginner" },
      { step: 3, title: "Functions & Array Manipulation", desc: "Custom functions, Anonymous functions, Arrow functions, Array functions (array_map, array_filter).", topicId: "php-functions", level: "Beginner" },
      { step: 4, title: "OOP Basics: Classes & Objects", desc: "Classes, Properties, Methods, Constructors ($this), Visibility (public/private/protected).", topicId: "php-oop-basics", level: "Beginner" },
      { step: 5, title: "Inheritance, Interfaces & Traits", desc: "Extending classes, Abstract classes, Interface contracts, Code reuse via Traits.", topicId: "php-interfaces-traits", level: "Intermediate" },
      { step: 6, title: "Exception Handling & Error Control", desc: "Try/catch blocks, Custom Exception classes, Error handlers, Finally block.", topicId: "php-exceptions", level: "Intermediate" },
      { step: 7, title: "Namespaces & Composer", desc: "Avoiding name collisions, Autoloading (PSR-4), Managing packages with Composer.", topicId: "php-composer", level: "Intermediate" },
      { step: 8, title: "Database Connectivity with PDO", desc: "PHP Data Objects (PDO), Prepared statements, Preventing SQL Injection, Transactions.", topicId: "php-pdo", level: "Intermediate" },
      { step: 9, title: "Modern PHP 8.x Features", desc: "Constructor property promotion, Named arguments, Attributes, Enums, Union/Intersection types.", topicId: "php-8-features", level: "Senior" },
      { step: 10, title: "Memory Management & OPcache", desc: "Garbage collection, Memory limits, Tuning OPcache & Just-In-Time (JIT) compiler.", topicId: "php-opcache", level: "Senior" },
      { step: 11, title: "SOLID Principles & Design Patterns", desc: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion in PHP.", topicId: "php-solid-patterns", level: "Senior" }
    ]
  },

  express: {
    techId: "express",
    title: "Express.js REST API Roadmap",
    steps: [
      { step: 1, title: "Express Initialization", desc: "Setting up express app, npm initialization, server entry point, nodemon/tsx setup.", topicId: "express-basics", level: "Beginner" },
      { step: 2, title: "Routing & URL Parameters", desc: "HTTP methods (GET, POST, PUT, DELETE), route params, query parameters.", topicId: "express-routing", level: "Beginner" },
      { step: 3, title: "Request & Response Objects", desc: "req.body, req.params, req.query, res.json(), res.status(), res.send().", topicId: "express-req-res", level: "Beginner" },
      { step: 4, title: "Middleware Architecture", desc: "What is middleware, Next() function, Application-level vs Route-level middleware.", topicId: "express-middleware", level: "Intermediate" },
      { step: 5, title: "Built-in & Third-Party Middlewares", desc: "express.json(), express.urlencoded(), cors, morgan logging, cookie-parser.", topicId: "express-third-party", level: "Intermediate" },
      { step: 6, title: "Global Error Handling", desc: "Centralized error handling middleware, Custom AppError class, Async handler wrappers.", topicId: "express-error-handling", level: "Intermediate" },
      { step: 7, title: "Controller-Service-Repository Pattern", desc: "Structuring Express apps for scale, separating business logic from route handlers.", topicId: "express-architecture", level: "Intermediate" },
      { step: 8, title: "Authentication & Authorization", desc: "JWT verification middleware, Role-Based Access Control (RBAC), Refresh tokens.", topicId: "express-auth", level: "Intermediate" },
      { step: 9, title: "API Security & Sanitization", desc: "Helmet HTTP headers, express-rate-limit, Input validation with Zod/Joi, XSS protection.", topicId: "express-security", level: "Senior" },
      { step: 10, title: "API Testing & Documentation", desc: "Supertest + Jest integration testing, Swagger/OpenAPI documentation generation.", topicId: "express-testing", level: "Senior" },
      { step: 11, title: "Production Deployment & Scaling", desc: "Cluster mode, reverse proxy with Nginx, Dockerizing Express apps, PM2 management.", topicId: "express-deployment", level: "Senior" }
    ]
  },

  vue: {
    techId: "vue",
    title: "Vue.js 3 Frontend Developer Roadmap",
    steps: [
      { step: 1, title: "Vue 3 Fundamentals & Vite Setup", desc: "Vue instance, template syntax, reactivity concepts, Vite project creation.", topicId: "vue-basics", level: "Beginner" },
      { step: 2, title: "Reactivity Core (ref & reactive)", desc: "Deep reactivity, ref vs reactive, unwrapping refs, DOM updates.", topicId: "vue-reactivity", level: "Beginner" },
      { step: 3, title: "Computed Properties & Watchers", desc: "Computed caching, watch vs watchEffect, getter/setter functions.", topicId: "vue-computed-watch", level: "Beginner" },
      { step: 4, title: "Components, Props & Emits", desc: "Single File Components (.vue), Script Setup syntax, DefineProps & DefineEmits.", topicId: "vue-components", level: "Beginner" },
      { step: 5, title: "Vue Router 4", desc: "Dynamic route matching, Nested routes, Navigation guards (beforeEach), Lazy loading routes.", topicId: "vue-router", level: "Intermediate" },
      { step: 6, title: "State Management with Pinia", desc: "Stores, state, getters, actions, Modular store architecture, Pinia plugins.", topicId: "vue-pinia", level: "Intermediate" },
      { step: 7, title: "Composition API & Composables", desc: "Writing custom composables, logic extraction, Provide/Inject dependency injection.", topicId: "vue-composables", level: "Intermediate" },
      { step: 8, title: "Slots, Teleport & KeepAlive", desc: "Default, Named & Scoped slots, Rendering DOM outside hierarchy with Teleport.", topicId: "vue-slots-teleport", level: "Intermediate" },
      { step: 9, title: "Performance Optimization", desc: "v-once, v-memo, Async components, Virtual scrolling, Bundle size reduction.", topicId: "vue-performance", level: "Senior" },
      { step: 10, title: "Custom Directives & Plugins", desc: "Writing custom directives (v-focus, v-lazy), Creating reusable Vue plugins.", topicId: "vue-directives-plugins", level: "Senior" },
      { step: 11, title: "Nuxt 3 & SSR Ecosystem", desc: "Universal SSR rendering, Nuxt 3 directory structure, Auto-imports, SEO optimization.", topicId: "vue-nuxt", level: "Senior" }
    ]
  },

  nextjs: {
    techId: "nextjs",
    title: "Next.js Fullstack Framework Roadmap",
    steps: [
      { step: 1, title: "Next.js Overview & Setup", desc: "create-next-app, App Router vs Pages Router, project directory structure.", topicId: "nextjs-basics", level: "Beginner" },
      { step: 2, title: "App Router & File Conventions", desc: "page.tsx, layout.tsx, template.tsx, loading.tsx, error.tsx, not-found.tsx.", topicId: "nextjs-app-router", level: "Beginner" },
      { step: 3, title: "Server vs Client Components", desc: "React Server Components (RSC) by default, using 'use client' directive appropriately.", topicId: "nextjs-rsc", level: "Beginner" },
      { step: 4, title: "Data Fetching Strategies", desc: "Server-side fetch, Static Site Generation (SSG), Incremental Static Regeneration (ISR).", topicId: "nextjs-data-fetching", level: "Intermediate" },
      { step: 5, title: "Server Actions & Mutations", desc: "Defining server actions ('use server'), Form handling, revalidatePath, revalidateTag.", topicId: "nextjs-server-actions", level: "Intermediate" },
      { step: 6, title: "Route Handlers (API Routes)", desc: "Building RESTful API endpoints in app/api/route.ts, handling request/response.", topicId: "nextjs-route-handlers", level: "Intermediate" },
      { step: 7, title: "Advanced Routing Patterns", desc: "Dynamic segments, Catch-all routes, Parallel routes (@folder), Intercepting routes.", topicId: "nextjs-advanced-routing", level: "Intermediate" },
      { step: 8, title: "Middleware & Edge Runtime", desc: "Global middleware.ts, Request redirection, Auth checks, Running logic on Edge nodes.", topicId: "nextjs-middleware", level: "Senior" },
      { step: 9, title: "Caching & Revalidation Architecture", desc: "Request Memoization, Data Cache, Full Route Cache, Router Cache mechanics.", topicId: "nextjs-caching", level: "Senior" },
      { step: 10, title: "SEO, Metadata & OpenGraph", desc: "Dynamic generateMetadata API, Sitemap generation, Robots.txt, Image/Font optimization.", topicId: "nextjs-seo", level: "Senior" },
      { step: 11, title: "Production & Deployment", desc: "Deploying to Vercel, Standalone Node.js build, Dockerizing Next.js applications.", topicId: "nextjs-deployment", level: "Senior" }
    ]
  },

  mysql: {
    techId: "mysql",
    title: "MySQL Relational Database Roadmap",
    steps: [
      { step: 1, title: "Relational DB Concepts & SQL Basics", desc: "Tables, rows, columns, primary keys, foreign keys, SQL syntax fundamentals.", topicId: "mysql-basics", level: "Beginner" },
      { step: 2, title: "Data Definition Language (DDL)", desc: "CREATE DATABASE, CREATE TABLE, ALTER TABLE, DROP, TRUNCATE, Constraints.", topicId: "mysql-ddl", level: "Beginner" },
      { step: 3, title: "Data Manipulation Language (DML)", desc: "INSERT INTO, SELECT, UPDATE, DELETE statements, WHERE clause filtering.", topicId: "mysql-dml", level: "Beginner" },
      { step: 4, title: "Aggregations & Grouping", desc: "COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING clause.", topicId: "mysql-aggregations", level: "Beginner" },
      { step: 5, title: "JOIN Operations", desc: "INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, Self JOIN, Cross JOIN.", topicId: "mysql-joins", level: "Intermediate" },
      { step: 6, title: "Subqueries & CTEs", desc: "Correlated subqueries, EXISTS vs IN, Common Table Expressions (WITH clause).", topicId: "mysql-subqueries-cte", level: "Intermediate" },
      { step: 7, title: "Indexing Strategies", desc: "B-Tree indexes, Unique indexes, Composite indexes, Full-text indexing mechanics.", topicId: "mysql-indexes", level: "Intermediate" },
      { step: 8, title: "Transactions & ACID Guarantees", desc: "START TRANSACTION, COMMIT, ROLLBACK, Isolation levels (Read Committed, Repeatable Read).", topicId: "mysql-transactions", level: "Intermediate" },
      { step: 9, title: "Query Optimization & EXPLAIN", desc: "Analyzing execution plans with EXPLAIN ANALYZE, Slow Query Log, Index usage.", topicId: "mysql-optimization", level: "Senior" },
      { step: 10, title: "Stored Procedures, Triggers & Views", desc: "Writing Stored Procedures, BEFORE/AFTER Triggers, Creating & Managing Views.", topicId: "mysql-procedures-triggers", level: "Senior" },
      { step: 11, title: "High Availability & Replication", desc: "Primary-Replica Replication, GTID replication, Database Sharding, Backup & Restore.", topicId: "mysql-replication", level: "Senior" }
    ]
  },

  postgresql: {
    techId: "postgresql",
    title: "PostgreSQL Advanced Database Roadmap",
    steps: [
      { step: 1, title: "Postgres Setup & psql CLI", desc: "Installation, database creation, connecting via psql CLI, client configuration.", topicId: "postgres-basics", level: "Beginner" },
      { step: 2, title: "Rich Data Types", desc: "JSONB, Arrays, UUIDs, ENUMs, Range types, Network address types.", topicId: "postgres-datatypes", level: "Beginner" },
      { step: 3, title: "Advanced SQL Queries & JOINs", desc: "Complex filtering, JOINs, COALESCE, CASE expressions, String/Date functions.", topicId: "postgres-queries", level: "Beginner" },
      { step: 4, title: "Window Functions", desc: "OVER(), PARTITION BY, ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG().", topicId: "postgres-window-functions", level: "Intermediate" },
      { step: 5, title: "CTEs & Recursive Queries", desc: "WITH clause, WITH RECURSIVE for hierarchical data traversal (tree/graph structures).", topicId: "postgres-recursive-cte", level: "Intermediate" },
      { step: 6, title: "Advanced Index Types", desc: "B-Tree, GIN (for JSONB/Search), GiST, BRIN (for time-series data), Partial Indexes.", topicId: "postgres-indexes", level: "Intermediate" },
      { step: 7, title: "MVCC & Concurrency Control", desc: "Multi-Version Concurrency Control, Deadlocks, Row-level locking (FOR UPDATE).", topicId: "postgres-mvcc", level: "Intermediate" },
      { step: 8, title: "Table Partitioning", desc: "Declarative Partitioning: Range, List, and Hash partitioning for large datasets.", topicId: "postgres-partitioning", level: "Senior" },
      { step: 9, title: "Full-Text Search & Extensions", desc: "tsvector, tsquery, pg_trgm for fuzzy matching, PostGIS for geospatial data.", topicId: "postgres-extensions", level: "Senior" },
      { step: 10, title: "Performance Profiling & Vacuum", desc: "EXPLAIN (ANALYZE, BUFFERS), Autovacuum tuning, Bloat management, pg_stat_statements.", topicId: "postgres-tuning", level: "Senior" },
      { step: 11, title: "High Availability & Connection Pooling", desc: "Streaming Replication, WAL (Write-Ahead Logging), PgBouncer connection pooler.", topicId: "postgres-ha", level: "Senior" }
    ]
  },

  mongodb: {
    techId: "mongodb",
    title: "MongoDB NoSQL Database Roadmap",
    steps: [
      { step: 1, title: "NoSQL & Document Model", desc: "RDBMS vs NoSQL, BSON format, Collections and Documents overview.", topicId: "mongodb-basics", level: "Beginner" },
      { step: 2, title: "CRUD Operations", desc: "insertOne, insertMany, find, updateOne, updateMany, deleteOne, deleteMany.", topicId: "mongodb-crud", level: "Beginner" },
      { step: 3, title: "Query Operators", desc: "Comparison ($eq, $gt, $in), Logical ($and, $or), Element ($exists, $type) operators.", topicId: "mongodb-operators", level: "Beginner" },
      { step: 4, title: "Indexing Strategies", desc: "Single field, Compound indexes, Multikey indexes (arrays), TTL indexes, Text indexes.", topicId: "mongodb-indexes", level: "Intermediate" },
      { step: 5, title: "Aggregation Framework", desc: "$match, $group, $project, $sort, $unwind, $lookup (joins), $facet pipelines.", topicId: "mongodb-aggregation", level: "Intermediate" },
      { step: 6, title: "Data Modeling Patterns", desc: "Embedding vs Referencing, One-to-Many patterns, Bucket pattern for time-series.", topicId: "mongodb-modeling", level: "Intermediate" },
      { step: 7, title: "Transactions & Concurrency", desc: "Multi-document ACID transactions, Session management, Write Concerns & Read Isolation.", topicId: "mongodb-transactions", level: "Intermediate" },
      { step: 8, title: "Replica Sets & Availability", desc: "Primary-Secondary replication, Election process, Read Preferences, Automatic failover.", topicId: "mongodb-replica-sets", level: "Senior" },
      { step: 9, title: "Sharding & Horizontal Scaling", desc: "Shard Cluster Architecture, Shard Keys, Chunk Splitting, Balancer process.", topicId: "mongodb-sharding", level: "Senior" },
      { step: 10, title: "Performance Profiling & Security", desc: "Database Profiler, Explain Plan analysis, Role-Based Access Control (RBAC), Encryption.", topicId: "mongodb-performance", level: "Senior" }
    ]
  },

  redis: {
    techId: "redis",
    title: "Redis In-Memory Data Store Roadmap",
    steps: [
      { step: 1, title: "In-Memory Storage Concepts", desc: "RAM speed vs Disk storage, Use cases (Caching, Session Store, Leaderboards).", topicId: "redis-basics", level: "Beginner" },
      { step: 2, title: "Core Data Structures", desc: "Strings (GET/SET), Hashes (HGET/HSET), Lists (LPUSH/RPOP), Sets (SADD/SMEMBERS).", topicId: "redis-datastructures", level: "Beginner" },
      { step: 3, title: "Sorted Sets & Key Expiration", desc: "ZSETs (ZADD/ZRANGEBYSCORE), TTL (EXPIRE/TTL), Key eviction policies (LRU, LFU).", topicId: "redis-sorted-sets", level: "Beginner" },
      { step: 4, title: "Caching Patterns", desc: "Cache-Aside pattern, Write-Through, Write-Behind, Cache Stampede / Thundering Herd prevention.", topicId: "redis-caching-patterns", level: "Intermediate" },
      { step: 5, title: "Pub/Sub & Messaging", desc: "Publish/Subscribe paradigm (PUBLISH/SUBSCRIBE), Message Queuing basics.", topicId: "redis-pubsub", level: "Intermediate" },
      { step: 6, title: "Redis Streams", desc: "Consumer Groups, Stream messages (XADD/XREADGROUP), Event Sourcing with Redis Streams.", topicId: "redis-streams", level: "Intermediate" },
      { step: 7, title: "Transactions & Lua Scripting", desc: "MULTI/EXEC transactions, Atomic operations via embedded Lua Scripts (EVAL).", topicId: "redis-lua-transactions", level: "Intermediate" },
      { step: 8, title: "Persistence Options", desc: "RDB (Redis Database Backup) Snapshots vs AOF (Append Only File) persistence trade-offs.", topicId: "redis-persistence", level: "Senior" },
      { step: 9, title: "Distributed Locks (Redlock)", desc: "Concurrency control, Implementing distributed locks safely using Redlock algorithm.", topicId: "redis-distributed-locks", level: "Senior" },
      { step: 10, title: "Redis Sentinel & Cluster Scaling", desc: "High Availability with Sentinel failover, Data Sharding across Redis Cluster nodes.", topicId: "redis-cluster", level: "Senior" }
    ]
  },

  docker: {
    techId: "docker",
    title: "Docker Containerization Roadmap",
    steps: [
      { step: 1, title: "Containers vs Virtual Machines", desc: "Understanding OS-level virtualization, Docker Engine architecture, Daemon process.", topicId: "docker-basics", level: "Beginner" },
      { step: 2, title: "Docker CLI & Basic Commands", desc: "docker run, ps, exec, stop, rm, images, logs, inspecting container state.", topicId: "docker-cli", level: "Beginner" },
      { step: 3, title: "Writing Dockerfiles", desc: "FROM, WORKDIR, COPY, RUN, CMD vs ENTRYPOINT, ENV, EXPOSE directives.", topicId: "dockerfile-guide", level: "Beginner" },
      { step: 4, title: "Volumes & Data Persistence", desc: "Bind mounts vs Named Volumes vs tmpfs mounts, preserving state across container restarts.", topicId: "docker-volumes", level: "Intermediate" },
      { step: 5, title: "Docker Networking", desc: "Bridge networks, Host network, Overlay network, Inter-container DNS resolution.", topicId: "docker-networking", level: "Intermediate" },
      { step: 6, title: "Docker Compose", desc: "docker-compose.yml specification, multi-container orchestration (App + DB + Redis).", topicId: "docker-compose", level: "Intermediate" },
      { step: 7, title: "Multi-Stage Docker Builds", desc: "Optimizing image size, separating build environment from lightweight runtime image.", topicId: "docker-multistage", level: "Intermediate" },
      { step: 8, title: "Security Best Practices", desc: "Running non-root users, Docker socket security, Scanning images for CVE vulnerabilities.", topicId: "docker-security", level: "Senior" },
      { step: 9, title: "Production Optimization", desc: "Layer caching techniques, .dockerignore files, Distroless images, Healthcheck instructions.", topicId: "docker-optimization", level: "Senior" },
      { step: 10, title: "Transitioning to Kubernetes", desc: "Exporting container configurations, Pod concepts, Preparing containers for K8s orchestration.", topicId: "docker-to-k8s", level: "Senior" }
    ]
  },

  git: {
    techId: "git",
    title: "Git Version Control Master Roadmap",
    steps: [
      { step: 1, title: "Version Control Concepts & Init", desc: "Centralized vs Distributed VCS, git init, configuring global user name and email.", topicId: "git-basics", level: "Beginner" },
      { step: 2, title: "Basic Workflow (Stage & Commit)", desc: "Working directory, Staging area (Index), Repository, git add, git commit, git status.", topicId: "git-workflow", level: "Beginner" },
      { step: 3, title: "Branching & Merging", desc: "Creating branches (git branch, git checkout -b), Fast-forward merges vs 3-way merge commits.", topicId: "git-branching", level: "Beginner" },
      { step: 4, title: "Resolving Merge Conflicts", desc: "Understanding conflict markers (<<<<<<<, =======, >>>>>>>), resolving and finalizing commits.", topicId: "git-conflicts", level: "Intermediate" },
      { step: 5, title: "Remote Repositories", desc: "git remote, git push, git fetch vs git pull, tracking upstream branches.", topicId: "git-remotes", level: "Intermediate" },
      { step: 6, title: "Interactive Rebasing", desc: "git rebase -i, squashing commits, rewording commit messages, linear history maintenance.", topicId: "git-rebase", level: "Intermediate" },
      { step: 7, title: "Stashing & Cherry-Picking", desc: "git stash (push/pop/apply/list), git cherry-pick for selectively applying individual commits.", topicId: "git-stash-cherrypick", level: "Intermediate" },
      { step: 8, title: "Git Hooks & Client Automation", desc: "Pre-commit, pre-push hooks, Huskey integration for linting and test execution before commit.", topicId: "git-hooks", level: "Intermediate" },
      { step: 9, title: "Git Reflog & Emergency Recovery", desc: "git reflog navigation, recovering deleted branches, recovering lost commits via SHA hashes.", topicId: "git-reflog", level: "Senior" },
      { step: 10, title: "Git Worktrees & Large Files", desc: "git worktree for checking out multiple branches simultaneously, Git LFS for binary files.", topicId: "git-worktrees", level: "Senior" },
      { step: 11, title: "Monorepo Workflows & Branch Rules", desc: "Git subtree/submodules, Branch protection policies, Trunk-based development vs GitFlow.", topicId: "git-monorepo-workflows", level: "Senior" }
    ]
  },

  linux: {
    techId: "linux",
    title: "Linux System Administration Roadmap",
    steps: [
      { step: 1, title: "Terminal & Navigation Basics", desc: "pwd, ls, cd, mkdir, rmdir, touch, cat, nano, vim basics, shell environment.", topicId: "linux-basics", level: "Beginner" },
      { step: 2, title: "File Permissions & Ownership", desc: "chmod (numeric/symbolic), chown, chgrp, umask, understanding read/write/execute bits.", topicId: "linux-permissions", level: "Beginner" },
      { step: 3, title: "Package Management", desc: "apt (Debian/Ubuntu), dnf/yum (RHEL/CentOS), managing repositories, installing tools.", topicId: "linux-packages", level: "Beginner" },
      { step: 4, title: "Process Control & Management", desc: "ps aux, top, htop, kill, killall, bg, fg, nice, renice, background processes (&).", topicId: "linux-processes", level: "Intermediate" },
      { step: 5, title: "Text Processing Utilities", desc: "grep, sed, awk, cut, sort, uniq, head, tail, redirection (> >>), pipes (|).", topicId: "linux-text-processing", level: "Intermediate" },
      { step: 6, title: "Networking Commands & SSH", desc: "curl, wget, ping, netstat, ss, ip addr, ssh key generation, scp, rsync.", topicId: "linux-networking", level: "Intermediate" },
      { step: 7, title: "Shell Scripting (Bash)", desc: "Writing bash scripts, variables, conditionals, loops, functions, exit codes.", topicId: "linux-bash-scripting", level: "Intermediate" },
      { step: 8, title: "Systemd & Cron Automation", desc: "Creating systemd services (systemctl), managing unit files, scheduling jobs with crontab.", topicId: "linux-systemd-cron", level: "Intermediate" },
      { step: 9, title: "User & Group Management", desc: "useradd, usermod, userdel, /etc/passwd, /etc/shadow, configuring sudoers file.", topicId: "linux-user-management", level: "Senior" },
      { step: 10, title: "Firewall & Security", desc: "Configuring UFW / firewalld, iptables rules, SSH hardening, fail2ban setup.", topicId: "linux-firewall-security", level: "Senior" },
      { step: 11, title: "Kernel Tuning & Memory Profiling", desc: "sysctl configuration, analyzing memory (free, vmstat), I/O bottleneck analysis (iostat).", topicId: "linux-kernel-tuning", level: "Senior" }
    ]
  },

  aws: {
    techId: "aws",
    title: "AWS Cloud Solutions Architect Roadmap",
    steps: [
      { step: 1, title: "Cloud Fundamentals & IAM", desc: "AWS Regions/AZs, AWS Console/CLI setup, IAM Users, Roles, Groups, Policies.", topicId: "aws-basics", level: "Beginner" },
      { step: 2, title: "Virtual Compute (Amazon EC2)", desc: "Instance types, AMI images, Key pairs, Security Groups, Elastic IPs, User Data scripts.", topicId: "aws-ec2", level: "Beginner" },
      { step: 3, title: "Object Storage (Amazon S3)", desc: "Buckets, Objects, Storage classes, Lifecycle policies, S3 Bucket policies, Static hosting.", topicId: "aws-s3", level: "Beginner" },
      { step: 4, title: "Virtual Private Cloud (VPC)", desc: "VPC creation, Public/Private subnets, Internet Gateways, NAT Gateways, Route Tables.", topicId: "aws-vpc", level: "Intermediate" },
      { step: 5, title: "Relational Databases (RDS)", desc: "Amazon RDS engines (PostgreSQL/MySQL), Multi-AZ deployments, Read Replicas.", topicId: "aws-rds", level: "Intermediate" },
      { step: 6, title: "Serverless Compute (AWS Lambda)", desc: "Lambda functions, Event sources (S3, API Gateway, DynamoDB), Execution roles.", topicId: "aws-lambda", level: "Intermediate" },
      { step: 7, title: "Load Balancing & Auto Scaling", desc: "Application Load Balancer (ALB), Target Groups, Auto Scaling Policies for EC2.", topicId: "aws-alb-autoscaling", level: "Intermediate" },
      { step: 8, title: "Containers on AWS (ECS & EKS)", desc: "Amazon Elastic Container Service (ECS), Fargate serverless containers, EKS Kubernetes.", topicId: "aws-ecs-eks", level: "Senior" },
      { step: 9, title: "Infrastructure as Code (IaC)", desc: "AWS CloudFormation templates, AWS CDK, Provisioning infrastructure using Terraform.", topicId: "aws-iac", level: "Senior" },
      { step: 10, title: "Security & Monitoring", desc: "AWS KMS encryption, Secrets Manager, CloudWatch metrics & logs, CloudTrail auditing.", topicId: "aws-security-monitoring", level: "Senior" },
      { step: 11, title: "Well-Architected Framework", desc: "5 Pillars: Operational Excellence, Security, Reliability, Performance, Cost Optimization.", topicId: "aws-well-architected", level: "Senior" }
    ]
  },

  "rest-api": {
    techId: "rest-api",
    title: "REST API Architecture Roadmap",
    steps: [
      { step: 1, title: "REST Principles & HTTP Protocol", desc: "Statelessness, Client-Server separation, Cacheability, Uniform Interface constraints.", topicId: "rest-principles", level: "Beginner" },
      { step: 2, title: "HTTP Request Methods", desc: "GET (safe/idempotent), POST, PUT (idempotent replacement), PATCH (partial), DELETE.", topicId: "rest-http-methods", level: "Beginner" },
      { step: 3, title: "HTTP Response Status Codes", desc: "2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error) conventions.", topicId: "rest-status-codes", level: "Beginner" },
      { step: 4, title: "Resource Naming & Design", desc: "Plural noun endpoints (/users, /orders), Hierarchy (/users/123/orders), Query params.", topicId: "rest-resource-design", level: "Intermediate" },
      { step: 5, title: "Request Validation & Contracts", desc: "Payload validation schemas, Returning structured JSON error envelopes.", topicId: "rest-validation", level: "Intermediate" },
      { step: 6, title: "Authentication & Authorization", desc: "Bearer Tokens, JWT structure, OAuth 2.0 Flows, API Keys, Handling CORS headers.", topicId: "rest-auth", level: "Intermediate" },
      { step: 7, title: "Pagination, Filtering & Sorting", desc: "Offset-based vs Cursor-based pagination, Filter parameters, Sort fields.", topicId: "rest-pagination", level: "Intermediate" },
      { step: 8, title: "Rate Limiting & Throttling", desc: "Leaky Bucket & Token Bucket algorithms, X-RateLimit headers, 429 Too Many Requests.", topicId: "rest-rate-limiting", level: "Intermediate" },
      { step: 9, title: "API Versioning Strategies", desc: "URI Path versioning (/v1/users), Header versioning, Media Type negotiation.", topicId: "rest-versioning", level: "Senior" },
      { step: 10, title: "OpenAPI Specification & Docs", desc: "Writing OpenAPI 3.1 YAML/JSON specs, Swagger UI generation, Contract-first design.", topicId: "rest-openapi", level: "Senior" },
      { step: 11, title: "API Gateway & Microservices", desc: "Request routing, Protocol translation, Aggregation, Circuit breaking at gateway level.", topicId: "rest-gateway", level: "Senior" }
    ]
  },

  graphql: {
    techId: "graphql",
    title: "GraphQL API Development Roadmap",
    steps: [
      { step: 1, title: "GraphQL Core Concepts", desc: "Over-fetching & Under-fetching problems, GraphQL vs REST paradigm comparison.", topicId: "graphql-basics", level: "Beginner" },
      { step: 2, title: "Schema Definition Language (SDL)", desc: "Types, Fields, Scalars (Int, Float, String, Boolean, ID), Non-null & List modifiers.", topicId: "graphql-schema", level: "Beginner" },
      { step: 3, title: "Queries & Arguments", desc: "Writing GraphQL queries, Aliases, Fragments, Query variables.", topicId: "graphql-queries", level: "Beginner" },
      { step: 4, title: "Mutations & Input Types", desc: "Defining Mutations for state changes, Custom Input Object types.", topicId: "graphql-mutations", level: "Intermediate" },
      { step: 5, title: "Resolvers & Execution Context", desc: "Resolver function signature (parent, args, context, info), Context object injection.", topicId: "graphql-resolvers", level: "Intermediate" },
      { step: 6, title: "DataLoader & N+1 Problem", desc: "Batching and caching database requests using DataLoader to solve N+1 query problem.", topicId: "graphql-dataloader", level: "Intermediate" },
      { step: 7, title: "Subscriptions & Real-Time Data", desc: "WebSocket transport, Defining Subscriptions for event-driven live updates.", topicId: "graphql-subscriptions", level: "Intermediate" },
      { step: 8, title: "Authentication & Field Authorization", desc: "Verifying credentials in context, Field-level authorization checks in resolvers.", topicId: "graphql-auth", level: "Senior" },
      { step: 9, title: "Apollo Federation & Schema Stitching", desc: "Combining multiple GraphQL services into a unified graph gateway.", topicId: "graphql-federation", level: "Senior" },
      { step: 10, title: "Performance & Query Cost Analysis", desc: "Query Depth Limiting, Query Complexity Analysis, Preventing malicious query attacks.", topicId: "graphql-performance", level: "Senior" }
    ]
  },

  "system-design": {
    techId: "system-design",
    title: "System Design & Distributed Systems Roadmap",
    steps: [
      { step: 1, title: "Scalability Fundamentals", desc: "Vertical scaling (Scaling Up) vs Horizontal scaling (Scaling Out), Stateless services.", topicId: "sd-scalability", level: "Beginner" },
      { step: 2, title: "Load Balancers & Reverse Proxies", desc: "L4 vs L7 Load Balancing, Round Robin, Least Connections, Consistent Hashing.", topicId: "sd-load-balancers", level: "Beginner" },
      { step: 3, title: "Caching Architecture", desc: "Client cache, CDN, Reverse Proxy cache (Varnish), In-memory cache (Redis/Memcached).", topicId: "sd-caching", level: "Beginner" },
      { step: 4, title: "Database Sharding & Replication", desc: "Primary-Replica replication, Vertical partitioning, Horizontal Sharding key strategies.", topicId: "sd-database-scaling", level: "Intermediate" },
      { step: 5, title: "CAP Theorem & PACELC", desc: "Consistency, Availability, Partition Tolerance trade-offs, Eventual Consistency.", topicId: "sd-cap-theorem", level: "Intermediate" },
      { step: 6, title: "Message Queues & Event-Driven", desc: "Asynchronous processing, Message Brokers (Kafka, RabbitMQ), Decoupling services.", topicId: "sd-message-queues", level: "Intermediate" },
      { step: 7, title: "Rate Limiting & API Security", desc: "Token Bucket, Leaky Bucket, Sliding Window Counter algorithms for rate limiting.", topicId: "sd-rate-limiting", level: "Intermediate" },
      { step: 8, title: "Design URL Shortener (TinyURL)", desc: "Base62 encoding, Key Generation Service (KGS), Hash collisions, Database design.", topicId: "sd-url-shortener", level: "Intermediate" },
      { step: 9, title: "Design Real-time Chat / Notification", desc: "WebSockets vs Long Polling vs SSE, Presence servers, Message persistence.", topicId: "sd-chat-system", level: "Senior" },
      { step: 10, title: "Design Distributed File Storage", desc: "Chunk storage, Metadata service, Deduplication, Uploading large files in parts (S3 architecture).", topicId: "sd-file-storage", level: "Senior" },
      { step: 11, title: "Observability & Fault Tolerance", desc: "Distributed Tracing, Metrics (Prometheus), Circuit Breaker pattern, Heartbeats.", topicId: "sd-observability", level: "Senior" }
    ]
  },

  microservices: {
    techId: "microservices",
    title: "Microservices Architecture Roadmap",
    steps: [
      { step: 1, title: "Monolith vs Microservices", desc: "Benefits, trade-offs, organizational alignment (Conway's Law), Decompose criteria.", topicId: "ms-basics", level: "Beginner" },
      { step: 2, title: "Domain-Driven Design (DDD)", desc: "Bounded Contexts, Ubiquitous Language, Entities, Value Objects, Domain Events.", topicId: "ms-ddd", level: "Beginner" },
      { step: 3, title: "API Gateway Pattern", desc: "Central entry point, Request Routing, Authentication offloading, SSL Termination.", topicId: "ms-api-gateway", level: "Intermediate" },
      { step: 4, title: "Inter-Service Communication", desc: "Synchronous (REST, gRPC) vs Asynchronous (AMQP, Kafka, Event-driven messaging).", topicId: "ms-communication", level: "Intermediate" },
      { step: 5, title: "Distributed Data Management", desc: "Database-per-service pattern, Eventual consistency, Dual writes problem.", topicId: "ms-data-management", level: "Intermediate" },
      { step: 6, title: "Saga Pattern for Transactions", desc: "Choreography vs Orchestration based Sagas, Compensating transactions.", topicId: "ms-saga-pattern", level: "Intermediate" },
      { step: 7, title: "Service Discovery & Registration", desc: "Client-side vs Server-side discovery, Eureka, Consul, Kubernetes DNS discovery.", topicId: "ms-service-discovery", level: "Senior" },
      { step: 8, title: "Resilience & Circuit Breaking", desc: "Circuit Breaker pattern (Resilience4j/Hystrix), Bulkhead pattern, Timeout handling.", topicId: "ms-circuit-breaker", level: "Senior" },
      { step: 9, title: "Distributed Tracing & Logging", desc: "Correlation IDs, OpenTelemetry, Jaeger, Zipkin, Centralized Log Aggregation (ELK).", topicId: "ms-tracing-logging", level: "Senior" },
      { step: 10, title: "Container Orchestration & Deployment", desc: "Deploying microservices to Kubernetes, Helm charts, Service Mesh (Istio / Linkerd).", topicId: "ms-deployment", level: "Senior" }
    ]
  },

  devops: {
    techId: "devops",
    title: "DevOps & Cloud Engineering Roadmap",
    steps: [
      { step: 1, title: "DevOps Philosophy & Culture", desc: "CALMS framework (Culture, Automation, Lean, Measurement, Sharing), CI/CD flow.", topicId: "devops-basics", level: "Beginner" },
      { step: 2, title: "Source Control & Git Workflows", desc: "Trunk-Based Development, Branch protection policies, Pull Request reviews.", topicId: "devops-git-workflows", level: "Beginner" },
      { step: 3, title: "CI/CD Pipeline Fundamentals", desc: "GitHub Actions, GitLab CI, Build artifacts, Automated testing stages, Pipeline syntax.", topicId: "devops-cicd", level: "Beginner" },
      { step: 4, title: "Infrastructure as Code (IaC)", desc: "Declarative infrastructure, Terraform syntax, State management, Module reusability.", topicId: "devops-iac-terraform", level: "Intermediate" },
      { step: 5, title: "Containerization & Registries", desc: "Docker image security scanning, Docker Hub / AWS ECR private image management.", topicId: "devops-containers", level: "Intermediate" },
      { step: 6, title: "Cloud Infrastructure Automation", desc: "Automating cloud resource creation on AWS/GCP/Azure via CLI and Terraform.", topicId: "devops-cloud-automation", level: "Intermediate" },
      { step: 7, title: "Monitoring & Observability", desc: "Prometheus metric scraping, Grafana dashboards, Alertmanager notification rules.", topicId: "devops-monitoring", level: "Intermediate" },
      { step: 8, title: "Secret Management", desc: "Managing environment secrets securely with HashiCorp Vault, AWS Secrets Manager.", topicId: "devops-secrets", level: "Senior" },
      { step: 9, title: "Kubernetes Orchestration", desc: "Pods, Deployments, Services, Ingress Controllers, ConfigMaps, Secrets, Helm Charts.", topicId: "devops-k8s", level: "Senior" },
      { step: 10, title: "Deployment Strategies & Site Reliability", desc: "Blue-Green deployments, Canary releases, SRE concepts (SLO, SLA, Error Budgets).", topicId: "devops-sre", level: "Senior" }
    ]
  },

  kafka: {
    techId: "kafka",
    title: "Apache Kafka Event Streaming Roadmap",
    steps: [
      { step: 1, title: "Kafka Core Architecture", desc: "Topics, Partitions, Brokers, Event Log stream, Offset management.", topicId: "kafka-basics", level: "Beginner" },
      { step: 2, title: "Producer Mechanics & Partitioning", desc: "Producer Acks (0, 1, all), Record keys, Custom partitioners, Idempotent producers.", topicId: "kafka-producers", level: "Beginner" },
      { step: 3, title: "Consumer Groups & Rebalancing", desc: "Consumer groups, Offset commit strategies (auto vs manual), Rebalance protocol.", topicId: "kafka-consumers", level: "Intermediate" },
      { step: 4, title: "Kafka Connect & Integration", desc: "Source & Sink connectors, Change Data Capture (Debezium), Database streaming.", topicId: "kafka-connect", level: "Intermediate" },
      { step: 5, title: "Kafka Streams & Event Processing", desc: "KStream, KTable, Windowing operations, Stream joins, State stores.", topicId: "kafka-streams", level: "Intermediate" },
      { step: 6, title: "Schema Registry & Avro", desc: "Confluent Schema Registry, Apache Avro serialization, Schema evolution rules.", topicId: "kafka-schema-registry", level: "Senior" },
      { step: 7, title: "Cluster Operations & Security", desc: "Kraft consensus vs ZooKeeper, SASL/SSL auth, Topic retention policies, Monitoring.", topicId: "kafka-operations", level: "Senior" }
    ]
  },

  kubernetes: {
    techId: "kubernetes",
    title: "Kubernetes Container Orchestration Roadmap",
    steps: [
      { step: 1, title: "Kubernetes Architecture & Control Plane", desc: "kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy.", topicId: "k8s-basics", level: "Beginner" },
      { step: 2, title: "Pods & Deployments", desc: "Pod lifecycle, Declarative Deployments, ReplicaSets, Rolling updates & Rollbacks.", topicId: "k8s-pods-deployments", level: "Beginner" },
      { step: 3, title: "Services & Ingress Controllers", desc: "ClusterIP, NodePort, LoadBalancer, Ingress routing, Nginx Ingress, Cert-Manager.", topicId: "k8s-services-ingress", level: "Intermediate" },
      { step: 4, title: "ConfigMaps & Secrets Management", desc: "Injecting environment variables, mounting files, sealed secrets, HashiCorp Vault.", topicId: "k8s-configmaps-secrets", level: "Intermediate" },
      { step: 5, title: "Storage & Persistent Volumes", desc: "PV, PVC, StorageClasses, Dynamic Provisioning, StatefulSets.", topicId: "k8s-storage", level: "Intermediate" },
      { step: 6, title: "Helm Package Management", desc: "Helm charts, templates, values.yaml, release versioning, custom chart creation.", topicId: "k8s-helm", level: "Senior" },
      { step: 7, title: "RBAC, Security & Auto-scaling", desc: "ServiceAccounts, Roles, RoleBindings, HPA (Horizontal Pod Autoscaler), KEDA.", topicId: "k8s-security-scaling", level: "Senior" }
    ]
  },

  rabbitmq: {
    techId: "rabbitmq",
    title: "RabbitMQ Message Broker Roadmap",
    steps: [
      { step: 1, title: "RabbitMQ Fundamentals & AMQP 0-9-1", desc: "AMQP protocol, Message structure, Queues, Exchanges, Bindings, Routing Keys.", topicId: "rabbitmq-basics", level: "Beginner" },
      { step: 2, title: "Exchange Types & Routing Patterns", desc: "Direct, Fanout, Topic, and Headers exchanges, Pub/Sub patterns.", topicId: "rabbitmq-exchanges", level: "Beginner" },
      { step: 3, title: "Message Acknowledgments & DLQ", desc: "Manual Acks/Nacks, Prefetch count, Dead Letter Exchanges (DLX), Retry queues.", topicId: "rabbitmq-ack-dlq", level: "Intermediate" },
      { step: 4, title: "Clustering, Mirroring & High Availability", desc: "Classic Mirrored Queues vs Quorum Queues, Federation plugin, Shovel plugin.", topicId: "rabbitmq-ha", level: "Senior" }
    ]
  },

  bullmq: {
    techId: "bullmq",
    title: "BullMQ Job Queue Roadmap",
    steps: [
      { step: 1, title: "BullMQ Core Concepts & Redis Backend", desc: "Queues, Jobs, Workers, Redis connection setup, Event loop integration.", topicId: "bullmq-basics", level: "Beginner" },
      { step: 2, title: "Workers & Job Concurrency", desc: "Defining Workers, Concurrency limits, Job completion & failure handlers.", topicId: "bullmq-workers", level: "Beginner" },
      { step: 3, title: "Retries, Backoff & Delay Jobs", desc: "Exponential backoff strategies, Delayed jobs, Rate limiting, Repeatable Cron jobs.", topicId: "bullmq-retries", level: "Intermediate" },
      { step: 4, title: "Parent-Child Flows & Bull-Board", desc: "FlowProducer, Job dependencies, Parent-child workflows, Bull-Board UI monitoring.", topicId: "bullmq-flows", level: "Senior" }
    ]
  },

  prisma: {
    techId: "prisma",
    title: "Prisma ORM Database Mastery Roadmap",
    techCategory: "database",
    steps: [
      { step: 1, title: "Prisma Core & Schema Definition", desc: "schema.prisma syntax, Datasource, Generator, Models, Scalar & Enum types.", topicId: "prisma-basics", level: "Beginner" },
      { step: 2, title: "Prisma Client CRUD Operations", desc: "create, findUnique, findMany, update, delete, upsert, filtering & sorting.", topicId: "prisma-crud", level: "Beginner" },
      { step: 3, title: "Relations & Nested Queries", desc: "One-to-One, One-to-Many, Many-to-Many, Relation fields (@relation), include vs select.", topicId: "prisma-relations", level: "Intermediate" },
      { step: 4, title: "Migrations & Schema Evolution", desc: "Prisma Migrate (prisma migrate dev/deploy), Introspection (prisma db pull).", topicId: "prisma-migrations", level: "Intermediate" },
      { step: 5, title: "Transactions & Middleware", desc: "Interactive transactions ($transaction), Client extensions, Middleware logging.", topicId: "prisma-transactions", level: "Senior" }
    ]
  }
};
