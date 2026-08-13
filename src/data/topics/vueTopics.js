import { createTopicSchema } from './createTopicSchema.js';

export const vueTopics = {
  // 1. VUE 3 FUNDAMENTALS
  "vue-basics": createTopicSchema({
    id: "vue-basics",
    techId: "vue",
    title: "Vue 3 Fundamentals, Template Syntax & Vite Setup",
    category: "Vue Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["JavaScript ES6+"],
    definition: "Vue 3 is a progressive JavaScript framework for building user interfaces, featuring declarative rendering, template syntax (v-bind, v-on, v-if, v-for), and high-performance Proxy-based reactivity.",
    simpleExplanation: "Vue 3 lets you build interactive web interfaces using HTML templates combined with reactive JavaScript logic.",
    whyDoesItExist: "Provides an approachable, flexible, and ultra-fast component framework with automatic reactivity.",
    basicExample: `<script setup>
import { ref } from 'vue';
const message = ref('Hello Vue 3!');
</script>

<template>
  <div class="card">
    <h1>{{ message }}</h1>
    <input v-model="message" class="border p-2" />
  </div>
</template>`,
    howItWorks: [
      "1. Template compiles into optimized Virtual DOM render functions.",
      "2. Proxy reactivity tracks properties accessed during render.",
      "3. State mutation automatically triggers targeted DOM re-renders."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Template -&gt; Virtual DOM Render Function -&gt; Proxy Tracker -&gt; DOM Update</text></svg>`,
    realWorldExample: `// Creating Vue 3 app with Vite:
// npm create vite@latest my-vue-app -- --template vue`,
    commonUseCases: [
      "Building reactive Single Page Applications (SPAs)",
      "Two-way form data binding with v-model",
      "Rendering dynamic lists with v-for and unique :key"
    ],
    commonMistakes: [
      "Forgetting the required :key attribute when rendering lists with v-for",
      "Using index as :key for dynamic lists that undergo sorting or deletions"
    ],
    bestPractices: [
      "Use <script setup> syntax for clean Composition API code",
      "Always provide unique ID keys for v-for loops"
    ],
    whenToUse: ["In all modern Vue.js frontend applications"],
    whenNotToUse: ["Do not use heavy frameworks for static HTML pages without interactivity"],
    relatedConcepts: ["v-model", "v-bind", "v-for", "Composition API", "<script setup>"],
    comparison: {
      title: "Options API vs Composition API (<script setup>)",
      headers: ["Aspect", "Options API (Vue 2 Style)", "Composition API (<script setup>)"],
      rows: [
        ["Code Organization", "Grouped by option types (data, methods, computed)", "Grouped by logical feature capability"],
        ["TypeScript Support", "Limited", "First-class native TypeScript inferencing"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is <script setup> in Vue 3?", answer: "<script setup> is a compile-time syntactic sugar for using the Composition API inside Single File Components (.vue). Top-level bindings (variables, functions, imports) declared inside <script setup> are automatically exposed directly to the template." }
    ],
    practiceProblem: {
      description: "Write Vue 3 script tag syntax for Composition API setup.",
      starterCode: `<script setup>\nimport { ref } from 'vue';\n</script>`,
      testAssertion: "true",
      solution: `<script setup>\nimport { ref } from 'vue';\n</script>`
    },
    quickRevision: "★ Vue 3 uses <script setup> Composition API.\n★ v-model enables two-way data binding.\n★ Always provide unique :key in v-for loops."
  }),

  // 2. REACTIVITY CORE (REF & REACTIVE)
  "vue-reactivity": createTopicSchema({
    id: "vue-reactivity",
    techId: "vue",
    title: "Vue 3 Reactivity System: ref() vs reactive()",
    category: "Vue Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["vue-basics"],
    definition: "Vue 3 reactivity uses ES6 Proxies. ref() wraps primitives or objects in a reactive RefImpl object (.value), while reactive() creates deep reactive proxies for objects directly.",
    simpleExplanation: "ref() holds any value (accessed via .value in script). reactive() holds objects directly. When updated, Vue automatically updates the UI.",
    whyDoesItExist: "Replaces legacy Vue 2 Object.defineProperty with transparent ES6 Proxy reactivity.",
    basicExample: `<script setup>
import { ref, reactive } from 'vue';

// 1. ref() for primitives (Access via .value in script; auto-unwrapped in template!)
const count = ref(0);
const increment = () => count.value++;

// 2. reactive() for objects
const user = reactive({ name: 'Alice', age: 25 });
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p>{{ user.name }} ({{ user.age }})</p>
</template>`,
    howItWorks: [
      "1. ref() returns a RefImpl object with getter/setter tracking on .value property.",
      "2. reactive() wraps target object in an ES6 Proxy intercepting get/set traps.",
      "3. Templates automatically unwrap ref .value properties during rendering."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">ref(val) -&gt; RefImpl (.value) | reactive(obj) -&gt; ES6 Proxy (get/set traps)</text></svg>`,
    realWorldExample: `// Destructuring reactive() loses reactivity unless using toRefs():
import { toRefs } from 'vue';
const { name, age } = toRefs(user); // Preserves reactivity!`,
    commonUseCases: [
      "Using ref() for primitives, strings, booleans, arrays, and object reassignment",
      "Using reactive() for state objects with multiple properties",
      "Preserving reactivity on destructured properties with toRefs()"
    ],
    commonMistakes: [
      "Forgetting .value when mutating a ref variable inside JavaScript script code",
      "Destructuring a reactive() object directly (e.g. const { age } = state breaks reactivity!)"
    ],
    bestPractices: [
      "Use ref() as the primary default reactivity tool in Vue 3",
      "Use toRefs() when destructuring reactive object properties"
    ],
    whenToUse: ["In all Vue 3 reactive state declarations"],
    whenNotToUse: ["Do not use reactive() on primitive values"],
    relatedConcepts: ["ref()", "reactive()", "toRefs()", "ES6 Proxy"],
    comparison: {
      title: "ref() vs reactive()",
      headers: ["Feature", "ref()", "reactive()"],
      rows: [
        ["Data Types Supported", "Primitives & Objects", "Objects & Arrays ONLY"],
        ["Script Access", "Requires .value (count.value)", "Direct property access (user.name)"],
        ["Reassignment", "Supports full object reassignment", "Cannot reassign entire object without losing proxy"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between ref() and reactive() in Vue 3?", answer: "ref() works with primitives and objects, returning a reactive ref object accessed via `.value` in JavaScript. reactive() works only with objects/arrays, returning a deep ES6 Proxy directly. ref() supports full object reassignment, whereas reactive() does not." }
    ],
    practiceProblem: {
      description: "Write ref declaration for count initialized to 0.",
      starterCode: `const count = ref(0);`,
      testAssertion: "true",
      solution: `const count = ref(0);`
    },
    quickRevision: "★ ref() works for primitives & objects (use .value in script).\n★ reactive() creates deep ES6 proxies for objects.\n★ Destructuring reactive() requires toRefs() to preserve reactivity."
  }),

  // 3. COMPUTED & WATCHERS
  "vue-computed-watch": createTopicSchema({
    id: "vue-computed-watch",
    techId: "vue",
    title: "Vue 3 Computed Properties & Watchers (watch, watchEffect)",
    category: "Vue Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["vue-reactivity"],
    definition: "computed() properties cache derived values based on reactive dependencies. watch() monitors specific reactive sources, while watchEffect() automatically tracks accessed reactive dependencies.",
    simpleExplanation: "computed() caches expensive math results based on reactive inputs. watch() triggers side-effects (like API calls) when state changes.",
    whyDoesItExist: "Prevents unnecessary recalculations and executes side-effects on state changes.",
    basicExample: `<script setup>
import { ref, computed, watch, watchEffect } from 'vue';

const price = ref(100);
const quantity = ref(2);

// 1. Computed Property (Cached automatically!)
const totalCost = computed(() => price.value * quantity.value);

// 2. watch() (Explicit dependency tracking)
watch(price, (newPrice, oldPrice) => {
  console.log(\`Price changed from \${oldPrice} to \${newPrice}\`);
});

// 3. watchEffect() (Auto-tracks accessed dependencies)
watchEffect(() => {
  console.log(\`Current Total: \${totalCost.value}\`);
});
</script>`,
    howItWorks: [
      "1. computed() getter executes and caches result until reactive dependencies update.",
      "2. watch() registers explicit getter callback invoked only when target state mutates.",
      "3. watchEffect() runs immediately during setup and re-runs whenever any accessed ref updates."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">computed() Cached Result | watch() Explicit Callback | watchEffect() Auto-tracked</text></svg>`,
    realWorldExample: `// Deep watching reactive object properties:
watch(() => user.profile, (newProfile) => { ... }, { deep: true });`,
    commonUseCases: [
      "Calculating derived data (filtering lists, sub-totals) with computed()",
      "Fetching API data when route or search inputs change using watch()",
      "Auto-syncing state with localStorage using watchEffect()"
    ],
    commonMistakes: [
      "Mutating state inside computed() getters (computed properties MUST be pure functions without side-effects!)",
      "Using methods instead of computed() for expensive data filtering (methods re-execute on EVERY render!)"
    ],
    bestPractices: [
      "Keep computed() getters strictly pure and free of side-effects",
      "Use watch() when you need access to both old and new state values"
    ],
    whenToUse: ["In all derived state calculations and reactive side-effect monitoring"],
    whenNotToUse: ["Do not put side-effects or async API calls inside computed() getters"],
    relatedConcepts: ["computed()", "watch()", "watchEffect()", "Dependency Caching"],
    comparison: {
      title: "watch() vs watchEffect()",
      headers: ["Feature", "watch()", "watchEffect()"],
      rows: [
        ["Dependency Tracking", "Explicitly defined source parameter", "Automatically tracks all accessed reactive refs"],
        ["Initial Run", "Lazy (Runs only on state change)", "Eager (Runs immediately on setup)"],
        ["Old Value Access", "Provides both (newVal, oldVal)", "Provides new value only"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why should you use computed() instead of a standard method for calculating derived values?", answer: "computed() properties are cached based on their reactive dependencies. A computed property only recalculates when its dependencies change, whereas a method re-executes every time a component re-renders." }
    ],
    practiceProblem: {
      description: "Write computed property declaration for doubled count.",
      starterCode: `const double = computed(() => count.value * 2);`,
      testAssertion: "true",
      solution: `const double = computed(() => count.value * 2);`
    },
    quickRevision: "★ computed() caches results based on reactive dependencies.\n★ Keep computed getters pure (no side-effects!).\n★ watch() is lazy; watchEffect() runs immediately on setup."
  }),

  // 4. COMPONENTS, PROPS & EMITS
  "vue-components": createTopicSchema({
    id: "vue-components",
    techId: "vue",
    title: "Vue 3 Components, defineProps & defineEmits",
    category: "Vue Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["vue-computed-watch"],
    definition: "Vue components use single-file components (.vue). Parent-to-child data flow uses defineProps(), while child-to-parent event communication uses defineEmits().",
    simpleExplanation: "Props pass data down from parent to child components. Emits trigger events up from child to parent components.",
    whyDoesItExist: "Enforces modular component encapsulation and predictable top-down data flow.",
    basicExample: `<!-- ChildComponent.vue -->
<script setup>
// Define typed Props
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 }
});

// Define Emits
const emit = defineEmits(['update-count']);

const handleIncrement = () => {
  emit('update-count', props.count + 1);
};
</script>

<template>
  <button @click="handleIncrement">{{ title }}: {{ count }}</button>
</template>`,
    howItWorks: [
      "1. defineProps() defines read-only props injected into component instance.",
      "2. Child component calls emit('event-name', payload) to emit custom event.",
      "3. Parent listens using @event-name='handler' syntax."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Parent -- [Props: defineProps] --&gt; Child | Child -- [Events: defineEmits] --&gt; Parent</text></svg>`,
    realWorldExample: `<!-- ParentComponent.vue -->
<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const itemCount = ref(5);
</script>

<template>
  <ChildComponent title="Cart Items" :count="itemCount" @update-count="val => itemCount = val" />
</template>`,
    commonUseCases: [
      "Passing read-only configuration props down to UI child components",
      "Emitting custom events from buttons or form controls to parent components",
      "Two-way component binding using v-model on custom components"
    ],
    commonMistakes: [
      "Attempting to directly mutate props inside the child component (Props are read-only!)",
      "Forgetting to declare custom events in defineEmits()"
    ],
    bestPractices: [
      "Keep props read-only; emit events when child needs to request parent state changes",
      "Use TypeScript type-based declarations with defineProps<Props>()"
    ],
    whenToUse: ["In all modular Vue component hierarchies"],
    whenNotToUse: ["Do not mutate props directly inside child components"],
    relatedConcepts: ["defineProps", "defineEmits", "v-model", "Single File Components"],
    comparison: {
      title: "Props vs Emits",
      headers: ["Concept", "Direction", "Macro Compiler"],
      rows: [
        ["Props", "Parent -> Child (Data Down)", "defineProps()"],
        ["Emits", "Child -> Parent (Events Up)", "defineEmits()"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why are props read-only in Vue 3 child components?", answer: "Props enforce unidirectional top-down data flow. Preventing child components from mutating props directly avoids accidental state corruption in parent components." }
    ],
    practiceProblem: {
      description: "Write defineProps syntax for required title prop.",
      starterCode: `const props = defineProps({ title: { type: String, required: true } });`,
      testAssertion: "true",
      solution: `const props = defineProps({ title: { type: String, required: true } });`
    },
    quickRevision: "★ defineProps() defines read-only parent data inputs.\n★ defineEmits() triggers custom child-to-parent events.\n★ Props are strictly read-only inside child components."
  }),

  // 5. VUE ROUTER 4
  "vue-router": createTopicSchema({
    id: "vue-router",
    techId: "vue",
    title: "Vue Router 4 (Dynamic Routes, Guards & Lazy Loading)",
    category: "Navigation",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["vue-components"],
    definition: "Vue Router 4 manages Single Page Application (SPA) navigation, mapping URL paths to components, extracting dynamic parameters (useRoute), navigating programmatically (useRouter), and enforcing Navigation Guards (beforeEach).",
    simpleExplanation: "Vue Router handles page transitions instantly in SPAs without reloading the web page.",
    whyDoesItExist: "Provides client-side routing, navigation guards, and route code-splitting for Vue SPAs.",
    basicExample: `import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue') }, // Lazy Loaded!
  { path: '/users/:id', name: 'user-detail', component: () => import('./views/UserDetail.vue') }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});`,
    howItWorks: [
      "1. Router intercepts link clicks and uses HTML5 History API (pushState).",
      "2. Renders matching component into <RouterView /> location.",
      "3. Navigation Guards (beforeEach) evaluate authentication rules before entering routes."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">URL Link Click -&gt; beforeEach Guard -&gt; Lazy Load Component -&gt; RouterView</text></svg>`,
    realWorldExample: `// Navigation Guard for Protected Routes:
router.beforeEach((to, from) => {
  const isAuthenticated = checkAuth();
  if (to.meta.requiresAuth && !isAuthenticated) return { path: '/login' };
});`,
    commonUseCases: [
      "Navigating SPA views with <RouterLink to='/path'>",
      "Extracting URL parameters using useRoute().params.id",
      "Enforcing auth protection with router.beforeEach()"
    ],
    commonMistakes: [
      "Using standard <a href='/page'> tags causing full browser page reloads (use <RouterLink to='/page'>!)",
      "Confusing useRoute() (route metadata: params, query) with useRouter() (router instance: push, replace)"
    ],
    bestPractices: [
      "Use dynamic imports () => import('./View.vue') for route code splitting",
      "Use <RouterLink> for SPA navigation"
    ],
    whenToUse: ["In all Vue Single Page Applications requiring URL navigation"],
    whenNotToUse: ["Do not use Vue Router when building a Nuxt 3 app (Nuxt has file-system routing built-in)"],
    relatedConcepts: ["useRoute", "useRouter", "beforeEach Guard", "RouterLink", "Lazy Loading"],
    comparison: {
      title: "useRoute() vs useRouter()",
      headers: ["Composable", "Returns", "Primary Purpose"],
      rows: [
        ["useRoute()", "Active Route Location Object", "Read current path, params (:id), query (?page=2), and meta"],
        ["useRouter()", "Router Instance Object", "Perform navigation actions (router.push('/dashboard'))"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between useRoute() and useRouter() in Vue Router 4?", answer: "useRoute() returns the reactive current route location object (read path, params, query, meta). useRouter() returns the router instance used to perform programmatic navigation (push, replace, back)." }
    ],
    practiceProblem: {
      description: "Write useRouter navigation line pushing to /dashboard.",
      starterCode: `const router = useRouter(); router.push('/dashboard');`,
      testAssertion: "true",
      solution: `const router = useRouter(); router.push('/dashboard');`
    },
    quickRevision: "★ <RouterLink to=''> avoids page reloads.\n★ useRoute() reads params/query; useRouter() navigates (router.push).\n★ Lazy load routes with () => import('./View.vue')."
  }),

  // 6. STATE MANAGEMENT (PINIA)
  "vue-pinia": createTopicSchema({
    id: "vue-pinia",
    techId: "vue",
    title: "State Management with Pinia (Stores, State, Getters & Actions)",
    category: "State Management",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    readingTime: "10 min",
    prerequisites: ["vue-router"],
    definition: "Pinia is the official lightweight state management library for Vue 3, featuring modular Stores composed of State (ref/reactive), Getters (computed), and Actions (methods).",
    simpleExplanation: "Pinia manages global application state (like user auth sessions or shopping carts) accessible by any component without prop drilling.",
    whyDoesItExist: "Replaces legacy Vuex with zero-boilerplate, type-safe, modular Vue 3 state management.",
    basicExample: `// src/stores/useCartStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([]);

  // Getters
  const itemCount = computed(() => items.value.length);

  // Actions
  function addItem(item) {
    items.value.push(item);
  }

  return { items, itemCount, addItem };
});`,
    howItWorks: [
      "1. defineStore() creates a modular store instance.",
      "2. State refs automatically share reactive memory across all components.",
      "3. Direct state mutations allowed without complex Vuex mutation boilerplate."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Component A &amp; B -&gt; Pinia Store (State ref | Getters computed | Actions)</text></svg>`,
    realWorldExample: `// Consuming Pinia Store in Vue Component:
<script setup>
import { useCartStore } from '@/stores/useCartStore';
const cart = useCartStore();
</script>

<template>
  <button @click="cart.addItem({ name: 'Laptop' })">Cart ({{ cart.itemCount }})</button>
</template>`,
    commonUseCases: [
      "Managing shopping cart items across e-commerce product pages",
      "Storing authenticated user profile session state",
      "Persisting theme settings across application views"
    ],
    commonMistakes: [
      "Destructuring store properties directly (e.g. const { items } = cart breaks reactivity! Use storeToRefs(cart) instead)",
      "Continuing to use legacy Vuex for new Vue 3 projects"
    ],
    bestPractices: [
      "Use storeToRefs(store) when destructuring state and getters from Pinia stores",
      "Use Setup Store syntax (ref/computed/functions) for clean Composition API alignment"
    ],
    whenToUse: ["In all global state management in Vue 3 applications"],
    whenNotToUse: ["Do not put component-local UI state in global Pinia stores"],
    relatedConcepts: ["Pinia", "defineStore", "storeToRefs", "Setup Store"],
    comparison: {
      title: "Vuex (Legacy) vs Pinia (Modern)",
      headers: ["Feature", "Vuex 4 (Legacy)", "Pinia (Modern)"],
      rows: [
        ["Mutations", "Required (Complex commit syntax)", "REMOVED (Direct state mutation allowed)"],
        ["TypeScript", "Complex typings", "Native TypeScript auto-completion"],
        ["Modular Structure", "Single nested store tree", "Independent modular stores"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you safely destructure state properties from a Pinia store without losing reactivity?", answer: "Use `storeToRefs(store)`. Destructuring directly breaks reactivity, but `storeToRefs` wraps store state and getter properties into refs to preserve reactivity." }
    ],
    practiceProblem: {
      description: "Write Pinia storeToRefs import line.",
      starterCode: `import { storeToRefs } from 'pinia';`,
      testAssertion: "true",
      solution: `import { storeToRefs } from 'pinia';`
    },
    quickRevision: "★ Pinia is official Vue 3 state management (replaces Vuex).\n★ Setup Stores use ref() for state, computed() for getters, functions for actions.\n★ Use storeToRefs(store) when destructuring store state."
  }),

  // 7. COMPOSITION API & COMPOSABLES
  "vue-composables": createTopicSchema({
    id: "vue-composables",
    techId: "vue",
    title: "Custom Composables & Logic Reuse (useFetch, useLocalStorage)",
    category: "Vue Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["vue-pinia"],
    definition: "Composables are reusable functions leveraging Vue Composition API (ref, useEffect, computed) starting with 'use' to encapsulate and share stateful logic across components.",
    simpleExplanation: "Composables let you extract reactive component logic (like API fetching or window resize tracking) into reusable helper functions.",
    whyDoesItExist: "Replaces legacy Mixins which caused property name collisions and implicit state tracking.",
    basicExample: `// src/composables/useFetch.js
import { ref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    loading.value = true;
    try {
      const res = await fetch(url.value || url);
      data.value = await res.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}`,
    howItWorks: [
      "1. Composable function invokes ref/reactive internally creating isolated state.",
      "2. Returns reactive state object to consuming component.",
      "3. Every component invoking the composable gets its own separate state instance."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Component A &amp; B -&gt; Custom Composable useFetch() (Isolated State)</text></svg>`,
    realWorldExample: `// Consuming custom composable in component:
<script setup>
import { useFetch } from '@/composables/useFetch';
const { data: users, loading } = useFetch('https://api.example.com/users');
</script>`,
    commonUseCases: [
      "Extracting API data fetching logic (useFetch)",
      "Syncing reactive state with browser localStorage (useLocalStorage)",
      "Tracking browser window dimensions (useWindowSize)"
    ],
    commonMistakes: [
      "Naming composables without the required 'use' prefix (e.g. fetchData instead of useFetch)",
      "Using legacy Vue 2 Mixins in Vue 3 (Mixins cause property name collisions; use Composables!)"
    ],
    bestPractices: [
      "Name all custom composables with 'use' prefix (e.g. useAuth, useDebounce)",
      "Return plain object containing refs from composable functions"
    ],
    whenToUse: ["Whenever stateful reactive logic is duplicated across multiple components"],
    whenNotToUse: ["Do not create composables for pure non-reactive utility functions"],
    relatedConcepts: ["Composables", "Composition API", "VueUse Library", "Provide/Inject"],
    comparison: {
      title: "Vue 2 Mixins vs Vue 3 Composables",
      headers: ["Aspect", "Vue 2 Mixins", "Vue 3 Composables"],
      rows: [
        ["Property Collisions", "High (Implicit property overrides)", "Zero (Explicit named destructuring)"],
        ["Source Transparency", "Implicit (Hard to trace where properties originate)", "Explicit (Clear import & function invocation)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why are Vue 3 Composables superior to Vue 2 Mixins?", answer: "Vue 2 Mixins suffered from property name collisions and implicit property sources (making code hard to trace). Vue 3 Composables provide explicit data sources, zero property collisions via destructuring, and full TypeScript support." }
    ],
    practiceProblem: {
      description: "Write composable function declaration for useToggle.",
      starterCode: `export function useToggle() { const state = ref(false); return { state }; }`,
      testAssertion: "true",
      solution: `export function useToggle() { const state = ref(false); return { state }; }`
    },
    quickRevision: "★ Composables MUST start with 'use' prefix (useFetch).\n★ Replaces legacy Vue 2 Mixins.\n★ Shares stateful logic with explicit named return properties."
  }),

  // 8. SLOTS, TELEPORT & KEEPALIVE
  "vue-slots-teleport": createTopicSchema({
    id: "vue-slots-teleport",
    techId: "vue",
    title: "Slots, Scoped Slots, Teleport & KeepAlive",
    category: "Advanced Vue",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["vue-composables"],
    definition: "Slots enable component HTML composition (Default, Named, Scoped slots). Teleport renders DOM nodes outside parent hierarchy (e.g. Modal to <body>). KeepAlive caches component instances in memory.",
    simpleExplanation: "Slots let parents inject custom HTML into child components. Teleport moves modals directly into <body>. KeepAlive prevents components from unmounting.",
    whyDoesItExist: "Provides flexible layout composition and DOM rendering flexibility.",
    basicExample: `<!-- 1. Teleport Modal to body -->
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <slot name="header">Default Header</slot>
        <slot /> <!-- Default Slot -->
      </div>
    </div>
  </Teleport>
</template>

<!-- 2. KeepAlive Caching -->
<KeepAlive>
  <component :is="activeTabComponent" />
</KeepAlive>`,
    howItWorks: [
      "1. <slot> acts as placeholder for parent HTML markup.",
      "2. <Teleport to='body'> mounts target DOM node under <body> element while retaining Vue component reactivity.",
      "3. <KeepAlive> caches unmounted component instances in RAM memory."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Teleport -&gt; Mounts DOM to &lt;body&gt; | KeepAlive -&gt; Caches Component Instance</text></svg>`,
    realWorldExample: `<!-- Scoped Slot: Passing child data to parent template slot: -->
<!-- ChildComponent.vue: <slot :item="item" /> -->
<!-- Parent: <Child v-slot="{ item }"> {{ item.title }} </Child> -->`,
    commonUseCases: [
      "Rendering full-screen Modal overlays with <Teleport to='body'>",
      "Caching multi-tab form data with <KeepAlive>",
      "Building reusable Data Table UI components using Scoped Slots"
    ],
    commonMistakes: [
      "CSS z-index overflow bugs when rendering Modals without Teleport",
      "Expecting KeepAlive components to execute unmount lifecycle hooks (KeepAlive triggers activated/deactivated hooks instead!)"
    ],
    bestPractices: [
      "Use Teleport for Modals, Tooltips, and Dropdowns to prevent CSS z-index stacking issues",
      "Use KeepAlive for tabbed interfaces to preserve form state"
    ],
    whenToUse: ["In UI component design and modal rendering"],
    whenNotToUse: ["Do not wrap every component in KeepAlive unnecessarily"],
    relatedConcepts: ["Slots", "Scoped Slots", "Teleport", "KeepAlive", "v-slot"],
    comparison: {
      title: "Teleport vs Standard Component Rendering",
      headers: ["Aspect", "Standard Rendering", "Teleport (<Teleport to='body'>)"],
      rows: [
        ["DOM Location", "Child node inside parent container element", "Mounted directly under target DOM node (e.g. <body>)"],
        ["Reactivity & Props", "Standard Vue reactivity", "Retains full parent Vue component reactivity & props"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What problem does the <Teleport> component solve in Vue 3?", answer: "<Teleport> allows you to render a component's HTML DOM nodes at a different location in the DOM tree (e.g. directly under `<body>`), avoiding CSS `z-index` and `overflow: hidden` parent clipping bugs while maintaining full Vue component reactivity." }
    ],
    practiceProblem: {
      description: "Write Teleport tag syntax mounting to body.",
      starterCode: `<Teleport to="body">\n  <div>Modal</div>\n</Teleport>`,
      testAssertion: "true",
      solution: `<Teleport to="body">\n  <div>Modal</div>\n</Teleport>`
    },
    quickRevision: "★ <slot> allows parent HTML injection into child components.\n★ <Teleport to='body'> mounts DOM nodes directly to <body>.\n★ <KeepAlive> caches component instances (uses activated/deactivated hooks)."
  }),

  // 9. PERFORMANCE OPTIMIZATION
  "vue-performance": createTopicSchema({
    id: "vue-performance",
    techId: "vue",
    title: "Vue 3 Performance: v-once, v-memo, Async Components & ShallowRef",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["vue-slots-teleport"],
    definition: "Performance optimization in Vue 3 includes v-once (skip re-renders), v-memo (conditional sub-tree re-rendering), defineAsyncComponent (code splitting), and shallowRef / shallowReactive (avoid deep proxy overhead).",
    simpleExplanation: "v-memo caches template sub-trees unless specified dependencies change, while defineAsyncComponent lazy-loads heavy components.",
    whyDoesItExist: "Prevents UI lag and reduces initial bundle load times in large applications.",
    basicExample: `<!-- 1. v-memo Sub-tree Memoization -->
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>{{ item.name }} - {{ item.status }}</p>
</div>

<!-- 2. defineAsyncComponent Lazy Loading -->
<script setup>
import { defineAsyncComponent } from 'vue';
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'));
</script>`,
    howItWorks: [
      "1. v-memo evaluates dependency array; if unchanged, skips Virtual DOM diffing entirely.",
      "2. shallowRef() creates reactivity for .value root reference only, ignoring deep object mutations.",
      "3. defineAsyncComponent loads component JavaScript bundle only when rendered."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">v-memo Dependency Check -&gt; Unchanged -&gt; Skip Virtual DOM Diffing</text></svg>`,
    realWorldExample: `// Using shallowRef for massive 10,000-item read-only chart datasets:
import { shallowRef } from 'vue';
const chartData = shallowRef(hugeArray);`,
    commonUseCases: [
      "Optimizing long list items (1,000+ rows) with v-memo",
      "Using shallowRef for large immutable data objects (charts, map markers)",
      "Lazy-loading heavy modals with defineAsyncComponent"
    ],
    commonMistakes: [
      "Using ref() for massive 50MB 3D model data objects (causes deep proxy overhead; use shallowRef instead!)",
      "Misusing v-memo with empty dependency array v-memo='[]' (equivalent to v-once)"
    ],
    bestPractices: [
      "Use shallowRef() for large, complex, read-only data structures",
      "Use v-memo for optimizing large dynamic v-for lists"
    ],
    whenToUse: ["When profiling reveals Virtual DOM re-rendering bottlenecks"],
    whenNotToUse: ["Do not use shallowRef if deep reactivity is required"],
    relatedConcepts: ["v-memo", "v-once", "shallowRef", "defineAsyncComponent"],
    comparison: {
      title: "ref() vs shallowRef()",
      headers: ["Hook", "Reactivity Depth", "Best Used For"],
      rows: [
        ["ref()", "Deep (Converts all nested object properties into reactive proxies)", "Standard component state"],
        ["shallowRef()", "Shallow (.value root reference mutation only)", "Massive read-only datasets, 3D engines, Map instances"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is shallowRef() in Vue 3 and when should you use it?", answer: "shallowRef() creates a ref that tracks reactivity ONLY for its `.value` root assignment, skipping deep reactive proxy conversion of nested object properties. Use it for massive, complex read-only datasets to eliminate deep Proxy overhead." }
    ],
    practiceProblem: {
      description: "Write directive syntax for sub-tree memoization based on item.id.",
      starterCode: `v-memo="[item.id]"`,
      testAssertion: "true",
      solution: `v-memo="[item.id]"`
    },
    quickRevision: "★ v-memo skips Virtual DOM diffing if dependencies are unchanged.\n★ shallowRef() tracks root .value only (eliminates deep Proxy overhead).\n★ defineAsyncComponent lazy-loads component bundles."
  }),

  // 10. DIRECTIVES & PLUGINS
  "vue-directives-plugins": createTopicSchema({
    id: "vue-directives-plugins",
    techId: "vue",
    title: "Custom Directives (v-focus, v-lazy) & Creating Vue Plugins",
    category: "Advanced Vue",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["vue-performance"],
    definition: "Custom Directives provide direct DOM manipulation hooks (mounted, updated, unmounted). Vue Plugins package reusable global functionality installed via app.use().",
    simpleExplanation: "Custom directives let you write custom DOM helpers (like v-focus to auto-focus an input), while Plugins package global utilities.",
    whyDoesItExist: "Extends Vue functionality and encapsulates low-level DOM manipulations.",
    basicExample: `// 1. Custom Directive (v-focus)
const vFocus = {
  mounted: (el) => el.focus()
};

// 2. Creating a Reusable Vue Plugin
const myPlugin = {
  install(app, options) {
    app.config.globalProperties.$appName = 'My Vue App';
    app.directive('focus', vFocus);
  }
};

// Installation: app.use(myPlugin);`,
    howItWorks: [
      "1. Custom Directive lifecycle hooks (created, mounted, updated, unmounted) execute on target DOM element.",
      "2. Plugin install(app) method registers global components, directives, or provide values.",
      "3. Mounted via main.js app.use(plugin)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">app.use(Plugin) -&gt; plugin.install(app) -&gt; Registers Directives &amp; Globals</text></svg>`,
    realWorldExample: `// Custom v-click-outside directive for dropdowns:
const vClickOutside = {
  mounted(el, binding) {
    el.__clickOutsideHandler__ = (e) => {
      if (!(el === e.target || el.contains(e.target))) binding.value(e);
    };
    document.addEventListener('click', el.__clickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutsideHandler__);
  }
};`,
    commonUseCases: [
      "Creating v-focus directives for input element auto-focus",
      "Building v-click-outside directives for closing dropdown menus",
      "Packaging reusable UI component libraries into Vue Plugins"
    ],
    commonMistakes: [
      "Overusing custom directives for logic that could be handled cleanly with standard components or composables",
      "Forgetting to clean up event listeners in unmounted directive hooks"
    ],
    bestPractices: [
      "Remove all event listeners in the unmounted directive hook to prevent memory leaks",
      "Use Plugins to encapsulate global component library installations"
    ],
    whenToUse: ["When low-level direct DOM manipulation is required across multiple elements"],
    whenNotToUse: ["Do not use custom directives if standard template bindings suffice"],
    relatedConcepts: ["Custom Directives", "v-focus", "Directive Hooks", "Vue Plugins"],
    comparison: {
      title: "Directive Hooks vs Component Lifecycle Hooks",
      headers: ["Directive Hook", "Target", "Executed When"],
      rows: [
        ["mounted(el, binding)", "Raw DOM Element", "Target DOM element is attached to document"],
        ["updated(el, binding)", "Raw DOM Element", "Target DOM element or parent component updates"],
        ["unmounted(el, binding)", "Raw DOM Element", "Target DOM element is removed from document"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How do you create and register a custom directive in Vue 3?", answer: "Define an object containing lifecycle hooks (e.g. `mounted(el, binding)`). Register it globally via `app.directive('focus', vFocus)` or locally inside `<script setup>` by prefixing the variable name with `v` (e.g. `const vFocus = { mounted: (el) => el.focus() }`)." }
    ],
    practiceProblem: {
      description: "Write custom directive object with mounted hook.",
      starterCode: `const vFocus = { mounted: el => el.focus() };`,
      testAssertion: "true",
      solution: `const vFocus = { mounted: el => el.focus() };`
    },
    quickRevision: "★ Custom Directives manipulate raw DOM elements directly.\n★ Directive Hooks: created, mounted, updated, unmounted.\n★ Vue Plugins expose install(app, options) method."
  }),

  // 11. NUXT 3 & SSR
  "vue-nuxt": createTopicSchema({
    id: "vue-nuxt",
    techId: "vue",
    title: "Nuxt 3 Architecture, SSR Rendering & File-System Routing",
    category: "Fullstack Vue",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["vue-directives-plugins"],
    definition: "Nuxt 3 is the intuitive Vue framework for building Fullstack and SSR (Server-Side Rendering) applications, featuring automatic file-system routing (pages/), auto-imports, and Nitro server backend.",
    simpleExplanation: "Nuxt 3 provides server-side rendering (SSR), file-system routing, and built-in SEO tools for Vue 3.",
    whyDoesItExist: "Delivers fast initial page loads, optimal SEO search indexing, and fullstack capabilities to Vue.",
    basicExample: `// pages/users/[id].vue (Auto-routed to /users/:id!)
<script setup>
const route = useRoute();
// Auto-imported useFetch with Universal SSR execution!
const { data: user } = await useFetch(\`https://api.example.com/users/\${route.params.id}\`);
</script>

<template>
  <div>
    <h1>User: {{ user?.name }}</h1>
  </div>
</template>`,
    howItWorks: [
      "1. Nitro engine pre-renders HTML on Node server for incoming request.",
      "2. Sends fully formed HTML string to browser for instant search engine indexing.",
      "3. Client hydrates HTML string into interactive Vue 3 SPA application."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Server Request -&gt; Nitro SSR HTML Pre-render -&gt; Client Hydration</text></svg>`,
    realWorldExample: `// Nuxt 3 server API route (server/api/health.ts):
export default defineEventHandler((event) => {
  return { status: 'UP' };
});`,
    commonUseCases: [
      "Building SEO-optimized Vue 3 applications",
      "Using File-System Routing in pages/ directory",
      "Building fullstack web applications with Nitro server routes"
    ],
    commonMistakes: [
      "Accessing browser-only globals (window, document) during server-side pre-rendering without checking process.client or onMounted",
      "Manually importing Vue composables in Nuxt (Nuxt auto-imports ref, computed, useRoute, useFetch automatically!)"
    ],
    bestPractices: [
      "Use useFetch() for data fetching in Nuxt 3 to prevent double-fetching on client hydration",
      "Wrap browser-only code inside onMounted() or <ClientOnly>"
    ],
    whenToUse: ["In all production fullstack and SEO-sensitive Vue applications"],
    whenNotToUse: ["Do not access window object during top-level setup in SSR"],
    relatedConcepts: ["Nuxt 3", "SSR", "Nitro Engine", "Auto-imports", "pages/ Directory"],
    comparison: {
      title: "Vue 3 SPA vs Nuxt 3 SSR",
      headers: ["Metric", "Vue 3 SPA", "Nuxt 3 SSR"],
      rows: [
        ["Initial Page Load", "Slower (Downloads empty HTML & full JS bundle first)", "Fast (Pre-rendered HTML sent immediately)"],
        ["SEO Indexing", "Requires client JS execution", "Optimal (Search engines read pre-rendered HTML)"],
        ["Routing", "Manual Vue Router setup", "Automatic File-System Routing (pages/)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is useFetch() preferred over standard fetch() inside Nuxt 3 components?", answer: "useFetch() prevents double data fetching. During Server-Side Rendering (SSR), useFetch() fetches data on the server and embeds the payload in the HTML payload so the client reuses the payload during hydration without making an extra network call." }
    ],
    practiceProblem: {
      description: "Write Nuxt 3 composable for SSR data fetching.",
      starterCode: `const { data } = await useFetch('/api/users');`,
      testAssertion: "true",
      solution: `const { data } = await useFetch('/api/users');`
    },
    quickRevision: "★ Nuxt 3 provides SSR pre-rendering & file-system routing.\n★ Auto-imports ref, computed, useRoute, and useFetch.\n★ Wrap browser-only code (window) in onMounted() or <ClientOnly>."
  })
};
