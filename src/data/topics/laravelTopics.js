import { createTopicSchema } from './createTopicSchema.js';

export const laravelTopics = {
    // 1. LARAVEL CORE & ARCHITECTURE
  "laravel-core-architecture": createTopicSchema({
    id: "laravel-core-architecture",
    techId: "laravel",
    title: "Laravel Core Architecture & Request Lifecycle",
    category: "Laravel Core & Architecture",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "15 min",
    prerequisites: ["php-basics"],
    definition: "The complete step-by-step request lifecycle in Laravel 12: from public/index.php (maintenance check & Composer autoloader), bootstrap/app.php container setup, Service Provider register() and boot() phases, Global & Route Middleware execution, to Controller action, View/JSON rendering, and Response termination.",
    simpleExplanation: "A 5-step lifecycle flow: 1) public/index.php receives the HTTP request, checks maintenance mode, and loads Composer. 2) bootstrap/app.php initializes the IoC Service Container and sets up route/middleware blueprints. 3) $app->handleRequest() runs Service Providers (register then boot). 4) Request passes through Global Middleware, matches a Route in web.php, passes Route Middleware, and executes the Controller. 5) Controller returns View/JSON response, sends it to the browser, and terminates.",
    whyDoesItExist: "Provides enterprise-grade dependency injection, predictable lifecycle phases, modular configuration, and clean separation between application bootstrapping and request execution.",
    basicExample: `// 1. Entry Point: public/index.php
define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

// 2. Application Blueprint: bootstrap/app.php
$app = require_once __DIR__.'/../bootstrap/app.php';

// 3. Request Processing Execution
$app->handleRequest(Request::capture());`,
    howItWorks: [
      "1. public/index.php: Starts performance timer (LARAVEL_START), checks storage/framework/maintenance.php, and loads Composer autoloader.",
      "2. bootstrap/app.php: Application::configure() initializes IoC Service Container and registers web.php routes, middleware, and exception blueprints.",
      "3. Service Providers: $app->handleRequest() runs register() (container bindings) then boot() (Auth Gates, Listeners) across all Service Providers.",
      "4. Middleware & Routing: Request enters Global Middleware pipeline -> Router matches URL in routes/web.php -> Route Middleware runs.",
      "5. Controller & Response: Controller action executes with Reflection Auto-Wiring -> returns Blade View or JSON -> Response sent to client -> terminate() cleanup runs."
    ],
    visualDiagram: `<svg viewBox="0 0 800 200" class="w-full bg-slate-900 rounded-lg p-3"><rect x="10" y="70" width="110" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="65" y="95" fill="#f87171" font-size="11" text-anchor="middle">public/index.php</text><text x="65" y="112" fill="#94a3b8" font-size="9" text-anchor="middle">Autoload & Maint</text><path d="M120 100 L150 100" stroke="#64748b" stroke-width="2"/><rect x="150" y="70" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="210" y="95" fill="#60a5fa" font-size="11" text-anchor="middle">bootstrap/app.php</text><text x="210" y="112" fill="#94a3b8" font-size="9" text-anchor="middle">Create Container</text><path d="M270 100 L300 100" stroke="#64748b" stroke-width="2"/><rect x="300" y="70" width="130" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="365" y="95" fill="#c084fc" font-size="11" text-anchor="middle">Service Providers</text><text x="365" y="112" fill="#94a3b8" font-size="9" text-anchor="middle">register() -> boot()</text><path d="M430 100 L460 100" stroke="#64748b" stroke-width="2"/><rect x="460" y="70" width="130" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="525" y="95" fill="#34d399" font-size="11" text-anchor="middle">Middleware & Route</text><text x="525" y="112" fill="#94a3b8" font-size="9" text-anchor="middle">Global & Route Stack</text><path d="M590 100 L620 100" stroke="#64748b" stroke-width="2"/><rect x="620" y="70" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="700" y="95" fill="#fbbf24" font-size="11" text-anchor="middle">Controller & Response</text><text x="700" y="112" fill="#94a3b8" font-size="9" text-anchor="middle">Action -> View -> Send</text></svg>`,
    realWorldExample: `// Real-World Service Provider (AppServiceProvider.php)
namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use App\\Services\\PaymentGatewayInterface;
use App\\Services\\StripePaymentGateway;
use Illuminate\\Support\\Facades\\Gate;
use App\\Models\\User;

class AppServiceProvider extends ServiceProvider {
    // STAGE 1: REGISTER PHASE - Bindings into IoC Container ONLY
    public function register(): void {
        $this->app->bind(PaymentGatewayInterface::class, StripePaymentGateway::class);
    }

    // STAGE 2: BOOT PHASE - Safe to call services, auth gates & event listeners
    public function boot(): void {
        Gate::define('admin-only', fn (User $user) => $user->is_admin === true);
    }
}`,
    commonUseCases: [
      "Building enterprise Laravel applications with clean architecture",
      "Binding abstractions to implementations via Service Providers",
      "Intercepting HTTP traffic with custom middleware pipelines"
    ],
    commonMistakes: [
      "Performing heavy logic or invoking other bindings inside ServiceProvider register()",
      "Calling env() outside of config/ files when config caching is enabled"
    ],
    bestPractices: [
      "Keep register() strictly for container bindings",
      "Use scoped() bindings in long-running processes (Octane) to avoid memory state leak"
    ],
    whenToUse: ["In all senior level Laravel system architectures"],
    whenNotToUse: ["N/A - Core architecture applies to all Laravel applications"],
    relatedConcepts: ["Service Container", "Service Providers", "Middleware", "Facades", "Contracts"],
    comparison: {
      title: "singleton() vs bind() vs scoped()",
      headers: ["Binding Type", "Lifecycle", "Use Case"],
      rows: [
        ["bind()", "New instance per resolve call", "Transient short-lived objects"],
        ["singleton()", "Single instance for application lifecycle", "Stateless global singletons"],
        ["scoped()", "Single instance per HTTP Request / Job cycle", "Request-bound state (Octane safe)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Explain register() vs boot() in a Service Provider.", answer: "register() is strictly for binding services into the container. boot() runs after all providers register, making it safe to resolve dependencies and register event listeners/routes." }
    ],
    practiceProblem: {
      description: "Write a Service Provider binding an PaymentInterface to StripeService as a singleton.",
      starterCode: `public function register(): void {\n  // Bind singleton here\n}`,
      testAssertion: "app(PaymentInterface::class) instanceof StripeService",
      solution: `public function register(): void {\n  $this->app->singleton(PaymentInterface::class, StripeService::class);\n}`
    },
    quickRevision: "⚡ Entry point: public/index.php -> maintenance check -> autoload -> bootstrap/app.php -> $app->handleRequest() -> Service Providers (register -> boot) -> Global Middleware -> Route Match -> Controller -> View -> Terminate."
  }),

  // 2. LARAVEL MVC & APPLICATION ARCHITECTURE
  "laravel-mvc-architecture": createTopicSchema({
    id: "laravel-mvc-architecture",
    techId: "laravel",
    title: "Enterprise Application Architecture: DTOs, Actions & Services",
    category: "Laravel MVC & Application Architecture",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Decoupling business logic from controllers into single-purpose Action classes, Data Transfer Objects (DTOs), and Domain Services.",
    simpleExplanation: "Prevents fat controllers and fat models by creating thin controllers that accept Form Requests, convert to DTOs, and delegate domain execution to invokable Action classes.",
    whyDoesItExist: "Keeps high-throughput applications testable, maintainable, and reusable across Web, API, CLI, and Queue channels.",
    basicExample: `// 1. Data Transfer Object (DTO)
readonly class CreateUserData {
    public function __construct(
        public string $name,
        public string $email,
        public string $password
    ) {}

    public static function fromRequest(RegisterRequest $request): self {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            password: $request->validated('password')
        );
    }
}

// 2. Action Class (Single Responsibility)
class CreateUserAction {
    public function __construct(protected MailerService $mailer) {}

    public function __invoke(CreateUserData $dto): User {
        return DB::transaction(function () use ($dto) {
            $user = User::create([
                'name' => $dto->name,
                'email' => $dto->email,
                'password' => Hash::make($dto->password),
            ]);

            $this->mailer->sendWelcome($user);
            return $user;
        });
    }
}`,
    howItWorks: [
      "1. Controller receives incoming FormRequest.",
      "2. Controller constructs DTO from validated request payload.",
      "3. Controller invokes Action class with DTO.",
      "4. Action performs business domain operations inside DB transaction.",
      "5. Action returns Domain Model/Resource back to Controller."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Thin Controller</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="300" y="95" fill="#34d399" font-size="12" text-anchor="middle">Typed DTO</text><path d="M370 90 L430 90" stroke="#64748b" stroke-width="2"/><rect x="430" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="510" y="95" fill="#f87171" font-size="12" text-anchor="middle">Invokable Action Class</text><path d="M590 90 L650 90" stroke="#64748b" stroke-width="2"/><rect x="650" y="60" width="120" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="710" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Eloquent / DB</text></svg>`,
    realWorldExample: `// Controller stays 3 lines long!
namespace App\\Http\\Controllers;

use App\\Http\\Requests\\RegisterRequest;
use App\\Actions\\CreateUserAction;
use App\\DTOs\\CreateUserData;
use App\\Http\\Resources\\UserResource;

class RegisterController extends Controller {
    public function __invoke(RegisterRequest $request, CreateUserAction $action): UserResource {
        $user = $action(CreateUserData::fromRequest($request));
        return new UserResource($user);
    }
}`,
    commonUseCases: [
      "Designing complex multi-tenant SaaS backends",
      "Reusing registration/checkout logic between API endpoints and CLI commands",
      "Writing clean unit tests targeting Action classes without HTTP mocks"
    ],
    commonMistakes: [
      "Placing payment processing or email dispatching directly inside Eloquent models",
      "Over-engineering simple CRUD operations with unnecessary Repositories"
    ],
    bestPractices: [
      "Use PHP 8.2+ readonly classes for DTOs",
      "Keep Action classes invokable with __invoke()"
    ],
    whenToUse: ["In all medium to large enterprise applications"],
    whenNotToUse: ["In tiny single-file prototype scripts"],
    relatedConcepts: ["DTO", "Action Classes", "Service Layer", "Form Requests", "Domain-Driven Design"],
    comparison: {
      title: "Fat Controller vs Action-Based Architecture",
      headers: ["Metric", "Fat Controller", "Action-Based Architecture"],
      rows: [
        ["Testability", "Difficult (requires HTTP context)", "Easy (Direct unit test on Action)"],
        ["Reusability", "Zero (locked to HTTP request)", "High (Callable from CLI/Queue/API)"],
        ["Maintainability", "Poor (1,000+ line controllers)", "High (Isolated 30-line classes)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How would you prevent fat controllers in a large codebase?", answer: "Delegate request validation to Form Requests, transfer data via DTOs, execute business logic in single-purpose Action classes, and return responses via API Resources." }
    ],
    practiceProblem: {
      description: "Define a readonly DTO class OrderData with public string $sku and public int $quantity.",
      starterCode: `readonly class OrderData {\n  // Constructor\n}`,
      testAssertion: "$dto->sku === 'ABC'",
      solution: `readonly class OrderData {\n  public function __construct(public string $sku, public int $quantity) {}\n}`
    },
    quickRevision: "★ Controller = Orchestrator only.\n★ DTO = Type-safe data payload.\n★ Action Class = Single responsibility business unit."
  }),

  // 3. ELOQUENT ORM - SENIOR LEVEL
  "laravel-eloquent-senior": createTopicSchema({
    id: "laravel-eloquent-senior",
    techId: "laravel",
    title: "Eloquent ORM Internals, N+1 Optimization & Polymorphic Relations",
    category: "Eloquent ORM — Senior Level",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["laravel-mvc-architecture"],
    definition: "Deep technical breakdown of Eloquent Active Record implementation, N+1 detection, eager loading strategies, observers, custom casts, and high-performance record streaming.",
    simpleExplanation: "Covers how Eloquent translates method calls to SQL grammar, prevents N+1 query bottlenecks using with() and Model::preventLazyLoading(), and streams millions of rows using cursor() and lazyById().",
    whyDoesItExist: "Prevents severe database performance degradation in high-concurrency production environments.",
    basicExample: `// High Performance Record Processing with lazyById()
use App\\Models\\User;

// Processes 1,000,000 users in 5,000 record chunks with minimal RAM footprint (<16MB)
User::where('status', 'pending')
    ->lazyById(5000)
    ->each(function (User $user) {
        $user->update(['status' => 'processed']);
    });`,
    howItWorks: [
      "1. Eloquent Model passes method call to Eloquent Builder.",
      "2. Eloquent Builder delegates raw SQL query generation to Query Grammar.",
      "3. Eager Loading (with()) converts relationship access into a single WHERE IN (...) SQL query.",
      "4. Cursor/Lazy Generators yield records one-by-one, keeping PDO memory usage near zero."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="100" y="95" fill="#f87171" font-size="12" text-anchor="middle">Eloquent Model</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="305" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Eloquent Builder</text><path d="M380 90 L440 90" stroke="#64748b" stroke-width="2"/><rect x="440" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="515" y="95" fill="#34d399" font-size="12" text-anchor="middle">Query Grammar</text><path d="M590 90 L650 90" stroke="#64748b" stroke-width="2"/><rect x="650" y="60" width="120" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="710" y="95" fill="#c084fc" font-size="12" text-anchor="middle">MySQL / PDO</text></svg>`,
    realWorldExample: `// Polymorphic One-to-Many Relationship Setup
class Comment extends Model {
    public function commentable(): MorphTo {
        return $this->morphTo();
    }
}

class Post extends Model {
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

class Video extends Model {
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }
}`,
    commonUseCases: [
      "Optimizing query execution speed across millions of database rows",
      "Building flexible polymorphic schema structures for comments/tags/attachments",
      "Enforcing multi-tenant isolation via custom Global Scopes"
    ],
    commonMistakes: [
      "Using chunk() while mutating records inside the loop (causes offset shifting and missed records!)",
      "Accessing relations inside a foreach loop without eager loading (N+1 query defect)"
    ],
    bestPractices: [
      "Use chunkById() or lazyById() instead of chunk() when mutating records",
      "Enable Model::preventLazyLoading(!app()->isProduction()) during local development"
    ],
    whenToUse: ["In all database persistence layers"],
    whenNotToUse: ["When executing bulk raw analytical queries where DB::statement() is faster"],
    relatedConcepts: ["N+1 Problem", "Eager Loading", "Polymorphic Relations", "Lazy Loading", "Cursor"],
    comparison: {
      title: "chunk() vs chunkById() vs cursor() vs lazy()",
      headers: ["Method", "SQL Technique", "Safe for Mutations?", "Memory Footprint"],
      rows: [
        ["chunk()", "LIMIT / OFFSET", "NO (Offset shift)", "Moderate"],
        ["chunkById()", "WHERE id > last_id", "YES", "Moderate"],
        ["cursor()", "Single SQL Stream", "YES", "Extremely Low"],
        ["lazy()", "LazyCollection Generator", "YES", "Low"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How would you process 10 million database records without memory exhaustion?", answer: "Use User::lazyById(5000) or cursor() with DB::disableQueryLog() to stream records using PHP generators without loading all records into memory." }
    ],
    practiceProblem: {
      description: "Write an Eloquent query to fetch all posts with their author relationship eager-loaded.",
      starterCode: `$posts = Post::query();`,
      testAssertion: "$posts->relationLoaded('author')",
      solution: `$posts = Post::with('author')->get();`
    },
    quickRevision: "★ N+1 Fix: Post::with('author')->get();\n★ Bulk Mutation: Use lazyById() or chunkById().\n★ Disable Query Log on mass operations."
  }),

  // 4. DATABASE & SQL
  "laravel-database-sql": createTopicSchema({
    id: "laravel-database-sql",
    techId: "laravel",
    title: "Advanced SQL Indexing, Deadlocks & Transaction Isolation",
    category: "Database & SQL",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "17 min",
    prerequisites: ["laravel-eloquent-senior"],
    definition: "Database indexing mechanics, composite index column ordering rules, transaction isolation levels, pessimistic locking (FOR UPDATE), and deadlock resolution in Laravel.",
    simpleExplanation: "Explains how B-Tree indexes speed up lookups, why column order matters in composite indexes, how DB::transaction handles automatic retries during deadlocks, and how pessimistic locks prevent race conditions.",
    whyDoesItExist: "Ensures data consistency and transactional integrity under concurrent high-concurrency loads.",
    basicExample: `// Transactional Isolation & Deadlock Retry Strategy
use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Account;

DB::transaction(function () use ($fromId, $toId, $amount) {
    // Lock rows exclusively to prevent concurrent updates
    $from = Account::where('id', $fromId)->lockForUpdate()->first();
    $to = Account::where('id', $toId)->lockForUpdate()->first();

    if ($from->balance < $amount) {
        throw new InsufficientBalanceException();
    }

    $from->decrement('balance', $amount);
    $to->increment('balance', $amount);
}, attempts: 5); // Automatically retries 5 times if MySQL deadlock occurs!`,
    howItWorks: [
      "1. DB::transaction starts a PDO transaction (BEGIN).",
      "2. lockForUpdate() appends SELECT ... FOR UPDATE, acquiring exclusive row locks.",
      "3. If deadlock occurs, Laravel catches QueryException (SQLState 40001) and retries.",
      "4. On successful completion, Laravel issues COMMIT."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="105" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">BEGIN Transaction</text><path d="M180 90 L240 90" stroke="#64748b" stroke-width="2"/><rect x="240" y="60" width="170" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="325" y="95" fill="#fbbf24" font-size="12" text-anchor="middle">lockForUpdate() Lock</text><path d="M410 90 L470 90" stroke="#64748b" stroke-width="2"/><rect x="470" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="545" y="95" fill="#34d399" font-size="12" text-anchor="middle">Execute Operations</text><path d="M620 90 L680 90" stroke="#64748b" stroke-width="2"/><rect x="680" y="60" width="90" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="725" y="95" fill="#c084fc" font-size="12" text-anchor="middle">COMMIT</text></svg>`,
    realWorldExample: `// Migration with Composite Index following Leftmost Prefix Rule
Schema::table('orders', function (Blueprint $table) {
    // Query: WHERE tenant_id = ? AND status = ? ORDER BY created_at
    $table->index(['tenant_id', 'status', 'created_at'], 'idx_tenant_status_created');
});`,
    commonUseCases: [
      "Preventing double-spending in financial ledger systems",
      "Designing composite database indexes for multi-tenant queries",
      "Analyzing slow database queries using EXPLAIN ANALYZE"
    ],
    commonMistakes: [
      "Creating composite index (A, B, C) and attempting to query WHERE B = 1 (violates leftmost prefix rule)",
      "Wrapping long-running external API calls inside DB transactions (causes database connection pool starvation)"
    ],
    bestPractices: [
      "Keep transactions short and fast; never perform HTTP calls inside DB::transaction()",
      "Always order composite index columns by high cardinality first"
    ],
    whenToUse: ["In all transactional relational database architectures"],
    whenNotToUse: ["When dealing with non-transactional document stores"],
    relatedConcepts: ["B-Tree Indexing", "Leftmost Prefix Rule", "Deadlocks", "ACID", "Pessimistic Locking"],
    comparison: {
      title: "Pessimistic vs Optimistic Locking",
      headers: ["Feature", "Pessimistic Locking (lockForUpdate)", "Optimistic Locking"],
      rows: [
        ["Lock Mechanism", "Exclusive DB Row Lock", "Version/Timestamp Check"],
        ["Concurrency", "Low (Threads Block)", "High (No DB Locks)"],
        ["Best Used For", "High-contention financial transactions", "Low-contention record updates"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the importance of column order in a composite index?", answer: "Indexes follow the Leftmost Prefix Rule. A composite index on (A, B, C) can only be used if the query filters by A, or (A, B), or (A, B, C). It cannot be used if filtering only by B or C." }
    ],
    practiceProblem: {
      description: "Write code to perform an atomic account deduction with 5 deadlock retries.",
      starterCode: `DB::transaction(function() {\n  // Code\n});`,
      testAssertion: "true",
      solution: `DB::transaction(function() {\n  Account::where('id', 1)->lockForUpdate()->decrement('balance', 100);\n}, 5);`
    },
    quickRevision: "★ Composite Index: (A, B, C) requires A in query.\n★ lockForUpdate() = Exclusive write lock.\n★ DB::transaction($callback, 5) auto-retries deadlocks."
  }),

  // 5. LARAVEL QUEUES & JOBS
  "laravel-queues-jobs": createTopicSchema({
    id: "laravel-queues-jobs",
    techId: "laravel",
    title: "Laravel Queues, Job Lifecycles & Horizon Monitoring",
    category: "Laravel Queues & Jobs",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Asynchronous job execution engine, queue worker architecture, job middleware, uniqueness constraints, failure strategies, and Redis Horizon metrics.",
    simpleExplanation: "Offloads heavy tasks like email dispatch, PDF rendering, or payment webhooks to background workers running queue:work or Horizon.",
    whyDoesItExist: "Ensures sub-100ms HTTP responses for end users by deferring non-blocking tasks to background worker pools.",
    basicExample: `// Enterprise Queued Job with Retries and Uniqueness
namespace App\\Jobs;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Contracts\\Queue\\ShouldBeUnique;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;

class ProcessPaymentJob implements ShouldQueue, ShouldBeUnique {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public array $backoff = [10, 30, 60]; // Exponential backoff in seconds
    public int $timeout = 120;

    public function __construct(public string $paymentId) {}

    public function uniqueId(): string {
        return $this->paymentId; // Prevents duplicate concurrent jobs for same payment
    }

    public function handle(PaymentGateway $gateway): void {
        $gateway->process($this->paymentId);
    }
}`,
    howItWorks: [
      "1. dispatch() serializes job properties into JSON payload.",
      "2. Payload is stored in Redis Queue list.",
      "3. Queue Worker (queue:work / Horizon) pops job payload.",
      "4. SerializesModels deserializes Eloquent models back from DB.",
      "5. handle() executes; if exception occurs, worker respects $tries and $backoff."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="130" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="95" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">dispatch(Job)</text><path d="M160 90 L220 90" stroke="#64748b" stroke-width="2"/><rect x="220" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="295" y="95" fill="#f87171" font-size="12" text-anchor="middle">Redis Queue Store</text><path d="M370 90 L430 90" stroke="#64748b" stroke-width="2"/><rect x="430" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="510" y="95" fill="#34d399" font-size="12" text-anchor="middle">Queue Worker Pool</text><path d="M590 90 L650 90" stroke="#64748b" stroke-width="2"/><rect x="650" y="60" width="120" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="710" y="95" fill="#c084fc" font-size="12" text-anchor="middle">handle() Call</text></svg>`,
    realWorldExample: `// Job Batching for 10,000 Emails
use Illuminate\\Support\\Facades\\Bus;

$batch = Bus::batch([
    new SendEmailJob($user1),
    new SendEmailJob($user2),
])->then(function (Batch $batch) {
    // All jobs completed successfully
})->catch(function (Batch $batch, Throwable $e) {
    // First job failure detected
})->finally(function (Batch $batch) {
    // Batch finished execution
})->dispatch();`,
    commonUseCases: [
      "Sending transactional emails and push notifications asynchronously",
      "Processing video encodings, PDF rendering, and export CSV generation",
      "Interfacing with third-party webhooks with retry policies"
    ],
    commonMistakes: [
      "Forgetting to restart queue workers (php artisan queue:restart) after code deployments",
      "Passing huge object graphs into Job constructors instead of lightweight IDs"
    ],
    bestPractices: [
      "Always implement ShouldBeUnique for idempotent payment jobs",
      "Use Laravel Horizon in production for auto-scaling queue worker pools"
    ],
    whenToUse: ["In all async background processing pipelines"],
    whenNotToUse: ["For synchronous user feedback operations where immediate response is required"],
    relatedConcepts: ["ShouldQueue", "ShouldBeUnique", "Horizon", "Queue Worker", "Job Middleware"],
    comparison: {
      title: "queue:work vs queue:listen",
      headers: ["Command", "Framework Boot", "Performance", "Production Ready"],
      rows: [
        ["queue:work", "Boots framework ONCE (Requires queue:restart on deploy)", "Extremely High", "YES"],
        ["queue:listen", "Boots framework on EVERY job", "Low", "NO (Dev only)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What happens if a worker code is updated in production without restarting workers?", answer: "Queue workers run continuously in memory. If not restarted with queue:restart, they will keep executing the old cached code from memory, ignoring new deployments." }
    ],
    practiceProblem: {
      description: "Define a job class SendInvoiceJob that implements ShouldQueue and sets $tries = 5.",
      starterCode: `class SendInvoiceJob {\n}`,
      testAssertion: "$job->tries === 5",
      solution: `class SendInvoiceJob implements ShouldQueue {\n  public int $tries = 5;\n}`
    },
    quickRevision: "★ Worker in Prod: Always use queue:work + Supervisor / Horizon.\n★ Post-deploy: Run php artisan queue:restart.\n★ Idempotency: Implement ShouldBeUnique."
  }),

  // 6. EVENTS & LISTENERS
  "laravel-events-listeners": createTopicSchema({
    id: "laravel-events-listeners",
    techId: "laravel",
    title: "Event-Driven Architecture & Decoupled Observers",
    category: "Events & Listeners",
    difficulty: "Intermediate",
    experienceBand: "3–8 years",
    readingTime: "12 min",
    prerequisites: ["laravel-queues-jobs"],
    definition: "Decoupling application components through domain events, listener discoverability, and queued event processing.",
    simpleExplanation: "Allows one domain action (e.g. OrderPlaced) to notify multiple independent listeners (SendEmail, UpdateInventory, NotifyAnalytics) without coupling them together.",
    whyDoesItExist: "Implements the Observer pattern, promoting Open/Closed design principle.",
    basicExample: `// Event Definition
namespace App\\Events;

use App\\Models\\Order;
use Illuminate\\Foundation\\Events\\Dispatchable;
use Illuminate\\Queue\\SerializesModels;

class OrderPlacedEvent {
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order) {}
}

// Listener implementing ShouldQueue for async execution
namespace App\\Listeners;

use App\\Events\\OrderPlacedEvent;
use Illuminate\\Contracts\\Queue\\ShouldQueue;

class SendOrderConfirmationListener implements ShouldQueue {
    public function handle(OrderPlacedEvent $event): void {
        Mail::to($event->order->user)->send(new OrderReceiptMail($event->order));
    }
}`,
    howItWorks: [
      "1. Event::dispatch(new OrderPlacedEvent($order)) is called.",
      "2. EventDispatcher checks EventServiceProvider mappings or Event Discovery.",
      "3. Dispatches event payload to synchronously or asynchronously queued listeners.",
      "4. Each listener executes independently."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="105" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Event::dispatch()</text><path d="M180 90 L240 90" stroke="#64748b" stroke-width="2"/><rect x="240" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="320" y="95" fill="#f87171" font-size="12" text-anchor="middle">Event Dispatcher</text><path d="M400 60 L480 30" stroke="#64748b" stroke-width="2"/><rect x="480" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="560" y="35" fill="#34d399" font-size="10" text-anchor="middle">Listener A (Email)</text><path d="M400 90 L480 90" stroke="#64748b" stroke-width="2"/><rect x="480" y="70" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="560" y="95" fill="#34d399" font-size="10" text-anchor="middle">Listener B (Inventory)</text><path d="M400 120 L480 150" stroke="#64748b" stroke-width="2"/><rect x="480" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="560" y="155" fill="#34d399" font-size="10" text-anchor="middle">Listener C (Analytics)</text></svg>`,
    realWorldExample: `// Stopping event propagation by returning false in a synchronous listener
public function handle(UserRegisteredEvent $event): bool {
    if ($event->user->isBlacklisted()) {
        return false; // Prevents subsequent listeners from running!
    }
    return true;
}`,
    commonUseCases: [
      "Decoupling side-effects from domain actions",
      "Broadcasting real-time WebSocket events via Laravel Reverb / Pusher",
      "Logging domain audit trails"
    ],
    commonMistakes: [
      "Putting core critical database transactions inside queued event listeners",
      "Returning false unexpectedly, halting remaining listeners in the event chain"
    ],
    bestPractices: [
      "Implement ShouldQueue on all non-essential listeners",
      "Use Event Discovery in modern Laravel apps instead of manual arrays"
    ],
    whenToUse: ["In event-driven application architectures"],
    whenNotToUse: ["For direct CRUD return calculations"],
    relatedConcepts: ["Event", "Listener", "ShouldQueue", "Observer", "Event Discovery"],
    comparison: {
      title: "Event vs Observer",
      headers: ["Concept", "Scope", "Coupling"],
      rows: [
        ["Event + Listener", "Broad Application Domain", "Decoupled domain boundaries"],
        ["Model Observer", "Tightly bound to Eloquent Model hooks", "Coupled to Model CRUD"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Can a Listener run asynchronously?", answer: "Yes, by implementing the Illuminate\\Contracts\\Queue\\ShouldQueue interface on the Listener class." }
    ],
    practiceProblem: {
      description: "Dispatch a custom UserLoggedIn event.",
      starterCode: `// Dispatch event\n`,
      testAssertion: "Event dispatched",
      solution: `UserLoggedIn::dispatch($user);`
    },
    quickRevision: "★ Event = Something happened.\n★ Listener = Response to event.\n★ Async Listener = implements ShouldQueue."
  }),

  // 7. LARAVEL CACHE
  "laravel-cache": createTopicSchema({
    id: "laravel-cache",
    techId: "laravel",
    title: "Laravel Caching Patterns, Cache Stampede & Redis Tags",
    category: "Laravel Cache",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "14 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Cache abstraction layer supporting Redis, Memcached, DynamoDB, Cache-Aside pattern, Cache Stampede protection, and Tagged caching.",
    simpleExplanation: "Stores expensive database query results or rendered views in high-speed RAM (Redis) to serve subsequent requests instantly.",
    whyDoesItExist: "Dramatically reduces database load and speeds up server response times under high traffic.",
    basicExample: `// Cache-Aside Pattern with Cache::remember()
use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\Product;

$topProducts = Cache::remember('products.top_10', 3600, function () {
    return Product::where('is_featured', true)
        ->orderByDesc('sales_count')
        ->take(10)
        ->get();
});`,
    howItWorks: [
      "1. Cache::remember checks if key 'products.top_10' exists in Redis.",
      "2. Cache HIT: Returns cached array instantly without hitting SQL database.",
      "3. Cache MISS: Executes closure DB query, saves result to Redis for 3,600s, and returns result."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">HTTP Request</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="305" y="95" fill="#f87171" font-size="12" text-anchor="middle">Redis Cache Check</text><path d="M380 60 L460 30" stroke="#10b981" stroke-width="2"/><rect x="460" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="540" y="35" fill="#34d399" font-size="10" text-anchor="middle">HIT: Return RAM Data</text><path d="M380 120 L460 150" stroke="#ef4444" stroke-width="2"/><rect x="460" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="540" y="155" fill="#f87171" font-size="10" text-anchor="middle">MISS: Query DB & Cache</text></svg>`,
    realWorldExample: `// Preventing Cache Stampede in Laravel 11 using Cache::flexible()
$userStats = Cache::flexible('user.stats.42', [500, 600], function () {
    return DB::table('stats')->where('user_id', 42)->first();
});`,
    commonUseCases: [
      "Caching static reference data (categories, countries, app settings)",
      "Storing session data and API rate-limiting counters",
      "Tag-based user cache invalidation (Cache::tags(['user-42'])->flush())"
    ],
    commonMistakes: [
      "Caching rapidly changing real-time data (financial account balances)",
      "Forgetting that Cache Tags are not supported by the 'file' or 'database' drivers"
    ],
    bestPractices: [
      "Always use Redis or Memcached in production",
      "Invalidate cache upon model mutation using Observers or Actions"
    ],
    whenToUse: ["In high-traffic read-heavy applications"],
    whenNotToUse: ["For real-time transactional balances"],
    relatedConcepts: ["Cache-Aside", "Cache Stampede", "Cache Tags", "Redis", "Cache::remember"],
    comparison: {
      title: "Cache Drivers Comparison",
      headers: ["Driver", "Speed", "Tags Supported?", "Production Recommendation"],
      rows: [
        ["Redis", "Ultra-Fast (In-Memory)", "YES", "RECOMMENDED"],
        ["Memcached", "Ultra-Fast", "NO", "Good for simple key-value"],
        ["File / DB", "Slow (Disk/SQL load)", "NO", "Local development only"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is cache stampede and how do you prevent it?", answer: "Cache stampede occurs when a high-traffic cache key expires, causing hundreds of concurrent requests to hit the database simultaneously. Prevent it using Redis locks or Laravel 11 Cache::flexible()." }
    ],
    practiceProblem: {
      description: "Write code to cache 'app_settings' for 1 hour.",
      starterCode: `// Cache code\n`,
      testAssertion: "Cache set",
      solution: `Cache::remember('app_settings', 3600, fn() => Setting::all());`
    },
    quickRevision: "★ Cache-aside: Cache::remember('key', $ttl, $callback);\n★ Tags: Requires Redis/Memcached.\n★ Flexible cache prevents stampede."
  }),

  // 8. REDIS
  "laravel-redis": createTopicSchema({
    id: "laravel-redis",
    techId: "laravel",
    title: "Redis Integration, Distributed Locks & Rate Limiting",
    category: "Redis",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["laravel-cache"],
    definition: "In-memory data structure store used for caching, queues, Pub/Sub, rate limiting, and atomic distributed locking.",
    simpleExplanation: "Provides ultra-fast RAM storage for session management, queue job payloads, and atomic distributed locks (Redis::lock()) to prevent race conditions across server nodes.",
    whyDoesItExist: "Delivers sub-millisecond data reads and provides atomic concurrency controls.",
    basicExample: `// Distributed Locking with Redis
use Illuminate\\Support\\Facades\\Cache;

$lock = Cache::lock('process_payout_user_42', 10); // 10-second lock auto-release TTL

if ($lock->get()) {
    try {
        // Critical section: Execute payout atomically across multiple server instances
    } finally {
        $lock->release();
    }
} else {
    // Lock could not be acquired; another worker is currently processing user 42!
}`,
    howItWorks: [
      "1. Cache::lock issues Redis SET key value NX PX 10000 command.",
      "2. If key exists (NX check fails), lock fails immediately.",
      "3. If key is missing, Redis sets key atomically and returns true.",
      "4. Lock release uses Lua script verifying token ownership before DEL."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Worker A</text><path d="M170 90 L230 90" stroke="#34d399" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="310" y="95" fill="#f87171" font-size="12" text-anchor="middle">Redis Lock (SET NX)</text><path d="M390 90 L450 90" stroke="#ef4444" stroke-width="2"/><rect x="450" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2"/><text x="520" y="95" fill="#94a3b8" font-size="12" text-anchor="middle">Worker B (Blocked)</text></svg>`,
    realWorldExample: `// Rate Limiting using Redis Sliding Window
use Illuminate\\Support\\Facades\\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});`,
    commonUseCases: [
      "Preventing concurrent processing of the same payment/order",
      "Serving high-throughput API rate limiters",
      "Powering real-time WebSockets with Redis Pub/Sub"
    ],
    commonMistakes: [
      "Forgetting to specify a lock TTL, causing deadlock if the worker crashes before release",
      "Using keys without namespace prefixes in shared Redis instances"
    ],
    bestPractices: [
      "Always wrap lock execution in try-finally blocks to guarantee release",
      "Use Redis Sentinel or Redis Cluster for production high-availability"
    ],
    whenToUse: ["In distributed horizontal auto-scaling environments"],
    whenNotToUse: ["As a persistent primary database store"],
    relatedConcepts: ["Distributed Lock", "Rate Limiter", "Redis Pub/Sub", "Redlock Algorithm"],
    comparison: {
      title: "Redis vs MySQL",
      headers: ["Feature", "Redis", "MySQL"],
      rows: [
        ["Storage Medium", "RAM (In-Memory)", "Disk (SSD/NVMe)"],
        ["Read Latency", "< 1 millisecond", "5 - 50 milliseconds"],
        ["Persistence", "Snapshot/AOF (Secondary)", "ACID Compliant (Primary)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How would you prevent two background workers from processing the same resource simultaneously?", answer: "Acquire an atomic distributed lock using Cache::lock('resource-key', $seconds). If lock->get() returns true, execute task and release lock in a finally block." }
    ],
    practiceProblem: {
      description: "Acquire a Redis lock for key 'export' for 5 seconds.",
      starterCode: `$lock = Cache::lock('export', 5);`,
      testAssertion: "Lock acquired",
      solution: `if ($lock->get()) { /* work */ $lock->release(); }`
    },
    quickRevision: "★ Lock Syntax: Cache::lock('key', 10)->get();\n★ Release: Always inside finally block.\n★ Atomic SET NX PX guarantees single winner."
  }),

  // 9. LARAVEL AUTHENTICATION & AUTHORIZATION
  "laravel-auth": createTopicSchema({
    id: "laravel-auth",
    techId: "laravel",
    title: "Authentication (Sanctum vs Passport) & Authorization (Gates & Policies)",
    category: "Laravel Authentication & Authorization",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Laravel authentication architecture (Guards & User Providers), token/session strategies (Sanctum vs Passport), and fine-grained authorization policies (Gates vs Policies).",
    simpleExplanation: "Authentication verifies WHO the user is (Session / Sanctum / Passport). Authorization determines WHAT the user is allowed to do (Gates & Policies).",
    whyDoesItExist: "Provides enterprise access control and API token security.",
    basicExample: `// Policy Definition (app/Policies/PostPolicy.php)
namespace App\\Policies;

use App\\Models\\User;
use App\\Models\\Post;

class PostPolicy {
    public function update(User $user, Post $post): bool {
        return $user->id === $post->user_id || $user->hasRole('admin');
    }
}

// Controller usage
public function update(Request $request, Post $post) {
    $this->authorize('update', $post); // Triggers PostPolicy@update
    $post->update($request->all());
}`,
    howItWorks: [
      "1. Auth Guard verifies incoming credentials/tokens against User Provider.",
      "2. Controller or Middleware invokes $this->authorize('action', $model).",
      "3. Gate evaluator looks up associated Policy class.",
      "4. If policy returns false, throws AuthorizationException (HTTP 403 Forbidden)."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">HTTP Request</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="305" y="95" fill="#f87171" font-size="12" text-anchor="middle">Auth Guard Check</text><path d="M380 90 L440 90" stroke="#64748b" stroke-width="2"/><rect x="440" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="520" y="95" fill="#34d399" font-size="12" text-anchor="middle">Policy Authorization</text><path d="M600 90 L660 90" stroke="#64748b" stroke-width="2"/><rect x="660" y="60" width="110" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="715" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Controller</text></svg>`,
    realWorldExample: `// Role-Based Access Control (RBAC) via Gate::before() super-admin bypass
Gate::before(function (User $user, string $ability) {
    if ($user->hasRole('super-admin')) {
        return true; // Grants all abilities automatically
    }
});`,
    commonUseCases: [
      "Securing REST APIs for mobile applications (Sanctum Tokens)",
      "Implementing multi-tenant role and permission systems",
      "Protecting domain actions via Policies"
    ],
    commonMistakes: [
      "Using OAuth2 Passport when lightweight Sanctum API tokens are sufficient",
      "Performing authorization checks inside Blade views without backend Policy enforcement"
    ],
    bestPractices: [
      "Use Sanctum for SPAs and mobile APIs; use Passport for third-party OAuth2 clients",
      "Always attach Policies to Models for maintainable authorization logic"
    ],
    whenToUse: ["In all applications requiring user login and permissions"],
    whenNotToUse: ["For completely public static content APIs"],
    relatedConcepts: ["Sanctum", "Passport", "Gates", "Policies", "Guards", "Providers"],
    comparison: {
      title: "Sanctum vs Passport",
      headers: ["Feature", "Laravel Sanctum", "Laravel Passport"],
      rows: [
        ["Complexity", "Lightweight & Simple", "Heavy (Full OAuth2 Server)"],
        ["Primary Use", "SPA Cookies & Simple API Tokens", "Third-Party OAuth2 Integration"],
        ["Database Overhead", "1 simple tokens table", "Multiple OAuth tables"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "When would you choose Sanctum over Passport?", answer: "Choose Sanctum for SPA authentication, mobile apps, and lightweight API token issuance. Choose Passport only when you need full OAuth2 server capabilities (authorization codes, client credentials, grant types) for third-party developers." }
    ],
    practiceProblem: {
      description: "Write code inside a Controller action to authorize updating a $post model.",
      starterCode: `public function update(Post $post) {\n  // Authorize\n}`,
      testAssertion: "Authorized",
      solution: `public function update(Post $post) {\n  $this->authorize('update', $post);\n}`
    },
    quickRevision: "★ Auth = Identity (Sanctum/Passport).\n★ Authz = Permissions (Gates/Policies).\n★ Sanctum = Lightweight; Passport = Full OAuth2."
  }),

  // 10. LARAVEL API DEVELOPMENT
  "laravel-api-development": createTopicSchema({
    id: "laravel-api-development",
    techId: "laravel",
    title: "Production REST API Design, API Resources & Idempotency",
    category: "Laravel API Development",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "17 min",
    prerequisites: ["laravel-auth"],
    definition: "Building enterprise RESTful APIs, versioning strategies, JsonResource transformation envelopes, rate limiting, and HTTP idempotency.",
    simpleExplanation: "Covers REST API best practices, URI versioning (/api/v1/), standard JSON envelopes, cursor pagination for large datasets, and Idempotency-Key headers for payment APIs.",
    whyDoesItExist: "Ensures API contract stability, security, high throughput, and seamless client integration.",
    basicExample: `// API Resource Transformation (app/Http/Resources/UserResource.php)
namespace App\\Http\\Resources;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toIso8601String(),
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
        ];
    }
}`,
    howItWorks: [
      "1. Controller fetches model with eager-loaded relationships.",
      "2. Returns new UserResource($user) or UserResource::collection($users).",
      "3. JsonResource formats payload into clean JSON envelope.",
      "4. whenLoaded() prevents N+1 query execution if relationship is missing."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Eloquent Model</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="310" y="95" fill="#34d399" font-size="12" text-anchor="middle">API JsonResource</text><path d="M390 90 L450 90" stroke="#64748b" stroke-width="2"/><rect x="450" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="530" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Clean JSON Envelope</text></svg>`,
    realWorldExample: `// Idempotency Middleware Implementation for Payment APIs
class EnforceIdempotency {
    public function handle(Request $request, Closure $next) {
        $key = $request->header('X-Idempotency-Key');
        if (!$key) return response()->json(['error' => 'Idempotency key missing'], 400);

        return Cache::lock("idempotency:$key", 10)->get(function () use ($request, $next, $key) {
            if ($response = Cache::get("response:$key")) {
                return response()->json($response['data'], $response['status']);
            }

            $response = $next($request);
            Cache::put("response:$key", ['data' => $response->getData(), 'status' => $response->getStatusCode()], 86400);
            return $response;
        }) ?: response()->json(['error' => 'Concurrent request in progress'], 409);
    }
}`,
    commonUseCases: [
      "Transforming raw database models into clean public JSON APIs",
      "Preventing duplicate charges on payment APIs using Idempotency keys",
      "Versioning API endpoints (/v1/ vs /v2/)"
    ],
    commonMistakes: [
      "Returning Eloquent models directly from controllers (exposes internal DB columns!)",
      "Using offset pagination on tables with millions of records (slow SQL query)"
    ],
    bestPractices: [
      "Always transform API responses using API Resources",
      "Use cursor pagination (User::cursorPaginate()) for large datasets"
    ],
    whenToUse: ["In all REST API developments"],
    whenNotToUse: ["For server-rendered Blade HTML views"],
    relatedConcepts: ["JsonResource", "Cursor Pagination", "API Versioning", "Idempotency", "Rate Limiting"],
    comparison: {
      title: "Offset vs Cursor Pagination",
      headers: ["Metric", "Offset Pagination (paginate)", "Cursor Pagination (cursorPaginate)"],
      rows: [
        ["SQL Generated", "LIMIT 15 OFFSET 100000 (Slow)", "WHERE id > 100000 LIMIT 15 (Fast)"],
        ["Performance", "Degrades as page number grows", "Constant O(1) performance"],
        ["Page Drift", "Suffer from skipped/duplicated rows", "Immune to page drift"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why use API Resources instead of returning Eloquent models directly?", answer: "API Resources decouple internal database schema from client JSON representations, hide secret attributes, enforce formatting, allow conditional relationship loading with whenLoaded(), and ensure API version contract stability." }
    ],
    practiceProblem: {
      description: "Return a collection of users formatted with UserResource.",
      starterCode: `return UserResource::collection(User::all());`,
      testAssertion: "Resource returned",
      solution: `return UserResource::collection(User::with('orders')->get());`
    },
    quickRevision: "★ Never return raw Models directly in APIs.\n★ Use cursorPaginate() for performance.\n★ Use Idempotency-Key headers on payments."
  }),

  // 11. LARAVEL SECURITY
  "laravel-security": createTopicSchema({
    id: "laravel-security",
    techId: "laravel",
    title: "Laravel Security Hardening, OWASP Mitigation & Encryption",
    category: "Laravel Security",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Mitigating OWASP Top 10 vulnerabilities (SQL Injection, XSS, CSRF, Mass Assignment), secure password storage, AES-256 encryption, and pre-deployment security checklists.",
    simpleExplanation: "Protects Laravel applications against web attacks using PDO prepared statements, Blade auto-escaping, CSRF tokens, Bcrypt/Argon2id password hashing, and encrypted payloads.",
    whyDoesItExist: "Safeguards user data, prevents data breaches, and ensures regulatory compliance.",
    basicExample: `// AES-256 Symmetric Encryption
use Illuminate\\Support\\Facades\\Crypt;

// Encrypt sensitive social security number before DB storage
$encrypted = Crypt::encryptString('123-45-6789');

// Decrypt value when authorized
$ssn = Crypt::decryptString($encrypted);`,
    howItWorks: [
      "1. Eloquent uses PDO prepared statements with bound parameters preventing SQL Injection.",
      "2. Blade {{ $var }} automatically passes output through htmlspecialchars().",
      "3. VerifyCsrfToken middleware checks X-CSRF-TOKEN against session value.",
      "4. Crypt facade uses AES-256-CBC with HMAC authentication using APP_KEY."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Input Payload</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="310" y="95" fill="#f87171" font-size="12" text-anchor="middle">Sanitizer & Escaping</text><path d="M390 90 L450 90" stroke="#64748b" stroke-width="2"/><rect x="450" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="530" y="95" fill="#34d399" font-size="12" text-anchor="middle">PDO Prepared Statement</text></svg>`,
    realWorldExample: `// Pre-Deployment Security Checklist:
// 1. APP_DEBUG=false
// 2. APP_ENV=production
// 3. php artisan config:cache
// 4. Force HTTPS via URL::forceScheme('https')
// 5. Restrict file permissions: storage/ and bootstrap/cache writable (775), code files (644)`,
    commonUseCases: [
      "Protecting against SQL Injection and XSS attacks",
      "Encrypting sensitive user PII in compliance with GDPR/HIPAA",
      "Securing user file uploads from arbitrary script execution"
    ],
    commonMistakes: [
      "Leaving APP_DEBUG=true in production (exposes environment secrets and DB passwords on errors!)",
      "Using {!! $raw !!} in Blade without sanitizing untrusted user input"
    ],
    bestPractices: [
      "Never turn on APP_DEBUG in production environments",
      "Store uploaded files outside public web root with randomized names"
    ],
    whenToUse: ["In all production web applications"],
    whenNotToUse: ["N/A - Security is mandatory"],
    relatedConcepts: ["SQL Injection", "XSS", "CSRF", "Argon2id", "Bcrypt", "AES-256"],
    comparison: {
      title: "Hashing vs Encryption",
      headers: ["Feature", "Hashing (Hash::make)", "Encryption (Crypt::encrypt)"],
      rows: [
        ["Reversibility", "One-Way (Irreversible)", "Two-Way (Reversible via APP_KEY)"],
        ["Primary Use", "Passwords & Security Tokens", "Sensitive Data (Credit cards / SSN)"],
        ["Algorithm", "Bcrypt / Argon2id", "AES-256-CBC"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does Laravel protect against SQL Injection?", answer: "Laravel's Eloquent ORM and Query Builder use PDO parameter binding for all queries, ensuring user inputs are treated as literal data parameters rather than executable SQL code." }
    ],
    practiceProblem: {
      description: "Write code to hash a password using Hash::make().",
      starterCode: `$hashed = '';`,
      testAssertion: "Password hashed",
      solution: `$hashed = Hash::make('secret-password');`
    },
    quickRevision: "★ Hashing = One-way (Passwords).\n★ Encryption = Reversible (AES-256).\n★ APP_DEBUG must ALWAYS be false in production."
  }),

  // 12. LARAVEL VALIDATION
  "laravel-validation": createTopicSchema({
    id: "laravel-validation",
    techId: "laravel",
    title: "Form Request Validation, Custom Rules & Array Validation",
    category: "Laravel Validation",
    difficulty: "Intermediate",
    experienceBand: "3–8 years",
    readingTime: "13 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Validation layer supporting Form Request classes, custom validation rules, nested array validation, and conditional rule execution.",
    simpleExplanation: "Encapsulates request authorization and validation logic into dedicated Form Request classes before requests reach controllers.",
    whyDoesItExist: "Prevents malformed data from reaching domain logic and ensures consistent HTTP 422 JSON error responses.",
    basicExample: `// Custom Form Request (app/Http/Requests/StoreOrderRequest.php)
namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;
use Illuminate\\Validation\\Rule;

class StoreOrderRequest extends FormRequest {
    public function authorize(): bool {
        return $this->user()->can('create', Order::class);
    }

    public function rules(): array {
        return [
            'customer_email' => ['required', 'email', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'payment_method' => ['required', Rule::in(['stripe', 'paypal'])],
        ];
    }
}`,
    howItWorks: [
      "1. Incoming HTTP request hits Controller method type-hinting StoreOrderRequest.",
      "2. FormRequest invokes authorize(). If false, returns 403 Forbidden.",
      "3. FormRequest validates input against rules(). If fails, auto-redirects or returns HTTP 422 JSON response.",
      "4. If valid, controller calls $request->validated()."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">HTTP Request</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="310" y="95" fill="#f87171" font-size="12" text-anchor="middle">Form Request Validation</text><path d="M390 60 L470 30" stroke="#ef4444" stroke-width="2"/><rect x="470" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="550" y="35" fill="#f87171" font-size="10" text-anchor="middle">FAIL: 422 JSON Error</text><path d="M390 120 L470 150" stroke="#10b981" stroke-width="2"/><rect x="470" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="550" y="155" fill="#34d399" font-size="10" text-anchor="middle">PASS: Controller Action</text></svg>`,
    realWorldExample: `// Custom Rule (php artisan make:rule Uppercase)
namespace App\\Rules;

use Closure;
use Illuminate\\Contracts\\Validation\\ValidationRule;

class Uppercase implements ValidationRule {
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (strtoupper($value) !== $value) {
            $fail('The :attribute must be uppercase.');
        }
    }
}`,
    commonUseCases: [
      "Validating complex nested array payloads from frontend forms",
      "Enforcing unique column constraints while updating records (Rule::unique()->ignore())",
      "Decoupling validation from controllers"
    ],
    commonMistakes: [
      "Using $request->all() instead of $request->validated() after validation",
      "Writing 50 lines of inline validation directly inside controller methods"
    ],
    bestPractices: [
      "Always use Form Request classes for multi-field inputs",
      "Always access validated data using $request->validated()"
    ],
    whenToUse: ["In all form submit and API input validation logic"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Form Request", "ValidationRule", "Rule::unique", "Nested Array Validation"],
    comparison: {
      title: "Inline Validation vs Form Request",
      headers: ["Feature", "Inline Validation ($request->validate)", "Form Request"],
      rows: [
        ["Location", "Inside Controller method", "Dedicated Request class"],
        ["Reusability", "Low", "High"],
        ["Authorization Hook", "Manual check needed", "Built-in authorize() method"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you validate unique values while updating a record?", answer: "Use Rule::unique('users')->ignore($user->id) to instruct the validator to ignore the current model's ID when checking for uniqueness." }
    ],
    practiceProblem: {
      description: "Write validation rule for items array with min 1 item.",
      starterCode: `$rules = [];`,
      testAssertion: "Rule created",
      solution: `$rules = ['items' => ['required', 'array', 'min:1']];`
    },
    quickRevision: "★ Form Request = Clean controllers.\n★ Validated Data = Always use $request->validated().\n★ Array validation: items.*.id."
  }),

  // 13. LARAVEL TESTING
  "laravel-testing": createTopicSchema({
    id: "laravel-testing",
    techId: "laravel",
    title: "Automated Testing: Unit, Feature, Mocking & Fakes",
    category: "Laravel Testing",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Testing strategy using PHPUnit/Pest, RefreshDatabase trait, Factories, Seeders, Mockery container mocks, and framework fakes (Mail::fake, Queue::fake, Event::fake).",
    simpleExplanation: "Provides automated testing guarantees for APIs, database persistence, queue jobs, and event dispatches using expressive test assertions.",
    whyDoesItExist: "Prevents regression bugs, allows confident refactoring, and ensures CI/CD pipeline stability.",
    basicExample: `// Feature Test for User Registration API
namespace Tests\\Feature;

use Tests\\TestCase;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Illuminate\\Support\\Facades\\Mail;
use App\\Mail\\WelcomeMail;

class RegistrationTest extends TestCase {
    use RefreshDatabase;

    public function test_user_can_register_successfully(): void {
        Mail::fake();

        $response = $this->postJson('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['data' => ['id', 'name', 'email']]);

        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
        Mail::assertSent(WelcomeMail::class);
    }
}`,
    howItWorks: [
      "1. RefreshDatabase trait runs migrations on test DB before test and rolls back after.",
      "2. Mail::fake() replaces Mailer binding with a fake memory object.",
      "3. postJson executes request through full Laravel HTTP stack.",
      "4. Assertions check HTTP status, JSON schema, DB persistence, and Mail dispatches."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Test Runner</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="310" y="95" fill="#f87171" font-size="12" text-anchor="middle">Framework Fakes</text><path d="M390 90 L450 90" stroke="#64748b" stroke-width="2"/><rect x="450" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="530" y="95" fill="#34d399" font-size="12" text-anchor="middle">RefreshDatabase</text></svg>`,
    realWorldExample: `// Dependency Mocking via Container Injection
public function test_payment_gateway_failure(): void {
    $this->mock(StripeGateway::class, function ($mock) {
        $mock->shouldReceive('charge')->once()->andThrow(new PaymentFailedException());
    });

    $response = $this->postJson('/api/v1/checkout');
    $response->assertStatus(422);
}`,
    commonUseCases: [
      "Testing API endpoints and JSON response contracts",
      "Verifying background Queue Jobs and Event listeners via Queue::fake()",
      "Mocking third-party payment gateways (Stripe/PayPal)"
    ],
    commonMistakes: [
      "Sending real emails or hitting real Stripe APIs during automated test runs",
      "Not using RefreshDatabase, leading to dirty state leaks between tests"
    ],
    bestPractices: [
      "Use Mail::fake(), Event::fake(), and Queue::fake() in all feature tests",
      "Target isolated pure logic with fast Unit tests; target API endpoints with Feature tests"
    ],
    whenToUse: ["In all software development projects"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["RefreshDatabase", "Factories", "Mocking", "Mail::fake", "Pest PHP"],
    comparison: {
      title: "Unit Test vs Feature Test",
      headers: ["Metric", "Unit Test", "Feature Test"],
      rows: [
        ["Scope", "Single isolated function/class", "Full HTTP request & DB flow"],
        ["Speed", "Ultra-Fast (<1ms)", "Slower (10-100ms)"],
        ["Database", "No DB access", "Uses RefreshDatabase"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you test third-party API dependencies without making live network requests?", answer: "Use $this->mock(GatewayClass::class) or Http::fake() to mock external HTTP calls and assert that specific request payloads were sent." }
    ],
    practiceProblem: {
      description: "Write code to fake Mail dispatching in a test.",
      starterCode: `// Fake mail\n`,
      testAssertion: "Mail faked",
      solution: `Mail::fake();`
    },
    quickRevision: "★ RefreshDatabase = Clean DB per test.\n★ Fakes: Mail::fake(), Queue::fake(), Event::fake().\n★ Http::fake() prevents external network calls."
  }),

  // 14. LARAVEL PERFORMANCE
  "laravel-performance": createTopicSchema({
    id: "laravel-performance",
    techId: "laravel",
    title: "Performance Optimization, Laravel Octane & High Throughput Scaling",
    category: "Laravel Performance",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Techniques for optimizing Laravel boot time, query performance, memory consumption, OPcache tuning, and scaling to 10,000+ requests/sec using Laravel Octane (FrankenPHP/Swoole).",
    simpleExplanation: "Covers configuration caching, query optimization, OPcache configuration, and in-memory persistent application servers (Octane) to achieve sub-5ms latency.",
    whyDoesItExist: "Maximizes throughput per server node and reduces cloud server costs.",
    basicExample: `// Production Optimization Commands Bundle
// 1. Cache configuration files into single PHP array
// php artisan config:cache

// 2. Cache route mappings into optimized routing table
// php artisan route:cache

// 3. Pre-compile Blade views
// php artisan view:cache

// 4. Optimize Composer autoloader
// composer dump-autoload -o --no-dev --classmap-authoritative`,
    howItWorks: [
      "1. config:cache flattens all config files into bootstrap/cache/config.php.",
      "2. OPcache compiles PHP scripts into bytecode in shared RAM.",
      "3. Laravel Octane boots framework ONCE in memory (Swoole/FrankenPHP), serving thousands of HTTP requests without re-booting PHP."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="110" y="95" fill="#f87171" font-size="12" text-anchor="middle">Standard PHP-FPM Boot</text><path d="M190 90 L250 90" stroke="#64748b" stroke-width="2"/><rect x="250" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="330" y="95" fill="#fbbf24" font-size="12" text-anchor="middle">Config & Route Cache</text><path d="M410 90 L470 90" stroke="#64748b" stroke-width="2"/><rect x="470" y="60" width="200" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="570" y="95" fill="#34d399" font-size="12" text-anchor="middle">Laravel Octane (Persistent RAM)</text></svg>`,
    realWorldExample: `// Benchmarking 10,000 req/sec architecture blueprint:
// Cloudflare WAF -> Nginx Load Balancer -> 4x Laravel Octane Workers (FrankenPHP) -> Redis Cluster -> MySQL Read/Write Replicas`,
    commonUseCases: [
      "Scaling APIs to handle viral high-traffic surges",
      "Reducing server latency from 80ms down to 4ms using Octane",
      "Profiling slow applications using Laravel Pulse or Telescope"
    ],
    commonMistakes: [
      "Leaving static state variables in singletons under Laravel Octane (causes cross-request data leaks!)",
      "Calling env() directly in application code when config:cache is active"
    ],
    bestPractices: [
      "Always run config:cache, route:cache, and view:cache during production deployment",
      "Use scoped() container bindings for request-specific state in Octane"
    ],
    whenToUse: ["In all production high-load deployments"],
    whenNotToUse: ["In local development"],
    relatedConcepts: ["Laravel Octane", "OPcache", "config:cache", "FrankenPHP", "Laravel Pulse"],
    comparison: {
      title: "PHP-FPM vs Laravel Octane",
      headers: ["Feature", "PHP-FPM", "Laravel Octane (FrankenPHP/Swoole)"],
      rows: [
        ["Lifecycle", "Boots framework on EVERY request", "Boots framework ONCE in memory"],
        ["Boot Overhead", "10 - 30 milliseconds", "0 milliseconds"],
        ["Throughput", "~500 req/sec per node", "~10,000+ req/sec per node"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does configuration caching improve Laravel boot time?", answer: "config:cache combines all individual config/*.php files into a single cached PHP array file. PHP loads this single cached file directly into OPcache memory, avoiding disk IO reads for dozens of config files." }
    ],
    practiceProblem: {
      description: "List the 3 artisan caching commands run on deployment.",
      starterCode: `// Commands\n`,
      testAssertion: "Commands listed",
      solution: `// php artisan config:cache && php artisan route:cache && php artisan view:cache`
    },
    quickRevision: "★ Production Deploy: config:cache, route:cache, view:cache.\n★ 10k req/sec: Use Laravel Octane + FrankenPHP.\n★ Octane Safety: Use scoped() bindings."
  }),

  // 15. LARAVEL DEPLOYMENT & DEVOPS
  "laravel-deployment-devops": createTopicSchema({
    id: "laravel-deployment-devops",
    techId: "laravel",
    title: "Production Deployment, Zero-Downtime Swaps & Nginx Setup",
    category: "Laravel Deployment & DevOps",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["laravel-performance"],
    definition: "Production deployment workflows, zero-downtime symlink deployments, Nginx server block configuration, PHP-FPM process management, and Supervisor queue monitoring.",
    simpleExplanation: "Covers how to deploy Laravel to production seamlessly using Deployer/Envoyer symlink swaps, Nginx try_files rules, and Supervisor daemon management.",
    whyDoesItExist: "Prevents service downtime during application deployments and ensures 99.99% system uptime.",
    basicExample: `# Supervisor Configuration for Laravel Queue Workers (/etc/supervisor/conf.d/laravel-worker.conf)
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/app/current/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=8
redirect_stderr=true
stdout_logfile=/var/www/app/current/storage/logs/worker.log`,
    howItWorks: [
      "1. Deployment script pulls git code into timestamped release folder (/releases/20260814120000).",
      "2. Installs composer dependencies (--no-dev -o) and compiles assets.",
      "3. Runs DB migrations safely and executes artisan config:cache.",
      "4. Atomically updates symlink /var/www/app/current -> new release folder.",
      "5. Issues php artisan queue:restart and reloads PHP-FPM."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="110" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Release 2026-08-14</text><path d="M190 90 L250 90" stroke="#10b981" stroke-width="2"/><rect x="250" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="330" y="95" fill="#34d399" font-size="12" text-anchor="middle">Symlink /current Swap</text><path d="M410 90 L470 90" stroke="#64748b" stroke-width="2"/><rect x="470" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="545" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Nginx / public</text></svg>`,
    realWorldExample: `# Standard Nginx Location Block for Laravel
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \\.php$ {
    fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
}`,
    commonUseCases: [
      "Executing zero-downtime continuous deployment pipelines",
      "Configuring Supervisor to auto-restart crashed queue workers",
      "Setting up Nginx web servers behind Cloudflare load balancers"
    ],
    commonMistakes: [
      "Deploying breaking database schema migrations before code deployment",
      "Setting storage/ folder permissions to 777 instead of 775/755 owned by www-data"
    ],
    bestPractices: [
      "Use symlink-based zero-downtime deployment tools like Deployer or Envoyer",
      "Always issue php artisan queue:restart after updating code"
    ],
    whenToUse: ["In all production server deployments"],
    whenNotToUse: ["Local dev"],
    relatedConcepts: ["Zero-Downtime Deployment", "Supervisor", "Nginx", "PHP-FPM", "Symlink Swap"],
    comparison: {
      title: "Direct Git Pull vs Zero-Downtime Symlink Deployment",
      headers: ["Feature", "Direct Git Pull", "Zero-Downtime Symlink Swap"],
      rows: [
        ["Downtime", "5 - 30 seconds during composer install", "0 seconds (Atomic symlink swap)"],
        ["Rollback", "Slow (git checkout & composer install)", "Instant (Swap symlink to previous release)"],
        ["Production Safety", "Unsafe", "Industry Standard"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is Supervisor necessary when running Laravel queue workers?", answer: "Laravel queue:work is a long-running process. If a worker crashes due to memory exhaustion or a fatal error, Supervisor automatically restarts the worker process instantly, maintaining queue processing uptime." }
    ],
    practiceProblem: {
      description: "Write the command to restart queue workers post-deployment.",
      starterCode: `// Command\n`,
      testAssertion: "Command correct",
      solution: `php artisan queue:restart`
    },
    quickRevision: "★ Deployer: Atomic symlink swap = Zero downtime.\n★ Supervisor: Keeps queue:work processes alive.\n★ Permissions: 775 for storage & bootstrap/cache."
  }),

  // 16. DOCKER & LARAVEL
  "laravel-docker": createTopicSchema({
    id: "laravel-docker",
    techId: "laravel",
    title: "Containerization: Multi-Container Docker Architecture",
    category: "Docker & Laravel",
    difficulty: "Advanced",
    experienceBand: "5–8+ years",
    readingTime: "15 min",
    prerequisites: ["laravel-deployment-devops"],
    definition: "Containerizing Laravel applications using Docker, Docker Compose, multi-stage builds, PHP-FPM vs Worker containers, and worker scaling.",
    simpleExplanation: "Packages Laravel app, Nginx, MySQL, and Redis into reproducible Docker containers running identically across development, staging, and production.",
    whyDoesItExist: "Eliminates 'works on my machine' issues and enables seamless cloud scaling on Kubernetes/AWS ECS.",
    basicExample: `# docker-compose.yml for Enterprise Laravel
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: laravel-app:latest
    restart: unless-stopped
    volumes:
      - .:/var/www/html
    networks:
      - laravel-net

  webserver:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - .:/var/www/html
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
    networks:
      - laravel-net

  worker:
    image: laravel-app:latest
    command: php artisan queue:work redis --tries=3
    restart: unless-stopped
    networks:
      - laravel-net

networks:
  laravel-net:
    driver: bridge`,
    howItWorks: [
      "1. Dockerfile builds PHP-FPM base image with required extensions (pdo_mysql, redis, opcache).",
      "2. Webserver container proxies HTTP requests to PHP-FPM container on port 9000.",
      "3. Worker container reuses the app image executing php artisan queue:work."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="130" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="95" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Nginx Container</text><path d="M160 90 L220 90" stroke="#64748b" stroke-width="2"/><rect x="220" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="295" y="95" fill="#34d399" font-size="12" text-anchor="middle">PHP-FPM Container</text><path d="M370 90 L430 90" stroke="#64748b" stroke-width="2"/><rect x="430" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="505" y="95" fill="#f87171" font-size="12" text-anchor="middle">Queue Worker</text><path d="M580 90 L640 90" stroke="#64748b" stroke-width="2"/><rect x="640" y="60" width="120" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="700" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Redis DB</text></svg>`,
    realWorldExample: `// Multi-stage Dockerfile snippet for small production image (<100MB)
FROM php:8.3-fpm-alpine as builder
WORKDIR /app
COPY . .
RUN composer install --no-dev -o

FROM php:8.3-fpm-alpine
COPY --from=builder /app /var/www/html`,
    commonUseCases: [
      "Standardizing dev/prod environment dependencies",
      "Scaling queue workers using docker compose up --scale worker=5",
      "Deploying to Kubernetes clusters"
    ],
    commonMistakes: [
      "Running composer install without --no-dev in production images",
      "Storing persistent upload files inside container filesystems without Docker volume mounts"
    ],
    bestPractices: [
      "Use multi-stage Docker builds to keep image sizes tiny",
      "Reuse the main application image for worker container instances"
    ],
    whenToUse: ["In modern cloud container deployments"],
    whenNotToUse: ["Simple shared hosting environments"],
    relatedConcepts: ["Docker", "Docker Compose", "Multi-stage Build", "Kubernetes"],
    comparison: {
      title: "PHP-FPM vs Queue Worker Container",
      headers: ["Metric", "PHP-FPM Container", "Queue Worker Container"],
      rows: [
        ["Base Image", "Same Application Image", "Same Application Image"],
        ["Command", "php-fpm", "php artisan queue:work"],
        ["Scaling Target", "HTTP traffic scale", "Queue depth scale"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do PHP-FPM container and Queue Worker container differ in a Laravel Docker architecture?", answer: "Both containers share the exact same application base image and dependencies, but execute different entrypoint commands: PHP-FPM handles web requests, while the Worker container executes php artisan queue:work." }
    ],
    practiceProblem: {
      description: "Scale queue workers to 4 using Docker Compose.",
      starterCode: `# Command\n`,
      testAssertion: "Scaled",
      solution: `docker compose up --scale worker=4 -d`
    },
    quickRevision: "★ Same image for Web & Workers.\n★ Web entry: php-fpm; Worker entry: php artisan queue:work.\n★ Use multi-stage builds for small images."
  }),

  // 17. LARAVEL + MICROSERVICES
  "laravel-microservices": createTopicSchema({
    id: "laravel-microservices",
    techId: "laravel",
    title: "Microservices Architecture, Saga Pattern & Eventual Consistency",
    category: "Laravel + Microservices",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["laravel-queues-jobs"],
    definition: "Decomposing monoliths into autonomous microservices, inter-service communication (REST, gRPC, RabbitMQ), Saga pattern for distributed transactions, and API Gateways.",
    simpleExplanation: "Splits a large application into distinct microservices (Order Service, Payment Service, Notification Service) communicating asynchronously via message brokers with eventual consistency.",
    whyDoesItExist: "Enables independent scaling, team autonomy, and isolated deployment lifecycles for massive enterprise applications.",
    basicExample: `// Event-Driven Inter-Service Communication via Message Broker (RabbitMQ)
namespace App\\Services;

use App\\Events\\OrderCreatedEvent;
use Enqueue\\LaravelQueue\\Publisher;

class OrderService {
    public function createOrder(OrderData $dto): Order {
        $order = Order::create([...]);

        // Publish event to RabbitMQ message exchange
        Publisher::publish('orders.exchange', new OrderCreatedEvent($order->id, $order->total));

        return $order;
    }
}`,
    howItWorks: [
      "1. Client sends request to API Gateway.",
      "2. API Gateway routes request to Order Service.",
      "3. Order Service creates order and publishes OrderCreated event to RabbitMQ.",
      "4. Payment Service consumes event, processes charge, and publishes PaymentSucceeded.",
      "5. System achieves Eventual Consistency across decoupled databases."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="90" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">API Gateway</text><path d="M150 90 L210 90" stroke="#64748b" stroke-width="2"/><rect x="210" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="280" y="95" fill="#34d399" font-size="12" text-anchor="middle">Order Service</text><path d="M350 90 L410 90" stroke="#64748b" stroke-width="2"/><rect x="410" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="485" y="95" fill="#f87171" font-size="12" text-anchor="middle">RabbitMQ Broker</text><path d="M560 90 L620 90" stroke="#64748b" stroke-width="2"/><rect x="620" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="695" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Payment Service</text></svg>`,
    realWorldExample: `// Circuit Breaker Pattern protecting against downstream service failure
use GuzzleHttp\\Client;

class PaymentServiceAdapter {
    public function charge(array $payload) {
        return CircuitBreaker::call('payment_service', function () use ($payload) {
            return $this->client->post('https://payment-service/api/charge', ['json' => $payload]);
        }, fallback: function () {
            return ['status' => 'queued_for_retry'];
        });
    }
}`,
    commonUseCases: [
      "Scaling high-load order/payment ecosystems",
      "Isolating domain boundaries across large engineering teams",
      "Implementing eventual consistency across distributed databases"
    ],
    commonMistakes: [
      "Choosing microservices prematurely for early-stage startups (adds massive DevOps overhead!)",
      "Performing synchronous HTTP REST calls between 10 microservices in a single user request chain"
    ],
    bestPractices: [
      "Use asynchronous messaging (RabbitMQ/Kafka) for inter-service communication",
      "Implement Saga Orchestration for multi-service transactions with compensating rollbacks"
    ],
    whenToUse: ["In large enterprise organizations with 50+ engineers"],
    whenNotToUse: ["In small teams or early-stage applications (use Modular Monolith instead!)"],
    relatedConcepts: ["Saga Pattern", "Eventual Consistency", "API Gateway", "Circuit Breaker", "gRPC"],
    comparison: {
      title: "Monolith vs Microservices",
      headers: ["Aspect", "Monolith", "Microservices"],
      rows: [
        ["Data Storage", "Single Centralized Database", "Database-Per-Service"],
        ["Transactions", "ACID Database Transactions", "Distributed Saga / Eventual Consistency"],
        ["DevOps Complexity", "Low", "High"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you manage distributed transactions across microservices without 2-phase commit?", answer: "Use the Saga Pattern (Choreography or Orchestration). Each service updates its local database and emits a domain event. If a downstream step fails, compensating transactions are dispatched backwards to undo previous local transactions." }
    ],
    practiceProblem: {
      description: "Define a fallback closure for a Circuit Breaker call.",
      starterCode: `$fallback = function() {};`,
      testAssertion: "Fallback defined",
      solution: `$fallback = fn() => ['status' => 'degraded_mode'];`
    },
    quickRevision: "★ Monolith -> Microservices: Only when team/scale requires it.\n★ Inter-service: Prefer Async Messaging (RabbitMQ/Kafka).\n★ Transactions: Use Saga Pattern with compensating actions."
  }),

  // 18. DESIGN PATTERNS IN LARAVEL
  "laravel-design-patterns": createTopicSchema({
    id: "laravel-design-patterns",
    techId: "laravel",
    title: "Design Patterns in Laravel: Strategy, Factory, Decorator & Pipeline",
    category: "Design Patterns",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "17 min",
    prerequisites: ["laravel-mvc-architecture"],
    definition: "Practical implementation of GoF design patterns in Laravel (Singleton, Factory, Strategy, Repository, Observer, Adapter, Decorator, Facade, Pipeline, Command, Specification).",
    simpleExplanation: "Demonstrates how standard software design patterns (Strategy, Factory, Decorator) solve real architectural challenges in Laravel codebases.",
    whyDoesItExist: "Provides reusable, battle-tested solutions to recurring software architecture problems.",
    basicExample: `// Strategy Pattern for Multi-Provider Payment Processing
interface PaymentStrategy {
    public function charge(float $amount): PaymentResult;
}

class StripeStrategy implements PaymentStrategy {
    public function charge(float $amount): PaymentResult {
        // Stripe API charge implementation
        return new PaymentResult(success: true, txId: 'ch_stripe_123');
    }
}

class PaypalStrategy implements PaymentStrategy {
    public function charge(float $amount): PaymentResult {
        // PayPal API charge implementation
        return new PaymentResult(success: true, txId: 'PAYPAL-999');
    }
}

// Payment Context Factory
class PaymentProcessor {
    public function process(string $driver, float $amount): PaymentResult {
        $strategy = match($driver) {
            'stripe' => app(StripeStrategy::class),
            'paypal' => app(PaypalStrategy::class),
            default => throw new InvalidArgumentException("Unsupported driver {$driver}"),
        };

        return $strategy->charge($amount);
    }
}`,
    howItWorks: [
      "1. Interface defines unified contract (PaymentStrategy).",
      "2. Concrete classes implement specific logic (StripeStrategy, PaypalStrategy).",
      "3. Context class dynamically selects concrete strategy at runtime without breaking Open/Closed Principle."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Payment Context</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="310" y="95" fill="#f87171" font-size="12" text-anchor="middle">PaymentStrategy</text><path d="M390 60 L470 30" stroke="#64748b" stroke-width="2"/><rect x="470" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="550" y="35" fill="#34d399" font-size="10" text-anchor="middle">StripeStrategy</text><path d="M390 120 L470 150" stroke="#64748b" stroke-width="2"/><rect x="470" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="550" y="155" fill="#34d399" font-size="10" text-anchor="middle">PaypalStrategy</text></svg>`,
    realWorldExample: `// Decorator Pattern to transparently wrap a service with caching
class CachingUserRepository implements UserRepositoryInterface {
    public function __construct(
        protected UserRepositoryInterface $next,
        protected CacheRepository $cache
    ) {}

    public function findById(int $id): User {
        return $this->cache->remember("user:$id", 3600, fn() => $this->next->findById($id));
    }
}`,
    commonUseCases: [
      "Using Strategy Pattern to switch between notification channels or payment gateways",
      "Using Decorator Pattern to add caching/logging transparently to services",
      "Using Pipeline Pattern for multi-step request processing or data transformations"
    ],
    commonMistakes: [
      "Using design patterns for simple problems where simple code is cleaner",
      "Creating excessive interfaces for classes that will never have multiple implementations"
    ],
    bestPractices: [
      "Apply the Strategy pattern whenever conditional if-else checks select different algorithmic behaviors",
      "Use Laravel's built-in Illuminate\\Pipeline\\Pipeline for multi-step processing"
    ],
    whenToUse: ["In enterprise domain architectures"],
    whenNotToUse: ["For simple 5-line script logic"],
    relatedConcepts: ["Strategy Pattern", "Factory Pattern", "Decorator Pattern", "Pipeline Pattern", "Adapter"],
    comparison: {
      title: "Strategy vs Adapter vs Decorator",
      headers: ["Pattern", "Purpose", "Structure"],
      rows: [
        ["Strategy", "Interchangeable algorithms", "Multiple implementations of same interface"],
        ["Adapter", "Interface translation", "Wraps incompatible 3rd-party class"],
        ["Decorator", "Add dynamic responsibility", "Wraps object implementing SAME interface"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Give a real project example where you used the Strategy design pattern in Laravel.", answer: "In a multi-currency payment backend, I used Strategy pattern where Stripe, PayPal, and Razorpay implemented a PaymentGatewayInterface. A factory resolved the appropriate strategy dynamically based on user currency." }
    ],
    practiceProblem: {
      description: "Write a match statement selecting a strategy based on driver string.",
      starterCode: `$strategy = match($driver) {};`,
      testAssertion: "Match written",
      solution: `$strategy = match($driver) { 'stripe' => new StripeStrategy(), default => new DefaultStrategy() };`
    },
    quickRevision: "★ Strategy: Interchangeable algorithms.\n★ Decorator: Wraps object to add behavior.\n★ Pipeline: Passes object through series of stops."
  }),

  // 19. SYSTEM DESIGN QUESTIONS
  "laravel-system-design": createTopicSchema({
    id: "laravel-system-design",
    techId: "laravel",
    title: "System Design: Scaling 1M Req/Day, High-Traffic & Payment Systems",
    category: "System Design Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "20 min",
    prerequisites: ["laravel-performance", "laravel-redis"],
    definition: "End-to-end system design solutions for e-commerce platforms, multi-channel notification engines, high-traffic APIs, and 1 million requests/day load balanced architectures.",
    simpleExplanation: "Detailed architectural blueprints covering Load Balancers, Laravel Octane server pools, Redis Cluster, MySQL Read/Write Replicas, and Queue Worker scaling.",
    whyDoesItExist: "Demonstrates senior/lead level ability to architect robust enterprise web systems.",
    basicExample: `// High-Traffic System Design Architecture Blueprint (1M+ Requests/Day)
//
//               [ Cloudflare WAF / CDN ]
//                          │
//               [ Nginx Load Balancer ]
//             ┌────────────┴────────────┐
//             ▼                         ▼
//   [ Laravel App Node 1 ]    [ Laravel App Node 2 ]  (Octane / FrankenPHP)
//             │                         │
//             ├─────────────────────────┼────────────────────────┐
//             ▼                         ▼                        ▼
//     [ Redis Cluster ]    [ MySQL Primary (Writes) ]   [ MySQL Replica (Reads) ]
//   (Cache/Locks/Queues)                │
//             │                         ▼
//             └──────────────► [ Horizon Worker Pool ] (8 Worker Nodes)`,
    howItWorks: [
      "1. Cloudflare WAF absorbs DDoS traffic and caches static assets.",
      "2. Nginx Load Balancer distributes round-robin HTTP traffic across Octane nodes.",
      "3. App Nodes read static/cached data from Redis Cluster and read replicas.",
      "4. Write transactions execute exclusively against Primary MySQL.",
      "5. Async jobs (notifications, analytics) are processed by Horizon worker pools."
    ],
    visualDiagram: `<svg viewBox="0 0 800 200" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="80" width="130" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="95" y="105" fill="#60a5fa" font-size="11" text-anchor="middle">Cloudflare CDN</text><path d="M160 100 L210 100" stroke="#64748b" stroke-width="2"/><rect x="210" y="80" width="130" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="275" y="105" fill="#60a5fa" font-size="11" text-anchor="middle">Nginx Load Balancer</text><path d="M340 70 L400 40" stroke="#64748b" stroke-width="2"/><rect x="400" y="20" width="140" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="470" y="45" fill="#34d399" font-size="11" text-anchor="middle">Octane Node 1</text><path d="M340 130 L400 160" stroke="#64748b" stroke-width="2"/><rect x="400" y="140" width="140" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="470" y="165" fill="#34d399" font-size="11" text-anchor="middle">Octane Node 2</text><path d="M540 40 L620 40" stroke="#64748b" stroke-width="2"/><rect x="620" y="20" width="140" height="40" rx="6" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="690" y="45" fill="#f87171" font-size="11" text-anchor="middle">Redis Cluster</text><path d="M540 160 L620 160" stroke="#64748b" stroke-width="2"/><rect x="620" y="140" width="140" height="40" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="690" y="165" fill="#c084fc" font-size="11" text-anchor="middle">MySQL Replicas</text></svg>`,
    realWorldExample: `// Multi-Channel Notification Strategy Blueprint (Email, SMS, Push, WhatsApp)
// Strategy Pattern selects channel -> Queued to Channel-Specific Horizon Queues (emails-queue, sms-queue, whatsapp-queue)`,
    commonUseCases: [
      "Architecting e-commerce platforms handling Black Friday traffic spikes",
      "Designing multi-channel notification delivery engines",
      "Scaling Laravel APIs to serve 1,000,000+ daily active users"
    ],
    commonMistakes: [
      "Using a single database server for both reads and writes during high traffic",
      "Forgetting to decouple slow third-party API dependencies into background queues"
    ],
    bestPractices: [
      "Separate database read and write traffic using master-replica setup",
      "Use Redis for session storage and rate limiting across load-balanced nodes"
    ],
    whenToUse: ["In high-scale enterprise application planning"],
    whenNotToUse: ["For low-traffic internal admin apps"],
    relatedConcepts: ["Load Balancers", "Read Replicas", "Redis Cluster", "System Design", "Octane"],
    comparison: {
      title: "Single Server vs Scaled Architecture",
      headers: ["Metric", "Single Monolithic Server", "Scaled Load-Balanced Architecture"],
      rows: [
        ["Capacity", "< 100,000 req/day", "10,000,000+ req/day"],
        ["Single Point of Failure", "YES (Server crash downs app)", "NO (Redundant nodes)"],
        ["Database Read Load", "100% hits Primary DB", "Offloaded to Read Replicas"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How would you design a high-traffic Laravel architecture handling 1 million requests/day?", answer: "Place Cloudflare CDN in front -> Nginx Load Balancer -> Auto-scaling pool of Laravel Octane instances -> Redis Cluster for caching/sessions/queues -> MySQL Primary for writes with multiple Read Replicas -> Horizon queue worker pool." }
    ],
    practiceProblem: {
      description: "Define read and write connections in config/database.php.",
      starterCode: `'mysql' => [\n  // config\n]`,
      testAssertion: "Read write configured",
      solution: `'mysql' => ['read' => ['host' => 'replica.db'], 'write' => ['host' => 'master.db']]`
    },
    quickRevision: "★ CDN -> Load Balancer -> Octane App Nodes -> Redis -> Master DB + Read Replicas.\n★ Read Offload: Configure read/write connections in database.php."
  }),

  // 20. REAL-WORLD SCENARIO QUESTIONS
  "laravel-realworld-scenarios": createTopicSchema({
    id: "laravel-realworld-scenarios",
    techId: "laravel",
    title: "Production Incident Debugging, 100% CPU & Memory Leaks",
    category: "Real-World Scenario Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "18 min",
    prerequisites: ["laravel-performance"],
    definition: "Debugging complex production incidents: 5-second slow APIs, 100% database CPU usage, failing queue workers, duplicate email sends, simultaneous purchase overselling, and 2GB RAM queue memory leaks.",
    simpleExplanation: "Step-by-step diagnostic workflows for investigating and resolving high-severity production outage scenarios.",
    whyDoesItExist: "Tests real-world senior troubleshooting capabilities under production incident pressure.",
    basicExample: `// Resolving Simultaneous Purchase Overselling (Race Condition)
use Illuminate\\Support\\Facades\\DB;

class PurchaseAction {
    public function execute(int $productId, int $userId): void {
        // Atomic DB Decrement with strict WHERE condition!
        $affected = DB::table('products')
            ->where('id', $productId)
            ->where('stock', '>', 0) // Prevents stock falling below 0!
            ->decrement('stock', 1);

        if ($affected === 0) {
            throw new ProductOutOfStockException("Item sold out!");
        }

        Order::create(['user_id' => $userId, 'product_id' => $productId]);
    }
}`,
    howItWorks: [
      "1. Incident: 2 users click 'Buy' simultaneously when stock = 1.",
      "2. Atomic decrement (WHERE stock > 0) guarantees only 1 DB row is modified.",
      "3. First request decrements stock to 0 and returns affected = 1.",
      "4. Second request sees stock = 0, fails WHERE condition, returns affected = 0, throwing OutOfStockException."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="85" fill="#60a5fa" font-size="11" text-anchor="middle">User A (Buy)</text><text x="100" y="105" fill="#60a5fa" font-size="11" text-anchor="middle">Stock = 1</text><path d="M170 90 L240 90" stroke="#10b981" stroke-width="2"/><rect x="240" y="60" width="180" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="330" y="85" fill="#34d399" font-size="11" text-anchor="middle">WHERE stock &gt; 0</text><text x="330" y="105" fill="#34d399" font-size="11" text-anchor="middle">Atomic Decrement</text><path d="M420 60 L480 30" stroke="#10b981" stroke-width="2"/><rect x="480" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="560" y="35" fill="#34d399" font-size="10" text-anchor="middle">User A: Success (Stock=0)</text><path d="M420 120 L480 150" stroke="#ef4444" stroke-width="2"/><rect x="480" y="130" width="160" height="40" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="2"/><text x="560" y="155" fill="#f87171" font-size="10" text-anchor="middle">User B: OutOfStock (0 rows)</text></svg>`,
    realWorldExample: `// Resolving Queue Worker 2GB Memory Leak:
// Root Cause: DB::enableQueryLog() storing millions of executed SQL queries in RAM array inside long-running worker.
// Fix: Run DB::disableQueryLog() or DB::flushQueryLog() in Job handle().`,
    commonUseCases: [
      "Troubleshooting API response latency spikes",
      "Fixing memory leaks in long-running Horizon queue workers",
      "Preventing e-commerce overselling during flash sales"
    ],
    commonMistakes: [
      "Relying on local non-locked check (if ($product->stock > 0)) before saving (causes race condition!)",
      "Diagnosing production errors blindly without checking error logs or Telescope APM"
    ],
    bestPractices: [
      "Use atomic DB operations (decrement/increment) or lockForUpdate() for stock",
      "Always check failed_jobs table and Telescope/Sentry logs during worker incidents"
    ],
    whenToUse: ["In real-world production incident response"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Race Conditions", "Memory Leaks", "Telescope", "Atomic Operations", "Incident Management"],
    comparison: {
      title: "Non-Atomic vs Atomic Stock Check",
      headers: ["Approach", "Race Condition Safe?", "Implementation"],
      rows: [
        ["if ($product->stock > 0) $product->save()", "NO (Overselling Risk!)", "PHP Memory Check"],
        ["WHERE stock > 0 AND decrement('stock')", "YES (100% Atomic)", "MySQL Atomic Update"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Two users try to purchase the last item simultaneously. How do you prevent overselling?", answer: "Use atomic DB update DB::table('products')->where('id', $id)->where('stock', '>', 0)->decrement('stock', 1). If returned affected rows count is 0, item is out of stock." }
    ],
    practiceProblem: {
      description: "Write atomic stock decrement query checking stock > 0.",
      starterCode: `DB::table('products')->where('id', 1);`,
      testAssertion: "Query correct",
      solution: `DB::table('products')->where('id', 1)->where('stock', '>', 0)->decrement('stock', 1);`
    },
    quickRevision: "★ Race condition fix: Atomic DB decrement with WHERE stock > 0.\n★ Worker Memory Leak: Check DB Query Log accumulation.\n★ API 5s delay: Trace APM for un-eager loaded N+1 queries."
  }),

  // 21. LEADERSHIP & SENIOR-LEVEL QUESTIONS
  "laravel-leadership-senior": createTopicSchema({
    id: "laravel-leadership-senior",
    techId: "laravel",
    title: "Engineering Leadership, Code Standards, Legacy Migration & Tech Debt",
    category: "Leadership / Senior-Level Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "16 min",
    prerequisites: ["laravel-core-architecture"],
    definition: "Engineering leadership responsibilities: code review standards, Larastan static analysis, mentoring developers, technical debt prioritization, legacy migration (Strangler Fig), and framework upgrades.",
    simpleExplanation: "Covers senior engineering leadership practices including code reviews, automated CI static analysis, refactoring legacy codebases, and managing technical debt.",
    whyDoesItExist: "Essential for Lead Engineers, Engineering Managers, and Principal Architect roles.",
    basicExample: `// Automated Quality & Standards Pipeline (GitHub Actions .github/workflows/ci.yml)
name: CI Quality Checks

on: [push, pull_request]

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - name: Code Style Check (Laravel Pint)
        run: ./vendor/bin/pint --test
      - name: Static Analysis (Larastan / PHPStan Level 8)
        run: ./vendor/bin/phpstan analyse
      - name: Execute Tests (Pest / PHPUnit)
        run: php artisan test --parallel`,
    howItWorks: [
      "1. Git commit triggers GitHub Actions pipeline.",
      "2. Pint verifies PSR-12 code style compliance.",
      "3. Larastan performs strict static type checking at level 8.",
      "4. Parallel test execution verifies domain business logic."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Pull Request</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="305" y="95" fill="#fbbf24" font-size="12" text-anchor="middle">Laravel Pint Style</text><path d="M380 90 L440 90" stroke="#64748b" stroke-width="2"/><rect x="440" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="520" y="95" fill="#34d399" font-size="12" text-anchor="middle">Larastan Level 8</text><path d="M600 90 L660 90" stroke="#64748b" stroke-width="2"/><rect x="660" y="60" width="110" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="715" y="95" fill="#c084fc" font-size="12" text-anchor="middle">Merge PR</text></svg>`,
    realWorldExample: `// Legacy Migration Strategy (Strangler Fig Pattern):
// Wrap legacy PHP 5.6 monolith with Nginx reverse proxy. Route new API endpoints (/api/v2/) to new Laravel monolith while legacy routes pass through to old application until 100% migrated!`,
    commonUseCases: [
      "Enforcing strict team coding standards using Larastan and Pint",
      "Migrating legacy PHP apps to modern Laravel step-by-step",
      "Upgrading old Laravel 6/7 apps to Laravel 11 using Laravel Shift"
    ],
    commonMistakes: [
      "Performing big-bang rewrites of massive legacy applications from scratch (high failure risk!)",
      "Approving PRs without automated CI static analysis checks"
    ],
    bestPractices: [
      "Use Larastan (PHPStan for Laravel) at level 8 in CI pipelines",
      "Use the Strangler Fig pattern for incremental legacy application migration"
    ],
    whenToUse: ["In engineering team management and tech leadership"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["Larastan", "Laravel Pint", "Strangler Fig Pattern", "Laravel Shift", "Code Review"],
    comparison: {
      title: "Big-Bang Rewrite vs Strangler Fig Pattern",
      headers: ["Metric", "Big-Bang Rewrite", "Strangler Fig Pattern"],
      rows: [
        ["Risk Level", "Extremely High (Years without release)", "Low (Incremental releases)"],
        ["Business Value", "Delayed until 100% complete", "Immediate on every migrated feature"],
        ["Production Testing", "Untested monolithic launch", "Gradual battle-tested migration"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you ensure coding standards and prevent bad architecture across a 15-developer team?", answer: "Automate code style with Laravel Pint, enforce strict static analysis using Larastan level 8 in CI, use Husky pre-commit hooks, and require 2 senior peer reviews checking architectural design patterns." }
    ],
    practiceProblem: {
      description: "List 2 tools used for automated PHP quality checks.",
      starterCode: `// Tools\n`,
      testAssertion: "Tools listed",
      solution: `// Laravel Pint and Larastan (PHPStan)`
    },
    quickRevision: "★ Code Standards: Pint (formatting) + Larastan (types).\n★ Legacy Migration: Strangler Fig Pattern.\n★ Upgrades: Use Laravel Shift."
  }),

  // 22. LARAVEL CODING QUESTIONS
  "laravel-coding-challenges": createTopicSchema({
    id: "laravel-coding-challenges",
    techId: "laravel",
    title: "Senior Coding Challenges: N+1 Fixes, Streaming & Atomic Transactions",
    category: "Laravel Coding Questions",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "15 min",
    prerequisites: ["laravel-eloquent-senior", "laravel-database-sql"],
    definition: "Hands-on coding solutions for top senior interview problems: N+1 query refactoring, 10 million record streaming, atomic transactional operations, and race condition prevention.",
    simpleExplanation: "Provides battle-tested code solutions for the 4 core senior Laravel coding interview problems (Questions 296 - 299).",
    whyDoesItExist: "Direct preparation for live senior coding interviews and technical assessments.",
    basicExample: `// Problem 298: Create order, reduce inventory, and record payment atomically
use Illuminate\\Support\\Facades\\DB;
use App\\Models\\Order;
use App\\Models\\Product;
use App\\Models\\Payment;

class ProcessOrderAction {
    public function execute(int $userId, array $items, float $amount): Order {
        return DB::transaction(function () use ($userId, $items, $amount) {
            // 1. Create Order
            $order = Order::create(['user_id' => $userId, 'total' => $amount]);

            // 2. Reduce Inventory atomically with Pessimistic Locking
            foreach ($items as $item) {
                $product = Product::where('id', $item['id'])->lockForUpdate()->firstOrFail();
                if ($product->stock < $item['qty']) {
                    throw new OutOfStockException("Product {$product->name} out of stock!");
                }
                $product->decrement('stock', $item['qty']);
            }

            // 3. Record Payment
            Payment::create(['order_id' => $order->id, 'amount' => $amount, 'status' => 'completed']);

            return $order;
        }, attempts: 5);
    }
}`,
    howItWorks: [
      "1. DB::transaction wraps all 3 operations in a single database transaction.",
      "2. lockForUpdate() locks target product rows exclusively.",
      "3. Decrement updates stock atomically.",
      "4. If any step fails, entire transaction is automatically rolled back."
    ],
    visualDiagram: `<svg viewBox="0 0 800 180" class="w-full bg-slate-900 rounded-lg p-3"><rect x="30" y="60" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="100" y="95" fill="#60a5fa" font-size="12" text-anchor="middle">Create Order</text><path d="M170 90 L230 90" stroke="#64748b" stroke-width="2"/><rect x="230" y="60" width="170" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="315" y="95" fill="#fbbf24" font-size="12" text-anchor="middle">lockForUpdate() Stock</text><path d="M400 90 L460 90" stroke="#64748b" stroke-width="2"/><rect x="460" y="60" width="150" height="60" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="535" y="95" fill="#34d399" font-size="12" text-anchor="middle">Record Payment</text><path d="M610 90 L670 90" stroke="#64748b" stroke-width="2"/><rect x="670" y="60" width="100" height="60" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="720" y="95" fill="#c084fc" font-size="12" text-anchor="middle">COMMIT</text></svg>`,
    realWorldExample: `// Problem 297: Stream 10 Million Users efficiently
User::where('status', 'active')
    ->lazyById(5000)
    ->each(function (User $user) {
        // Low memory generator loop
    });`,
    commonUseCases: [
      "Solving live coding challenges in senior engineer interviews",
      "Writing safe financial transactional code",
      "Refactoring N+1 query bottlenecks"
    ],
    commonMistakes: [
      "Executing Order::all() and looping over $order->user->name (N+1 query!)",
      "Modifying stock without pessimistic locks or atomic WHERE conditions (Race condition overselling!)"
    ],
    bestPractices: [
      "Refactor $orders = Order::all(); foreach... to Order::with('user')->get()",
      "Always wrap multi-table state changes in DB::transaction()"
    ],
    whenToUse: ["In senior technical assessments and coding problems"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["N+1 Refactoring", "Atomic Transactions", "Race Condition Prevention", "lazyById"],
    comparison: {
      title: "Broken Code vs Fixed Senior Code",
      headers: ["Problem", "Broken Anti-Pattern Code", "Fixed Senior Production Code"],
      rows: [
        ["N+1 Query", "Order::all(); foreach $o->user->name", "Order::with('user')->get()"],
        ["10M Memory", "User::all()", "User::lazyById(5000)->each()"],
        ["Overselling", "if ($stock > 0) $stock->save()", "WHERE stock > 0 AND decrement()"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Fix the following N+1 code: $orders = Order::all(); foreach ($orders as $order) { echo $order->user->name; }", answer: "Change to: $orders = Order::with('user')->get(); foreach ($orders as $order) { echo $order->user->name; }. This eager loads user relationships in 2 SQL queries instead of N+1 queries." }
    ],
    practiceProblem: {
      description: "Fix N+1 query for orders with user.",
      starterCode: `$orders = Order::all();`,
      testAssertion: "Fixed",
      solution: `$orders = Order::with('user')->get();`
    },
    quickRevision: "★ N+1 Fix: Use with('relation').\n★ 10M Rows: Use lazyById(5000).\n★ Atomicity: Wrap in DB::transaction() + lockForUpdate()."
  })
};
