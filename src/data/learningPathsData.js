export const learningPathsData = [
  {
    id: "backend-developer",
    title: "Backend Developer Path",
    role: "Senior Backend Engineer",
    icon: "fa-solid fa-server",
    color: "#6366f1",
    description: "Master backend programming, APIs, database indexing, caching, asynchronous queues, and microservices architecture.",
    steps: [
      { step: 1, title: "Programming Fundamentals", techId: "javascript", desc: "Master ES6+, Async/Await, Scope & Closures" },
      { step: 2, title: "Backend Runtime & Framework", techId: "nodejs", desc: "Node.js Event Loop, Express & REST API conventions" },
      { step: 3, title: "Relational & NoSQL Storage", techId: "postgresql", desc: "PostgreSQL joins, indexing, and MongoDB documents" },
      { step: 4, title: "Caching & Queues", techId: "redis", desc: "Redis caching patterns, BullMQ job queues" },
      { step: 5, title: "Containerization & Cloud", techId: "docker", desc: "Docker Compose, AWS EC2, S3, RDS deployment" },
      { step: 6, title: "Distributed Architecture", techId: "system-design", desc: "Load Balancing, Rate Limiting, Microservices" }
    ]
  },

  {
    id: "laravel-specialist",
    title: "Laravel & PHP Enterprise Path",
    role: "Lead Laravel Developer",
    icon: "fa-brands fa-laravel",
    color: "#ff2d20",
    description: "Complete track for building high-scale Laravel web platforms, API services, microservices, and SaaS systems.",
    steps: [
      { step: 1, title: "Modern PHP 8.x", techId: "php", desc: "OOP, Attributes, Enums, Interfaces, Composer" },
      { step: 2, title: "Laravel Framework Core", techId: "laravel", desc: "Eloquent ORM, Blade, Migrations, Seeders" },
      { step: 3, title: "Laravel Advanced Architecture", techId: "laravel", desc: "Service Container, Service Providers, Contracts" },
      { step: 4, title: "Queues & Redis", techId: "redis", desc: "Laravel Horizon, Queued Jobs, Redis Caching" },
      { step: 5, title: "Docker & AWS Deployment", techId: "devops", desc: "Dockerized Laravel, AWS EC2, NGINX, SSL" }
    ]
  },

  {
    id: "software-architect",
    title: "Software Architect Path",
    role: "Principal Software Architect",
    icon: "fa-solid fa-cubes",
    color: "#a855f7",
    description: "Designed for experienced developers transitioning to high-level system architecture, distributed reliability, and trade-off design.",
    steps: [
      { step: 1, title: "Enterprise Microservices", techId: "microservices", desc: "Domain-Driven Design, API Gateways, Service Mesh" },
      { step: 2, title: "Distributed Storage & Sharding", techId: "mysql", desc: "Database Replication, Partitioning, Consistent Hashing" },
      { step: 3, title: "High-Throughput Messaging", techId: "system-design", desc: "Kafka Event Streaming, Saga Pattern, Idempotency" },
      { step: 4, title: "DevOps & Observability", techId: "devops", desc: "Distributed Tracing, Prometheus, Grafana, Cost Optimization" }
    ]
  }
];
