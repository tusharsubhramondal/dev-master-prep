export const masterData = {
  react: {
    id: "react",
    name_bn: "React.js",
    name_en: "React.js",
    icon: "fa-brands fa-react",
    color: "#61dafb",
    badge: "10 Modules",
    title_bn: "React.js Master Interview Guide (Junior → Lead)",
    title_en: "React.js Master Interview Guide (Junior → Lead)",
    desc_bn: "Virtual DOM, Fiber Engine, All 14+ Hooks, Performance Tuning এবং Senior Patterns এর পূর্ণাঙ্গ সংকলন।",
    desc_en: "Complete guide covering Virtual DOM, Fiber Engine, All 14+ Hooks, Performance Tuning, and Senior Patterns.",
    modules: [
      {
        id: "m1",
        level: "junior",
        title_bn: "১. Virtual DOM এবং Reconciliation (Diffing Algorithm)",
        title_en: "1. Virtual DOM & Reconciliation (Diffing Algorithm)",
        content_bn: `
          <p><strong>Virtual DOM কী?</strong> React মেমোরিতে আসল DOM-এর একটি হালকা জাভাস্ক্রিপ্ট অবজেক্ট রিপ্রেজেন্টেশন তৈরি করে রাখে।</p>
          <p><strong>Reconciliation:</strong> স্টেট বা প্রপস পাল্টালে React একটি নতুন Virtual DOM তৈরি করে। পুরানো ও নতুন Virtual DOM-এর মধ্যে তুলনা করে (Diffing Algorithm) ও O(n³) জটিলতাকে O(n)-এ নামিয়ে এনে কেবল পরিবর্তিত অংশটুকু ব্রাউজারের আসল DOM-এ আপডেট করে।</p>
        `,
        content_en: `
          <p><strong>Virtual DOM:</strong> React maintains a lightweight JavaScript object representation of the real DOM in memory.</p>
          <p><strong>Reconciliation:</strong> When state changes, React compares old Virtual DOM with new Virtual DOM (Diffing) to update only changed DOM nodes in O(n) time complexity.</p>
        `,
        code: `// Babel Transpilation Example
const element = <h1 className="title">Hello World</h1>;

// Babel converts this into:
const element = React.createElement('h1', { className: 'title' }, 'Hello World');`,
        qa_bn: {
          q: "Parent স্টেট পাল্টালে Child কি রিরেন্ডার হবে?",
          a: "হ্যাঁ, বাই ডিফল্ট Parent রিরেন্ডার হলে তার সব Child রিরেন্ডার হবে, যতক্ষণ না Child-কে React.memo দিয়ে আটকানো হয়।"
        },
        qa_en: {
          q: "Will a Child component re-render when Parent state changes?",
          a: "Yes, by default all child components re-render when parent state updates, unless wrapped with React.memo."
        }
      },
      {
        id: "m2",
        level: "senior",
        title_bn: "২. React Fiber Engine Architecture",
        title_en: "2. React Fiber Engine Architecture",
        content_bn: `
          <p><strong>React Fiber:</strong> React 16-এর নতুন আসিনক্রোনাস রেন্ডারিং ইঞ্জিন। এটি রেন্ডার কাজকে ছোট ছোট Fiber Node ইউনিটে ভাগ করে ব্রাউজারের ফাঁকা সময় (Idle callback) অনুযায়ী প্রাধান্য (Priority) মেনে কাজ সম্পন্ন করে।</p>
          <p><strong>Render Phase vs Commit Phase:</strong> Render Phase হলো আসিনক্রোনাস ও ইন্টারাপ্টিবল (Interruptible)। Commit Phase হলো সিনক্রোনাস এবং যেখানে আসল DOM আপডেট করা হয়।</p>
        `,
        content_en: `
          <p><strong>React Fiber:</strong> The asynchronous rendering engine introduced in React 16. It breaks render work into small Fiber Node units and executes them based on priority during browser idle time.</p>
          <p><strong>Render Phase vs Commit Phase:</strong> Render phase is asynchronous and interruptible. Commit phase is synchronous where actual DOM mutations occur.</p>
        `,
        code: `// Priority Scheduling Concept
// High Priority: User typing, button clicks
// Low Priority: Heavy list rendering (managed via useTransition)`,
        qa_bn: {
          q: "Stale Closure কী এবং কীভাবে সমাধান করবেন?",
          a: "যখন কোনো ইফেক্ট বা ইভেন্ট হ্যান্ডলার পুরোনো রেন্ডারের স্টেট ভ্যালু মেমোরাইজ করে আটকে রাখে। সমাধান: Dependency array সঠিক দেওয়া বা setState(prev => prev + 1) ব্যবহার করা।"
        },
        qa_en: {
          q: "What is a Stale Closure and how to fix it?",
          a: "When a hook captures an old render's variable. Fixed by keeping correct dependency arrays or functional updates setState(prev => prev + 1)."
        }
      }
    ]
  },

  angular: {
    id: "angular",
    name_bn: "Angular",
    name_en: "Angular",
    icon: "fa-brands fa-angular",
    color: "#dd0031",
    badge: "9 Modules",
    title_bn: "Angular Senior Developer Master Guide",
    title_en: "Angular Senior Developer Master Guide",
    desc_bn: "Zone.js, Change Detection Strategy (OnPush), Angular Signals, Hierarchical DI এবং RxJS Operators এর বিস্তারিত গাইড।",
    desc_en: "In-depth guide covering Zone.js, Change Detection Strategy (OnPush), Angular Signals, Hierarchical DI, and RxJS Operators.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Change Detection Strategy (Default vs OnPush)",
        title_en: "1. Change Detection Strategy (Default vs OnPush)",
        content_bn: `
          <p><strong>Zone.js:</strong> ব্রাউজারের আসিনক্রোনাস APIs (setTimeout, addEventListener) Monkey-patch করে Dirty Checking চালায়।</p>
          <p><strong>OnPush Strategy:</strong> কম্পোনেন্টের চেঞ্জ ডিটেকশন স্কিপ করে পারফরম্যান্স বাড়ায়। এটি কেবল ৪টি শর্তে রিরেন্ডার হয়: Input reference পরিবর্তন, Event emission, AsyncPipe, এবং markForCheck() কল করলে।</p>
        `,
        content_en: `
          <p><strong>Zone.js:</strong> Monkey-patches asynchronous APIs to trigger dirty checking across the component tree.</p>
          <p><strong>OnPush Strategy:</strong> Skips unnecessary change detection cycles. Re-renders only on Input reference change, Event emitted, AsyncPipe, or explicit markForCheck().</p>
        `,
        code: `@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush Performance Tuning
})
export class UserCardComponent {
  @Input() user!: User;
}`,
        qa_bn: {
          q: "Angular Signals কী এবং কেন Zone.js ছাড়াই কাজ করে?",
          a: "Signals হলো Angular 16+ এর ফাইন-গ্রেইনড রিঅ্যাক্টিভিটি সিস্টেম। এটি নির্দিষ্ট ডম নোড ট্র্যাক করতে পারে, ফলে পুরো ট্রি চেকিং-এর জন্য Zone.js লাগে না।"
        },
        qa_en: {
          q: "What are Angular Signals and why do they eliminate Zone.js?",
          a: "Signals provide fine-grained reactivity in Angular 16+. They track specific DOM node dependencies, allowing targeted updates without scanning the entire component tree via Zone.js."
        }
      }
    ]
  },

  javascript: {
    id: "javascript",
    name_bn: "JavaScript",
    name_en: "JavaScript",
    icon: "fa-brands fa-js",
    color: "#f7df1e",
    badge: "9 Modules",
    title_bn: "JavaScript Master Guide",
    title_en: "JavaScript Master Guide",
    desc_bn: "V8 Engine, Execution Context, Event Loop (MicroTask/MacroTask), Closure, Prototypes এবং Polyfills।",
    desc_en: "Deep dive into V8 Engine, Execution Context, Event Loop, Closures, Prototypes, and Custom Polyfills.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Event Loop & MicroTask Queue Primacy",
        title_en: "1. Event Loop & MicroTask Queue Primacy",
        content_bn: `
          <p><strong>Event Loop Rules:</strong> ১. Call Stack খালি হতে হবে। ২. MicroTask Queue (Promises, queueMicrotask) সম্পূর্ণ খালি করতে হবে। ৩. এরপর MacroTask Queue (setTimeout, setInterval) থেকে ১টি কাজ স্ট্যাকে যাবে।</p>
        `,
        content_en: `
          <p><strong>Event Loop Rules:</strong> 1. Call stack must be empty. 2. Entire MicroTask Queue (Promises, queueMicrotask) must be processed first. 3. Then 1 task from MacroTask Queue (setTimeout, setInterval) is pushed to stack.</p>
        `,
        code: `console.log('1');
setTimeout(() => console.log('2'), 0); // MacroTask
Promise.resolve().then(() => console.log('3')); // MicroTask
console.log('4');
// Output: 1, 4, 3, 2`,
        qa_bn: {
          q: "Hoisting এবং Temporal Dead Zone (TDZ) কী?",
          a: "Creation Phase-এ ভ্যারিয়েবল মেমোরিতে স্থান নেওয়া হলো Hoisting। let/const ডিক্লেয়ার করার আগে এক্সেস না করতে পারার সময়টুকুই হলো TDZ (ReferenceError)।"
        },
        qa_en: {
          q: "What is Hoisting and Temporal Dead Zone (TDZ)?",
          a: "Hoisting is memory allocation during Creation Phase. TDZ is the time period between scope start and let/const variable declaration where accessing it throws ReferenceError."
        }
      }
    ]
  },

  mongodb: {
    id: "mongodb",
    name_bn: "MongoDB",
    name_en: "MongoDB",
    icon: "fa-solid fa-database",
    color: "#00ed64",
    badge: "9 Modules",
    title_bn: "MongoDB Master Guide",
    title_en: "MongoDB Master Guide",
    desc_bn: "BSON, Aggregation Framework, B-Tree Indexing (ESR Rule), Replication, Sharding এবং Mongoose Transactions।",
    desc_en: "Covers BSON, Aggregation Pipeline, B-Tree Indexing (ESR Rule), Replication, Sharding, and Mongoose ACID Transactions.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Aggregation Pipeline & Complex Queries",
        title_en: "1. Aggregation Pipeline & Complex Queries",
        content_bn: `
          <p>Aggregation Pipeline একাধিক ধাপে ডাটা প্রসেস করে ($match -> $lookup -> $unwind -> $group -> $project)।</p>
        `,
        content_en: `
          <p>Aggregation pipeline processes documents through multi-stage pipelines ($match -> $lookup -> $unwind -> $group -> $project).</p>
        `,
        code: `db.orders.aggregate([
  { $match: { status: "COMPLETED" } },
  { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
  { $unwind: "$product" },
  { $group: { _id: "$product.category", totalSales: { $sum: "$price" } } }
]);`,
        qa_bn: {
          q: "ESR Rule কী এবং কীভাবে Compound Index বানাবেন?",
          a: "Equality ফিল্ড আগে, Sort ফিল্ড মাঝখানে এবং Range ফিল্ড সবার শেষে রেখে ইনডেক্স তৈরি করাই হলো ESR Rule।"
        },
        qa_en: {
          q: "What is the ESR Rule for Compound Indexing?",
          a: "Equality fields first, Sort fields second, and Range fields last when defining compound index keys."
        }
      }
    ]
  },

  graphql: {
    id: "graphql",
    name_bn: "GraphQL",
    name_en: "GraphQL",
    icon: "fa-solid fa-project-diagram",
    color: "#e10098",
    badge: "8 Modules",
    title_bn: "GraphQL Master Guide",
    title_en: "GraphQL Master Guide",
    desc_bn: "REST vs GraphQL, Resolvers, N+1 Problem সমাধান (DataLoader), Apollo Server এবং Apollo Federation।",
    desc_en: "Covers REST vs GraphQL, Resolvers, Solving N+1 Problem with DataLoader, Apollo Server, and Federation.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. The N+1 Problem & DataLoader Solution",
        title_en: "1. The N+1 Problem & DataLoader Solution",
        content_bn: `
          <p><strong>N+1 Problem:</strong> নেস্টেড কুয়েরিতে চাইল্ড রিজলভার প্রতিটি আইটেমের জন্য আলাদা ডাটাবেস কুয়েরি চালালে ডাটাবেস ক্র্যাশ করে।</p>
          <p><strong>DataLoader Solution:</strong> Event loop-এর একই টিকে একাধিক আইডিকে ব্যাচ করে ১টি IN কুয়েরিতে রূপান্তর করে (Batching & Caching)।</p>
        `,
        content_en: `
          <p><strong>N+1 Problem:</strong> Child resolvers executing separate database queries for every parent item, causing exponential DB hits.</p>
          <p><strong>DataLoader Solution:</strong> Batches multiple individual ID requests into a single 'WHERE id IN (...)' query using event loop ticks.</p>
        `,
        code: `const batchUsers = async (keys) => {
  const users = await User.find({ _id: { $in: keys } });
  return keys.map(k => users.find(u => u.id === k));
};
const userLoader = new DataLoader(batchUsers);`,
        qa_bn: {
          q: "GraphQL Resolver Signature কী?",
          a: "(parent, args, context, info) — যেখানে context এ Auth User, DB connections এবং DataLoaders শেয়ার করা হয়।"
        },
        qa_en: {
          q: "What is a GraphQL Resolver Signature?",
          a: "(parent, args, context, info) — where context shares Auth tokens, Database instances, and DataLoaders across resolvers."
        }
      }
    ]
  },

  docker: {
    id: "docker",
    name_bn: "Docker",
    name_en: "Docker",
    icon: "fa-brands fa-docker",
    color: "#2496ed",
    badge: "8 Modules",
    title_bn: "Docker Master Guide",
    title_en: "Docker Master Guide",
    desc_bn: "Containerization Mechanics (cgroups/namespaces), Multi-Stage Dockerfile, Docker Compose, Storage & Networking।",
    desc_en: "Covers Containerization mechanics (cgroups/namespaces), Multi-Stage Dockerfiles, Docker Compose, Volumes, and Networking.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Production Multi-Stage Dockerfile Optimization",
        title_en: "1. Production Multi-Stage Dockerfile Optimization",
        content_bn: `
          <p>Multi-Stage Build দিয়ে ডেভেলপমেন্ট ডিপেন্ডেন্সি বাদ দিয়ে ফাইনাল ইমেজে শুধু বিল্ড ফাইল রাখায় ইমেজ সাইজ ১জিবি থেকে ৫০এমবিতে নেমে আসে।</p>
        `,
        content_en: `
          <p>Multi-Stage builds discard dev dependencies, creating minimal production images (reducing size from 1GB to ~50MB).</p>
        `,
        code: `# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runner Stage
FROM node:18-alpine AS runner
USER node
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]`,
        qa_bn: {
          q: "CMD এবং ENTRYPOINT-এর পার্থক্য কী?",
          a: "ENTRYPOINT স্থির এক্সিকিউটেবল বাইনারি সেট করে, আর CMD ডিফল্ট প্যারামিটার দেয় যা CLI থেকে ওভাররাইড করা যায়।"
        },
        qa_en: {
          q: "What is the difference between CMD and ENTRYPOINT?",
          a: "ENTRYPOINT specifies the fixed binary executable, while CMD provides default arguments that can be overridden via CLI."
        }
      }
    ]
  },

  kubernetes: {
    id: "kubernetes",
    name_bn: "Kubernetes",
    name_en: "Kubernetes",
    icon: "fa-solid fa-dharmachakra",
    color: "#326ce5",
    badge: "8 Modules",
    title_bn: "Kubernetes (K8s) Master Guide",
    title_en: "Kubernetes (K8s) Master Guide",
    desc_bn: "Control Plane Architecture, Workloads (Deployments/StatefulSets), Services, Ingress, Probes, HPA, RBAC & kubectl CLI।",
    desc_en: "Covers Control Plane Architecture, Workloads (Deployments/StatefulSets), Services, Ingress, Health Probes, HPA, RBAC & kubectl CLI.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Control Plane Components & Pod Lifecycle",
        title_en: "1. Control Plane Components & Pod Lifecycle",
        content_bn: `
          <p>Control Plane উপাদান: kube-apiserver (Front-end), etcd (Key-value store), kube-scheduler (Node selection), kube-controller-manager (Desired state loop)।</p>
        `,
        content_en: `
          <p>Control Plane components: kube-apiserver (Gateway), etcd (State KV store), kube-scheduler (Placement), kube-controller-manager (Reconciliation loops).</p>
        `,
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: web
        image: nginx:alpine`,
        qa_bn: {
          q: "Liveness Probe এবং Readiness Probe-এর পার্থক্য কী?",
          a: "Liveness probe পড ক্র্যাশ করলে রিস্টার্ট মারে। Readiness probe পড ট্রাফিক নেওয়ার জন্য তৈরি না হওয়া পর্যন্ত সার্ভিস থেকে আলাদা রাখে।"
        },
        qa_en: {
          q: "Difference between Liveness Probe and Readiness Probe?",
          a: "Liveness probe restarts a dead pod. Readiness probe stops routing service traffic until pod is ready."
        }
      }
    ]
  },

  rabbitmq: {
    id: "rabbitmq",
    name_bn: "RabbitMQ",
    name_en: "RabbitMQ",
    icon: "fa-solid fa-cubes",
    color: "#ff6600",
    badge: "7 Modules",
    title_bn: "RabbitMQ Master Guide",
    title_en: "RabbitMQ Master Guide",
    desc_bn: "AMQP 0-9-1 Protocol, Exchange Types (Direct, Fanout, Topic), Message Durability, Dead Letter Queue (DLQ) & Quorum Queues।",
    desc_en: "Covers AMQP Protocol, Exchange Types (Direct, Fanout, Topic), Message Durability, Dead Letter Queue (DLQ), and Quorum Queues.",
    modules: [
      {
        id: "m1",
        level: "senior",
        title_bn: "১. Exchange Types & Zero Message Loss Strategy",
        title_en: "1. Exchange Types & Zero Message Loss Strategy",
        content_bn: `
          <p><strong>Exchanges:</strong> Direct (Exact match), Fanout (Broadcast), Topic (Pattern match #/*), Headers.</p>
          <p><strong>Zero Message Loss:</strong> Publisher Confirms + Durable Queue (deliveryMode: 2) + Manual Consumer ACK (channel.ack(msg))।</p>
        `,
        content_en: `
          <p><strong>Exchanges:</strong> Direct (Exact match), Fanout (Broadcast), Topic (Pattern match #/*), Headers.</p>
          <p><strong>Zero Message Loss:</strong> Publisher Confirms + Durable Queue (deliveryMode: 2) + Manual Consumer ACK (channel.ack(msg)).</p>
        `,
        code: `// Node.js Consumer with Manual ACK
channel.consume(queue, (msg) => {
  if (msg) {
    processOrder(msg);
    channel.ack(msg); // Manual ACK
  }
}, { noAck: false });`,
        qa_bn: {
          q: "Dead Letter Exchange (DLX) কী?",
          a: "ব্যর্থ হওয়া, রিজেক্ট হওয়া বা এক্সপায়ার হওয়া (TTL) মেসেজগুলোকে চিরতরে না হারিয়ে যে নির্দিষ্ট ফেলওভার কিউতে (DLQ) পাঠানো হয়।"
        },
        qa_en: {
          q: "What is a Dead Letter Exchange (DLX)?",
          a: "An exchange to which messages are routed when they are rejected, expired (TTL), or fail processing, storing them safely in a DLQ."
        }
      }
    ]
  }
};
