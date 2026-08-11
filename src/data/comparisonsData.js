export const comparisonsData = [
  {
    id: "laravel-vs-nodejs",
    title: "Laravel vs Node.js",
    category: "Backend Frameworks",
    tech1: "Laravel (PHP)",
    tech2: "Node.js (JavaScript)",
    summary: "Laravel is an opinionated batteries-included PHP framework ideal for rapid enterprise monolith development. Node.js is an event-driven asynchronous runtime ideal for high-concurrency microservices and real-time streaming.",
    
    specGrid: [
      { feature: "Primary Language", tech1: "PHP 8.x", tech2: "JavaScript / TypeScript" },
      { feature: "Architecture Model", tech1: "MVC Monolith (Sync per request thread)", tech2: "Single-Threaded Non-blocking Event Loop" },
      { feature: "Batteries Included?", tech1: "Yes (Eloquent ORM, Auth, Queues, Mail out-of-the-box)", tech2: "No (Requires NPM package ecosystem selection)" },
      { feature: "Concurrency Handling", tech1: "Multi-process (FPM) / Swoole / Octane", tech2: "Asynchronous Non-blocking I/O Event Loop" },
      { feature: "Database ORM", tech1: "Eloquent ORM (Active Record)", tech2: "Prisma, TypeORM, Mongoose (Data Mapper / NoSQL)" },
      { feature: "Learning Curve", tech1: "Low to Moderate (Structured conventions)", tech2: "Moderate (Async flow management)" }
    ],

    tradeoffs: [
      { aspect: "Development Speed", verdict: "Laravel Wins", explanation: "Laravel provides ready auth, migrations, admin scaffolding, and queues out of the box." },
      { aspect: "High Concurrency & Real-Time I/O", verdict: "Node.js Wins", explanation: "Node's non-blocking I/O handles 100k concurrent WebSocket connections with low RAM footprint." },
      { aspect: "Ecosystem & Code Sharing", verdict: "Node.js Wins", explanation: "Allows sharing models, types, and logic between React/Next.js frontend and Node backend." }
    ],

    codeComparison: {
      tech1Code: `// Laravel Route & Controller
Route::get('/users', function() {
    return User::where('active', true)->paginate(15);
});`,
      tech2Code: `// Node.js + Express Route
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ where: { active: true }, take: 15 });
    res.json(users);
});`
    },

    interviewQuestions: [
      "When would you choose Laravel over Node.js for a new enterprise backend application?",
      "How does Laravel Octane compare to Node.js in terms of memory persistence?"
    ]
  },

  {
    id: "mongodb-vs-mysql",
    title: "MongoDB vs MySQL",
    category: "Databases & Storage",
    tech1: "MongoDB (NoSQL Document)",
    tech2: "MySQL (Relational SQL)",
    summary: "MongoDB stores schema-less JSON-like BSON documents allowing rapid schema iteration. MySQL is an ACID-compliant relational SQL database enforcing strict schemas with relational foreign key joins.",
    
    specGrid: [
      { feature: "Data Structure", tech1: "Dynamic JSON/BSON Documents", tech2: "Structured Tables, Rows, Columns" },
      { feature: "Schema Enforce", tech1: "Flexible / Dynamic Schema", tech2: "Strict Rigid Schema" },
      { feature: "ACID Compliance", tech1: "Multi-document ACID (since v4.0)", tech2: "Full ACID Compliance natively" },
      { feature: "Query Language", tech1: "MQL (MongoDB Query Language)", tech2: "Standard SQL" },
      { feature: "Scaling Strategy", tech1: "Horizontal Sharding natively", tech2: "Vertical Scaling / Read Replicas" }
    ],

    tradeoffs: [
      { aspect: "Unstructured / Evolving Data", verdict: "MongoDB Wins", explanation: "Allows nesting varied catalog properties without expensive DDL migrations." },
      { aspect: "Complex Relational Joins", verdict: "MySQL Wins", explanation: "Relational foreign keys and SQL joins enforce data integrity effortlessly." }
    ],

    codeComparison: {
      tech1Code: `// MongoDB Insert Document
db.orders.insertOne({
  user_id: ObjectId("60d5ec..."),
  items: [{ sku: "A1", qty: 2 }]
});`,
      tech2Code: `-- MySQL Relational Insert
INSERT INTO orders (user_id, status) VALUES (1, 'pending');
INSERT INTO order_items (order_id, sku, qty) VALUES (LAST_INSERT_ID(), 'A1', 2);`
    },

    interviewQuestions: [
      "Why would an e-commerce platform use MySQL for payments and MongoDB for product catalog?",
      "Explain how MongoDB handles sharding vs MySQL database replication."
    ]
  },

  {
    id: "rest-vs-graphql",
    title: "REST API vs GraphQL",
    category: "Architecture & Protocols",
    tech1: "REST API",
    tech2: "GraphQL",
    summary: "REST API relies on fixed HTTP endpoints returning standard resources. GraphQL exposes a single flexible endpoint allowing clients to query exact fields, eliminating over-fetching and under-fetching.",
    
    specGrid: [
      { feature: "Endpoints", tech1: "Multiple endpoints (/users, /orders)", tech2: "Single POST endpoint (/graphql)" },
      { feature: "Data Fetching", tech1: "Fixed payload size per endpoint", tech2: "Client requests specific field shape" },
      { feature: "Over-fetching", tech1: "Common issue", tech2: "Eliminated completely" },
      { feature: "Caching", tech1: "Native HTTP Browser / CDN Caching", tech2: "Requires Client-side cache (Apollo/Relay)" }
    ],

    tradeoffs: [
      { aspect: "API Simplicity & Tooling", verdict: "REST Wins", explanation: "Universal HTTP caching and standard HTTP status codes simplify integration." },
      { aspect: "Mobile App Performance", verdict: "GraphQL Wins", explanation: "Fetches nested user, post, and comment data in a single network roundtrip." }
    ],

    codeComparison: {
      tech1Code: `// REST Request
GET /api/users/123

// Response contains 40 fields even if you only need 'name'`,
      tech2Code: `# GraphQL Query
query {
  user(id: "123") {
    name
    email
  }
}`
    },

    interviewQuestions: [
      "What is the N+1 problem in GraphQL resolvers and how does DataLoader solve it?",
      "Why is HTTP caching harder to implement in GraphQL than REST?"
    ]
  },

  {
    id: "monolith-vs-microservices",
    title: "Monolith vs Microservices",
    category: "System Design",
    tech1: "Monolithic Architecture",
    tech2: "Microservices Architecture",
    summary: "A Monolith bundles all business capabilities into a single executable codebase and database. Microservices decompose application domains into independent, loosely coupled services communicating via APIs/queues.",
    
    specGrid: [
      { feature: "Deployment Unit", tech1: "Single binary / app deployment", tech2: "Independent multi-service deployments" },
      { feature: "Database", tech1: "Shared Database", tech2: "Database-per-Service" },
      { feature: "Operational Complexity", tech1: "Low initial complexity", tech2: "High (Requires K8s, Distributed Tracing, CI/CD)" },
      { feature: "Tech Stack", tech1: "Single unified stack", tech2: "Polyglot (Node, Go, Python per service)" }
    ],

    tradeoffs: [
      { aspect: "Startup Speed & Simplicity", verdict: "Monolith Wins", explanation: "No network latency overhead or complex distributed transactions." },
      { aspect: "Independent Scalability", verdict: "Microservices Wins", explanation: "Allows scaling payment microservice independently from user catalog service." }
    ],

    codeComparison: {
      tech1Code: `// Monolith Method Call
const order = orderService.createOrder(userId, items);
const payment = paymentService.charge(order.id, amount); // Synchronous memory call`,
      tech2Code: `// Microservices Event-Driven Call
await eventBridge.publish({
  type: "ORDER_CREATED",
  payload: { orderId, userId, amount }
}); // Async Message Bus (RabbitMQ/Kafka)`
    },

    interviewQuestions: [
      "What is the Saga Pattern and why is it required in Microservices database transactions?",
      "What indicators signal that a Monolith should be refactored into Microservices?"
    ]
  }
];
