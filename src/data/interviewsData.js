export const interviewsData = {
  javascript: [
    {
      id: "js-q1",
      techId: "javascript",
      topic: "Closures & Scope",
      level: "Junior",
      experienceBand: "1–2 years",
      question: "What is the difference between `var`, `let`, and `const` in terms of scoping and hoisting?",
      expectedAnswerPoints: [
        "`var` is function-scoped and hoisted with an initial value of `undefined`.",
        "`let` and `const` are block-scoped and hoisted into the Temporal Dead Zone (TDZ).",
        "`const` bindings cannot be reassigned (though object properties within a const object remain mutable).",
        "Accessing `let` or `const` before declaration throws a `ReferenceError`."
      ],
      trapAlert: "Trap: Candidates often say `let` is not hoisted. It IS hoisted, but stays uninitialized in the TDZ until execution reaches declaration!"
    },
    {
      id: "js-q2",
      techId: "javascript",
      topic: "Asynchronous JavaScript",
      level: "Senior",
      experienceBand: "6–10 years",
      question: "Analyze this code execution order:\n`Promise.resolve().then(() => console.log('1')); setTimeout(() => console.log('2'), 0); process.nextTick(() => console.log('3'));`",
      expectedAnswerPoints: [
        "Order logged: 3, 1, 2.",
        "`process.nextTick` executes first before the Event Loop advances to next phase.",
        "Promise `.then()` microtask queue executes immediately after nextTick.",
        "`setTimeout(fn, 0)` macro-task runs in the Timers phase of the Event Loop."
      ],
      trapAlert: "Trap: Assuming setTimeout(0) runs instantaneously before microtasks!"
    }
  ],

  nodejs: [
    {
      id: "node-q1",
      techId: "nodejs",
      topic: "Event Loop & Architecture",
      level: "Intermediate",
      experienceBand: "2–4 years",
      question: "What happens when you run a synchronous heavy CPU loop (`while(true)`) in Node.js?",
      expectedAnswerPoints: [
        "The single-threaded Call Stack gets blocked completely.",
        "The Event Loop cannot progress to any phase (Timers, Poll, Check).",
        "All incoming HTTP requests freeze and eventually time out.",
        "Solution: Offload CPU work to Worker Threads or external background queues (BullMQ)."
      ],
      trapAlert: "Trap: Thinking libuv multi-threading automatically moves JS `while` loops off the main thread."
    },
    {
      id: "node-q2",
      techId: "nodejs",
      topic: "Scaling & Memory",
      level: "Senior",
      experienceBand: "6–10 years",
      question: "Your Node.js API process crashes intermittently with `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`. How do you debug and fix this?",
      expectedAnswerPoints: [
        "Take Chrome DevTools Heap Snapshots (`node --inspect`) before crash.",
        "Inspect Detached DOM nodes, unhandled global event listeners, or un-ended stream buffers.",
        "Increase Node max heap size: `node --max-old-space-size=4096 server.js`.",
        "Use Streams instead of reading entire files into memory buffer via `fs.readFile`."
      ],
      trapAlert: "Trap: Just increasing max-old-space-size without locating the underlying memory leak root cause!"
    }
  ],

  laravel: [
    {
      id: "lar-q1",
      techId: "laravel",
      topic: "Eloquent ORM",
      level: "Junior",
      experienceBand: "1–2 years",
      question: "What is the N+1 query problem in Laravel Eloquent and how do you prevent it?",
      expectedAnswerPoints: [
        "N+1 occurs when fetching N parent records and executing 1 extra database query per parent inside a loop to fetch relationships.",
        "Example: `User::all()` followed by `$user->posts` inside `@foreach` leads to 1 + 100 queries.",
        "Solution: Eager Loading using `User::with('posts')->get()`.",
        "In development, enable `Model::preventLazyLoading(! app()->isProduction())`."
      ],
      trapAlert: "Trap: Confusing Eager Loading (`with()`) with Lazy Loading (`load()`)."
    },
    {
      id: "lar-q2",
      techId: "laravel",
      topic: "Architecture & Performance",
      level: "Senior",
      experienceBand: "6–10 years",
      question: "Your Laravel API suddenly takes 5 seconds to respond under high load. Step-by-step, how would you investigate it?",
      expectedAnswerPoints: [
        "1. Check application logs (Laravel Telescope / Bugsnag / Sentry).",
        "2. Check Database slow query log and N+1 queries using Laravel Debugbar or Telescope.",
        "3. Inspect external 3rd-party HTTP API dependencies using timeout metrics.",
        "4. Check Redis cache hit/miss ratio.",
        "5. Inspect queue worker backlog (`php artisan queue:monitor`).",
        "6. Benchmark PHP memory & execution profile using Blackfire or Xdebug.",
        "7. Verify database connection pool limits and server CPU/RAM utilization."
      ],
      trapAlert: "Trap: Guessing code changes without inspecting empirical logs first!"
    }
  ],

  react: [
    {
      id: "react-q1",
      techId: "react",
      topic: "Reconciliation & Virtual DOM",
      level: "Intermediate",
      experienceBand: "2–4 years",
      question: "Why should you never use `index` as a key in dynamic lists in React?",
      expectedAnswerPoints: [
        "React uses `key` to identify which items have changed, been added, or been removed during Reconciliation.",
        "Using index causes React to re-order components incorrectly when items are inserted, deleted, or sorted.",
        "Leads to UI state bugs in inputs and unnecessary component re-renders.",
        "Solution: Always use unique persistent IDs (e.g. `item.id`)."
      ],
      trapAlert: "Trap: Saying index keys break static non-reordering lists."
    }
  ]
};

export const interviewTraps = [
  {
    tech: "JavaScript",
    traps: [
      { title: "var vs let vs const Scope", trap: "`var` hoists with undefined value, while `let/const` hoist into Temporal Dead Zone." },
      { title: "== vs ===", trap: "`==` performs loose type coercion (e.g. `[] == false` is true), whereas `===` checks strict type & value." },
      { title: "Closure Stale Values", trap: "Effect callbacks capturing old render values when dependency arrays are omitted." }
    ]
  },
  {
    tech: "Node.js",
    traps: [
      { title: "Event Loop vs Thread Pool", trap: "JS execution is single-threaded; libuv thread pool handles async I/O file & crypto tasks." },
      { title: "process.nextTick vs setImmediate", trap: "process.nextTick runs BEFORE the Event Loop phase transition, while setImmediate runs in the Check phase." }
    ]
  },
  {
    tech: "Laravel",
    traps: [
      { title: "Event vs Listener vs Job", trap: "Events notify something happened; Listeners respond synchronously; Jobs process deferred async tasks via queues." },
      { title: "Lazy Loading N+1 Trap", trap: "Fetching relationships inside loops generates N additional DB queries." }
    ]
  }
];
