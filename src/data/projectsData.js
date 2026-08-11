export const projectsData = [
  {
    id: "todo-crud",
    title: "Full-Stack Task Manager (CRUD)",
    tier: "Beginner",
    experienceBand: "0–1 year",
    category: "Full Stack",
    description: "Build a responsive task management system with user auth, categories, priority tags, and status filtering.",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
    requirements: [
      "JWT User Registration & Login",
      "CRUD operations for Task items",
      "Filter by status (Pending, Completed, In-Progress)",
      "Database schema with index on userId"
    ],
    architecture: `React Frontend <---> Express REST API <---> MongoDB`,
    dbSchema: `User { id, email, passwordHash }\nTask { id, userId, title, status, dueDate }`,
    apiEndpoints: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/tasks",
      "POST /api/tasks",
      "PUT /api/tasks/:id",
      "DELETE /api/tasks/:id"
    ],
    interviewQuestions: [
      "How do you hash passwords securely before saving to database?",
      "How do you structure JWT middleware to protect private API routes?"
    ]
  },

  {
    id: "ecommerce-api",
    title: "E-Commerce REST API & Payment Engine",
    tier: "Intermediate",
    experienceBand: "2–4 years",
    category: "Backend",
    description: "Production-ready backend API featuring product catalogs, cart management, Stripe checkout, order status webhooks, and inventory locking.",
    technologies: ["Node.js", "Laravel", "MySQL", "Redis", "Stripe API", "Docker"],
    requirements: [
      "ACID Transactional checkout process",
      "Redis Caching for high-traffic product catalog queries",
      "Stripe Webhook signature validation for payment confirmation",
      "Database pessimistic locking to prevent double-selling inventory"
    ],
    architecture: `API Gateway -> Laravel / Node Service -> MySQL (Master/Replica) + Redis Cache -> Stripe API`,
    dbSchema: `Products { id, name, price, stock, sku }\nOrders { id, userId, total, status, paymentRef }\nOrderItems { id, orderId, productId, qty, unitPrice }`,
    apiEndpoints: [
      "GET /api/products?category=tech",
      "POST /api/cart/items",
      "POST /api/checkout",
      "POST /api/webhooks/stripe"
    ],
    interviewQuestions: [
      "How do you handle inventory race conditions when 100 users try to buy the last 1 item simultaneously?",
      "How do you process Stripe webhooks idempotently?"
    ]
  },

  {
    id: "notification-platform",
    title: "Distributed High-Volume Notification Platform",
    tier: "Senior",
    experienceBand: "6–10 years",
    category: "System Design & Architecture",
    description: "Architect a resilient multi-channel notification engine (Email, SMS, Push) capable of dispatching 10M messages/day with queue retries and rate limiting.",
    technologies: ["Node.js", "Laravel", "Redis (BullMQ)", "Kafka / RabbitMQ", "PostgreSQL", "Docker", "AWS SES / Twilio"],
    requirements: [
      "Asynchronous job queue dispatch with priority workers",
      "Idempotency token deduplication to avoid double-sending emails",
      "Dead Letter Queue (DLQ) for permanently failed notifications",
      "Tenant rate limiting (Max 500 SMS/min per client account)"
    ],
    architecture: `API Producer -> Kafka Event Stream -> Consumer Queue Workers -> Redis Rate Limiter -> Twilio/SES Gateway -> DLQ`,
    dbSchema: `Templates { id, channel, body }\nNotifications { id, recipient, payload, status, retries, dlqReason }`,
    apiEndpoints: [
      "POST /v1/notifications/send-bulk",
      "GET /v1/notifications/status/:id"
    ],
    interviewQuestions: [
      "How do you ensure at-least-once message delivery while preventing duplicate SMS dispatches?",
      "What happens when Twilio API goes down for 30 minutes?"
    ]
  }
];
