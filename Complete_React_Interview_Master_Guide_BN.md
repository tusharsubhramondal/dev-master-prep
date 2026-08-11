# Complete React Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা ও কোডসহ তৈরি করা হয়েছে যাতে যে কেউ (শিক্ষানবিস থেকে অভিজ্ঞ ডেভেলপার) সহজে React-এর প্রতিটি কনসেপ্টের **পর্দার পেছনের কার্যপ্রণালী (How it works behind the scenes)**, **কেন ব্যবহার করা হয়**, **কোড উদাহরণ** এবং **ইন্টারভিউ ট্রিকস** বুঝতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: JavaScript Prerequisites for React](#module-1-javascript-prerequisites-for-react)
2. [Module 2: React Fundamentals (Junior Level)](#module-2-react-fundamentals-junior-level)
3. [Module 3: Complete React Hooks Masterclass (All 14+ Hooks)](#module-3-complete-react-hooks-masterclass-all-14-hooks)
   - 3.1 State Hooks (`useState`, `useReducer`)
   - 3.2 Effect & Lifecycle Hooks (`useEffect`, `useLayoutEffect`, `useInsertionEffect`)
   - 3.3 Performance Optimization Hooks (`useMemo`, `useCallback`, `useTransition`, `useDeferredValue`)
   - 3.4 Ref & DOM Hooks (`useRef`, `useImperativeHandle`)
   - 3.5 Context & Store Hooks (`useContext`, `useSyncExternalStore`)
   - 3.6 Utility & React 19 Hooks (`useId`, `useDebugValue`, `useActionState`, `useFormStatus`, `useOptimistic`)
4. [Module 4: Component Architecture & State Management (Mid Level)](#module-4-component-architecture--state-management-mid-level)
5. [Module 5: React Fiber Architecture & System Design (Senior Level)](#module-5-react-fiber-architecture--system-design-senior-level)
6. [Module 6: Advanced Performance Tuning & Diagnostics](#module-6-advanced-performance-tuning--profiling)
7. [Module 7: Senior React Design Patterns](#module-7-senior-react-design-patterns)
8. [Module 8: Security & Testing Strategy](#module-8-security--testing-strategy)
9. [Module 9: Practical Machine Coding Scenarios](#module-9-practical-machine-coding-scenarios)
10. [Module 10: Level-by-Level Interview Question Vault](#module-10-level-by-level-interview-question-vault)

---

# Module 1: JavaScript Prerequisites for React

React-এ দক্ষ হতে হলে বিশুদ্ধ জাভাস্ক্রিপ্টের (Vanilla JS) কিছু মূল ভিত্তি জানা প্রয়োজন।

### 1.1 ES6+ Syntax (Arrow Function, Destructuring, Spread/Rest)
- **Arrow Function:** সংক্ষিপ্ত সিনট্যাক্স প্রদান করে এবং নিজস্ব `this` বাইন্ডিং তৈরি করে না।
- **Destructuring:** অবজেক্ট বা অ্যারে থেকে সহজে ডাটা এক্সট্র্যাক্ট করা।
  ```javascript
  const user = { name: 'Tushar', age: 25 };
  const { name, age } = user; // Destructuring
  ```
- **Spread Operator (`...`):** ইমিউটেবল উপায়ে অ্যারে বা অবজেক্ট কপি/মার্জ করতে ব্যবহৃত হয়।
  ```javascript
  const oldObj = { a: 1, b: 2 };
  const newObj = { ...oldObj, b: 3 }; // b-এর মান ২ বদলে ৩ হবে, কিন্তু মূল অবজেক্ট অক্ষত থাকবে
  ```

---

### 1.2 Array Methods (`map`, `filter`, `reduce`)
React-এ JSX-এর ভেতরে লুপ চালানোর জন্য `for` লুপ ব্যবহার করা যায় না। তাই ইমিউটেবল অ্যারে মেথড ব্যবহার করা হয়:
- `map()`: মূল অ্যারে পরিবর্তন না করে প্রতিটি আইটেমকে প্রসেস করে নতুন অ্যারে গঠন করে (JSX List Rendering-এ ব্যবহৃত)।
- `filter()`: নির্দিষ্ট শর্তে ডাটা ফিল্টার করে নতুন অ্যারে দেয়।
- `reduce()`: পুরো অ্যারে প্রসেস করে একটি একক মান (Single value) বা সংগৃহীত অবজেক্টে পরিণত করে।

---

### 1.3 Closures & Lexical Scope
**Closure কী?**  
যখন একটি Inner Function তার Outer Function-এর স্কোপ বা ভ্যারিয়েবল মনে রাখে (এমনকি Outer Function-এর এক্সিকিউশন শেষ হয়ে যাওয়ার পরেও), তাকে Closure বলে।  
*React-এ গুরুত্ব:* React Hooks (যেমন: `useEffect`, `useState`) সম্পূর্ণ Closure-এর ওপর নির্ভর করে কাজ করে।

---

### 1.4 Asynchronous JS & Promises
React-এ এপিআই কল করার জন্য `async/await` এবং `Promise` বোঝা জরুরি। Event Loop কীভাবে ম্যাক্রোটাস্ক (MacroTask) এবং মাইক্রোটাস্ক (MicroTask) চালায় তা জানা জরুরি।

---

# Module 2: React Fundamentals (Junior Level)

### 2.1 React কী এবং এটি Declarative কেন?

**Imperative vs Declarative:**
- **Imperative (Vanilla JS):** আপনি ব্রাউজারকে ধাপে ধাপে নির্দেশ দেন *কীভাবে* DOM পরিবর্তন করতে হবে। (যেমন: `document.getElementById('btn').innerText = 'Clicked'`)
- **Declarative (React):** আপনি কেবল বলে দেন *UI-এর অবস্থা (State) কী হওয়া উচিত*। React নিজেই পর্দার পেছনে DOM আপডেট করে নেয়।

---

### 2.2 Virtual DOM এবং Reconciliation (Diffing Algorithm)

**পর্দার পেছনের রহস্য (Behind the Scenes):**
1. **Virtual DOM:** React মেমোরিতে পুরো আসল DOM-এর একটি হালকা জাভাস্ক্রিপ্ট অবজেক্ট রিপ্রেজেন্টেশন তৈরি করে রাখে।
2. **State/Props পরিবর্তন:** কম্পোনেন্টে কোনো পরিবর্তন আসলে React একটি নতুন Virtual DOM তৈরি করে।
3. **Diffing Algorithm:** React পুরানো Virtual DOM এবং নতুন Virtual DOM-এর মধ্যে তুলনা করে (Diffing) পরিবর্তনগুলো বের করে। এটি O(n³) জটিলতাকে O(n)-এ নামিয়ে আনে।
4. **Reconciliation:** শুধুমাত্র যে অংশটুকু পরিবর্তিত হয়েছে, React কেবল সেই অংশটি আসল ব্রাউজার DOM-এ আপডেট করে (Batch DOM update)।

---

### 2.3 JSX কী এবং Babel কীভাবে কাজ করে?

JSX কোনো HTML নয়, এটি জাভাস্ক্রিপ্টের এক্সটেনশন।
```jsx
// ডেভেলপার যা লেখে:
<div className="card">
  <h1>Hello World</h1>
</div>
```
**Babel Transpiler** একে নিচের ফাংশনে পরিণত করে:
```javascript
React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h1', null, 'Hello World')
);
```

---

### 2.4 Props বনাম State (গভীর ব্যাখ্যা)

| বৈচিত্র্য | Props | State |
| :--- | :--- | :--- |
| **সংজ্ঞা** | Parent থেকে Child-এ আসা প্রপার্টি | Component-এর নিজস্ব অভ্যন্তরীণ ডাটা |
| **Mutability** | **Immutable** (পরিবর্তন করা যায় না) | **Mutable** (`setState` দিয়ে পরিবর্তনযোগ্য) |
| **নিয়ন্ত্রণ** | Parent Component দ্বারা নিয়ন্ত্রিত | কম্পোনেন্ট নিজে নিয়ন্ত্রণ করে |
| **রেন্ডারিং** | Props পাল্টালে Child রিরেন্ডার হয় | State পাল্টালে Component ও তার চাইল্ড রিরেন্ডার হয় |

---

### 2.5 List Rendering এবং `key` Prop-এর মেকানিজম

**কেন `key` দরকার?**  
React যখন অ্যারের আইটেম রেন্ডার করে, তখন তালিকায় কোনো আইটেম যুক্ত, বিয়োগ বা সর্ট হলে React `key` দেখে বুঝতে পারে কোন আইটেমটি ঠিক আগের মতোই আছে আর কোনটি পরিবর্তিত হয়েছে।

**কেন Index কে Key দেওয়া বিপজ্জনক?**
```jsx
// ❌ বিপজ্জনক উদাহরণ
{list.map((item, index) => (
  <ListItem key={index} data={item} />
))}
```
যদি আপনি তালিকার শুরুতে একটি নতুন আইটেম ঢোকান, তবে সব আইটেমের Index ১ ঘর করে পিছিয়ে যাবে। React মনে করবে সব আইটেমই বদলে গেছে এবং পুরো তালিকা ভুলভাবে রিরেন্ডার করবে বা ইনপুট ফোকাস হারিয়ে যাবে।

---

### 2.6 Controlled vs Uncontrolled Components (বিস্তারিত কোডসহ)

#### 1. Controlled Component (React State দ্বারা পরিচালিত)
ইনপুটের প্রতি অক্ষরের পরিবর্তন React State-এ সেভ হয়। Form Validation এবং Real-time Feedback-এর জন্য এটি সেরা।

```jsx
import { useState } from 'react';

function ControlledForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Email:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // State আপডেট
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 2. Uncontrolled Component (DOM Ref দ্বারা পরিচালিত)
ইনপুটের ডাটা ব্রাউজারের DOM নিজেই ধরে রাখে। রি-রেন্ডার কম হয় এবং ফাইল আপলোডের মতো কাজের জন্য এটি উপযোগী।

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // সরাসরি DOM নোড থেকে ভ্যালু নেওয়া
    console.log('Input Value:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

# Module 3: Complete React Hooks Masterclass (All 14+ Hooks)

React Hooks হলো বিশেষ কিছু জাভাস্ক্রিপ্ট ফাংশন যা Functional Component-কে State এবং Lifecycle ফিচারের সাথে যুক্ত করে।

---

## 3.1 State Hooks

### A. `useState` (গভীর আলোচনা)

`useState` একটি অ্যারে রিটার্ন করে: `[currentValue, updateFunction]`।

#### ১. Lazy Initial State (পারফরম্যান্স অপটিমাইজেশন):
যদি ইনিশিয়াল স্টেট পাওয়ার জন্য কোনো ভারী হিসেব বা LocalStorage রিড করতে হয়, তবে স্টেট ইনিশিয়ালাইজেশনে সরাসরি মান না দিয়ে **ফাংশন** দিন:
```jsx
// ❌ ভুল: প্রতি রেন্ডারেই LocalStorage রিড করবে
const [data, setData] = useState(localStorage.getItem('data'));

// ✅ সঠিক (Lazy Initialization): শুধু প্রথম রেন্ডারেই একবার চলবে
const [data, setData] = useState(() => localStorage.getItem('data'));
```

#### ২. Functional Updates (Stale State সমাধান):
পূর্ববর্তী স্টেটের ওপর নির্ভর করে নতুন স্টেট সেট করার সময় সবসময় Callback ফাংশন ব্যবহার করবেন:
```jsx
// ❌ যদি ৩ বার কল করেন, মান মাত্র ১ বাড়বে (Stale closure-এর জন্য)
setCount(count + 1);
setCount(count + 1);

// ✅ মান ৩ বাড়বে (নিরাপদ উপায়)
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

#### ৩. Automatic Batching (React 18+):
React 18-এ asynchronous ফ্লোতেও (যেমন: `setTimeout`, `fetch`) একাধিক স্টেট আপডেটকে মাত্র একটি মাত্র Re-render-এ ব্যাচ করা হয়।

---

### B. `useReducer`

যখন কম্পোনেন্টে একাধিক স্টেট থাকে এবং একটি স্টেট পরিবর্তনের ফলে আরেকটি স্টেট প্রভাবিত হয়, তখন `useReducer` আদর্শ।

**কোড উদাহরণ (Fetch State Machine):**
```jsx
import { useReducer } from 'react';

const initialState = { data: null, loading: false, error: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function DataFetcher() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return <button onClick={fetchData}>Fetch</button>;
}
```

---

## 3.2 Effect & Lifecycle Hooks

### A. `useEffect` (খুটিনাটি বিষয়)

`useEffect` কম্পোনেন্ট রেন্ডার হওয়ার **পর** স্ক্রিনে UI দেখানোর শেষে চলে।

#### Dependency Array-এর ৩টি রূপ:
1. `useEffect(() => {})`: কোনো ডিপেন্ডেন্সি নেই -> **প্রতিটি রেন্ডারে চলবে**।
2. `useEffect(() => {}, [])`: ফাঁকা ডিপেন্ডেন্সি -> **শুধু মাউন্ট (Mount) হওয়ার সময় ১ বার চলবে**।
3. `useEffect(() => {}, [a, b])`: নির্দিষ্ট ভ্যারিয়েবল -> **মাউন্টে এবং a বা b পরিবর্তন হলেই চলবে**।

#### Cleanup Function এবং AbortController:
মেমোরি লিক ও Race Condition এড়াতে Cleanup ফাংশন অপরিহার্য।

```jsx
import { useState, useEffect } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // ১. AbortController তৈরি
    const controller = new AbortController();

    async function search() {
      try {
        const res = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal // সেশন ট্র্যাক করা
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }

    if (query) search();

    // ২. Cleanup Function: নতুন query আসলে বা Unmount হলে আগের কুরি বাতিল হবে
    return () => controller.abort();
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

---

### B. `useLayoutEffect`

- **`useEffect`:** Asynchronous (স্ক্রিন পেন্ট হওয়ার **পর** চলে — ব্যবহারকারী কোনো ফ্লেকার অনুভব করে না)।
- **`useLayoutEffect`:** Synchronous (DOM পরিমার্জনের পর কিন্তু ব্রাউজার স্ক্রিনে পেন্ট করার **পূর্বে** চলে)।

**কখন ব্যবহার করবেন?**  
কোনো DOM উপাদান মেপে (getBoundingClientRect) স্ক্রিনে দেখানোর আগে সেটির পজিশন বা সাইজ ঠিক করার জন্য যাতে স্ক্রিনে UI Flickering না হয়।

---

### C. `useInsertionEffect`

React 18-এ আসা এই Hook-টি CSS-in-JS (Styled-components, Emotion) লাইব্রেরির জন্য ডাইনামিক স্টাইল ডমে ইনজেক্ট করার জন্য ব্যবহৃত হয়, যাতে Layout calculation-এর আগে স্টাইল প্রস্তুত থাকে।

---

## 3.3 Performance Optimization Hooks

### A. `useMemo`

ব্যয়বহুল হিসেব (Expensive Computation)-এর ফলাফল মেমোরাইজ করে রাখতে ব্যবহৃত হয়।

```jsx
import { useState, useMemo } from 'react';

function ProductList({ products, category }) {
  // বড় অ্যারে ফিল্টারিং যা শুধু products বা category পাল্টালেই পুনর্গণনা হবে
  const filteredProducts = useMemo(() => {
    console.log('Heavy Calculation Running...');
    return products.filter(p => p.category === category);
  }, [products, category]);

  return <div>Filtered Count: {filteredProducts.length}</div>;
}
```

---

### B. `useCallback`

ফাংশনের অবজেক্ট রেফারেন্স মেমোরাইজ করে রাখে।

**কেন দরকার?**  
React-এ প্রতিবার রেন্ডারে নতুন ফাংশন রেফারেন্স তৈরি হয়। আপনি যদি Child Component-কে `React.memo` দিয়ে থাকেন এবং তাকে প্রপস হিসেবে কোনো ফাংশন পাস করেন, তবে `useCallback` ছাড়া `React.memo` কাজ করবে না (কারণ প্রপসের ফাংশন রেফারেন্স নতুন মনে করবে)।

```jsx
import { useState, useCallback, memo } from 'react';

// Child
const ChildButton = memo(({ onClick }) => {
  console.log('Child Rendered');
  return <button onClick={onClick}>Child Click</button>;
});

// Parent
function Parent() {
  const [count, setCount] = useState(0);

  // useCallback থাকায় handleChildClick-এর রেফারেন্স একই থাকবে
  const handleChildClick = useCallback(() => {
    console.log('Clicked from Child');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent Count: {count}</button>
      <ChildButton onClick={handleChildClick} />
    </div>
  );
}
```

---

### C. `useTransition` (React 18 Concurrent Rendering)

`useTransition` আপনাকে কোনো স্টেট আপডেটকে **Non-urgent (কম গুরুত্বপূর্ন)** হিসেবে চিহ্নিত করার সুবিধা দেয়।

```jsx
import { useState, useTransition } from 'react';

function FilterList({ items }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // 1. Urgent: টাইপিং সাথে সাথে ইনপুটে দেখাবে

    // 2. Non-urgent: ১০,০০০ আইটেমের ফিল্টারিং ব্যাকগ্রাউন্ডে হবে, UI ফ্রিজ হবে না
    startTransition(() => {
      setFiltered(items.filter(item => item.includes(value)));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleInputChange} />
      {isPending && <p>Filtering List...</p>}
      <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}
```

---

### D. `useDeferredValue` (React 18)

কোনো স্টেট মানকে পিছিয়ে (Defer) দিয়ে রেন্ডারিং মসৃণ করে। এটি Debounce-এর মতো কাজ করে কিন্তু কোনো নির্দিষ্ট টাইম-আউট লাগে না, React ফাঁকা সময়ে এটি আপডেট করে।

---

## 3.4 Ref & DOM Hooks

### A. `useRef`

`useRef` একটি অবজেক্ট দেয় `{ current: value }` যা পুরো কম্পোনেন্ট লাইফসাইকেলে একই রেফারেন্স বজায় রাখে।

**২টি প্রধান কাজ:**
1. **DOM Node ধরা:** `inputRef.current.focus()`
2. **Mutable State রাখা (Re-render মুক্ত):** টাইমার আইডি স্টোর করা, বা আগের স্টেট মনে রাখা।

```jsx
import { useState, useRef, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null); // Re-render মুক্ত রেফারেন্স

  const startTimer = () => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

---

### B. `useImperativeHandle`

`forwardRef`-এর সাথে চাইল্ডের নিজস্ব মেথড প্যারেন্টে এক্সপোজ করার জন্য।

```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus(),
    clearInput: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} />;
});

// Parent
function Parent() {
  const inputRef = useRef();
  return (
    <>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focusInput()}>Focus</button>
    </>
  );
}
```

---

## 3.5 Context & Store Hooks

### A. `useContext`
Prop Drilling এড়িয়ে অ্যাপের গভীরতম স্থানে থাকা কম্পোনেন্টে ডাটা পৌঁছাতে ব্যবহৃত হয়।

### B. `useSyncExternalStore` (React 18)
React-এর বাইরের যেকোনো থার্ড-পার্টি স্টোর (Redux, Zustand, `window.navigator.onLine` বা Custom Store)-এর ডাটা Concurrent React-এ Tearing (UI-এর অসামঞ্জস্যতা) ছাড়া সিঙ্ক করতে এই হুক ব্যবহৃত হয়।

---

## 3.6 Utility & React 19 Hooks

- **`useId`:** SSR এবং Client-Side Hydration mismatch রোধ করতে অনন্য ID তৈরি করে।
- **`useDebugValue`:** React DevTools-এ কাস্টম হুকের লেবেল দেখায়।
- **React 19 Hooks:**
  - `useActionState`: Server Actions-এর রেসপন্স ও পেন্ডিং স্টেট হ্যান্ডেল করতে।
  - `useFormStatus`: ফর্মে সাবমিট বা লোডিং স্ট্যাটাস পাওয়ার জন্য।
  - `useOptimistic`: সার্ভার রেসপন্সের আগেই দ্রুত UI তে ফলাফল দেখানোর জন্য (Optimistic UI updates)।

---

# Module 4: Component Architecture & State Management (Mid Level)

### 4.1 Component Communication Strategies

1. **Parent → Child:** Props-এর মাধ্যমে।
2. **Child → Parent:** Callback Functions (Props হিসেবে পাঠিয়ে)।
3. **Sibling → Sibling:** **Lifting State Up** — কমন প্যারেন্ট কম্পোনেন্টে স্টেট নিয়ে গিয়ে দুই ভাইয়ের মধ্যে শেয়ার করা।
4. **Deep Component Tree:** Context API বা Global State Management।

---

### 4.2 Large-Scale State Architecture

একজন অভিজ্ঞ ডেভেলপার অ্যাপের স্টেটকে ৩টি লেয়ারে ভাগ করেন:

```
                  ┌────────────────────────┐
                  │      React App         │
                  └───────────┬────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      ▼                       ▼                       ▼
┌───────────┐           ┌───────────┐           ┌───────────┐
│ Local State│          │Global UI  │           │Server State│
│(useState) │           │ (Zustand) │           │(React Query│
└───────────┘           └───────────┘           └───────────┘
```

1. **Local/Form State:** `useState`, `useReducer`
2. **Global Shared UI State:** `Zustand` বা `Redux Toolkit` (Theme, Auth Session)
3. **Server Data State:** `TanStack Query (React Query)` বা `SWR` (API Caching, Invalidation, Automatic Refetching)

---

### 4.3 Error Boundaries & Portals

- **Error Boundary:** `componentDidCatch` বা `getDerivedStateFromError` সম্বলিত Class Component যা জাভাস্ক্রিপ্ট এরর ক্যাচ করে সুন্দর Fallback UI দেখায়।
- **React Portals:** `ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))` দিয়ে DOM ট্রির মূল কম্পোনেন্ট হায়ারার্কির বাইরে (যেমন `document.body`) ডায়ালগ বা টুলটিপ রেন্ডার করা।

---

# Module 5: React Fiber Architecture & System Design (Senior Level)

### 5.1 React Fiber Engine কী?

React 16-এর আগের **Stack Reconciler** ছিল Synchronous — বড় রেন্ডার শুরু হলে ব্রাউজার থ্রেড ব্লক হয়ে ইউজার ইনপুট বা এনিমেশন আটকে যেত (Jank)।

**React Fiber (React 16+ Engine):**
Fiber হলো একটি আসিনক্রোনাস রেন্ডারিং ইঞ্জিন। এটি রেন্ডারিং কাজকে ছোট ছোট **Fiber Node** ইউনিটে ভাগ করে। এটি ব্রাউজার আইডিয়াল টাইমে (`requestIdleCallback`) কাজ সম্পন্ন করে এবং ইউজার ইনপুট (যেমন টাইপিং বা মাউস ক্লিক)-কে সর্বোচ্চ অগ্রাধিকার (Priority) দিয়ে রেন্ডার থামিয়ে (Pause/Abort) আগের কাজ সম্পন্ন করে।

---

### 5.2 Render Phase vs Commit Phase

```
         [ State Update Triggered ]
                     │
                     ▼
  ┌──────────────────────────────────────┐
  │ Render Phase (Asynchronous)          │ ─── (Interruptible, Work can be paused)
  │ - Fiber Tree Work                    │
  │ - Virtual DOM Diffing                │
  └──────────────────┬───────────────────┘
                     │
                     ▼
  ┌──────────────────────────────────────┐
  │ Commit Phase (Synchronous)           │ ─── (Non-interruptible, Side-effects run)
  │ - Actual DOM Mutations               │
  │ - useEffect / useLayoutEffect Runs   │
  └──────────────────────────────────────┘
```

---

### 5.3 React Server Components (RSC) vs Client Components

| ফিচার | React Server Component (RSC) | Client Component (`'use client'`) |
| :--- | :--- | :--- |
| **কোথায় এক্সিকিউট হয়?** | শুধুমাত্র সার্ভারে | সার্ভার (SSR) ও ব্রাউজারে |
| **Client Bundle Size** | 0 KB (কোনো কোড ক্লায়েন্টে যায় না) | ক্লায়েন্ট বান্ডেলে যোগ হয় |
| **State & Hooks** | `useState`, `useEffect` ব্যবহার করা নিষেধ | সব Hooks ও State চলে |
| **Data Access** | সরাসরি DB, File system, Async/Await | API Endpoint / Fetch এর মাধ্যমে |

---

# Module 6: Advanced Performance Tuning & Diagnostics

### 6.1 Profiling with React DevTools
- **Flamegraph Chart:** কোন কম্পোনেন্ট কত মিলি-সেকেন্ড সময় নিয়েছে রেন্ডার হতে।
- **Ranked Chart:** অর্ডার অনুযায়ী সবচেয়ে স্লো কম্পোনেন্টগুলো বের করা।
- **Why did this render?:** `React DevTools` সেটিংসে গিয়ে "Highlight updates when components render" চালু করে অনাবশ্যক রেন্ডার চিহ্নিত করা।

### 6.2 Code Splitting & Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const HeavyDashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Dashboard লোড হচ্ছে...</div>}>
      <HeavyDashboard />
    </Suspense>
  );
}
```

### 6.3 List Virtualization (Windowing)
১০,০০০ আইটেমের বিশাল লিস্টে ১০,০০০ DOM এলিমেন্ট বানালে ব্রাউজার হ্যাং করবে। `react-window` বা `react-virtualized` দিয়ে শুধুমাত্র স্ক্রিনে দৃশ্যমান ২০-৩০টি আইটেম DOM-এ রেখে স্ক্রলিং সিঙ্ক করা হয়।

---

# Module 7: Senior React Design Patterns

### 7.1 Compound Components Pattern
কম্পোনেন্টগুলো নিজেদের ভেতর স্টেট শেয়ার করে এবং ইউজারকে সুন্দর ও ফ্লেক্সিবল JSX সিনট্যাক্স দেয়।

```jsx
//Accordion System Design Example
<Accordion>
  <Accordion.Item id="item1">
    <Accordion.Header>Section 1 Title</Accordion.Header>
    <Accordion.Content>Section 1 Content Body</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### 7.2 Custom Hooks Pattern
UI প্রেজেন্টেশন লেয়ার থেকে সমস্ত বিজনেস লজিক, স্টেট ও এপিআই কল কাস্টম হুকে আলাদা করে ফেলা।

### 7.3 Control Props Pattern
একটি কম্পোনেন্ট ডিফল্টভাবে Uncontrolled থাকবে কিন্তু যদি বাইরে থেকে Controlled Props পাস করা হয় তবে সেটি প্যারেন্টের প্রপস দ্বারা পরিচালিত হবে।

---

# Module 8: Security & Testing Strategy

### 8.1 React Security
- **XSS Protection:** React JSX ডিফল্টভাবে সব স্ট্রিং এস্কেপ করে সংবেদনশীল ডাটা সেফ রাখে।
- **`dangerouslySetInnerHTML` Safety:** যদি কোনো থার্ড-পার্টি HTML ডমে বসাতে হয়, তবে অবশ্যই `DOMPurify.sanitize(dirtyHtml)` ব্যবহার করতে হবে।

### 8.2 Testing Strategy
- **React Testing Library (RTL):** "Test component implementation details (state, internal methods) না করে user interaction টেস্ট করা।"
- **MSW (Mock Service Worker):** নেটওয়ার্ক লেভেলে API কল ইন্টারসেপ্ট করে নির্ভুল টেস্ট করা।

---

# Module 9: Practical Machine Coding Scenarios

### Scenario 1: Race-condition-free Debounced Search Bar with AbortController

```jsx
import { useState, useEffect } from 'react';

export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    // Debounce: ৩০০ms অপেক্ষা করা টাইপিং থামার জন্য
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    // Cleanup: টাইপিং চালিয়ে গেলে বা Unmount হলে আগের কুরি ক্যানসেল হবে
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="খুঁজুন..."
      />
      {loading && <p>খোঁজা হচ্ছে...</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

# Module 10: Level-by-Level Interview Question Vault

### 🟢 Junior Level Questions & Answers

**Q1: Parent-এর স্টেট পরিবর্তন হলে Child কম্পোনেন্ট কি রিরেন্ডার হবে?**  
**উত্তর:** হ্যাঁ, বাই ডিফল্ট Parent রিরেন্ডার হলে তার সব Child কম্পোনেন্ট রিরেন্ডার হয়, যতক্ষণ না Child-কে `React.memo` দিয়ে আটকানো হয়।

**Q2: `useEffect`-এর ডিপেন্ডেন্সি অ্যারে ফাঁকা `[]` দিলে কী হয়?**  
**উত্তর:** এটি শুধুমাত্র কম্পোনেন্ট Mount হওয়ার সময় একবারই চলবে।

---

### 🟡 Mid Level Questions & Answers

**Q1: Stale Closure কী এবং এটি কীভাবে সমাধান করা যায়?**  
**উত্তর:** যখন কোনো ইফেক্ট বা ইভেন্ট হ্যান্ডলার পুরোনো রেন্ডারের স্টেট ভ্যালু মনে রেখে আটকে রাখে, তাকে Stale Closure বলে। সমাধান: Dependency Array সঠিক দেওয়া অথবা `setState(prev => prev + 1)` ফরম্যাট ব্যবহার করা।

**Q2: `React.memo` কেন সব কম্পোনেন্টে ব্যবহার করা উচিত নয়?**  
**উত্তর:** `React.memo` প্রপসের Shallow Comparison করতে বাড়তি মেমোরি ও সিপিইউ খরচ করে। প্রপস যদি প্রতি রেন্ডারে আসলেই বদলায়, তবে মেমোরাইজেশন উল্টো পারফরম্যান্স খারাপ করে।

---

### 🔴 Senior Level Questions & Answers

**Q1: Tearing কী এবং React 18 এটি কীভাবে সমাধান করে?**  
**উত্তর:** Concurrent Rendering-এ ব্রাউজার রেন্ডার মাঝপথে থামিয়ে দিলে ভিজ্যুয়াল UI ও এক্সটার্নাল স্টোরের ডাটার মধ্যে অসামঞ্জস্যতা দেখা দিতে পারে, যাকে Tearing বলে। সমাধান: `useSyncExternalStore` হুক।

**Q2: SSR (Server-side rendering) এবং Hydration Mismatch কী?**  
**উত্তর:** সার্ভারে জেনারেট হওয়া HTML যখন ব্রাউজারে এসে React ইভেন্ট ও স্টেটের সাথে কানেক্ট হয়, তাকে Hydration বলে। সার্ভারের ডম আর ক্লায়েন্টের প্রথম রেন্ডারের ডম অমিল হলে (যেমন `Math.random()` বা Time ব্যবহার করলে) Hydration Mismatch এরর আসে।

---

> **🎉 অভিনন্দন!** আপনি একটি সম্পূর্ণ, বিস্তারিত ও প্র্যাকটিক্যাল **React Master Guide Handbook** অর্জন করেছেন। ফাইলটি নিয়ে নিয়মিত রিভিশন ও প্র্যাকটিস করুন!
