import { createTopicSchema } from './createTopicSchema.js';

export const phpTopics = {
  // 1. PHP SYNTAX & DATA TYPES
  "php-basics": createTopicSchema({
    id: "php-basics",
    techId: "php",
    title: "PHP Syntax, Dynamic Typing & Superglobals",
    category: "PHP Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Programming Fundamentals"],
    definition: "PHP (Hypertext Preprocessor) is a widely-used open source server-side scripting language embedded in HTML, supporting dynamic typing and powerful superglobal arrays ($_GET, $_POST, $_SERVER).",
    simpleExplanation: "PHP runs on the web server to generate HTML pages dynamically before sending them to the user's browser.",
    whyDoesItExist: "Created to make web page creation dynamic and enable web servers to interact with databases and user form inputs easily.",
    basicExample: `<?php
$developerName = "Tushar";
$experienceYears = 4;
$isSenior = true;

echo "Developer: $developerName, Exp: $experienceYears yrs";
?>`,
    howItWorks: [
      "1. Web Server (Nginx/Apache) routes request to PHP-FPM execution engine.",
      "2. Zend Engine compiles PHP script into opcode in RAM memory.",
      "3. Executed opcode outputs HTML / JSON payload to web client."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#777bb4" stroke-width="2"/><text x="350" y="95" fill="#a5b4fc" font-weight="bold" text-anchor="middle">Zend Engine Opcode Execution Flow</text></svg>`,
    realWorldExample: `<?php
function getGreeting(string $userName): string {
    $hour = (int)date('H');
    $timeOfDay = $hour < 12 ? 'Morning' : ($hour < 18 ? 'Afternoon' : 'Evening');
    return "Good $timeOfDay, $userName!";
}
echo getGreeting("Alice");
?>`,
    commonUseCases: [
      "Processing HTML form submissions via $_POST",
      "Accessing HTTP headers & server info via $_SERVER",
      "Managing user sessions with $_SESSION"
    ],
    commonMistakes: [
      "Not checking isset() or empty() on $_GET variables causing Undefined Index notices",
      "Using loose comparison == instead of strict comparison ==="
    ],
    bestPractices: [
      "Enable declare(strict_types=1); for strict type checking",
      "Always sanitize input variables from $_GET and $_POST"
    ],
    whenToUse: ["In server-side rendered web applications and backend API services"],
    whenNotToUse: ["In client-side browser DOM manipulation"],
    relatedConcepts: ["Zend Engine", "Superglobals", "PHP-FPM", "Opcode"],
    comparison: {
      title: "PHP vs Client-Side JavaScript",
      headers: ["Aspect", "PHP", "Client-Side JS"],
      rows: [
        ["Execution Place", "Web Server (PHP-FPM)", "User Web Browser"],
        ["Database Access", "Direct database connection", "Requires REST/GraphQL API"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What are PHP Superglobals?", answer: "Superglobals are built-in arrays ($GLOBALS, $_SERVER, $_GET, $_POST, $_FILES, $_COOKIE, $_SESSION, $_REQUEST, $_ENV) accessible in all scopes throughout a script." }
    ],
    practiceProblem: {
      description: "Write a PHP function formatUserTag that takes name and returns '@name'.",
      starterCode: `function formatUserTag($name) {\n  return '@' . $name;\n}\necho formatUserTag('alice');`,
      testAssertion: "formatUserTag('alice') === '@alice'",
      solution: `function formatUserTag($name) {\n  return '@' . $name;\n}`
    },
    quickRevision: "★ PHP executes server-side via Zend Engine.\n★ Use declare(strict_types=1) for type safety.\n★ Superglobals like $_POST and $_GET provide request data."
  }),

  // 2. CONTROL STRUCTURES
  "php-control-flow": createTopicSchema({
    id: "php-control-flow",
    techId: "php",
    title: "PHP Control Structures, Switch & Match Expression",
    category: "PHP Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["php-basics"],
    definition: "Control structures control the flow of execution based on conditions (if/else, switch, match) and loops (for, foreach, while). PHP 8 introduced the strict match expression.",
    simpleExplanation: "Match and switch let you evaluate conditions cleanly. PHP 8's match returns a value directly and performs strict === comparison.",
    whyDoesItExist: "PHP 8 match expressions eliminate switch verbosity, break statements, and loose comparison bugs.",
    basicExample: `<?php
$statusCode = 200;

// PHP 8 Match Expression
$statusMessage = match ($statusCode) {
    200, 201 => 'Success',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown Status',
};

echo $statusMessage; // Output: Success
?>`,
    howItWorks: [
      "1. match performs strict (===) type and value checks.",
      "2. Evaluates only the matching arm and returns its value directly.",
      "3. Throws UnhandledMatchError if no arm matches and default is missing."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">PHP 8 match Arm Evaluation Pipeline</text></svg>`,
    realWorldExample: `<?php
$role = 'admin';
$permissions = match ($role) {
    'admin' => ['create', 'read', 'update', 'delete'],
    'editor' => ['create', 'read', 'update'],
    'viewer' => ['read'],
    default => [],
};
?>`,
    commonUseCases: [
      "Mapping HTTP status codes to response labels",
      "Iterating over database results using foreach",
      "Validating request input parameters"
    ],
    commonMistakes: [
      "Forgetting break statements in traditional switch blocks causing fallthrough",
      "Expecting switch to perform strict equality checks"
    ],
    bestPractices: [
      "Prefer PHP 8 match expressions over legacy switch blocks",
      "Always include a default arm in match expressions"
    ],
    whenToUse: ["In all modern PHP 8 conditional mapping logic"],
    whenNotToUse: ["When legacy PHP 7 compatibility is strictly required"],
    relatedConcepts: ["match vs switch", "Strict Equality", "foreach", "UnhandledMatchError"],
    comparison: {
      title: "switch vs match in PHP 8",
      headers: ["Feature", "Legacy switch", "PHP 8 match"],
      rows: [
        ["Equality Check", "Loose (==)", "Strict (===)"],
        ["Return Value", "Does not return value", "Returns expression value directly"],
        ["Break Keyword", "Required to prevent fallthrough", "Not required (No fallthrough)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between switch and match in PHP 8?", answer: "match performs strict === comparison, returns a value, and does not require break statements, whereas switch uses loose == comparison." }
    ],
    practiceProblem: {
      description: "Write a PHP match expression returning 'Admin' for role 1 and 'User' for role 2.",
      starterCode: `function getRoleLabel(int $roleId): string {\n  return match($roleId) {\n    1 => 'Admin',\n    2 => 'User',\n    default => 'Guest'\n  };\n}`,
      testAssertion: "getRoleLabel(1) === 'Admin'",
      solution: `function getRoleLabel(int $roleId): string {\n  return match($roleId) {\n    1 => 'Admin',\n    2 => 'User',\n    default => 'Guest'\n  };\n}`
    },
    quickRevision: "★ Prefer match over switch in PHP 8.\n★ match uses strict === equality.\n★ Always include a default arm."
  }),

  // 3. FUNCTIONS & ARRAY MANIPULATION
  "php-functions": createTopicSchema({
    id: "php-functions",
    techId: "php",
    title: "PHP Functions, Arrow Functions & Array Functions",
    category: "PHP Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["php-control-flow"],
    definition: "PHP provides first-class function support, short arrow functions (fn() => expr), and over 80 built-in array processing utilities (array_map, array_filter, array_reduce).",
    simpleExplanation: "PHP array functions let you map, filter, and modify arrays cleanly without writing verbose manual loops.",
    whyDoesItExist: "Encapsulates reusable logic and enables functional array processing patterns.",
    basicExample: `<?php
$numbers = [1, 2, 3, 4, 5];

// Arrow function & array_map
$squared = array_map(fn($n) => $n * $n, $numbers);

// array_filter
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);

print_r($squared);
?>`,
    howItWorks: [
      "1. fn() arrow functions capture outer variables by value automatically.",
      "2. array_map applies callback across each element in target array.",
      "3. array_filter creates new array retaining elements where callback returns true."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">array_map / array_filter Pipeline</text></svg>`,
    realWorldExample: `<?php
$users = [
    ['name' => 'Alice', 'active' => true],
    ['name' => 'Bob', 'active' => false],
];

$activeUserNames = array_map(
    fn($u) => $u['name'],
    array_filter($users, fn($u) => $u['active'])
);
?>`,
    commonUseCases: [
      "Filtering active database records from memory arrays",
      "Transforming DB rows into formatted API payloads",
      "Building array lookup dictionaries"
    ],
    commonMistakes: [
      "Confusing argument ordering between array_map(cb, arr) and array_filter(arr, cb)",
      "Forgetting that arrow functions in PHP capture variables by value, not by reference"
    ],
    bestPractices: [
      "Typehint parameters and return types (e.g. fn(int $x): int => $x * 2)",
      "Use array_values() after array_filter() to reset numeric array keys"
    ],
    whenToUse: ["In all functional PHP array processing tasks"],
    whenNotToUse: ["When iterating multi-gigabyte files (use Generators instead)"],
    relatedConcepts: ["array_map", "array_filter", "array_reduce", "fn() Arrow Functions"],
    comparison: {
      title: "array_map vs array_filter",
      headers: ["Utility", "Output Size", "Purpose"],
      rows: [
        ["array_map", "Same size as input array", "Transforms every element"],
        ["array_filter", "Subset size (0 to N elements)", "Filters elements matching condition"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Notice the difference in argument order between array_map and array_filter in PHP?", answer: "array_map accepts callback first then array: array_map($fn, $arr). array_filter accepts array first then callback: array_filter($arr, $fn)." }
    ],
    practiceProblem: {
      description: "Write a function doubleArray returning doubled values of input array.",
      starterCode: `function doubleArray(array $arr): array {\n  return array_map(fn($n) => $n * 2, $arr);\n}\nprint_r(doubleArray([1, 2, 3]));`,
      testAssertion: "doubleArray([1, 2])[0] === 2",
      solution: `function doubleArray(array $arr): array {\n  return array_map(fn($n) => $n * 2, $arr);\n}`
    },
    quickRevision: "★ array_map(cb, arr) transforms elements.\n★ array_filter(arr, cb) filters elements.\n★ PHP Arrow functions use fn() => expr syntax."
  }),

  // 4. OOP BASICS
  "php-oop-basics": createTopicSchema({
    id: "php-oop-basics",
    techId: "php",
    title: "PHP OOP Basics: Classes, Objects & Visibility",
    category: "Object-Oriented PHP",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "11 min",
    prerequisites: ["php-functions"],
    definition: "Object-Oriented Programming in PHP structures code into Classes with encapsulated properties and methods, supporting visibility modifiers (public, protected, private) and PHP 8 Constructor Property Promotion.",
    simpleExplanation: "Classes are blueprints for creating objects. PHP 8 lets you declare constructor parameters and properties in one clean line.",
    whyDoesItExist: "Organizes code into modular, maintainable domain entities and prevents global scope pollution.",
    basicExample: `<?php
class User {
    // PHP 8 Constructor Property Promotion
    public function __construct(
        public string $name,
        private string $email,
        protected string $role = 'member'
    ) {}

    public function getEmail(): string {
        return $this->email;
    }
}

$user = new User("Alice", "alice@example.com");
echo $user->name; // Alice
?>`,
    howItWorks: [
      "1. new keyword allocates object memory on PHP Zend Heap.",
      "2. __construct() initializes instance state.",
      "3. Visibility controls access: public (everywhere), protected (class & subclasses), private (this class only)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">PHP Class Blueprint -&gt; Heap Object Instance</text></svg>`,
    realWorldExample: `<?php
class BankAccount {
    private float $balance = 0.0;

    public function deposit(float $amount): void {
        if ($amount > 0) $this->balance += $amount;
    }

    public function getBalance(): float {
        return $this->balance;
    }
}
?>`,
    commonUseCases: [
      "Encapsulating user entities and database models",
      "Building service classes for business logic",
      "Enforcing encapsulation using private properties"
    ],
    commonMistakes: [
      "Making all properties public, breaking encapsulation",
      "Forgetting $this-> when accessing instance properties inside methods"
    ],
    bestPractices: [
      "Use PHP 8 Constructor Property Promotion to eliminate boilerplate code",
      "Default to private or protected visibility for class fields"
    ],
    whenToUse: ["In all domain models, services, and object-oriented PHP architecture"],
    whenNotToUse: ["In small single-line procedural utility scripts"],
    relatedConcepts: ["Encapsulation", "Visibility Modifiers", "Constructor Promotion", "$this"],
    comparison: {
      title: "Visibility Modifiers in PHP",
      headers: ["Modifier", "Same Class", "Child Class", "External Code"],
      rows: [
        ["public", "✅ Allowed", "✅ Allowed", "✅ Allowed"],
        ["protected", "✅ Allowed", "✅ Allowed", "❌ Blocked"],
        ["private", "✅ Allowed", "❌ Blocked", "❌ Blocked"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is PHP 8 Constructor Property Promotion?", answer: "Constructor Property Promotion allows declaring class properties directly inside the __construct() argument list with visibility flags, eliminating duplicate property definitions." }
    ],
    practiceProblem: {
      description: "Write a User class with private $name property and getter getName().",
      starterCode: `class User {\n  public function __construct(private string $name) {}\n  public function getName(): string { return $this->name; }\n}\n$u = new User('Bob');\necho $u->getName();`,
      testAssertion: "(new User('Bob'))->getName() === 'Bob'",
      solution: `class User {\n  public function __construct(private string $name) {}\n  public function getName(): string { return $this->name; }\n}`
    },
    quickRevision: "★ Use constructor promotion for clean property initialization.\n★ public (everywhere), protected (subclasses), private (class only).\n★ Always access instance fields via $this->."
  }),

  // 5. INTERFACES & TRAITS
  "php-interfaces-traits": createTopicSchema({
    id: "php-interfaces-traits",
    techId: "php",
    title: "Inheritance, Interfaces & Traits in PHP",
    category: "Object-Oriented PHP",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["php-oop-basics"],
    definition: "PHP supports single class inheritance (extends), contract enforcement via Interfaces (implements), and horizontal code composition using Traits (use TraitName).",
    simpleExplanation: "Interfaces define what methods a class MUST implement. Traits let you share code methods across multiple unrelated classes without inheritance.",
    whyDoesItExist: "Solves PHP single inheritance limitation by allowing horizontal code reuse via Traits and polymorphic decoupling via Interfaces.",
    basicExample: `<?php
interface LoggerInterface {
    public function log(string $msg): void;
}

trait TimestampTrait {
    public function getTimestamp(): string {
        return date('Y-m-d H:i:s');
    }
}

class FileLogger implements LoggerInterface {
    use TimestampTrait;

    public function log(string $msg): void {
        echo "[" . $this->getTimestamp() . "] $msg";
    }
}
?>`,
    howItWorks: [
      "1. Interface guarantees method signatures without implementation code.",
      "2. Class implementing interface must define all interface methods.",
      "3. Trait code is compiler-injected horizontally into the class at runtime."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Interface Contract + Trait Code Composition</text></svg>`,
    realWorldExample: `<?php
interface PaymentGatewayInterface {
    public function process(float $amount): bool;
}

class StripeGateway implements PaymentGatewayInterface {
    public function process(float $amount): bool {
        // Stripe API charge
        return true;
    }
}
?>`,
    commonUseCases: [
      "Decoupling high-level services using Interface polymorphism",
      "Sharing utility methods across multiple Controllers using Traits",
      "Enforcing API contracts across multiple database drivers"
    ],
    commonMistakes: [
      "Overusing Traits creating hidden dependencies and spaghetti code",
      "Adding concrete code inside Interfaces (Interfaces can ONLY declare method signatures)"
    ],
    bestPractices: [
      "Typehint against Interfaces instead of concrete classes (Dependency Inversion)",
      "Keep Traits focused on single helper concerns"
    ],
    whenToUse: ["When designing flexible, decoupled PHP service architectures"],
    whenNotToUse: ["Do not use Traits as a replacement for proper object composition"],
    relatedConcepts: ["Polymorphism", "Interface", "Trait", "Single Inheritance"],
    comparison: {
      title: "Interface vs Abstract Class vs Trait",
      headers: ["Feature", "Interface", "Abstract Class", "Trait"],
      rows: [
        ["Method Code", "Signatures Only", "Both Abstract & Concrete", "Concrete Code Only"],
        ["Multiple Inheritance", "Can implement multiple", "Can extend ONLY 1 class", "Can use multiple traits"],
        ["Primary Use", "Contract enforcement", "Base class hierarchy", "Horizontal code reuse"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why does PHP support Traits?", answer: "Because PHP is a single-inheritance language. Traits allow horizontal code reuse across independent classes without rigid class inheritance hierarchies." }
    ],
    practiceProblem: {
      description: "Write a trait HasId with method getId() returning 1.",
      starterCode: `trait HasId {\n  public function getId(): int { return 1; }\n}\nclass Item { use HasId; }\necho (new Item())->getId();`,
      testAssertion: "(new Item())->getId() === 1",
      solution: `trait HasId {\n  public function getId(): int { return 1; }\n}`
    },
    quickRevision: "★ Interfaces define contracts (signatures only).\n★ Classes can implement multiple interfaces.\n★ Traits provide horizontal code reuse across classes."
  }),

  // 6. EXCEPTIONS & ERROR HANDLING
  "php-exceptions": createTopicSchema({
    id: "php-exceptions",
    techId: "php",
    title: "PHP Exception Handling & Custom Exception Classes",
    category: "PHP Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["php-interfaces-traits"],
    definition: "Exception handling in PHP manages runtime errors using try/catch/finally blocks and custom Throwable exception classes.",
    simpleExplanation: "Exceptions catch runtime errors gracefully without displaying raw error callstacks to end users.",
    whyDoesItExist: "Prevents application crashes and provides centralized error logging and recovery.",
    basicExample: `<?php
class UserNotFoundException extends Exception {}

function findUser(int $id): string {
    if ($id <= 0) {
        throw new UserNotFoundException("Invalid User ID: $id");
    }
    return "User #$id";
}

try {
    echo findUser(0);
} catch (UserNotFoundException $e) {
    echo "Caught: " . $e->getMessage();
} finally {
    echo " | Cleanup complete";
}
?>`,
    howItWorks: [
      "1. throw creates an Exception object bubbling up the execution stack.",
      "2. Matching catch block intercepts the Throwable instance.",
      "3. finally block ALWAYS executes regardless of whether an exception occurred."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Throw Exception -&gt; Catch Block -&gt; Finally Execution</text></svg>`,
    realWorldExample: `<?php
try {
    $db->beginTransaction();
    $order->save();
    $payment->charge();
    $db->commit();
} catch (PaymentFailedException $e) {
    $db->rollBack();
    logger()->error("Payment failed: " . $e->getMessage());
}
?>`,
    commonUseCases: [
      "Catching database query failures",
      "Handling failed third-party API calls",
      "Rolling back SQL database transactions on error"
    ],
    commonMistakes: [
      "Swallowing exceptions with empty catch blocks without logging",
      "Catching generic Throwable without handling specific domain exceptions"
    ],
    bestPractices: [
      "Create custom domain Exception subclasses (e.g. PaymentFailedException)",
      "Always clean up resources or rollback DB transactions in catch/finally"
    ],
    whenToUse: ["In all PHP applications handling dynamic external I/O and user input"],
    whenNotToUse: ["Do not use exceptions for standard control flow checks"],
    relatedConcepts: ["Throwable", "Exception", "try/catch/finally", "DB Rollback"],
    comparison: {
      title: "PHP Error vs Exception",
      headers: ["Feature", "PHP Error", "PHP Exception"],
      rows: [
        ["Origin", "Engine syntax/type failures", "Application domain logic failures"],
        ["Catchable", "Catchable via Error / Throwable in PHP 7+", "Catchable via Exception / Throwable"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Does the code in a finally block execute if a return statement is inside try?", answer: "Yes, the finally block ALWAYS executes, even if try or catch contains an explicit return statement." }
    ],
    practiceProblem: {
      description: "Write a function safeDivide that throws Exception if divisor is 0.",
      starterCode: `function safeDivide(int $a, int $b): float {\n  if ($b === 0) throw new Exception("Division by zero");\n  return $a / $b;\n}\necho safeDivide(10, 2);`,
      testAssertion: "safeDivide(10, 2) === 5.0",
      solution: `function safeDivide(int $a, int $b): float {\n  if ($b === 0) throw new Exception("Division by zero");\n  return $a / $b;\n}`
    },
    quickRevision: "★ throw instantiates Throwable.\n★ catch intercepts specific exception types.\n★ finally ALWAYS executes."
  }),

  // 7. COMPOSER & NAMESPACES
  "php-composer": createTopicSchema({
    id: "php-composer",
    techId: "php",
    title: "PHP Namespaces, PSR-4 Autoloading & Composer",
    category: "Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["php-exceptions"],
    definition: "Composer is the standard dependency manager for PHP. It uses PSR-4 autoloading standards and namespaces to automatically load classes without manual require/include calls.",
    simpleExplanation: "Namespaces prevent class name collisions, while Composer automatically includes external libraries (via composer.json) and handles class autoloading.",
    whyDoesItExist: "Eliminates hundreds of manual require_once statements and manages third-party package dependencies seamlessly.",
    basicExample: `<?php
// Class file: src/Services/PaymentService.php
namespace App\\Services;

class PaymentService {
    public function pay(): string {
        return "Payment processed";
    }
}

// Entry file: index.php
require __DIR__ . '/vendor/autoload.php';

use App\\Services\\PaymentService;

$service = new PaymentService();
echo $service->pay();
?>`,
    howItWorks: [
      "1. composer.json maps namespace prefix App\\\\ to src/ directory.",
      "2. Composer generates vendor/autoload.php mapping PSR-4 class paths.",
      "3. Zend Engine dynamically includes class file on first usage."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Namespace App\\Services -&gt; Composer PSR-4 Autoloader -&gt; File Included</text></svg>`,
    realWorldExample: `// composer.json
{
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    },
    "require": {
        "guzzlehttp/guzzle": "^7.0"
    }
}`,
    commonUseCases: [
      "Managing open-source PHP dependencies (Guzzle, Monolog, Carbon)",
      "Autoloading application classes based on PSR-4 standards",
      "Locking exact dependency versions using composer.lock"
    ],
    commonMistakes: [
      "Forgetting to run composer dump-autoload after adding new PSR-4 mappings",
      "Not committing composer.lock to Git leading to version drift across servers"
    ],
    bestPractices: [
      "Always follow PSR-4 folder naming standards (namespace matches directory structure)",
      "Commit composer.lock to Git for deterministic builds"
    ],
    whenToUse: ["In all modern PHP projects and frameworks"],
    whenNotToUse: ["When writing a single-file standalone script without external dependencies"],
    relatedConcepts: ["PSR-4", "Composer", "composer.lock", "Namespaces"],
    comparison: {
      title: "Composer vs NPM",
      headers: ["Aspect", "Composer (PHP)", "NPM (Node.js)"],
      rows: [
        ["Config File", "composer.json", "package.json"],
        ["Lock File", "composer.lock", "package-lock.json"],
        ["Autoloading", "PSR-4 Central Autoloader", "ESM / CommonJS import system"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is PSR-4 Autoloading in PHP?", answer: "PSR-4 is a standard mapping namespaces to file system directories (e.g. App\\Services\\UserService maps to src/Services/UserService.php), allowing Composer to autoload classes on demand." }
    ],
    practiceProblem: {
      description: "Write a namespace declaration for App\\Controllers.",
      starterCode: `namespace App\\Controllers;\nclass HomeController {\n  public function index() { return 'Home'; }\n}\necho (new HomeController())->index();`,
      testAssertion: "(new \\App\\Controllers\\HomeController())->index() === 'Home'",
      solution: `namespace App\\Controllers;\nclass HomeController {\n  public function index() { return 'Home'; }\n}`
    },
    quickRevision: "★ Composer manages dependencies via composer.json.\n★ PSR-4 maps namespaces to folder paths.\n★ Commit composer.lock to Git."
  }),

  // 8. DATABASE & PDO
  "php-pdo": createTopicSchema({
    id: "php-pdo",
    techId: "php",
    title: "PHP Database Connectivity with PDO & Prepared Statements",
    category: "Data Persistence",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["php-composer"],
    definition: "PHP Data Objects (PDO) provides a lightweight, consistent database abstraction layer supporting prepared statements to completely eliminate SQL Injection vulnerabilities.",
    simpleExplanation: "PDO connects PHP to SQL databases (MySQL, PostgreSQL, SQLite) safely using parameter binding ($1 or :param).",
    whyDoesItExist: "Protects applications against SQL Injection and abstracts database vendor differences.",
    basicExample: `<?php
$dsn = "mysql:host=localhost;dbname=testdb;charset=utf8mb4";
$pdo = new PDO($dsn, "root", "password", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

// Prepared Statement (Prevents SQL Injection)
$stmt = $pdo->prepare("SELECT id, name FROM users WHERE email = :email");
$stmt->execute(['email' => 'alice@example.com']);
$user = $stmt->fetch();

print_r($user);
?>`,
    howItWorks: [
      "1. prepare() sends SQL template to database server for query plan compilation.",
      "2. execute() sends parameters separately; DB treats inputs strictly as data values.",
      "3. SQL Injection is impossible because user input cannot alter SQL structure."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">PDO Prepared Statement Pipeline (Parameterized Input)</text></svg>`,
    realWorldExample: `<?php
function transferFunds(PDO $pdo, int $from, int $to, float $amount): void {
    try {
        $pdo->beginTransaction();
        $pdo->prepare("UPDATE accounts SET balance = balance - ? WHERE id = ?")->execute([$amount, $from]);
        $pdo->prepare("UPDATE accounts SET balance = balance + ? WHERE id = ?")->execute([$amount, $to]);
        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        throw $e;
    }
}
?>`,
    commonUseCases: [
      "Executing database queries safely with prepared statements",
      "Handling database transactions across multiple SQL statements",
      "Fetching query results as associative arrays or typed objects"
    ],
    commonMistakes: [
      "Concatenating strings into SQL queries leading to SQL Injection",
      "Forgetting to set PDO::ERRMODE_EXCEPTION causing silent query errors"
    ],
    bestPractices: [
      "Always use prepared statements for queries containing dynamic variables",
      "Set PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION globally"
    ],
    whenToUse: ["In all database interaction code in PHP"],
    whenNotToUse: ["When using an ORM like Laravel Eloquent (which wraps PDO automatically)"],
    relatedConcepts: ["PDO", "Prepared Statements", "SQL Injection", "Transactions"],
    comparison: {
      title: "PDO vs mysqli",
      headers: ["Feature", "PDO", "mysqli"],
      rows: [
        ["Database Support", "12+ Databases (MySQL, Postgres, SQLite)", "MySQL Only"],
        ["Named Parameters", "Supported (:email)", "Not Supported (Only ? positional)"],
        ["Prepared Statements", "Fully Supported", "Supported"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do PDO Prepared Statements prevent SQL Injection?", answer: "Prepared statements send the SQL query template and parameter values separately. The database compiles the SQL structure first, so user parameters can never be interpreted as SQL code." }
    ],
    practiceProblem: {
      description: "Write a prepared statement placeholder string for ':id'.",
      starterCode: `function getSqlTemplate(): string {\n  return "SELECT * FROM users WHERE id = :id";\n}\necho getSqlTemplate();`,
      testAssertion: "str_contains(getSqlTemplate(), ':id')",
      solution: `function getSqlTemplate(): string {\n  return "SELECT * FROM users WHERE id = :id";\n}`
    },
    quickRevision: "★ PDO works with 12+ SQL databases.\n★ Prepared statements prevent SQL Injection.\n★ Always set ERRMODE_EXCEPTION."
  }),

  // 9. MODERN PHP 8 FEATURES
  "php-8-features": createTopicSchema({
    id: "php-8-features",
    techId: "php",
    title: "Modern PHP 8.x Features (Attributes, Enums & Named Arguments)",
    category: "PHP 8 Modern",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["php-pdo"],
    definition: "PHP 8.0–8.3 introduced game-changing features including Native Enums, Attributes (#[Route]), Named Arguments, Nullsafe Operator (?->), and Readonly Classes.",
    simpleExplanation: "PHP 8 modernizes the language with strong type safety, cleaner syntax, and native metadata attributes.",
    whyDoesItExist: "Improves developer productivity, type safety, and static analysis capabilities.",
    basicExample: `<?php
// 1. Native Enum (PHP 8.1)
enum Status: string {
    case PENDING = 'pending';
    case APPROVED = 'approved';
}

// 2. Readonly Class (PHP 8.2) & Nullsafe Operator (?->)
readonly class UserDTO {
    public function __construct(
        public string $name,
        public Status $status
    ) {}
}

$user = new UserDTO(name: "Alice", status: Status::APPROVED);
echo $user?->status->value; // approved
?>`,
    howItWorks: [
      "1. Enums provide type-safe constant value enumerations.",
      "2. Nullsafe operator (?->) short-circuits to null if left expression is null.",
      "3. Named arguments allow passing arguments out-of-order by parameter name."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="350" y="95" fill="#fbbf24" font-weight="bold" text-anchor="middle">PHP 8.x Features: Enums | Attributes | Nullsafe | Readonly</text></svg>`,
    realWorldExample: `<?php
#[Attribute]
class Route {
    public function __construct(public string $path, public string $method = 'GET') {}
}

class UserController {
    #[Route(path: '/users', method: 'GET')]
    public function list() {}
}
?>`,
    commonUseCases: [
      "Enforcing domain status flags using Backed Enums",
      "Building API Data Transfer Objects (DTOs) with Readonly Classes",
      "Annotating route definitions using Attributes"
    ],
    commonMistakes: [
      "Mutating properties inside a readonly class (throws Error)",
      "Misusing nullsafe operator when null is an unexpected error state"
    ],
    bestPractices: [
      "Use Backed Enums for database status fields",
      "Use DTOs with Readonly properties for immutability"
    ],
    whenToUse: ["In all modern PHP 8.1+ applications"],
    whenNotToUse: ["When maintaining legacy PHP 7 codebases"],
    relatedConcepts: ["Enums", "Attributes", "Nullsafe Operator", "Readonly Class"],
    comparison: {
      title: "PHP 7 vs PHP 8",
      headers: ["Feature", "PHP 7", "PHP 8+"],
      rows: [
        ["Enums", "Class constants hack", "Native typed Enums"],
        ["Metadata", "Docblock comments (@route)", "Native #[Attributes]"],
        ["Null Safety", "Nested ternary checks", "Nullsafe operator (?->)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between a Unit Enum and a Backed Enum in PHP 8.1?", answer: "A Unit Enum defines case names only (e.g. enum Status { case PENDING; }). A Backed Enum associates each case with a string or int scalar value (e.g. enum Status: string { case PENDING = 'pending'; })." }
    ],
    practiceProblem: {
      description: "Write a Backed Enum Status with case ACTIVE = 'active'.",
      starterCode: `enum Status: string {\n  case ACTIVE = 'active';\n}\necho Status::ACTIVE->value;`,
      testAssertion: "Status::ACTIVE->value === 'active'",
      solution: `enum Status: string {\n  case ACTIVE = 'active';\n}`
    },
    quickRevision: "★ Enums enforce type-safe constants.\n★ Attributes Replace docblock annotations.\n★ ?-> prevents null pointer crashes."
  }),

  // 10. OPCACHE & MEMORY
  "php-opcache": createTopicSchema({
    id: "php-opcache",
    techId: "php",
    title: "PHP Memory Management, OPcache & JIT Compiler",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["php-8-features"],
    definition: "PHP performance optimization utilizes OPcache to store precompiled script bytecodes in shared memory, eliminating disk parsing overhead, while PHP 8 JIT compiles hot bytecode directly into CPU machine instructions.",
    simpleExplanation: "OPcache keeps compiled PHP code in RAM so your server doesn't re-parse PHP files on every web request.",
    whyDoesItExist: "Drastically speeds up PHP request processing times by 3x–10x in production.",
    basicExample: `; php.ini OPcache Production Setup
zend_extension=opcache.so
opcache.enable=1
opcache.enable_cli=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0 ; High performance production mode`,
    howItWorks: [
      "1. Request arrives -> OPcache checks if script opcode exists in Shared Memory RAM.",
      "2. If cached, Zend Engine executes opcode directly skipping disk file parsing.",
      "3. PHP 8 JIT converts hot opcode sequences into native x86 CPU machine code."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">PHP File -&gt; OPcache Shared Memory -&gt; JIT Machine Code -&gt; Fast Output</text></svg>`,
    realWorldExample: `<?php
// Clearing OPcache programmatically after deployment
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo "OPcache cleared successfully!";
}
?>`,
    commonUseCases: [
      "Accelerating production web application response times",
      "Reducing CPU and disk I/O load on PHP-FPM web servers",
      "Optimizing CPU-intensive tasks with PHP 8 JIT"
    ],
    commonMistakes: [
      "Leaving opcache.validate_timestamps=1 in production causing unnecessary file stat checks",
      "Not clearing OPcache after code deployments resulting in old code executing"
    ],
    bestPractices: [
      "Set opcache.validate_timestamps=0 in production and flush cache on deploy",
      "Allocate sufficient opcache.memory_consumption (e.g. 256MB+)"
    ],
    whenToUse: ["In all production PHP deployment environments"],
    whenNotToUse: ["Disable opcache.validate_timestamps=0 during active local development"],
    relatedConcepts: ["OPcache", "JIT Compiler", "Zend Engine", "Opcode"],
    comparison: {
      title: "OPcache vs PHP 8 JIT",
      headers: ["Component", "Input", "Output"],
      rows: [
        ["OPcache", "PHP Source Code (.php file)", "Precompiled Bytecode / Opcode (in RAM)"],
        ["PHP 8 JIT", "Precompiled Bytecode / Opcode", "Native CPU Machine Code instructions"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between OPcache and the PHP 8 JIT compiler?", answer: "OPcache caches precompiled bytecode in shared RAM to skip disk parsing. The JIT compiler takes hot bytecode sequences and compiles them into native CPU machine instructions." }
    ],
    practiceProblem: {
      description: "Write a PHP check to see if OPcache extension is loaded.",
      starterCode: `function isOpcacheAvailable(): bool {\n  return extension_loaded('Zend OPcache');\n}\necho isOpcacheAvailable() ? 'YES' : 'NO';`,
      testAssertion: "is_bool(isOpcacheAvailable())",
      solution: `function isOpcacheAvailable(): bool {\n  return extension_loaded('Zend OPcache');\n}`
    },
    quickRevision: "★ OPcache stores bytecode in RAM.\n★ JIT compiles hot opcode into native CPU machine code.\n★ Set validate_timestamps=0 in production."
  }),

  // 11. SOLID & DESIGN PATTERNS
  "php-solid-patterns": createTopicSchema({
    id: "php-solid-patterns",
    techId: "php",
    title: "SOLID Principles & Design Patterns in PHP",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["php-opcache"],
    definition: "SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) combined with Design Patterns (Repository, Factory, Strategy) form the foundation of scalable PHP enterprise software.",
    simpleExplanation: "SOLID principles ensure code is maintainable, easy to test, and flexible to extend without breaking existing logic.",
    whyDoesItExist: "Prevents fragile, rigid monolith codebases and enables easy unit testing with mocks.",
    basicExample: `<?php
// Dependency Inversion Principle (DIP)
interface NotificationSenderInterface {
    public function send(string $message): void;
}

class EmailSender implements NotificationSenderInterface {
    public function send(string $message): void {
        // Send email
    }
}

class UserRegistrationService {
    // Inject interface abstraction instead of concrete class
    public function __construct(private NotificationSenderInterface $sender) {}

    public function register(string $user): void {
        $this->sender->send("Welcome $user!");
    }
}
?>`,
    howItWorks: [
      "1. Single Responsibility (S): One reason to change per class.",
      "2. Open/Closed (O): Open for extension, closed for modification.",
      "3. Dependency Inversion (D): Depend on abstractions (Interfaces), not concrete implementations."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Service -&gt; Interface Contract -&gt; Concrete Implementation</text></svg>`,
    realWorldExample: `<?php
// Repository Pattern
interface UserRepositoryInterface {
    public function findById(int $id): ?User;
}

class SqlUserRepository implements UserRepositoryInterface {
    public function findById(int $id): ?User {
        return User::find($id);
    }
}
?>`,
    commonUseCases: [
      "Structuring enterprise PHP applications and frameworks",
      "Decoupling business logic from database drivers",
      "Writing easily testable code using Dependency Injection"
    ],
    commonMistakes: [
      "Instantiating hardcoded dependencies with 'new ClassName()' inside services instead of injecting interfaces",
      "Creating giant God classes violating Single Responsibility"
    ],
    bestPractices: [
      "Inject interfaces via class constructors",
      "Use Repository pattern to decouple database queries from business services"
    ],
    whenToUse: ["In all enterprise PHP software architectures"],
    whenNotToUse: ["In 5-line quick throwaway scripts"],
    relatedConcepts: ["SOLID", "Repository Pattern", "Dependency Injection", "Factory Pattern"],
    comparison: {
      title: "Tightly Coupled vs SOLID Decoupled Architecture",
      headers: ["Metric", "Tightly Coupled", "SOLID Decoupled"],
      rows: [
        ["Testability", "Hard to mock DB calls", "Easy to swap with Mock Interface"],
        ["Flexibility", "Rigid (Changes break code)", "Extensible via new Interface implementations"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Dependency Inversion (D in SOLID)?", answer: "High-level modules should not depend on low-level modules; both should depend on abstractions (Interfaces). This allows swapping implementations without modifying business services." }
    ],
    practiceProblem: {
      description: "Write an Interface for LoggerInterface with log(string $msg).",
      starterCode: `interface LoggerInterface {\n  public function log(string $msg): void;\n}\nclass ConsoleLogger implements LoggerInterface {\n  public function log(string $msg): void { echo $msg; }\n}\n(new ConsoleLogger())->log('Test');`,
      testAssertion: "interface_exists('LoggerInterface')",
      solution: `interface LoggerInterface {\n  public function log(string $msg): void;\n}`
    },
    quickRevision: "★ S: Single Responsibility.\n★ O: Open for extension, closed for modification.\n★ D: Depend on Interfaces, not concrete classes."
  })
};
