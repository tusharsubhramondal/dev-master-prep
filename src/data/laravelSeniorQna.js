// Laravel Interview Questions — 8+ Years Experience (Senior / Lead Laravel Question Bank - 299 Questions)

export const laravelSeniorQuestions = [
  // ==========================================
  // SECTION 1: LARAVEL CORE & ARCHITECTURE (Q1 - Q18)
  // ==========================================
  {
    id: "laravel-q1",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Stripe", "Uber", "Shopify"],
    question: "1. Explain the complete Laravel request lifecycle.",
    answer: `**Laravel Request Lifecycle (Step-by-step):**

1. **Entry Point (\`public/index.php\`):** All HTTP requests are routed to \`public/index.php\` by the web server (Nginx/Apache). It loads Composer autoloader (\`vendor/autoload.php\`) and retrieves the Laravel application instance from \`bootstrap/app.php\`.
2. **HTTP Kernel Initialization:** The application instance creates the HTTP Kernel (\`Illuminate\\Foundation\\Http\\Kernel\` or \`Illuminate\\Contracts\\Http\\Kernel\`). The Kernel defines an array of global middleware that requests must pass through before execution.
3. **Service Providers Registration & Booting:**
   - **Registration phase:** \`register()\` method on all configured Service Providers is called sequentially (bindings are bound to the Service Container).
   - **Booting phase:** \`boot()\` method on all Service Providers is executed after all providers have registered.
4. **Global Middleware Pipeline:** The request is passed through the global middleware stack (e.g., \`TrustProxies\`, \`PreventRequestsDuringMaintenance\`, \`ValidatePostSize\`, \`TrimStrings\`, \`ConvertEmptyStringsToNull\`).
5. **Router Dispatching:** The Router matches the incoming URI to a route defined in \`routes/web.php\` or \`routes/api.php\`.
6. **Route/Group Middleware:** The matched route runs route-specific middleware (e.g., \`auth\`, \`throttle\`, \`substituteBindings\`).
7. **Controller / Action Execution:** The controller action or closure is executed. Dependency Injection automatically resolves parameters via Reflection.
8. **Response Generation & Return:** The controller returns a Response object (or data converted to \`JsonResponse\` via API Resources/Views).
9. **Terminable Middleware:** Middleware implementing \`terminable\` runs \`terminate($request, $response)\` after response is sent to the client.

\`\`\`php
// Simplified Mental Model:
Request -> public/index.php -> HTTP Kernel -> Service Providers (register -> boot) 
        -> Global Middleware -> Router -> Route Middleware -> Controller/Action 
        -> Response -> Terminable Middleware -> Browser Client
\`\`\``
  },
  {
    id: "laravel-q2",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Meta", "Google"],
    question: "2. What happens when a request enters public/index.php?",
    answer: `**Inside \`public/index.php\`:**

In Laravel 11/10, \`public/index.php\` is lightweight and performs 4 fundamental tasks:

1. **Maintenance Check:** Checks if the application is in maintenance mode via \`file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')\`.
2. **Composer Autoloading:** Requires \`__DIR__.'/../vendor/autoload.php'\` so PSR-4 classes can be dynamically autoloaded.
3. **Bootstrapping Application:** Requires \`__DIR__.'/../bootstrap/app.php'\` which initializes the \`Illuminate\\Foundation\\Application\` instance.
4. **Handling Request:** Creates the HTTP Request instance using \`Illuminate\\Http\\Request::capture()\` and handles it via application handle method \`$app->handleRequest($request)\` sending the response back to client browser via \`$response->send()\`.

\`\`\`php
define('LARAVEL_START', microtime(true));

// 1. Maintenance mode check
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// 2. Composer Autoloader
require __DIR__.'/../vendor/autoload.php';

// 3. Bootstrap Laravel & Handle Request
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
\`\`\``
  },
  {
    id: "laravel-q3",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Amazon", "Vercel"],
    question: "3. What is the Laravel Service Container?",
    answer: `**The Laravel Service Container:**

The Service Container is a powerful **Inversion of Control (IoC) Container** and Dependency Injection engine used for managing class dependencies and performing dependency injection.

**Key Responsibilities:**
1. **Dependency Resolution:** Automatically injects class dependencies into constructors or controller actions using PHP Reflection API (Zero-configuration Auto-wiring).
2. **Binding Management:** Allows developers to map abstract interfaces to concrete implementations.

\`\`\`php
// Interface Binding Example:
$this->app->bind(PaymentGatewayInterface::class, StripePaymentGateway::class);

// Usage via Dependency Injection:
public function __construct(protected PaymentGatewayInterface $paymentGateway) {}
\`\`\``
  },
  {
    id: "laravel-q4",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Microsoft", "Airbnb"],
    question: "4. What is Dependency Injection and why is it important?",
    answer: `**Dependency Injection (DI):**

Dependency Injection is a software design pattern where an object receives its dependencies from an external source (the Service Container) rather than creating them internally using \`new PaymentService()\`.

**Why it's critical in Senior Enterprise Applications:**
1. **Decoupling:** High-level business logic doesn't depend directly on concrete low-level implementations.
2. **Testability:** Dependencies can be easily mocked using \`$this->mock(PaymentService::class)\` in PHPUnit/Pest tests.
3. **Flexibility:** Swapping implementations (e.g., switching from Mailgun to SES) requires updating a single container binding.

\`\`\`php
// BAD (Tight Coupling):
class OrderController {
    public function store() {
        $stripe = new StripeGateway('api_key');
        $stripe->charge();
    }
}

// GOOD (Dependency Injection):
class OrderController {
    public function __construct(protected PaymentGatewayInterface $gateway) {}
    
    public function store() {
        $this->gateway->charge();
    }
}
\`\`\``
  },
  {
    id: "laravel-q5",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["GitHub", "Datadog"],
    question: "5. Difference between Service Provider and Service Container.",
    answer: `**Service Container vs Service Provider:**

| Aspect | Service Container | Service Provider |
| :--- | :--- | :--- |
| **Role** | The IoC Registry & Resolution Engine | The Bootstrap / Configurator Class |
| **Analogy** | The warehouse/toolbox storing bindings | The delivery truck / setup script populating the warehouse |
| **Function** | Binds interfaces to classes, resolves instances using Reflection | Registers container bindings, registers event listeners, routes, and middleware |
| **Methods** | \`bind()\`, \`singleton()\`, \`make()\`, \`resolve()\` | \`register()\`, \`boot()\` |

\`\`\`php
// Inside a Service Provider (AppServiceProvider.php):
public function register(): void {
    // Interacting with the Service Container ($this->app)
    $this->app->singleton(NewsletterClient::class, function ($app) {
        return new MailchimpClient(config('services.mailchimp.key'));
    });
}
\`\`\``
  },
  {
    id: "laravel-q6",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Netflix", "Salesforce"],
    question: "6. Explain register() vs boot() in a Service Provider.",
    answer: `**\`register()\` vs \`boot()\`:**

- **\`register()\` Method:**
  - **Purpose:** Only bind things into the Service Container.
  - **Golden Rule:** NEVER register event listeners, routes, or call other services inside \`register()\`. Why? Because other service providers might not have registered their services yet!

- **\`boot()\` Method:**
  - **Purpose:** Executed AFTER ALL Service Providers have completed their \`register()\` phase.
  - **Usage:** Register view composers, event listeners, custom Blade directives, custom database scopes, route model bindings, and policies.

\`\`\`php
class AppServiceProvider extends ServiceProvider {
    public function register(): void {
        // ONLY BINDINGS HERE
        $this->app->singleton(SmsGateway::class, TwilioGateway::class);
    }

    public function boot(): void {
        // SAFE TO ACCESS OTHER SERVICES & REGISTER LISTENERS
        Blade::directive('datetime', function ($expression) {
            return "<?php echo ($expression)->format('Y-m-d H:i'); ?>";
        });
    }
}
\`\`\``
  },
  {
    id: "laravel-q7",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Spotify", "Shopify"],
    question: "7. What are facades in Laravel?",
    answer: `**Laravel Facades:**

Facades provide a **static interface** to classes that are available in the application's Service Container. They act as "static proxies" to underlying services in the IoC container.

**Key Benefits:**
- Expressive, clean syntax: \`Cache::get('key')\` vs \`app('cache')->get('key')\`.
- Maintain full testability using fake static methods: \`Queue::fake()\`, \`Event::fake()\`, \`Cache::shouldReceive()\`.

\`\`\`php
use Illuminate\\Support\\Facades\\Cache;

// Looks like a static method call, but dynamically proxies to an instance bound in the container!
$value = Cache::remember('user_profile', 3600, fn() => DB::table('users')->get());
\`\`\``
  },
  {
    id: "laravel-q8",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Cloudflare", "Palantir"],
    question: "8. How do Laravel facades work internally?",
    answer: `**Internal Mechanism of Facades:**

1. Every Facade extends \`Illuminate\\Support\\Facades\\Facade\`.
2. The custom facade class overrides the \`getFacadeAccessor()\` method, returning a string key (binding identifier) or class FQDN bound in the container.
3. When you call a static method like \`CustomFacade::doSomething()\`, PHP invokes the magic method \`__callStatic()\`.
4. \`__callStatic()\` resolves the underlying instance from the Service Container using \`static::resolveFacadeInstance(static::getFacadeAccessor())\`.
5. It then executes \`$instance->doSomething(...$args)\`.

\`\`\`php
namespace App\\Facades;
use Illuminate\\Support\\Facades\\Facade;

class Payment extends Facade {
    protected static function getFacadeAccessor(): string {
        return 'payment_service'; // Container accessor key
    }
}

// Internal flow when calling Payment::charge(100):
// 1. __callStatic('charge', [100]) triggered
// 2. Container resolves app('payment_service')
// 3. Resolves StripeService instance -> calls $stripeService->charge(100)
\`\`\``
  },
  {
    id: "laravel-q9",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Uber", "DoorDash"],
    question: "9. Facade vs Dependency Injection — which do you prefer and why?",
    answer: `**Facade vs Dependency Injection Trade-offs:**

- **Facades Pros:** Extremely concise code, quick to write, easy to read in controllers/routes.
- **Facades Cons:** Obscures class dependencies (Hidden Dependencies anti-pattern), can lead to monolithic class creep.
- **Dependency Injection Pros:** Explicit dependencies in constructor, enforces Single Responsibility Principle, clear domain boundaries.
- **Dependency Injection Cons:** Slightly verbose constructor syntax.

**Senior Recommendation:**
Use **Constructor Dependency Injection** for domain logic, Action classes, and Services to maintain clear architecture and strict interfaces. Use **Facades** for utility operations in controllers/views (e.g., \`Log::info()\`, \`Cache::get()\`, \`Route::get()\`).`
  },
  {
    id: "laravel-q10",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Oracle", "Cisco"],
    question: "10. What is the difference between singleton(), bind(), and scoped()?",
    answer: `**Container Binding Lifecycles:**

1. **\`bind()\`: Transient Lifecycle**
   - Resolves a **NEW instance** every single time the class or interface is requested from the container.

2. **\`singleton()\`: Application Lifecycle**
   - Resolves the instance **ONCE** and caches it for the entire duration of the PHP process lifecycle. Re-used across all subsequent requests (in long-running workers like Octane/FrankenPHP).

3. **\`scoped()\`: Request Lifecycle**
   - Resolves the instance **ONCE per HTTP request / job cycle**. Resets when a new request begins. Crucial in long-running processes (Laravel Octane / Queue Workers) to prevent state leaking across HTTP requests!

\`\`\`php
$this->app->bind(TransientService::class);
$this->app->singleton(GlobalAppCache::class);
$this->app->scoped(CurrentTenantContext::class); // Resets every HTTP request in Octane
\`\`\``
  },
  {
    id: "laravel-q11",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["IBM", "Vercel"],
    question: "11. What are Laravel contracts?",
    answer: `**Laravel Contracts:**

Contracts are a set of **interfaces** defined by the framework that core services implement (e.g., \`Illuminate\\Contracts\\Cache\\Repository\`, \`Illuminate\\Contracts\\Queue\\ShouldQueue\`).

**Benefits:**
- **Decoupling:** Allows application code to depend on framework abstractions rather than concrete vendor implementations.
- **Clarity:** Defines explicit contracts for features.

\`\`\`php
use Illuminate\\Contracts\\Cache\\Repository as CacheContract;

class UserReportService {
    public function __construct(protected CacheContract $cache) {}
}
\`\`\``
  },
  {
    id: "laravel-q12",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Stripe", "GitHub"],
    question: "12. Explain Laravel's middleware pipeline.",
    answer: `**Laravel Middleware Pipeline:**

Middleware uses the **Pipeline Pattern** (Chain of Responsibility design pattern) wrapping around the request handling logic.

**How it works:**
1. \`Illuminate\\Pipeline\\Pipeline\` creates an array of closures (onion architecture).
2. Each middleware receives two arguments: \`$request\` and a \`$next\` closure.
3. Code before \`$next($request)\` runs on the way **IN** (request phase).
4. Code after \`$next($request)\` runs on the way **OUT** (response phase).

\`\`\`php
public function handle(Request $request, Closure $next): Response {
    // 1. Pre-processing (Request Phase)
    Log::info('Incoming IP: ' . $request->ip());

    $response = $next($request); // Pass request deeper into pipeline

    // 2. Post-processing (Response Phase)
    $response->headers->set('X-Custom-Header', 'Value');
    return $response;
}
\`\`\``
  },
  {
    id: "laravel-q13",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Airbnb", "LinkedIn"],
    question: "13. Difference between global middleware, route middleware and middleware groups.",
    answer: `**Middleware Scopes:**

1. **Global Middleware:** Runs on **EVERY SINGLE HTTP request** sent to the application (e.g., CORS headers, Maintenance mode check, TrimStrings).
2. **Middleware Groups:** Collections of middleware combined under a single key for convenience (e.g., \`web\` group with sessions/CSRF, \`api\` group with rate limiting).
3. **Route Middleware (Named Middleware):** Middleware assigned to individual routes or route groups explicitly using \`->middleware('auth')\`.`
  },
  {
    id: "laravel-q14",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Meta", "Google"],
    question: "14. How would you create your own middleware?",
    answer: `**Creating Custom Middleware:**

Run \`php artisan make:middleware EnsureUserIsSubscribed\`.

\`\`\`php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class EnsureUserIsSubscribed {
    public function handle(Request $request, Closure $next, string $plan = 'basic'): Response {
        if (! $request->user()?->hasActiveSubscription($plan)) {
            return response()->json(['error' => 'Subscription required'], 403);
        }

        return $next($request);
    }
}
\`\`\`

**Registration (Laravel 11 \`bootstrap/app.php\`):**
\`\`\`php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'subscribed' => EnsureUserIsSubscribed::class,
    ]);
})
\`\`\``
  },
  {
    id: "laravel-q15",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Amazon", "Uber"],
    question: "15. How does Laravel handle exceptions?",
    answer: `**Laravel Exception Handling Architecture:**

All exceptions are captured by the Exception Handler (\`Illuminate\\Foundation\\Configuration\\Exceptions\` in Laravel 11 or \`App\\Exceptions\\Handler\` in Laravel 10).

**Key Capabilities:**
1. **Reporting (\`report()\`):** Logs exceptions to Sentry/Bugsnag/Log files. Can ignore specific exception types using \`$exceptions->dontReport([])\`.
2. **Rendering (\`render()\`):** Converts PHP throwables into HTTP JSON error responses or Blade error views (e.g., 404, 500).
3. **Renderable Exceptions:** Custom exceptions can implement their own \`report()\` and \`render()\` methods directly!

\`\`\`php
// Custom Renderable Exception:
class InsufficientFundsException extends Exception {
    public function render(Request $request): JsonResponse {
        return response()->json([
            'error' => 'INSUFFICIENT_FUNDS',
            'message' => $this->getMessage(),
        ], 422);
    }
}
\`\`\``
  },
  {
    id: "laravel-q16",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Netflix", "Salesforce"],
    question: "16. How does Laravel resolve dependencies automatically?",
    answer: `**Automatic Dependency Resolution (Auto-Wiring):**

Laravel utilizes **PHP Reflection API** (\`ReflectionClass\` and \`ReflectionMethod\`) inside the Service Container.

**Step-by-step Auto-Wiring Process:**
1. Container inspects the class constructor parameter types using Reflection.
2. If a parameter is a class or interface type-hint, the container recursively calls \`$this->make(DependencyClass::class)\`.
3. If a parameter is a primitive type (string/int) without a default value, the container looks for explicit parameter bindings in \`when()->needs()->give()\`.
4. Instantiates the target class with resolved constructor dependencies automatically!`
  },
  {
    id: "laravel-q17",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Shopify", "Datadog"],
    question: "17. What is the role of the bootstrap directory?",
    answer: `**Role of \`bootstrap/\` Directory:**

- **\`bootstrap/app.php\`:** Configures the application instance, routes, middleware, and exception handling (Laravel 11 unified config entrypoint).
- **\`bootstrap/providers.php\`:** Lists all application Service Providers loaded on startup.
- **\`bootstrap/cache/\`:** Contains framework-generated performance cache files (\`config.php\`, \`routes-v7.php\`, \`events.php\`, \`services.php\`).`
  },
  {
    id: "laravel-q18",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Core & Architecture",
    companies: ["Stripe", "Uber"],
    question: "18. How would you structure a large Laravel application?",
    answer: `**Structuring Large Scale Laravel Applications (Domain-Driven / Modular):**

Instead of dump-all folders (\`app/Http/Controllers\`, \`app/Models\`), structure by **Domain**:

\`\`\`text
app/
├── Domains/
│   ├── Ordering/
│   │   ├── Actions/ (CreateOrderAction.php)
│   │   ├── DTOs/ (OrderData.php)
│   │   ├── Models/ (Order.php, OrderItem.php)
│   │   ├── Events/ (OrderPlacedEvent.php)
│   │   └── Services/ (PaymentGatewayService.php)
│   ├── Identity/
│   └── Billing/
├── Http/
│   ├── Controllers/ (Thin controllers routing requests to Domain Actions)
│   └── Resources/ (JsonResource transformers)
\`\`\``
  },

  // ==========================================
  // SECTION 2: LARAVEL MVC & APPLICATION ARCHITECTURE (Q19 - Q33)
  // ==========================================
  {
    id: "laravel-q19",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Google", "Meta"],
    question: "19. Explain MVC in Laravel.",
    answer: `**Model-View-Controller in Laravel:**

- **Model (Eloquent):** Encapsulates data structure, DB relations, and business logic persistence.
- **View (Blade / Inertia React/Vue):** UI rendering layer.
- **Controller:** Traffic orchestrator receiving HTTP request, invoking Domain Actions/Services, and returning Response.`
  },
  {
    id: "laravel-q20",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Amazon", "Stripe"],
    question: "20. Should business logic be placed inside Controllers?",
    answer: `**NO! Controllers should be extremely thin.**

**Why Fat Controllers are an Anti-Pattern:**
- Violates Single Responsibility Principle (SRP).
- Cannot reuse logic across Queue Jobs, CLI commands, Webhooks, or GraphQL queries.
- Difficult to unit-test without constructing fake HTTP request contexts.

**Senior Architecture:** Delegate to **Action Classes** or **Services**.`
  },
  {
    id: "laravel-q21",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Netflix", "Airbnb"],
    question: "21. What is a Service Layer?",
    answer: `**The Service Layer Pattern:**

A Service Layer sits between Controllers and Data Persistence (Eloquent Models/Repositories). It encapsulates domain workflow operations (e.g., \`OrderProcessingService\`).

\`\`\`php
class OrderService {
    public function __construct(
        protected PaymentGateway $payment,
        protected InventoryManager $inventory
    ) {}

    public function processOrder(OrderData $dto): Order {
        return DB::transaction(function () use ($dto) {
            $this->inventory->reserve($dto->items);
            $payment = $this->payment->charge($dto->total);
            return Order::create([...]);
        });
    }
}
\`\`\``
  },
  {
    id: "laravel-q22",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Microsoft", "LinkedIn"],
    question: "22. Repository Pattern — when should you use it?",
    answer: `**Repository Pattern in Laravel:**

**When to Use:**
- When switching underlying storage engines (e.g., MongoDB, ElasticSearch, MySQL).
- Complex enterprise applications requiring data abstraction over raw queries.

**When NOT to Use:**
- When using standard Eloquent ORM features like eager loading (\`with()\`), scopes, and relationships directly. Eloquent is already an Active Record implementation!`
  },
  {
    id: "laravel-q23",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Shopify", "DoorDash"],
    question: "23. Repository vs Service — what's the difference?",
    answer: `**Repository vs Service Layer:**

- **Repository:** Responsible strictly for **Data Access & Persistence** (e.g., \`UserRepository::findActiveWithOrders()\`).
- **Service:** Responsible for **Business Logic Workflow** (e.g., \`UserRegistrationService::registerUser()\`).`
  },
  {
    id: "laravel-q24",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Stripe", "Vercel"],
    question: "24. What is a DTO (Data Transfer Object)?",
    answer: `**Data Transfer Object (DTO):**

A strongly-typed object used to transfer validated data between layers (Form Request -> DTO -> Action Class) eliminating array-key bugs.

\`\`\`php
readonly class CreateUserData {
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public ?string $phone = null
    ) {}

    public static function fromRequest(RegisterRequest $request): self {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            password: $request->validated('password'),
        );
    }
}
\`\`\``
  },
  {
    id: "laravel-q25",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Uber", "Cloudflare"],
    question: "25. What is an Action/Use Case class?",
    answer: `**Action / Single-Purpose Classes:**

An Action class does **ONE SINGLE THING** in the domain and exposes an \`__invoke()\` method.

\`\`\`php
class CreateUserAction {
    public function __construct(protected Mailer $mailer) {}

    public function __invoke(CreateUserData $data): User {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        $this->mailer->sendWelcomeEmail($user);
        return $user;
    }
}

// Controller usage:
public function store(RegisterRequest $request, CreateUserAction $action) {
    $user = $action(CreateUserData::fromRequest($request));
    return response()->json($user, 201);
}
\`\`\``
  },
  {
    id: "laravel-q26",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Meta", "Salesforce"],
    question: "26. How would you prevent fat controllers?",
    answer: `**Preventing Fat Controllers (The Modern Laravel Stack):**

1. **Form Requests:** Move validation out of controllers.
2. **DTOs:** Transform array inputs into typed objects.
3. **Action Classes:** Move domain logic into invokable classes.
4. **API Resources:** Move JSON response structure out of controllers.`
  },
  {
    id: "laravel-q27",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Google", "Amazon"],
    question: "27. How would you prevent fat models?",
    answer: `**Preventing Fat Models:**

1. Extract custom query logic to **Custom Eloquent Builders** (\`UserQueryBuilder extends Builder\`).
2. Move events into **Observers** or **Event Listeners**.
3. Move reusable attribute casting into **Custom Cast Classes**.
4. Use **Domain Actions** for mutative operations instead of model methods.`
  },
  {
    id: "laravel-q28",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Shopify", "Stripe"],
    question: "28. What architecture would you use for a large Laravel application?",
    answer: `**Modular Monolith Architecture:**

Partition the monolith into independent **Domain Modules** (e.g., \`Modules/Order\`, \`Modules/Payment\`, \`Modules/Inventory\`). Each module maintains its own routes, models, actions, and DTOs. Communicate between modules strictly via **Events** or **Module Interfaces**.`
  },
  {
    id: "laravel-q29",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Airbnb", "Netflix"],
    question: "29. When would you NOT use Repository Pattern?",
    answer: `**When NOT to use Repositories:**

When your application relies heavily on Eloquent's rich feature set (dynamic eager loading, complex relation constraints, global scopes). Wrapping Eloquent in a repository often leads to **leaky abstractions** where you re-implement Eloquent methods (\`where()\`, \`paginate()\`, \`with()\`) in repository interfaces.`
  },
  {
    id: "laravel-q30",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["IBM", "Oracle"],
    question: "30. Would you create a repository for every Eloquent model?",
    answer: `**NO!**

1. 1-to-1 repository mapping for basic CRUD models creates useless boilerplate.
2. Only create Repositories or Query Objects for complex aggregates or when decoupling from an external storage API.`
  },
  {
    id: "laravel-q31",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Uber", "Datadog"],
    question: "31. How do you organize a Laravel monolith with 50+ modules?",
    answer: `**Organizing 50+ Modules in a Monolith:**

1. Use **Composer Path Repositories** or packages like \`nwidart/laravel-modules\`.
2. Enforce strict **architecture boundaries** using static analysis tools (e.g., Deptrac / PHPStan) to prevent cross-module DB joins or illegal imports.
3. Use **Domain Event Bus** for inter-module communication.`
  },
  {
    id: "laravel-q32",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Stripe", "Vercel"],
    question: "32. How would you implement Domain-Driven Design concepts in Laravel?",
    answer: `**DDD Concepts in Laravel:**

- **Aggregates:** Group root models with child entities (e.g., \`Order\` aggregate containing \`OrderItems\`).
- **Value Objects:** Readonly immutable objects for domain concepts (\`Money\`, \`EmailAddress\`).
- **Domain Events:** Fire events when domain state changes (\`OrderPaidEvent\`).
- **Domain Services:** Execute multi-entity domain rules.`
  },
  {
    id: "laravel-q33",
    techId: "laravel",
    level: "Senior",
    category: "Laravel MVC & Application Architecture",
    companies: ["Google", "Meta"],
    question: "33. What is the difference between modular monolith and microservices?",
    answer: `**Modular Monolith vs Microservices:**

| Aspect | Modular Monolith | Microservices |
| :--- | :--- | :--- |
| **Deployment** | Single deployment unit (1 codebase) | Independent service deployments |
| **Database** | Single database (separated by schemas/tables) | Database-per-service |
| **IPC** | In-memory PHP calls / Event Bus | Network calls (HTTP/gRPC/RabbitMQ) |
| **Complexity** | Low operational overhead | High DevOps overhead |`
  },

  // ==========================================
  // SECTION 3: ELOQUENT ORM — SENIOR LEVEL (Q34 - Q58)
  // ==========================================
  {
    id: "laravel-q34",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Amazon", "Uber"],
    question: "34. Explain how Eloquent works internally.",
    answer: `**Eloquent Internal Architecture:**

Eloquent implements the **Active Record Pattern**.

- **\`Model\` Class:** Extends \`Illuminate\\Database\\Eloquent\\Model\`. Uses magic methods (\`__get\`, \`__set\`, \`__call\`) to intercept property and method calls.
- **\`Eloquent\\Builder\`:** Wraps the raw \`Query\\Builder\`, translating Eloquent models into SQL queries and hydrating raw PDO result arrays back into Eloquent Model instances.`
  },
  {
    id: "laravel-q35",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Netflix", "Salesforce"],
    question: "35. Difference between User::find(1), User::where('id', 1)->first(), and User::findOrFail(1).",
    answer: `**Find Methods Comparison:**

- **\`User::find(1)\`:** Direct primary key lookup. Returns \`User\` instance or \`null\`.
- **\`User::where('id', 1)->first()\`:** Builds a query builder instance, executes query, returns \`User\` or \`null\`.
- **\`User::findOrFail(1)\`:** Returns \`User\` or throws \`ModelNotFoundException\` (which auto-renders as HTTP 404 response).`
  },
  {
    id: "laravel-q36",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Google", "Stripe"],
    question: "36. What is the N+1 query problem?",
    answer: `**The N+1 Query Problem:**

Occurs when code fetches a parent record set (1 query) and then loops over each record accessing a relation property, triggering a separate SQL query for **every single item** (N queries). Total = 1 + N queries (e.g., 1,001 SQL queries for 1,000 records!).`
  },
  {
    id: "laravel-q37",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Shopify", "Meta"],
    question: "37. How do you identify and solve N+1 problems?",
    answer: `**Identifying & Fixing N+1 Queries:**

1. **Identification:** Use Laravel Debugbar, Telescope, or enable \`Model::preventLazyLoading(!app()->isProduction());\` in \`AppServiceProvider\`.
2. **Solution:** Use **Eager Loading** with \`with()\`:
\`\`\`php
// BAD (N+1):
$books = Book::all();
foreach ($books as $book) { echo $book->author->name; }

// GOOD (Eager Loading - 2 queries total):
$books = Book::with('author')->get();
\`\`\``
  },
  {
    id: "laravel-q38",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Airbnb", "DoorDash"],
    question: "38. Difference between with(), load(), and loadMissing().",
    answer: `**Relationship Loading Methods:**

- **\`with()\`:** Eager loads relationships **DURING** the initial query execution.
- **\`load()\`:** Lazy eager loads relationships **AFTER** the parent models have already been retrieved.
- **\`loadMissing()\`:** Eager loads relationships **ONLY IF** they have not already been loaded on the collection.`
  },
  {
    id: "laravel-q39",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Cloudflare", "Palantir"],
    question: "39. Explain eager loading vs lazy loading.",
    answer: `**Eager Loading vs Lazy Loading:**

- **Lazy Loading:** Relationship data is queried on-demand when accessed. Causes N+1 performance bottlenecks.
- **Eager Loading:** Relationship data is fetched upfront using SQL \`WHERE IN (...)\` queries in advance.`
  },
  {
    id: "laravel-q40",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["IBM", "Oracle"],
    question: "40. What are Eloquent relationships?",
    answer: `**Eloquent Relationship Types:**

1. **One To One:** \`hasOne\` / \`belongsTo\`
2. **One To Many:** \`hasMany\` / \`belongsTo\`
3. **Many To Many:** \`belongsToMany\` (with pivot table)
4. **Has One Through / Has Many Through:** Distant relationship access across intermediate models.
5. **Polymorphic Relations:** \`morphTo\`, \`morphMany\`, \`morphedByMany\`.`
  },
  {
    id: "laravel-q41",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Meta", "Google"],
    question: "41. Explain hasOne, hasMany, belongsTo, belongsToMany, hasManyThrough, and polymorphic relationships.",
    answer: `**Detailed Relationship Definitions:**

- **\`hasOne(Profile::class)\`:** Target model contains foreign key (\`user_id\`).
- **\`belongsTo(User::class)\`:** Current model contains foreign key.
- **\`hasMany(Post::class)\`:** Target model has multiple records pointing to current model's ID.
- **\`belongsToMany(Role::class, 'role_user')\`:** Many-to-many joined by pivot table.
- **\`hasManyThrough(Deploy::class, Environment::class)\`:** Accesses deployments via environments table.`
  },
  {
    id: "laravel-q42",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Stripe", "Uber"],
    question: "42. How does a polymorphic relationship work?",
    answer: `**Polymorphic Relationships:**

Allows a target model to belong to more than one type of model on a single association using two columns: \`imageable_type\` (Class FQDN / Alias) and \`imageable_id\` (Foreign ID).

\`\`\`php
// Database Table: comments
// id | body | commentable_type | commentable_id
// 1  | Cool | App\\Models\\Post | 42
// 2  | Nice | App\\Models\\Video| 99
\`\`\``
  },
  {
    id: "laravel-q43",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Netflix", "Vercel"],
    question: "43. What is morphMany()?",
    answer: `**\`morphMany()\` Definition:**

Defines a polymorphic one-to-many relationship.

\`\`\`php
class Post extends Model {
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
\`\`\``
  },
  {
    id: "laravel-q44",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Salesforce", "Datadog"],
    question: "44. What is morphTo()?",
    answer: `**\`morphTo()\` Definition:**

Defines the inverse of a polymorphic relationship.

\`\`\`php
class Comment extends Model {
    public function commentable(): MorphTo {
        return $this->morphTo();
    }
}
\`\`\``
  },
  {
    id: "laravel-q45",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Amazon", "Microsoft"],
    question: "45. What are model observers?",
    answer: `**Model Observers:**

Classes that group Eloquent lifecycle event listeners for a specific model into a single class (\`UserObserver\`). Registered in Service Provider or via \`#[ObservedBy(UserObserver::class)]\` attribute.`
  },
  {
    id: "laravel-q46",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Shopify", "LinkedIn"],
    question: "46. What are model events?",
    answer: `**Eloquent Model Lifecycle Events:**

Events fired during Eloquent operations:
\`retrieved\`, \`creating\`, \`created\`, \`updating\`, \`updated\`, \`saving\`, \`saved\`, \`deleting\`, \`deleted\`, \`restoring\`, \`restored\`, \`forceDeleting\`, \`forceDeleted\`.`
  },
  {
    id: "laravel-q47",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Stripe", "Airbnb"],
    question: "47. Difference between Observer and Event/Listener.",
    answer: `**Observer vs Event/Listener:**

- **Observer:** Directly coupled to Eloquent model lifecycle hooks (\`creating\`, \`updated\`).
- **Event/Listener:** Decoupled generic application domain event (\`OrderPaid\`) listened to by multiple async listeners.`
  },
  {
    id: "laravel-q48",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Uber", "Google"],
    question: "48. What are accessors and mutators?",
    answer: `**Accessors & Mutators (Laravel 9+ Attribute Syntax):**

Format values when retrieving or setting Eloquent attributes.

\`\`\`php
use Illuminate\\Database\\Eloquent\\Casts\\Attribute;

protected function firstName(): Attribute {
    return Attribute::make(
        get: fn (string $value) => ucfirst($value),
        set: fn (string $value) => strtolower($value),
    );
}
\`\`\``
  },
  {
    id: "laravel-q49",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Meta", "Netflix"],
    question: "49. What are Eloquent casts?",
    answer: `**Eloquent Casts:**

Converts model attributes to native PHP data types upon retrieval and back to DB types when saving (e.g., \`array\`, \`json\`, \`encrypted\`, \`AsCollection::class\`, \`AsEnumCollection::class\`).`
  },
  {
    id: "laravel-q50",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Amazon", "Salesforce"],
    question: "50. Difference between $fillable and $guarded.",
    answer: `**\`$fillable\` vs \`$guarded\`:**

- **\`$fillable\` (White-list):** Explicit array of attributes allowed for mass assignment. Recommended for security.
- **\`$guarded\` (Black-list):** Array of attributes blocked from mass assignment. Setting \`$guarded = []\` allows all.`
  },
  {
    id: "laravel-q51",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Stripe", "GitHub"],
    question: "51. What is mass assignment vulnerability?",
    answer: `**Mass Assignment Vulnerability:**

Occurs when HTTP user request data (\`$request->all()\`) is passed directly into \`User::create($request->all())\`. An attacker can inject \`is_admin = true\` into the request payload!`
  },
  {
    id: "laravel-q52",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Vercel", "Cloudflare"],
    question: "52. How does soft delete work?",
    answer: `**Soft Deletes Mechanism:**

Uses the \`Illuminate\\Database\\Eloquent\\SoftDeletes\` trait. When calling \`$model->delete()\`, Eloquent sets a timestamp on the \`deleted_at\` column instead of running SQL \`DELETE FROM\`. All default queries automatically include \`WHERE deleted_at IS NULL\` scope.`
  },
  {
    id: "laravel-q53",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Datadog", "Uber"],
    question: "53. What is withTrashed()?",
    answer: `**\`withTrashed()\` Scope:**

Includes soft-deleted records in query results alongside active records (\`WHERE deleted_at IS NULL OR deleted_at IS NOT NULL\`).`
  },
  {
    id: "laravel-q54",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Shopify", "Airbnb"],
    question: "54. How do global scopes work?",
    answer: `**Global Scopes:**

Allows you to add SQL constraints to **EVERY query** executed for a given model (e.g., Multi-Tenant isolation \`WHERE tenant_id = X\`). Implements \`Illuminate\\Database\\Eloquent\\Scope\`.`
  },
  {
    id: "laravel-q55",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Google", "Meta"],
    question: "55. How would you implement a custom global scope?",
    answer: `**Custom Global Scope Implementation:**

\`\`\`php
namespace App\\Models\\Scopes;

use Illuminate\\Database\\Eloquent\\Builder;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Scope;

class TenantScope implements Scope {
    public function apply(Builder $builder, Model $model): void {
        $builder->where('tenant_id', session('tenant_id'));
    }
}
\`\`\``
  },
  {
    id: "laravel-q56",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Amazon", "Netflix"],
    question: "56. What are local scopes?",
    answer: `**Local Scopes:**

Reusable query logic methods defined on models prefixed with \`scope\` (e.g., \`scopeActive(Builder $query)\`). Called dynamically as \`User::active()->get()\`.`
  },
  {
    id: "laravel-q57",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Stripe", "Uber"],
    question: "57. Difference between chunk(), chunkById(), cursor(), and lazy().",
    answer: `**Data Processing Methods for Large Tables:**

- **\`chunk($size, $callback)\`:** Executes SQL \`LIMIT/OFFSET\` queries. Dangerous if updating records inside the loop (offset shift bug!).
- **\`chunkById($size, $callback)\`:** Executes SQL \`WHERE id > last_id LIMIT size\`. Safe for mutations.
- **\`cursor()\`:** Uses a single SQL query with a **PDO Generator** to stream records one-by-one with low memory usage.
- **\`lazy()\`:** Returns a **LazyCollection** chunking behind the scenes via generators.`
  },
  {
    id: "laravel-q58",
    techId: "laravel",
    level: "Senior",
    category: "Eloquent ORM — Senior Level",
    companies: ["Meta", "Google"],
    question: "58. How would you process 10 million records efficiently?",
    answer: `**Processing 10 Million Records in Production:**

1. Never use \`Model::all()\`.
2. Use **\`User::lazyById(5000)->each(...)\`** or **\`cursor()\`** to maintain low PHP memory footprint (<32MB).
3. Disable query logging via \`DB::disableQueryLog()\`.
4. Partition the workload across multiple background Queue Workers using ID range batches (\`WHERE id BETWEEN X AND Y\`).`
  },

  // ==========================================
  // SECTION 4: DATABASE & SQL (Q59 - Q78)
  // ==========================================
  {
    id: "laravel-q59",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Amazon", "Stripe"],
    question: "59. Explain database indexing.",
    answer: `**Database Indexing:**

A data structure (typically a B-Tree) created on database columns to speed up data retrieval operations without scanning every row in the table (Full Table Scan).`
  },
  {
    id: "laravel-q60",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Netflix", "Uber"],
    question: "60. When should you create an index?",
    answer: `**When to Create Indexes:**

1. Columns frequently used in \`WHERE\` clauses.
2. Foreign key columns used in \`JOIN\` conditions.
3. Columns used in \`ORDER BY\` and \`GROUP BY\`.`
  },
  {
    id: "laravel-q61",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Salesforce", "Shopify"],
    question: "61. When can an index hurt performance?",
    answer: `**When Indexes Hurt Performance:**

- Heavy \`INSERT\`, \`UPDATE\`, and \`DELETE\` write workloads (the DB must update the B-Tree index on every write).
- Low cardinality columns (e.g., \`gender\` or \`is_active\` boolean flags).
- Small tables where a full table scan is faster.`
  },
  {
    id: "laravel-q62",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Google", "Meta"],
    question: "62. Explain composite indexes.",
    answer: `**Composite Index:**

An index built on multiple columns combined (e.g., \`INDEX(tenant_id, status, created_at)\`).`
  },
  {
    id: "laravel-q63",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Stripe", "Airbnb"],
    question: "63. What is the importance of column order in a composite index?",
    answer: `**The Leftmost Prefix Rule:**

A composite index on \`(A, B, C)\` can only be used by SQL queries matching:
- \`WHERE A = 1\`
- \`WHERE A = 1 AND B = 2\`
- \`WHERE A = 1 AND B = 2 AND C = 3\`

It **CANNOT** be used for \`WHERE B = 2\` or \`WHERE C = 3\`!`
  },
  {
    id: "laravel-q64",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Oracle", "IBM"],
    question: "64. Explain database normalization.",
    answer: `**Database Normalization:**

Structuring relational schema to reduce data redundancy (1NF, 2NF, 3NF, BCNF) by isolating data into dedicated tables connected by foreign keys.`
  },
  {
    id: "laravel-q65",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Uber", "Datadog"],
    question: "65. When would you intentionally denormalize?",
    answer: `**Intentional Denormalization:**

In high-read enterprise applications to eliminate expensive multi-table \`JOIN\` operations or aggregate calculations (e.g., storing \`total_orders_count\` directly on the \`users\` table).`
  },
  {
    id: "laravel-q66",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Stripe", "Vercel"],
    question: "66. Explain database transactions.",
    answer: `**Database Transactions:**

A sequence of DB operations performed as a single logical unit of work. Either **ALL** statements succeed or **ALL** statements are rolled back.`
  },
  {
    id: "laravel-q67",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Google", "Amazon"],
    question: "67. What does ACID mean?",
    answer: `**ACID Guarantees:**

- **Atomicity:** All-or-nothing execution.
- **Consistency:** Database transitions from one valid state to another.
- **Isolation:** Concurrent transactions don't interfere with each other.
- **Durability:** Committed transactions persist even after power failures.`
  },
  {
    id: "laravel-q68",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Shopify", "Meta"],
    question: "68. How does DB::transaction() work?",
    answer: `**Internal Workings of DB::transaction():**

\`\`\`php
DB::transaction(function () {
    // Operations
}, 5); // 5 attempts in case of deadlocks!
\`\`\`

Begins PDO transaction (\`BEGIN\`). Executes callback. If no exception occurs, calls \`COMMIT\`. If any Exception/Throwable occurs, automatically calls \`ROLLBACK\` and re-throws the exception.`
  },
  {
    id: "laravel-q69",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Netflix", "Salesforce"],
    question: "69. What happens if an exception occurs inside a transaction?",
    answer: `**Exception in Transaction:**

Laravel catches the Throwable, executes SQL \`ROLLBACK\` to restore DB state to pre-transaction snapshot, and re-throws the exception.`
  },
  {
    id: "laravel-q70",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Stripe", "Uber"],
    question: "70. What are database deadlocks?",
    answer: `**Database Deadlock:**

Occurs when two or more concurrent transactions hold locks on different rows while requesting locks on rows held by the other, resulting in a permanent stall until the DB engine kills one transaction.`
  },
  {
    id: "laravel-q71",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Amazon", "Google"],
    question: "71. How do you handle deadlocks in Laravel?",
    answer: `**Deadlock Handling in Laravel:**

Pass an \`$attempts\` argument to \`DB::transaction(callback, 5)\`. Laravel automatically detects deadlock exceptions and retries the transaction up to 5 times!`
  },
  {
    id: "laravel-q72",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Shopify", "Cloudflare"],
    question: "72. Explain pessimistic locking.",
    answer: `**Pessimistic Locking (\`lockForUpdate()\`):**

Locks the target database rows exclusively (\`SELECT ... FOR UPDATE\`) preventing any other process from reading or updating those rows until the transaction finishes.`
  },
  {
    id: "laravel-q73",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Airbnb", "DoorDash"],
    question: "73. Explain optimistic locking.",
    answer: `**Optimistic Locking:**

Does not lock rows. Uses a \`version\` column. Before saving, checks \`WHERE id = X AND version = 5\`. If no rows are updated, another request modified the record concurrently!`
  },
  {
    id: "laravel-q74",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Stripe", "Vercel"],
    question: "74. Difference between SELECT ... FOR UPDATE and normal SELECT.",
    answer: `**SELECT ... FOR UPDATE vs Normal SELECT:**

- **Normal SELECT:** Non-blocking read (snapshot read in InnoDB).
- **FOR UPDATE:** Exclusive write lock. Concurrent transactions trying to read/write with locks will block until committed.`
  },
  {
    id: "laravel-q75",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Meta", "Google"],
    question: "75. How would you optimize a slow SQL query?",
    answer: `**Query Optimization Workflow:**

1. Run \`EXPLAIN ANALYZE\` on the SQL query.
2. Check for missing indexes or un-indexed JOIN foreign keys.
3. Select only required columns (\`select('id', 'name')\` instead of \`SELECT *\`).
4. Avoid leading wildcard searches (\`LIKE '%term'\`).`
  },
  {
    id: "laravel-q76",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Uber", "Datadog"],
    question: "76. How do you use EXPLAIN?",
    answer: `**Using EXPLAIN in SQL:**

Inspect the \`type\` column (\`ALL\` = full table scan [BAD], \`ref\` / \`eq_ref\` = indexed lookup [GOOD]) and check if \`key\` shows the index being utilized.`
  },
  {
    id: "laravel-q77",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Netflix", "Amazon"],
    question: "77. What causes database connection exhaustion?",
    answer: `**Connection Exhaustion Causes:**

1. Too many concurrent PHP-FPM processes or queue worker instances exceeding MySQL \`max_connections\`.
2. Long-running processes holding open DB sockets.
3. Solution: Use database proxy connection pools like **ProxySQL** or **PgBouncer**.`
  },
  {
    id: "laravel-q78",
    techId: "laravel",
    level: "Senior",
    category: "Database & SQL",
    companies: ["Stripe", "Shopify"],
    question: "78. How would you handle millions of database records?",
    answer: `**Handling Millions of DB Records:**

- Table partitioning (by date/tenant).
- Read/Write replicas with \`read\` and \`write\` connection arrays in \`config/database.php\`.
- Cursor pagination instead of offset pagination.`
  },

  // ==========================================
  // SECTION 5: LARAVEL QUEUES & JOBS (Q79 - Q105)
  // ==========================================
  {
    id: "laravel-q79",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Google", "Meta"],
    question: "79. What is a Laravel Queue?",
    answer: `**Laravel Queue System:**

Allows deferred execution of time-consuming tasks (sending emails, processing video, generating PDFs) in background worker processes.`
  },
  {
    id: "laravel-q80",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Amazon", "Stripe"],
    question: "80. Why do we need queues?",
    answer: `**Why Queues are Essential:**

1. Fast user response times (<50ms HTTP responses).
2. Resilience against external API outages (retrying failed tasks later).
3. Smooth out traffic spikes.`
  },
  {
    id: "laravel-q81",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Uber", "Netflix"],
    question: "81. Explain the complete lifecycle of a queued Job.",
    answer: `**Queued Job Lifecycle:**

1. \`dispatch(new ProcessPodcastJob($podcast))\`.
2. \`SerializesModels\` trait converts Eloquent models to lightweight string identifiers (\`App\\Models\\Podcast:42\`).
3. Payload is serialized to JSON and pushed into Queue store (Redis/SQS).
4. Worker process pulls payload, hydrates model back from DB, and calls \`handle()\`.`
  },
  {
    id: "laravel-q82",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Shopify", "Airbnb"],
    question: "82. Difference between synchronous and asynchronous processing.",
    answer: `**Sync vs Async:**

- **Sync (\`sync\` driver):** Executes code immediately within the HTTP request thread, blocking the browser response.
- **Async (\`redis\` / \`sqs\` driver):** Pushes payload to background queue; worker processes independently.`
  },
  {
    id: "laravel-q83",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Cloudflare", "Vercel"],
    question: "83. What happens when you dispatch a Job?",
    answer: `**Dispatch Mechanics:**

Laravel pushes a JSON payload onto the configured Redis key or DB queue table containing the job class FQDN, serialized properties, and retry constraints.`
  },
  {
    id: "laravel-q84",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Salesforce", "IBM"],
    question: "84. What is ShouldQueue?",
    answer: `**\`ShouldQueue\` Marker Interface:**

Tells Laravel's Event Dispatcher or Bus that this class should be sent to the queue system rather than executed synchronously.`
  },
  {
    id: "laravel-q85",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Datadog", "Palantir"],
    question: "85. Can a Listener implement ShouldQueue?",
    answer: `**YES!**

When an Event Listener implements \`ShouldQueue\`, Laravel automatically queues the listener execution asynchronously.`
  },
  {
    id: "laravel-q86",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Meta", "Google"],
    question: "86. Difference between Job vs Listener.",
    answer: `**Job vs Listener:**

- **Job:** Action-oriented command ("Process this PDF upload").
- **Listener:** Reactive handler responding to a past domain event ("When OrderPaid occurred, send invoice").`
  },
  {
    id: "laravel-q87",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Stripe", "Uber"],
    question: "87. When would you use a Job instead of a Listener?",
    answer: `**When to use a Job:**

When triggering a direct command workflow from controllers without dispatching domain events.`
  },
  {
    id: "laravel-q88",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Amazon", "Netflix"],
    question: "88. Explain queue workers.",
    answer: `**Queue Workers (\`queue:work\`):**

Long-running CLI processes that boot the Laravel framework once in memory and continuously poll the queue store for new jobs.`
  },
  {
    id: "laravel-q89",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Shopify", "Vercel"],
    question: "89. What is a queue driver?",
    answer: `**Queue Driver:**

The storage backend used to hold pending job payloads (\`redis\`, \`sqs\`, \`database\`, \`beanstalkd\`).`
  },
  {
    id: "laravel-q90",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Stripe", "Airbnb"],
    question: "90. Redis vs database queue.",
    answer: `**Redis vs Database Queue:**

- **Redis:** Extremely fast in-memory queues (high throughput, low latency).
- **Database:** Simple to set up, but causes DB lock contention under heavy queue loads.`
  },
  {
    id: "laravel-q91",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Meta", "Google"],
    question: "91. What is Laravel Horizon?",
    answer: `**Laravel Horizon:**

A beautiful dashboard and code-driven configuration system for Redis-powered queues in Laravel. Supports auto-scaling workers, throughput metrics, and job monitoring.`
  },
  {
    id: "laravel-q92",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Uber", "Datadog"],
    question: "92. How do you monitor queues?",
    answer: `**Monitoring Queues:**

Using Laravel Horizon dashboard, Laravel Pulse metrics, or Prometheus alerts monitoring queue depth.`
  },
  {
    id: "laravel-q93",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Amazon", "Stripe"],
    question: "93. How do you retry failed jobs?",
    answer: `**Retrying Failed Jobs:**

Run \`php artisan queue:retry {id}\` or \`php artisan queue:retry all\`.`
  },
  {
    id: "laravel-q94",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Netflix", "Salesforce"],
    question: "94. What are $tries and $backoff?",
    answer: `**$tries & $backoff:**

- **\`public $tries = 3;\`**: Number of times the worker will attempt the job.
- **\`public $backoff = [10, 30, 60];\`**: Delay in seconds between attempt retries (exponential backoff).`
  },
  {
    id: "laravel-q95",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Cloudflare", "Palantir"],
    question: "95. What is retryUntil()?",
    answer: `**\`retryUntil()\`: Time-based Expiration**

Defines a timestamp after which the job should stop retrying regardless of remaining tries.`
  },
  {
    id: "laravel-q96",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["IBM", "Oracle"],
    question: "96. What is a failed job?",
    answer: `**Failed Job:**

A job that exceeds its maximum attempts or throws an unhandled exception recorded into the \`failed_jobs\` table.`
  },
  {
    id: "laravel-q97",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Stripe", "Uber"],
    question: "97. How do you handle failed jobs?",
    answer: `**Handling Failed Jobs:**

Implement the \`failed(?Throwable $exception)\` method on the Job class to notify team via Slack or log audit fallback.`
  },
  {
    id: "laravel-q98",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Google", "Meta"],
    question: "98. What is a Job timeout?",
    answer: `**Job Timeout (\`public $timeout = 60;\`):**

Maximum seconds a job worker process is allowed to run before being killed via process signal.`
  },
  {
    id: "laravel-q99",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Amazon", "Netflix"],
    question: "99. What happens if a job takes longer than its timeout?",
    answer: `**Timeout Exceeded:**

Worker process receives \`SIGALRM\` / \`SIGKILL\`, process dies, and the job is marked as failed.`
  },
  {
    id: "laravel-q100",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Shopify", "Airbnb"],
    question: "100. What is job middleware?",
    answer: `**Job Middleware:**

Classes attached to jobs to encapsulate custom cross-cutting execution rules (e.g., rate-limiting API calls, preventing overlapping jobs).`
  },

  // ==========================================
  // SECTIONS 6 - 22 COMBINED & HIGH-DENSITY SENIOR ANSWERS (Q101 - Q299)
  // ==========================================
  {
    id: "laravel-q101",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Stripe", "Uber"],
    question: "101. Explain job uniqueness.",
    answer: `Implement \`ShouldBeUnique\` interface to prevent dispatching duplicate job instances while one is already pending.`
  },
  {
    id: "laravel-q104",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Queues & Jobs",
    companies: ["Meta", "Google"],
    question: "104. How would you process 1 million emails?",
    answer: `Chunk user IDs into batches of 1,000 using \`Bus::batch()\`, dispatch to dedicated Redis queue worker pools with rate-limiters.`
  },
  {
    id: "laravel-q124",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Cache",
    companies: ["Amazon", "Stripe"],
    question: "124. How do you prevent cache stampede?",
    answer: `Use **Lock-based Warming** (\`Cache::lock()\`) or Laravel 11 \`Cache::flexible()\` probabilistic early expiration.`
  },
  {
    id: "laravel-q135",
    techId: "laravel",
    level: "Senior",
    category: "Redis",
    companies: ["Uber", "Netflix"],
    question: "135. How would you implement distributed locking using Redis?",
    answer: `\`\`\`php
$lock = Cache::lock('process_payment_user_42', 10);
if ($lock->get()) {
    // Perform payment
    $lock->release();
}
\`\`\``
  },
  {
    id: "laravel-q144",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Authentication & Authorization",
    companies: ["Stripe", "Vercel"],
    question: "144. Sanctum vs Passport.",
    answer: `**Sanctum:** Lightweight API token & SPA session cookies. **Passport:** Full OAuth2 server implementation.`
  },
  {
    id: "laravel-q161",
    techId: "laravel",
    level: "Senior",
    category: "Laravel API Development",
    companies: ["Meta", "Google"],
    question: "161. Offset vs cursor pagination.",
    answer: `Cursor pagination uses \`WHERE id > cursor LIMIT size\`. Extremely fast on multi-million record tables!`
  },
  {
    id: "laravel-q169",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Security",
    companies: ["Amazon", "Shopify"],
    question: "169. How does CSRF protection work?",
    answer: `Verifies secret token stored in session against \`X-CSRF-TOKEN\` header to prevent cross-site request forgery.`
  },
  {
    id: "laravel-q207",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Performance",
    companies: ["Stripe", "Uber"],
    question: "207. How do you identify N+1 queries?",
    answer: `Enable \`Model::preventLazyLoading(!app()->isProduction());\` in \`AppServiceProvider\`.`
  },
  {
    id: "laravel-q212",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Performance",
    companies: ["Google", "Meta"],
    question: "212. How would you optimize a Laravel application handling 10,000 requests/sec?",
    answer: `Use **Laravel Octane** with Swoole/FrankenPHP (in-memory persistent app), Redis cache, and DB read replicas.`
  },
  {
    id: "laravel-q221",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Deployment & DevOps",
    companies: ["Netflix", "Amazon"],
    question: "221. What is Supervisor?",
    answer: `A Linux process monitor that keeps Laravel \`queue:work\` processes running continuously.`
  },
  {
    id: "laravel-q251",
    techId: "laravel",
    level: "Senior",
    category: "Laravel + Microservices",
    companies: ["Uber", "Stripe"],
    question: "251. How would you design an Order Service + Payment Service + Notification Service?",
    answer: `Use Event-Driven Architecture (RabbitMQ/Kafka). \`OrderCreated\` event -> Payment Service processes payment -> fires \`PaymentSucceeded\` -> Notification Service sends email.`
  },
  {
    id: "laravel-q275",
    techId: "laravel",
    level: "Senior",
    category: "Real-World Scenario Questions",
    companies: ["Amazon", "Shopify"],
    question: "275. Two users purchase the last available product simultaneously. How do you prevent overselling?",
    answer: `Use pessimistic locking (\`Product::where('id', $id)->lockForUpdate()->first()\`) or atomic DB decrements (\`WHERE stock > 0\`).`
  },
  {
    id: "laravel-q296",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Coding Questions",
    companies: ["Google", "Meta"],
    question: "296. N+1 scenario: $orders = Order::all(); foreach ($orders as $order) { echo $order->user->name; }. What's wrong and how do you fix it?",
    answer: `**Bug:** Triggers 1 query for orders + N queries for users.\n**Fix:** \`$orders = Order::with('user')->get();\``
  },
  {
    id: "laravel-q297",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Coding Questions",
    companies: ["Uber", "Stripe"],
    question: "297. Large dataset: Process 10 million users without exhausting memory.",
    answer: `\`\`\`php\nUser::lazyById(5000)->each(function ($user) {\n    // Process user safely under low memory footprint!\n});\n\`\`\``
  },
  {
    id: "laravel-q298",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Coding Questions",
    companies: ["Amazon", "Netflix"],
    question: "298. Transaction: Create an order, reduce inventory and create a payment record atomically.",
    answer: `\`\`\`php\nDB::transaction(function () use ($userData, $items) {\n    $order = Order::create([...]);\n    foreach ($items as $item) {\n        Product::where('id', $item->id)->lockForUpdate()->decrement('stock', $item->qty);\n    }\n    Payment::create(['order_id' => $order->id, ...]);\n}, 5);\n\`\`\``
  },
  {
    id: "laravel-q299",
    techId: "laravel",
    level: "Senior",
    category: "Laravel Coding Questions",
    companies: ["Stripe", "Shopify"],
    question: "299. Race condition: Stock = 1; Request A and Request B both attempt to buy. How do you prevent both users from buying it?",
    answer: `\`\`\`php\n$affectedRows = DB::table('products')\n    ->where('id', $productId)\n    ->where('stock', '>', 0)\n    ->decrement('stock', 1);\n\nif ($affectedRows === 0) {\n    throw new OutOfStockException('Item out of stock!');\n}\n\`\`\``
  }
];
