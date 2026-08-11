# Complete JavaScript Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, V8 ইঞ্জিনের মেকানিজম, ইভেন্ট লুপের ডিপ-ডাইভ, মেমোরি ম্যানেজমেন্ট, পলিফিল এবং ব্যবহারিক কোডসহ তৈরি করা হয়েছে যাতে যে কেউ (শিক্ষানবিস থেকে সিনিয়র জাভাস্ক্রিপ্ট আর্কিটেক্ট) জাভাস্ক্রিপ্টের যেকোনো ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: JS Engine, Execution Context & Hoisting](#module-1-js-engine-execution-context--hoisting)
2. [Module 2: Scopes, Closures & Lexical Environment](#module-2-scopes-closures--lexical-environment)
3. [Module 3: Functions, `this` Keyword & Prototypes](#module-3-functions-this-keyword--prototypes)
4. [Module 4: Asynchronous JavaScript & Event Loop (Deep Dive)](#module-4-asynchronous-javascript--event-loop)
5. [Module 5: ES6+ Modern JavaScript Mastery](#module-5-es6-modern-javascript-mastery)
6. [Module 6: DOM, Event Bubbling, Delegation, Debounce & Throttle](#module-6-dom-event-bubbling-delegation-debounce--throttle)
7. [Module 7: Memory Management & V8 Engine Optimization](#module-7-memory-management--v8-engine-optimization)
8. [Module 8: Polyfills & Tricky Coding Scenarios](#module-8-polyfills--tricky-coding-scenarios)
9. [Module 9: Complete Level-by-Level Question Vault](#module-9-complete-level-by-level-question-vault)

---

# Module 1: JS Engine, Execution Context & Hoisting

### 1.1 JavaScript Engine কী এবং কীভাবে কাজ করে?

JavaScript হলো একটি **Single-Threaded**, **Synchronous**, **Interpreted / JIT-Compiled** প্রোগ্রামিং ল্যাঙ্গুয়েজ।  
জনপ্রিয় ইঞ্জিনের মধ্যে গুগল ক্রোম ও নোড-জেএস-এর **V8 Engine** অন্যতম।

```
JS Source Code ➔ Parser ➔ AST (Abstract Syntax Tree) ➔ Interpreter (Ignition) ➔ JIT Compiler (TurboFan) ➔ Machine Code
```

- **Memory Heap:** অবজেক্ট, ফাংশন ও রেফারেন্স ডাটা সংরক্ষণের জন্য ব্যবহৃত অনিয়মিত মেমোরি স্থান।
- **Call Stack:** এলআইএফও (LIFO - Last In First Out) নীতিতে কাজ করা স্টক যা বর্তমানে কোন ফাংশন এক্সিকিউট হচ্ছে তা ট্র্যাক করে।

---

### 1.2 Execution Context (পর্দার পেছনের রেন্ডারিং)

জাভাস্ক্রিপ্ট কোড রান হওয়ার সময় **Execution Context** তৈরি হয়। এটি ২টি ধাপে কাজ করে:

```
┌────────────────────────────────────────────────────────┐
│ Global / Function Execution Context                    │
├────────────────────────────┬───────────────────────────┤
1. Creation Phase (Memory)   │ 2. Execution Phase (Code) │
├────────────────────────────┼───────────────────────────┤
│ - Variable Hoisting        │ - Code executed line      │
│   (var = undefined)        │   by line                 │
│   (let/const = uninit)     │ - Variables assigned      │
│ - Function Declarations    │ - Functions invoked       │
│ - Scope Chain setup        │                           │
│ - 'this' Binding           │                           │
└────────────────────────────┴───────────────────────────┘
```

---

### 1.3 Hoisting এবং Temporal Dead Zone (TDZ)

**Hoisting কী?**  
কোড এক্সিকিউশনের পূর্বে **Creation Phase**-এ জাভাস্ক্রিপ্ট ইঞ্জিন ভ্যারিয়েবল এবং ফাংশন ডিক্লারেশনকে মেমোরিতে উপরে তুলে নেওয়ার ভান করে।

```javascript
console.log(a); // undefined (`var` ডিক্লেয়ার হওয়ার আগেই এক্সেস করা সম্ভব)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

**Temporal Dead Zone (TDZ) কী?**  
`let` এবং `const` দিয়ে ডিক্লেয়ার করা ভ্যারিয়েবলও হোইস্ট হয়, কিন্তু সেগুলো মেমোরিতে **Uninitialized** অবস্থায় থাকে। স্কোপের শুরু থেকে ভ্যারিয়েবলের প্রকৃত ডিক্লারেশনের লাইন পর্যন্ত সময়টুকুকে **TDZ** বলে। এই সময়ের মধ্যে এক্সেস করতে গেলে `ReferenceError` দেয়।

---

### 1.4 Primitive vs Reference Data Types (Memory Allocation)

- **Primitive Types (Number, String, Boolean, null, undefined, Symbol, BigInt):** সরাসরি **Call Stack**-এ মান হিসেব করে স্টোর হয় (Value copy হয়)।
- **Reference Types (Object, Array, Function):** আসল ডাটা স্টোর হয় **Memory Heap**-এ এবং তার মেমোরি এড্রেস/রেফারেন্স থাকে Call Stack-এ।

```javascript
let x = 10;
let y = x; // Value Copy: y হবে 10

let obj1 = { name: "Tushar" };
let obj2 = obj1; // Reference Copy: obj2 একই মেমোরি এড্রেস পয়েন্ট করে
obj2.name = "Karim";
console.log(obj1.name); // "Karim" (উভয় স্থান থেকেই বদলে যাবে!)
```

---

# Module 2: Scopes, Closures & Lexical Environment

### 2.1 Lexical Scope এবং Scope Chain
- **Lexical Scope:** একটি ফাংশন কোডের কোথায় সংজ্ঞায়িত করা হয়েছে তার ওপর ভিত্তি করে তার স্কোপ নির্ধারিত হয়।
- **Scope Chain:** যদি কোনো ভ্যারিয়েবল বর্তমান ফাংশন স্কোপে না পাওয়া যায়, তবে জাভাস্ক্রিপ্ট তার অভিভাবক (Parent/Outer) স্কোপে খুঁজতে থাকে। এই চেইন গ্লোবাল স্কোপ পর্যন্ত গিয়ে থামে।

---

### 2.2 Closure (গভীর ব্যাখ্যা)

**সংজ্ঞা:**  
যখন একটি Inner Function তার Outer Function-এর স্কোপ বা ভ্যারিয়েবলকে মনে রাখে (এমনকি Outer Function-এর এক্সিকিউশন কল স্ট্যাক থেকে শেষ হয়ে যাওয়ার পরেও), তাকে **Closure** বলে।

**কোড উদাহরণ (Private Counter):**
```javascript
function createCounter() {
  let count = 0; // Private Variable (বাহির থেকে সরাসরি পরিবর্তন করা অসম্ভব)

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (প্রাইভেট ডাটা নিরাপদ!)
```

---

### 2.3 Classic Loop Interview Tricky Question

```javascript
// ❌ সমস্যা (var ফাংশন স্কোপড হওয়ায় Closure-এ শেষ মান ৩ থেকে যায়)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// আউটপুট: 3, 3, 3 (১ সেকেন্ড পর)

// ✅ সমাধান ১: `let` ব্যবহার করা (Block Scope নতুন বাইন্ডিং তৈরি করে)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// আউটপুট: 0, 1, 2

// ✅ সমাধান ২: IIFE (Immediately Invoked Function Expression) দিয়ে Closure তৈরি
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}
```

---

# Module 3: Functions, `this` Keyword & Prototypes

### 3.1 Regular Function বনাম Arrow Function

| ফিচার | Regular Function | Arrow Function `() => {}` |
| :--- | :--- | :--- |
| **`this` Binding** | যেভাবে কল করা হয় তার ওপর ভিত্তি করে ডাইনামিক হয় | Lexical `this` (বাইরের স্কোপের `this` গ্রহণ করে) |
| **`arguments` অবজেক্ট** | নিজস্ব `arguments` অবজেক্ট থাকে | নিজস্ব `arguments` নেই (Rest `...args` লাগে) |
| **Constructor হিসেবে** | `new` দিয়ে অবজেক্ট বানানো যায় | `new` দিয়ে চালানো যায় না (TypeError দেয়) |

---

### 3.2 `this` Keyword Binding Rules (৪টি সুনির্দিষ্ট নিয়ম)

1. **Default Binding:** সাধারণ ফাংশনে `this` পয়েন্ট করে `window` (ব্রাউজারে) বা `global` (Node.js-এ)। Strict Mode-এ এটি `undefined` হয়।
2. **Implicit Binding:** অবজেক্টের ডট দিয়ে মেথড কল করলে মেথডের বা পাশের অবজেক্টটিই হবে `this` (`user.getName()` এ `user` হলো `this`)।
3. **Explicit Binding (`call`, `apply`, `bind`):**
   - `fn.call(thisObj, arg1, arg2)`: সাথে সাথে ফাংশন রান করে, কমা দিয়ে আর্গুমেন্ট নেয়।
   - `fn.apply(thisObj, [arg1, arg2])`: সাথে সাথে রান করে, আর্গুমেন্ট অ্যারে হিসেবে নেয়।
   - `fn.bind(thisObj)`: সাথে সাথে রান করে না, নতুন মেমোরাইজড ফাংশন রিটার্ন করে।
4. **`new` Binding:** `new` কিওয়ার্ড দিয়ে কন্সট্রাক্টর ফাংশন চালালে নতুন তৈরি হওয়া অবজেক্টটিই হয় `this`।

---

### 3.3 Prototypes and Prototypal Inheritance

জাভাস্ক্রিপ্টে ক্লাস বলতে বাস্তবে কিছু নেই, ES6 Class সিনট্যাক্স মূলত **Prototypes**-এর ওপর একটি সিনট্যাক্টিক সুগার।

```javascript
function Person(name) {
  this.name = name;
}

// প্রোটোটাইপে মেথড যোগ করা (সব ইনস্ট্যান্স শেয়ার করবে, মেমোরি বাঁচবে)
Person.prototype.greet = function() {
  return `Hello, I am ${this.name}`;
};

const user1 = new Person("Tushar");
console.log(user1.greet()); // "Hello, I am Tushar"
```

**Prototype Chain:** যখন কোনো প্রপার্টি `user1`-এ না পাওয়া যায়, জাভাস্ক্রিপ্ট `user1.__proto__` ➔ `Person.prototype` ➔ `Object.prototype` ➔ `null` পর্যন্ত খোঁজে।

---

# Module 4: Asynchronous JavaScript & Event Loop (Deep Dive)

### 4.1 Event Loop Architecture (পর্দার পেছনের সিস্টেম)

জাভাস্ক্রিপ্ট সিঙ্গেল থ্রেডেড হওয়া সত্ত্বেও আসিনক্রোনাস কাজ কীভাবে করে?

```
┌────────────────────────────────────────────────────────┐
│ Call Stack                                             │
└───────────────────────────┬────────────────────────────┘
                            │ (Asynchronous operations sent)
                            ▼
┌────────────────────────────────────────────────────────┐
│ Web APIs (Node APIs) -> setTimeout, fetch, DOM events  │
└───────────────────────────┬────────────────────────────┘
                            │ (When task completes)
                            ▼
 ┌──────────────────────────────────────────────────────┐
 │ MicroTask Queue (High Priority)                      │
 │ -> Promise.then/catch, process.nextTick, MutationObs │
 └──────────────────────────┬───────────────────────────┘
                            │
 ┌──────────────────────────▼───────────────────────────┐
 │ MacroTask / Task Queue (Low Priority)                │
 │ -> setTimeout, setInterval, setImmediate, I/O        │
 └──────────────────────────┬───────────────────────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   EVENT LOOP      │ ◄── Checks if Call Stack is EMPTY!
                  └───────────────────┘
```

**ইভেন্ট লুপের চরম নিয়ম:**  
১. Call Stack সম্পূর্ণ খালি হতে হবে।  
২. **MicroTask Queue**-এর সমস্ত কাজ আগে শেষ করা হবে।  
৩. এরপর **MacroTask Queue** থেকে ১টি মাত্র কাজ কল স্ট্যাকে নেওয়া হবে।

---

### 4.2 Tricky Event Loop Interview Code

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0); // MacroTask

Promise.resolve().then(() => console.log('3')); // MicroTask

console.log('4');

// আউটপুট ক্রমানুসারে:
// 1
// 4
// 3 (MicroTask আগে আসবে)
// 2 (MacroTask পরে আসবে)
```

---

### 4.3 Promise Combinators (`all`, `allSettled`, `race`, `any`)

| মেথড | বর্ণনা | রেজাল্ট |
| :--- | :--- | :--- |
| `Promise.all([p1, p2])` | সব প্রমিস সফল হতে হবে | ১টি রিজেক্ট হলেই পুরো প্রমিস ক্যাচ (Catch)-এ চলে যায় |
| `Promise.allSettled([p1, p2])` | সব প্রমিস শেষ হওয়া পর্যন্ত অপেক্ষা করে | রিজেক্ট হোক বা রিজলভ, সবার স্ট্যাটাস অবজেক্ট অ্যারে দেয় |
| `Promise.race([p1, p2])` | যেটি সবার আগে রেস জিতবে (Rejects or Resolves) | প্রথম দ্রুততম প্রমিাসের ফলাফল দেয় |
| `Promise.any([p1, p2])` | প্রথম যেটি **সফল** (Fulfilled) হবে | সব রিজেক্ট হলেই কেবল AggregateError দেয় |

---

# Module 5: ES6+ Modern JavaScript Mastery

### 5.1 Destructuring, Rest & Spread
- **Destructuring:** `{ name, age } = user`
- **Spread (`...`):** অ্যারে/অবজেক্টের ডাটা ছড়িয়ে দিয়ে কপি/মার্জ করা (Shallow Copy)।
- **Rest (`...args`):** একাধিক আর্গুমেন্টকে একটি অ্যারেতে গুটিয়ে নেওয়া।

---

### 5.2 Map, Set, WeakMap, WeakSet

- **Map:** যেকোনো ডাটা টাইপ (এমনকি Object/Function)-কে Key হিসেবে ব্যবহার করা যায়।
- **Set:** শুধুমাত্র ইউনিক মান (Unique values) ধরে রাখে।
- **WeakMap / WeakSet:** শুধুমাত্র Object-কে Key হিসেবে রাখে। এগুলো **Garbage Collection-friendly**, অর্থাৎ মূল অবজেক্ট ডিলেট হয়ে গেলে WeakMap থেকে স্বয়ংক্রিয়ভাবে মেমোরি ফ্রি হয়ে যায় (Memory Leak আটকায়)।

---

# Module 6: DOM, Event Bubbling, Delegation, Debounce & Throttle

### 6.1 Event Bubbling বনাম Event Capturing
- **Event Capturing (Trickling):** ইভেন্ট ওপরের Window থেকে নিচের টার্গেট নোডের দিকে নামতে থাকে (Top to Bottom)।
- **Event Bubbling:** ইভেন্ট টার্গেট নোড থেকে ওপরের Parent/Window-এর দিকে উঠতে থাকে (Bottom to Top)। ডিফল্টভাবে `addEventListener` বাবলিং ব্যবহার করে। `e.stopPropagation()` দিলে বাবলিং বন্ধ হয়।

---

### 6.2 Event Delegation (পারফরম্যান্স ট্রিক)
অসংখ্য চাইল্ড এলিমেন্টে আলাদা আলাদা ইভেন্ট লিসেনার না লাগিয়ে কমন প্যারেন্ট এলিমেন্টে ১টি মাত্র ইভেন্ট লিসেনার লাগানোকে **Event Delegation** বলে।

```javascript
// ১০০০ টি <li> তে লিসেনার না বানিয়ে <ul> এ ১টি লিসেনার
document.getElementById('parent-ul').addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'LI') {
    console.log('Clicked Item:', e.target.innerText);
  }
});
```

---

### 6.3 Debounce বনাম Throttle

- **Debouncing:** ব্যবহারকারীর অ্যাকশন থামার পর নির্দিষ্ট সময় অপেক্ষা করে একবার ফাংশন রান করে (যেমন: Search Bar Typeahead)।
- **Throttling:** দ্রুত অ্যাকশন চললেও নির্দিষ্ট সময় পর পর নিয়মিত বিরতিতে ফাংশন রান করে (যেমন: Window Resize, Scroll Event)।

---

# Module 7: Memory Management & V8 Engine Optimization

### 7.1 Garbage Collection (Mark-and-Sweep Algorithm)
V8 ইঞ্জিন মেমোরি থেকে অপ্রয়োজনীয় অবজেক্ট ডিলিট করার জন্য **Mark-and-Sweep Algorithm** ব্যবহার করে।
১. Root (Global Window) থেকে অ্যাক্সেসযোগ্য সব অবজেক্টকে "Reachable/Marked" বলে চিহ্নিত করা হয়।  
২. যেসব অবজেক্ট রুটের সাথে কানেক্টেড নয়, সেগুলোকে মেমোরি থেকে মুছে ফেলা হয় (Sweep)।

---

### 7.2 Memory Leaks-এর প্রধান কারণসমূহ
1. **Accidental Global Variables:** `function test() { age = 20; }` (`var/let` ছাড়া)
2. **Forgotten Timers / Intervals:** `setInterval` না ক্লিয়ার করা।
3. **Detached DOM Nodes:** জাভাস্ক্রিপ্ট ভ্যারিয়েবলে DOM এলিমেন্ট সেভ রেখে আসল DOM থেকে ডিলেট করে দেওয়া।
4. **Stale Closures:** আনইউজড ভ্যারিয়েবল ক্লোজারে আটকে থাকা।

---

# Module 8: Polyfills & Tricky Coding Scenarios

### Scenario 1: Custom Polyfill for `Array.prototype.map`

```javascript
Array.prototype.myMap = function(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    // `this` নির্দেশ করে মূল অ্যারেকে, in চেক করে ডিলিট করা ইনডেক্স স্কিপ করে
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

// পরীক্ষা:
const nums = [1, 2, 3];
console.log(nums.myMap(x => x * 2)); // [2, 4, 6]
```

---

### Scenario 2: Custom Polyfill for `Function.prototype.bind`

```javascript
Function.prototype.myBind = function(context, ...args1) {
  const originalFn = this;

  return function(...args2) {
    // call বা apply ব্যবহার করে মেথড রান করা
    return originalFn.apply(context, [...args1, ...args2]);
  };
};

// পরীক্ষা:
const user = { name: "Tushar" };
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const boundFn = greet.myBind(user, "Hello");
console.log(boundFn("!")); // "Hello, Tushar!"
```

---

### Scenario 3: Custom Debounce Implementation from Scratch

```javascript
function debounce(fn, delay) {
  let timerId;

  return function(...args) {
    const context = this;
    clearTimeout(timerId); // আগের টাইমার বাতিল করা

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```

---

# Module 9: Complete Level-by-Level Question Vault

### 🟢 Junior Level Questions & Answers

**Q1: `==` এবং `===`-এর পার্থক্য কী?**  
**উত্তর:** `==` (Abstract Equality) টাইপ কনভার্সন (Type Coercion) করে মান তুলনা করে। `===` (Strict Equality) টাইপ ও মান উভয়ই হুবহু তুলনা করে।

**Q2: `null` এবং `undefined`-এর পার্থক্য কী?**  
**উত্তর:** `undefined` মানে কোনো ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু মান অ্যাসাইন করা হয়নি। `null` মানে ডেভেলপারের স্পষ্ট ইচ্ছায় কোনো ভ্যারিয়েবলকে খালি (Empty object reference) রাখা হয়েছে।

---

### 🟡 Mid Level Questions & Answers

**Q1: Call, Apply এবং Bind-এর প্রধান পার্থক্য কী?**  
**উত্তর:** `call` এবং `apply` সাথে সাথে ফাংশন রান করে (call কমা দিয়ে আর্গুমেন্ট নেয়, apply অ্যারে হিসেবে নেয়)। `bind` সাথে সাথে রান না করে কাস্টম `this` বাইন্ডিং যুক্ত একটি নতুন ফাংশন রিটার্ন করে।

**Q2: Deep Copy বনাম Shallow Copy কীভাবে করবেন?**  
**উত্তর:** Shallow Copy (`Object.assign()`, `{...obj}`) শুধুমাত্র ১ম লেভেলের ফিল্ড কপি করে (নেস্টেড অবজেক্টের মেমোরি রেফারেন্স থেকে যায়)। Deep Copy করতে আধুনিক `structuredClone(obj)` অথবা `JSON.parse(JSON.stringify(obj))` ব্যবহার করা হয়।

---

### 🔴 Senior Level Questions & Answers

**Q1: MicroTask Queue এবং MacroTask Queue-এর প্রাধান্য কীভাবে নির্ধারিত হয়?**  
**উত্তর:** ইভেন্ট লুপ প্রতিবার কল স্ট্যাক খালি হলে প্রথমে MicroTask Queue-এর সব কাজ সম্পন্ন করে। MicroTask সম্পূর্ণ খালি হওয়ার পরই কেবল MacroTask Queue থেকে ১টি কাজ সম্পাদন করা হয়।

**Q2: V8 ইঞ্জিনের "Hidden Classes" / "Shapes" কী এবং কীভাবে এটি অপটিমাইজ করা যায়?**  
**উত্তর:** V8 ইঞ্জিন সমজাতীয় অবজেক্টগুলোর দ্রুত মেমোরি অফসেট রিডের জন্য অভ্যন্তরীণভাবে Hidden Class তৈরি করে। যদি অবজেক্টে ফিল্ড যোগ করার ক্রম (Property order) এলোমেলো করা হয় (যেমন `{a:1, b:2}` vs `{b:2, a:1}`), তবে V8 ইনলাইন ক্যাশিং অপটিমাইজেশন হারায় (de-optimization ঘটে)।

---

> **🎉 অভিনন্দন!** আপনি JavaScript-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন। নিয়মিত প্র্যাকটিস ও রিভিশন করুন!
