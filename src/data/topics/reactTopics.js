import { createTopicSchema } from './createTopicSchema.js';

export const reactTopics = {
  // 1. REACT BASICS & VIRTUAL DOM
  "react-basics": createTopicSchema({
    id: "react-basics",
    techId: "react",
    title: "React Fundamentals, Virtual DOM & Reconciliation Engine",
    category: "React Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["JavaScript ES6+"],
    definition: "React is a component-based UI library that uses a Virtual DOM tree memory representation and a Fiber Reconciliation engine to compute minimal DOM mutations efficiently.",
    simpleExplanation: "React lets you build interactive user interfaces by breaking pages down into reusable component building blocks.",
    whyDoesItExist: "Replaces slow direct browser DOM manipulation with fast in-memory Virtual DOM diffing.",
    basicExample: `import React from 'react';

export function WelcomeCard({ userName }) {
  return (
    <div className="p-4 bg-slate-800 rounded-lg text-white">
      <h1 className="text-xl font-bold">Welcome, {userName}!</h1>
    </div>
  );
}`,
    howItWorks: [
      "1. JSX compiles into React.createElement() function calls.",
      "2. State change triggers new Virtual DOM tree creation in RAM memory.",
      "3. React Fiber Diffing Algorithm computes minimal real DOM patch updates."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/><text x="350" y="95" fill="#22d3ee" font-weight="bold" text-anchor="middle">JSX -&gt; Virtual DOM Tree -&gt; Fiber Diffing -&gt; Real DOM Patch</text></svg>`,
    realWorldExample: `import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<WelcomeCard userName="Alice" />);`,
    commonUseCases: [
      "Building Single Page Applications (SPAs) and interactive web apps",
      "Encapsulating UI elements into reusable functional components",
      "Optimizing DOM update rendering speed"
    ],
    commonMistakes: [
      "Directly mutating DOM elements with document.getElementById() inside React apps",
      "Forgetting that JSX components must return a single root element (or Fragment <>...</>)"
    ],
    bestPractices: [
      "Use React Fragments (<>...</>) to avoid adding unnecessary extra <div> container nodes",
      "Keep components small, focused, and declarative"
    ],
    whenToUse: ["In all modern frontend web applications requiring rich UI interactivity"],
    whenNotToUse: ["When building a simple static HTML landing page without JavaScript interaction"],
    relatedConcepts: ["Virtual DOM", "React Fiber", "JSX", "Reconciliation"],
    comparison: {
      title: "Real DOM vs React Virtual DOM",
      headers: ["Metric", "Real Browser DOM", "React Virtual DOM"],
      rows: [
        ["Update Speed", "Slow (Triggers expensive layout Reflow)", "Fast (In-memory JS object diffing)"],
        ["Mutation", "Direct DOM manipulation", "Batch patch updates via Reconciliation Engine"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the React Virtual DOM and how does Reconciliation work?", answer: "The Virtual DOM is an in-memory JS representation of the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the old tree using Fiber reconciliation, and applies minimal batch patches to the real DOM." }
    ],
    practiceProblem: {
      description: "Write a React component returning a greeting header.",
      starterCode: `export function Header({ title }) {\n  return <h1>{title}</h1>;\n}`,
      testAssertion: "true",
      solution: `export function Header({ title }) {\n  return <h1>{title}</h1>;\n}`
    },
    quickRevision: "★ React uses Virtual DOM for fast diffing.\n★ JSX compiles to React.createElement().\n★ Fiber reconciles minimal real DOM updates."
  }),

  // 2. PROPS & STATE
  "react-props-state": createTopicSchema({
    id: "react-props-state",
    techId: "react",
    title: "Components, Props Validation & useState Hook",
    category: "React Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["react-basics"],
    definition: "Props pass read-only data down from parent to child components, while useState manages local mutable component state that triggers component re-renders when updated.",
    simpleExplanation: "Props are component inputs (like function arguments). State is component memory that causes the UI to re-render when changed.",
    whyDoesItExist: "Enforces unidirectional top-down data flow and reactive component UI rendering.",
    basicExample: `import { useState } from 'react';

export function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <button 
      onClick={() => setCount(prev => prev + 1)}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Count: {count}
    </button>
  );
}`,
    howItWorks: [
      "1. useState returns current state value and a state updater dispatch function.",
      "2. Calling updater function (setCount) schedules a re-render batch.",
      "3. Component re-executes with fresh state value in Virtual DOM tree."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">setState(prev =&gt; prev + 1) -&gt; Schedule Re-render -&gt; UI Updated</text></svg>`,
    realWorldExample: `export function ToggleSwitch({ onToggle }) {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(prev => !prev);
    onToggle?.(!isOn);
  };

  return <button onClick={handleClick}>{isOn ? "ON" : "OFF"}</button>;
}`,
    commonUseCases: [
      "Managing form input states, toggle switches, and modal visibility",
      "Passing parent state setters down to child components via props",
      "Updating state using functional updates (setCount(prev => prev + 1))"
    ],
    commonMistakes: [
      "Directly mutating state variables (e.g. state.count = 5 instead of setCount(5))",
      "Relying on stale state by using count instead of functional prev => prev + 1 in fast loops"
    ],
    bestPractices: [
      "Always use functional updater state callbacks (setVal(prev => ...)) when new state depends on previous state",
      "Keep state immutably updated using spread syntax ({ ...prev, key: val })"
    ],
    whenToUse: ["In all interactive React UI components"],
    whenNotToUse: ["Do not use useState for data that does not affect UI rendering (use useRef instead)"],
    relatedConcepts: ["useState", "Props", "Immutability", "Unidirectional Data Flow"],
    comparison: {
      title: "Props vs State in React",
      headers: ["Metric", "Props", "State"],
      rows: [
        ["Ownership", "Passed into component by parent", "Owned internally by component"],
        ["Mutability", "Read-only (Immutable inside child)", "Mutable via useState dispatch updater"],
        ["Re-render", "Triggers re-render when parent changes props", "Triggers re-render when setState is called"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is state updating asynchronous in React and why should you use functional state updates?", answer: "React batches state updates for performance optimization. When new state depends on previous state, use functional updates (setCount(prev => prev + 1)) to avoid stale closure state values." }
    ],
    practiceProblem: {
      description: "Write useState definition initializing count to 0.",
      starterCode: `const [count, setCount] = useState(0);`,
      testAssertion: "true",
      solution: `const [count, setCount] = useState(0);`
    },
    quickRevision: "★ Props are read-only inputs passed from parent.\n★ State is component memory managed via useState.\n★ Use functional state updates for reliable state calculation."
  }),

  // 3. USEEFFECT & LIFECYCLE
  "react-useeffect": createTopicSchema({
    id: "react-useeffect",
    techId: "react",
    title: "Side Effects, Component Lifecycle & useEffect Hook",
    category: "React Hooks",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "11 min",
    prerequisites: ["react-props-state"],
    definition: "useEffect synchronizes functional components with external side-effects (data fetching, DOM listeners, timers), managing mount, update, and unmount cleanup lifecycles.",
    simpleExplanation: "useEffect runs code after the component renders on screen. It lets you fetch API data or setup timers cleanly.",
    whyDoesItExist: "Replaces legacy class lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount) with a single unified hook.",
    basicExample: `import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { if (isMounted) setUser(data); });

    // Cleanup function on unmount or dependency change
    return () => { isMounted = false; };
  }, [userId]); // Dependency Array

  return <div>{user ? user.name : "Loading..."}</div>;
}`,
    howItWorks: [
      "1. React renders component UI to screen.",
      "2. useEffect callback executes asynchronously after browser paint.",
      "3. Cleanup function runs before next effect execution or when component unmounts."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Component Render -&gt; Browser Paint -&gt; useEffect Execution -&gt; Cleanup</text></svg>`,
    realWorldExample: `useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Unmount Cleanup: Prevents Memory Leaks!
  return () => window.removeEventListener('resize', handleResize);
}, []);`,
    commonUseCases: [
      "Fetching remote API data when component mounts",
      "Attaching and cleaning up browser event listeners",
      "Managing setInterval timers with proper clearInterval cleanup"
    ],
    commonMistakes: [
      "Omitting dependency array causing infinite render loops",
      "Forgetting cleanup functions on event listeners leading to severe memory leaks"
    ],
    bestPractices: [
      "Always include all reactive values used inside effect in the dependency array",
      "Return cleanup functions for all subscriptions, event listeners, and timers"
    ],
    whenToUse: ["When synchronizing React components with external Web APIs or systems"],
    whenNotToUse: ["Do not use useEffect for calculating derived state (calculate during render instead)"],
    relatedConcepts: ["useEffect", "Dependency Array", "Unmount Cleanup", "Stale Closures"],
    comparison: {
      title: "Dependency Array Modes in useEffect",
      headers: ["Dependency Array", "Execution Timing", "Use Case"],
      rows: [
        ["No array (useEffect(cb))", "Runs after EVERY render", "Rare logging"],
        ["Empty array ([])", "Runs ONCE after initial mount", "Initial data fetch / Event listener setup"],
        ["With values ([id])", "Runs when 'id' value changes", "Re-fetching data on prop/state change"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why are cleanup functions important in useEffect?", answer: "Cleanup functions execute before effect re-runs or when a component unmounts. They prevent memory leaks by removing event listeners, clearing timers, and canceling active subscriptions." }
    ],
    practiceProblem: {
      description: "Write useEffect running once on mount with cleanup.",
      starterCode: `useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);`,
      testAssertion: "true",
      solution: `useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);`
    },
    quickRevision: "★ useEffect runs after component paint.\n★ [] runs once on mount.\n★ Always return a cleanup function to prevent memory leaks."
  }),

  // 4. FORMS & CONTROLLED COMPONENTS
  "react-forms": createTopicSchema({
    id: "react-forms",
    techId: "react",
    title: "Controlled vs Uncontrolled Form Components",
    category: "React Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["react-useeffect"],
    definition: "Controlled components drive input element values through React state, whereas Uncontrolled components let the DOM manage input state, accessed via useRef.",
    simpleExplanation: "In controlled components, React state is the single source of truth for every keystroke typed into an input field.",
    whyDoesItExist: "Enables instant form input validation, dynamic button disabling, and custom formatting.",
    basicExample: `import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} // Controlled by React state
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  );
}`,
    howItWorks: [
      "1. User types character into input -> onChange event fires.",
      "2. State updater function (setEmail) updates state variable.",
      "3. Input renders value attribute bound strictly to React state."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">User Keypress -&gt; onChange Event -&gt; setState -&gt; Input Value Rendered</text></svg>`,
    realWorldExample: `import { useRef } from 'react';

// Uncontrolled Component using useRef (DOM-managed)
export function QuickSearch() {
  const inputRef = useRef();

  const handleSearch = () => {
    console.log("Search query:", inputRef.current.value);
  };

  return <input ref={inputRef} type="text" />;
}`,
    commonUseCases: [
      "Building real-time form validation and error messaging",
      "Disabling submit buttons until all required fields are valid",
      "Using React Hook Form for high-performance multi-field forms"
    ],
    commonMistakes: [
      "Switching an input from uncontrolled to controlled by initializing state to undefined instead of empty string ''",
      "Forgetting e.preventDefault() on form submit causing page refresh"
    ],
    bestPractices: [
      "Initialize input state to empty string '' (never undefined)",
      "Use React Hook Form or Formik for large multi-field forms to prevent unnecessary re-renders"
    ],
    whenToUse: ["In all form inputs requiring instant validation or reactive formatting"],
    whenNotToUse: ["Do not use heavy controlled state for file upload inputs (use useRef uncontrolled inputs)"],
    relatedConcepts: ["Controlled Components", "Uncontrolled Components", "useRef", "React Hook Form"],
    comparison: {
      title: "Controlled vs Uncontrolled Components",
      headers: ["Metric", "Controlled Components", "Uncontrolled Components"],
      rows: [
        ["State Storage", "React State (useState)", "Browser DOM (useRef)"],
        ["Validation", "Instant per keypress", "Validated on form submit"],
        ["Re-renders", "Re-renders component on every keystroke", "Zero re-renders during typing"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between Controlled and Uncontrolled components in React?", answer: "In Controlled components, input values are bound to React state and updated via onChange handlers. In Uncontrolled components, the DOM handles input values directly, accessed via useRef." }
    ],
    practiceProblem: {
      description: "Write controlled input handler for value setting.",
      starterCode: `<input value={name} onChange={e => setName(e.target.value)} />`,
      testAssertion: "true",
      solution: `<input value={name} onChange={e => setName(e.target.value)} />`
    },
    quickRevision: "★ Controlled inputs bind value to React state.\n★ Uncontrolled inputs use useRef to inspect DOM.\n★ Always use e.preventDefault() on form submit."
  }),

  // 5. CUSTOM HOOKS
  "react-custom-hooks": createTopicSchema({
    id: "react-custom-hooks",
    techId: "react",
    title: "Custom Hooks & Stateful Logic Encapsulation",
    category: "React Hooks",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["react-forms"],
    definition: "Custom Hooks are reusable JavaScript functions starting with the prefix 'use' that encapsulate stateful React hook logic for sharing across multiple components.",
    simpleExplanation: "Custom Hooks let you extract component logic (like data fetching, local storage syncing, or window sizing) into reusable helper functions.",
    whyDoesItExist: "Eliminates repetitive hook code duplication across components without introducing HOC wrapper hell.",
    basicExample: `import { useState, useEffect } from 'react';

// Custom Hook: useFetch
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); });
  }, [url]);

  return { data, loading };
}`,
    howItWorks: [
      "1. Custom hook function name MUST start with 'use' prefix.",
      "2. Calls standard React hooks (useState, useEffect) internally.",
      "3. Every component invoking the custom hook gets isolated, independent state."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Component A &amp; Component B -&gt; Reusable Custom Hook (Isolated State)</text></svg>`,
    realWorldExample: `// Component consuming custom hook
export function UserList() {
  const { data: users, loading } = useFetch('https://api.example.com/users');

  if (loading) return <p>Loading users...</p>;
  return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    commonUseCases: [
      "Extracting API data fetching and loading state logic",
      "Syncing state with browser localStorage (useLocalStorage)",
      "Tracking online/offline browser network status (useOnlineStatus)"
    ],
    commonMistakes: [
      "Naming a custom hook without the required 'use' prefix (bypasses Linter Rules of Hooks)",
      "Believing two components calling the same custom hook share state (they receive completely isolated state!)"
    ],
    bestPractices: [
      "Always prefix custom hooks with 'use' (e.g. useDebounce, useAuth)",
      "Keep custom hooks focused on a single reusable responsibility"
    ],
    whenToUse: ["Whenever stateful hook logic is duplicated across 2 or more components"],
    whenNotToUse: ["Do not create custom hooks for simple static non-hook utility functions"],
    relatedConcepts: ["Custom Hooks", "Rules of Hooks", "Stateful Logic Reuse"],
    comparison: {
      title: "Custom Hooks vs Utility Functions",
      headers: ["Feature", "Custom Hook (useHook)", "Utility Function"],
      rows: [
        ["Contains React Hooks?", "Yes (useState, useEffect, etc.)", "No (Pure JS logic only)"],
        ["Name Prefix", "MUST start with 'use'", "Standard camelCase name"],
        ["Rerender Capability", "Triggers component re-render on state change", "Returns calculated value synchronously"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Do two components using the same custom hook share state?", answer: "No. Custom hooks share stateful LOGIC, not state itself. Each component calling a custom hook receives its own completely isolated state memory." }
    ],
    practiceProblem: {
      description: "Write custom hook useToggle returning [value, toggle].",
      starterCode: `function useToggle(initial = false) {\n  const [val, setVal] = useState(initial);\n  const toggle = () => setVal(p => !p);\n  return [val, toggle];\n}`,
      testAssertion: "true",
      solution: `function useToggle(initial = false) {\n  const [val, setVal] = useState(initial);\n  const toggle = () => setVal(p => !p);\n  return [val, toggle];\n}`
    },
    quickRevision: "★ Custom hooks MUST start with 'use'.\n★ They share stateful logic, NOT state memory.\n★ Isolated state is created for every consuming component."
  }),

  // 6. CONTEXT API & GLOBAL STATE
  "react-context-state": createTopicSchema({
    id: "react-context-state",
    techId: "react",
    title: "Context API, Prop Drilling & State Management (Zustand/Redux)",
    category: "State Management",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["react-custom-hooks"],
    definition: "Context API passes global state down the component tree without prop drilling, while global state libraries (Zustand, Redux Toolkit) manage complex application state at scale.",
    simpleExplanation: "Context API lets you share global settings (like User Auth or UI Theme) across deep component trees without passing props through every layer.",
    whyDoesItExist: "Eliminates Prop Drilling where intermediate components manually pass props they do not use.",
    basicExample: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook to consume Context safely
export const useTheme = () => useContext(ThemeContext);`,
    howItWorks: [
      "1. createContext() instantiates Context container object.",
      "2. Context.Provider wraps component tree injecting value payload.",
      "3. All child components calling useContext(Context) re-render when Provider value updates."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">ContextProvider (Global State) -&gt; Bypasses Intermediate Children -&gt; Deep Consumer</text></svg>`,
    realWorldExample: `// Consuming Context in Deep Child Component
export function HeaderBar() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      Current Theme: {theme}
    </button>
  );
}`,
    commonUseCases: [
      "Sharing user authentication sessions and dark/light UI themes",
      "Avoiding Prop Drilling across 5+ component nesting levels",
      "Using Zustand or Redux Toolkit for complex high-frequency global state"
    ],
    commonMistakes: [
      "Using Context API for high-frequency state (causes ALL provider children to re-render!)",
      "Forgetting to wrap App tree with ContextProvider component"
    ],
    bestPractices: [
      "Use Context API for low-frequency global state (Auth, Theme, Locale)",
      "Use Zustand or Redux Toolkit for high-frequency state (Shopping Cart, Real-time feeds)"
    ],
    whenToUse: ["When state must be accessed by many components at different nesting levels"],
    whenNotToUse: ["Do not use Context API for state localized to a single component subtree"],
    relatedConcepts: ["Context API", "Prop Drilling", "useContext", "Zustand", "Redux Toolkit"],
    comparison: {
      title: "Context API vs Redux Toolkit / Zustand",
      headers: ["Feature", "Context API", "Zustand / Redux Toolkit"],
      rows: [
        ["Setup Complexity", "Zero extra packages (Built into React)", "Requires library installation"],
        ["Re-render Performance", "All consumers re-render on value change", "Selective selector-based re-renders (Ultra Fast)"],
        ["Best Use Case", "Low-frequency state (Theme, Auth)", "High-frequency state (Cart, Data Feeds)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Prop Drilling and how does Context API solve it?", answer: "Prop Drilling is passing props through intermediate components that do not need them just to reach a deep child. Context API provides a Provider wrapper allowing deep consumers to access global state directly via useContext()." }
    ],
    practiceProblem: {
      description: "Write useContext consume hook usage.",
      starterCode: `const { user } = useContext(AuthContext);`,
      testAssertion: "true",
      solution: `const { user } = useContext(AuthContext);`
    },
    quickRevision: "★ Context API eliminates Prop Drilling.\n★ Use for low-frequency state (Auth, Theme).\n★ Use Zustand/Redux for high-frequency state."
  }),

  // 7. REACT ROUTER
  "react-router": createTopicSchema({
    id: "react-router",
    techId: "react",
    title: "Client-Side Routing with React Router v6",
    category: "Navigation",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["react-context-state"],
    definition: "React Router enables Client-Side Routing in SPAs, dynamically rendering components matching URL paths without triggering browser page reloads.",
    simpleExplanation: "React Router updates the browser URL and page contents instantly without re-downloading HTML from the server.",
    whyDoesItExist: "Provides instant page transitions and single-page navigation in React SPAs.",
    basicExample: `import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

export function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    howItWorks: [
      "1. BrowserRouter listens to HTML5 History API (pushState, popstate).",
      "2. Route matches current window.location.pathname URL.",
      "3. Renders corresponding element component inside SPA root."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">URL Link Click -&gt; History API pushState -&gt; Route Component Render</text></svg>`,
    realWorldExample: `import { useParams, useNavigate } from 'react-router-dom';

export function UserProfilePage() {
  const { id } = useParams(); // Extracts URL param /users/:id
  const navigate = useNavigate();

  return (
    <div>
      <h2>User Profile ID: {id}</h2>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}`,
    commonUseCases: [
      "Building multi-page SPA applications in React",
      "Extracting dynamic URL parameters via useParams()",
      "Creating Protected Routes requiring authentication guards"
    ],
    commonMistakes: [
      "Using standard HTML <a href='/page'> links causing full browser page reloads (use <Link to='/page'> instead!)",
      "Forgetting to wrap App with <BrowserRouter>"
    ],
    bestPractices: [
      "Use <Link> or <NavLink> for SPA navigation to prevent page reloads",
      "Implement Protected Route wrapper components for auth checking"
    ],
    whenToUse: ["In all React Single Page Applications requiring URL navigation"],
    whenNotToUse: ["When using Next.js (which includes its own file-system App Router)"],
    relatedConcepts: ["BrowserRouter", "Link", "useParams", "useNavigate", "Protected Routes"],
    comparison: {
      title: "<a href> vs <Link to>",
      headers: ["Link Tag", "Navigation Mechanism", "Page Reload"],
      rows: [
        ["<a href='/about'>", "Standard HTTP server page request", "Full page refresh (State lost)"],
        ["<Link to='/about'>", "React Router Client-Side Navigation", "Zero page refresh (Instant & preserves state)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you use <Link to=''> instead of <a href=''> in React Router?", answer: "<a href=''> triggers a full browser page refresh, destroying React memory state. <Link to=''> intercepts the click and uses the HTML5 History API for instant client-side routing without reloading." }
    ],
    practiceProblem: {
      description: "Write useParams hook extracting id.",
      starterCode: `const { id } = useParams();`,
      testAssertion: "true",
      solution: `const { id } = useParams();`
    },
    quickRevision: "★ React Router enables SPA client-side routing.\n★ Use <Link to=''> instead of <a href=''>.\n★ Use useParams() for dynamic route parameters."
  }),

  // 8. PERFORMANCE OPTIMIZATION
  "react-performance": createTopicSchema({
    id: "react-performance",
    techId: "react",
    title: "React Performance: React.memo, useMemo & useCallback",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["react-router"],
    definition: "React performance optimization prevents unnecessary component re-renders using React.memo for component memoization, useMemo for caching expensive calculations, and useCallback for preserving callback reference equality.",
    simpleExplanation: "useMemo caches expensive math results, useCallback caches function references, and React.memo skips re-rendering child components if props haven't changed.",
    whyDoesItExist: "Prevents UI lag and unnecessary Virtual DOM re-renders in large applications.",
    basicExample: `import { useState, useMemo, useCallback, memo } from 'react';

// Child component wrapped in React.memo (Skips re-render if props unchanged)
const ExpensiveChild = memo(({ onClick }) => {
  console.log("Child Rendered");
  return <button onClick={onClick}>Click Child</button>;
});

export function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Caches function memory reference to prevent child re-render!
  const handleClick = useCallback(() => {
    console.log("Child clicked");
  }, []);

  // Caches expensive calculation
  const expensiveMath = useMemo(() => {
    return count * 1000000;
  }, [count]);

  return <ExpensiveChild onClick={handleClick} />;
}`,
    howItWorks: [
      "1. React.memo performs shallow comparison (Object.is) on incoming props.",
      "2. useCallback retains identical function memory pointer reference across parent re-renders.",
      "3. useMemo returns cached calculation result unless dependency array values change."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Props Unchanged -&gt; React.memo Shallow Check -&gt; Skip Child Re-render</text></svg>`,
    realWorldExample: `// Code Splitting with React.lazy and Suspense
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

export function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart module...</p>}>
      <HeavyChart />
    </Suspense>
  );
}`,
    commonUseCases: [
      "Optimizing long list items and complex data tables",
      "Caching expensive filtering/sorting array math with useMemo",
      "Passing callback handlers down to memoized child components with useCallback"
    ],
    commonMistakes: [
      "Wrapping cheap 1-line functions in useCallback unnecessarily (adds extra memory overhead!)",
      "Passing inline objects ({ style: { color: 'red' } }) into React.memo components, breaking shallow equality checks"
    ],
    bestPractices: [
      "Use useMemo for genuinely expensive sorting/filtering math",
      "Combine React.memo on child components with useCallback on parent handlers"
    ],
    whenToUse: ["When profiling reveals sluggish UI components or large re-rendering trees"],
    whenNotToUse: ["Do not prematurely wrap every simple component in React.memo"],
    relatedConcepts: ["React.memo", "useMemo", "useCallback", "Code Splitting", "Suspense"],
    comparison: {
      title: "useMemo vs useCallback",
      headers: ["Hook", "What It Caches", "Primary Purpose"],
      rows: [
        ["useMemo(() => value, [deps])", "Result VALUE of a calculation", "Cache expensive math/array operations"],
        ["useCallback(fn, [deps])", "Function REFERENCE itself", "Preserve callback reference for React.memo children"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between useMemo and useCallback in React?", answer: "useMemo caches the calculated RESULT of a function execution. useCallback caches the function REFERENCE itself to prevent child components wrapped in React.memo from re-rendering due to reference changes." }
    ],
    practiceProblem: {
      description: "Write useMemo caching doubled number.",
      starterCode: `const doubled = useMemo(() => num * 2, [num]);`,
      testAssertion: "true",
      solution: `const doubled = useMemo(() => num * 2, [num]);`
    },
    quickRevision: "★ React.memo skips child renders if props haven't changed.\n★ useMemo caches calculation results.\n★ useCallback preserves function reference identity."
  }),

  // 9. ADVANCED HOOKS & CONCURRENCY
  "react-advanced-hooks": createTopicSchema({
    id: "react-advanced-hooks",
    techId: "react",
    title: "Advanced Hooks (useReducer, useRef) & Concurrent React",
    category: "React Advanced",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["react-performance"],
    definition: "Advanced Hooks include useReducer for complex Redux-like state transitions, useRef for mutable non-rendering DOM persistence, and Concurrent React APIs (useTransition, useDeferredValue) for non-blocking UI priorities.",
    simpleExplanation: "useReducer handles multi-action complex state. useRef holds mutable values without re-rendering. useTransition keeps typing responsive during heavy renders.",
    whyDoesItExist: "Manages complex state machines and prioritizes responsive user input above heavy background rendering.",
    basicExample: `import { useReducer, useRef, useTransition } from 'react';

// useReducer State Machine
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    default: return state;
  }
}

export function AdvancedComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const renderCountRef = useRef(0); // Persistent mutable reference (no re-render!)
  const [isPending, startTransition] = useTransition();

  renderCountRef.current++;

  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>Count: {state.count}</button>;
}`,
    howItWorks: [
      "1. useRef returns persistent { current: value } object across renders without triggering re-render.",
      "2. useReducer dispatches actions to reducer pure function returning new state object.",
      "3. startTransition marks heavy render updates as low priority, keeping input keypresses responsive."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">User Typing (High Priority) -- Concurrent Interrupt -- Heavy List (Low Priority)</text></svg>`,
    realWorldExample: `// Concurrent React: useTransition for search inputs
const [isPending, startTransition] = useTransition();

const handleSearch = (e) => {
  setQuery(e.target.value); // Urgent input update
  startTransition(() => {
    setFilteredList(largeList.filter(item => item.includes(e.target.value))); // Non-urgent update
  });
};`,
    commonUseCases: [
      "Managing complex state transitions with useReducer instead of nested useStates",
      "Accessing DOM nodes directly or storing timer IDs with useRef",
      "Keeping typing inputs smooth during heavy list renders with useTransition"
    ],
    commonMistakes: [
      "Expecting updating ref.current to trigger a component re-render (it does not!)",
      "Mutating state directly inside a useReducer reducer function"
    ],
    bestPractices: [
      "Use useReducer when state logic has 3+ sub-values or complex transition actions",
      "Use useTransition to keep user typing interactions responsive"
    ],
    whenToUse: ["In complex state management and concurrent React optimization"],
    whenNotToUse: ["Do not replace simple useState with useReducer for basic boolean toggles"],
    relatedConcepts: ["useReducer", "useRef", "useTransition", "useDeferredValue", "Concurrent React"],
    comparison: {
      title: "useState vs useRef vs useReducer",
      headers: ["Hook", "Triggers Re-render?", "Best Used For"],
      rows: [
        ["useState", "Yes", "UI reactive state"],
        ["useRef", "No", "DOM node references, timer IDs, non-rendering values"],
        ["useReducer", "Yes", "Complex multi-action state machines"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the primary difference between useState and useRef?", answer: "Updating useState triggers a component re-render so the UI updates. Updating useRef.current persists mutable values across renders WITHOUT triggering a re-render." }
    ],
    practiceProblem: {
      description: "Write useRef declaration for input element reference.",
      starterCode: `const inputRef = useRef(null);`,
      testAssertion: "true",
      solution: `const inputRef = useRef(null);`
    },
    quickRevision: "★ useRef holds persistent mutable value without re-rendering.\n★ useReducer handles complex state transitions.\n★ useTransition prioritizes input responsiveness."
  }),

  // 10. REACT 19 & SERVER COMPONENTS
  "react-19-rsc": createTopicSchema({
    id: "react-19-rsc",
    techId: "react",
    title: "React 19, Server Components (RSC) & Server Actions",
    category: "React 19 Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["react-advanced-hooks"],
    definition: "React 19 introduces React Server Components (RSC) that render exclusively on the server with zero client bundle size, Server Actions ('use server') for asynchronous mutations, and new hooks (useActionState, useOptimistic).",
    simpleExplanation: "Server Components run on the server and send lightweight HTML to the client without sending extra JavaScript code.",
    whyDoesItExist: "Drastically reduces JavaScript client bundle size and simplifies fullstack client-server data mutations.",
    basicExample: `// React Server Component (RSC) - Runs on Server!
import db from '@/lib/db';

export async function UserListServerComponent() {
  const users = await db.query('SELECT * FROM users'); // Direct DB Access!

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
    howItWorks: [
      "1. Server Components execute on Node server environment, fetching DB data directly.",
      "2. Returns lightweight RSC stream payload to browser with ZERO JavaScript bundle.",
      "3. Client Components marked with 'use client' hydrate for client-side interactivity."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Server Component (Direct DB Access) -&gt; Zero JS Payload -&gt; Fast Page Load</text></svg>`,
    realWorldExample: `// Server Action: app/actions.ts
'use server';

export async function updateUser(formData: FormData) {
  const name = formData.get('name');
  await db.users.update({ name });
}`,
    commonUseCases: [
      "Fetching database data directly inside React Server Components without API routes",
      "Submitting server-side form mutations using Server Actions",
      "Optimizing page load speed and eliminating client bundle bloat"
    ],
    commonMistakes: [
      "Adding click handlers (onClick) or hooks (useState) inside Server Components (use 'use client' instead)",
      "Exposing database credentials inside Client Components"
    ],
    bestPractices: [
      "Keep components Server Components by default; use 'use client' only when interactivity (hooks/event listeners) is needed",
      "Use useOptimistic for instant UI feedback on Server Action submissions"
    ],
    whenToUse: ["In modern Next.js 14/15 and React 19 fullstack applications"],
    whenNotToUse: ["When building a legacy client-only React SPA without a server runtime"],
    relatedConcepts: ["React Server Components", "Server Actions", "RSC", "useOptimistic", "use client"],
    comparison: {
      title: "Server Components vs Client Components",
      headers: ["Feature", "Server Components (Default)", "Client Components ('use client')"],
      rows: [
        ["Execution Place", "Server Only (Node.js)", "Browser Client (Hydrated)"],
        ["Client JS Bundle", "Zero Bytes", "Included in JS bundle"],
        ["Database / FS Access", "Direct Access Allowed", "Blocked (Security risk)"],
        ["Hooks & Event Handlers", "Not Allowed", "Fully Allowed (useState, onClick)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What are React Server Components (RSC) and how do they differ from Client Components?", answer: "React Server Components render exclusively on the server, have direct access to backend databases/filesystem, and contribute zero bytes to the client JavaScript bundle. Client Components ('use client') hydrate in the browser to support state and event listeners." }
    ],
    practiceProblem: {
      description: "Write directive string for Server Action.",
      starterCode: `'use server';`,
      testAssertion: "true",
      solution: `'use server';`
    },
    quickRevision: "★ Server Components render on server with zero client JS.\n★ Server Actions ('use server') handle backend mutations.\n★ Use 'use client' for interactive UI with hooks/events."
  }),

  // 11. TESTING REACT
  "react-testing": createTopicSchema({
    id: "react-testing",
    techId: "react",
    title: "Testing React Applications (React Testing Library & Vitest)",
    category: "Testing",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["react-19-rsc"],
    definition: "Testing React applications uses React Testing Library (RTL) and Jest/Vitest to test components from the end-user perspective by interacting with visible DOM elements.",
    simpleExplanation: "React Testing Library checks that your component renders correct text and responds properly when users click buttons.",
    whyDoesItExist: "Replaces implementation-detail testing with resilient user-centric DOM testing.",
    basicExample: `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('increments count on button click', () => {
    render(<Counter initialCount={0} />);

    const button = screen.getByRole('button', { name: /count: 0/i });
    fireEvent.click(button);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});`,
    howItWorks: [
      "1. render() mounts component into DOM Testing Environment (jsdom).",
      "2. screen.getByRole / getByText queries accessible DOM nodes as a real user would.",
      "3. fireEvent / userEvent simulates real user interactions."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Component Render (jsdom) -&gt; User Interaction -&gt; DOM Assertion Passed</text></svg>`,
    realWorldExample: `import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

it('displays user name after API fetch', async () => {
  render(<UserProfile userId={1} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});`,
    commonUseCases: [
      "Writing unit and integration tests for React UI components",
      "Testing form validation error messages",
      "Mocking API responses with MSW (Mock Service Worker)"
    ],
    commonMistakes: [
      "Testing internal component implementation details (like component state variables directly)",
      "Using querySelector instead of user-accessible queries like screen.getByRole()"
    ],
    bestPractices: [
      "Query DOM by accessible roles (getByRole, getByText) matching how users interact",
      "Use Mock Service Worker (MSW) for clean API mocking"
    ],
    whenToUse: ["In all production React application test suites"],
    whenNotToUse: ["Do not write brittle tests asserting internal private state variables"],
    relatedConcepts: ["React Testing Library", "Vitest", "Jest", "jsdom", "getByRole"],
    comparison: {
      title: "Enzyme (Deprecated) vs React Testing Library",
      headers: ["Metric", "Enzyme (Legacy)", "React Testing Library (Modern)"],
      rows: [
        ["Testing Philosophy", "Tests internal implementation details & state", "Tests visible DOM behavior as end-users see it"],
        ["Resilience", "Brittle (Fails when code refactored)", "Resilient (Passes if DOM behavior remains identical)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why does React Testing Library discourage testing component internal state?", answer: "Because users do not care about internal state variable names; they care about visible DOM behavior. Testing behavior instead of implementation details makes test suites resilient to code refactoring." }
    ],
    practiceProblem: {
      description: "Write assertion checking text presence in RTL.",
      starterCode: `expect(screen.getByText('Submit')).toBeInTheDocument();`,
      testAssertion: "true",
      solution: `expect(screen.getByText('Submit')).toBeInTheDocument();`
    },
    quickRevision: "★ Test user behavior, NOT implementation details.\n★ Query DOM by accessible roles (getByRole).\n★ Use MSW for mocking API network calls."
  }),

  // 12. ARCHITECTURE AT SCALE
  "react-architecture": createTopicSchema({
    id: "react-architecture",
    techId: "react",
    title: "React Component Architecture, Design Systems & Micro-Frontends",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["react-testing"],
    definition: "Enterprise React architecture organizes code using Atomic Design, Compound Component patterns, UI Design Systems, and Micro-Frontends (Module Federation) for multi-team scale.",
    simpleExplanation: "Design systems enforce UI consistency across products, while Compound Components provide clean, flexible component APIs.",
    whyDoesItExist: "Scales React development across large engineering organizations with multiple autonomous teams.",
    basicExample: `// Compound Component Pattern (<Select><Select.Option /></Select>)
import { createContext, useContext, useState } from 'react';

const SelectContext = createContext();

export function Select({ children, defaultValue }) {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      <div className="select-container">{children}</div>
    </SelectContext.Provider>
  );
}

Select.Option = function Option({ value, children }) {
  const { selected, setSelected } = useContext(SelectContext);
  return (
    <div 
      onClick={() => setSelected(value)}
      className={selected === value ? "active" : ""}
    >
      {children}
    </div>
  );
};`,
    howItWorks: [
      "1. Compound Parent component manages shared state via Context.",
      "2. Sub-components (Select.Option) communicate seamlessly without manual prop passing.",
      "3. Module Federation allows Micro-Frontend web apps to share React components dynamically."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Micro-Frontend App A &amp; App B -&gt; Module Federation Shared UI Design System</text></svg>`,
    realWorldExample: `// Usage of Compound Component Pattern
export function App() {
  return (
    <Select defaultValue="en">
      <Select.Option value="en">English</Select.Option>
      <Select.Option value="es">Spanish</Select.Option>
    </Select>
  );
}`,
    commonUseCases: [
      "Building flexible component libraries with the Compound Component pattern",
      "Sharing UI Design System components using Storybook",
      "Scaling frontend teams via Webpack Module Federation Micro-Frontends"
    ],
    commonMistakes: [
      "Building monolithic components with 50+ props instead of using composition patterns",
      "Coupling business logic tightly inside UI presentation components"
    ],
    bestPractices: [
      "Use Compound Component patterns for complex UI controls (Tabs, Accordions, Selects)",
      "Separate Presentational UI components from Data Container components"
    ],
    whenToUse: ["In enterprise-scale React component libraries and multi-team applications"],
    whenNotToUse: ["In simple 1-page prototype web apps"],
    relatedConcepts: ["Compound Components", "Design Systems", "Atomic Design", "Micro-Frontends"],
    comparison: {
      title: "Monolithic Props Component vs Compound Component Pattern",
      headers: ["Metric", "Monolithic Props Component", "Compound Component Pattern"],
      rows: [
        ["API Syntax", "<Select options={array} onChange={cb} />", "<Select><Select.Option>1</Select.Option></Select>"],
        ["Flexibility", "Rigid (Requires new props for customization)", "Highly flexible HTML composition"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the Compound Component pattern in React and what problem does it solve?", answer: "The Compound Component pattern allows components to work together sharing implicit state via Context (e.g. <Select><Select.Option /></Select>). It eliminates giant prop-heavy components and gives consumers clean, flexible HTML composition control." }
    ],
    practiceProblem: {
      description: "Write compound component pattern setup.",
      starterCode: `const SelectContext = createContext();`,
      testAssertion: "true",
      solution: `const SelectContext = createContext();`
    },
    quickRevision: "★ Compound components (<Select><Select.Option />) share implicit state.\n★ Separate presentation from business logic.\n★ Use Module Federation for Micro-Frontends."
  })
};
