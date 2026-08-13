import { createTopicSchema } from './createTopicSchema.js';

export const nextjsTopics = {
  // 1. NEXT.JS OVERVIEW & SETUP
  "nextjs-basics": createTopicSchema({
    id: "nextjs-basics",
    techId: "nextjs",
    title: "Next.js Overview, App Router Setup & Directory Structure",
    category: "Next.js Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["React Basics"],
    definition: "Next.js is the React Framework for the Web, featuring App Router architecture, React Server Components (RSC), built-in optimizations, and fullstack capabilities.",
    simpleExplanation: "Next.js builds upon React by adding file-based routing, server-side rendering (SSR), API endpoints, and automatic image/font optimization out-of-the-box.",
    whyDoesItExist: "Eliminates complex client-side SPA routing, solves React SEO challenges, and unifies fullstack frontend and backend code.",
    basicExample: `// app/page.tsx (Home Page in App Router!)
export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Welcome to Next.js App Router</h1>
    </main>
  );
}`,
    howItWorks: [
      "1. Next.js CLI bootstraps project via create-next-app.",
      "2. App Router uses app/ directory file-system routing.",
      "3. All components inside app/ are React Server Components (RSC) by default."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">app/ Directory -&gt; File System Router -&gt; React Server Components (RSC by Default)</text></svg>`,
    realWorldExample: `// Initializing Next.js project:
// npx create-next-app@latest my-next-app --typescript --tailwind --app`,
    commonUseCases: [
      "Building SEO-optimized fullstack React applications",
      "Building high-performance e-commerce and marketing websites",
      "Building SaaS web applications with server-side API capabilities"
    ],
    commonMistakes: [
      "Confusing Pages Router (legacy pages/ directory) with App Router (modern app/ directory)",
      "Attempting to use React hooks like useState inside server components without 'use client'"
    ],
    bestPractices: [
      "Adopt App Router (app/ directory) for all modern Next.js projects",
      "Keep server components as default unless client interactivity is required"
    ],
    whenToUse: ["In all modern production React applications requiring SEO or fullstack capabilities"],
    whenNotToUse: ["Do not use heavy frameworks for static non-interactive HTML sites"],
    relatedConcepts: ["App Router", "React Server Components", "create-next-app", "Next.js"],
    comparison: {
      title: "Pages Router vs App Router",
      headers: ["Feature", "Pages Router (Legacy pages/)", "App Router (Modern app/)"],
      rows: [
        ["Routing Directory", "pages/ directory", "app/ directory"],
        ["Component Type", "Client components with SSR functions", "React Server Components (RSC) by default"],
        ["Data Fetching", "getServerSideProps / getStaticProps", "Native async/await fetch() in components"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is Next.js and why is it preferred over raw client-side React (CRA)?", answer: "Next.js is a fullstack React framework. Unlike raw React SPAs which load empty HTML files in the browser, Next.js provides server-side rendering (SSR), file-system routing, automatic code splitting, and React Server Components for optimal SEO and fast initial page loads." }
    ],
    practiceProblem: {
      description: "Write basic Next.js page component export line.",
      starterCode: `export default function Page() { return <div>Home</div>; }`,
      testAssertion: "true",
      solution: `export default function Page() { return <div>Home</div>; }`
    },
    quickRevision: "★ App Router uses app/ directory.\n★ All components in app/ are React Server Components (RSC) by default.\n★ Solves React SEO challenges."
  }),

  // 2. APP ROUTER & FILE CONVENTIONS
  "nextjs-app-router": createTopicSchema({
    id: "nextjs-app-router",
    techId: "nextjs",
    title: "App Router Special File Conventions (page, layout, loading, error)",
    category: "Next.js Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["nextjs-basics"],
    definition: "App Router defines routing using folder hierarchies and special file conventions: page.tsx (UI route), layout.tsx (shared wrapper), loading.tsx (Suspense fallback), error.tsx (Error Boundary), and not-found.tsx.",
    simpleExplanation: "Next.js routes are folders. A folder with page.tsx creates a route, layout.tsx wraps it, and loading.tsx shows a loading spinner.",
    whyDoesItExist: "Provides predictable layout nesting, streaming loading states, and error handling out-of-the-box.",
    basicExample: `// app/dashboard/layout.tsx (Shared Sidebar Wrapper)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64">Sidebar</aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

// app/dashboard/page.tsx (Dashboard UI)
export default function DashboardPage() {
  return <h2>Dashboard Content</h2>;
}`,
    howItWorks: [
      "1. Next.js maps app/dashboard/page.tsx to /dashboard URL route.",
      "2. Wraps page.tsx inside app/dashboard/layout.tsx and root app/layout.tsx.",
      "3. Automatically wraps routes in React Suspense using loading.tsx fallback."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">layout.tsx -&gt; loading.tsx (Suspense) -&gt; error.tsx (Boundary) -&gt; page.tsx</text></svg>`,
    realWorldExample: `// app/dashboard/error.tsx MUST be a Client Component!
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div><h2>Something went wrong!</h2><button onClick={() => reset()}>Try again</button></div>;
}`,
    commonUseCases: [
      "Creating nested persistent UI layouts with layout.tsx",
      "Displaying instant loading skeletons with loading.tsx",
      "Handling route errors gracefully with error.tsx"
    ],
    commonMistakes: [
      "Forgetting 'use client' in error.tsx (error boundaries MUST be Client Components!)",
      "Expecting layout.tsx to re-render on page transitions (Layouts persist state across navigation!)"
    ],
    bestPractices: [
      "Use layout.tsx for persistent UI components like Navbars and Sidebars",
      "Use loading.tsx to enable instant React Suspense streaming"
    ],
    whenToUse: ["In all Next.js App Router route setups"],
    whenNotToUse: ["Do not use template.tsx unless you explicitly need layout re-mounting on every navigation"],
    relatedConcepts: ["page.tsx", "layout.tsx", "loading.tsx", "error.tsx", "not-found.tsx"],
    comparison: {
      title: "layout.tsx vs template.tsx",
      headers: ["File", "State Persistence", "Re-mounting Behavior"],
      rows: [
        ["layout.tsx", "Persists state across route navigation", "Does NOT re-mount on sibling route changes"],
        ["template.tsx", "Resets state on route navigation", "Re-mounts new component instance on every route change"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between layout.tsx and template.tsx in Next.js App Router?", answer: "layout.tsx persists its state and does not re-mount when navigating between sibling routes (ideal for Sidebars). template.tsx creates a fresh instance and re-mounts on every navigation (ideal for page enter animations or enter/exit tracking)." }
    ],
    practiceProblem: {
      description: "Write directive required at top of error.tsx files.",
      starterCode: `'use client';`,
      testAssertion: "true",
      solution: `'use client';`
    },
    quickRevision: "★ page.tsx creates the route UI.\n★ layout.tsx wraps pages and persists state across navigation.\n★ error.tsx MUST be a Client Component ('use client')."
  }),

  // 3. SERVER VS CLIENT COMPONENTS
  "nextjs-rsc": createTopicSchema({
    id: "nextjs-rsc",
    techId: "nextjs",
    title: "React Server Components (RSC) vs Client Components ('use client')",
    category: "Next.js Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["nextjs-app-router"],
    definition: "Next.js App Router components are React Server Components (RSC) by default (execute on server only, zero bundle size). Adding 'use client' creates Client Components for interactivity.",
    simpleExplanation: "Server Components run on the server (can access DB directly, zero JS sent to client). Client Components run in the browser for state and event handlers.",
    whyDoesItExist: "Drastically reduces JavaScript bundle size sent to client browsers.",
    basicExample: `// 1. Server Component (Default - Direct DB Access!)
import db from '@/lib/db';

export default async function UserList() {
  const users = await db.user.findMany(); // Direct DB query on server!
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// 2. Client Component (Requires 'use client' for hooks/events!)
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    howItWorks: [
      "1. Server Components execute on Node server, rendering static HTML and RSC payload stream.",
      "2. Zero JavaScript code for Server Components is included in client JS bundle.",
      "3. Client Components ('use client') hydrate in browser for onClick and useState handling."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Server Component (Direct DB / 0KB JS) -- [RSC Stream] --&gt; Client Component ('use client')</text></svg>`,
    realWorldExample: `// Composition Pattern: Passing Server Component as children to Client Component!
<ClientWrapper><ServerComponent /></ClientWrapper>`,
    commonUseCases: [
      "Querying databases directly inside async Server Components",
      "Using 'use client' for interactive forms, buttons, and state hooks",
      "Keeping heavy npm libraries on server to shrink client bundle"
    ],
    commonMistakes: [
      "Adding 'use client' at top of root layout.tsx (makes entire application a client component, losing RSC benefits!)",
      "Attempting to pass non-serializable functions as props from Server Component to Client Component"
    ],
    bestPractices: [
      "Keep components as Server Components by default; push 'use client' down to leaf interactive components",
      "Pass Server Components as children to Client Components"
    ],
    whenToUse: ["In all Next.js App Router application development"],
    whenNotToUse: ["Do not put 'use client' on components that do not use browser hooks or events"],
    relatedConcepts: ["React Server Components (RSC)", "'use client'", "Bundle Optimization", "RSC Stream"],
    comparison: {
      title: "Server Components vs Client Components",
      headers: ["Aspect", "Server Components (Default)", "Client Components ('use client')"],
      rows: [
        ["Execution", "Server ONLY", "Server pre-render + Client Hydration"],
        ["Client Bundle Impact", "ZERO KB", "Includes component JS in client bundle"],
        ["Capabilities", "Direct DB access, secret API keys", "useState, useEffect, onClick, browser APIs"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "When should you use 'use client' in Next.js App Router?", answer: "Use `'use client'` ONLY when a component requires browser-side interactivity: state hooks (`useState`, `useReducer`), lifecycle hooks (`useEffect`), custom event handlers (`onClick`), or browser-only APIs (`window`, `localStorage`)." }
    ],
    practiceProblem: {
      description: "Write directive syntax declaring a Client Component.",
      starterCode: `'use client';`,
      testAssertion: "true",
      solution: `'use client';`
    },
    quickRevision: "★ Server Components (default) run on server with 0KB client JS.\n★ Client Components require 'use client' directive.\n★ Push 'use client' down to leaf interactive components."
  }),

  // 4. DATA FETCHING STRATEGIES
  "nextjs-data-fetching": createTopicSchema({
    id: "nextjs-data-fetching",
    techId: "nextjs",
    title: "Data Fetching: Async Components, SSG, SSR & ISR",
    category: "Data Fetching",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["nextjs-rsc"],
    definition: "Data fetching in App Router uses native async/await inside Server Components with fetch() extensions supporting Dynamic SSR ({ cache: 'no-store' }), Static SSG ({ cache: 'force-cache' }), and ISR ({ next: { revalidate: 60 } }).",
    simpleExplanation: "Fetch data directly in server components using async/await. Control caching with revalidate options.",
    whyDoesItExist: "Replaces legacy getServerSideProps and getStaticProps with native async component fetching.",
    basicExample: `// app/products/page.tsx
export default async function ProductsPage() {
  // 1. Static Site Generation (SSG - Cached indefinitely)
  // const res = await fetch('https://api.example.com/products', { cache: 'force-cache' });

  // 2. Server-Side Rendering (SSR - Dynamic on every request)
  // const res = await fetch('https://api.example.com/products', { cache: 'no-store' });

  // 3. Incremental Static Regeneration (ISR - Revalidate every 60s)
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }
  });
  
  const products = await res.json();
  return <div>{products.length} Products</div>;
}`,
    howItWorks: [
      "1. Next.js extends native web fetch() API with caching options.",
      "2. Server Component fetches data in parallel on server during rendering.",
      "3. ISR revalidates cached static pages in background when timer expires."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">fetch() -&gt; { next: { revalidate: 60 } } -&gt; Incremental Static Regeneration (ISR)</text></svg>`,
    realWorldExample: `// Route Segment Config for forcing dynamic SSR:
export const dynamic = 'force-dynamic';`,
    commonUseCases: [
      "Static page caching for high-speed blog posts and product catalogs",
      "Dynamic SSR for user dashboards and stock trading interfaces",
      "ISR background revalidation every N seconds"
    ],
    commonMistakes: [
      "Attempting to use getServerSideProps inside App Router (getServerSideProps ONLY works in legacy Pages Router!)",
      "Not understanding that Next.js fetch() automatically deduplicates requests"
    ],
    bestPractices: [
      "Use async/await directly inside Server Components for data fetching",
      "Use ISR ({ next: { revalidate: seconds } }) for static pages with periodic updates"
    ],
    whenToUse: ["In all Next.js data fetching logic"],
    whenNotToUse: ["Do not use legacy getServerSideProps in App Router"],
    relatedConcepts: ["fetch() Caching", "ISR", "SSG", "SSR", "Request Deduplication"],
    comparison: {
      title: "Pages Router vs App Router Data Fetching",
      headers: ["Pattern", "Pages Router (Legacy)", "App Router (Modern)"],
      rows: [
        ["Server Rendering (SSR)", "export async function getServerSideProps()", "await fetch(url, { cache: 'no-store' })"],
        ["Static Site (SSG)", "export async function getStaticProps()", "await fetch(url, { cache: 'force-cache' })"],
        ["Incremental Revalidation (ISR)", "return { revalidate: 60 } inside getStaticProps", "await fetch(url, { next: { revalidate: 60 } })"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you achieve Incremental Static Regeneration (ISR) in Next.js App Router?", answer: "Pass `{ next: { revalidate: N } }` in the options object of native `fetch()`, where `N` is the number of seconds after which Next.js revalidates and regenerates the static page cache in the background." }
    ],
    practiceProblem: {
      description: "Write fetch options object for 60-second ISR revalidation.",
      starterCode: `{ next: { revalidate: 60 } }`,
      testAssertion: "true",
      solution: `{ next: { revalidate: 60 } }`
    },
    quickRevision: "★ Fetch data directly inside async Server Components.\n★ cache: 'no-store' = Dynamic SSR.\n★ next: { revalidate: 60 } = Incremental Static Regeneration (ISR)."
  }),

  // 5. SERVER ACTIONS & MUTATIONS
  "nextjs-server-actions": createTopicSchema({
    id: "nextjs-server-actions",
    techId: "nextjs",
    title: "Server Actions ('use server'), Form Handling & revalidatePath",
    category: "Mutations",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["nextjs-data-fetching"],
    definition: "Server Actions are asynchronous server functions executed on the backend triggered via forms or buttons, using 'use server', revalidatePath(), and revalidateTag() for cache invalidation.",
    simpleExplanation: "Server Actions let you submit forms directly to backend server functions without writing API route handlers.",
    whyDoesItExist: "Eliminates API route boilerplate for data mutations and form submissions.",
    basicExample: `// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  await db.user.create({ data: { name } });
  
  // Invalidate cache for /users page to trigger instant UI refresh!
  revalidatePath('/users');
}`,
    howItWorks: [
      "1. 'use server' marks function as server-side action endpoint.",
      "2. Form action attribute triggers RPC POST request to Server Action.",
      "3. revalidatePath() clears Server Data Cache for targeted route."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Form Submit -&gt; Server Action ('use server') -&gt; DB Mutation -&gt; revalidatePath()</text></svg>`,
    realWorldExample: `// Consuming Server Action in Form component:
// <form action={createUser}><input name="name" /><button type="submit">Add</button></form>`,
    commonUseCases: [
      "Handling form submissions directly with Server Actions",
      "Mutating database records without building separate API routes",
      "Purging router cache with revalidatePath() or revalidateTag()"
    ],
    commonMistakes: [
      "Forgetting 'use server' directive at top of action file",
      "Not validating formData inputs on the server before mutating database"
    ],
    bestPractices: [
      "Always validate Server Action inputs using Zod schemas",
      "Use revalidatePath() to refresh UI data after mutations"
    ],
    whenToUse: ["In all form submissions and data mutations in Next.js App Router"],
    whenNotToUse: ["Do not use Server Actions for third-party webhook receivers (use Route Handlers)"],
    relatedConcepts: ["Server Actions", "'use server'", "revalidatePath", "revalidateTag", "useFormStatus"],
    comparison: {
      title: "API Route Handlers vs Server Actions",
      headers: ["Aspect", "API Route Handlers (app/api/route.ts)", "Server Actions ('use server')"],
      rows: [
        ["Invocation", "Manual fetch('/api/user', { method: 'POST' })", "Direct form action={createUser} or event invocation"],
        ["Boilerplate", "High (Requires route handler setup)", "Zero (Standard async TypeScript function)"],
        ["Cache Integration", "Manual revalidation", "Native revalidatePath() integration"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is revalidatePath() in Next.js Server Actions?", answer: "revalidatePath() purges the cached data for a specific route path on the server, forcing Next.js to fetch fresh data and update the UI immediately following a Server Action mutation." }
    ],
    practiceProblem: {
      description: "Write directive syntax required at top of Server Action files.",
      starterCode: `'use server';`,
      testAssertion: "true",
      solution: `'use server';`
    },
    quickRevision: "★ 'use server' marks async backend action functions.\n★ Pass action function directly to <form action={myAction}>.\n★ Call revalidatePath('/route') to refresh UI cache after mutations."
  }),

  // 6. ROUTE HANDLERS (API ROUTES)
  "nextjs-route-handlers": createTopicSchema({
    id: "nextjs-route-handlers",
    techId: "nextjs",
    title: "Route Handlers (app/api/route.ts) & NextRequest / NextResponse",
    category: "API Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["nextjs-server-actions"],
    definition: "Route Handlers build RESTful API endpoints inside app/api/route.ts files using named HTTP function exports (GET, POST, PUT, PATCH, DELETE) returning NextResponse.",
    simpleExplanation: "Route Handlers let you build backend REST API endpoints inside app/api/.../route.ts for external webhooks or third-party clients.",
    whyDoesItExist: "Provides custom HTTP API endpoints for webhooks, external mobile apps, and non-form requests.",
    basicExample: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role');
  
  return NextResponse.json([
    { id: 1, name: 'Alice', role: role || 'user' }
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'User created', data: body }, { status: 201 });
}`,
    howItWorks: [
      "1. Next.js maps app/api/users/route.ts to /api/users URL endpoint.",
      "2. Named export functions (GET, POST) handle matching HTTP request verbs.",
      "3. Returns NextResponse.json() payload with status codes and headers."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">HTTP GET /api/users -&gt; app/api/users/route.ts -&gt; GET() -&gt; NextResponse.json()</text></svg>`,
    realWorldExample: `// Stripe Webhook Endpoint in Route Handler:
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  // Verify Stripe signature...
  return NextResponse.json({ received: true });
}`,
    commonUseCases: [
      "Building Stripe / GitHub webhook listener endpoints",
      "Exposing public REST API endpoints for mobile applications",
      "Handling OAuth callback authentication flows"
    ],
    commonMistakes: [
      "Co-locating route.ts and page.tsx in the same folder level (Next.js will throw a build routing conflict error!)",
      "Using default export instead of named exports (e.g. export default function handler is legacy Pages Router syntax; use export async function GET!)"
    ],
    bestPractices: [
      "Use named exports (export async function GET / POST)",
      "Never put page.tsx and route.ts in the exact same directory"
    ],
    whenToUse: ["When building REST API endpoints or webhook receivers"],
    whenNotToUse: ["Do not use Route Handlers for standard internal form submissions (use Server Actions)"],
    relatedConcepts: ["Route Handlers", "NextRequest", "NextResponse", "app/api"],
    comparison: {
      title: "Pages Router API Routes vs App Router Route Handlers",
      headers: ["Aspect", "Pages Router (pages/api/user.js)", "App Router (app/api/user/route.ts)"],
      rows: [
        ["File Name", "pages/api/user.js", "app/api/user/route.ts"],
        ["Export Style", "export default function handler(req, res)", "export async function GET(request: NextRequest)"],
        ["Request Object", "Standard Node.js req/res", "Web standard NextRequest and NextResponse"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you define an HTTP GET handler in Next.js App Router Route Handlers?", answer: "Export a named async function corresponding to the HTTP method: `export async function GET(request: NextRequest) { return NextResponse.json({...}); }` inside `app/api/.../route.ts`." }
    ],
    practiceProblem: {
      description: "Write named GET handler export function declaration.",
      starterCode: `export async function GET(request: NextRequest) {}`,
      testAssertion: "true",
      solution: `export async function GET(request: NextRequest) {}`
    },
    quickRevision: "★ Route Handlers live in app/api/.../route.ts.\n★ Use named exports (GET, POST, PUT, DELETE).\n★ Return NextResponse.json() objects."
  }),

  // 7. ADVANCED ROUTING PATTERNS
  "nextjs-advanced-routing": createTopicSchema({
    id: "nextjs-advanced-routing",
    techId: "nextjs",
    title: "Advanced Routing: Dynamic Segments, Parallel & Intercepting Routes",
    category: "Navigation",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["nextjs-route-handlers"],
    definition: "Advanced routing in App Router includes Dynamic Segments (app/shop/[id]), Catch-all routes ([...slug]), Parallel Routes (@folder for slot rendering), and Intercepting Routes ((.)photo for modal overlays).",
    simpleExplanation: "Advanced routing lets you build complex layouts like Instagram-style photo modals that open in a modal on click but have a unique shareable URL.",
    whyDoesItExist: "Enables multi-slot layouts and contextual modal overlays without losing URL state.",
    basicExample: `# Advanced Route Folder Conventions:
- Dynamic Segment: app/blog/[id]/page.tsx -> /blog/123
- Catch-All: app/shop/[...slug]/page.tsx -> /shop/clothes/shirts/red
- Parallel Routes: app/dashboard/@analytics/page.tsx & app/dashboard/@team/page.tsx
- Intercepting Route: app/feed/(.)photo/[id]/page.tsx (Intercepts /photo/123 in feed view!)`,
    howItWorks: [
      "1. Dynamic segments pass route parameters to params object.",
      "2. Parallel routes (@analytics) pass as props into layout.tsx.",
      "3. Intercepting routes ((.)photo) render modal overlay while preserving shareable target URL."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Parallel (@slot) &amp; Intercepting ((.)route) -&gt; Contextual Modal Overlays</text></svg>`,
    realWorldExample: `// Parallel Routes layout.tsx consuming @analytics and @team slots:
export default function DashboardLayout({ children, analytics, team }) {
  return <div>{children}<div className="grid flex-cols-2">{analytics}{team}</div></div>;
}`,
    commonUseCases: [
      "Building Instagram/Twitter style photo modal overlays with Intercepting Routes",
      "Building complex dashboard layouts with independent Parallel Route slots",
      "Handling flexible documentation paths with Catch-all routes ([...slug])"
    ],
    commonMistakes: [
      "Forgetting default.tsx fallback files for Parallel Route slots during navigation",
      "Misunderstanding Intercepting Route matching prefixes ((.), (..), (..)(..))"
    ],
    bestPractices: [
      "Always provide default.tsx for Parallel Route slots to handle unmatched navigation states",
      "Use Intercepting Routes for shareable modal overlays"
    ],
    whenToUse: ["When designing complex multi-pane dashboards and shareable modal overlays"],
    whenNotToUse: ["Do not use parallel routes if standard components satisfy simple layout requirements"],
    relatedConcepts: ["Dynamic Segments", "Parallel Routes (@slot)", "Intercepting Routes", "Catch-All Routes"],
    comparison: {
      title: "Parallel Routes vs Intercepting Routes",
      headers: ["Pattern", "Folder Syntax", "Primary Purpose"],
      rows: [
        ["Parallel Routes", "app/dashboard/@slot/page.tsx", "Simultaneously render multiple independent pages in 1 layout"],
        ["Intercepting Routes", "app/feed/(.)photo/[id]/page.tsx", "Intercept route to load modal in context while keeping shareable URL"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What are Parallel Routes in Next.js and how are they passed into layouts?", answer: "Parallel Routes (defined with `@folder` naming syntax) allow you to simultaneously render multiple independent pages within the same layout. Next.js passes each `@slot` as a prop directly into the parent `layout.tsx` component." }
    ],
    practiceProblem: {
      description: "Write folder syntax for a parallel route slot named analytics.",
      starterCode: `@analytics`,
      testAssertion: "true",
      solution: `@analytics`
    },
    quickRevision: "★ Parallel Routes (@slot) pass independent pages as props to layout.tsx.\n★ Intercepting Routes ((.)photo) build shareable modal overlays.\n★ Catch-all routes ([...slug]) match multi-level dynamic paths."
  }),

  // 8. MIDDLEWARE & EDGE RUNTIME
  "nextjs-middleware": createTopicSchema({
    id: "nextjs-middleware",
    techId: "nextjs",
    title: "Next.js Middleware (middleware.ts) & Edge Runtime",
    category: "Edge Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nextjs-advanced-routing"],
    definition: "Middleware in Next.js (middleware.ts at project root) runs before requests complete on the Edge Runtime, enabling global auth checks, redirects, rewrites, and header modifications.",
    simpleExplanation: "middleware.ts is a global gatekeeper running at edge locations before requests reach pages, redirecting unauthenticated users instantly.",
    whyDoesItExist: "Executes ultra-low latency global authentication and bot redirection before hitting application routes.",
    basicExample: `// middleware.ts (Project Root)
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};`,
    howItWorks: [
      "1. Request arrives -> Edge Runtime executes middleware.ts before route matching.",
      "2. Evaluates config.matcher regex rules.",
      "3. Returns NextResponse.redirect(), rewrite(), or next()."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Incoming Request -&gt; middleware.ts (Edge) -&gt; Redirect / Rewrite / Next</text></svg>`,
    realWorldExample: `// Adding custom Security Headers in Middleware:
const response = NextResponse.next();
response.headers.set('X-Custom-Header', 'Value');
return response;`,
    commonUseCases: [
      "Global authentication checks and session redirects",
      "A/B testing traffic splitting using Edge Rewrites",
      "Geolocation-based language localization redirects"
    ],
    commonMistakes: [
      "Attempting to use heavy Node.js native C++ modules (fs, path) in Edge Runtime (Edge Runtime only supports Web standard APIs!)",
      "Not configuring config.matcher causing middleware to run unnecessarily on static images and CSS files"
    ],
    bestPractices: [
      "Use config.matcher to exclude static assets (_next/static, images)",
      "Keep middleware functions lightweight and fast"
    ],
    whenToUse: ["In all global authentication, localization, and edge redirect logic"],
    whenNotToUse: ["Do not execute slow database queries inside middleware"],
    relatedConcepts: ["middleware.ts", "Edge Runtime", "NextResponse.redirect", "config.matcher"],
    comparison: {
      title: "Node.js Server Runtime vs Edge Runtime",
      headers: ["Runtime", "API Support", "Cold Start Speed"],
      rows: [
        ["Node.js Server Runtime", "Full Node.js APIs (fs, net, native modules)", "Standard"],
        ["Edge Runtime", "Web Standard APIs only (fetch, Request, Response)", "Ultra Fast (Sub-millisecond global edge deployment)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the Edge Runtime in Next.js middleware and what limitations does it have?", answer: "The Edge Runtime is a lightweight V8 JavaScript engine deployed globally at edge locations. It executes with sub-millisecond cold starts using Web Standard APIs, but does NOT support Node.js native APIs (like `fs`, `child_process`, or C++ native modules)." }
    ],
    practiceProblem: {
      description: "Write config object export matcher array syntax in middleware.",
      starterCode: `export const config = { matcher: ['/dashboard/:path*'] };`,
      testAssertion: "true",
      solution: `export const config = { matcher: ['/dashboard/:path*'] };`
    },
    quickRevision: "★ middleware.ts lives in project root.\n★ Runs on Edge Runtime before requests hit pages.\n★ Use config.matcher to limit execution paths."
  }),

  // 9. CACHING ARCHITECTURE
  "nextjs-caching": createTopicSchema({
    id: "nextjs-caching",
    techId: "nextjs",
    title: "Next.js 4-Tier Caching Architecture & Revalidation",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nextjs-middleware"],
    definition: "Next.js employs a 4-Tier Caching Architecture: Request Memoization (React cache), Data Cache (server fetch cache), Full Route Cache (server HTML/RSC), and Router Cache (client memory).",
    simpleExplanation: "Next.js caches data at 4 distinct layers: deduplicating requests, caching server fetches, pre-rendering HTML routes, and caching client navigation.",
    whyDoesItExist: "Maximizes application speed and minimizes redundant server rendering calculations.",
    basicExample: `# Next.js 4 Caching Layers Breakdown:
1. Request Memoization: Deduplicates identical fetch() calls within 1 React render tree.
2. Data Cache: Persists fetch() data across requests on server.
3. Full Route Cache: Persists compiled HTML & RSC payload on server.
4. Router Cache: Caches RSC payload in browser memory during session navigation.`,
    howItWorks: [
      "1. Request Memoization caches identical GET fetch requests per request lifecycle.",
      "2. Data Cache persists data on server disk across user sessions.",
      "3. revalidatePath() or revalidateTag() purges Data Cache and Full Route Cache."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Request Memoization -&gt; Data Cache -&gt; Full Route Cache -&gt; Router Cache</text></svg>`,
    realWorldExample: `// Tag-based cache invalidation:
fetch('https://api.example.com/user', { next: { tags: ['user-data'] } });
// In Server Action: revalidateTag('user-data');`,
    commonUseCases: [
      "Tag-based data cache invalidation with revalidateTag()",
      "Automatic request deduplication across component trees",
      "Purging full route cache on data updates"
    ],
    commonMistakes: [
      "Confusing client Router Cache with server Data Cache",
      "Over-caching dynamic user-specific data without setting cache: 'no-store'"
    ],
    bestPractices: [
      "Use revalidateTag('tag-name') for fine-grained cache purging",
      "Understand the 4 caching tiers when debugging stale data issues"
    ],
    whenToUse: ["In all Next.js App Router performance architecture designs"],
    whenNotToUse: ["Do not cache private dynamic user data in global Data Cache"],
    relatedConcepts: ["Request Memoization", "Data Cache", "Full Route Cache", "Router Cache"],
    comparison: {
      title: "Data Cache vs Router Cache",
      headers: ["Layer", "Location", "Duration"],
      rows: [
        ["Data Cache", "Server (Persistent across requests)", "Persistent until revalidated or expired"],
        ["Router Cache", "Client Browser Memory", "Temporary (Session duration / short duration)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What are the 4 caching layers in Next.js App Router architecture?", answer: "1) Request Memoization (deduplicates fetch calls in 1 render), 2) Data Cache (persists fetch data across requests on server), 3) Full Route Cache (caches pre-rendered HTML/RSC on server), and 4) Router Cache (caches RSC payloads in client browser RAM)." }
    ],
    practiceProblem: {
      description: "Write function name for tag-based cache revalidation.",
      starterCode: `revalidateTag('tag-name');`,
      testAssertion: "true",
      solution: `revalidateTag('tag-name');`
    },
    quickRevision: "★ 4 Caching Tiers: Request Memoization, Data Cache, Full Route Cache, Router Cache.\n★ revalidateTag('tag') enables targeted cache purging.\n★ fetch() automatically deduplicates identical requests."
  }),

  // 10. SEO, METADATA & OPENGRAPH
  "nextjs-seo": createTopicSchema({
    id: "nextjs-seo",
    techId: "nextjs",
    title: "Next.js Metadata API, Dynamic OpenGraph & Image / Font Optimization",
    category: "SEO & Optimization",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["nextjs-caching"],
    definition: "Next.js SEO uses the Metadata API (static export metadata or dynamic generateMetadata()), Dynamic OpenGraph image generation (next/og), next/image optimization, and next/font.",
    simpleExplanation: "Next.js provides built-in tools to generate social media share preview images (OpenGraph), optimize images to WebP, and render custom SEO meta tags.",
    whyDoesItExist: "Maximizes Google search engine ranking and social media share previews.",
    basicExample: `// 1. Static Metadata (app/page.tsx)
export const metadata = {
  title: 'My Next.js Application',
  description: 'High performance React app'
};

// 2. Dynamic Metadata Function (app/blog/[id]/page.tsx)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.summary
  };
}`,
    howItWorks: [
      "1. Next.js evaluates static metadata object or dynamic generateMetadata() on server.",
      "2. Injects <title>, <meta>, and OpenGraph tags directly into server-rendered HTML <head>.",
      "3. next/image automatically converts images to WebP/AVIF and resizes dynamically."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">generateMetadata() -&gt; Injects Meta Tags &amp; OpenGraph to HTML &lt;head&gt;</text></svg>`,
    realWorldExample: `// Using next/image for layout shift protection:
import Image from 'next/image';
<Image src="/hero.png" alt="Hero" width={800} height={600} priority />`,
    commonUseCases: [
      "Generating dynamic SEO title and description meta tags with generateMetadata()",
      "Preventing Cumulative Layout Shift (CLS) using next/image",
      "Zero-runtime Google Fonts loading with next/font"
    ],
    commonMistakes: [
      "Using standard HTML <img> tags instead of next/image (causes un-optimized images and CLS layout shifts!)",
      "Using raw <head> tags manually in App Router (use Metadata API!)"
    ],
    bestPractices: [
      "Always use next/image for image rendering",
      "Use generateMetadata() for dynamic blog post and product SEO pages"
    ],
    whenToUse: ["In all production Next.js applications"],
    whenNotToUse: ["Do not use raw HTML <img> tags"],
    relatedConcepts: ["generateMetadata()", "next/image", "next/font", "OpenGraph", "next/og"],
    comparison: {
      title: "Standard <img> vs next/image",
      headers: ["Feature", "Standard <img> Tag", "next/image Component"],
      rows: [
        ["Format", "Original uploaded format (heavy PNG/JPG)", "Automatic modern WebP/AVIF conversion"],
        ["Layout Shift", "Prone to CLS layout shifts", "Prevents Cumulative Layout Shift automatically"],
        ["Lazy Loading", "Manual loading='lazy'", "Automatic native lazy loading"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you generate dynamic SEO metadata for dynamic routes in Next.js App Router?", answer: "Export an async `generateMetadata({ params, searchParams })` function from your `page.tsx` file. Next.js executes this function on the server and injects the returned title, description, and OpenGraph tags into the HTML `<head>`." }
    ],
    practiceProblem: {
      description: "Write dynamic metadata function signature export line.",
      starterCode: `export async function generateMetadata({ params }: Props) {}`,
      testAssertion: "true",
      solution: `export async function generateMetadata({ params }: Props) {}`
    },
    quickRevision: "★ Export generateMetadata() for dynamic SEO meta tags.\n★ Use next/image to convert images to WebP & prevent CLS.\n★ Use next/font for zero-runtime Google Fonts."
  }),

  // 11. PRODUCTION & DEPLOYMENT
  "nextjs-deployment": createTopicSchema({
    id: "nextjs-deployment",
    techId: "nextjs",
    title: "Production Deployment, Vercel & Standalone Docker Build",
    category: "Deployment",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["nextjs-seo"],
    definition: "Deploying Next.js to production uses zero-config Vercel platform integration or self-hosted Docker containers with standalone output mode (output: 'standalone').",
    simpleExplanation: "Deploy Next.js effortlessly to Vercel or compile it into a tiny standalone Docker container for self-hosting on AWS or Kubernetes.",
    whyDoesItExist: "Provides seamless cloud deployments and lightweight self-hosted container builds.",
    basicExample: `// next.config.js (For Self-Hosted Docker Builds!)
module.exports = {
  output: 'standalone', // Strips unused node_modules for tiny 50MB Docker container!
};

# Standard Production Build Commands:
# npm run build
# npm run start`,
    howItWorks: [
      "1. Vercel deployment automatically configures Edge functions, CDN, and ISR revalidation.",
      "2. output: 'standalone' builds minimal server entry point bundling only necessary node_modules.",
      "3. Dockerfile packages standalone server into lightweight Alpine Linux container."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">output: 'standalone' -&gt; Docker Build (Tiny 50MB Image) -&gt; AWS / Kubernetes</text></svg>`,
    realWorldExample: `# Dockerfile run command for standalone build:
CMD ["node", "server.js"]`,
    commonUseCases: [
      "Deploying Next.js applications to Vercel with zero configuration",
      "Self-hosting Next.js on AWS ECS or Kubernetes using standalone Docker builds",
      "Optimizing container build sizes with output: 'standalone'"
    ],
    commonMistakes: [
      "Including full 1GB node_modules directory in production Docker images (use output: 'standalone'!)",
      "Forgetting build-time environment variables versus runtime environment variables"
    ],
    bestPractices: [
      "Use output: 'standalone' in next.config.js for self-hosted Docker deployments",
      "Use Vercel platform for optimal automatic Next.js feature support"
    ],
    whenToUse: ["In all production Next.js deployments"],
    whenNotToUse: ["Do not copy full node_modules into production Docker containers"],
    relatedConcepts: ["Vercel", "Standalone Output", "Docker", "npm run start"],
    comparison: {
      title: "Vercel vs Self-Hosted Standalone Docker",
      headers: ["Deployment Platform", "Setup Effort", "Maintenance"],
      rows: [
        ["Vercel", "Zero Config (Automatic Edge & ISR support)", "Managed Platform"],
        ["Self-Hosted Docker", "Requires next.config.js output: 'standalone' + Dockerfile", "Self-managed Infrastructure (AWS / K8s)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What does output: 'standalone' do in next.config.js and why is it useful for Docker deployments?", answer: "`output: 'standalone'` automatically traces dependencies and creates a minimal standalone server build containing only the exact required `node_modules` files, reducing production Docker container image sizes from ~1GB down to ~50MB." }
    ],
    practiceProblem: {
      description: "Write next.config.js standalone output property line.",
      starterCode: `module.exports = { output: 'standalone' };`,
      testAssertion: "true",
      solution: `module.exports = { output: 'standalone' };`
    },
    quickRevision: "★ Vercel provides zero-config Next.js deployments.\n★ Use output: 'standalone' in next.config.js for tiny Docker containers.\n★ Run 'npm run build' then 'npm run start' for production."
  })
};
