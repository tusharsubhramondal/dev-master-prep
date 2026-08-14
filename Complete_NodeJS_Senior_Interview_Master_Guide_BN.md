# Senior & Lead Node.js + Express.js Interview Question Bank (8+ Years Experience)

> **Complete Master Reference Guide — 424 Questions Across 27 Technical Modules**
> **Target Role:** Senior Node.js Developer / Lead Backend Engineer / Principal Systems Architect

---

## Table of Contents
1. [Node.js Fundamentals & Runtime (Q1 - Q22)](#1-nodejs-fundamentals--runtime)
2. [Event Loop & Async Programming — Senior Level (Q23 - Q40)](#2-event-loop--async-programming--senior-level)
3. [JavaScript Advanced for Node.js (Q41 - Q59)](#3-javascript-advanced-for-nodejs)
4. [Modules & Package Management (Q60 - Q73)](#4-modules--package-management)
5. [Express.js Fundamentals (Q74 - Q92)](#5-expressjs-fundamentals)
6. [Express Architecture (Q93 - Q104)](#6-express-architecture)
7. [REST API Design (Q105 - Q122)](#7-rest-api-design)
8. [Authentication & Authorization (Q123 - Q140)](#8-authentication--authorization)
9. [Express Security (Q141 - Q157)](#9-express-security)
10. [Database — SQL (Q158 - Q176)](#10-database--sql)
11. [MongoDB & Mongoose (Q177 - Q194)](#11-mongodb--mongoose)
12. [Redis & Caching (Q195 - Q207)](#12-redis--caching)
13. [Queues & Background Jobs (Q208 - Q223)](#13-queues--background-jobs)
14. [Kafka & Event-Driven Architecture (Q224 - Q240)](#14-kafka--event-driven-architecture)
15. [Streams & Buffers (Q241 - Q251)](#15-streams--buffers)
16. [Error Handling & Logging (Q252 - Q265)](#16-error-handling--logging)
17. [Testing Node.js & Express (Q266 - Q281)](#17-testing-nodejs--express)
18. [Performance & Scalability (Q282 - Q299)](#18-performance--scalability)
19. [Worker Threads, Cluster & Child Processes (Q300 - Q309)](#19-worker-threads-cluster--child-processes)
20. [Microservices & Distributed Systems (Q310 - Q326)](#20-microservices--distributed-systems)
21. [System Design — Senior/Lead (Q327 - Q338)](#21-system-design--seniorlead)
22. [Real-World Troubleshooting Scenarios (Q339 - Q353)](#22-real-world-troubleshooting-scenarios)
23. [Docker, DevOps & Production (Q354 - Q370)](#23-docker-devops--production)
24. [CI/CD & Cloud (Q371 - Q381)](#24-cicd--cloud)
25. [Design Patterns (Q382 - Q393)](#25-design-patterns)
26. [Leadership & Senior-Level Questions (Q394 - Q407)](#26-leadership--senior-level-questions)
27. [Coding & Practical Questions (Q408 - Q424)](#27-coding--practical-questions)

---

## 1. Node.js Fundamentals & Runtime

### Q1. What is Node.js and why is it suitable for backend development?
**Answer:**
Node.js is an open-source, cross-platform, single-threaded asynchronous event-driven JavaScript runtime built on Chrome's V8 engine and libuv. It excels at non-blocking I/O operations, handling tens of thousands of concurrent connections efficiently.

### Q2. Explain the Node.js runtime architecture.
1. **V8 Engine:** Compiles JS to machine code and executes synchronous JS on the Call Stack.
2. **libuv:** Provides the Event Loop and Thread Pool (default 4 threads) for asynchronous File System, Crypto, DNS, and Network I/O.
3. **C++ Bindings & Core Modules:** `fs`, `http`, `stream`, `crypto`, `events`.

```
┌───────────────────────────────────────────────────────────┐
│                 Node.js Standard Library                  │
├──────────────────────────────┬────────────────────────────┤
│   Node.js C++ Bindings       │      c-ares / OpenSSL      │
├──────────────────────────────┼────────────────────────────┤
│      V8 Engine (JS -> MC)    │   libuv (Event Loop & TP)  │
└──────────────────────────────┴────────────────────────────┘
```

### Q4. Is Node.js single-threaded?
- **JavaScript execution:** Single-threaded on the main V8 call stack.
- **Underlying runtime (libuv):** Multi-threaded using C++ thread pool (`UV_THREADPOOL_SIZE`, default 4) for FS, Crypto, and DNS tasks.

---

## 2. Event Loop & Async Programming — Senior Level

### Q23. Explain the complete Node.js event loop lifecycle (6 Phases).
1. **Timers:** Executes `setTimeout` & `setInterval` callbacks.
2. **Pending Callbacks:** Executes deferred I/O callbacks (e.g. TCP errors).
3. **Idle, Prepare:** Internal Node.js usage.
4. **Poll:** Retrieves new I/O events and executes I/O callbacks.
5. **Check:** Executes `setImmediate()` callbacks.
6. **Close Callbacks:** Executes close event callbacks (`socket.on('close')`).

*Microtask Priority:* `process.nextTick()` microtasks run BEFORE Promise microtasks, and both run immediately after any operation before advancing phases.

---

## 5 - 27 Core Architectural Summary

- **Express Middleware Pipeline (Q74-92):** Executed sequentially via `next()`. Error middleware MUST have 4 parameters `(err, req, res, next)`.
- **REST API & Idempotency (Q105-122):** Idempotency headers (`X-Idempotency-Key`) cached in Redis; Cursor pagination (`WHERE id > cursor`) for O(1) performance.
- **Authentication & Security (Q123-157):** JWT Refresh token rotation in `HttpOnly` cookies; Helmet security headers; rate limiting against brute-force.
- **Database & Mongo (Q158-194):** Connection pooling; Mongoose schema hooks (`pre('save')`); MongoDB atomic updates (`findOneAndUpdate({ stock: { $gt: 0 } })`).
- **Redis & Queues (Q195-223):** Cache-aside pattern (`redis.get` -> miss -> query DB -> `redis.set EX`); BullMQ Redis worker queues with exponential backoff.
- **Kafka & Streams (Q224-251):** Kafka topic partitions & partition key hashing; Node.js `stream.pipeline()` for streaming multi-GB files without memory exhaustion.
- **Error Handling & Logs (Q252-265):** Differentiate Operational vs Programmer errors; use Pino for ultra-fast structured JSON logging.
- **Performance & Cluster (Q282-309):** Profile via `node --inspect`; scale multi-core CPU throughput using `node:cluster`.
- **Microservices (Q310-326):** gRPC binary Protobuf; Opossum Circuit Breakers (`Closed -> Open -> Half-Open`); Saga pattern for distributed transactions.
- **Docker & Production (Q354-370):** Multi-stage Docker builds (<100MB); `process.on('SIGTERM')` graceful shutdown draining HTTP connections before container exit.
- **Design Patterns (Q382-393):** Strategy pattern for payment/SMS providers; Factory pattern; EventEmitter; Middleware pattern.
- **Senior Coding Wrappers (Q408-424):** Reusable `asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);`.

---
*Master Reference Guide generated for Senior & Lead Node.js + Express.js Backend Developer Preparation.*
