export const systemDesignData = [
  {
    id: "load-balancer",
    title: "Load Balancers & Reverse Proxies",
    difficulty: "Architect",
    readingTime: "15 min",
    summary: "Distributes incoming network traffic across multiple backend servers to ensure high availability and responsiveness.",
    algorithms: ["Round Robin", "Weighted Round Robin", "Least Connections", "IP Hash"],
    diagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2">
      <rect x="20" y="65" width="100" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="70" y="95" fill="#38bdf8" text-anchor="middle" font-weight="bold">Clients</text>
      
      <path d="M 120 90 L 220 90" stroke="#94a3b8" stroke-width="2"/>
      
      <rect x="220" y="40" width="160" height="100" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
      <text x="300" y="80" fill="#c084fc" text-anchor="middle" font-weight="bold">Load Balancer</text>
      <text x="300" y="105" fill="#94a3b8" text-anchor="middle" font-size="11">NGINX / HAProxy</text>

      <path d="M 380 65 L 480 35" stroke="#10b981" stroke-width="2"/>
      <path d="M 380 90 L 480 90" stroke="#10b981" stroke-width="2"/>
      <path d="M 380 115 L 480 145" stroke="#10b981" stroke-width="2"/>

      <rect x="480" y="15" width="140" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="550" y="40" fill="#34d399" text-anchor="middle">Server Node 1</text>
      <rect x="480" y="70" width="140" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="550" y="95" fill="#34d399" text-anchor="middle">Server Node 2</text>
      <rect x="480" y="125" width="140" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="550" y="150" fill="#34d399" text-anchor="middle">Server Node 3</text>
    </svg>`,
    keyConcepts: [
      "Layer 4 (Transport Layer TCP/UDP) vs Layer 7 (Application Layer HTTP/HTTPS) balancing.",
      "SSL/TLS Termination at Load Balancer level.",
      "Health Checks & Failover auto-draining."
    ]
  },

  {
    id: "redis-caching",
    title: "Distributed Caching & Redis Strategies",
    difficulty: "Senior",
    readingTime: "14 min",
    summary: "In-memory caching patterns to reduce database latency from 100ms down to sub-1ms.",
    strategies: ["Cache-Aside (Lazy Loading)", "Write-Through", "Write-Behind (Write-Back)", "Refresh-Ahead"],
    diagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2">
      <rect x="30" y="65" width="120" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="90" y="95" fill="#38bdf8" text-anchor="middle" font-weight="bold">App Server</text>

      <!-- Hit -->
      <path d="M 150 75 L 300 45" stroke="#10b981" stroke-width="2"/>
      <rect x="300" y="20" width="160" height="50" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="380" y="50" fill="#34d399" text-anchor="middle" font-weight="bold">Redis (Sub-1ms)</text>

      <!-- Miss -->
      <path d="M 150 105 L 300 135" stroke="#f59e0b" stroke-width="2"/>
      <rect x="300" y="110" width="160" height="50" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="380" y="140" fill="#fbbf24" text-anchor="middle" font-weight="bold">DB (50-100ms)</text>
    </svg>`,
    keyConcepts: [
      "Cache Penetration & Bloom Filters.",
      "Cache Avalanche & Jittered Expiration times.",
      "Cache Stampede (Thundering Herd) & Redis Distributed Locks (`SET key val NX EX`)."
    ]
  },

  {
    id: "message-queues",
    title: "Message Queues & Event-Driven Architecture",
    difficulty: "Architect",
    readingTime: "18 min",
    summary: "Asynchronous messaging brokers (RabbitMQ, Kafka) decouples producers from consumers for scalable asynchronous job processing.",
    patterns: ["Point-to-Point Queue", "Publish-Subscribe (Pub/Sub)", "Event Sourcing"],
    diagram: `<svg viewBox="0 0 700 160" class="w-full bg-slate-900 rounded-lg p-2">
      <rect x="30" y="55" width="120" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="90" y="85" fill="#38bdf8" text-anchor="middle" font-weight="bold">Producer</text>

      <path d="M 150 80 L 250 80" stroke="#94a3b8" stroke-width="2"/>

      <rect x="250" y="35" width="200" height="90" rx="8" fill="#0f172a" stroke="#f97316" stroke-width="2"/>
      <text x="350" y="70" fill="#fb923c" text-anchor="middle" font-weight="bold">RabbitMQ / Kafka</text>
      <text x="350" y="95" fill="#cbd5e1" font-size="11" text-anchor="middle">Broker Queue</text>

      <path d="M 450 80 L 550 80" stroke="#94a3b8" stroke-width="2"/>

      <rect x="550" y="55" width="120" height="50" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="610" y="85" fill="#34d399" text-anchor="middle" font-weight="bold">Consumer</text>
    </svg>`,
    keyConcepts: [
      "At-least-once vs Exactly-once message processing guarantees.",
      "Dead Letter Queues (DLQ) for poison pill message isolation.",
      "Kafka Partition Log Offsets."
    ]
  }
];
