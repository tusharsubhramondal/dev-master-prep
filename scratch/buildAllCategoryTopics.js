import fs from 'node:fs';

// 1. JAVASCRIPT TOPICS GENERATOR
const jsModules = [
  { id: "js-fundamentals", title: "JavaScript Fundamentals", qRange: "Q1 - Q17", desc: "V8 engine execution, type coercion, equality semantics (== vs === vs Object.is), NaN checking, primitives vs reference types." },
  { id: "js-variables-scope-execution", title: "Variables, Scope, Execution Context & Hoisting", qRange: "Q18 - Q37", desc: "var vs let vs const, function vs block scope, lexical environment, creation & execution phases, Temporal Dead Zone (TDZ)." },
  { id: "js-functions", title: "Functions", qRange: "Q38 - Q54", desc: "First-class & higher-order functions, pure vs impure functions, currying, partial application, arrow functions, rest parameters, IIFE." },
  { id: "js-this-call-apply-bind", title: "this, call, apply & bind", qRange: "Q55 - Q69", desc: "Implicit, explicit, new, and lexical arrow this bindings. call(), apply(), and bind() execution context manipulation." },
  { id: "js-closures", title: "Closures", qRange: "Q70 - Q80", desc: "Lexical scope environment retention, private state encapsulation, module pattern, loop closure pitfalls, memory leaks." },
  { id: "js-objects-prototypes", title: "Objects, Prototypes & Inheritance", qRange: "Q81 - Q103", desc: "Property descriptors, Object.defineProperty, prototype chain (__proto__ vs prototype), Object.create, prototypal inheritance." },
  { id: "js-classes-oop", title: "Classes & OOP", qRange: "Q104 - Q116", desc: "ES6 class syntax, static methods, private fields (#), class inheritance, super(), composition vs inheritance, SOLID principles." },
  { id: "js-arrays-methods", title: "Arrays & Advanced Array Methods", qRange: "Q117 - Q136", desc: "V8 array internal memory, forEach vs map, filter, reduce accumulators, flatMap, sort pitfalls, slice vs splice, Set uniqueness." },
  { id: "js-strings-numbers-date", title: "Strings, Numbers, Date & RegExp", qRange: "Q137 - Q154", desc: "String primitives vs objects, template literals, BigInt, 0.1 + 0.2 floating point precision, Date UTC handling, regex capture groups." },
  { id: "js-destructuring-modules", title: "Destructuring, Spread, Rest & Modules", qRange: "Q155 - Q175", desc: "Nested destructuring, default values, array/object spread, CommonJS vs ES Modules (import/export), dynamic import(), tree shaking." },
  { id: "js-promises-async-await", title: "Promises & Async/Await", qRange: "Q176 - Q199", desc: "Promise states, then/catch/finally chaining, Promise combinators (all, allSettled, race, any), async/await, sequential vs parallel await." },
  { id: "js-event-loop", title: "Event Loop & Asynchronous JavaScript", qRange: "Q200 - Q211", desc: "Call stack, Web APIs, Microtask queue vs Macrotask queue priority, queueMicrotask(), event-loop lag profiling." },
  { id: "js-dom-browser-apis", title: "DOM & Browser APIs", qRange: "Q212 - Q234", desc: "DOM tree manipulation, event bubbling & capturing, event delegation, passive listeners, localStorage vs sessionStorage, Fetch API, AbortController." },
  { id: "js-api-integration", title: "API Integration", qRange: "Q235 - Q245", desc: "HTTP error handling with fetch(), API client wrappers, auth headers, token refresh rotation, retry logic with exponential backoff, rate limiting." },
  { id: "js-error-handling", title: "Error Handling", qRange: "Q246 - Q257", desc: "Syntax vs runtime errors, try/catch/finally, custom Error classes, unhandled promise rejections, structured logging, error hierarchies." },
  { id: "js-memory-garbage-collection", title: "Memory Management & Garbage Collection", qRange: "Q258 - Q271", desc: "V8 Mark-and-Sweep garbage collection, heap memory leaks, detached DOM nodes, DevTools profiling, WeakMap/WeakSet weak references." },
  { id: "js-performance-optimization", title: "Performance Optimization", qRange: "Q272 - Q288", desc: "DOM Reflow vs Repaint, batching DOM updates, Debouncing vs Throttling, requestAnimationFrame(), memoization, lazy loading." },
  { id: "js-fp-design-patterns", title: "Functional Programming & Design Patterns", qRange: "Q289 - Q313", desc: "Pure functions, immutability, Module pattern, Singleton, Factory, Observer, Pub/Sub, Strategy, Decorator, Dependency Injection." },
  { id: "js-advanced-internals", title: "Advanced JavaScript Internals", qRange: "Q314 - Q333", desc: "Creation vs execution phases, Symbol.iterator, Generators (yield), async iterators (for await...of), Proxy & Reflect, WeakRef." },
  { id: "js-typescript-awareness", title: "TypeScript Awareness", qRange: "Q334 - Q346", desc: "Static typing benefits, type inference, interface vs type, generics, unknown vs any, type narrowing, discriminated unions." },
  { id: "js-testing", title: "Testing", qRange: "Q347 - Q360", desc: "Unit vs Integration vs E2E testing, Jest/Vitest, mocking & spies, testing async code & promises, timer mocking, code coverage metrics." },
  { id: "js-security", title: "Security", qRange: "Q361 - Q375", desc: "Stored & Reflected XSS, CSRF cookies (HttpOnly, SameSite), CORS preflight, Prototype Pollution, DOM-based XSS, Content Security Policy." },
  { id: "js-realworld-scenarios", title: "Real-World Senior Scenarios", qRange: "Q376 - Q390", desc: "Investigating slow apps, 2GB tab memory crashes, duplicate request cancellation, stale data, async state race condition resolution." },
  { id: "js-leadership-architecture", title: "Senior / Lead & Architecture", qRange: "Q391 - Q402", desc: "Code reviews, enforcing team standards, technical debt management, migrating legacy JS to modern ES6+, TypeScript adoption trade-offs." },
  { id: "js-coding-challenges", title: "Coding & Practical Questions", qRange: "Q403 - Q427", desc: "Polyfills for map, filter, reduce, debounce(), throttle(), deepClone(), EventEmitter, Promise.all(), rate limiter, O(1) LRU Cache." }
];

let jsTopicsCode = `import { createTopicSchema } from './createTopicSchema.js';\n\nexport const javascriptTopics = {\n`;

jsModules.forEach((m, idx) => {
  jsTopicsCode += `  "${m.id}": createTopicSchema({
    id: "${m.id}",
    techId: "javascript",
    title: "${m.title}",
    category: "${m.title}",
    difficulty: "Advanced",
    experienceBand: "8+ years",
    readingTime: "15 min",
    definition: "${m.desc}",
    simpleExplanation: "Comprehensive guide covering ${m.title} (${m.qRange}) for Senior & Lead Developers.",
    whyDoesItExist: "Essential module in the Senior JavaScript Question Bank.",
    basicExample: \`// Senior JS Example for ${m.title}\\nconsole.log("${m.title} initialized");\`,
    howItWorks: ["1. Inspect concept requirements", "2. Execute via V8 engine pipeline", "3. Validate runtime performance"],
    visualDiagram: \`<svg viewBox="0 0 700 100" class="w-full bg-slate-900 rounded p-2"><text x="350" y="55" fill="#f7df1e" text-anchor="middle">${m.title} (${m.qRange})</text></svg>\`,
    realWorldExample: \`// Production scenario for ${m.title}\`,
    commonUseCases: ["Enterprise web applications", "High-performance JS architecture"],
    commonMistakes: ["Neglecting V8 execution semantics"],
    bestPractices: ["Follow ECMAScript specifications and clean code principles"],
    whenToUse: ["In JavaScript frontend & backend development"],
    whenNotToUse: ["N/A"],
    relatedConcepts: ["${m.title}", "V8 Engine", "ECMAScript"],
    comparison: { title: "${m.title} Overview", headers: ["Aspect", "Description"], rows: [["Module", "${m.title}"], ["Question Range", "${m.qRange}"]] },
    interviewQuestions: [{ level: "Senior", question: "What are key senior considerations in ${m.title}?", answer: "${m.desc}" }],
    practiceProblem: { description: "Practice problem for ${m.title}.", starterCode: \`// Code here\\n\`, testAssertion: "Passed", solution: \`// Solution\\n\` },
    quickRevision: "★ Master ${m.title} (${m.qRange}) for Senior & Lead Interviews."
  })${idx < jsModules.length - 1 ? ',' : ''}\n\n`;
});

jsTopicsCode += `};\n`;

fs.writeFileSync('c:/Users/tusha/Desktop/dev-master-prep/src/data/topics/javascriptTopics.js', jsTopicsCode);
console.log('Successfully updated javascriptTopics.js with all 25 category topics matching Q&A!');
