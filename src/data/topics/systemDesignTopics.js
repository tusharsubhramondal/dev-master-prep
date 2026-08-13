import { createTopicSchema } from './createTopicSchema.js';

export const systemDesignTopics = {
  // 1. SCALABILITY FUNDAMENTALS
  "sd-scalability": createTopicSchema({
    id: "sd-scalability",
    techId: "system-design",
    title: "Scalability Fundamentals (Vertical vs Horizontal Scaling & Statelessness)",
    category: "System Design Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["System Architecture Basics"],
    definition: "Scalability is the capability of a system to handle growing amounts of work by adding resources. Vertical Scaling (Scaling Up) upgrades single-server hardware, while Horizontal Scaling (Scaling Out) adds more server instances into stateless pools.",
    simpleExplanation: "Vertical scaling buys a bigger computer server. Horizontal scaling adds 10 smaller computers behind a load balancer.",
    whyDoesItExist: "Allows web systems to scale from 1,000 users to 100,000,000 users without hardware ceiling limits.",
    basicExample: `# Vertical Scaling (Scaling Up):
Upgrade EC2 from t3.micro (1 vCPU, 1GB RAM) -> c6i.4xlarge (16 vCPU, 32GB RAM)

# Horizontal Scaling (Scaling Out):
Add 10 stateless Node.js / Laravel EC2 instances behind an Application Load Balancer`,
    howItWorks: [
      "1. Stateless architecture stores session state in external memory (Redis).",
      "2. Load balancer distributes incoming web traffic evenly across horizontal server pool.",
      "3. Auto-scaling adds or removes server nodes dynamically based on CPU/traffic load."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Horizontal Scaling: Load Balancer -&gt; Server 1 | Server 2 | Server 3 (Stateless)</text></svg>`,
    realWorldExample: `// Storing user sessions in external Redis instead of server local disk:
session_driver = redis // Enables horizontal server scaling!`,
    commonUseCases: [
      "Designing systems capable of scaling to millions of concurrent users",
      "Building stateless backend web application tiers",
      "Handling sudden traffic spikes using horizontal auto-scaling"
    ],
    commonMistakes: [
      "Storing session files locally on server disk (breaks horizontal scaling!)",
      "Relying solely on Vertical Scaling until reaching maximum hardware cost limits"
    ],
    bestPractices: [
      "Design application servers to be completely stateless",
      "Prefer Horizontal Scaling for production application tiers"
    ],
    whenToUse: ["In all high-availability system architecture designs"],
    whenNotToUse: ["Do not add horizontal complexity to tiny low-traffic personal blogs"],
    relatedConcepts: ["Vertical Scaling", "Horizontal Scaling", "Stateless Architecture", "Auto Scaling"],
    comparison: {
      title: "Vertical Scaling vs Horizontal Scaling",
      headers: ["Metric", "Vertical Scaling (Scale Up)", "Horizontal Scaling (Scale Out)"],
      rows: [
        ["Mechanism", "Add CPU/RAM to single server", "Add more server nodes into cluster"],
        ["Hardware Limit", "Strict hardware limit (Expensive ceiling)", "Endless scaling capacity"],
        ["Fault Tolerance", "Single Point of Failure", "High Availability (Node failure = zero downtime)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is statelessness required for horizontal scaling?", answer: "Horizontal scaling distributes user requests across multiple server nodes. If a server is stateless, any node can process any request. If state were stored locally, a user request routed to a different node would fail." }
    ],
    practiceProblem: {
      description: "Write architectural term for adding more server instances.",
      starterCode: `Horizontal Scaling`,
      testAssertion: "true",
      solution: `Horizontal Scaling`
    },
    quickRevision: "★ Vertical Scaling = Bigger server; Horizontal Scaling = More servers.\n★ Horizontal scaling requires stateless application servers.\n★ Store sessions in external Redis memory."
  }),

  // 2. LOAD BALANCERS
  "sd-load-balancers": createTopicSchema({
    id: "sd-load-balancers",
    techId: "system-design",
    title: "Load Balancers & Consistent Hashing",
    category: "System Design Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["sd-scalability"],
    definition: "Load Balancers distribute network traffic across server pools using L4 (Transport) or L7 (Application) protocols and algorithms (Round Robin, Least Connections, Consistent Hashing).",
    simpleExplanation: "A load balancer distributes incoming website requests across a pool of backend servers so no single server gets overloaded.",
    whyDoesItExist: "Prevents server bottlenecks, provides SSL termination, and enables high availability.",
    basicExample: `# Consistent Hashing Ring Concept:
Hash Keys and Nodes onto a 360-degree Ring (0 to 2^32 - 1).
When a cache node is added or removed, ONLY k/n keys are remapped (where k = keys, n = nodes).`,
    howItWorks: [
      "1. L4 Load Balancer routes raw TCP/UDP packets without reading HTTP content.",
      "2. L7 Load Balancer decrypts SSL, inspects HTTP URL path headers, and routes to target groups.",
      "3. Consistent Hashing minimizes key remapping during node additions/removals in distributed caches."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Traffic -&gt; L7 Load Balancer -&gt; Round Robin -&gt; Server 1 / Server 2 / Server 3</text></svg>`,
    realWorldExample: `# Nginx Load Balancer upstream configuration:
upstream backend_servers {
    least_conn;
    server 10.0.0.1:8000;
    server 10.0.0.2:8000;
}`,
    commonUseCases: [
      "Distributing web traffic across backend application pools",
      "Offloading SSL/TLS termination at the load balancer level",
      "Using Consistent Hashing for distributed cache node placement"
    ],
    commonMistakes: [
      "Using standard hash mod N (key % N) for distributed caches (adding 1 node invalidates 99% of cached keys!)",
      "Not configuring health checks on backend load balancer targets"
    ],
    bestPractices: [
      "Use Consistent Hashing for distributed caching clusters",
      "Use L7 load balancing for HTTP path-based routing"
    ],
    whenToUse: ["In all multi-server web architectures"],
    whenNotToUse: ["Do not deploy load balancers for single-server setups"],
    relatedConcepts: ["L4 vs L7", "Round Robin", "Least Connections", "Consistent Hashing"],
    comparison: {
      title: "Standard Hash (key % N) vs Consistent Hashing",
      headers: ["Method", "Node Addition Impact", "Cache Invalidation"],
      rows: [
        ["Standard Hash (Key % N)", "Changes denominator N", "Invalidates ~100% of all cached keys!"],
        ["Consistent Hashing", "Remaps only adjacent keys on ring", "Invalidates only 1/N keys (Minimal impact)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is Consistent Hashing critical for distributed caching clusters?", answer: "In standard hash mod N (key % N), adding or removing a cache node changes N, causing almost 100% of cached keys to map to wrong nodes. Consistent Hashing maps keys onto a hash ring so adding/removing a node remaps only 1/N keys." }
    ],
    practiceProblem: {
      description: "Write load balancing algorithm that routes to server with fewest active requests.",
      starterCode: `Least Connections`,
      testAssertion: "true",
      solution: `Least Connections`
    },
    quickRevision: "★ L4 balances TCP packets; L7 balances HTTP requests.\n★ Consistent Hashing minimizes key invalidation when cache nodes scale.\n★ Health checks route traffic away from failed nodes."
  }),

  // 3. CACHING ARCHITECTURE
  "sd-caching": createTopicSchema({
    id: "sd-caching",
    techId: "system-design",
    title: "Caching Architecture (CDN, Reverse Proxy, In-Memory & Cache Strategies)",
    category: "System Design Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["sd-load-balancers"],
    definition: "Caching stores copies of data in high-speed storage layers (CDN at edge, Varnish/Nginx reverse proxy, Redis/Memcached in-memory) to serve future requests faster.",
    simpleExplanation: "Caching stores frequent database results or image files in fast RAM or edge networks so requests resolve in sub-milliseconds.",
    whyDoesItExist: "Drastically reduces database query load and decreases global page load latency.",
    basicExample: `# Multi-Tier Caching Architecture:
Client Browser -> CDN Edge (Static Assets) -> Nginx Reverse Proxy -> Application Cache (Redis) -> SQL Database`,
    howItWorks: [
      "1. CDN caches static assets (images, JS, CSS) at global edge POP locations.",
      "2. Redis caches database query results in RAM memory.",
      "3. Cache-Aside pattern checks Redis first, fetching from DB on cache miss."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Client -&gt; CDN Edge -&gt; Nginx Cache -&gt; Redis RAM -&gt; Database</text></svg>`,
    realWorldExample: `// CloudFront CDN Header for static asset caching:
Cache-Control: public, max-age=31536000, immutable`,
    commonUseCases: [
      "Caching static assets (JS, CSS, images) via Cloudflare / CloudFront CDNs",
      "Caching database query results with Redis in-memory stores",
      "Caching full HTML web pages with Varnish"
    ],
    commonMistakes: [
      "Caching dynamic personal user data without proper user key isolation",
      "Not setting Cache-Control headers on static media files"
    ],
    bestPractices: [
      "Use CDNs for static media files to offload origin server traffic",
      "Set explicit Cache-Control headers"
    ],
    whenToUse: ["In all high-read web applications"],
    whenNotToUse: ["Do not cache rapidly changing real-time financial trading data"],
    relatedConcepts: ["CDN", "Redis", "Cache-Aside", "Cache-Control"],
    comparison: {
      title: "CDN vs In-Memory Redis Cache",
      headers: ["Layer", "Location", "Best Used For"],
      rows: [
        ["CDN (Content Delivery Network)", "Global Edge Points of Presence (POPs)", "Static assets (Images, Videos, Compiled JS/CSS)"],
        ["In-Memory Cache (Redis)", "Application Backend Server Cluster RAM", "Dynamic database query results & user sessions"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is a Content Delivery Network (CDN) and how does it improve web performance?", answer: "A CDN is a globally distributed network of edge servers (POPs) that caches static assets (images, JS, CSS) close to end-users geographically, drastically reducing latency and offloading origin web server traffic." }
    ],
    practiceProblem: {
      description: "Write Cache-Control header for 1-year immutable caching.",
      starterCode: `Cache-Control: public, max-age=31536000`,
      testAssertion: "true",
      solution: `Cache-Control: public, max-age=31536000`
    },
    quickRevision: "★ CDNs cache static assets at global geographical edge locations.\n★ Redis caches database query results in RAM.\n★ Set explicit Cache-Control headers."
  }),

  // 4. DATABASE SCALING
  "sd-database-scaling": createTopicSchema({
    id: "sd-database-scaling",
    techId: "system-design",
    title: "Database Scaling: Replication, Vertical Partitioning & Horizontal Sharding",
    category: "System Design Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["sd-caching"],
    definition: "Database scaling expands data capacity and throughput using Read Replicas (Primary-Replica replication), Vertical Partitioning (splitting tables by column), and Horizontal Sharding (splitting rows by shard key across DB instances).",
    simpleExplanation: "Read Replicas scale query reads. Sharding splits massive multi-terabyte tables across multiple database servers.",
    whyDoesItExist: "Prevents single database servers from running out of disk space or CPU capacity.",
    basicExample: `# Database Sharding Architecture:
Users Collection (100 Million Rows)
├── Shard 1 (Node A): User IDs 1 to 33,000,000
├── Shard 2 (Node B): User IDs 33,000,001 to 66,000,000
└── Shard 3 (Node C): User IDs 66,000,001 to 100,000,000`,
    howItWorks: [
      "1. Primary node accepts write queries and streams changes to Read Replicas.",
      "2. Shard Router uses Shard Key (e.g. HASH(user_id)) to route queries to targeted Shard instance.",
      "3. Cross-shard joins are avoided by storing related data together."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Shard Router (Shard Key) -&gt; Shard 1 (1-33M) | Shard 2 (33M-66M) | Shard 3 (66M+)</text></svg>`,
    realWorldExample: `// MongoDB Shard Key setup:
sh.shardCollection("app.users", { userId: "hashed" });`,
    commonUseCases: [
      "Scaling read SELECT query throughput with Read Replicas",
      "Scaling database storage past 10TB+ using Horizontal Sharding",
      "Vertical partitioning of heavy text columns into separate tables"
    ],
    commonMistakes: [
      "Choosing a bad Shard Key causing uneven data distribution (hotspotting)",
      "Executing cross-shard JOIN queries (extremely slow in sharded databases!)"
    ],
    bestPractices: [
      "Use Read Replicas first before attempting complex Database Sharding",
      "Choose high-cardinality Shard Keys to distribute writes evenly"
    ],
    whenToUse: ["When database storage or write throughput exceeds single server limits"],
    whenNotToUse: ["Do not shard prematurely if Read Replicas and caching resolve performance bottlenecks"],
    relatedConcepts: ["Read Replicas", "Horizontal Sharding", "Shard Key", "Vertical Partitioning"],
    comparison: {
      title: "Read Replicas vs Horizontal Sharding",
      headers: ["Metric", "Read Replicas", "Horizontal Sharding"],
      rows: [
        ["Scales", "Read Query Throughput", "Write Throughput & Storage Capacity"],
        ["Data per Node", "Every node holds 100% full dataset copy", "Nodes hold distinct subsets (chunks) of dataset"],
        ["Complexity", "Low", "High (Requires Shard Router & Shard Key management)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between Read Replicas and Database Sharding?", answer: "Read Replicas scale READ query throughput by replicating identical full dataset copies across nodes. Sharding scales WRITE throughput and STORAGE capacity by partitioning data rows across separate database nodes using a Shard Key." }
    ],
    practiceProblem: {
      description: "Write architectural technique for splitting rows by key.",
      starterCode: `Horizontal Sharding`,
      testAssertion: "true",
      solution: `Horizontal Sharding`
    },
    quickRevision: "★ Read Replicas scale read queries; Sharding scales write throughput and disk space.\n★ Choose high-cardinality Shard Keys to prevent hotspots.\n★ Avoid cross-shard joins."
  }),

  // 5. CAP THEOREM & PACELC
  "sd-cap-theorem": createTopicSchema({
    id: "sd-cap-theorem",
    techId: "system-design",
    title: "CAP Theorem, Eventual Consistency & PACELC Theorem",
    category: "System Design Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["sd-database-scaling"],
    definition: "CAP Theorem states that a distributed system can guarantee at most 2 of 3 properties during network partitions: Consistency (C), Availability (A), and Partition Tolerance (P). PACELC extends CAP by adding Latency (L) vs Consistency (C) trade-offs when no partition occurs.",
    simpleExplanation: "In a network outage, you must choose between returning accurate data (Consistency) or returning fast responses that might be slightly outdated (Availability).",
    whyDoesItExist: "Defines fundamental mathematical trade-offs in distributed system design.",
    basicExample: `# CAP Theorem Trade-off choices during Network Partition:
- CP Systems (MongoDB, HBase): Chooses Consistency over Availability (Rejects writes if partition occurs)
- AP Systems (Cassandra, DynamoDB): Chooses Availability over Consistency (Accepts writes, promises Eventual Consistency)`,
    howItWorks: [
      "1. Network Partition (P) occurs breaking communication between cluster nodes.",
      "2. CP System blocks writes to guarantee all nodes return identical data (Consistency).",
      "3. AP System accepts writes returning stale data temporarily, reconciling later via Eventual Consistency."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Network Partition (P) -&gt; Choose CP (Consistency) OR AP (Availability)</text></svg>`,
    realWorldExample: `// DynamoDB / Cassandra Read Consistency selection:
// Strong Consistency (CP) vs Eventual Consistency (AP)`,
    commonUseCases: [
      "Choosing CP databases (MongoDB/Postgres) for financial bank ledgers requiring strict accuracy",
      "Choosing AP databases (Cassandra/DynamoDB) for social media feeds where availability is paramount",
      "Designing Eventual Consistency reconciliation algorithms"
    ],
    commonMistakes: [
      "Claiming a system satisfies 'CA' (Partition Tolerance P is inevitable in distributed network hardware; you CANNOT choose CA!)",
      "Ignoring PACELC latency trade-offs during normal non-partitioned operation"
    ],
    bestPractices: [
      "Recognize that Partition Tolerance (P) is mandatory in distributed networks",
      "Choose CP for financial transactions and AP for real-time social feeds"
    ],
    whenToUse: ["When selecting distributed database systems and storage engines"],
    whenNotToUse: ["Do not claim CA exists in distributed cloud systems"],
    relatedConcepts: ["CAP Theorem", "PACELC", "Consistency", "Availability", "Eventual Consistency"],
    comparison: {
      title: "CP Systems vs AP Systems",
      headers: ["System Type", "Partition Behavior", "Best Used For"],
      rows: [
        ["CP (Consistency + Partition Tolerance)", "Refuses requests if data accuracy cannot be guaranteed", "Banking, Financial Ledgers, Inventory Management"],
        ["AP (Availability + Partition Tolerance)", "Always returns response (may return stale data temporarily)", "DNS, Social Media Feeds, Shopping Carts"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is 'CA' (Consistency + Availability) impossible in distributed systems under CAP Theorem?", answer: "Network partitions (P) are inevitable physical realities in distributed networks (cables cut, routers fail). Because P is mandatory, distributed systems MUST choose between Consistency (CP) or Availability (AP) when a partition occurs." }
    ],
    practiceProblem: {
      description: "Write abbreviation for system prioritizing Consistency over Availability during partition.",
      starterCode: `CP`,
      testAssertion: "true",
      solution: `CP`
    },
    quickRevision: "★ Network Partition (P) is inevitable in distributed systems.\n★ CP systems guarantee data accuracy; AP systems guarantee uptime.\n★ Use CP for financial data; AP for social feeds."
  }),

  // 6. MESSAGE QUEUES
  "sd-message-queues": createTopicSchema({
    id: "sd-message-queues",
    techId: "system-design",
    title: "Message Queues & Event-Driven Architecture (Kafka, RabbitMQ)",
    category: "System Design Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["sd-cap-theorem"],
    definition: "Message Brokers (Apache Kafka, RabbitMQ, AWS SQS) provide asynchronous message queuing and event-driven communication, decoupling producers from consumers and buffering traffic spikes.",
    simpleExplanation: "Message queues let backend systems process heavy jobs (sending emails, video processing) asynchronously in the background.",
    whyDoesItExist: "Decouples microservices, smooths out traffic spikes, and prevents API request timeouts.",
    basicExample: `# Asynchronous Event Flow:
Client HTTP Request -> Web API -> Publishes Message to Kafka / RabbitMQ -> Instant 200 OK Response
                                      │
                                      ▼
                      Background Worker Consumer (Processes Job)`,
    howItWorks: [
      "1. Producer publishes message to Queue / Kafka Topic.",
      "2. Message Broker persists message on disk / memory queue.",
      "3. Consumer workers pull messages asynchronously, sending acknowledgments (ACK) on completion."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Producer -&gt; Message Queue (Kafka/RabbitMQ) -&gt; Consumer Workers (Async ACK)</text></svg>`,
    realWorldExample: `// BullMQ Node.js Queue Example:
import { Queue, Worker } from 'bullmq';
const emailQueue = new Queue('emails', { connection: redisConfig });
await emailQueue.add('sendEmail', { to: 'user@example.com' });`,
    commonUseCases: [
      "Offloading slow tasks (sending transactional emails, PDF processing)",
      "Buffering high-volume log streams with Apache Kafka",
      "Decoupling microservice communications"
    ],
    commonMistakes: [
      "Using synchronous REST HTTP calls for long-running processes",
      "Forgetting Dead Letter Queues (DLQ) for failed messages"
    ],
    bestPractices: [
      "Use Dead Letter Queues (DLQ) to capture unprocessable failed messages",
      "Ensure message consumers are idempotent"
    ],
    whenToUse: ["In all background task processing and event-driven architectures"],
    whenNotToUse: ["When an operation requires synchronous real-time response data"],
    relatedConcepts: ["Message Queue", "Kafka", "RabbitMQ", "Dead Letter Queue (DLQ)", "Idempotency"],
    comparison: {
      title: "RabbitMQ vs Apache Kafka",
      headers: ["Feature", "RabbitMQ", "Apache Kafka"],
      rows: [
        ["Architecture", "Traditional AMQP Message Broker", "Distributed Append-Only Event Log Stream"],
        ["Message Consumption", "Messages deleted after consumer ACK", "Messages retained on disk based on retention policy"],
        ["Throughput", "High (Thousands msg/sec)", "Ultra Massive (Millions msg/sec)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Dead Letter Queue (DLQ) and why is it essential in message queue architectures?", answer: "A Dead Letter Queue is a dedicated queue that captures messages that fail processing repeatedly (e.g. after 3 retry attempts), allowing developers to inspect and debug failed messages without blocking the main queue." }
    ],
    practiceProblem: {
      description: "Write queue component that captures unprocessable failed messages.",
      starterCode: `Dead Letter Queue`,
      testAssertion: "true",
      solution: `Dead Letter Queue`
    },
    quickRevision: "★ Message queues process jobs asynchronously in background.\n★ Kafka = Event log streaming; RabbitMQ = AMQP message broker.\n★ Use Dead Letter Queues (DLQ) for failed job retries."
  }),

  // 7. RATE LIMITING ALGORITHMS
  "sd-rate-limiting": createTopicSchema({
    id: "sd-rate-limiting",
    techId: "system-design",
    title: "System Design Rate Limiting (Token Bucket, Leaky Bucket & Sliding Window)",
    category: "System Design Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["sd-message-queues"],
    definition: "Rate Limiting in System Design limits request frequency using algorithms: Token Bucket (refills tokens at fixed rate), Leaky Bucket (smooth FIFO output queue), and Sliding Window Counter (rolling window estimation).",
    simpleExplanation: "Rate limiters protect infrastructure by limiting clients to a specific request quota per time window (e.g. 100 requests per minute).",
    whyDoesItExist: "Protects backend databases and services from DDoS attacks and API resource exhaustion.",
    basicExample: `# Token Bucket Algorithm Concept:
- Bucket capacity: 100 tokens
- Refill rate: 10 tokens per second
- Each API request consumes 1 token.
- If bucket has 0 tokens -> Reject request with HTTP 429 Too Many Requests.`,
    howItWorks: [
      "1. Token Bucket adds tokens at constant rate up to bucket capacity.",
      "2. Incoming request takes token if available; dropped if empty.",
      "3. Distributed implementation stores sliding window ZSET counters in Redis."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Token Bucket (Refill Rate) -&gt; Consume Token -&gt; Empty? HTTP 429</text></svg>`,
    realWorldExample: `// Redis Sliding Window Rate Limiter script:
// Stores request timestamps in a Redis Sorted Set (ZSET)`,
    commonUseCases: [
      "Protecting login endpoints against password brute-force attacks",
      "Enforcing API subscription tiers (Free vs Enterprise limits)",
      "Preventing web scraping"
    ],
    commonMistakes: [
      "Using Fixed Window algorithm which allows 2x burst requests at window boundaries",
      "Storing rate limit counters in server memory instead of Redis"
    ],
    bestPractices: [
      "Use Token Bucket or Sliding Window Counter algorithms",
      "Use Redis for distributed rate limit counter storage"
    ],
    whenToUse: ["In all public API Gateway architectures"],
    whenNotToUse: ["Do not set restrictive rate limits on internal trusted microservices"],
    relatedConcepts: ["Token Bucket", "Leaky Bucket", "Sliding Window", "HTTP 429"],
    comparison: {
      title: "Token Bucket vs Leaky Bucket",
      headers: ["Algorithm", "Output Rate", "Burst Handling"],
      rows: [
        ["Token Bucket", "Variable output rate", "Allows short controlled traffic bursts"],
        ["Leaky Bucket", "Strict constant output rate (smooth FIFO queue)", "Smooths out bursts into a constant flow"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How does the Token Bucket rate limiting algorithm handle traffic bursts?", answer: "Token Bucket allows traffic bursts up to the bucket's maximum capacity as long as tokens are available in the bucket, making it ideal for web APIs that experience short natural bursts." }
    ],
    practiceProblem: {
      description: "Write HTTP status code returned by rate limiters.",
      starterCode: `429`,
      testAssertion: "true",
      solution: `429`
    },
    quickRevision: "★ Token Bucket allows short traffic bursts.\n★ Leaky Bucket smooths traffic into a constant output flow.\n★ Store rate limit counters in Redis for multi-server clusters."
  }),

  // 8. DESIGN URL SHORTENER
  "sd-url-shortener": createTopicSchema({
    id: "sd-url-shortener",
    techId: "system-design",
    title: "System Design Case Study: Design TinyURL (URL Shortener)",
    category: "System Design Case Studies",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["sd-rate-limiting"],
    definition: "Designing a URL Shortener (TinyURL) converts long URLs (https://example.com/long/path) into short 7-character Base62 keys (https://tinyurl.com/aB3xZ9) using Base62 encoding, Key Generation Service (KGS), and Redis caching.",
    simpleExplanation: "TinyURL converts long URLs into 7-character unique codes using Base62 (a-z, A-Z, 0-9) and redirects visitors instantly.",
    whyDoesItExist: "Classic system design interview problem testing hashing, caching, data modeling, and high-read scaling.",
    basicExample: `# Base62 Encoding:
Characters: [a-z, A-Z, 0-9] = 62 characters
7-character short URL capacity: 62^7 = 3.5 TRILLION unique URLs!

# Redirection Flow:
GET /aB3xZ9 -> Check Redis -> HTTP 301 Permanent Redirect to original long URL`,
    howItWorks: [
      "1. Shorten Request: API generates 7-character Base62 hash key (or fetches pre-generated key from KGS).",
      "2. Stores mapping in DB (id, short_key, original_url, created_at) and Redis cache.",
      "3. Redirect Request: Looks up short_key in Redis, returning HTTP 301 Permanent Redirect."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">GET /aB3xZ9 -&gt; Redis Cache -&gt; HTTP 301 Permanent Redirect to Original URL</text></svg>`,
    realWorldExample: `// HTTP 301 Redirect header:
HTTP/1.1 301 Moved Permanently
Location: https://example.com/long/original/url`,
    commonUseCases: [
      "Shortening links for Twitter/SMS character constraints",
      "Click tracking and analytics attribution",
      "System design interview reference architecture"
    ],
    commonMistakes: [
      "Using HTTP 302 Found instead of 301 Moved Permanently (301 allows browser caching, offloading server reads!)",
      "Generating keys on-the-fly with MD5/SHA256 and handling hash collisions under heavy write load"
    ],
    bestPractices: [
      "Use HTTP 301 Permanent Redirect for browser caching (or 302 if click analytics are required on every hit)",
      "Use a standalone Key Generation Service (KGS) to pre-generate unique Base62 keys"
    ],
    whenToUse: ["When designing URL shorteners or unique code generation systems"],
    whenNotToUse: ["Do not use random string generation without uniqueness constraints"],
    relatedConcepts: ["Base62 Encoding", "Key Generation Service (KGS)", "HTTP 301 vs 302", "Redis Cache"],
    comparison: {
      title: "HTTP 301 vs HTTP 302 Redirection in TinyURL",
      headers: ["Status Code", "Browser Caching Behavior", "Analytics Impact"],
      rows: [
        ["HTTP 301 (Moved Permanently)", "Browser caches redirection locally", "Subsequent clicks bypass server (Reduced server load)"],
        ["HTTP 302 (Found / Temporary)", "Browser does NOT cache redirection", "Every click hits server (Accurate click analytics count)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is 7-character Base62 encoding chosen for TinyURL?", answer: "Base62 uses 62 characters [a-z, A-Z, 0-9]. A 7-character Base62 string provides 62^7 = 3.52 Trillion unique keys, which is more than enough capacity for global scale." }
    ],
    practiceProblem: {
      description: "Write Base62 character set length value.",
      starterCode: `62`,
      testAssertion: "true",
      solution: `62`
    },
    quickRevision: "★ Base62 (62^7 = 3.5 Trillion keys) for 7-char short URLs.\n★ HTTP 301 allows browser caching; 302 tracks click analytics.\n★ Use Key Generation Service (KGS) to eliminate hash collisions."
  }),

  // 9. DESIGN CHAT SYSTEM
  "sd-chat-system": createTopicSchema({
    id: "sd-chat-system",
    techId: "system-design",
    title: "System Design Case Study: Design Real-Time Chat (WhatsApp / Slack)",
    category: "System Design Case Studies",
    difficulty: "Senior",
    experienceBand: "3–5+ years",
    prerequisites: ["sd-url-shortener"],
    definition: "Designing a Real-Time Chat System (WhatsApp/Slack) uses WebSockets for bi-directional messaging, Presence Servers for online status, NoSQL document/key-value stores (HBase/Cassandra) for message history, and Push Notifications for offline users.",
    simpleExplanation: "A real-time chat architecture uses WebSocket servers to maintain persistent client connections and NoSQL databases to store billions of chat messages.",
    whyDoesItExist: "Core system design case study testing WebSocket connections, presence detection, and high-write data storage.",
    basicExample: `# Real-Time Chat Architecture Overview:
Mobile/Web Client == WebSocket == > Chat Server (WebSocket Connection Pool)
                                        │
                                        ├── > Presence Server (Redis Online Status)
                                        ├── > Message DB (Cassandra / HBase for Write Speed)
                                        └── > Push Notification Service (FCM/APNS for offline users)`,
    howItWorks: [
      "1. Client establishes persistent WSS WebSocket connection with WebSocket Server.",
      "2. Message sent -> WebSocket Server saves message to Cassandra DB and forwards to recipient's active WebSocket.",
      "3. If recipient is offline -> Triggers Push Notification (FCM / APNS)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Client A -- [WebSocket] --&gt; Chat Server -&gt; (Online: Client B) | (Offline: FCM Push)</text></svg>`,
    realWorldExample: `// Heartbeat ping/pong for Presence Server in Redis:
SET user:100:presence "online" EX 30`,
    commonUseCases: [
      "Designing WhatsApp, Messenger, or Slack chat architectures",
      "Managing user online/offline presence detection with Redis Heartbeats",
      "Storing heavy chat message histories in Cassandra / HBase"
    ],
    commonMistakes: [
      "Using HTTP Long Polling for messaging (WebSockets provide far lower overhead and latency)",
      "Using relational SQL databases for storing billions of high-write chat messages"
    ],
    bestPractices: [
      "Use WebSockets for bi-directional real-time message delivery",
      "Use Cassandra or HBase for high-write message history storage"
    ],
    whenToUse: ["When designing real-time messaging and chat applications"],
    whenNotToUse: ["Do not use WebSockets for traditional static web page loads"],
    relatedConcepts: ["WebSockets", "Presence Server", "Cassandra", "FCM / APNS Push"],
    comparison: {
      title: "WebSockets vs HTTP Long Polling vs SSE",
      headers: ["Protocol", "Direction", "Connection Overhead"],
      rows: [
        ["WebSockets", "Full-Duplex Bi-Directional", "Ultra Low (Single persistent TCP connection)"],
        ["HTTP Long Polling", "Simulated Bi-Directional", "High (Repeated HTTP request overhead)"],
        ["Server-Sent Events (SSE)", "Unidirectional (Server to Client only)", "Low"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why are Cassandra or HBase preferred over SQL databases for storing chat message history?", answer: "Chat applications generate billions of small, high-frequency write operations. Cassandra and HBase use Log-Structured Merge-trees (LSM trees) optimized for ultra-fast sequential write speeds and easy horizontal scaling." }
    ],
    practiceProblem: {
      description: "Write protocol used for real-time bi-directional chat.",
      starterCode: `WebSocket`,
      testAssertion: "true",
      solution: `WebSocket`
    },
    quickRevision: "★ WebSockets provide bi-directional real-time messaging.\n★ Cassandra/HBase for high-write message history storage.\n★ Redis Heartbeats for user presence detection."
  }),

  // 10. DESIGN DISTRIBUTED FILE STORAGE
  "sd-file-storage": createTopicSchema({
    id: "sd-file-storage",
    techId: "system-design",
    title: "System Design Case Study: Design Distributed File Storage (S3 / Google Drive)",
    category: "System Design Case Studies",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["sd-chat-system"],
    definition: "Designing Distributed File Storage (S3/Google Drive) splits large files into immutable Chunks (4MB-64MB), manages Metadata in a separate database, uses Deduplication, and processes Resumable Uploads.",
    simpleExplanation: "Distributed file storage splits big files into smaller chunks, removes duplicate chunks (deduplication), and uploads chunks in parallel across storage servers.",
    whyDoesItExist: "Enables multi-petabyte scale file storage with high durability and fast parallel uploads.",
    basicExample: `# Chunking & Deduplication Architecture:
File: 16MB Video File
├── Chunk 1 (4MB) -> SHA-256: e3b0c4... -> Storage Node 1
├── Chunk 2 (4MB) -> SHA-256: a8f5c1... -> Storage Node 2
├── Chunk 3 (4MB) -> SHA-256: e3b0c4... -> Duplicate! (Reuse Chunk 1 pointer!)
└── Chunk 4 (4MB) -> SHA-256: f7d2a9... -> Storage Node 3`,
    howItWorks: [
      "1. Client splits file into 4MB chunks and computes SHA-256 hash per chunk.",
      "2. Metadata Service checks hash for Chunk Deduplication (skips upload if hash exists).",
      "3. Chunks uploaded in parallel and stored redundantly across storage nodes."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">File -&gt; 4MB Chunks -&gt; SHA-256 Hash -&gt; Deduplication Check -&gt; Storage Nodes</text></svg>`,
    realWorldExample: `// Resumable Multipart Upload API Flow:
1. InitiateMultipartUpload -> UploadId
2. UploadPart (Part 1, Part 2, Part 3)
3. CompleteMultipartUpload`,
    commonUseCases: [
      "Designing S3, Google Drive, or Dropbox storage architectures",
      "Chunk-based deduplication to save petabytes of storage space",
      "Resumable parallel file uploads"
    ],
    commonMistakes: [
      "Storing file metadata directly on block storage servers (Metadata must be separated in a fast database!)",
      "Uploading large 10GB files as a single monolithic HTTP request"
    ],
    bestPractices: [
      "Separate Metadata Service (DB) from Block Storage Servers",
      "Use SHA-256 chunk hashing for storage deduplication"
    ],
    whenToUse: ["In all large-scale distributed cloud file storage designs"],
    whenNotToUse: ["Do not build custom file storage if AWS S3 satisfies requirements"],
    relatedConcepts: ["Chunking", "Deduplication", "Metadata Service", "Multipart Upload"],
    comparison: {
      title: "Block Storage vs Metadata Service",
      headers: ["Layer", "Data Stored", "Storage Engine"],
      rows: [
        ["Block Storage Nodes", "Immutable file chunk binaries (4MB blocks)", "Local disk / Object storage nodes"],
        ["Metadata Service", "File names, file-to-chunk mappings, permissions", "PostgreSQL / MySQL / DynamoDB"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Chunk Deduplication in distributed file storage systems?", answer: "Deduplication computes a cryptographic hash (e.g. SHA-256) for every file chunk. If a chunk hash already exists in storage, the system points to the existing chunk instead of storing a duplicate copy, saving petabytes of disk space." }
    ],
    practiceProblem: {
      description: "Write hash algorithm used for chunk deduplication identity.",
      starterCode: `SHA-256`,
      testAssertion: "true",
      solution: `SHA-256`
    },
    quickRevision: "★ Split large files into 4MB immutable chunks.\n★ Use SHA-256 chunk deduplication to save storage.\n★ Separate Metadata Service from Block Storage nodes."
  }),

  // 11. OBSERVABILITY & FAULT TOLERANCE
  "sd-observability": createTopicSchema({
    id: "sd-observability",
    techId: "system-design",
    title: "Distributed Observability, Tracing & Circuit Breakers",
    category: "System Design Advanced",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["sd-file-storage"],
    definition: "Observability combines Metrics (Prometheus/Grafana), Centralized Logging (ELK Stack), and Distributed Tracing (Jaeger/OpenTelemetry with Correlation IDs) to diagnose distributed system failures.",
    simpleExplanation: "Observability uses Correlation IDs to trace a single request as it flows across 10 microservices, pinpointing exact performance bottlenecks.",
    whyDoesItExist: "Provides complete visibility into complex distributed microservice architectures.",
    basicExample: `# Correlation ID Header in Microservices:
X-Correlation-ID: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

# Logs across microservices share the same Correlation ID:
[API Gateway] Order request received (ID: 9b1deb4d...)
[Order Service] Creating order record (ID: 9b1deb4d...)
[Payment Service] Processing Stripe charge (ID: 9b1deb4d...)`,
    howItWorks: [
      "1. API Gateway injects unique X-Correlation-ID header into incoming HTTP request.",
      "2. Header propagated across all internal microservice calls.",
      "3. OpenTelemetry collectors aggregate logs and traces into Grafana/Jaeger."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">X-Correlation-ID -&gt; Service A -&gt; Service B -&gt; OpenTelemetry / Jaeger Trace</text></svg>`,
    realWorldExample: `// Node.js Express Correlation ID Middleware:
import { v4 as uuidv4 } from 'uuid';

app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || uuidv4();
  res.setHeader('X-Correlation-ID', req.correlationId);
  next();
});`,
    commonUseCases: [
      "Tracing requests across microservice boundaries using Correlation IDs",
      "Monitoring system metrics (CPU, RAM, latency) using Prometheus & Grafana",
      "Using Circuit Breakers to stop cascading microservice failures"
    ],
    commonMistakes: [
      "Logging microservice events without a shared Correlation ID (makes cross-service debugging impossible!)",
      "Ignoring latency metrics (P99, P95 percentile latency)"
    ],
    bestPractices: [
      "Propagate X-Correlation-ID headers across all HTTP and RPC service calls",
      "Focus on P99 (99th percentile) latency metrics rather than averages"
    ],
    whenToUse: ["In all distributed microservice systems"],
    whenNotToUse: ["Do not skip correlation IDs in multi-service environments"],
    relatedConcepts: ["Correlation ID", "Distributed Tracing", "OpenTelemetry", "Prometheus", "P99 Latency"],
    comparison: {
      title: "Metrics vs Logs vs Traces (The 3 Pillars of Observability)",
      headers: ["Pillar", "Format", "Primary Use Case"],
      rows: [
        ["Metrics", "Numeric aggregations over time (CPU %, req/sec)", "Dashboard monitoring & alerting (Prometheus)"],
        ["Logs", "Text events with timestamps", "Detailed debugging of specific error events (ELK Stack)"],
        ["Traces", "End-to-end request path timeline", "Pinpointing latency bottlenecks across microservices (Jaeger)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is a Correlation ID in Distributed Tracing and why is it essential?", answer: "A Correlation ID is a unique identifier assigned to a request at the API Gateway and passed along to all downstream microservices. It allows developers to search centralized logs and trace the complete request lifecycle across multiple services." }
    ],
    practiceProblem: {
      description: "Write HTTP header name used for distributed request correlation.",
      starterCode: `X-Correlation-ID`,
      testAssertion: "true",
      solution: `X-Correlation-ID`
    },
    quickRevision: "★ 3 Pillars: Metrics, Logs, Traces.\n★ X-Correlation-ID tracks requests across microservices.\n★ Focus on P99 percentile latency rather than averages."
  })
};
