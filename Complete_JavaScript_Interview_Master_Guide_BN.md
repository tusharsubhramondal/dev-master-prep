# Complete JavaScript Interview Master Guide

> A comprehensive, senior-level interview preparation handbook covering core fundamentals, V8 engine internals, asynchronous architecture, memory mechanics, design patterns, polyfills, and interview coding challenges.

---

## 📑 Table of Contents

1. [Variables & Data Types](#1-variables--data-types)
2. [Operators & Control Flow](#2-operators--control-flow)
3. [Scopes & Scope Chain](#3-scopes--scope-chain)
4. [Hoisting & Temporal Dead Zone (TDZ)](#4-hoisting--temporal-dead-zone-tdz)
5. [Object & Array Methods](#5-object--array-methods)
6. [Destructuring, Spread & Rest Operators](#6-destructuring-spread--rest-operators)
7. [Closures & Lexical Scope](#7-closures--lexical-scope)
8. [`this` Keyword Binding Rules](#8-this-keyword-binding-rules)
9. [`call`, `apply`, and `bind` (With Polyfills)](#9-call-apply-and-bind-with-polyfills)
10. [Asynchronous JavaScript Architecture](#10-asynchronous-javascript-architecture)
11. [Callbacks & Callback Hell](#11-callbacks--callback-hell)
12. [Promises & Async / Await](#12-promises--async--await)
13. [The Event Loop Mechanics](#13-the-event-loop-mechanics)
14. [Microtask Queue vs Macrotask Queue](#14-microtask-queue-vs-macrotask-queue)
15. [DOM, BOM & Event Delegation](#15-dom-bom--event-delegation)
16. [Advanced Concepts: Debouncing, Throttling, Memoization, Currying, Garbage Collection & Memory Leaks](#16-advanced-concepts)

---

## 1. Variables & Data Types

### 1.1 Primitive vs Reference Types

JavaScript data is categorized into **7 Primitive Types** and **Reference Objects**.

| Metric | Primitive Data Types | Reference Object Types |
| :--- | :--- | :--- |
| **Types** | `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null` | `Object`, `Array`, `Function`, `Date`, `Map`, `Set` |
| **Memory Allocation** | Call Stack (Direct value storage) | Heap Memory (Address Pointer on Call Stack) |
| **Mutability** | Immutable (Raw value cannot be mutated) | Mutable (Properties can be added, deleted, or altered) |
| **Copy Behavior** | Copy by Value | Copy by Memory Reference Pointer |
| **Equality Check (`===`)** | Compares raw literal values | Compares memory reference addresses |

```javascript
// Primitive: Copy by Value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (a is untouched)

// Reference: Copy by Pointer
let user1 = { name: "Alice" };
let user2 = user1; // Both point to same Heap Address 0x0041
user2.name = "Bob";
console.log(user1.name); // "Bob" (Mutated!)
```

### 1.2 `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scoped | Block Scoped `{}` | Block Scoped `{}` |
| **Hoisting** | Hoisted with `undefined` | Hoisted into TDZ | Hoisted into TDZ |
| **Re-declaration** | Allowed in same scope | Throws `SyntaxError` | Throws `SyntaxError` |
| **Re-assignment** | Allowed | Allowed | Disallowed (Immutable Binding) |

> ⚠️ **Key Interview Note:** `const` creates an **immutable reference binding**, NOT an immutable object. Properties inside a `const obj = {}` can still be mutated (`obj.age = 25`). Use `Object.freeze(obj)` for true runtime immutability.

### 1.3 `typeof` Quirks & Edge Cases

```javascript
typeof "text"        // "string"
typeof 42            // "number"
typeof 10n           // "bigint"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof Symbol("id")  // "symbol"
typeof function(){}  // "function"

// Quirks
typeof null          // "object"  <-- Historical 1995 JS Bug (0x00 null pointer)
typeof NaN           // "number"  <-- Represented as "Not-a-Number" IEEE 754 float
typeof []            // "object"  <-- Use Array.isArray([]) to check arrays

// NaN Rules
NaN === NaN          // false! (Use Number.isNaN(val) or Object.is(val, NaN))
```

---

## 2. Operators & Control Flow

### 2.1 Equality: `==` vs `===`

- `==` (Abstract Equality): Performs **Type Coercion** before comparing.
- `===` (Strict Equality): Compares both **Type** and **Value** without coercion.

```javascript
5 == "5"           // true  (Coerces string "5" to number 5)
5 === "5"          // false (Types differ: number vs string)

null == undefined  // true
null === undefined // false

0 == false         // true
0 === false        // false
```

### 2.2 Short-Circuiting & Nullish Coalescing (`??`)

```javascript
// Logical OR (||): Returns right side for ANY falsy value (false, 0, "", null, undefined, NaN)
const port1 = process.env.PORT || 3000;

// Nullish Coalescing (??): Returns right side ONLY for null or undefined
const port2 = 0 ?? 3000; // 0 (Preserves valid falsy 0)
const text = "" ?? "Default"; // "" (Preserves empty string)

// Optional Chaining (?.): Prevents "Cannot read properties of undefined"
const city = user?.address?.city;
const firstItem = items?.[0];
const result = customMethod?.();
```

---

## 3. Scopes & Scope Chain

Scope defines the accessibility of variables during execution.

### 3.1 Scope Types
1. **Global Scope:** Accessible anywhere in the application.
2. **Function Scope:** Variables declared with `var`, `let`, or `const` inside a function are accessible only within that function.
3. **Block Scope:** Variables declared with `let` and `const` inside `{}` blocks (if statements, loops) exist only within those brackets.

### 3.2 Scope Chain & Lexical Environment

When a variable is resolved, JS checks:
1. Current Local Scope
2. Enclosing Parent Scope(s)
3. Global Scope

If not found in any scope, JS throws a `ReferenceError`.

```javascript
const globalVar = "Global";

function outer() {
  const outerVar = "Outer";
  
  function inner() {
    const innerVar = "Inner";
    console.log(innerVar, outerVar, globalVar); // Resolves up the Scope Chain
  }
  inner();
}
outer();
```

---

## 4. Hoisting & Temporal Dead Zone (TDZ)

### 4.1 Execution Context Phases
When JavaScript runs a function or script, V8 creates an **Execution Context** in 2 phases:
1. **Creation Phase (Memory Allocation):** Scans code, sets up scope chain, allocates memory for variables and functions.
2. **Execution Phase:** Executes code line-by-line, assigning values and running function calls.

```
┌────────────────────────────────────────────────────────┐
│ Global / Function Execution Context                    │
├────────────────────────────┬───────────────────────────┤
│ 1. Creation Phase (Memory) │ 2. Execution Phase (Code) │
├────────────────────────────┼───────────────────────────┤
│ var x = undefined          │ x = 10                    │
│ let y = <Uninitialized>    │ y = 20                    │
│ fn() = Memory Ref          │ fn() called               │
└────────────────────────────┴───────────────────────────┘
```

### 4.2 Hoisting Rules
- **Function Declarations:** Fully hoisted (can be called before line of definition).
- **`var` Variables:** Hoisted and initialized to `undefined`.
- **`let` & `const` Variables:** Hoisted into the **Temporal Dead Zone (TDZ)** without initialization.

```javascript
greet(); // "Hello!" (Function declaration fully hoisted)
function greet() { console.log("Hello!"); }

console.log(a); // undefined (var hoisted)
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;     // <-- TDZ ends here
```

---

## 5. Object & Array Methods

### 5.1 Array Transformation Methods (`map`, `filter`, `reduce`)

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: Returns new array transformed
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// filter: Returns new array matching condition
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// reduce: Accumulates array to single result
const sum = numbers.reduce((acc, num) => acc + num, 0); // 15
```

### 5.2 `slice` vs `splice`

| Method | Mutates Original Array? | Purpose | Returns |
| :--- | :--- | :--- | :--- |
| `slice(start, end)` | ❌ No | Extracts a shallow copy section of an array | New sliced array |
| `splice(start, count, ...items)` | ✅ Yes | Removes, replaces, or adds elements in place | Removed elements array |

```javascript
const arr = [10, 20, 30, 40, 50];

// slice (non-mutating)
const sliced = arr.slice(1, 4); // [20, 30, 40], arr remains [10, 20, 30, 40, 50]

// splice (mutating)
const removed = arr.splice(1, 2, 99); // Removes 20, 30 and inserts 99 -> arr becomes [10, 99, 40, 50]
```

### 5.3 Object Helper Methods

```javascript
const user = { name: "Alice", age: 28, role: "Developer" };

Object.keys(user);    // ["name", "age", "role"]
Object.values(user);  // ["Alice", 28, "Developer"]
Object.entries(user); // [["name", "Alice"], ["age", 28], ["role", "Developer"]]
```

---

## 6. Destructuring, Spread & Rest Operators

### 6.1 Destructuring
```javascript
// Object Destructuring
const person = { name: "Sarah", age: 30, address: { city: "NY" } };
const { name: fullName, address: { city }, country = "USA" } = person;
console.log(fullName, city, country); // Sarah NY USA

// Array Destructuring
const rgb = [255, 128, 0];
const [r, g, b, alpha = 1] = rgb;
```

### 6.2 Spread vs Rest (`...`)

- **Spread (`...`):** Expands arrays or objects into individual elements (used in copies, merges, function calls).
- **Rest (`...`):** Condenses multiple individual elements into a single array parameter.

```javascript
// Spread: Merging Objects (Shallow Copy)
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2 }

// Rest: Collecting function arguments
function sumAll(first, ...restNumbers) {
  return restNumbers.reduce((acc, n) => acc + n, first);
}
console.log(sumAll(10, 20, 30)); // 60
```

---

## 7. Closures & Lexical Scope

### 7.1 What is a Closure?
A **closure** is a function bundled together with references to its surrounding lexical environment. An inner function retains access to variables declared in its parent outer function even after the outer function has finished executing and returned.

```javascript
function createCounter() {
  let count = 0; // Private state variable
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount()   { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (Encapsulated private state!)
```

### 7.2 Classic Closure Loop Trap

```javascript
// Problem: var is function-scoped. Loop finishes before setTimeout triggers (i becomes 3)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output after 1 sec: 3, 3, 3

// Solution 1: Use block-scoped `let`
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output after 1 sec: 0, 1, 2

// Solution 2: Use IIFE to create closed scope per iteration
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}
```

---

## 8. `this` Keyword Binding Rules

The value of `this` is determined by **how a function is invoked** at call time.

### 8.1 The 4 Binding Rules

1. **Default Binding:** Function invoked standalone (`fn()`). `this` points to `window` (browser) or `global` (Node). In `'use strict'`, `this` is `undefined`.
2. **Implicit Binding:** Method invoked on an object (`obj.method()`). `this` points to `obj`.
3. **Explicit Binding:** Using `.call()`, `.apply()`, or `.bind()`. `this` is explicitly specified.
4. **`new` Binding:** Constructor called with `new Fn()`. `this` points to the brand new object instance.

```javascript
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};

obj.greet(); // Implicit -> "Alice"

const detached = obj.greet;
detached();  // Default -> undefined (Strict mode) or window.name
```

### 8.2 Arrow Functions & Lexical `this`
Arrow functions **do not have their own `this`**. They capture the `this` value lexically from their enclosing parent context at the time of creation.

```javascript
const timer = {
  name: "Task Timer",
  start() {
    setTimeout(() => {
      console.log(this.name); // Inherits `this` from start() -> "Task Timer"
    }, 100);
  }
};
timer.start();
```

---

## 9. `call`, `apply`, and `bind` (With Polyfills)

### 9.1 Differences

```javascript
function introduce(greeting, punctuation) {
  return `${greeting}, I am ${this.name}${punctuation}`;
}

const user = { name: "Tushar" };

// call: Invokes immediately, takes comma-separated arguments
introduce.call(user, "Hello", "!");   // "Hello, I am Tushar!"

// apply: Invokes immediately, takes arguments array
introduce.apply(user, ["Hi", "."]);   // "Hi, I am Tushar."

// bind: Does NOT invoke immediately; returns new bound function
const boundFn = introduce.bind(user, "Welcome");
boundFn("!!!");                       // "Welcome, I am Tushar!!!"
```

### 9.2 Custom Polyfill for `Function.prototype.bind`

```javascript
Function.prototype.myBind = function(context, ...args1) {
  const targetFn = this;
  if (typeof targetFn !== 'function') {
    throw new TypeError("Must be called on a function");
  }

  return function(...args2) {
    // Unique property to attach method temporary reference
    const fnSymbol = Symbol('fn');
    context = context || globalThis;
    context[fnSymbol] = targetFn;
    
    const result = context[fnSymbol](...args1, ...args2);
    delete context[fnSymbol];
    return result;
  };
};
```

---

## 10. Asynchronous JavaScript Architecture

JavaScript is a **single-threaded**, **non-blocking**, **asynchronous** language.

- **Single-Threaded:** Has only one Call Stack executing code line-by-line.
- **Non-Blocking I/O:** Offloads time-consuming tasks (timers, network requests, disk reads) to browser Web APIs or Node.js `libuv` C++ thread pool.

```
┌────────────────────────────────────────────────────────┐
│ V8 Engine Call Stack (Single Thread)                   │
└───────────────────────────┬────────────────────────────┘
                            │ (Offloads Async Tasks)
                            ▼
┌────────────────────────────────────────────────────────┐
│ Web APIs (Browser) / libuv (Node) -> Fetch, Timers, FS │
└───────────────────────────┬────────────────────────────┘
                            │ (Task Completed Event)
                            ▼
               ┌──────────────────────────┐
               │ Microtask Queue (Promises)│
               └────────────┬─────────────┘
                            │
               ┌────────────▼─────────────┐
               │ Macrotask Queue (Timers) │
               └────────────┬─────────────┘
                            │
                            ▼
                   Event Loop Monitor
```

---

## 11. Callbacks & Callback Hell

### 11.1 Callback Concept
A callback is a function passed as an argument to another function to execute after an async operation finishes.

### 11.2 Callback Hell (Pyramid of Doom)
Deeply nested callbacks create code that is hard to read, maintain, and handle errors.

```javascript
// Callback Hell Pattern
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      console.log(details);
    }, handleError);
  }, handleError);
}, handleError);
```

---

## 12. Promises & Async / Await

### 12.1 Promise States
1. **Pending:** Initial state, neither fulfilled nor rejected.
2. **Fulfilled:** Operation completed successfully (`resolve(data)`).
3. **Rejected:** Operation failed (`reject(error)`).

### 12.2 Promise Combinators (`all`, `allSettled`, `race`, `any`)

```javascript
const p1 = Promise.resolve("One");
const p2 = Promise.resolve("Two");
const p3 = Promise.reject("Error");

// Promise.all: Resolves when ALL pass; rejects immediately if ANY fails
Promise.all([p1, p2]).then(console.log); // ["One", "Two"]

// Promise.allSettled: Waits for all to settle; returns status objects array
Promise.allSettled([p1, p3]).then(console.log);
// [{status: "fulfilled", value: "One"}, {status: "rejected", reason: "Error"}]

// Promise.race: Settles with outcome of FIRST settled promise (fulfilled or rejected)
Promise.race([p1, p2]).then(console.log); // "One"

// Promise.any: Settles with FIRST fulfilled promise; ignores rejections
Promise.any([p3, p2]).then(console.log); // "Two"
```

### 12.3 Async / Await
Syntactic sugar over Promises built on Generators.

```javascript
async function fetchUserData(userId) {
  try {
    const res = await fetch(`https://api.example.com/users/${userId}`);
    if (!res.ok) throw new Error("User fetch failed");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error boundary caught:", err.message);
  }
}
```

---

## 13. The Event Loop Mechanics

The **Event Loop** is a continuous loop that monitors the Call Stack and task queues:

1. Checks if the **Call Stack** is empty.
2. If empty, completely drains all pending tasks in the **Microtask Queue**.
3. Takes **ONE** task from the **Macrotask Queue** and pushes it onto the Call Stack.
4. Renders UI frame updates (if browser needs repaint).
5. Repeats the loop.

---

## 14. Microtask Queue vs Macrotask Queue

| Queue | Tasks Included | Priority |
| :--- | :--- | :--- |
| **Microtask Queue** | `Promise.then / catch / finally`, `queueMicrotask()`, `MutationObserver`, `process.nextTick` | **High Priority** (Drained completely before next tick) |
| **Macrotask Queue** | `setTimeout`, `setInterval`, `setImmediate`, `I/O operations`, `UI Rendering` | **Low Priority** (Executes 1 task per loop iteration) |

### Interview Priority Execution Quiz

```javascript
console.log('1: Sync Start');

setTimeout(() => console.log('2: Macrotask setTimeout'), 0);

Promise.resolve().then(() => console.log('3: Microtask Promise 1'))
               .then(() => console.log('4: Microtask Promise 2'));

queueMicrotask(() => console.log('5: Microtask queueMicrotask'));

console.log('6: Sync End');

// Execution Order Output:
// 1: Sync Start
// 6: Sync End
// 3: Microtask Promise 1
// 5: Microtask queueMicrotask
// 4: Microtask Promise 2
// 2: Macrotask setTimeout
```

---

## 15. DOM, BOM & Event Delegation

### 15.1 DOM vs BOM
- **DOM (Document Object Model):** Represents the HTML document tree (`document.getElementById`, `document.querySelector`).
- **BOM (Browser Object Model):** Objects exposed by the browser outside document content (`window`, `navigator`, `location`, `history`, `screen`).

### 15.2 Event Propagation: Capturing vs Bubbling
1. **Capturing Phase (Trickling):** Event travels down from `window` -> `document` -> `body` -> parent elements down to target element.
2. **Target Phase:** Event reaches target element.
3. **Bubbling Phase:** Event bubbles up from target element up through parents back to `window`.

```javascript
// Default addEventListener uses Bubbling (false)
element.addEventListener('click', handler, false); 

// Pass true to listen during Capturing phase
element.addEventListener('click', handler, true); 
```

### 15.3 Event Delegation Pattern
Attaching a single event listener to a parent container to handle events triggered on current or future child elements using event bubbling.

```javascript
// Single event listener on container instead of 1,000 child button listeners
document.getElementById('shopping-cart').addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.delete-item')) {
    const itemId = e.target.dataset.id;
    console.log("Deleted item:", itemId);
  }
});
```

---

## 16. Advanced Concepts

### 16.1 Debouncing vs Throttling

- **Debouncing:** Delays function execution until user activity stops for specified `delay` ms (e.g. Typeahead Search inputs).
- **Throttling:** Limits function execution to once every `limit` ms interval (e.g. Scroll, Window Resize listeners).

```javascript
// Custom Debounce Implementation
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(context, args), delay);
  };
}

// Custom Throttle Implementation
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

### 16.2 Memoization
Caching function outputs based on input arguments to avoid repeating expensive calculations.

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example usage with Fibonacci
const memoizedFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});
```

---

### 16.3 Function Currying & Infinite Currying

Currying transforms a function taking multiple arguments `f(a, b, c)` into a sequence of unary functions `f(a)(b)(c)`.

```javascript
// Basic Currying
const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6

// Infinite Currying Implementation: add(1)(2)(3)...()
function infiniteAdd(a) {
  return function (b) {
    if (b !== undefined) {
      return infiniteAdd(a + b);
    }
    return a;
  };
}
console.log(infiniteAdd(1)(2)(3)(4)()); // 10
```

---

### 16.4 Garbage Collection & Memory Leaks

#### V8 Garbage Collection (Mark-and-Sweep)
V8 manages memory allocations using:
1. **Young Generation (Scavenger):** Short-lived objects cleared rapidly.
2. **Old Generation (Mark-and-Sweep-Compact):** Long-lived objects. Mark reachable objects from Root (`window`), sweep unreferenced memory.

#### Top 4 Causes of Memory Leaks

1. **Accidental Global Variables:**
   ```javascript
   function leak() {
     leakedVar = "I am attached to window!"; // Forgot let/const
   }
   ```
2. **Forgotten Timers / Intervals:**
   ```javascript
   const timer = setInterval(() => {
     // If timer is never clearInterval(), closure retains referenced objects in memory!
   }, 1000);
   ```
3. **Detached DOM Element References:**
   ```javascript
   let btnRef = document.getElementById('button');
   document.body.removeChild(btnRef); // Removed from DOM tree
   // But btnRef variable still holds reference in RAM memory!
   btnRef = null; // Fix: clear reference
   ```
4. **Stale Closures & Uncleaned Event Listeners:**
   Always run `removeEventListener` when UI components unmount.

---

> 🎉 **Master Guide Complete!** Use this handbook for revision before JavaScript Technical Interviews.
