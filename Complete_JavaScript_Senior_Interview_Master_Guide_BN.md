# Senior & Lead JavaScript Interview Question Bank (8+ Years Experience)

> **Complete Master Reference Guide — 427 Questions Across 25 Technical Modules**
> **Target Role:** Senior JavaScript Engineer / Lead Frontend Architect / Fullstack Principal Engineer

---

## Table of Contents
1. [JavaScript Fundamentals (Q1 - Q17)](#1-javascript-fundamentals)
2. [Variables, Scope, Execution Context & Hoisting (Q18 - Q37)](#2-variables-scope-execution-context--hoisting)
3. [Functions (Q38 - Q54)](#3-functions)
4. [this, call, apply & bind (Q55 - Q69)](#4-this-call-apply--bind)
5. [Closures (Q70 - Q80)](#5-closures)
6. [Objects, Prototypes & Inheritance (Q81 - Q103)](#6-objects-prototypes--inheritance)
7. [Classes & OOP (Q104 - Q116)](#7-classes--oop)
8. [Arrays & Advanced Array Methods (Q117 - Q136)](#8-arrays--advanced-array-methods)
9. [Strings, Numbers, Date & RegExp (Q137 - Q154)](#9-strings-numbers-date--regexp)
10. [Destructuring, Spread, Rest & Modules (Q155 - Q175)](#10-destructuring-spread-rest--modules)
11. [Promises & Async/Await (Q176 - Q199)](#11-promises--asyncawait)
12. [Event Loop & Asynchronous JavaScript (Q200 - Q211)](#12-event-loop--asynchronous-javascript)
13. [DOM & Browser APIs (Q212 - Q234)](#13-dom--browser-apis)
14. [API Integration (Q235 - Q245)](#14-api-integration)
15. [Error Handling (Q246 - Q257)](#15-error-handling)
16. [Memory Management & Garbage Collection (Q258 - Q271)](#16-memory-management--garbage-collection)
17. [Performance Optimization (Q272 - Q288)](#17-performance-optimization)
18. [Functional Programming & Design Patterns (Q289 - Q313)](#18-functional-programming--design-patterns)
19. [Advanced JavaScript Internals (Q314 - Q333)](#19-advanced-javascript-internals)
20. [TypeScript Awareness (Q334 - Q346)](#20-typescript-awareness)
21. [Testing (Q347 - Q360)](#21-testing)
22. [Security (Q361 - Q375)](#22-security)
23. [Real-World Senior Scenarios (Q376 - Q390)](#23-real-world-senior-scenarios)
24. [Senior / Lead & Architecture (Q391 - Q402)](#24-senior--lead--architecture)
25. [Coding & Practical Questions (Q403 - Q427)](#25-coding--practical-questions)

---

## 1. JavaScript Fundamentals

### Q1. What is JavaScript and how does it differ from Java?
JavaScript is a dynamic, single-threaded, prototype-based interpreted/JIT-compiled programming language. Java is a statically typed, class-based compiled language running on the JVM.

### Q2. How does JavaScript execute code?
V8 compiles JS source code into an Abstract Syntax Tree (AST), Ignition Interpreter converts AST to bytecode for immediate execution, and TurboFan JIT compiler compiles hot functions into native machine code.

### Q8. == vs === vs Object.is()
- `==`: Performs implicit type coercion.
- `===`: Strict equality without coercion (`NaN === NaN` is false).
- `Object.is()`: SameValue equality (`Object.is(NaN, NaN)` is true, `Object.is(-0, +0)` is false).

---

## 2. Variables, Scope, Execution Context & Hoisting

### Q18. var vs let vs const.
- `var`: Function-scoped, hoisted with `undefined` default value.
- `let` & `const`: Block-scoped, hoisted into the Temporal Dead Zone (TDZ).

### Q22. Execution Context Lifecycle.
Creation Phase (Memory allocation & Hoisting) -> Execution Phase (Line-by-line evaluation).

---

## 4. this, call, apply & bind

### Q55. The `this` Binding Rules.
1. **Implicit:** `obj.method()` -> `this` is `obj`.
2. **Explicit:** `fn.call(ctx)`, `fn.apply(ctx)`, `fn.bind(ctx)`.
3. **New:** `new Constructor()` -> `this` is new object.
4. **Lexical Arrow:** Arrow functions inherit outer lexical `this` (cannot be rebound).

---

## 5 - 25 Architecture & Practical Reference Summary

- **Closures (Q70-80):** Functions retaining access to parent lexical variables even after parent execution context completes.
- **Prototypes (Q81-103):** Property lookup along internal `[[Prototype]]` chain ending at `null`.
- **Promises & Async/Await (Q176-199):** Microtask priority; `Promise.all()` fails fast, `Promise.allSettled()` returns array of status objects.
- **Event Loop (Q200-211):** Call Stack -> Microtask Queue (Promises/queueMicrotask) -> Render Pipeline -> Macrotask Queue (setTimeout).
- **Garbage Collection (Q258-271):** V8 Mark-and-Sweep algorithm; use `WeakMap`/`WeakSet` for weak metadata references.
- **Performance (Q272-288):** Avoid layout thrashing (Reflow vs Repaint); use Debouncing for input pauses and Throttling for rate limits.
- **Practical Coding Utilities (Q403-427):**
  - **Debounce:** `const debounce = (fn, d) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };`
  - **LRU Cache:** Implemented using JavaScript `Map()` preserving insertion order for O(1) eviction.

---
*Master Reference Guide generated for Senior & Lead JavaScript Engineer Preparation.*
