import { createTopicSchema } from './createTopicSchema.js';

export const laravelTopics = {
  // 1. LARAVEL CORE & ENVIRONMENT
  "laravel-basics": createTopicSchema({
    id: "laravel-basics",
    techId: "laravel",
    title: "Laravel Framework Architecture & Artisan CLI",
    category: "Laravel Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["php-basics"],
    definition: "Laravel is a web application framework with expressive, elegant syntax following MVC (Model-View-Controller) architecture, powered by Artisan CLI and DotEnv configuration.",
    simpleExplanation: "Laravel gives you pre-built tools for routing, database ORM, authentication, and background queues so you can build web backends rapidly.",
    whyDoesItExist: "Eliminates repetitive PHP boilerplate and provides an industry-standard fullstack web framework.",
    basicExample: `// Artisan CLI Commands
// php artisan make:controller UserController
// php artisan migrate
// php artisan serve

// .env configuration access
$dbHost = env('DB_HOST', '127.0.0.1');
$appName = config('app.name');`,
    howItWorks: [
      "1. Public HTTP request hits public/index.php bootstrap file.",
      "2. HTTP Kernel loads Service Providers and global middleware.",
      "3. Router dispatches request to Controller action returning Response."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ff2d20" stroke-width="2"/><text x="350" y="95" fill="#f87171" font-weight="bold" text-anchor="middle">HTTP Request -&gt; public/index.php -&gt; Router -&gt; Controller -&gt; Response</text></svg>`,
    realWorldExample: `// config/app.php
return [
    'name' => env('APP_NAME', 'LaravelApp'),
    'env' => env('APP_ENV', 'production'),
];`,
    commonUseCases: [
      "Bootstrapping modern web applications using Artisan CLI",
      "Managing environment variables securely via .env",
      "Configuring application settings in config/ directory"
    ],
    commonMistakes: [
      "Using env() directly inside controllers instead of config() (env() returns null when config is cached)",
      "Exposing secret API keys in .env by committing .env to Git"
    ],
    bestPractices: [
      "Always access environment variables through config() files in production",
      "Run php artisan config:cache on deployment for fast configuration loading"
    ],
    whenToUse: ["In all Laravel web applications and REST APIs"],
    whenNotToUse: ["In raw 2-line standalone scripts without a framework"],
    relatedConcepts: ["Artisan CLI", ".env", "Service Providers", "HTTP Kernel"],
    comparison: {
      title: "env() vs config() in Laravel",
      headers: ["Method", "Usage", "Production Safety"],
      rows: [
        ["env('KEY')", "Only inside config/*.php files", "Unsafe if config:cache is active"],
        ["config('app.key')", "Everywhere in application code", "100% Safe in production"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why should you never call env() directly outside config files in Laravel?", answer: "Because when php artisan config:cache runs in production, .env is not loaded, causing all direct env() calls outside config files to return null." }
    ],
    practiceProblem: {
      description: "Write code to fetch config app.name fallback to 'Laravel'.",
      starterCode: `function getAppName(): string {\n  return config('app.name', 'Laravel');\n}`,
      testAssertion: "getAppName() === 'Laravel'",
      solution: `function getAppName(): string {\n  return config('app.name', 'Laravel');\n}`
    },
    quickRevision: "★ Entry point is public/index.php.\n★ Use config() instead of env() in app code.\n★ Run php artisan config:cache in production."
  }),

  // 2. ROUTING & CONTROLLERS
  "laravel-routing": createTopicSchema({
    id: "laravel-routing",
    techId: "laravel",
    title: "Laravel Routing, Route Parameters & Resource Controllers",
    category: "Laravel Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["laravel-basics"],
    definition: "Laravel Routing maps incoming HTTP request URLs and HTTP methods (GET, POST, PUT, DELETE) to specific Controller methods or closures.",
    simpleExplanation: "Routes define URL endpoints (like /users or /orders/{id}) and point them to Controller actions.",
    whyDoesItExist: "Provides clean RESTful URL mapping, parameter constraints, and middleware route grouping.",
    basicExample: `use App\\Http\\Controllers\\UserController;
use Illuminate\\Support\\Facades\\Route;

// Named Route with Parameter
Route::get('/users/{id}', [UserController::class, 'show'])
    ->whereNumber('id')
    ->name('users.show');

// Resource Route (Generates all 7 CRUD routes)
Route::resource('products', ProductController::class);`,
    howItWorks: [
      "1. Router matches incoming URL path against routes/web.php or routes/api.php.",
      "2. Route Model Binding automatically fetches database model by ID.",
      "3. Middleware pipeline executes before invoking Controller method."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">URL Route -&gt; Middleware -&gt; Controller Method -&gt; JSON / View</text></svg>`,
    realWorldExample: `namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;

class UserController extends Controller {
    // Route Model Binding (Auto-fetches User by ID)
    public function show(User $user) {
        return response()->json($user);
    }
}`,
    commonUseCases: [
      "Building RESTful resource endpoints (Route::resource)",
      "Grouping routes behind authentication middleware",
      "Using Route Model Binding for automatic DB lookups"
    ],
    commonMistakes: [
      "Writing database logic inside route closures instead of Controllers",
      "Not naming routes (use ->name() for flexible URL generation)"
    ],
    bestPractices: [
      "Use Route Model Binding (User $user) to eliminate manual User::findOrFail($id)",
      "Always group routes by middleware (Route::middleware('auth'))"
    ],
    whenToUse: ["In all web and API endpoint definitions"],
    whenNotToUse: ["When executing background CLI queue jobs"],
    relatedConcepts: ["Route Model Binding", "Resource Controller", "Named Routes", "Middleware"],
    comparison: {
      title: "Manual ID Fetch vs Route Model Binding",
      headers: ["Aspect", "Manual ID Lookup", "Route Model Binding"],
      rows: [
        ["Code", "$user = User::findOrFail($id);", "public function show(User $user)"],
        ["404 Handling", "Manual or findOrFail", "Automatic 404 response if model missing"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is Route Model Binding in Laravel?", answer: "Route Model Binding automatically injects model instances directly into route controller actions based on the URL parameter matching the database primary key." }
    ],
    practiceProblem: {
      description: "Write a route definition GET /api/v1/health returning JSON status UP.",
      starterCode: `Route::get('/api/v1/health', fn() => response()->json(['status' => 'UP']));`,
      testAssertion: "true",
      solution: `Route::get('/api/v1/health', fn() => response()->json(['status' => 'UP']));`
    },
    quickRevision: "★ Define routes in routes/web.php or routes/api.php.\n★ Use Route Model Binding (User $user).\n★ Use Route::resource() for CRUD controllers."
  }),

  // 3. BLADE TEMPLATING
  "laravel-blade": createTopicSchema({
    id: "laravel-blade",
    techId: "laravel",
    title: "Blade Templating Engine, Directives & Components",
    category: "Laravel Frontend",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["laravel-routing"],
    definition: "Blade is Laravel's powerful, lightweight templating engine. Blade compiles views into raw PHP code cached in storage/framework/views for zero performance overhead.",
    simpleExplanation: "Blade lets you write clean HTML with custom control directives (@if, @foreach) and reusable components (<x-alert />).",
    whyDoesItExist: "Provides clean template inheritance and HTML escaping without raw PHP tags.",
    basicExample: `{{-- Blade View: resources/views/users/index.blade.php --}}
<x-layout title="User List">
    <h1 class="text-xl">Users</h1>
    
    @foreach ($users as $user)
        <div class="p-2 border">
            <p>{{ $user->name }}</p>
        </div>
    @empty
        <p>No users found.</p>
    @endforeach
</x-layout>`,
    howItWorks: [
      "1. Blade directives (@if, {{ $var }}) parsed into PHP syntax.",
      "2. Compiled PHP file saved into storage/framework/views.",
      "3. Expression {{ $var }} automatically executes e() / htmlspecialchars() to prevent XSS."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Blade Template -&gt; Compiled PHP (storage/framework/views) -&gt; XSS Safe HTML</text></svg>`,
    realWorldExample: `{{-- Reusable Component: resources/views/components/button.blade.php --}}
@props(['type' => 'button', 'color' => 'blue'])

<button type="{{ $type }}" class="bg-{{ $color }}-500 text-white px-4 py-2 rounded">
    {{ $slot }}
</button>`,
    commonUseCases: [
      "Building server-side rendered HTML interfaces",
      "Preventing XSS vulnerabilities with {{ $var }} auto-escaping",
      "Creating reusable UI components with Blade Components"
    ],
    commonMistakes: [
      "Using {!! $rawHtml !!} carelessly, exposing app to XSS attacks",
      "Executing heavy SQL queries inside Blade views instead of Controllers"
    ],
    bestPractices: [
      "Use {{ $var }} for auto-escaped output; use {!! $var !!} only for trusted HTML",
      "Use Blade Components (<x-card />) for clean UI modularity"
    ],
    whenToUse: ["In server-side rendered Laravel applications"],
    whenNotToUse: ["When building headless JSON REST APIs for mobile apps"],
    relatedConcepts: ["Blade Directives", "XSS Prevention", "Blade Components", "Slots"],
    comparison: {
      title: "{{ $var }} vs {!! $var !!} in Blade",
      headers: ["Syntax", "Escaping", "Security Risk"],
      rows: [
        ["{{ $var }}", "Escaped via htmlspecialchars()", "Safe (Prevents XSS)"],
        ["{!! $var !!}", "Unescaped raw output", "High XSS risk if input is un-sanitized"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "How does Blade protect applications against XSS attacks?", answer: "Blade's {{ $expression }} syntax automatically runs output through PHP's htmlspecialchars() function, escaping special HTML characters." }
    ],
    practiceProblem: {
      description: "Write a Blade directive for checking empty array.",
      starterCode: `@forelse($items as $item)\n  <p>{{ $item }}</p>\n@empty\n  <p>Empty</p>\n@endforelse`,
      testAssertion: "true",
      solution: `@forelse($items as $item)\n  <p>{{ $item }}</p>\n@empty\n  <p>Empty</p>\n@endforelse`
    },
    quickRevision: "★ {{ $var }} auto-escapes HTML (prevents XSS).\n★ Use Blade components (<x-component />).\n★ Compiled views are cached in storage/framework/views."
  }),

  // 4. DATABASE & MIGRATIONS
  "laravel-database": createTopicSchema({
    id: "laravel-database",
    techId: "laravel",
    title: "Database Migrations, Schema Builder & Seeders",
    category: "Laravel Database",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["laravel-blade"],
    definition: "Migrations act as version control for database schemas, allowing teams to modify database tables programmatically using Laravel Schema Builder, Seeders, and Model Factories.",
    simpleExplanation: "Migrations let you create and alter database tables using PHP code so your team always has identical database schemas.",
    whyDoesItExist: "Eliminates manual SQL dump files and synchronizes DB schema changes across development and production environments.",
    basicExample: `use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
    }
};`,
    howItWorks: [
      "1. php artisan migrate reads pending migration files.",
      "2. Schema Builder translates PHP method calls to SQL ALTER / CREATE DDL statements.",
      "3. Executed migrations logged in migrations database table."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Migration File -&gt; Schema Builder -&gt; SQL DDL -&gt; DB Table</text></svg>`,
    realWorldExample: `// DatabaseSeeder.php
namespace Database\\Seeders;

use App\\Models\\User;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        User::factory(50)->create();
    }
}`,
    commonUseCases: [
      "Defining version-controlled database schema tables",
      "Populating fake test data with Model Factories",
      "Seeding initial admin credentials with Seeders"
    ],
    commonMistakes: [
      "Running php artisan migrate:fresh in production (deletes all production data!)",
      "Modifying an already executed migration file instead of creating a new migration"
    ],
    bestPractices: [
      "Use cascadeOnDelete() on foreign key relationships",
      "Never run migrate:fresh in production environments"
    ],
    whenToUse: ["In all database schema modifications in Laravel"],
    whenNotToUse: ["Do not use raw manual SQL DDL scripts"],
    relatedConcepts: ["Migrations", "Schema Builder", "Seeders", "Factories", "Foreign Keys"],
    comparison: {
      title: "migrate vs migrate:fresh",
      headers: ["Command", "Action", "Production Safety"],
      rows: [
        ["php artisan migrate", "Executes only pending migration files", "Safe"],
        ["php artisan migrate:fresh", "Drops all DB tables and re-runs all migrations", "Dangerous (Data Loss!)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between php artisan migrate:rollback and php artisan migrate:fresh?", answer: "migrate:rollback undoes the last batch of executed migrations by calling down(). migrate:fresh drops all database tables completely and re-runs every migration from scratch." }
    ],
    practiceProblem: {
      description: "Write schema definition for string title column.",
      starterCode: `Schema::create('posts', function (Blueprint $table) {\n  $table->id();\n  $table->string('title');\n  $table->timestamps();\n});`,
      testAssertion: "true",
      solution: `Schema::create('posts', function (Blueprint $table) {\n  $table->id();\n  $table->string('title');\n  $table->timestamps();\n});`
    },
    quickRevision: "★ Migrations are version control for database schemas.\n★ foreignId()->constrained() sets foreign keys.\n★ NEVER run migrate:fresh in production."
  }),

  // 5. ELOQUENT ORM
  "laravel-eloquent": createTopicSchema({
    id: "laravel-eloquent",
    techId: "laravel",
    title: "Eloquent ORM, Relationships & N+1 Problem Resolution",
    category: "Laravel Database",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["laravel-database"],
    definition: "Eloquent is an Active Record ORM that maps database tables to PHP model classes, supporting relationships (hasOne, hasMany, belongsTo, belongsToMany) and Eager Loading (with()) to eliminate N+1 performance bottlenecks.",
    simpleExplanation: "Eloquent lets you query your database using clean PHP methods instead of writing manual SQL queries.",
    whyDoesItExist: "Simplifies CRUD operations and database object relationships with type-safe PHP methods.",
    basicExample: `namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class User extends Model {
    // Relationship: One User has many Orders
    public function orders(): HasMany {
        return $this->hasMany(Order::class);
    }
}

// Querying with Eager Loading (Prevents N+1 Query Problem!)
$users = User::with('orders')->where('status', 'active')->get();`,
    howItWorks: [
      "1. Model method calls transformed to parameterized SQL queries via Query Builder.",
      "2. Eager Loading (User::with('orders')) executes 2 SQL queries instead of N+1 queries.",
      "3. Returns collection of hydrated Eloquent Model instances."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Eloquent Model -&gt; Eager Loading with() -&gt; Optimized SQL Queries</text></svg>`,
    realWorldExample: `// Resolving N+1 Query Problem
// BAD (N+1 Queries):
$books = Book::all(); 
foreach ($books as $book) { echo $book->author->name; } // 101 queries!

// GOOD (2 Queries):
$books = Book::with('author')->get();
foreach ($books as $book) { echo $book->author->name; } // Only 2 queries!`,
    commonUseCases: [
      "Querying database records using Eloquent Model methods",
      "Eager loading relationships with with() to prevent performance degradation",
      "Enforcing global model scopes (e.g. SoftDeletes)"
    ],
    commonMistakes: [
      "Forgetting to eager load relationships inside loops leading to severe N+1 performance lag",
      "Not specifying $fillable or $guarded causing MassAssignmentException"
    ],
    bestPractices: [
      "Always use Model::preventLazyLoading(! app()->isProduction()) during development",
      "Define $fillable array on all Eloquent models for Mass Assignment security"
    ],
    whenToUse: ["In all Laravel database query operations"],
    whenNotToUse: ["When executing ultra-high-throughput raw bulk inserts (use DB::table()->insert())"],
    relatedConcepts: ["Active Record", "N+1 Problem", "Eager Loading", "Mass Assignment"],
    comparison: {
      title: "Lazy Loading vs Eager Loading",
      headers: ["Loading Type", "SQL Queries Executed", "Performance"],
      rows: [
        ["Lazy Loading ($book->author)", "1 + N queries (1 query per loop iteration)", "Poor (N+1 bottleneck)"],
        ["Eager Loading (Book::with('author'))", "2 queries total", "Fast & Scalable"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the N+1 Query Problem in Laravel Eloquent and how do you fix it?", answer: "The N+1 problem occurs when lazy loading relationships inside a loop, executing 1 query for the parent records plus N queries for each child. Fix it using Eager Loading: Model::with('relationship')->get()." }
    ],
    practiceProblem: {
      description: "Write Eloquent query fetching active users with posts.",
      starterCode: `$users = User::with('posts')->where('active', true)->get();`,
      testAssertion: "true",
      solution: `$users = User::with('posts')->where('active', true)->get();`
    },
    quickRevision: "★ Eloquent implements Active Record pattern.\n★ Prevent N+1 using Model::with('relation').\n★ Enable Model::preventLazyLoading() in dev."
  }),

  // 6. AUTHENTICATION & SANCTUM
  "laravel-auth": createTopicSchema({
    id: "laravel-auth",
    techId: "laravel",
    title: "Laravel Authentication, Breeze, Sanctum & Gates/Policies",
    category: "Security",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["laravel-eloquent"],
    definition: "Laravel provides full-stack authentication starter kits (Breeze), SPA/Mobile API token authentication (Sanctum), and fine-grained authorization policies and gates.",
    simpleExplanation: "Sanctum issues API tokens for mobile/SPA auth, while Gates and Policies control user permissions.",
    whyDoesItExist: "Secures web and API routes against unauthorized access out-of-the-box.",
    basicExample: `use Illuminate\\Support\\Facades\\Gate;

// Defining a Gate in AppServiceProvider
Gate::define('update-post', function (User $user, Post $post) {
    return $user->id === $post->user_id;
});

// Authorizing in Controller
if (Gate::denies('update-post', $post)) {
    abort(403);
}`,
    howItWorks: [
      "1. Sanctum issues bearer token for API client login.",
      "2. Auth middleware verifies token on incoming request header.",
      "3. Policy / Gate evaluates permission method returning true or 403 Forbidden."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">API Request (Bearer Token) -&gt; Sanctum Middleware -&gt; Policy Auth</text></svg>`,
    realWorldExample: `// Policy definition: app/Policies/PostPolicy.php
namespace App\\Policies;

use App\\Models\\Post;
use App\\Models\\User;

class PostPolicy {
    public function update(User $user, Post $post): bool {
        return $user->id === $post->user_id || $user->isAdmin();
    }
}`,
    commonUseCases: [
      "Issuing mobile API tokens using Laravel Sanctum",
      "Restricting CRUD actions with Eloquent Model Policies ($this->authorize('update', $post))",
      "Authenticating SPA web frontends with Cookie sessions"
    ],
    commonMistakes: [
      "Storing API bearer tokens in plain text database columns",
      "Forgetting to attach auth:sanctum middleware to protected API routes"
    ],
    bestPractices: [
      "Use Laravel Sanctum for lightweight SPA and mobile API token authentication",
      "Use Model Policies (php artisan make:policy PostPolicy) for authorization logic"
    ],
    whenToUse: ["In all secure web applications and API services"],
    whenNotToUse: ["When building public read-only static pages"],
    relatedConcepts: ["Sanctum", "Breeze", "Gates", "Policies", "Bearer Tokens"],
    comparison: {
      title: "Gates vs Policies in Laravel",
      headers: ["Concept", "Scope", "Best Used For"],
      rows: [
        ["Gates", "Closure-based global permission check", "General actions (e.g. view-admin-dashboard)"],
        ["Policies", "Class-based permission rules for a specific Model", "Model resource authorization (PostPolicy, OrderPolicy)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between Gates and Policies in Laravel?", answer: "Gates are closure-based checks for general non-model permissions (e.g. access admin panel). Policies organize authorization rules around specific Eloquent Models (e.g. PostPolicy for update/delete actions)." }
    ],
    practiceProblem: {
      description: "Write policy method return statement matching user_id.",
      starterCode: `public function update(User $user, Post $post): bool {\n  return $user->id === $post->user_id;\n}`,
      testAssertion: "true",
      solution: `public function update(User $user, Post $post): bool {\n  return $user->id === $post->user_id;\n}`
    },
    quickRevision: "★ Sanctum provides API token & SPA cookie authentication.\n★ Gates are closure-based authorization checks.\n★ Policies organize permissions per Eloquent Model."
  }),

  // 7. APIS & RESOURCES
  "laravel-apis": createTopicSchema({
    id: "laravel-apis",
    techId: "laravel",
    title: "Laravel REST APIs, Eloquent API Resources & Rate Limiting",
    category: "Laravel APIs",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["laravel-auth"],
    definition: "API development in Laravel uses Eloquent API Resources (JsonResource) to format JSON responses, API route rate limiting (throttle middleware), and standard HTTP status code responses.",
    simpleExplanation: "API Resources transform Eloquent database models into clean, structured JSON API responses for mobile and frontend clients.",
    whyDoesItExist: "Prevents leaking private database columns and provides a consistent JSON transformation layer.",
    basicExample: `namespace App\\Http\\Resources;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}`,
    howItWorks: [
      "1. Controller returns UserResource::make($user) or UserResource::collection($users).",
      "2. JsonResource executes toArray() converting Eloquent attributes into array.",
      "3. Response returned with application/json header and 200 OK status."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Eloquent Model -&gt; JsonResource toArray() -&gt; Clean JSON API Response</text></svg>`,
    realWorldExample: `// Controller Action
public function index() {
    $users = User::paginate(10);
    return UserResource::collection($users);
}`,
    commonUseCases: [
      "Formatting JSON API responses for frontend SPAs and mobile apps",
      "Hiding sensitive model attributes (e.g. password_hash, remember_token)",
      "Protecting API endpoints against DDoS using rate limiting (throttle:60,1)"
    ],
    commonMistakes: [
      "Returning raw Eloquent models directly from controllers in production APIs",
      "Forgetting to handle API pagination metadata"
    ],
    bestPractices: [
      "Always use Eloquent JsonResource classes for API response transformation",
      "Protect public API endpoints with throttle rate limiters"
    ],
    whenToUse: ["In all RESTful API backends built with Laravel"],
    whenNotToUse: ["When rendering traditional server-side Blade HTML views"],
    relatedConcepts: ["JsonResource", "Rate Limiting", "Throttle Middleware", "REST API"],
    comparison: {
      title: "Raw Model Return vs JsonResource",
      headers: ["Aspect", "Raw Model Return", "JsonResource Transformation"],
      rows: [
        ["Data Control", "Exposes all database columns", "Explicit control over returned fields"],
        ["Format Stability", "Breaks frontend if DB column renamed", "Stable JSON structure independent of DB schema"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you use Eloquent API Resources instead of returning raw models directly?", answer: "API Resources create a transformation layer between database schemas and JSON responses, hiding internal DB columns, preventing breaking API changes, and formatting attributes safely." }
    ],
    practiceProblem: {
      description: "Write code to return collection resource.",
      starterCode: `return UserResource::collection(User::all());`,
      testAssertion: "true",
      solution: `return UserResource::collection(User::all());`
    },
    quickRevision: "★ JsonResource transforms models to JSON.\n★ Hides sensitive DB columns.\n★ Use UserResource::collection($users) for arrays."
  }),

  // 8. SERVICE CONTAINER & PROVIDERS
  "laravel-service-container": createTopicSchema({
    id: "laravel-service-container",
    techId: "laravel",
    title: "Laravel Service Container, Dependency Injection & Providers",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["laravel-apis"],
    definition: "The Service Container is Laravel's core tool for managing class dependencies and performing Dependency Injection. Service Providers (AppServiceProvider) bind interface abstractions to concrete implementation instances.",
    simpleExplanation: "The Service Container automatically resolves and injects required class dependencies into your controllers without manual new ClassName() calls.",
    whyDoesItExist: "Powers Laravel's entire framework architecture and enables easy unit testing via mock bindings.",
    basicExample: `namespace App\\Providers;

use App\\Services\\PaymentService;
use App\\Services\\StripePaymentService;
use Illuminate\\Support\\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    // Binding Interface to Concrete Implementation
    public function register(): void {
        $this->app->singleton(PaymentService::class, function ($app) {
            return new StripePaymentService(config('services.stripe.secret'));
        });
    }
}`,
    howItWorks: [
      "1. Controller constructor typehints PaymentService dependency.",
      "2. Service Container uses PHP Reflection API to inspect required parameters.",
      "3. Container automatically instantiates and injects StripePaymentService singleton."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Controller Typehint -&gt; Service Container Reflection -&gt; Injected Singleton</text></svg>`,
    realWorldExample: `// Automatic Constructor Injection
namespace App\\Http\\Controllers;

use App\\Services\\PaymentService;

class OrderController extends Controller {
    public function __construct(private PaymentService $payment) {}

    public function checkout() {
        $this->payment->charge(100);
    }
}`,
    commonUseCases: [
      "Injecting service dependencies automatically into Controllers",
      "Swapping concrete service implementations in AppServiceProvider",
      "Binding Singletons ($this->app->singleton) for shared memory instances"
    ],
    commonMistakes: [
      "Using hardcoded new ClassName() inside controllers, breaking dependency injection",
      "Executing heavy business logic inside ServiceProvider register() method (use boot() instead)"
    ],
    bestPractices: [
      "Bind interfaces to concrete classes in Service Providers",
      "Use $this->app->singleton() for services that maintain state or connection pools"
    ],
    whenToUse: ["In all scalable Laravel application architectures"],
    whenNotToUse: ["When instantiating simple data transfer objects (DTOs)"],
    relatedConcepts: ["Service Container", "Dependency Injection", "Service Providers", "Singleton"],
    comparison: {
      title: "bind() vs singleton() in Service Container",
      headers: ["Binding Method", "Instance Lifetime", "Performance"],
      rows: [
        ["$this->app->bind()", "New instance created on EVERY injection", "Multiple memory allocations"],
        ["$this->app->singleton()", "Single instance resolved ONCE and reused", "Efficient memory sharing"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between bind() and singleton() in Laravel's Service Container?", answer: "bind() creates a brand new object instance every time the dependency is requested. singleton() resolves the object once and returns the exact same cached instance for all subsequent requests." }
    ],
    practiceProblem: {
      description: "Write singleton binding code inside ServiceProvider register().",
      starterCode: `$this->app->singleton(PaymentService::class, fn() => new PaymentService());`,
      testAssertion: "true",
      solution: `$this->app->singleton(PaymentService::class, fn() => new PaymentService());`
    },
    quickRevision: "★ Service Container resolves dependencies via Reflection.\n★ AppServiceProvider binds interfaces to concrete classes.\n★ singleton() reuses the same instance."
  }),

  // 9. EVENTS & OBSERVERS
  "laravel-events": createTopicSchema({
    id: "laravel-events",
    techId: "laravel",
    title: "Laravel Events, Listeners, Dispatcher & Model Observers",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["laravel-service-container"],
    definition: "Laravel's Event system implements the Observer pattern, decoupling application events (OrderPlaced) from handling listeners (SendEmailNotification, UpdateInventory). Model Observers monitor Eloquent lifecycle events.",
    simpleExplanation: "Events notify your app when something happens, allowing multiple listeners to react asynchronously without cluttering the main controller.",
    whyDoesItExist: "Decouples application logic and enables asynchronous background event handling.",
    basicExample: `use App\\Events\\OrderPlaced;

// Dispatching Event in Controller
OrderPlaced::dispatch($order);

// Event Listener (Implements ShouldQueue for async processing!)
namespace App\\Listeners;

use App\\Events\\OrderPlaced;
use Illuminate\\Contracts\\Queue\\ShouldQueue;

class SendOrderConfirmationEmail implements ShouldQueue {
    public function handle(OrderPlaced $event): void {
        // Sends email in background queue worker!
    }
}`,
    howItWorks: [
      "1. Event::dispatch() fires event payload to Event Dispatcher.",
      "2. Dispatcher iterates over registered Listeners in EventServiceProvider.",
      "3. If Listener implements ShouldQueue, job is pushed to Redis queue."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Event::dispatch() -&gt; Dispatcher -&gt; Listener 1 (Sync) | Listener 2 (Queue)</text></svg>`,
    realWorldExample: `// Model Observer: app/Observers/UserObserver.php
namespace App\\Observers;

use App\\Models\\User;

class UserObserver {
    public function created(User $user): void {
        // Runs automatically whenever a new User model is saved to DB!
    }
}`,
    commonUseCases: [
      "Decoupling side-effects (emails, analytics, push notifications) from HTTP controllers",
      "Offloading slow listeners to background queues via ShouldQueue",
      "Monitoring Eloquent model lifecycle events with Model Observers"
    ],
    commonMistakes: [
      "Putting heavy synchronous tasks inside non-queued Event Listeners",
      "Triggering infinite loops by saving model inside Eloquent Observer saved() hook"
    ],
    bestPractices: [
      "Implement ShouldQueue on all listeners performing network or email I/O",
      "Use Model Observers (php artisan make:observer UserObserver) for clean audit logging"
    ],
    whenToUse: ["When an action triggers multiple independent side-effects"],
    whenNotToUse: ["When an action requires a simple direct return value"],
    relatedConcepts: ["Observer Pattern", "Event Dispatcher", "ShouldQueue", "Model Observer"],
    comparison: {
      title: "Synchronous vs Queued Event Listener",
      headers: ["Listener Type", "HTTP Response Time", "Failure Behavior"],
      rows: [
        ["Sync Listener", "Slows HTTP response (waits for execution)", "Fails the entire HTTP request"],
        ["Queued Listener (ShouldQueue)", "Instant HTTP response (returns 200 OK immediately)", "Retried automatically in background worker"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you make a Laravel Event Listener execute asynchronously in the background?", answer: "Add `implements ShouldQueue` to the Listener class definition. Laravel will automatically serialize the event and push it to the background job queue." }
    ],
    practiceProblem: {
      description: "Write code to dispatch OrderPlaced event.",
      starterCode: `OrderPlaced::dispatch($order);`,
      testAssertion: "true",
      solution: `OrderPlaced::dispatch($order);`
    },
    quickRevision: "★ Events decouple controllers from side-effects.\n★ Add implements ShouldQueue for async listeners.\n★ Observers monitor Eloquent model lifecycle hooks."
  }),

  // 10. JOBS, QUEUES & HORIZON
  "laravel-queues": createTopicSchema({
    id: "laravel-queues",
    techId: "laravel",
    title: "Laravel Queues, Background Jobs, Workers & Horizon",
    category: "Distributed Systems",
    difficulty: "Senior",
    experienceBand: "3–5+ years",
    prerequisites: ["laravel-events"],
    definition: "Laravel Queues defer time-consuming tasks (sending emails, video encoding) to background queue workers backed by Redis or databases. Laravel Horizon provides a real-time dashboard for Redis queues.",
    simpleExplanation: "Background Jobs handle slow tasks in the background so your web API responds instantly without keeping users waiting.",
    whyDoesItExist: "Prevents API request timeouts and scales background task execution horizontally across worker servers.",
    basicExample: `namespace App\\Jobs;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;

class ProcessVideoJob implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public string $videoPath) {}

    public function handle(): void {
        // Heavy background video processing
    }
}

// Dispatching Job:
ProcessVideoJob::dispatch('/path/to/video.mp4')->onQueue('processing');`,
    howItWorks: [
      "1. Dispatcher serializes Job instance payload into Redis queue data structure.",
      "2. Background CLI Worker (php artisan queue:work) pops job from Redis.",
      "3. Worker executes handle() method with automated retries on failure."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">HTTP Controller -&gt; Redis Queue -&gt; CLI Worker (php artisan queue:work) -&gt; Horizon</text></svg>`,
    realWorldExample: `// Retries & Timeout configuration
class GenerateReportJob implements ShouldQueue {
    public int $tries = 3;
    public int $backoff = 60; // Wait 60s before retry

    public function handle(): void {
        // Generate PDF report
    }
}`,
    commonUseCases: [
      "Sending transactional emails, SMS notifications, and webhook calls",
      "Processing image uploads and generating PDF reports",
      "Monitoring Redis queue metrics with Laravel Horizon"
    ],
    commonMistakes: [
      "Forgetting to restart queue workers (php artisan queue:restart) after deploying new code",
      "Not configuring job retries ($tries) leading to infinite failing job loops"
    ],
    bestPractices: [
      "Use Redis driver combined with Laravel Horizon for production queue monitoring",
      "Run php artisan queue:restart in deployment deployment scripts"
    ],
    whenToUse: ["In all background processing tasks taking longer than 200ms"],
    whenNotToUse: ["When an operation must return data immediately to the synchronous HTTP response"],
    relatedConcepts: ["Queues", "Job Workers", "Redis", "Laravel Horizon", "Exponential Backoff"],
    comparison: {
      title: "sync vs redis Queue Driver",
      headers: ["Driver", "Execution Timing", "Production Use"],
      rows: [
        ["sync", "Synchronous inside HTTP request", "Local testing only"],
        ["redis", "Asynchronous in background CLI worker", "Production standard (High scale)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why must you run php artisan queue:restart after deploying new code to a Laravel server?", answer: "Because queue workers are long-lived PHP processes running in memory. They store the old code in RAM until signaled to restart and reload fresh code." }
    ],
    practiceProblem: {
      description: "Write code to dispatch ProcessVideoJob to background queue.",
      starterCode: `ProcessVideoJob::dispatch('video.mp4');`,
      testAssertion: "true",
      solution: `ProcessVideoJob::dispatch('video.mp4');`
    },
    quickRevision: "★ Queues handle slow background tasks asynchronously.\n★ Use Redis + Horizon in production.\n★ Always run php artisan queue:restart on code deploy."
  }),

  // 11. LARAVEL ARCHITECTURE & SCALE
  "laravel-architecture": createTopicSchema({
    id: "laravel-architecture",
    techId: "laravel",
    title: "Laravel Architecture at Scale, DDD & Multi-Tenancy",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["laravel-queues"],
    definition: "Scaling Laravel applications involves Domain-Driven Design (DDD), Repository Pattern, Multi-Tenancy database isolation, Octane (Swoole/RoadRunner high performance), and Redis Caching.",
    simpleExplanation: "Enterprise Laravel scaling organizes code into domain boundaries and utilizes high-speed application servers like Laravel Octane.",
    whyDoesItExist: "Handles millions of HTTP requests per minute and prevents monolithic code degradation.",
    basicExample: `// Laravel Octane High Performance Setup
// php artisan octane:start --server=swoole --workers=4

// Domain-Driven Design Directory Structure
// app/
// └── Domain/
//     └── Orders/
//         ├── Actions/
//         ├── Models/
//         └── Services/`,
    howItWorks: [
      "1. Laravel Octane boots framework ONCE in memory (Swoole/RoadRunner).",
      "2. Keeps application state in RAM memory across thousands of HTTP requests.",
      "3. Delivers sub-millisecond response times comparable to Go / Node.js."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Swoole / RoadRunner App Server -&gt; Octane Memory Boot -&gt; Sub-ms Response</text></svg>`,
    realWorldExample: `// Multi-Tenancy DB Connection Switching
namespace App\\Services;

use Illuminate\\Support\\Facades\\DB;

class TenantService {
    public function switchTenant(string $tenantDb): void {
        config(['database.connections.tenant.database' => $tenantDb]);
        DB::purge('tenant');
        DB::reconnect('tenant');
    }
}`,
    commonUseCases: [
      "Scaling high-throughput Laravel APIs with Laravel Octane",
      "Structuring complex enterprise systems using Domain-Driven Design (DDD)",
      "Building SaaS platforms with Multi-Tenancy data isolation"
    ],
    commonMistakes: [
      "Leaking memory in static properties when running Laravel Octane",
      "Building bloated monolithic controllers in enterprise applications"
    ],
    bestPractices: [
      "Use Action classes (Single Responsibility) for business operations",
      "Use Laravel Octane with Swoole/RoadRunner for ultra-low latency APIs"
    ],
    whenToUse: ["In high-scale enterprise Laravel applications"],
    whenNotToUse: ["In small single-user blogs"],
    relatedConcepts: ["Laravel Octane", "Swoole", "DDD", "Multi-Tenancy", "Action Classes"],
    comparison: {
      title: "Traditional PHP-FPM vs Laravel Octane",
      headers: ["Metric", "Traditional PHP-FPM", "Laravel Octane (Swoole)"],
      rows: [
        ["Framework Boot", "Boots framework on EVERY HTTP request", "Boots ONCE in memory on server start"],
        ["Request Latency", "20ms – 50ms average", "1ms – 5ms (Sub-millisecond speed)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does Laravel Octane achieve sub-millisecond HTTP response speeds?", answer: "Laravel Octane boots the framework application instance ONCE in RAM memory using high-performance application servers like Swoole or RoadRunner, serving thousands of HTTP requests without re-booting framework files on every request." }
    ],
    practiceProblem: {
      description: "Write code to start Octane server.",
      starterCode: `// php artisan octane:start --server=swoole`,
      testAssertion: "true",
      solution: `// php artisan octane:start --server=swoole`
    },
    quickRevision: "★ Octane boots Laravel ONCE in memory.\n★ Sub-millisecond speeds using Swoole/RoadRunner.\n★ Organize large apps using DDD & Action classes."
  })
};
