import { createTopicSchema } from './createTopicSchema.js';

export const javascriptTopics = {
  // 1. JAVASCRIPT BASICS
  "js-basics": createTopicSchema({
    id: "js-basics",
    techId: "javascript",
    title: "JavaScript Basics & V8 Runtime",
    category: "Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    definition: "JavaScript is a lightweight, interpreted or JIT-compiled programming language with first-class functions, dynamic typing, and prototype-based object orientation.",
    simpleExplanation: "JavaScript is the language that makes websites interactive. When you click a button, open a menu, or fetch data, JavaScript is running the logic behind the scenes inside your browser engine.",
    whyDoesItExist: "Static HTML and CSS only specify document structure and styles. JavaScript was created to allow dynamic user interaction, DOM manipulation, asynchronous server communication, and full-stack application development.",
    basicExample: `// Basic variables, console output, and dynamic typing
let developerName = "Tushar";
let experienceYears = 3;
let isSenior = false;

console.log(\`Developer: \${developerName}, Exp: \${experienceYears} yrs\`); 
// Output: Developer: Tushar, Exp: 3 yrs`,
    howItWorks: [
      "1. V8 Engine parses JS code into an Abstract Syntax Tree (AST).",
      "2. Ignition Interpreter converts AST into Bytecode for immediate execution.",
      "3. TurboFan JIT Compiler optimizes hot code paths into machine code."
    ],
    realWorldExample: `// Client-side greeting based on time of day
function getGreeting(userName) {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
    return \`Good \${timeOfDay}, \${userName}!\`;
}
console.log(getGreeting("Alice"));`,
    interviewQuestions: [
      { level: "Beginner", question: "Is JavaScript an interpreted or compiled language?", answer: "JavaScript uses Just-In-Time (JIT) compilation in modern V8/JS engines, interpreting bytecode while compiling hot functions to native machine code." }
    ]
  }),

  // 2. VARIABLES & DATA TYPES
  "js-variables": createTopicSchema({
    id: "js-variables",
    techId: "javascript",
    title: "Variables & Data Types (Primitives vs Reference Objects)",
    category: "Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–2 years",
    readingTime: "12 min",
    prerequisites: ["js-basics"],
    definition: "JavaScript categorizes data into 7 Primitive types (string, number, bigint, boolean, undefined, symbol, null) stored directly by value in Call Stack memory, and Reference Objects (Objects, Arrays, Functions) stored by reference address in Heap memory.",
    simpleExplanation: "Primitives are fixed-size values stored directly in Stack memory (like a static variable value). Reference Objects are complex data structures stored in Heap memory, while your variable only holds a memory pointer address.",
    whyDoesItExist: "Distinguishing between Stack primitive values and Heap memory references optimizes RAM consumption and runtime speed. Primitives allow fast direct arithmetic operations, while Objects allow dynamic, expandable data collections.",
    basicExample: `// 1. Primitive Copy by Value (Call Stack)
let a = 10;
let b = a; // Value 10 copied
b = 20;
console.log(a); // Output: 10 (a remains unchanged!)

// 2. Reference Copy by Pointer (Heap Memory)
let user1 = { name: "Tushar", role: "Developer" };
let user2 = user1; // Memory reference address copied
user2.role = "Lead Architect";
console.log(user1.role); // Output: "Lead Architect" (user1 mutated because user2 shares the same memory pointer!)

// 3. Variable Declaration Scopes: var vs let vs const
var x = 1;       // Function-scoped, hoisted with undefined
let y = 2;       // Block-scoped, hoisted into Temporal Dead Zone (TDZ)
const z = 3;     // Block-scoped, immutable binding (cannot be reassigned)`,
    howItWorks: [
      "1. Primitives allocated on Call Stack with fixed memory sizes.",
      "2. Objects allocated on Heap memory; variable receives 64-bit Heap Memory Address pointer.",
      "3. Equality checks (===) compare raw values for primitives, but compare Memory Address references for Objects."
    ],
    visualDiagram: `<svg viewBox="0 0 700 220" class="w-full bg-slate-900 rounded-lg p-3">
  <rect x="20" y="30" width="300" height="160" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="55" fill="#60a5fa" font-weight="bold" text-anchor="middle">Call Stack (Fast / Fixed Size)</text>
  <text x="40" y="90" fill="#94a3b8" font-size="12">Primitive (a = 10) -&gt; Value: 10</text>
  <text x="40" y="120" fill="#94a3b8" font-size="12">Primitive (b = 20) -&gt; Value: 20</text>
  <text x="40" y="150" fill="#38bdf8" font-size="12">Pointer (user1) -&gt; Address 0x004F2A</text>

  <path d="M 280 150 L 380 100" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>

  <rect x="380" y="30" width="300" height="160" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="530" y="55" fill="#34d399" font-weight="bold" text-anchor="middle">Heap Memory (Dynamic Objects)</text>
  <text x="400" y="95" fill="#34d399" font-size="12">Address: 0x004F2A</text>
  <text x="400" y="125" fill="#e2e8f0" font-size="12">{ name: "Tushar", role: "Lead Architect" }</text>
</svg>`,
    realWorldExample: `// React Immutability Pattern: Safe State Updating without Side Effects
const originalState = { user: { name: "Sarah" }, score: 85 };

// BAD: Direct mutation alters original reference
// originalState.score = 90; 

// GOOD: Shallow copy via Spread Operator creates new memory reference
const updatedState = {
  ...originalState,
  score: 90
};

// Deep cloning for nested structures
const deepClonedState = structuredClone(originalState);
deepClonedState.user.name = "Alex";

console.log(originalState.user.name); // Output: "Sarah" (Protected!)`,
    commonUseCases: [
      "Choosing `const` by default to prevent accidental variable reassignment",
      "Using `structuredClone()` to deeply duplicate nested configuration objects",
      "Safely checking data types using `typeof` and `Array.isArray()`"
    ],
    commonMistakes: [
      "Believing `const obj = {}` makes the object frozen (properties CAN be mutated; binding cannot be reassigned)",
      "Relying on `typeof null === 'object'` (historical V8 bug; check `val === null` explicitly)",
      "Comparing arrays `[1] === [1]` expecting true (evaluates to false because memory pointers differ)"
    ],
    bestPractices: [
      "Use `const` for 90%+ of variables; use `let` only when values must be reassigned",
      "Never use `var` in modern JavaScript codebases to avoid hoisting scope leaks",
      "Use `Object.freeze(obj)` for true runtime object immutability"
    ],
    whenToUse: ["In every single line of JavaScript variable creation and memory allocation"],
    whenNotToUse: ["Do not use heavy Object deep cloning inside high-frequency 60fps animation render loops"],
    relatedConcepts: ["Call Stack", "Heap Memory", "Temporal Dead Zone", "Immutability", "Pass-by-Value"],
    comparison: {
      title: "Primitives vs Reference Objects Comparison",
      headers: ["Property", "Primitive Data Types", "Reference Object Types"],
      rows: [
        ["Data Types", "string, number, bigint, boolean, undefined, symbol, null", "Object, Array, Function, Date, Map, Set"],
        ["Memory Storage", "Call Stack (Direct value)", "Heap Memory (Pointer address on Stack)"],
        ["Mutability", "Immutable (Values cannot be altered)", "Mutable (Properties can be added/removed)"],
        ["Comparison (===)", "Compares actual values", "Compares memory address pointers"],
        ["Type Check", "typeof val ('string', 'number', etc.)", "Array.isArray(val), typeof val === 'object'"]
      ]
    },
    interviewQuestions: [
      {
        level: "Beginner",
        question: "What are the 7 primitive data types in JavaScript?",
        answer: "string, number, bigint, boolean, undefined, symbol, and null."
      },
      {
        level: "Intermediate",
        question: "Why does typeof null return 'object' in JavaScript?",
        answer: "In the original 1995 JS implementation, values were stored in 32-bit units with type tags. Object type tag was 000, and null was represented as NULL pointer (0x00 / all zeros), causing typeof to mistakenly return 'object'."
      },
      {
        level: "Senior",
        question: "Difference between pass-by-value and pass-by-reference when passing function arguments?", answer: "JavaScript is ALWAYS pass-by-value. For primitives, the value itself is passed. For objects, a copy of the reference pointer address is passed by value (allowing property mutation, but reassigning the parameter variable inside the function does not change the caller's reference)."
      }
    ],
    practiceProblem: {
      description: "Write a function isPrimitive(val) that returns true for primitive types and false for reference objects/functions.",
      starterCode: `function isPrimitive(val) {\n  if (val === null) return true;\n  return typeof val !== 'object' && typeof val !== 'function';\n}\nconsole.log(isPrimitive(42));\nconsole.log(isPrimitive({}));`,
      testAssertion: "isPrimitive(42) === true && isPrimitive({}) === false",
      solution: `function isPrimitive(val) {\n  if (val === null) return true;\n  return typeof val !== 'object' && typeof val !== 'function';\n}`
    },
    quickRevision: "★ 7 Primitives stored in Stack by Value.\n★ Reference Objects stored in Heap by Memory Address.\n★ const prevents reassignment, not property mutation.\n★ typeof null === 'object' is a legacy JS quirk."
  }),

  // 3. OPERATORS & CONTROL FLOW
  "js-operators": createTopicSchema({
    id: "js-operators",
    techId: "javascript",
    title: "Operators & Control Flow (??, ?., Short-circuiting)",
    category: "Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    definition: "Control flow operators govern statement execution order based on truthy/falsy evaluation, nullish coalescing (??), and optional chaining (?.).",
    simpleExplanation: "Operators allow you to make decisions (if/else), repeat actions (loops), and safely access properties without throwing errors (optional chaining).",
    whyDoesItExist: "Prevents 'TypeError: Cannot read properties of undefined' crashes when traversing deeply nested dynamic API payloads.",
    basicExample: `const user = { profile: { name: "Alex" } };

// Optional chaining (?.) and Nullish Coalescing (??)
const role = user?.profile?.role ?? "Guest";
console.log(role); // Output: "Guest"`,
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between || and ?? operators?", answer: "|| returns fallback on any falsy value (0, '', false, null, undefined). ?? only returns fallback on null or undefined." }
    ]
  }),

  // 4. FUNCTIONS
  "js-functions": createTopicSchema({
    id: "js-functions",
    techId: "javascript",
    title: "Functions (Declarations, Arrow Functions & IIFE)",
    category: "Core Functions",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    definition: "Functions are first-class objects that accept parameters, execute scoped blocks of logic, and return values.",
    simpleExplanation: "A function is a reusable machine. You pass inputs (arguments), it performs actions, and returns an output.",
    whyDoesItExist: "Promotes code reusability, DRY principles, lexical scope boundaries, and modular programming.",
    basicExample: `// Function Declaration (Hoisted)
function add(a, b) { return a + b; }

// Arrow Function (Lexical this, Not Hoisted)
const multiply = (a, b) => a * b;

console.log(add(5, 3));      // Output: 8
console.log(multiply(4, 2)); // Output: 8`,
    interviewQuestions: [
      { level: "Beginner", question: "What are first-class functions in JavaScript?", answer: "In JS, functions can be assigned to variables, passed as arguments to other functions, and returned from functions just like any other value." }
    ]
  }),

  // 5. SCOPE
  "js-scope": createTopicSchema({
    id: "js-scope",
    techId: "javascript",
    title: "Scope (Global, Function, Block & Lexical Scope)",
    category: "Core Functions",
    difficulty: "Beginner",
    experienceBand: "1–2 years",
    readingTime: "9 min",
    definition: "Scope defines the accessibility and visibility of variables, functions, and objects in a particular part of your code during execution.",
    simpleExplanation: "Scope determines where your variables live and who can see them. Outer scopes cannot reach inside inner function blocks.",
    whyDoesItExist: "Prevents global namespace pollution and variable collisions across libraries.",
    basicExample: `const globalVar = "Global";

function outer() {
    const outerVar = "Outer";
    if (true) {
        let blockVar = "Block";
        console.log(globalVar, outerVar, blockVar); // Accessible
    }
    // console.log(blockVar); // Throws ReferenceError!
}
outer();`,
    interviewQuestions: [
      { level: "Beginner", question: "How does the scope chain work?", answer: "When resolving a variable, JS checks the local scope first. If not found, it traverses up parent lexical scopes until reaching the global scope." }
    ]
  }),

  // 6. HOISTING & TDZ
  "js-hoisting": createTopicSchema({
    id: "js-hoisting",
    techId: "javascript",
    title: "Hoisting & Temporal Dead Zone (TDZ)",
    category: "Core Functions",
    difficulty: "Beginner",
    experienceBand: "1–2 years",
    readingTime: "10 min",
    definition: "Hoisting is JS's behavior of moving variable and function declarations to the top of their scope during creation phase. Let and const enter the Temporal Dead Zone (TDZ).",
    simpleExplanation: "JS scans code before running it. Function declarations and 'var' are accessible early, but 'let' and 'const' cannot be used until execution reaches their declaration.",
    whyDoesItExist: "Creation phase allocation allows mutual function recursion before execution.",
    basicExample: `console.log(varNum); // Output: undefined (hoisted)
var varNum = 10;

// console.log(letNum); // Throws ReferenceError! (TDZ)
let letNum = 20;`,
    interviewQuestions: [
      { level: "Intermediate", question: "Why does calling a let variable before declaration throw a ReferenceError?", answer: "Because let variables enter the Temporal Dead Zone (TDZ) from scope entry until the line of declaration is executed." }
    ]
  }),

  // 7. OBJECTS & ARRAYS
  "js-objects-arrays": createTopicSchema({
    id: "js-objects-arrays",
    techId: "javascript",
    title: "Objects & Array Methods (map, filter, reduce)",
    category: "Data Structures",
    difficulty: "Beginner",
    experienceBand: "1–2 years",
    readingTime: "12 min",
    definition: "Objects store key-value collections while Arrays store ordered collections. Functional array methods (map, filter, reduce) perform non-mutating iterations.",
    simpleExplanation: "Use map to transform items, filter to remove unwanted items, and reduce to calculate a single summary result.",
    whyDoesItExist: "Immutability principles prevent subtle state mutation bugs in React and modern UI applications.",
    basicExample: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0);    // [2, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

console.log(doubled, evens, sum);`,
    interviewQuestions: [
      { level: "Beginner", question: "Does map() mutate the original array?", answer: "No, map() returns a brand new array leaving the original array intact." }
    ]
  }),

  // 8. DESTRUCTURING & SPREAD
  "js-destructuring": createTopicSchema({
    id: "js-destructuring",
    techId: "javascript",
    title: "Destructuring & Spread Operator",
    category: "Modern ES6+",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    readingTime: "10 min",
    definition: "Destructuring syntax unpacks values from arrays or properties from objects into distinct variables. Spread syntax (...) expands elements.",
    simpleExplanation: "Destructuring lets you extract exact values from objects/arrays in one clean line.",
    whyDoesItExist: "Reduces verbose assignment boilerplate like `const name = user.name; const email = user.email;`.",
    basicExample: `const user = { id: 101, name: "Sarah", role: "Admin" };

// Object Destructuring with default & rename
const { name: userName, role, status = "Active" } = user;
console.log(userName, role, status); // Output: Sarah Admin Active

// Spread Operator Array Merging
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]`,
    interviewQuestions: [
      { level: "Intermediate", question: "Is the spread operator a shallow copy or a deep copy?", answer: "Spread performs a shallow copy. Nested objects still retain reference links." }
    ]
  }),

  // 9. CLOSURES
  "javascript-closure": createTopicSchema({
    id: "javascript-closure",
    techId: "javascript",
    title: "Closures & Lexical Scope",
    category: "Advanced JavaScript",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "10 min",
    definition: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment), giving inner functions access to outer function scope after execution.",
    simpleExplanation: "Think of closure like a backpack that a function carries, keeping outer variables alive long after the outer function finishes.",
    whyDoesItExist: "Enables private state encapsulation, currying, module patterns, and persistent state across event listeners.",
    basicExample: `function createCounter() {
    let count = 0; // Private state
    return {
        increment: () => ++count,
        getValue: () => count
    };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (Encapsulated!)`,
    interviewQuestions: [
      { level: "Intermediate", question: "How do closures enable private variables in JavaScript?", answer: "Variables declared in an outer function cannot be accessed directly from outside, but returned inner closure functions retain access." }
    ]
  }),

  // 10. THIS KEYWORD
  "js-this": createTopicSchema({
    id: "js-this",
    techId: "javascript",
    title: "this Keyword & Execution Context",
    category: "Advanced JavaScript",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "12 min",
    definition: "'this' refers to the object executing the current function, determined dynamically at call-time (implicit, explicit, new, global) or statically via arrow functions.",
    simpleExplanation: "'this' answers 'who called me?'. If an object invokes `user.getName()`, `this` is `user`.",
    whyDoesItExist: "Allows methods to operate on the dynamic instance context that invoked them.",
    basicExample: `const person = {
    name: "David",
    greet() {
        console.log(\`Hi, I am \${this.name}\`);
    }
};
person.greet(); // Output: Hi, I am David

const detachedGreet = person.greet;
detachedGreet(); // Output: Hi, I am undefined (Global context call)`,
    interviewQuestions: [
      { level: "Intermediate", question: "How do arrow functions handle the 'this' keyword?", answer: "Arrow functions do not have their own 'this'. They inherit 'this' lexically from their enclosing parent scope." }
    ]
  }),

  // 11. CALL / APPLY / BIND
  "js-call-apply-bind": createTopicSchema({
    id: "js-call-apply-bind",
    techId: "javascript",
    title: "call, apply, and bind Method Context Manipulation",
    category: "Advanced JavaScript",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "11 min",
    definition: "call, apply, and bind explicitly set the value of 'this' when executing a function. call accepts comma arguments, apply accepts an array of arguments, bind returns a new function.",
    simpleExplanation: "Use call and apply to run a function immediately on a specific object. Use bind when you want a new function pre-bound for later execution.",
    whyDoesItExist: "Enables method borrowing between objects without copying code.",
    basicExample: `function introduce(greeting, punctuation) {
    console.log(\`\${greeting}, I am \${this.name}\${punctuation}\`);
}

const user = { name: "Emily" };

introduce.call(user, "Hello", "!");   // Output: Hello, I am Emily!
introduce.apply(user, ["Hi", "."]);   // Output: Hi, I am Emily.

const boundFunc = introduce.bind(user, "Welcome");
boundFunc("!!!");                     // Output: Welcome, I am Emily!!!`,
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between call and apply?", answer: "call takes arguments individually comma-separated. apply takes arguments as a single array." }
    ]
  }),

  // 12. EXECUTION CONTEXT
  "js-execution-context": createTopicSchema({
    id: "js-execution-context",
    techId: "javascript",
    title: "Execution Context & Scope Chains",
    category: "JS Internals",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "12 min",
    definition: "An Execution Context is an environment created by the JS engine to evaluate and execute code, consisting of Creation Phase (hoisting/memory allocation) and Execution Phase.",
    simpleExplanation: "Execution context is the container box JS builds whenever it runs a function, storing variables and scope links.",
    whyDoesItExist: "Provides isolated memory namespaces and scope chain resolution per function call.",
    basicExample: `// Global Execution Context created
let name = "Root";

function first() {
    // Function Execution Context 1
    let a = 1;
    second();
}

function second() {
    // Function Execution Context 2
    let b = 2;
    console.log(name); // Scopes up to Global Context
}

first();`,
    interviewQuestions: [
      { level: "Senior", question: "What happens during the Creation Phase of an Execution Context?", answer: "The JS Engine sets up the Global Object, 'this' binding, allocates memory for variables (initializes var to undefined, let/const to TDZ), and stores function definitions." }
    ]
  }),

  // 13. CALL STACK
  "js-call-stack": createTopicSchema({
    id: "js-call-stack",
    techId: "javascript",
    title: "Call Stack Mechanics & Stack Overflow",
    category: "JS Internals",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "10 min",
    definition: "The Call Stack is a LIFO (Last In, First Out) data structure used by the JS engine to track function call execution hierarchy.",
    simpleExplanation: "Think of a stack of plates. When a function is called, it gets pushed to the top of the stack. When it returns, it pops off.",
    whyDoesItExist: "Manages single-threaded synchronous function execution sequence.",
    basicExample: `function a() { b(); }
function b() { c(); }
function c() { console.log("Stack Peak!"); }

a(); // Push a -> Push b -> Push c -> Log -> Pop c -> Pop b -> Pop a`,
    interviewQuestions: [
      { level: "Intermediate", question: "What causes a 'RangeError: Maximum call stack size exceeded'?", answer: "Unbounded recursive function calls filling up the Call Stack memory without a base exit condition." }
    ]
  }),

  // 14. ASYNCHRONOUS JAVASCRIPT
  "js-async-overview": createTopicSchema({
    id: "js-async-overview",
    techId: "javascript",
    title: "Asynchronous JavaScript Architecture",
    category: "Async JS",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "12 min",
    definition: "Asynchronous JavaScript enables non-blocking operations by offloading network, timer, and disk tasks to Web APIs / libuv, executing callbacks when ready.",
    simpleExplanation: "Async JS lets your website fetch data or run timers in the background without freezing the UI screen.",
    whyDoesItExist: "JavaScript is single-threaded; blocking the thread on slow network requests renders web apps unresponsive.",
    basicExample: `console.log("1: Start");

setTimeout(() => {
    console.log("2: Async Timer Complete");
}, 1000);

console.log("3: End");

// Output:
// 1: Start
// 3: End
// 2: Async Timer Complete (after 1 sec)`,
    interviewQuestions: [
      { level: "Intermediate", question: "How can JavaScript perform non-blocking async operations if it is single-threaded?", answer: "By delegating async tasks (timers, fetch) to browser Web APIs or Node libuv, processing callbacks via the Event Loop." }
    ]
  }),

  // 15. CALLBACKS
  "js-callbacks": createTopicSchema({
    id: "js-callbacks",
    techId: "javascript",
    title: "Callbacks & Callback Hell",
    category: "Async JS",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    readingTime: "10 min",
    definition: "A callback is a function passed as an argument to another function, executed when an async operation completes.",
    simpleExplanation: "A callback is instructions given to an async task: 'When you finish getting data, call this function with the result'.",
    whyDoesItExist: "Original method for handling asynchronous responses before ES6 Promises.",
    basicExample: `// Callback Pyramid of Doom (Callback Hell)
getData(function(a) {
    getMoreData(a, function(b) {
        getFinalData(b, function(c) {
            console.log("Nested Result:", c);
        });
    });
});`,
    interviewQuestions: [
      { level: "Intermediate", question: "What is Callback Hell and how do Promises solve it?", answer: "Callback Hell is deeply nested callbacks creating unreadable pyramid code. Promises flatten code into clean linear .then() chains." }
    ]
  }),

  // 16. PROMISES
  "js-promises": createTopicSchema({
    id: "js-promises",
    techId: "javascript",
    title: "Promises & Promise Combinators (Promise.all, race)",
    category: "Async JS",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "14 min",
    definition: "A Promise is an object representing eventual completion (or failure) of an async operation and its resulting value (Pending, Fulfilled, Rejected).",
    simpleExplanation: "A Promise is a receipt for a future value (like a buzzer at a restaurant when waiting for food).",
    whyDoesItExist: "Provides predictable async error propagation, chaining, and parallel combinators.",
    basicExample: `const fetchUserData = new Promise((resolve, reject) => {
    setTimeout(() => resolve({ user: "Admin" }), 500);
});

fetchUserData
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Concurrent execution
Promise.all([fetchUserData, Promise.resolve(100)])
    .then(([user, score]) => console.log(user, score));`,
    interviewQuestions: [
      { level: "Senior", question: "Difference between Promise.all and Promise.allSettled?", answer: "Promise.all rejects immediately if ANY promise fails. Promise.allSettled waits for all promises to settle regardless of rejection." }
    ]
  }),

  // 17. ASYNC / AWAIT
  "js-async-await": createTopicSchema({
    id: "js-async-await",
    techId: "javascript",
    title: "Async / Await & Async Error Boundaries",
    category: "Async JS",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    readingTime: "12 min",
    definition: "Async/Await is syntactic sugar built on Promises and Generators, allowing asynchronous code to be written in a synchronous-looking structure.",
    simpleExplanation: "'await' pauses execution inside an 'async' function until the Promise resolves, making async code easy to read.",
    whyDoesItExist: "Eliminates promise `.then()` callback chaining verbosity.",
    basicExample: `async function fetchOrders() {
    try {
        const response = await fetch("https://api.example.com/orders");
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}
fetchOrders();`,
    interviewQuestions: [
      { level: "Intermediate", question: "What happens if you omit try/catch around an awaited rejecting Promise?", answer: "It throws an unhandled promise rejection error that bubbles up the call stack." }
    ]
  }),

  // 18. EVENT LOOP
  "js-event-loop": createTopicSchema({
    id: "js-event-loop",
    techId: "javascript",
    title: "Browser Event Loop & Execution Phases",
    category: "JS Internals",
    difficulty: "Senior",
    experienceBand: "4–6 years",
    readingTime: "15 min",
    definition: "The Event Loop is an infinite loop that monitors Call Stack execution, draining Microtasks before fetching tasks from Macrotask Queues.",
    simpleExplanation: "The Event Loop checks if the Call Stack is empty. If empty, it runs all waiting microtasks (Promises), then picks the next macrotask (setTimeout).",
    whyDoesItExist: "Powers single-threaded concurrency without blocking user interaction.",
    basicExample: `console.log("1");

setTimeout(() => console.log("2: Macrotask"), 0);

Promise.resolve().then(() => console.log("3: Microtask"));

console.log("4");

// Output Order: 1 -> 4 -> 3 -> 2`,
    interviewQuestions: [
      { level: "Senior", question: "Why do Promises execute before setTimeout(fn, 0)?", answer: "Because Promises are pushed to the Microtask Queue, which is completely drained immediately after the Call Stack empties before Macrotasks." }
    ]
  }),

  // 19. MICROTASK / MACROTASK
  "js-microtask-macrotask": createTopicSchema({
    id: "js-microtask-macrotask",
    techId: "javascript",
    title: "Microtask Queue Priority vs Macrotask Queue",
    category: "JS Internals",
    difficulty: "Senior",
    experienceBand: "4–6 years",
    readingTime: "13 min",
    definition: "Microtasks (Promises, queueMicrotask, MutationObserver) have priority over Macrotasks (setTimeout, setInterval, setImmediate, I/O).",
    simpleExplanation: "Microtasks are VIP tasks processed immediately before any macrotasks or UI repaints occur.",
    whyDoesItExist: "Guarantees state updates complete synchronously before browser rendering frames.",
    basicExample: `queueMicrotask(() => console.log("Microtask 1"));
Promise.resolve().then(() => console.log("Microtask 2"));
setTimeout(() => console.log("Macrotask 1"), 0);

// Output: Microtask 1 -> Microtask 2 -> Macrotask 1`,
    interviewQuestions: [
      { level: "Senior", question: "What happens if a Microtask enqueues another Microtask recursively?", answer: "It starves the Event Loop, blocking Macrotasks and freezing browser UI repaints." }
    ]
  }),

  // 20. PROTOTYPE
  "js-prototypes": createTopicSchema({
    id: "js-prototypes",
    techId: "javascript",
    title: "Prototypes & Prototypal Inheritance",
    category: "Advanced JavaScript",
    difficulty: "Senior",
    experienceBand: "3–6 years",
    readingTime: "14 min",
    definition: "Prototypes are the mechanism by which JavaScript objects inherit features from one another via an internal [[Prototype]] link chain.",
    simpleExplanation: "When accessing a property on an object, JS checks the object itself first. If missing, it travels up its prototype parent link.",
    whyDoesItExist: "Enables object-oriented inheritance and shared memory method allocation.",
    basicExample: `function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(\`\${this.name} makes a sound.\`);
};

const dog = new Animal("Rex");
dog.speak(); // Output: Rex makes a sound.
console.log(dog.__proto__ === Animal.prototype); // true`,
    interviewQuestions: [
      { level: "Senior", question: "What is Prototype Pollution?", answer: "A security vulnerability where attackers modify Object.prototype, injecting malicious properties across all application objects." }
    ]
  }),

  // 21. CLASSES
  "js-classes": createTopicSchema({
    id: "js-classes",
    techId: "javascript",
    title: "ES6 Classes & Private Fields (#field)",
    category: "Object-Oriented JS",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "12 min",
    definition: "ES6 Classes provide clean syntactic sugar over prototypal inheritance, supporting constructors, super calls, static methods, and private fields.",
    simpleExplanation: "Classes are blueprints for creating objects with shared methods and encapsulated properties.",
    whyDoesItExist: "Standardizes OOP code structure for developers coming from C++, Java, or C#.",
    basicExample: `class BankAccount {
    #balance = 0; // Truly private field

    constructor(owner) {
        this.owner = owner;
    }

    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }
}

const acc = new BankAccount("Alice");
acc.deposit(100);
// console.log(acc.#balance); // Throws SyntaxError!`,
    interviewQuestions: [
      { level: "Intermediate", question: "Are JavaScript classes true classes or prototypal sugar?", answer: "JavaScript classes are syntactic sugar on top of existing prototypal inheritance." }
    ]
  }),

  // 22. MAP / SET / WEAKMAP
  "js-map-set-weakmap": createTopicSchema({
    id: "js-map-set-weakmap",
    techId: "javascript",
    title: "Keyed Collections (Map, Set, WeakMap, WeakSet)",
    category: "Data Structures",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "12 min",
    definition: "Map holds key-value pairs of any data type. Set holds unique values. WeakMap & WeakSet hold weak object references eligible for Garbage Collection.",
    simpleExplanation: "Use Map when keys are dynamic objects. Use Set to guarantee array uniqueness. Use WeakMap to attach metadata without memory leaks.",
    whyDoesItExist: "Plain object keys can only be Strings/Symbols; Map permits object keys.",
    basicExample: `const userMap = new Map();
const userKey = { id: 1 };
userMap.set(userKey, "Active Session");
console.log(userMap.get(userKey)); // Output: Active Session

// Set uniqueness
const uniqueSet = new Set([1, 2, 2, 3]);
console.log([...uniqueSet]); // Output: [1, 2, 3]`,
    interviewQuestions: [
      { level: "Senior", question: "Why doesn't WeakMap prevent Garbage Collection of its object keys?", answer: "WeakMap holds 'weak' references to key objects. If no other code references the key object, GC reclaims it." }
    ]
  }),

  // 23. ITERATORS / GENERATORS
  "js-iterators-generators": createTopicSchema({
    id: "js-iterators-generators",
    techId: "javascript",
    title: "Iterators, Custom Iterables & Generator Functions",
    category: "Advanced JS",
    difficulty: "Senior",
    experienceBand: "4–6 years",
    readingTime: "14 min",
    definition: "Generators are functions that can be paused (`yield`) and resumed (`next()`), implementing the Iterator Protocol for custom lazy data streams.",
    simpleExplanation: "A generator function is an execution pause button. It produces values one at a time on demand.",
    whyDoesItExist: "Enables memory-efficient processing of infinite data streams and async saga middleware (Redux Saga).",
    basicExample: `function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3`,
    interviewQuestions: [
      { level: "Senior", question: "How do Generators enable lazy evaluation?", answer: "Generators calculate values only when `next()` is called, consuming zero memory for unrequested sequence items." }
    ]
  }),

  // 24. MODULES
  "js-modules": createTopicSchema({
    id: "js-modules",
    techId: "javascript",
    title: "ES Modules (ESM) vs CommonJS (CJS)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "11 min",
    definition: "CommonJS (require/module.exports) is dynamic and runtime-evaluated. ES Modules (import/export) are static and compile-time analyzed, allowing tree-shaking.",
    simpleExplanation: "Modules break code into separate files. ES Modules use `import/export` while Node traditional uses `require()`.",
    whyDoesItExist: "Prevents monolithic single-file applications and facilitates code bundling.",
    basicExample: `// ES Module Export (math.js)
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// ES Module Import (app.js)
import multiply, { add } from './math.js';
console.log(add(2, 3), multiply(2, 3));`,
    interviewQuestions: [
      { level: "Senior", question: "Why can ES Modules perform Tree Shaking while CommonJS cannot?", answer: "ESM uses static import/export structure analyzed before runtime execution. CJS uses dynamic require() calls at runtime." }
    ]
  }),

  // 25. ERROR HANDLING
  "js-error-handling": createTopicSchema({
    id: "js-error-handling",
    techId: "javascript",
    title: "Error Handling & Custom Error Hierarchy",
    category: "Production Code",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "10 min",
    definition: "Robust error handling uses try/catch/finally blocks, custom Error subclasses, and unhandled rejection listeners to prevent app crashes.",
    simpleExplanation: "Always catch unexpected failures so your app displays friendly messages instead of crashing silently.",
    whyDoesItExist: "Guarantees graceful degradation in production applications.",
    basicExample: `class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateAge(age) {
    if (age < 18) throw new ValidationError("User must be 18+");
    return true;
}

try {
    validateAge(15);
} catch (err) {
    console.error(\`[\${err.name}]: \${err.message}\`);
}`,
    interviewQuestions: [
      { level: "Intermediate", question: "Does code inside a 'finally' block run if 'try' returns a value?", answer: "Yes, 'finally' ALWAYS executes, even if try or catch contains an explicit return statement." }
    ]
  }),

  // 26. MEMORY MANAGEMENT
  "js-memory-management": createTopicSchema({
    id: "js-memory-management",
    techId: "javascript",
    title: "Memory Management & Garbage Collection (Mark-and-Sweep)",
    category: "JS Internals",
    difficulty: "Senior",
    experienceBand: "5–8 years",
    readingTime: "15 min",
    definition: "V8 manages memory using Heap & Stack allocations. Garbage Collection employs the Mark-and-Sweep algorithm to reclaim unreferenced object memory.",
    simpleExplanation: "GC finds objects no longer connected to the root application and sweeps them out of RAM memory.",
    whyDoesItExist: "Automatic memory management prevents manual C-style `malloc/free` bugs.",
    basicExample: `// Memory Leak Example: Detached DOM & Uncleaned Listeners
function attachListener() {
    const hugeData = new Array(1000000).fill("DATA");
    window.addEventListener("scroll", () => {
        console.log(hugeData.length); // Retains hugeData in closure heap!
    });
}
// Solution: Always removeEventListener when component unmounts.`,
    interviewQuestions: [
      { level: "Senior", question: "Name 3 common causes of Memory Leaks in JavaScript applications.", answer: "1. Global variable accidental creation. 2. Forgotten setInterval / event listeners. 3. Detached DOM node references." }
    ]
  }),

  // 27. DOM & EVENTS
  "js-dom-events": createTopicSchema({
    id: "js-dom-events",
    techId: "javascript",
    title: "DOM Manipulation & Event Delegation Pattern",
    category: "Browser Web APIs",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "12 min",
    definition: "Event Delegation leverages Event Bubbling to attach a single event listener on a parent element rather than binding listeners to dozens of child elements.",
    simpleExplanation: "Instead of adding click listeners to 1,000 list items, add 1 listener to the container `<ul>` and inspect `e.target`.",
    whyDoesItExist: "Drastically reduces RAM memory footprint for dynamic lists.",
    basicExample: `// Event Delegation Pattern
const list = document.querySelector("#user-list");

list?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
        console.log("Clicked button inside list item:", target.dataset.id);
    }
});`,
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between Event Capturing and Event Bubbling?", answer: "Capturing trickles event down from Window -> Target. Bubbling bubbles event up from Target -> Window." }
    ]
  }),

  // 28. FETCH / HTTP / CORS
  "js-fetch-cors": createTopicSchema({
    id: "js-fetch-cors",
    techId: "javascript",
    title: "Fetch API, HTTP Protocols & CORS Policy",
    category: "Browser Web APIs",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    readingTime: "14 min",
    definition: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that uses HTTP headers to restrict cross-domain requests.",
    simpleExplanation: "CORS stops malicious websites from stealing your private data from another server without server permission.",
    whyDoesItExist: "Enforces Same-Origin Policy in web browsers.",
    basicExample: `// Fetch request with headers & error handling
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(\`HTTP Error: \${response.status}\`);
    return response.json();
}`,
    interviewQuestions: [
      { level: "Senior", question: "What triggers an HTTP CORS Preflight OPTIONS request?", answer: "Non-simple HTTP requests (e.g. PUT/DELETE methods, or custom headers like Authorization)." }
    ]
  }),

  // 29. SECURITY
  "js-security": createTopicSchema({
    id: "js-security",
    techId: "javascript",
    title: "Web Security (XSS, CSRF & Input Sanitization)",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "4–6 years",
    readingTime: "15 min",
    definition: "Web application security involves mitigating XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery), and enforcing Content Security Policy headers.",
    simpleExplanation: "Never trust user input. Sanitize HTML strings before rendering to prevent hackers from running script tags.",
    whyDoesItExist: "Protects user session tokens, personal data, and system integrity.",
    basicExample: `// Preventing XSS via HTML Escaping
function sanitizeHTML(str) {
    return str.replace(/[&<>"']/g, (match) => {
        const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
        return escapeMap[match];
    });
}
console.log(sanitizeHTML("<script>alert('hack')</script>"));`,
    interviewQuestions: [
      { level: "Senior", question: "Why are HttpOnly cookies safer than localStorage for storing JWT tokens?", answer: "HttpOnly cookies cannot be read by JavaScript code, protecting tokens from XSS script extraction." }
    ]
  }),

  // 30. PERFORMANCE
  "js-performance": createTopicSchema({
    id: "js-performance",
    techId: "javascript",
    title: "Performance Optimization (Debounce, Throttle & Reflow)",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "4–6 years",
    readingTime: "14 min",
    definition: "Debouncing delays function execution until user activity stops. Throttling limits function execution to once per fixed time interval.",
    simpleExplanation: "Debounce is like waiting for someone to finish typing search text before sending an API request.",
    whyDoesItExist: "Prevents UI lag and server overload on high-frequency scroll/keyup events.",
    basicExample: `// Debounce implementation
function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log("Searching API for:", query);
}, 400);`,
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between layout Reflow and Repaint?", answer: "Reflow recalculates geometry and layout bounds (expensive). Repaint redraws element pixels (colors, shadows)." }
    ]
  }),

  // 31. DESIGN PATTERNS
  "js-design-patterns": createTopicSchema({
    id: "js-design-patterns",
    techId: "javascript",
    title: "JavaScript Design Patterns (Observer, Factory, Singleton)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "5–8 years",
    readingTime: "16 min",
    definition: "Design patterns are reusable architectural solutions to common software engineering problems (Observer, Singleton, Factory, Module, Proxy).",
    simpleExplanation: "Observer pattern is like subscribing to a newsletter. When new data arrives, all subscribers get notified automatically.",
    whyDoesItExist: "Standardizes extensible software component architecture.",
    basicExample: `// Observer Pattern Implementation
class EventEmitter {
    #listeners = new Map();

    on(event, callback) {
        if (!this.#listeners.has(event)) this.#listeners.set(event, []);
        this.#listeners.get(event).push(callback);
    }

    emit(event, data) {
        this.#listeners.get(event)?.forEach(cb => cb(data));
    }
}

const events = new EventEmitter();
events.on("userLogin", user => console.log("Logged in:", user));
events.emit("userLogin", { name: "Alice" });`,
    interviewQuestions: [
      { level: "Senior", question: "How does the JS Proxy pattern work and where is it used?", answer: "Proxy intercepts object operations (get, set). It powers reactivity in Vue 3 and mobx." }
    ]
  }),

  // 32. JAVASCRIPT INTERNALS (V8)
  "js-v8-internals": createTopicSchema({
    id: "js-v8-internals",
    techId: "javascript",
    title: "JavaScript Internals (V8 Ignition & TurboFan JIT)",
    category: "JS Internals",
    difficulty: "Senior",
    experienceBand: "6–10 years",
    readingTime: "18 min",
    definition: "V8 parses JS into AST, executes bytecode via Ignition interpreter, and optimizes hot execution paths with TurboFan JIT compiler using Hidden Classes & Inline Caches.",
    simpleExplanation: "V8 is Chrome's engine. It reads JS, turns it into bytecode, and converts frequently run functions straight into hardware machine code.",
    whyDoesItExist: "Achieves near-native execution speed for JavaScript web applications.",
    basicExample: `// V8 Hidden Classes Optimization Tip
function Point(x, y) {
    this.x = x;
    this.y = y; // Always initialize properties in SAME ORDER for V8 Hidden Class sharing!
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);`,
    interviewQuestions: [
      { level: "Senior", question: "What causes V8 de-optimization (Bailout)?", answer: "Changing object hidden classes dynamically by adding properties out of order, or passing changing variable types to hot functions." }
    ]
  }),

  // 33. SENIOR CODING & SYSTEM PROBLEMS
  "js-senior-coding": createTopicSchema({
    id: "js-senior-coding",
    techId: "javascript",
    title: "Senior-Level System & Coding Problems (Polyfills & LRU Cache)",
    category: "Senior Interview Coding",
    difficulty: "Senior",
    experienceBand: "6–10+ years",
    readingTime: "20 min",
    definition: "Senior coding interviews require building custom polyfills (Promise.all, deepClone), LRU (Least Recently Used) cache data structures, and complex async queue managers.",
    simpleExplanation: "Demonstrates deep mastery by re-implementing JavaScript built-in engines and data structures from pure scratch.",
    whyDoesItExist: "Tests fundamental engineering problem solving without external third-party libraries.",
    basicExample: `// Custom Polyfill for Promise.all
Promise.myAll = function(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;
        if (promises.length === 0) return resolve(results);

        promises.forEach((p, idx) => {
            Promise.resolve(p).then(res => {
                results[idx] = res;
                completed++;
                if (completed === promises.length) resolve(results);
            }).catch(reject);
        });
    });
};

Promise.myAll([Promise.resolve(10), Promise.resolve(20)])
    .then(console.log); // Output: [10, 20]`,
    interviewQuestions: [
      { level: "Senior", question: "How would you implement an LRU Cache with O(1) get and put time complexity?", answer: "Combine a Hash Map for O(1) key lookup with a Doubly Linked List for O(1) node eviction and insertion." }
    ]
  })
};
