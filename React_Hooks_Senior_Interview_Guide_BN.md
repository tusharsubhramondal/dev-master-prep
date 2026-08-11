# React Hooks — Senior Developer Interview Guide (বাংলা সংকলন)

এই গাইডটি **Senior React Developer Interview**-এর জন্য বিশেষভাবে তৈরি করা হয়েছে। এতে React-এর প্রতিটি Hook-এর গভীর ধারণা (Deep-dive Concept), ব্যবহারের সঠিক নিয়ম (Best Practices), কোড উদাহরণ (Code Examples) এবং সিনিয়র ইন্টারভিউ সম্পর্কিত বিভিন্ন ট্রিকি প্রশ্নের উত্তর দেওয়া হয়েছে।

---

## সূচিপত্র (Table of Contents)

1. [State Hooks](#1-state-hooks)
   - `useState`
   - `useReducer`
2. [Effect & Lifecycle Hooks](#2-effect--lifecycle-hooks)
   - `useEffect`
   - `useLayoutEffect`
   - `useInsertionEffect`
3. [Performance Optimization Hooks](#3-performance-optimization-hooks)
   - `useMemo`
   - `useCallback`
   - `useTransition`
   - `useDeferredValue`
4. [Ref & DOM Hooks](#4-ref--dom-hooks)
   - `useRef`
   - `useImperativeHandle`
5. [Context & External Store Hooks](#5-context--external-store-hooks)
   - `useContext`
   - `useSyncExternalStore`
6. [Utility Hooks & React 19 Hooks](#6-utility-hooks--react-19-hooks)
   - `useId`
   - `useDebugValue`
   - React 19 Quick Overview (`useActionState`, `useFormStatus`, `useOptimistic`)
7. [Custom Hooks Best Practices](#7-custom-hooks-best-practices)
8. [Senior Level Interview Tricky Questions](#8-senior-level-interview-tricky-questions)

---

## 1. State Hooks

### A. `useState`

**সংজ্ঞা (Definition):**
`useState` হলো React-এর সবচেয়ে মৌলিক Hook যা ফাংশনাল কম্পোনেন্টে লোকাল স্টেট (Local State) তৈরি এবং পরিচালনা করতে সাহায্য করে।

**গভীর ধারণা (Senior Concept):**
- **Lazy Initial State:** যদি ইনিশিয়াল স্টেট গণনা করা ব্যয়বহুল (Expensive Computation) হয়, তবে ফাংশন পাস করতে হয়: `useState(() => expensiveCalculation())`।
- **Functional Updates:** পূর্ববর্তী স্টেটের ওপর নির্ভর করে স্টেট পরিবর্তন করতে `setState(prev => prev + 1)` ফরম্যাট ব্যবহার করতে হয় (Stale State সমস্যা এড়াতে)।
- **Automatic Batching (React 18):** React 18-এ asynchronous ফ্লো (যেমন `setTimeout`, `fetch` বা event handler)-এর মধ্যেও একাধিক State Update-কে একটি মাত্র re-render-এ ব্যাচ করা হয়।

**কোড উদাহরণ (Code Example):**
```jsx
import { useState } from 'react';

function Counter() {
  // Lazy initialization (শুধু প্রথম রেন্ডারে চলবে)
  const [count, setCount] = useState(() => {
    return calculateInitialCount();
  });

  const handleIncrement = () => {
    // Functional update — নিরাপদ উপায়ে স্টেট আপডেট
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // মান ২টি বাড়বে
  };

  return <button onClick={handleIncrement}>Count: {count}</button>;
}
```

---

### B. `useReducer`

**সংজ্ঞা (Definition):**
যখন স্টেট লজিক অনেক জটিল হয় এবং একাধিক সাব-স্টেট একে অপরের ওপর নির্ভর করে, তখন `useState`-এর বিকল্প হিসেবে `useReducer` ব্যবহার করা হয়। এটি Redux-এর রিডিউসার প্যাটার্ন মেনে চলে।

**Senior Concept / কখন এটি ব্যবহার করবেন?**
- যখন স্টেট লজিকে জটিল শর্ত (Conditional Logic) থাকে।
- যখন একাধিক স্টেট একসাথে পরিবর্তিত হয়।
- যখন নেস্টেড অবজেক্ট বা অ্যারে আপডেট করার প্রয়োজন পড়ে।
- পারফরম্যান্স অপটিমাইজেশনের জন্য (কারণ `dispatch` ফাংশনের রেফারেন্স সবসময় স্থির থাকে, তাই `useCallback` ছাড়াই রি-রেন্ডার কমানো যায়)।

**কোড উদাহরণ (Code Example):**
```jsx
import { useReducer } from 'react';

const initialState = { count: 0, loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESET':
      return initialState;
    default:
      throw new Error('অজানা Action Type');
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

---

## 2. Effect & Lifecycle Hooks

### A. `useEffect`

**সংজ্ঞা (Definition):**
ফাংশনাল কম্পোনেন্টে সাইড ইফেক্ট (Side-effects) যেমন: Data Fetching, DOM Mutation, Subscriptions, Timers ইত্যাদি চালানোর জন্য `useEffect` ব্যবহৃত হয়।

**Senior Concept & Pitfalls:**
1. **Dependency Array Rules:** ডিপেন্ডেন্সি অ্যারেতে সবসময় ব্যবহৃত সমস্ত reactive variables রাখা বাধ্যতামূলক।
2. **Cleanup Function:** মেমোরি লিক (Memory Leak) এড়াতে ইভেন্ট লিসেনার, টাইমার বা সকেট কানেকশন বন্ধের জন্য ক্লিনআপ ফাংশন রিটার্ন করতে হয়।
3. **Race Conditions & AbortController:** এপিআই কল করার সময় দ্রুত পেজিনেশন বা সার্চ করলে পূর্ববর্তী রিকোয়েস্ট ক্যানসেল করতে `AbortController` ব্যবহার করা জ্যেষ্ঠ ডেভেলপারদের সেরা চর্চা।

**কোড উদাহরণ (Race Condition Handling):**
```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // AbortController তৈরি
    const controller = new AbortController();

    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${userId}`, { signal: controller.signal });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }

    fetchUser();

    // Cleanup: নতুন userId আসলে বা unmount হলে পুরোনো রিকোয়েস্ট বাতিল হবে
    return () => controller.abort();
  }, [userId]);

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```

---

### B. `useLayoutEffect`

**সংজ্ঞা (Definition):**
`useEffect`-এর মতোই কাজ করে, কিন্তু এটি **Synchronous**-ভাবে DOM পরিবর্তনের পর এবং ব্রাউজারের স্ক্রিনে পেন্ট (Screen Paint) করার **পূর্বে** চলে।

**Senior Difference: `useEffect` vs `useLayoutEffect`**
- `useEffect`: Asynchronous (স্ক্রিনে UI দেখানোর পর চলে — ব্যবহারকারী কোনো ফ্লেকার অনুভব করে না)।
- `useLayoutEffect`: Synchronous (স্ক্রিন পেন্ট হওয়ার ঠিক আগে ব্রাউজার থামিয়ে রান করে)। DOM উপাদান মাপার (Measurement) জন্য বা কোনো এলিমেন্টের পজিশনিং ঠিক করতে এটি ব্যবহৃত হয় যেন স্ক্রিনে Flickering না হয়।

**কোড উদাহরণ (DOM Layout Measure):**
```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const [height, setHeight] = useState(0);
  const divRef = useRef();

  useLayoutEffect(() => {
    // স্ক্রিনে দেখানোর আগেই উচ্চতা মেপে স্টেট সেট করা
    setHeight(divRef.current.getBoundingClientRect().height);
  }, []);

  return <div ref={divRef}>Tooltip Height: {height}px</div>;
}
```

---

### C. `useInsertionEffect`

**সংজ্ঞা (Definition):**
React 18-এ আনা একটি অ্যাডভান্সড Hook যা CSS-in-JS লাইব্রেরি (যেমন Styled-components, Emotion)-এর জন্য ডিজাইন করা হয়েছে। এটি DOM Mutation-এরও **পূর্বে** ইনজেক্ট হয়, যেন ডাইনামিক স্টাইল ডমে ঢোকার সময় রি-ফ্লো (Reflow) না ঘটে।

---

## 3. Performance Optimization Hooks

### A. `useMemo`

**সংজ্ঞা (Definition):**
কোনো জটিল/ব্যয়বহুল গণনা (Expensive Calculation)-এর ফলাফলকে মেমোরাইজ (Cache) করে রাখার জন্য `useMemo` ব্যবহৃত হয়, যেন অপ্রয়োজনীয় রি-রেন্ডারে একই গণনা বারবার না করতে হয়।

**Senior Concept (কখন ব্যবহার করবেন না?):**
সব সাধারণ গাণিতিক হিসাবে `useMemo` ব্যবহার করলে সুবিধার চেয়ে অপটিমাইজেশনের মেমোরি খরচ বেশি হয় (Premature Optimization)। শুধুমাত্র বড় অ্যারে ফিল্টারিং, সর্টিং বা বড় ক্যালকুলেশনে এটি দরকার।

**কোড উদাহরণ (Code Example):**
```jsx
import { useState, useMemo } from 'react';

function ProductList({ products, search }) {
  // বড় অ্যারে ফিল্টারিং যা শুধু products বা search পাল্টালে রান করবে
  const filteredProducts = useMemo(() => {
    console.log('Heavy Filtering Running...');
    return products.filter(p => p.name.includes(search));
  }, [products, search]);

  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

---

### B. `useCallback`

**সংজ্ঞা (Definition):**
ফাংশনের ইনস্ট্যান্স (Function Instance)-কে মেমোরাইজ করে রাখার জন্য `useCallback` ব্যবহৃত হয়।

**Senior Concept:**
React-এ প্রতিবার কম্পোনেন্ট রি-রেন্ডার হলে নতুন ফাংশন রেফারেন্স তৈরি হয়। আপনি যদি Child Component-কে `React.memo` দিয়ে থাকেন এবং তার মধ্যে Props হিসেবে কোনো ফাংশন পাস করেন, তবে `useCallback` ছাড়া `React.memo` কাজ করবে না।

**কোড উদাহরণ (Code Example):**
```jsx
import { useState, useCallback, memo } from 'react';

// Child Component
const Button = memo(({ onClick }) => {
  console.log('Child Button Rendered');
  return <button onClick={onClick}>Click Me</button>;
});

// Parent Component
function Parent() {
  const [count, setCount] = useState(0);

  // useCallback থাকায় Parent রি-রেন্ডার হলেও এই ফাংশনের রেফারেন্স বদলাবে না
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Button onClick={handleClick} />
    </div>
  );
}
```

---

### C. `useTransition` (React 18 Concurrent Feature)

**সংজ্ঞা (Definition):**
`useTransition` আপনাকে কোনো স্টেট আপডেটকে **Non-blocking (কম গুরুত্বপূর্ন/Urgency কম)** হিসেবে চিহ্নিত করতে দেয়। এটি ইউজার ইন্টারফেসকে (যেমন টাইপিং) ফ্রিজ হওয়া থেকে রক্ষা করে।

**Senior Concept:**
- **Urgent Updates:** ইনপুট ফিল্ডে টাইপ করা, বাটনে ক্লিক করা।
- **Transition Updates:** বড় তালিকা ফিল্টার করা, পেজ চেঞ্জ করা।

**কোড উদাহরণ (Code Example):**
```jsx
import { useState, useTransition } from 'react';

function SearchList({ bigList }) {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState(bigList);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent: ইনপুট ফিল্ড সাথে সাথে আপডেট হবে

    // Non-urgent: ফিল্টারিং ব্যাকগ্রাউন্ডে কনকারেন্টলি হবে
    startTransition(() => {
      const filtered = bigList.filter(item => item.includes(value));
      setFilteredList(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Loading list...</p>}
      <ul>{filteredList.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
```

---

### D. `useDeferredValue`

**সংজ্ঞা (Definition):**
`useTransition`-এর মতো এটিও কনকারেন্ট ফিচারের অংশ, তবে এটি স্টেট আপডেটের পরিবর্তে কোনো **Value (মানের)** রেন্ডারিংকে পিছিয়ে (Defer) দেয়। Debounce-এর আধুনিক বিকল্প হিসেবে এটি ব্যবহৃত হয়।

**কোড উদাহরণ:**
```jsx
import { useState, useDeferredValue } from 'react';

function LargeComponent({ text }) {
  // টেক্সট পরিবর্তনের সাথে সাথে পুরো UI ফ্রিজ না হয়ে মানটি একটু দেরিতে প্রসেস হবে
  const deferredText = useDeferredValue(text);

  return <SlowList text={deferredText} />;
}
```

---

## 4. Ref & DOM Hooks

### A. `useRef`

**সংজ্ঞা (Definition):**
`useRef` একটি ম্যূটেবল অবজেক্ট `{ current: initialValue }` রিটার্ন করে। এটি দুটি কাজে লাগে:
1. সরাসরি DOM Element অ্যাক্সেস করা (যেমন focus, scroll)।
2. এমন কোনো মান ধরে রাখা যা পরিবর্তন হলেও কম্পোনেন্ট **রি-রেন্ডার হবে না** (যেমন: setInterval-এর ID, আগের স্টেট রেফারেন্স)।

**কোড উদাহরণ:**
```jsx
import { useRef } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // সরাসরি DOM Focus
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

---

### B. `useImperativeHandle`

**সংজ্ঞা (Definition):**
`forwardRef`-এর সাথে ব্যবহৃত হয়। Child Component তার অভ্যন্তরীণ লজিক বা মেথড Parent Component-এর কাছে এক্সপোজ (Expose) করার জন্য এটি ব্যবহার করে।

**কোড উদাহরণ:**
```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // Parent শুধু এই নির্দিষ্ট মেথডগুলো কল করতে পারবে
    customFocus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} />;
});

// Parent
function Parent() {
  const childRef = useRef();

  return (
    <div>
      <CustomInput ref={childRef} />
      <button onClick={() => childRef.current.customFocus()}>Focus</button>
      <button onClick={() => childRef.current.clear()}>Clear</button>
    </div>
  );
}
```

---

## 5. Context & External Store Hooks

### A. `useContext`

**সংজ্ঞা (Definition):**
Prop Drilling এড়িয়ে কম্পোনেন্ট ট্রির যেকোনো স্তরে ডাটা শেয়ার করার জন্য `useContext` ব্যবহার করা হয়।

**Senior Concept & Optimization:**
Context-এর মান পরিবর্তন হলে সেই Context ব্যবহারকারী সমস্ত কম্পোনেন্ট রি-রেন্ডার হয়। সমাধান:
1. একাধিক ছোট ছোট Context তৈরি করা (Split Contexts)।
2. Provider-এর `value` অবজেক্টকে `useMemo` দিয়ে র‍্যাপ করা।

---

### B. `useSyncExternalStore`

**সংজ্ঞা (Definition):**
React 18-এ আসা এই Hook-টি React-এর বাইরের কোনো স্টোর (যেমন Redux, Zustand বা `window.navigator.onLine` ইভেন্ট)-এর সাথে রেন্ডারিং সিঙ্ক্রোনাইজ করার জন্য ব্যবহৃত হয়। এটি Concurrent Rendering-এ **Tearing** (UI-এর অসামঞ্জস্যতা) প্রতিরোধ করে।

**কোড উদাহরণ (Online Status Check):**
```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function ConnectivityStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? 'Online 🟢' : 'Offline 🔴'}</h1>;
}
```

---

## 6. Utility Hooks & React 19 Hooks

### A. `useId`
SSR (Server-side rendering) এবং Client-side rendering-এ অ্যাক্সেসিবিলিটি attributes-এর জন্য ইউনিক আইডি তৈরি করে যা Hydration mismatch প্রতিরোধ করে।

```jsx
const id = useId();
<label htmlFor={id}>Email</label>
<input id={id} type="email" />
```

---

### B. `useDebugValue`
কাস্টম হুকে React DevTools-এ কাস্টম লেবেল বা ডিবাগ মেসেজ দেখানোর জন্য ব্যবহৃত হয়।

---

### React 19-এর গুরুত্বপূর্ণ ৩টি Hook (সিনিয়র ইন্টারভিউ স্পেশাল):
1. **`useActionState`:** ফর্ম সাবমিশন এবং সার্ভার অ্যাকশন পরিচালনার জন্য।
2. **`useFormStatus`:** ফর্মের সাবমিট স্ট্যাটাস (Pending/Success) যেকোনো চাইল্ড কম্পোনেন্ট থেকে জানার জন্য।
3. **`useOptimistic`:** নেটওয়ার্ক সাড়াদানের আগেই দ্রুত UI আপডেট দেখানোর (Optimistic UI) জন্য।

---

## 7. Custom Hooks Best Practices

একটি আইডিয়াল Custom Hook-এর বৈশিষ্ট্য:
1. নাম অবশ্যই **`use`** দিয়ে শুরু হতে হবে।
2. Pure logic এবং UI আলাদা করবে (Separation of Concerns)।
3. মেমোরি লিক এবং রিসোর্স ক্লিনআপ হ্যান্ডেল করবে।

**উদাহরণ: `useFetch` Custom Hook (with AbortController):**

```jsx
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

---

## 8. Senior Level Interview Tricky Questions

### Q1: "Stale Closure" কী এবং এটি কিভাবে ঘটে?
**উত্তর:**
যখন কোনো ফাংশন (যেমন `useEffect` বা `setTimeout`) তার বাইরের কোনো ভ্যারিয়েবলকে ক্যাপচার করে নেয় কিন্তু ডিপেন্ডেন্সি অ্যারে আপডেট না করার কারণে পুরোনো ভ্যালু ধরে রাখে, তাকে Stale Closure বলে।
**সমাধান:** Dependency Array সঠিক রাখা অথবা `setState(prev => prev + 1)` ফরম্যাট ব্যবহার করা।

---

### Q2: React 18-এর "Automatic Batching" বলতে কী বোঝায়?
**উত্তর:**
React 17 পর্যন্ত শুধুমাত্র React ইভেন্ট হ্যান্ডলারে একাধিক স্টেট আপডেট ব্যাচ হতো। React 18 থেকে `setTimeout`, `Promise`, বা Native Event Handler-এর ভেতরে থাকা একাধিক স্টেট আপডেটকেও একটিমাত্র Re-render-এ ব্যাচ করা হয়।

---

### Q3: `useEffect` বনাম `useLayoutEffect`-এর প্রধান পার্থক্য কী?
**উত্তর:**
- `useEffect` হলো **Asynchronous** — এটি ব্রাউজার স্ক্রিন পেন্ট করার পর রান করে।
- `useLayoutEffect` হলো **Synchronous** — এটি DOM পরিবর্তনের পর কিন্তু ব্রাউজার পেন্ট করার আগে রান করে। DOM মেজারমেন্ট বা ফ্লিকার এড়াতে এটি ব্যবহার করা হয়।

---

### Q4: `useMemo` এবং `useCallback`-এর সম্পর্ক কী?
**উত্তর:**
`useCallback(fn, deps)` মূলত `useMemo(() => fn, deps)`-এর একটি শর্টকাট syntactical sugar। 
- `useMemo` যেকোনো মান (Value/Object/Array) মেমোরাইজ করে।
- `useCallback` শুধুমাত্র ফাংশন মেমোরাইজ করে।

---

### Q5: কীভাবে Custom Hook দিয়ে Infinite Render Loop বন্ধ করবেন?
**উত্তর:**
যদি Custom Hook থেকে অবজেক্ট বা অ্যারে রিটার্ন করা হয় এবং সেটি কোনো `useEffect`-এর ডিপেন্ডেন্সিতে থাকে, তবে প্রতি রেন্ডারে নতুন অবজেক্ট রেফারেন্স তৈরি হয়ে ইনফাইনাইট লুপ শুরু হতে পারে। 
**সমাধান:** Custom Hook থেকে রিটার্ন করা অবজেক্ট বা ফাংশনকে `useMemo` এবং `useCallback` দিয়ে র‍্যাপ করা।

---

## 9. Senior React Architecture & System Design Topics (Beyond Hooks)

শুধুমাত্র Hooks জানা একজন **Senior React Developer**-এর জন্য যথেষ্ট নয়। ইন্টারভিউয়াররা একজন সিনিয়র ডেভেলপারের কাছ থেকে React-এর আর্কিটেকচার, ইন্টারনাল ওয়ার্কিং (Internal Working), পারফরম্যান্স টিউনিং এবং ডিজাইন প্যাটার্ন সম্পর্কিত গভীর জ্ঞান প্রত্যাশা করেন।

নিচে হুকের বাইরে যে বিষয়গুলো অতি অবশ্যই জানা থাকতে হবে তা আলোচনা করা হলো:

---

### A. React Fiber Architecture & Reconciliation Algorithm

**ইন্টারভিউ প্রশ্ন: React Fiber কী এবং এটি আগের Virtual DOM রেণ্ডারিং থেকে কীভাবে আলাদা?**

- **Reconciliation (Diffing Algorithm):** React দুটি Virtual DOM ট্রির মধ্যে তুলনা করে দেখে কোথায় পরিবর্তন এসেছে। এতে O(n³) জটিলতা থেকে O(n)-এ নেমে আসে (Keys ব্যবহারের মাধ্যমে)।
- **React Fiber (React 16+):** আগে রেন্ডারিং সম্পূর্ণ **Synchronous (Stack Reconciler)** ছিল, ফলে বড় ট্রিতে UI আটকে যেত। Fiber হলো একটি নতুন আসিনক্রোনাস রেন্ডারিং ইঞ্জিন যা রেন্ডারিং কাজকে ছোট ছোট ইউনিটে (Fiber Node) ভাগ করে এবং ব্রাউজার আইডিয়াল টাইমে (`requestIdleCallback`) প্রাধান্য অনুযায়ী (Priority-based scheduling) কাজ সম্পন্ন করে।
- ** Render Phase vs Commit Phase:**
  - **Render Phase (Asynchronous):** রেন্ডার গণনা করা হয়, যেকোনো সময় বিরতি (Pause/Abort) দেওয়া যায়। Side-effects এখানে চালানো যাবে না!
  - **Commit Phase (Synchronous):** DOM আপডেট এবং Side-effects (`useEffect`, `useLayoutEffect`) এক্সিকিউট করা হয়।

---

### B. React Server Components (RSC) vs Client Components

**ইন্টারভিউ প্রশ্ন: React Server Components (RSC) কীভাবে কাজ করে এবং Client Component-এর সাথে এর পার্থক্য কী?**

| ফিচার (Feature) | Server Component (RSC) | Client Component (`'use client'`) |
| :--- | :--- | :--- |
| **কোথায় চলে?** | শুধুমাত্র সার্ভারে | সার্ভার (SSR) ও ব্রাউজার দুই জায়গাতেই |
| **Bundle Size** | ক্লায়েন্ট বান্ডেল সাইজে ০ কেবি (Zero bundle size) | ক্লায়েন্ট বান্ডেলে কোড যোগ হয় |
| **Hooks / State** | `useState`, `useEffect` ব্যবহার করা **যাবে না** | সব Hooks ব্যবহার করা যাবে |
| **Data Fetching** | সরাসরি ডেটাবেস/সার্ভারে async/await দিয়ে ফেচ করা যায় | `useEffect` বা TanStack Query দরকার |

---

### C. Large-Scale State Management Architecture

**ইন্টারভিউ প্রশ্ন: কোনো বড় প্রজেক্টে স্টেট কীভাবে ভাগ বা ম্যানেজ করা উচিত?**

একজন সিনিয়র ডেভেলপার স্টেটকে ৩টি ভাগে ভাগ করে প্রজেক্ট আর্কিটেকচার তৈরি করেন:
1. **Local/UI State:** ফর্ম ইনপুট, মডেল ওপেন/ক্লোজ -> `useState`, `useReducer`
2. **Global Shared UI State:** থিম (Dark/Light), ইউজার সেশন -> `Zustand` বা `Redux Toolkit`
3. **Server Data State:** এপিআই ক্যাশিং, ব্যাকগ্রাউন্ড ফেচিং -> `TanStack Query (React Query)` বা `SWR`
   - *পরামর্শ:* সাধারণ API Fetching-এর জন্য Redux না বানিয়ে Server State Management টুল ব্যবহার করা উত্তম।

---

### D. Advanced Performance Optimization & Profiling

**ইন্টারভিউ প্রশ্ন: আপনার React অ্যাপ স্লো হলে কীভাবে ডায়াগনোজ এবং অপটিমাইজ করবেন?**

1. **React DevTools Profiler:** Flamegraph এবং Ranked chart দেখে কোন কম্পোনেন্ট সবচেয়ে বেশি সময় নিচ্ছে এবং কেন রেন্ডার হচ্ছে তা চিহ্নিত করা।
2. **Code Splitting & Lazy Loading:** `React.lazy()` এবং `Suspense` দিয়ে রুট (Route-based) অনুযায়ী বান্ডেল সাইজ ছোট করা।
3. **List Virtualization (Windowing):** ১০,০০০ ডাটার তালিকা রেন্ডার করতে পুরো তালিকায় DOM না বানিয়ে শুধু স্ক্রিনে দৃশ্যমান ৫০টি উপাদান রেন্ডার করা (`react-window` বা `react-virtualized` দিয়ে)।
4. **Bundle Size Analysis:** `source-map-explorer` দিয়ে থার্ড পার্টি প্যাকেজ অপটিমাইজ করা।

---

### E. Senior Design Patterns

1. **Compound Component Pattern:** উদাহরণ: `<Select><Select.Option /></Select>` — যেখানে সাব-কম্পোনেন্টগুলো নিজেদের মধ্যে স্টেট শেয়ার করে।
2. **Control Props Pattern:** কম্পোনেন্ট নিজের স্টেট নিজে রাখবে কিন্তু প্রয়োজন হলে বাইরে থেকে Controlled স্টেটও গ্রহণ করবে।
3. **Custom Hooks Pattern:** সমস্ত বিজনেস লজিক UI থেকে আলাদা করে কাস্টম হুকে নিয়ে যাওয়া।

---

### F. Security & Testing Best Practices

1. **Security (XSS Protection):** React ডিফল্টভাবে JSX স্ট্রিং এস্কেপ করে XSS রদ করে। কিন্তু `dangerouslySetInnerHTML` ব্যবহারের সময় sanitization (`DOMPurify`) জরুরি।
2. **Testing Strategy:**
   - **React Testing Library (RTL):** Implementation Details টেস্ট না করে ব্যবহারকারীর আচরণ (User Behavior) টেস্ট করা।
   - **MSW (Mock Service Worker):** API কল মক করার জন্য নেটওয়ার্ক লেভেলে ইন্টারসেপ্ট করা।

---

## 10. Senior Interview Ready Checklist

- [x] **React Hooks Mastery:** সমস্ত ১৪+ হুকের কাজ, এজ কেস এবং স্টেল ক্লোজার ধারণা।
- [x] **React Core:** Fiber, Virtual DOM, Reconciliation, Render vs Commit Phase.
- [x] **React 18 & 19:** Concurrent Rendering (`useTransition`), Automatic Batching, Server Components (RSC).
- [x] **Performance:** Profiler, Code Splitting, List Virtualization, memoization strategies.
- [x] **Architecture:** Server State (React Query) vs Global State (Zustand/Redux).
- [x] **Testing & Security:** RTL philosophy, XSS prevention.

---

> **চূড়ান্ত পরামর্শ (Final Verdict):** শুধুমাত্র হুক জানলে জুনিয়র/মিড-লেভেল ইন্টারভিউ পাস করা সম্ভব, কিন্তু **Senior Developer** পজিশনের জন্য **Fiber Architecture, Concurrent React, Performance Profiling এবং State Architecture** অত্যন্ত জরুরি। উপরের সমস্ত পয়েন্ট সম্বলিত এই গাইডটি সম্পূর্ণ আয়ত্ত করলে আপনি একটি Senior React Interview-এর জন্য ১০০% প্রস্তুত! 🚀

