# Senior & Lead Laravel Interview Question Bank (8+ Years Experience)

> **Complete Master Reference Guide — 299 Questions Across 22 Technical Modules**
> **Target Role:** Senior Laravel Developer / Lead Backend Engineer / Principal Software Architect

---

## Table of Contents
1. [Laravel Core & Architecture (Q1 - Q18)](#1-laravel-core--architecture)
2. [Laravel MVC & Application Architecture (Q19 - Q33)](#2-laravel-mvc--application-architecture)
3. [Eloquent ORM — Senior Level (Q34 - Q58)](#3-eloquent-orm--senior-level)
4. [Database & SQL (Q59 - Q78)](#4-database--sql)
5. [Laravel Queues & Jobs (Q79 - Q105)](#5-laravel-queues--jobs)
6. [Events & Listeners (Q106 - Q116)](#6-events--listeners)
7. [Laravel Cache (Q117 - Q128)](#7-laravel-cache)
8. [Redis (Q129 - Q137)](#8-redis)
9. [Laravel Authentication & Authorization (Q138 - Q151)](#9-laravel-authentication--authorization)
10. [Laravel API Development (Q152 - Q166)](#10-laravel-api-development)
11. [Laravel Security (Q167 - Q180)](#11-laravel-security)
12. [Laravel Validation (Q181 - Q188)](#12-laravel-validation)
13. [Laravel Testing (Q189 - Q204)](#13-laravel-testing)
14. [Laravel Performance (Q205 - Q216)](#14-laravel-performance)
15. [Laravel Deployment & DevOps (Q217 - Q231)](#15-laravel-deployment--devops)
16. [Docker & Laravel (Q232 - Q239)](#16-docker--laravel)
17. [Laravel + Microservices (Q240 - Q251)](#17-laravel--microservices)
18. [Design Patterns (Q252 - Q264)](#18-design-patterns)
19. [System Design Questions (Q265 - Q270)](#19-system-design-questions)
20. [Real-World Scenario Questions (Q271 - Q280)](#20-real-world-scenario-questions)
21. [Leadership / Senior-Level Questions (Q281 - Q295)](#21-leadership--senior-level-questions)
22. [Laravel Coding Questions (Q296 - Q299)](#22-laravel-coding-questions)

---

## 1. Laravel Core & Architecture

### Q1. Explain the complete Laravel request lifecycle.
**Answer:**
1. **Entry Point:** All HTTP traffic hits `public/index.php`. It loads Composer autoloader (`vendor/autoload.php`) and initializes the Laravel Application instance via `bootstrap/app.php`.
2. **HTTP Kernel:** Captures request using `Illuminate\Http\Request::capture()` and instantiates the HTTP Kernel. Global middleware runs (e.g. `TrustProxies`, `PreventRequestsDuringMaintenance`).
3. **Service Providers:**
   - **Register Phase:** Calls `register()` on all configured Service Providers (registers container bindings).
   - **Boot Phase:** Calls `boot()` on all providers after registration completes.
4. **Router Dispatch:** Router matches URL to route definitions in `routes/web.php` or `routes/api.php`, running route-specific middleware (`auth`, `throttle`).
5. **Controller / Action:** Dependency Injection auto-wires controller dependencies via Reflection API and executes the controller action.
6. **Response Return:** Controller returns a Response object sent to the browser via `$response->send()`.
7. **Terminable Middleware:** Executes any `terminate($request, $response)` methods after response delivery.

```
Request -> public/index.php -> HTTP Kernel -> Service Providers (register -> boot) 
        -> Global Middleware -> Router -> Route Middleware -> Controller/Action 
        -> Response -> Terminable Middleware -> Browser Client
```

### Q2. What happens when a request enters public/index.php?
**Answer:**
`public/index.php` carries out 4 critical bootstrap tasks:
1. Checks for maintenance mode file (`storage/framework/maintenance.php`).
2. Requires Composer autoloader (`vendor/autoload.php`).
3. Bootstrap application instance (`bootstrap/app.php`).
4. Handles request via `$app->handleRequest(Request::capture())` and returns HTTP response.

### Q3. What is the Laravel Service Container?
**Answer:**
The Service Container is an Inversion of Control (IoC) engine used to manage class dependencies and perform automated Dependency Injection via PHP Reflection API.

### Q4. What is Dependency Injection and why is it important?
**Answer:**
Dependency Injection is a software pattern where dependencies are injected externally into class constructors rather than instantiated internally using `new Class()`. It decouples high-level domain logic, enables Mockery testing, and allows interface implementation swapping.

### Q5. Difference between Service Provider and Service Container.
- **Service Container:** The underlying IoC container registry and dependency resolution engine (`bind()`, `singleton()`, `make()`).
- **Service Provider:** The bootstrap class used to populate and configure the container bindings (`register()`, `boot()`).

### Q6. Explain register() vs boot() in a Service Provider.
- **`register()`:** Strictly used to bind classes/interfaces into the Service Container. Never register event listeners or call other services inside `register()`.
- **`boot()`:** Executed after ALL service providers have finished registering. Safe to resolve dependencies, register routes, policies, view composers, and listeners.

### Q7. What are facades in Laravel?
**Answer:**
Facades provide a static proxy interface to underlying classes registered in the Service Container (e.g. `Cache::get()`, `Queue::push()`) while maintaining full testability via fakes (`Cache::fake()`).

### Q8. How do Laravel facades work internally?
**Answer:**
Facades extend `Illuminate\Support\Facades\Facade` and override `getFacadeAccessor()` returning a container binding string. When static methods are invoked, PHP's `__callStatic()` resolves the bound instance from the container via `app(static::getFacadeAccessor())` and calls the method dynamically.

### Q9. Facade vs Dependency Injection — which do you prefer and why?
**Answer:**
- **Dependency Injection:** Preferred for core domain logic, Action classes, and Services to maintain explicit dependencies and clear domain boundaries.
- **Facades:** Preferred for utilities in controllers/views (`Log::info()`, `Cache::remember()`, `Route::get()`).

### Q10. Difference between singleton(), bind(), and scoped()?
- **`bind()`:** Resolves a NEW instance on every call.
- **`singleton()`:** Resolves ONCE and reuses the instance across the entire application process lifetime.
- **`scoped()`:** Resolves ONCE per HTTP request / Job cycle. Resets state on new requests (crucial for Laravel Octane).

### Q11. What are Laravel contracts?
**Answer:**
Contracts are framework-defined interfaces (e.g. `Illuminate\Contracts\Queue\ShouldQueue`) that core components implement, allowing domain code to depend on abstractions rather than concrete vendor packages.

### Q12. Explain Laravel's middleware pipeline.
**Answer:**
Uses the Pipeline (Chain of Responsibility) design pattern wrapping around HTTP handling. Pre-processing executes before `$next($request)`; post-processing executes after `$next($request)` returns the Response.

### Q13. Difference between global middleware, route middleware and middleware groups.
- **Global:** Runs on EVERY request.
- **Groups:** Sets of middleware grouped under a single key (`web`, `api`).
- **Route:** Attached to specific routes via `->middleware('auth')`.

### Q14. How would you create your own middleware?
**Answer:**
Run `php artisan make:middleware EnsureSubscribed`. Implement `handle(Request $request, Closure $next)` and register in `bootstrap/app.php` or `Kernel.php`.

### Q15. How does Laravel handle exceptions?
**Answer:**
All exceptions are captured by the Exception Handler (`bootstrap/app.php` in Laravel 11). Supports `report()` (logging to Sentry/Bugsnag) and `render()` (converting exceptions to JSON error responses or error views).

### Q16. How does Laravel resolve dependencies automatically?
**Answer:**
Uses PHP Reflection API (`ReflectionClass`) to inspect constructor parameters. If a parameter is a class or interface type-hint, the container recursively resolves and instantiates it (Auto-Wiring).

### Q17. What is the role of the bootstrap directory?
**Answer:**
- `bootstrap/app.php`: Main app configuration entrypoint (routes, middleware, exceptions).
- `bootstrap/providers.php`: Service providers list.
- `bootstrap/cache/`: Compiled framework cache files (`config.php`, `routes-v7.php`).

### Q18. How would you structure a large Laravel application?
**Answer:**
Use Domain-Driven / Modular Monolith architecture (`app/Domains/Ordering/`, `app/Domains/Billing/`), organizing code into Actions, DTOs, Services, and Models per domain module rather than flat controller folders.

---

## 2. Laravel MVC & Application Architecture

### Q19. Explain MVC in Laravel.
- **Model:** Data persistence and relationship logic (Eloquent).
- **View:** HTML rendering layer (Blade / Inertia React).
- **Controller:** Traffic router orchestrating DTOs, Actions, and Responses.

### Q20. Should business logic be placed inside Controllers?
**NO.** Controllers should be thin orchestrators delegating business logic to invokable **Action Classes** or **Domain Services**.

### Q21. What is a Service Layer?
A service class encapsulating complex multi-model business workflows (e.g. `OrderProcessingService`).

### Q22. Repository Pattern — when should you use it?
Use when switching underlying persistence storage engines (e.g., MongoDB vs MySQL) or building data access abstractions over raw external API queries.

### Q23. Repository vs Service — what's the difference?
- **Repository:** Strictly handles Data Persistence and Querying (`UserRepository`).
- **Service:** Handles Business Domain Workflows (`UserRegistrationService`).

### Q24. What is a DTO (Data Transfer Object)?
A strongly-typed readonly PHP class transferring validated data between layers (Form Request -> DTO -> Action Class) eliminating array-key bugs.

```php
readonly class CreateUserData {
    public function __construct(
        public string $name,
        public string $email,
        public string $password
    ) {}
}
```

### Q25. What is an Action/Use Case class?
A single-purpose class executing ONE domain operation, exposing an `__invoke()` method.

### Q26. How would you prevent fat controllers?
Use Form Requests for validation, DTOs for data structures, invokable Action classes for logic, and API Resources for JSON output.

### Q27. How would you prevent fat models?
Extract custom queries to Custom Query Builders, move model lifecycle events to Observers, and delegate mutative actions to Action classes.

### Q28. What architecture would you use for a large Laravel application?
Modular Monolith Architecture, dividing code into isolated domain modules (`Modules/Order`, `Modules/Payment`) communicating via Event Bus.

### Q29. When would you NOT use Repository Pattern?
When building standard Eloquent applications where wrapping Eloquent causes leaky abstractions over eager loading, scopes, and relationships.

### Q30. Would you create a repository for every Eloquent model?
**NO.** Only create Repositories for complex data access aggregates.

### Q31. How do you organize a Laravel monolith with 50+ modules?
Use path packages or `nwidart/laravel-modules` and enforce architectural boundaries using static analysis tools (Deptrac / PHPStan).

### Q32. How would you implement Domain-Driven Design concepts in Laravel?
Structure around Aggregates, Value Objects (`Money`), Domain Events (`OrderPaid`), and Domain Services.

### Q33. What is the difference between modular monolith and microservices?
- **Modular Monolith:** 1 deployment unit, single database, in-memory PHP function calls.
- **Microservices:** Multiple service deployments, database-per-service, network IPC (HTTP/RabbitMQ).

---

## 3. Eloquent ORM — Senior Level

### Q34. Explain how Eloquent works internally.
Implements the Active Record pattern. `Model` intercepts property/method calls via magic methods (`__get`, `__call`), passing queries to `Eloquent\Builder` which compiles SQL using `Query\Grammar`.

### Q35. Difference between User::find(1), User::where('id', 1)->first(), and User::findOrFail(1).
- `find(1)`: Direct PK lookup; returns `User` or `null`.
- `where('id', 1)->first()`: Query builder instance lookup; returns `User` or `null`.
- `findOrFail(1)`: PK lookup; returns `User` or throws `ModelNotFoundException` (HTTP 404).

### Q36. What is the N+1 query problem?
Occurs when parent records (1 query) loop over relationship properties, triggering a separate SQL query for every single record (N queries). Total = 1 + N queries.

### Q37. How do you identify and solve N+1 problems?
- **Identify:** Enable `Model::preventLazyLoading(!app()->isProduction())` or check Debugbar.
- **Solve:** Use Eager Loading (`Book::with('author')->get()`).

### Q38. Difference between with(), load(), and loadMissing().
- `with()`: Eager loads relationships during initial SQL query.
- `load()`: Lazy eager loads relationships on an existing collection.
- `loadMissing()`: Eager loads relationships ONLY IF not already loaded.

### Q39. Explain eager loading vs lazy loading.
- **Lazy Loading:** Fetches relationship on-demand (causes N+1).
- **Eager Loading:** Queries relationship upfront using SQL `WHERE IN (...)`.

### Q40. What are Eloquent relationships?
`hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, `hasManyThrough`, `morphTo`, `morphMany`, `morphedByMany`.

### Q41 - Q44. Polymorphic Relationships.
Allows a single child model (`Comment`) to belong to multiple parent model types (`Post`, `Video`) using `commentable_type` and `commentable_id` columns via `morphMany()` and `morphTo()`.

### Q45 - Q47. Model Observers & Events.
Observers group Eloquent lifecycle events (`created`, `updated`, `deleted`). Events/Listeners decouple generic application events.

### Q48. Accessors & Mutators.
Format values on retrieval/storage using Laravel 9+ `Attribute::make(get: fn(), set: fn())`.

### Q49. What are Eloquent casts?
Converts database columns to native PHP types (`array`, `json`, `encrypted`, `AsCollection::class`).

### Q50 - Q51. $fillable vs $guarded & Mass Assignment.
`$fillable` white-lists allowed mass-assignment properties to prevent attackers from injecting unauthorized attributes (`is_admin`).

### Q52 - Q53. Soft Delete & withTrashed().
Uses `SoftDeletes` trait to set a `deleted_at` timestamp. `withTrashed()` includes soft-deleted records.

### Q54 - Q56. Global & Local Scopes.
- **Global Scopes:** Adds SQL constraints to EVERY query on a model (e.g. tenant isolation).
- **Local Scopes:** Reusable query methods prefixed with `scope`.

### Q57 - Q58. Efficient Processing of 10 Million Records.
Use `User::lazyById(5000)` or `cursor()` with `DB::disableQueryLog()` to stream rows using generators under <32MB RAM. Never use `chunk()` when mutating records!

---

## 4. Database & SQL

### Q59 - Q63. Database Indexing & Composite Indexes.
- Indexes (B-Trees) speed up `WHERE`, `JOIN`, and `ORDER BY` clauses.
- **Composite Index Order:** Must obey **Leftmost Prefix Rule**. An index on `(A, B, C)` requires queries to filter by `A` first.

### Q64 - Q65. Normalization vs Denormalization.
Normalization reduces redundancy; Denormalization optimizes heavy read operations by storing pre-calculated aggregates.

### Q66 - Q69. Database Transactions & ACID.
`DB::transaction(callback, attempts)` wraps SQL statements in `BEGIN`/`COMMIT`. If an exception occurs, it issues `ROLLBACK` and retries up to `$attempts` on deadlocks.

### Q70 - Q74. Deadlocks & Locking Strategies.
- **Pessimistic Locking (`lockForUpdate()`):** Exclusive row lock blocking concurrent reads/writes (`SELECT ... FOR UPDATE`).
- **Optimistic Locking:** Uses `version` column check before saving without DB locks.

### Q75 - Q78. Query Optimization & Connection Pools.
Run `EXPLAIN ANALYZE`, index foreign keys, select specific columns (`select('id')`), and use connection proxies (ProxySQL) to avoid connection exhaustion.

---

## 5. Laravel Queues & Jobs

### Q79 - Q83. Queue Lifecycle & Dispatch.
`dispatch(new Job)` serializes payload into Redis/SQS. Background Queue Worker (`queue:work`) pops payload, deserializes Eloquent models (`SerializesModels`), and executes `handle()`.

### Q84 - Q87. ShouldQueue & Jobs vs Listeners.
`ShouldQueue` interface marks jobs/listeners for async deferred background execution.

### Q88 - Q92. Queue Workers & Horizon.
`queue:work` boots framework ONCE in memory. Laravel Horizon provides Redis queue monitoring dashboard, metrics, and auto-scaling worker pools.

### Q93 - Q99. Retries, Backoff & Failures.
- `$tries`: Attempt count limit.
- `$backoff = [10, 30, 60]`: Exponential delay seconds.
- `retryUntil()`: Time-based expiration.
- `$timeout`: Process kill threshold (`SIGALRM`).

### Q100 - Q105. Job Uniqueness & Payment Queue Design.
- `ShouldBeUnique` uses Redis locks to prevent duplicate job execution.
- Payment queues enforce idempotency keys, DB transactions, and pessimistic locking.

---

## 6 - 22 Summary Quick Reference

- **Events & Listeners (Q106-116):** Decouples domain actions. Async listeners implement `ShouldQueue`.
- **Cache & Redis (Q117-137):** Use `Cache::remember()`, `Cache::flexible()` for stampede protection, and `Cache::lock()` for distributed locking.
- **Auth (Q138-151):** Sanctum for SPAs/APIs; Passport for OAuth2; Gates/Policies for authorization.
- **API Development (Q152-166):** Transform via `JsonResource`, use `cursorPaginate()`, and enforce `X-Idempotency-Key`.
- **Security (Q167-180):** PDO parameter binding against SQLi, Blade escaping against XSS, `APP_DEBUG=false` in production.
- **Testing (Q189-204):** `RefreshDatabase` trait, `Mail::fake()`, `Queue::fake()`, container `$this->mock()`.
- **Performance (Q205-216):** Run `config:cache`, `route:cache`, `view:cache`. Use Laravel Octane (FrankenPHP) for 10k req/sec.
- **DevOps & Docker (Q217-239):** Deployer symlink swap for zero-downtime; Supervisor for queue workers; Docker multi-stage builds.
- **Microservices (Q240-251):** Async message queues (RabbitMQ), Saga pattern for transactions, Circuit Breaker for fault isolation.
- **Design Patterns (Q252-264):** Strategy, Factory, Decorator, Observer, Pipeline, Command, Specification.
- **Real-World Scenarios (Q271-280):** Atomic decrement (`WHERE stock > 0`) to prevent purchase overselling.
- **Leadership (Q281-295):** Pint formatting + Larastan Level 8 in CI; Strangler Fig pattern for legacy migrations.
- **Senior Coding Challenges (Q296-299):** N+1 fixes (`with()`), 10M record streaming (`lazyById()`), atomic DB transactions.

---
*Master Reference Guide generated for Senior & Lead Laravel Developer Preparation.*
