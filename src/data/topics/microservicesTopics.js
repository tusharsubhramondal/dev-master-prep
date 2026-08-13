import { createTopicSchema } from './createTopicSchema.js';

export const microservicesTopics = {
  // 1. MONOLITH VS MICROSERVICES
  "ms-basics": createTopicSchema({
    id: "ms-basics",
    techId: "microservices",
    title: "Monolithic Architecture vs Microservices Architecture",
    category: "Microservices Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Software Architecture Basics"],
    definition: "Microservices Architecture structures an application as a collection of small, autonomous, loosely coupled services organized around business capabilities (Conway's Law), contrasting with a single unified Monolith.",
    simpleExplanation: "A Monolith packages all code into 1 single deployment unit. Microservices break your app into small independent web services (Order Service, Auth Service, Payment Service).",
    whyDoesItExist: "Enables independent team deployments, technology flexibility, and individual service scaling.",
    basicExample: `# Monolith vs Microservices Architecture:

Monolith:
[ Client ] -> [ Single Web Server (Auth + Orders + Payments + Notifications) ] -> [ Single Database ]

Microservices:
[ Client ] -> [ API Gateway ]
                 ├── > [ Auth Service ]    -> [ Auth DB ]
                 ├── > [ Order Service ]   -> [ Order DB ]
                 └── > [ Payment Service ] -> [ Payment DB ]`,
    howItWorks: [
      "1. System decomposed into domain-aligned microservices.",
      "2. Each microservice owns its codebase, deployment pipeline, and database.",
      "3. Services communicate via lightweight APIs (REST, gRPC) or event streams."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">API Gateway -&gt; Auth Service (Auth DB) | Order Service (Order DB)</text></svg>`,
    realWorldExample: `// Conway's Law: Organizations design systems that mirror their communication structures.
// Independent feature teams = Independent microservices!`,
    commonUseCases: [
      "Scaling multi-team engineering organizations",
      "Deploying high-frequency services independently without re-deploying the full stack",
      "Polyglot technology choices (Node.js API + Python ML service + Go microservice)"
    ],
    commonMistakes: [
      "Building a Distributed Monolith (microservices sharing a single database or tightly coupled synchronous REST calls!)",
      "Adopting microservices prematurely for a tiny startup with 2 developers"
    ],
    bestPractices: [
      "Start with a clean modular monolith before splitting into microservices",
      "Enforce Database-per-Service (never share databases between microservices)"
    ],
    whenToUse: ["In large engineering organizations with multiple autonomous teams"],
    whenNotToUse: ["Do not use microservices for small early-stage MVP products"],
    relatedConcepts: ["Monolith", "Microservices", "Conway's Law", "Database-per-Service"],
    comparison: {
      title: "Monolith vs Microservices",
      headers: ["Metric", "Monolithic Architecture", "Microservices Architecture"],
      rows: [
        ["Deployment", "Single unit deployment (All or Nothing)", "Independent service deployments"],
        ["Database", "Single Shared Database", "Database-per-Service pattern"],
        ["Complexity", "Low operational overhead", "High operational / network complexity"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is Conway's Law and how does it relate to Microservices?", answer: "Conway's Law states that an organization's system design mirrors its communication structure. Microservices align autonomous engineering teams with independent services, enabling separate team ownership." }
    ],
    practiceProblem: {
      description: "Write database pattern rule for microservices.",
      starterCode: `Database-per-Service`,
      testAssertion: "true",
      solution: `Database-per-Service`
    },
    quickRevision: "★ Microservices are loosely coupled, independently deployable services.\n★ Follows Conway's Law (Aligns teams with services).\n★ ALWAYS enforce Database-per-Service."
  }),

  // 2. DOMAIN-DRIVEN DESIGN (DDD)
  "ms-ddd": createTopicSchema({
    id: "ms-ddd",
    techId: "microservices",
    title: "Domain-Driven Design (DDD) & Bounded Contexts",
    category: "Microservices Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["ms-basics"],
    definition: "Domain-Driven Design (DDD) models software around complex business domains using Bounded Contexts, Ubiquitous Language, Entities, Value Objects, Aggregates, and Domain Events.",
    simpleExplanation: "DDD breaks a big application into clear business domains (Bounded Contexts) where domain terminology has explicit, unambiguous meanings.",
    whyDoesItExist: "Provides logical boundaries for decomposing monoliths into clean microservice boundaries.",
    basicExample: `# Bounded Context Example: "Customer" Model
- In Sales Context: Customer = { id, billingAddress, creditLimit }
- In Support Context: Customer = { id, supportTickets, SLA }
- In Shipping Context: Customer = { id, deliveryAddress, deliveryInstructions }
(Each Bounded Context owns its own distinct model definition!)`,
    howItWorks: [
      "1. Event Storming workshops identify business domain events and boundaries.",
      "2. Bounded Contexts establish explicit boundaries for domain models.",
      "3. Each Bounded Context maps to a single Microservice."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Sales Context (Billing) | Support Context (Tickets) | Shipping Context (Delivery)</text></svg>`,
    realWorldExample: `// Domain Event publication in DDD:
class OrderPlacedEvent {
  constructor(public readonly orderId: string, public readonly total: number) {}
}`,
    commonUseCases: [
      "Decomposing legacy monoliths into microservices based on Bounded Contexts",
      "Establishing Ubiquitous Language between domain experts and software engineers",
      "Designing Domain Events"
    ],
    commonMistakes: [
      "Creating microservices by entity tables (e.g. User Table Service) instead of business Bounded Contexts",
      "Sharing entity models across Bounded Context boundaries"
    ],
    bestPractices: [
      "Define explicit Bounded Context boundaries",
      "Establish a shared Ubiquitous Language with business domain experts"
    ],
    whenToUse: ["When modeling complex enterprise microservice domains"],
    whenNotToUse: ["Do not apply full DDD overhead to trivial CRUD applications"],
    relatedConcepts: ["Bounded Context", "Ubiquitous Language", "Entities", "Value Objects", "Aggregates"],
    comparison: {
      title: "Entities vs Value Objects in DDD",
      headers: ["Concept", "Identity", "Mutability"],
      rows: [
        ["Entity", "Has unique primary identity (e.g. Order ID 100)", "Mutable"],
        ["Value Object", "Defined solely by attributes (e.g. Money $10 USD or Address)", "Immutable"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is a Bounded Context in Domain-Driven Design?", answer: "A Bounded Context is an explicit boundary within which a domain model applies and domain terminology (Ubiquitous Language) has a specific, unambiguous meaning." }
    ],
    practiceProblem: {
      description: "Write DDD concept defining explicit domain boundaries.",
      starterCode: `Bounded Context`,
      testAssertion: "true",
      solution: `Bounded Context`
    },
    quickRevision: "★ Bounded Context defines explicit domain boundaries.\n★ Ubiquitous Language aligns developers & business domain experts.\n★ Entities have identity; Value Objects are immutable."
  }),

  // 3. API GATEWAY PATTERN
  "ms-api-gateway": createTopicSchema({
    id: "ms-api-gateway",
    techId: "microservices",
    title: "API Gateway Pattern & Backends-For-Frontends (BFF)",
    category: "Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["ms-ddd"],
    definition: "The API Gateway pattern provides a central reverse-proxy entry point for clients, handling request routing, SSL termination, JWT authentication, rate limiting, and BFF (Backends-For-Frontends) adaptation.",
    simpleExplanation: "An API Gateway acts as a single front door for frontend clients, routing requests to the correct backend microservice and handling security checks.",
    whyDoesItExist: "Prevents clients from making complex individual connections to dozens of internal microservice addresses.",
    basicExample: `# API Gateway Pattern Flow:
Mobile App  ──┐
              ├── > [ API Gateway (Kong / AWS API Gateway) ]
Web App     ──┘                  │
            ┌────────────────────┼────────────────────┐
            ▼                    ▼                    ▼
     [ Auth Service ]   [ Order Service ]   [ Catalog Service ]`,
    howItWorks: [
      "1. Client sends request to central gateway domain.",
      "2. Gateway verifies JWT token and enforces rate limit rules.",
      "3. Proxies request to target internal microservice IP/hostname."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Client Requests -&gt; API Gateway (JWT &amp; Rate Limit) -&gt; Internal Microservices</text></svg>`,
    realWorldExample: `// BFF Pattern: Separate Mobile Gateway & Web Gateway for tailored payloads!`,
    commonUseCases: [
      "Routing frontend requests to backend microservices",
      "Offloading JWT authentication verification and SSL termination",
      "Building Backends-For-Frontends (BFF) tailored for Mobile vs Web"
    ],
    commonMistakes: [
      "Putting heavy business logic inside the API Gateway (keeps gateway thin!)",
      "Creating a single monolithic API Gateway without redundant load balancing"
    ],
    bestPractices: [
      "Keep API Gateways thin and focused on routing, auth, and rate limiting",
      "Use BFF (Backends-for-Frontends) when Mobile and Web need distinct APIs"
    ],
    whenToUse: ["In all production microservice architectures"],
    whenNotToUse: ["Do not deploy an API Gateway for a single-server monolith"],
    relatedConcepts: ["API Gateway", "BFF Pattern", "SSL Termination", "Kong"],
    comparison: {
      title: "API Gateway vs BFF Pattern",
      headers: ["Pattern", "Scope", "Use Case"],
      rows: [
        ["Single API Gateway", "One universal entry point for all clients", "General microservice routing & auth"],
        ["BFF (Backends-for-Frontends)", "Separate tailored gateway per client type (Mobile BFF, Web BFF)", "Optimizing payloads specifically for Mobile vs Desktop"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the Backends-For-Frontends (BFF) pattern?", answer: "The BFF pattern creates separate API Gateway instances tailored for specific frontend clients (e.g. a Mobile BFF returning small payloads vs a Web BFF returning detailed payloads), optimizing performance per client type." }
    ],
    practiceProblem: {
      description: "Write pattern name for client-tailored API gateways.",
      starterCode: `BFF Pattern`,
      testAssertion: "true",
      solution: `BFF Pattern`
    },
    quickRevision: "★ API Gateway is a central front door for microservices.\n★ Offloads JWT authentication, SSL, and rate limiting.\n★ BFF pattern creates client-tailored gateways (Mobile vs Web)."
  }),

  // 4. INTER-SERVICE COMMUNICATION
  "ms-communication": createTopicSchema({
    id: "ms-communication",
    techId: "microservices",
    title: "Inter-Service Communication (Synchronous gRPC/REST vs Asynchronous AMQP/Kafka)",
    category: "Communication",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["ms-api-gateway"],
    definition: "Inter-service communication connects microservices using Synchronous protocols (REST over HTTP/1.1, high-performance gRPC over HTTP/2) or Asynchronous Event-Driven Messaging (AMQP/RabbitMQ, Kafka).",
    simpleExplanation: "Synchronous communication waits for a direct response (like gRPC). Asynchronous messaging sends event messages in the background (like Kafka).",
    whyDoesItExist: "Enables reliable data exchange between distributed microservices.",
    basicExample: `# 1. Synchronous gRPC (HTTP/2 Protocol Buffers):
Order Service ── [gRPC Proto Request] ── > Payment Service (Waits for response)

# 2. Asynchronous Event-Driven (Kafka / RabbitMQ):
Order Service ── [Publishes "OrderPlaced" Event] ── > Message Broker
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                                  ▼                                                   ▼
                       Inventory Service                                   Notification Service`,
    howItWorks: [
      "1. gRPC uses Protocol Buffers binary serialization over HTTP/2 for ultra-fast low-latency sync calls.",
      "2. Async messaging uses Event Brokers (Kafka/RabbitMQ) to publish events without waiting.",
      "3. Consumers process domain events independently."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">gRPC (Sync HTTP/2 Proto) vs Event-Driven (Async Kafka Broker)</text></svg>`,
    realWorldExample: `// Protocol Buffer (.proto) gRPC definition:
syntax = "proto3";
service PaymentService {
  rpc Charge (ChargeRequest) returns (ChargeResponse);
}`,
    commonUseCases: [
      "Using gRPC for ultra-low latency internal microservice-to-microservice calls",
      "Using Kafka for asynchronous event-driven state updates across services",
      "Using REST for external client-facing APIs"
    ],
    commonMistakes: [
      "Creating long chains of synchronous REST HTTP calls (Service A -> B -> C -> D creates cascading latency and failure points!)",
      "Not using binary Protocol Buffers for high-volume internal microservice RPC"
    ],
    bestPractices: [
      "Use Asynchronous Event-Driven messaging as the default for inter-service communication",
      "Use gRPC over HTTP/2 when synchronous low-latency calls are strictly required"
    ],
    whenToUse: ["In all microservice communication design"],
    whenNotToUse: ["Do not create deep synchronous REST call chains"],
    relatedConcepts: ["gRPC", "Protocol Buffers", "HTTP/2", "Asynchronous Messaging"],
    comparison: {
      title: "REST vs gRPC for Internal Microservices",
      headers: ["Metric", "REST (HTTP/1.1)", "gRPC (HTTP/2)"],
      rows: [
        ["Payload Format", "JSON (Text-based string)", "Protocol Buffers (Binary encoded)"],
        ["Performance", "Standard", "Ultra Fast (7x to 10x faster than REST/JSON)"],
        ["Streaming", "Unary request/response", "Bi-directional streaming support"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is gRPC significantly faster than REST for internal microservice communication?", answer: "gRPC uses binary Protocol Buffers (Protobuf) instead of text JSON payloads and operates over HTTP/2 (multiplexing multiple requests over a single TCP connection), resulting in 7x-10x faster execution and lower CPU overhead." }
    ],
    practiceProblem: {
      description: "Write file extension for Protocol Buffer schema files.",
      starterCode: `.proto`,
      testAssertion: "true",
      solution: `.proto`
    },
    quickRevision: "★ Prefer Asynchronous Event-Driven messaging (Kafka/RabbitMQ).\n★ Use gRPC over HTTP/2 for low-latency synchronous calls.\n★ Protocol Buffers (Protobuf) are 7x-10x faster than REST/JSON."
  }),

  // 5. DISTRIBUTED DATA MANAGEMENT
  "ms-data-management": createTopicSchema({
    id: "ms-data-management",
    techId: "microservices",
    title: "Distributed Data Management & CQRS Pattern",
    category: "Data Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["ms-communication"],
    definition: "Distributed Data Management uses the Database-per-Service pattern, Eventual Consistency, CQRS (Command Query Responsibility Segregation), and Event Sourcing to handle data across microservices.",
    simpleExplanation: "CQRS separates Read queries from Write commands, optimizing separate database engines for fast writes and fast search reads.",
    whyDoesItExist: "Prevents shared database contention and allows independent microservice data models.",
    basicExample: `# CQRS Pattern Architecture:
Client Command (Write)  ── > Write DB (PostgreSQL) ── [Publishes Domain Event]
                                                               │
                                                               ▼
Client Query (Read)     < ── Read DB (Elasticsearch / Redis Cache)`,
    howItWorks: [
      "1. Command Model executes writes/updates on Write DB.",
      "2. Domain Event published to event stream (Kafka).",
      "3. Read Model consumes event and updates Read DB (Elasticsearch/Redis) for fast query reads."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Write DB (Command) -&gt; Domain Event -&gt; Read DB (Query: Elasticsearch/Redis)</text></svg>`,
    realWorldExample: `// Event Sourcing: Storing audit history as immutable event logs:
[ { event: "OrderCreated", data: {...} }, { event: "OrderPaid", data: {...} } ]`,
    commonUseCases: [
      "Separating complex search reads (Elasticsearch) from transactional writes (PostgreSQL) with CQRS",
      "Enforcing Database-per-Service across microservice teams",
      "Storing complete audit histories with Event Sourcing"
    ],
    commonMistakes: [
      "Sharing database tables across microservice boundaries (violates encapsulation and creates deployment dependencies!)",
      "Applying CQRS to simple CRUD applications where 1 database suffices"
    ],
    bestPractices: [
      "Enforce Database-per-Service strictly",
      "Use CQRS when read performance demands differ significantly from write demands"
    ],
    whenToUse: ["In high-scale microservice data architectures"],
    whenNotToUse: ["Do not use CQRS for simple basic CRUD applications"],
    relatedConcepts: ["Database-per-Service", "CQRS", "Event Sourcing", "Eventual Consistency"],
    comparison: {
      title: "Shared Database vs Database-per-Service",
      headers: ["Pattern", "Shared Database", "Database-per-Service"],
      rows: [
        ["Coupling", "Tightly coupled (Changes break other services)", "Loosely coupled"],
        ["Transactions", "ACID transactions easy", "Requires Saga Pattern for distributed transactions"],
        ["Team Autonomy", "Low", "High"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is CQRS and what problem does it solve in microservices?", answer: "CQRS stands for Command Query Responsibility Segregation. It separates data write operations (Commands) from read operations (Queries), allowing write databases (SQL) and read databases (Elasticsearch/Redis) to scale independently." }
    ],
    practiceProblem: {
      description: "Write acronym for Command Query Responsibility Segregation.",
      starterCode: `CQRS`,
      testAssertion: "true",
      solution: `CQRS`
    },
    quickRevision: "★ Enforce Database-per-Service.\n★ CQRS separates Write commands from Read queries.\n★ Event Sourcing stores changes as an append-only event log."
  }),

  // 6. SAGA PATTERN
  "ms-saga-pattern": createTopicSchema({
    id: "ms-saga-pattern",
    techId: "microservices",
    title: "Distributed Transactions: The Saga Pattern",
    category: "Data Architecture",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["ms-data-management"],
    definition: "The Saga Pattern manages distributed transactions across microservices using a sequence of local transactions, executing Compensating Transactions to rollback previous steps if a step fails.",
    simpleExplanation: "A Saga coordinates a multi-step checkout (Create Order -> Charge Card -> Reserve Inventory). If inventory is out of stock, it executes compensating actions to refund the card and cancel the order.",
    whyDoesItExist: "Replaces slow blocking Two-Phase Commit (2PC) in distributed Database-per-Service architectures.",
    basicExample: `# Choreography-Based Saga Flow:
1. Order Service -> Create Pending Order -> Publishes "OrderCreated"
2. Payment Service -> Charges Card -> Publishes "PaymentSuccessful"
3. Inventory Service -> Insufficient Stock! -> Publishes "InventoryFailed"
4. Payment Service (Compensating Action) -> Refunds Card!
5. Order Service (Compensating Action) -> Cancels Order!`,
    howItWorks: [
      "1. Each microservice executes local ACID transaction and publishes domain event.",
      "2. Next service listens to event and executes its local transaction.",
      "3. If any step fails, compensating transactions execute backwards to undo changes."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Step 1 OK -&gt; Step 2 OK -&gt; Step 3 FAILS -&gt; Compensating Rollback (Step 2 &amp; 1)</text></svg>`,
    realWorldExample: `// Orchestration-Based Saga: Central Saga Orchestrator controls steps!`,
    commonUseCases: [
      "Managing multi-service e-commerce checkout transactions",
      "Processing travel bookings (Flight + Hotel + Car Rental)",
      "Executing distributed compensating rollbacks"
    ],
    commonMistakes: [
      "Trying to use 2PC (Two-Phase Commit) distributed locks across microservices (causes severe blocking and performance degradation!)",
      "Forgetting to implement idempotent Compensating Transactions"
    ],
    bestPractices: [
      "Make all Compensating Transactions strictly idempotent",
      "Use Orchestration-based Sagas for complex multi-step transactions"
    ],
    whenToUse: ["When maintaining data consistency across multiple microservice databases"],
    whenNotToUse: ["Do not use Sagas when operations occur within a single database"],
    relatedConcepts: ["Saga Pattern", "Choreography", "Orchestration", "Compensating Transaction"],
    comparison: {
      title: "Choreography vs Orchestration Saga",
      headers: ["Saga Type", "Coordination", "Pros & Cons"],
      rows: [
        ["Choreography", "Decentralized (Services react to domain events)", "Simple for 2-3 steps; hard to track for complex workflows"],
        ["Orchestration", "Centralized (Saga Orchestrator instructs services)", "Easy to monitor & control; orchestrator introduces central logic"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Compensating Transaction in the Saga Pattern?", answer: "A Compensating Transaction is an explicit undo action executed when a downstream step in a Saga fails. It reverses the effects of a previously committed local transaction (e.g. refunding a charged credit card)." }
    ],
    practiceProblem: {
      description: "Write term for rollback action in Saga Pattern.",
      starterCode: `Compensating Transaction`,
      testAssertion: "true",
      solution: `Compensating Transaction`
    },
    quickRevision: "★ Saga Pattern manages distributed transactions.\n★ Executes local transactions and publishes events.\n★ Fails? Runs Compensating Transactions to undo steps."
  }),

  // 7. SERVICE DISCOVERY
  "ms-service-discovery": createTopicSchema({
    id: "ms-service-discovery",
    techId: "microservices",
    title: "Service Discovery & Registration (Consul, Eureka & K8s DNS)",
    category: "Infrastructure",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["ms-saga-pattern"],
    definition: "Service Discovery allows microservices to locate target service IP addresses dynamically using a Service Registry (HashiCorp Consul, Netflix Eureka, or Kubernetes DNS).",
    simpleExplanation: "Service Discovery acts as a dynamic phonebook for microservices so services can find each other even as container IPs change constantly.",
    whyDoesItExist: "Eliminates hardcoded IP addresses in dynamic auto-scaling container environments.",
    basicExample: `# Kubernetes Service Discovery (Built-in DNS):
Order Service connects to: http://payment-service.production.svc.cluster.local:8080
(Kubernetes DNS resolves payment-service hostname to active container Pod IPs automatically!)`,
    howItWorks: [
      "1. Service instance launches and registers its IP/port with Service Registry.",
      "2. Service Registry performs health checks periodically.",
      "3. Client queries Registry or uses K8s DNS to resolve dynamic service endpoints."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Order Service -&gt; K8s DNS / Service Registry -&gt; Payment Service Pod IP</text></svg>`,
    realWorldExample: `# HashiCorp Consul Service Registration JSON:
{
  "service": {
    "name": "payment-service",
    "port": 8080,
    "check": { "http": "http://localhost:8080/health", "interval": "10s" }
  }
}`,
    commonUseCases: [
      "Resolving dynamic microservice container IP addresses in Kubernetes",
      "Managing Consul / Eureka service registries",
      "Client-side and Server-side load balancing"
    ],
    commonMistakes: [
      "Hardcoding static container IP addresses in application config files",
      "Not configuring health checks to remove dead service instances from registry"
    ],
    bestPractices: [
      "Rely on Kubernetes native DNS service discovery in containerized environments",
      "Configure active health checks on all registered services"
    ],
    whenToUse: ["In all dynamic microservice infrastructure deployments"],
    whenNotToUse: ["Do not use external service registries if running inside Kubernetes"],
    relatedConcepts: ["Service Discovery", "Service Registry", "Kubernetes DNS", "Consul"],
    comparison: {
      title: "Client-Side vs Server-Side Service Discovery",
      headers: ["Type", "Location of Lookup", "Examples"],
      rows: [
        ["Client-Side Discovery", "Client queries registry & selects target IP", "Netflix Eureka + Ribbon"],
        ["Server-Side Discovery", "Client connects to Load Balancer / DNS router", "Kubernetes ClusterIP Services, AWS ALB"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does Service Discovery work in Kubernetes?", answer: "Kubernetes has a built-in DNS service (CoreDNS). When a Kubernetes Service is created, CoreDNS assigns it a domain name (e.g. `payment-service`). Client pods connect to this hostname, and Kubernetes routes traffic automatically to healthy pod IPs." }
    ],
    practiceProblem: {
      description: "Write default Kubernetes DNS tool name.",
      starterCode: `CoreDNS`,
      testAssertion: "true",
      solution: `CoreDNS`
    },
    quickRevision: "★ Service Discovery acts as a dynamic IP phonebook.\n★ Kubernetes provides built-in DNS service discovery (CoreDNS).\n★ Removes dead instances automatically using health checks."
  }),

  // 8. RESILIENCE & CIRCUIT BREAKING
  "ms-circuit-breaker": createTopicSchema({
    id: "ms-circuit-breaker",
    techId: "microservices",
    title: "Resilience Patterns: Circuit Breakers, Bulkheads & Timeouts",
    category: "Resilience",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["ms-service-discovery"],
    definition: "Resilience patterns (Circuit Breaker, Bulkhead, Rate Limiting, Retry with Exponential Backoff) prevent cascading microservice outages by isolating failing downstream dependencies.",
    simpleExplanation: "A Circuit Breaker stops making requests to a failing microservice immediately (tripping Open), returning fallback responses until the service recovers.",
    whyDoesItExist: "Prevents a single failing microservice from causing a catastrophic cascading failure across the entire application.",
    basicExample: `# Circuit Breaker States:
1. Closed (Normal): Requests pass through to downstream service.
2. Open (Tripped): Downstream service failing (>50% errors). Rejects calls instantly! Returns fallback.
3. Half-Open (Testing): Allows trial requests to check if downstream service recovered.`,
    howItWorks: [
      "1. Circuit Breaker monitors downstream response failure rate.",
      "2. Error threshold exceeded -> Trips to OPEN state, returning fast fallback.",
      "3. Sleep window expires -> Switches to HALF-OPEN to test recovery."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Closed (Normal) -- [Errors &gt; 50%] --&gt; Open (Rejects Calls) -- [Timeout] --&gt; Half-Open</text></svg>`,
    realWorldExample: `// Node.js Opossum Circuit Breaker Example:
import CircuitBreaker from 'opossum';

const breaker = new CircuitBreaker(callPaymentService, { timeout: 3000, errorThresholdPercentage: 50 });
breaker.fallback(() => ({ status: 'payment_pending_fallback' }));
const result = await breaker.fire(paymentData);`,
    commonUseCases: [
      "Protecting application APIs from slow downstream third-party services",
      "Using Bulkhead pattern to isolate thread pools between services",
      "Implementing Retries with Exponential Backoff and Jitter"
    ],
    commonMistakes: [
      "Retrying failed requests instantly without exponential backoff (causes Thundering Herd on recovering services!)",
      "Not defining fallback responses when a circuit breaker trips open"
    ],
    bestPractices: [
      "Always add exponential backoff and randomized jitter to retries",
      "Provide meaningful fallback responses when circuit breakers trip"
    ],
    whenToUse: ["In all inter-service microservice communications"],
    whenNotToUse: ["Do not use circuit breakers for local in-memory function calls"],
    relatedConcepts: ["Circuit Breaker", "Opossum", "Bulkhead Pattern", "Exponential Backoff"],
    comparison: {
      title: "Circuit Breaker States",
      headers: ["State", "Behavior", "Transition Condition"],
      rows: [
        ["Closed", "Passes all requests to downstream service", "Trips OPEN if error rate exceeds threshold"],
        ["Open", "Fails fast immediately (returns fallback without calling downstream)", "Transitions to HALF-OPEN after sleep timeout"],
        ["Half-Open", "Allows limited trial requests to check downstream health", "Closes if trials succeed; Re-opens if trials fail"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What are the 3 states of a Circuit Breaker and how do they function?", answer: "1) Closed (normal operation: requests pass through), 2) Open (tripped state: downstream service is failing, requests fail fast instantly returning a fallback), and 3) Half-Open (trial state: test requests check if downstream service has recovered)." }
    ],
    practiceProblem: {
      description: "Write Circuit Breaker state name when rejecting calls immediately.",
      starterCode: `Open`,
      testAssertion: "true",
      solution: `Open`
    },
    quickRevision: "★ Circuit Breakers prevent cascading microservice outages.\n★ 3 States: Closed (Normal), Open (Failing/Fallback), Half-Open (Testing).\n★ Always use Exponential Backoff + Jitter for retries."
  }),

  // 9. DISTRIBUTED TRACING
  "ms-tracing-logging": createTopicSchema({
    id: "ms-tracing-logging",
    techId: "microservices",
    title: "Distributed Tracing, Centralized Logging & OpenTelemetry",
    category: "Observability",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["ms-circuit-breaker"],
    definition: "Distributed Tracing and Logging collects metrics, logs (ELK Stack), and request traces (OpenTelemetry, Jaeger, Zipkin) using Correlation IDs across microservices.",
    simpleExplanation: "Distributed tracing tracks a single user request as it travels across 10 microservices, showing exact timing breakdowns per service.",
    whyDoesItExist: "Diagnoses cross-service latency bottlenecks and pinpoint microservice error locations.",
    basicExample: `# OpenTelemetry Distributed Trace Flow:
HTTP Request (X-Correlation-ID: 1001)
 ├── API Gateway [5ms]
 ├── Auth Service [12ms]
 ├── Order Service [45ms]
 │    └── Payment Service (gRPC) [120ms] -> Bottleneck!
 └── Notification Service [8ms]`,
    howItWorks: [
      "1. API Gateway generates unique Trace ID / Correlation ID.",
      "2. Propagated via HTTP headers (traceparent) across all microservices.",
      "3. OpenTelemetry Collectors send spans to Jaeger / Zipkin visualization dashboards."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Trace ID -&gt; Service A (Span 1) -&gt; Service B (Span 2) -&gt; Jaeger Timeline</text></svg>`,
    realWorldExample: `// OpenTelemetry Node.js SDK initialization:
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
const sdk = new NodeSDK({ instrumentations: [getNodeAutoInstrumentations()] });
sdk.start();`,
    commonUseCases: [
      "Tracing request latency across microservice boundaries with OpenTelemetry",
      "Visualizing span waterfall timelines in Jaeger / Zipkin",
      "Aggregating application logs into ELK (Elasticsearch, Logstash, Kibana) Stack"
    ],
    commonMistakes: [
      "Dropping Correlation IDs when calling downstream services",
      "Logging sensitive passwords or PII data in centralized logs"
    ],
    bestPractices: [
      "Use OpenTelemetry as the vendor-neutral tracing standard",
      "Propagate W3C Trace Context headers (traceparent) across HTTP/gRPC calls"
    ],
    whenToUse: ["In all production microservice architectures"],
    whenNotToUse: ["Do not skip correlation ID propagation in HTTP clients"],
    relatedConcepts: ["OpenTelemetry", "Jaeger", "Trace ID", "Span", "Correlation ID"],
    comparison: {
      title: "Trace ID vs Span ID",
      headers: ["Concept", "Scope", "Purpose"],
      rows: [
        ["Trace ID", "Global across entire request journey", "Uniquely identifies the full end-to-end request across all services"],
        ["Span ID", "Local to a specific operation within 1 service", "Identifies a single work segment (e.g. DB query execution time)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is OpenTelemetry and why has it become the industry standard for distributed tracing?", answer: "OpenTelemetry (OTel) is a vendor-neutral CNCF open-source framework providing unified APIs, SDKs, and tooling to generate, collect, and export telemetry data (metrics, logs, traces) to any backend (Jaeger, Datadog, Prometheus)." }
    ],
    practiceProblem: {
      description: "Write W3C trace context header name.",
      starterCode: `traceparent`,
      testAssertion: "true",
      solution: `traceparent`
    },
    quickRevision: "★ OpenTelemetry is the industry standard for distributed tracing.\n★ Trace ID tracks full request journey; Span ID tracks local work segment.\n★ Propagate W3C traceparent headers across services."
  }),

  // 10. DEPLOYMENT & SERVICE MESH
  "ms-deployment": createTopicSchema({
    id: "ms-deployment",
    techId: "microservices",
    title: "Microservice Deployment, Service Mesh (Istio) & Deployment Strategies",
    category: "Deployment",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["ms-tracing-logging"],
    definition: "Microservice Deployment leverages Kubernetes, Helm Charts, Service Mesh (Istio/Linkerd for sidecar proxy traffic control), and zero-downtime deployment strategies (Canary, Blue-Green).",
    simpleExplanation: "Canary deployments test new code on 5% of users before full rollout. Service Mesh (Istio) manages sidecar proxies for encrypted service-to-service traffic.",
    whyDoesItExist: "Provides safe zero-downtime releases and automated traffic management.",
    basicExample: `# Canary Deployment Strategy Flow:
1. Deploy v2.0 Canary version (5% traffic)
2. Monitor error rates in Grafana for 15 minutes
3. No errors -> Promote v2.0 to 100% traffic!
4. Errors detected -> Rollback v2.0 to 0% traffic instantly!`,
    howItWorks: [
      "1. Service Mesh injects Envoy sidecar proxies alongside application containers in Pods.",
      "2. Sidecar proxies handle mTLS encryption, traffic splitting, and retries transparently.",
      "3. ArgoCD / Flagger automates Canary deployment rollouts."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Canary Release (5% Traffic) -&gt; Grafana Check -&gt; 100% Full Rollout</text></svg>`,
    realWorldExample: `# Istio VirtualService Canary Traffic Split (95% v1, 5% v2):
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
spec:
  http:
  - route:
    - destination: { host: my-svc, subset: v1 }, weight: 95
    - destination: { host: my-svc, subset: v2 }, weight: 5`,
    commonUseCases: [
      "Executing zero-downtime Canary deployments with ArgoCD and Istio",
      "Enforcing mutual TLS (mTLS) encryption between microservices via Service Mesh",
      "Blue-Green environment deployments"
    ],
    commonMistakes: [
      "Deploying microservices using big-bang deployment releases (defeats microservice independence!)",
      "Adopting a heavy Service Mesh (Istio) when simple Kubernetes networking suffices"
    ],
    bestPractices: [
      "Use Canary deployments for safe production releases",
      "Use GitOps (ArgoCD/Flux) for Kubernetes deployment automation"
    ],
    whenToUse: ["In high-scale production microservice deployments"],
    whenNotToUse: ["Do not adopt Istio prematurely for small 3-service clusters"],
    relatedConcepts: ["Canary Deployment", "Blue-Green", "Service Mesh", "Istio", "Envoy Sidecar"],
    comparison: {
      title: "Blue-Green vs Canary Deployment",
      headers: ["Strategy", "Mechanism", "Rollback Speed"],
      rows: [
        ["Blue-Green", "2 complete identical environments (Green active, Blue standby); switch 100% router traffic", "Instant (Switch router back to Blue)"],
        ["Canary Deployment", "Gradually shift traffic to new v2 version (5% -> 25% -> 100%)", "Fast (Scale down Canary traffic)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is a Service Mesh (e.g. Istio) and how does the Sidecar Proxy pattern work?", answer: "A Service Mesh manages service-to-service communication by deploying lightweight sidecar proxies (e.g. Envoy) alongside each application container. The proxies handle mTLS encryption, traffic routing, retries, and metrics without modifying application code." }
    ],
    practiceProblem: {
      description: "Write deployment strategy name for testing new code on 5% traffic.",
      starterCode: `Canary Deployment`,
      testAssertion: "true",
      solution: `Canary Deployment`
    },
    quickRevision: "★ Canary deployments release new code to 5% of users first.\n★ Blue-Green switches 100% router traffic between 2 environments.\n★ Service Mesh (Istio) uses Envoy sidecar proxies for mTLS & traffic control."
  })
};
