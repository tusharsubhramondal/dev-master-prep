import { createTopicSchema } from './createTopicSchema.js';

export const redisTopics = {
  // 1. IN-MEMORY STORAGE CONCEPTS
  "redis-basics": createTopicSchema({
    id: "redis-basics",
    techId: "redis",
    title: "In-Memory Storage Concepts & Use Cases",
    category: "Redis Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Database Fundamentals"],
    definition: "Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, streaming engine, and message broker, delivering sub-millisecond response times.",
    simpleExplanation: "Redis stores all data directly in RAM memory instead of disk, making reads and writes super fast (microseconds).",
    whyDoesItExist: "Eliminates disk I/O bottlenecks for high-frequency data caching, session management, and rate limiting.",
    basicExample: `// Redis CLI Basic Commands
SET user:100 "Alice" EX 60  // Set key with 60s TTL
GET user:100                 // Returns "Alice"
DEL user:100                 // Deletes key`,
    howItWorks: [
      "1. Redis single-threaded event loop processes commands in RAM memory.",
      "2. Executes operations in sub-millisecond time with zero disk wait.",
      "3. Asynchronously persists snapshots (RDB) or write logs (AOF) to disk for safety."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#dc2626" stroke-width="2"/><text x="350" y="95" fill="#f87171" font-weight="bold" text-anchor="middle">Single-Threaded RAM Memory Engine (Sub-ms Latency)</text></svg>`,
    realWorldExample: `// Node.js (ioredis) Example:
import Redis from 'ioredis';
const redis = new Redis();
await redis.set('user:1', JSON.stringify({ name: 'Alice' }), 'EX', 60);

// Laravel (Cache Facade) Example:
use Illuminate\\Support\\Facades\\Cache;
Cache::put('user:1', ['name' => 'Alice'], 60);`,
    commonUseCases: [
      "Caching database query results to achieve sub-millisecond speeds",
      "Storing user authentication sessions across distributed web nodes",
      "Managing API rate limiting counters"
    ],
    commonMistakes: [
      "Using Redis as a primary relational database without persistence configuration",
      "Storing multi-gigabyte objects causing RAM memory exhaustion"
    ],
    bestPractices: [
      "Set TTL (time-to-live) expiration on all cache keys",
      "Use descriptive key namespacing (e.g. app:users:100)"
    ],
    whenToUse: ["When data requires sub-millisecond latency or high-concurrency caching"],
    whenNotToUse: ["When data requires complex multi-table SQL joins"],
    relatedConcepts: ["In-Memory RAM", "TTL", "Key Eviction", "Single Threaded"],
    comparison: {
      title: "RAM (Redis) vs Disk (SQL Database)",
      headers: ["Metric", "In-Memory RAM (Redis)", "Disk Storage (SQL)"],
      rows: [
        ["Read/Write Latency", "Microseconds (Sub-millisecond)", "Milliseconds (Disk I/O)"],
        ["Data Loss Risk", "Requires RDB/AOF configuration", "Durability guaranteed by default"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is Redis extremely fast?", answer: "Redis operates entirely in RAM memory avoiding disk I/O, uses a single-threaded non-blocking event loop eliminating thread context switching, and utilizes efficient C data structures." }
    ],
    practiceProblem: {
      description: "Write Redis CLI command to set key with 60s expiration.",
      starterCode: `SET session:123 "active" EX 60`,
      testAssertion: "true",
      solution: `SET session:123 "active" EX 60`
    },
    quickRevision: "★ Redis stores data in RAM for sub-ms latency.\n★ Node uses ioredis; Laravel uses Cache:: facade.\n★ Always set TTL to prevent RAM overflow."
  }),

  // 2. CORE DATA STRUCTURES
  "redis-datastructures": createTopicSchema({
    id: "redis-datastructures",
    techId: "redis",
    title: "Redis Data Structures: Strings, Hashes, Lists & Sets",
    category: "Redis Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["redis-basics"],
    definition: "Redis provides rich native data structures: Strings (binary-safe values up to 512MB), Hashes (field-value maps), Lists (linked lists for queues), and Sets (unique unordered collections).",
    simpleExplanation: "Redis is not just a key-value store; it provides native objects, arrays, queues, and unique sets stored directly in RAM.",
    whyDoesItExist: "Eliminates serialization overhead by allowing atomic mutations on native complex data structures.",
    basicExample: `// 1. Hashes (Object mapping)
HSET user:100 name "Alice" email "alice@example.com"
HGET user:100 name

// 2. Lists (Queue LPUSH/RPOP)
LPUSH queue:jobs "job1" "job2"
RPOP queue:jobs

// 3. Sets (Unique values)
SADD tags:js "node" "react" "vue"`,
    howItWorks: [
      "1. Hashes optimized using ziplist (compact memory) or hashtable.",
      "2. Lists implemented as quicklists (doubly linked list of ziplists).",
      "3. Set operations (SINTER, SUNION) perform set math in RAM memory."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Redis Data Structures: Strings | Hashes | Lists | Sets</text></svg>`,
    realWorldExample: `// Node.js (ioredis):
await redis.hset('user:100', 'name', 'Alice', 'role', 'admin');

// Laravel (Redis Facade):
use Illuminate\\Support\\Facades\\Redis;
Redis::hset('user:100', 'name', 'Alice');`,
    commonUseCases: [
      "Storing user profile fields using Hashes",
      "Building message queues using Lists (LPUSH / RPOP)",
      "Tracking unique user visits or tags using Sets"
    ],
    commonMistakes: [
      "Storing large JSON strings in Strings when Hashes would allow field-level updates",
      "Running heavy O(N) commands like KEYS * in production (blocks Redis single thread!)"
    ],
    bestPractices: [
      "Use Hashes to store objects with multiple fields",
      "Use SCAN instead of KEYS * to search keys safely"
    ],
    whenToUse: ["In all native structure operations in Redis"],
    whenNotToUse: ["Do not run KEYS * in production"],
    relatedConcepts: ["Hashes", "Lists", "Sets", "ZipList", "SCAN"],
    comparison: {
      title: "String JSON vs Redis Hash",
      headers: ["Structure", "Field Updates", "Memory"],
      rows: [
        ["String JSON", "Must re-serialize full JSON on every update", "Higher overhead"],
        ["Redis Hash", "Update individual fields atomically (HSET)", "Compact ziplist memory"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is running KEYS * dangerous in production Redis?", answer: "Redis is single-threaded. KEYS * scans every key in RAM in O(N) time, blocking all other incoming web requests until the scan completes." }
    ],
    practiceProblem: {
      description: "Write Redis HSET command for user name.",
      starterCode: `HSET user:1 name "Alice"`,
      testAssertion: "true",
      solution: `HSET user:1 name "Alice"`
    },
    quickRevision: "★ Hashes store objects with field updates.\n★ Lists act as queues (LPUSH / RPOP).\n★ Never run KEYS * in production; use SCAN."
  }),

  // 3. SORTED SETS & TTL
  "redis-sorted-sets": createTopicSchema({
    id: "redis-sorted-sets",
    techId: "redis",
    title: "Sorted Sets (ZSET), TTL & Eviction Policies",
    category: "Redis Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["redis-datastructures"],
    definition: "Sorted Sets (ZSET) maintain unique elements ordered by a floating-point score using a SkipList. Key expiration (EXPIRE/TTL) and Maxmemory eviction policies (allkeys-lru, volatile-lru) manage RAM usage.",
    simpleExplanation: "Sorted Sets automatically rank elements by score (perfect for game leaderboards). Eviction policies automatically delete old keys when RAM fills up.",
    whyDoesItExist: "Provides O(log N) leaderboard ranking and automatic memory management when RAM limit is reached.",
    basicExample: `// 1. Leaderboard with Sorted Set (ZSET)
ZADD leaderboard 1500 "PlayerA"
ZADD leaderboard 2200 "PlayerB"
ZREVRANGE leaderboard 0 2 WITHSCORES // Top players

// 2. TTL & Expiration
EXPIRE leaderboard 3600`,
    howItWorks: [
      "1. Sorted Sets use a dual structure: Hash Table (O(1) lookup) + SkipList (O(log N) range queries).",
      "2. Maxmemory limit reached -> Redis triggers Eviction Policy (e.g. allkeys-lru).",
      "3. Evicts least recently used keys to free RAM for new writes."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">ZSET (SkipList + HashTable) -&gt; Maxmemory LRU Eviction</text></svg>`,
    realWorldExample: `// Node.js (ioredis) Leaderboard:
await redis.zadd('game:scores', 4500, 'user:10');

// Laravel (Redis Facade) Leaderboard:
Redis::zadd('game:scores', 4500, 'user:10');`,
    commonUseCases: [
      "Building real-time gaming leaderboards and trending item lists",
      "Implementing sliding-window rate limiters",
      "Automatic cache eviction using allkeys-lru"
    ],
    commonMistakes: [
      "Not configuring maxmemory-policy in redis.conf (defaults to noeviction, throwing OOM errors on writes!)",
      "Storing timestamps as scores without bounding set size"
    ],
    bestPractices: [
      "Set maxmemory-policy allkeys-lru for pure caching servers",
      "Use ZREVRANGE to query top rankings efficiently"
    ],
    whenToUse: ["When building leaderboards or rate limiters"],
    whenNotToUse: ["When ordering does not matter (use standard Sets)"],
    relatedConcepts: ["ZSET", "SkipList", "allkeys-lru", "TTL", "Rate Limiter"],
    comparison: {
      title: "allkeys-lru vs volatile-lru",
      headers: ["Eviction Policy", "Target Keys", "Behavior"],
      rows: [
        ["allkeys-lru", "ALL keys in database", "Evicts least recently used key regardless of TTL"],
        ["volatile-lru", "ONLY keys with TTL set", "Evicts LRU key among keys with expiration set"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What data structures power Redis Sorted Sets (ZSET)?", answer: "Redis Sorted Sets use a dual internal data structure: a Hash Table for O(1) key lookups, and a SkipList for O(log N) score-based range queries and ordering." }
    ],
    practiceProblem: {
      description: "Write ZADD command adding player with score 100.",
      starterCode: `ZADD scores 100 "player1"`,
      testAssertion: "true",
      solution: `ZADD scores 100 "player1"`
    },
    quickRevision: "★ ZSET uses SkipList + Hash Table for ranking.\n★ Use allkeys-lru for caching servers.\n★ Set maxmemory in redis.conf to prevent OOM errors."
  }),

  // 4. CACHING PATTERNS
  "redis-caching-patterns": createTopicSchema({
    id: "redis-caching-patterns",
    techId: "redis",
    title: "Caching Strategies & Thundering Herd Prevention",
    category: "Patterns",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["redis-sorted-sets"],
    definition: "Caching design patterns include Cache-Aside (Lazy Loading), Write-Through, Write-Behind, and strategies to prevent Cache Stampede (Thundering Herd / Cache Penetration).",
    simpleExplanation: "Cache-Aside checks Redis first. If missing (cache miss), it fetches from SQL DB, populates Redis, and returns the data.",
    whyDoesItExist: "Protects database servers from being crushed by massive query spikes.",
    basicExample: `// Cache-Aside Pattern Implementation
async function getProduct(productId) {
  const cacheKey = \`product:\${productId}\`;
  
  // 1. Check Redis Cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Cache Miss: Fetch from DB
  const product = await db.products.findById(productId);

  // 3. Populate Cache with TTL
  await redis.set(cacheKey, JSON.stringify(product), 'EX', 300);
  return product;
}`,
    howItWorks: [
      "1. App queries Redis cache key.",
      "2. Cache Hit -> Returns data immediately in microsecond speed.",
      "3. Cache Miss -> Queries SQL database, writes result to Redis with TTL, returns response."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">App -&gt; Redis (Hit: Return) | (Miss: Query DB -&gt; Set Redis)</text></svg>`,
    realWorldExample: `// Laravel Cache-Aside in 1 Line:
use Illuminate\\Support\\Facades\\Cache;

$product = Cache::remember("product:$id", 300, function() use ($id) {
    return Product::find($id);
});`,
    commonUseCases: [
      "Implementing Cache-Aside pattern for slow database queries",
      "Using Cache::remember() in Laravel services",
      "Preventing Cache Stampedes with mutex locks"
    ],
    commonMistakes: [
      "Not setting TTL on cached items causing stale data bugs",
      "Cache Breakdown: Popular hot key expires, causing 10,000 concurrent DB queries simultaneously"
    ],
    bestPractices: [
      "Use Laravel's Cache::remember() or Node ioredis wrappers for clean Cache-Aside",
      "Use distributed locks (mutex) to prevent Thundering Herd on cache misses"
    ],
    whenToUse: ["In all high-read web applications"],
    whenNotToUse: ["When data changes every millisecond and reads are rare"],
    relatedConcepts: ["Cache-Aside", "Cache Stampede", "Thundering Herd", "Cache::remember"],
    comparison: {
      title: "Cache-Aside vs Write-Through",
      headers: ["Pattern", "Read Flow", "Write Flow"],
      rows: [
        ["Cache-Aside", "App checks cache -> DB on miss", "App writes to DB -> invalidates cache"],
        ["Write-Through", "App reads from cache", "App writes to cache -> cache updates DB synchronously"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Cache Stampede (Thundering Herd) and how do you solve it?", answer: "A Cache Stampede occurs when a high-traffic cached key expires, causing thousands of concurrent requests to hit the database simultaneously. Solve it using Distributed Locks (mutex) so only ONE process queries the DB and updates the cache while others wait." }
    ],
    practiceProblem: {
      description: "Write Laravel Cache::remember code snippet.",
      starterCode: `return Cache::remember('user:1', 60, fn() => User::find(1));`,
      testAssertion: "true",
      solution: `return Cache::remember('user:1', 60, fn() => User::find(1));`
    },
    quickRevision: "★ Cache-Aside: Check cache -> fetch DB on miss -> populate cache.\n★ Laravel Cache::remember handles Cache-Aside automatically.\n★ Protect hot keys from Cache Stampede using locks."
  }),

  // 5. PUB/SUB & MESSAGING
  "redis-pubsub": createTopicSchema({
    id: "redis-pubsub",
    techId: "redis",
    title: "Redis Pub/Sub & Real-Time Messaging",
    category: "Messaging",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["redis-caching-patterns"],
    definition: "Redis Pub/Sub is a lightweight at-most-once messaging pattern where Publishers send messages to Channels, instantly delivering them to connected Subscribers.",
    simpleExplanation: "Pub/Sub works like radio broadcasting. Publishers broadcast messages, and active subscribers receive them in real-time.",
    whyDoesItExist: "Enables real-time push notifications, chat rooms, and web sockets across microservices.",
    basicExample: `// Publisher Terminal:
PUBLISH notifications "New Order #1001 Placed"

// Subscriber Terminal:
SUBSCRIBE notifications`,
    howItWorks: [
      "1. Subscriber connects and registers channel in Redis memory.",
      "2. Publisher sends message to channel.",
      "3. Redis pushes message directly to active TCP subscriber sockets (Fire-and-Forget)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Publisher -&gt; Redis Channel -&gt; Subscriber 1 | Subscriber 2</text></svg>`,
    realWorldExample: `// Node.js (ioredis) Subscriber:
const sub = new Redis();
sub.subscribe('chat:room1');
sub.on('message', (channel, msg) => console.log(msg));

// Laravel (Redis Facade Publisher):
use Illuminate\\Support\\Facades\\Redis;
Redis::publish('notifications', json_encode(['event' => 'OrderPlaced']));`,
    commonUseCases: [
      "Broadcasting real-time events to Socket.io / Laravel Echo servers",
      "Building live chat room applications",
      "Inter-microservice event notifications"
    ],
    commonMistakes: [
      "Expecting Pub/Sub to persist messages (messages are Fire-and-Forget; if subscriber is offline, message is LOST forever! Use Redis Streams or BullMQ for persistence)",
      "Using the same ioredis client instance for both publishing and subscribing (subscriber mode locks connection)"
    ],
    bestPractices: [
      "Use dedicated Redis connections for subscriber clients",
      "Use Redis Streams if message persistence and delivery guarantees are required"
    ],
    whenToUse: ["When building real-time ephemereal notification systems"],
    whenNotToUse: ["When message persistence or guaranteed delivery is required"],
    relatedConcepts: ["Pub/Sub", "Fire-and-Forget", "Laravel Echo", "Channels"],
    comparison: {
      title: "Redis Pub/Sub vs Redis Streams",
      headers: ["Feature", "Redis Pub/Sub", "Redis Streams"],
      rows: [
        ["Persistence", "Fire-and-Forget (No message storage)", "Persisted in RAM log structure"],
        ["Offline Subscribers", "Misses messages", "Reads historical stream messages on reconnect"],
        ["Consumer Groups", "Not supported", "Supported (Load balanced consumers)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What happens if a subscriber is offline when a message is sent in Redis Pub/Sub?", answer: "The message is completely lost for that subscriber. Redis Pub/Sub is a 'Fire-and-Forget' protocol with no message persistence. Use Redis Streams for message history." }
    ],
    practiceProblem: {
      description: "Write Redis PUBLISH command.",
      starterCode: `PUBLISH events "user_registered"`,
      testAssertion: "true",
      solution: `PUBLISH events "user_registered"`
    },
    quickRevision: "★ Pub/Sub is Fire-and-Forget (no message persistence).\n★ Offline subscribers miss messages.\n★ Use dedicated Redis connections for subscribers."
  }),

  // 6. REDIS STREAMS
  "redis-streams": createTopicSchema({
    id: "redis-streams",
    techId: "redis",
    title: "Redis Streams & Consumer Groups",
    category: "Messaging",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["redis-pubsub"],
    definition: "Redis Streams is an append-only log data structure (XADD, XREAD, XREADGROUP) providing persistent messaging, consumer groups, and message acknowledgments (XACK).",
    simpleExplanation: "Redis Streams is like a mini Kafka built into Redis. Messages are stored permanently in an append-only log and distributed across consumer groups.",
    whyDoesItExist: "Provides persistent event sourcing and distributed consumer group load balancing inside Redis.",
    basicExample: `// Add message to stream
XADD mystream * sensor_id 12 temperature 24.5

// Create Consumer Group
XGROUP CREATE mystream mygroup $ MKSTREAM

// Read message as worker consumer
XREADGROUP GROUP mygroup worker1 COUNT 1 STREAMS mystream >`,
    howItWorks: [
      "1. XADD appends key-value payload to stream assigning unique ID (timestamp-seq).",
      "2. Consumer Group tracks Pending Entries List (PEL) per worker.",
      "3. Worker processes message and sends XACK to remove from PEL."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">XADD Stream Log -&gt; Consumer Group -&gt; Worker 1 / Worker 2 -&gt; XACK</text></svg>`,
    realWorldExample: `// Node.js (ioredis) Stream Producer:
await redis.xadd('orders:stream', '*', 'orderId', '1001', 'amount', '99.99');

// Laravel (Redis Facade Stream Producer):
Redis::xadd('orders:stream', '*', ['orderId' => '1001', 'amount' => '99.99']);`,
    commonUseCases: [
      "Building event-driven microservice architectures",
      "Processing persistent task queues with consumer load balancing",
      "Event sourcing and audit logging"
    ],
    commonMistakes: [
      "Forgetting to send XACK after processing a message (causes PEL memory growth)",
      "Not trimming stream size (use MAXLEN to cap stream memory)"
    ],
    bestPractices: [
      "Always send XACK after successful worker processing",
      "Cap stream size using XADD stream MAXLEN ~ 100000"
    ],
    whenToUse: ["When persistent event streams and consumer groups are required in Redis"],
    whenNotToUse: ["When heavy multi-terabyte message streaming is needed (use Apache Kafka)"],
    relatedConcepts: ["XADD", "XREADGROUP", "XACK", "Pending Entries List", "Consumer Groups"],
    comparison: {
      title: "Redis Pub/Sub vs Redis Streams vs BullMQ",
      headers: ["Technology", "Persistence", "Best Used For"],
      rows: [
        ["Redis Pub/Sub", "None (Fire & Forget)", "Real-time UI web sockets"],
        ["Redis Streams", "Persistent Log Structure", "Event sourcing & light messaging"],
        ["BullMQ (Node/Redis)", "Persistent Job Queue", "Complex background job queues with retries"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the Pending Entries List (PEL) in Redis Streams?", answer: "The PEL tracks messages that have been delivered to a consumer in a group but have not yet been acknowledged with XACK. It ensures no messages are lost if a worker worker crashes." }
    ],
    practiceProblem: {
      description: "Write XADD command appending event to stream.",
      starterCode: `XADD events:stream * type "user_signup"`,
      testAssertion: "true",
      solution: `XADD events:stream * type "user_signup"`
    },
    quickRevision: "★ Streams provide persistent append-only event logging.\n★ Consumer Groups load balance messages across workers.\n★ Workers must send XACK to acknowledge processing."
  }),

  // 7. TRANSACTIONS & LUA
  "redis-lua-transactions": createTopicSchema({
    id: "redis-lua-transactions",
    techId: "redis",
    title: "Redis Transactions (MULTI/EXEC) & Atomic Lua Scripting",
    category: "Concurrency",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["redis-streams"],
    definition: "Redis transactions execute sequential commands atomically using MULTI/EXEC blocks or embedded Lua scripts (EVAL), guaranteeing uninterrupted execution on the single thread.",
    simpleExplanation: "Lua scripts run atomically inside Redis. No other command can interrupt a Lua script while it is executing.",
    whyDoesItExist: "Prevents race conditions when performing multi-step read-modify-write logic.",
    basicExample: `-- Lua Script for Atomic Rate Limiter
local current = redis.call('INCR', KEYS[1])
if current == 1 then
    redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return current`,
    howItWorks: [
      "1. Script sent via EVAL / EVALSHA command.",
      "2. Redis single thread locks execution exclusively for the Lua script.",
      "3. Performs complex logic in RAM with 100% atomic isolation."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">EVAL Lua Script -&gt; Redis Single Thread Exclusive Atomic Execution</text></svg>`,
    realWorldExample: `// Node.js (ioredis) Atomic Lua Script:
const script = \`
  local val = redis.call('GET', KEYS[1])
  if val == ARGV[1] then
    return redis.call('DEL', KEYS[1])
  else
    return 0
  end
\`;
await redis.eval(script, 1, 'lock:order:100', 'token_123');

// Laravel (Redis Facade Lua Script):
Redis::eval($script, 1, 'lock:order:100', 'token_123');`,
    commonUseCases: [
      "Releasing distributed locks safely (checking token before deleting key)",
      "Implementing atomic token-bucket rate limiters",
      "Executing conditional multi-key updates atomically"
    ],
    commonMistakes: [
      "Writing long-running or infinite loops inside Lua scripts (blocks entire Redis server!)",
      "Using MULTI/EXEC expecting full SQL-style rollback (Redis transactions do NOT support rollback on command failure!)"
    ],
    bestPractices: [
      "Keep Lua scripts short, fast, and deterministic",
      "Use SCRIPT LOAD and EVALSHA to reduce network bandwidth"
    ],
    whenToUse: ["When executing atomic multi-step read-modify-write operations"],
    whenNotToUse: ["Do not write heavy 100-line business logic inside Lua"],
    relatedConcepts: ["Lua Scripting", "EVALSHA", "MULTI/EXEC", "Atomic Execution"],
    comparison: {
      title: "MULTI/EXEC vs Lua Scripting",
      headers: ["Feature", "MULTI / EXEC", "Lua Scripting (EVAL)"],
      rows: [
        ["Conditional Logic", "Cannot use command outputs in conditions", "Full conditional logic (if/else) inside script"],
        ["Rollback", "No rollback on failure", "No rollback on failure"],
        ["Atomic Isolation", "Guaranteed", "Guaranteed (Runs exclusively on thread)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Do Redis MULTI/EXEC transactions support rollback on error?", answer: "No. Redis does not support rollback on command failure. If a command fails during EXEC, all other valid commands in the transaction block still execute." }
    ],
    practiceProblem: {
      description: "Write Redis EVAL script call structure.",
      starterCode: `redis.eval("return redis.call('GET', KEYS[1])", 1, "mykey");`,
      testAssertion: "true",
      solution: `redis.eval("return redis.call('GET', KEYS[1])", 1, "mykey");`
    },
    quickRevision: "★ Lua scripts execute 100% atomically on Redis thread.\n★ Redis transactions do NOT support rollback.\n★ Keep Lua scripts fast to avoid blocking the server."
  }),

  // 8. PERSISTENCE OPTIONS
  "redis-persistence": createTopicSchema({
    id: "redis-persistence",
    techId: "redis",
    title: "Redis Persistence: RDB Snapshots vs AOF Log",
    category: "Persistence",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["redis-lua-transactions"],
    definition: "Redis persistence saves RAM state to disk using RDB (point-in-time point binary snapshots) or AOF (Append Only File logging every write command), or a hybrid combination.",
    simpleExplanation: "RDB takes periodic photo snapshots of RAM to disk. AOF logs every single write command sequentially.",
    whyDoesItExist: "Prevents complete data loss when a Redis server reboots or crashes.",
    basicExample: `; redis.conf Persistence Setup
; RDB Snapshots:
save 900 1    ; Save snapshot if at least 1 key changed in 900s
save 300 10   ; Save snapshot if at least 10 keys changed in 300s

; AOF Logging:
appendonly yes
appendfsync everysec ; Sync to disk every 1 second`,
    howItWorks: [
      "1. RDB: Parent process forks child process (bgsave) writing point-in-time snapshot to dump.rdb.",
      "2. AOF: Every write command appended to appendonly.aof log file.",
      "3. On restart, Redis replays AOF log or loads RDB file to restore RAM state."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">RDB (Periodic Snapshot) | AOF (Append Write Log everysec)</text></svg>`,
    realWorldExample: `// Trigger manual background snapshot
BGSAVE`,
    commonUseCases: [
      "Configuring pure memory cache (disable persistence for max speed)",
      "Configuring AOF for high data durability applications",
      "Using RDB for easy disaster recovery backups"
    ],
    commonMistakes: [
      "Using appendfsync always (causes heavy disk I/O bottleneck on every write)",
      "Forgetting to allocate extra RAM for copy-on-write during bgsave forks"
    ],
    bestPractices: [
      "Use appendfsync everysec for optimal balance of speed and safety",
      "Enable hybrid persistence (aof-use-rdb-preamble yes)"
    ],
    whenToUse: ["When configuring Redis production persistence settings"],
    whenNotToUse: ["Disable persistence completely when Redis is used purely as an ephemeral cache"],
    relatedConcepts: ["RDB", "AOF", "bgsave", "appendfsync", "Copy-on-Write"],
    comparison: {
      title: "RDB vs AOF Persistence",
      headers: ["Metric", "RDB Snapshots", "AOF (Append Only File)"],
      rows: [
        ["Data Safety", "Risk of losing minutes of data between snapshots", "Max 1 second data loss (with appendfsync everysec)"],
        ["File Size", "Compact binary file (fast restart)", "Larger log file"],
        ["Performance Impact", "Minimal (Forked child process)", "Slight I/O impact on writes"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Copy-on-Write (COW) during Redis RDB bgsave?", answer: "When BGSAVE is executed, Redis forks a child process. Using OS Copy-on-Write, the parent and child share the same memory pages. Memory is only copied if the parent process receives new write operations." }
    ],
    practiceProblem: {
      description: "Write Redis command triggering background snapshot.",
      starterCode: `BGSAVE`,
      testAssertion: "true",
      solution: `BGSAVE`
    },
    quickRevision: "★ RDB creates periodic compact binary snapshots.\n★ AOF logs write commands sequentially (appendfsync everysec).\n★ Disable persistence if Redis is purely an ephemeral cache."
  }),

  // 9. DISTRIBUTED LOCKS (REDLOCK)
  "redis-distributed-locks": createTopicSchema({
    id: "redis-distributed-locks",
    techId: "redis",
    title: "Distributed Locks & The Redlock Algorithm",
    category: "Concurrency",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["redis-persistence"],
    definition: "Distributed Locking in Redis guarantees that only one process across a distributed cluster executes a critical section using SET resource_name my_random_value NX PX 30000 and the Redlock algorithm.",
    simpleExplanation: "A distributed lock ensures that only one server instance processes an order at a time, avoiding duplicate execution across multiple node instances.",
    whyDoesItExist: "Prevents race conditions across distributed microservice servers.",
    basicExample: `// 1. Acquire Lock (NX = Only if Not Exist, PX = 30000ms TTL)
SET lock:order:1001 "random_token_xyz" NX PX 30000

// 2. Release Lock (Safely via Lua Script checking random token!)
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end`,
    howItWorks: [
      "1. Acquire lock with unique random value token and auto-expiring TTL.",
      "2. Execute critical section.",
      "3. Release lock atomically using Lua script to ensure worker only deletes its OWN lock."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">SET lock_key NX PX 30000 -&gt; Execute -&gt; Lua Script Token Check &amp; DEL</text></svg>`,
    realWorldExample: `// Node.js (redlock package) / Laravel Lock Facade:
// Laravel:
use Illuminate\\Support\\Facades\\Cache;

$lock = Cache::lock('order:1001', 10);
if ($lock->get()) {
    // Process order safely
    $lock->release();
}`,
    commonUseCases: [
      "Preventing duplicate credit card charges on double-clicks",
      "Ensuring only one worker runs a scheduled cron job across server clusters",
      "Preventing inventory over-selling during flash sales"
    ],
    commonMistakes: [
      "Releasing a lock using plain DEL without verifying the random token (can delete another worker's lock if TTL expired!)",
      "Not setting a TTL safety limit on the lock"
    ],
    bestPractices: [
      "Always set a TTL safety timeout on locks",
      "Always verify the unique random token via Lua script when releasing locks"
    ],
    whenToUse: ["In all distributed microservice race condition prevention"],
    whenNotToUse: ["When operating within a single-threaded local process"],
    relatedConcepts: ["Distributed Locks", "Redlock Algorithm", "SET NX PX", "Lua Release"],
    comparison: {
      title: "Unsafe DEL vs Safe Lua Lock Release",
      headers: ["Release Method", "Safety Risk"],
      rows: [
        ["DEL lock_key", "Unsafe: May delete a lock acquired by another worker if TTL expired"],
        ["Lua Token Check + DEL", "100% Safe: Ensures worker deletes ONLY its own active lock"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why must you check a unique random token in Lua when releasing a Redis lock?", answer: "If worker A's execution takes longer than the lock TTL, the lock expires and worker B acquires it. If worker A finishes and releases the lock with a simple DEL, it would accidentally delete worker B's valid lock. The Lua token check prevents this." }
    ],
    practiceProblem: {
      description: "Write SET command acquiring lock with 10s TTL.",
      starterCode: `SET lock:item "token123" NX PX 10000`,
      testAssertion: "true",
      solution: `SET lock:item "token123" NX PX 10000`
    },
    quickRevision: "★ Acquire lock with SET key token NX PX TTL.\n★ Always release lock using Lua script token check.\n★ Use Laravel Cache::lock() for clean locking."
  }),

  // 10. SENTINEL & CLUSTER
  "redis-cluster": createTopicSchema({
    id: "redis-cluster",
    techId: "redis",
    title: "Redis Sentinel Failover & Redis Cluster Sharding",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["redis-distributed-locks"],
    definition: "Redis Sentinel provides High Availability monitoring and automatic failover for master-replica setups. Redis Cluster provides horizontal scaling by sharding data across 16,384 hash slots.",
    simpleExplanation: "Sentinel monitors master nodes and automatically promotes replicas if the master crashes. Redis Cluster shards data across multiple master nodes.",
    whyDoesItExist: "Provides high availability failover and scales memory capacity beyond a single server.",
    basicExample: `// Node.js (ioredis) Sentinel Setup:
const redis = new Redis({
  sentinels: [{ host: 'sentinel1', port: 26379 }, { host: 'sentinel2', port: 26379 }],
  name: 'mymaster',
});

// Laravel (config/database.php Redis Cluster):
'redis' => [
    'client' => 'phpredis',
    'clusters' => [
        'default' => [
            ['host' => '10.0.0.1', 'port' => 6379],
            ['host' => '10.0.0.2', 'port' => 6379],
        ],
    ],
],`,
    howItWorks: [
      "1. Redis Cluster divides data space into 16,384 Hash Slots: HASH_SLOT = CRC16(key) mod 16384.",
      "2. Master nodes own subsets of the 16,384 hash slots.",
      "3. Clients navigate slots using MOVED or ASK redirection responses."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">CRC16(key) mod 16384 -&gt; Hash Slot -&gt; Target Master Node</text></svg>`,
    realWorldExample: `// Using Hash Tags to force multi-key operations onto the SAME hash slot in Redis Cluster
MSET {user:100}:name "Alice" {user:100}:email "alice@example.com"`,
    commonUseCases: [
      "Achieving automated failover with Redis Sentinel",
      "Scaling RAM memory past 100GB+ using Redis Cluster",
      "Using Hash Tags {namespace} for multi-key cluster operations"
    ],
    commonMistakes: [
      "Running multi-key operations (MGET, Lua) across different hash slots in Redis Cluster without Hash Tags",
      "Deploying Sentinel with fewer than 3 quorum nodes"
    ],
    bestPractices: [
      "Use Hash Tags {user:100} to force related keys to the same cluster node",
      "Deploy at least 3 Sentinel nodes for reliable quorum voting"
    ],
    whenToUse: ["In high-scale enterprise Redis production architectures"],
    whenNotToUse: ["Do not deploy a 6-node Redis Cluster for a 1GB cache"],
    relatedConcepts: ["Redis Sentinel", "Redis Cluster", "Hash Slots (16384)", "Hash Tags {}"],
    comparison: {
      title: "Redis Sentinel vs Redis Cluster",
      headers: ["Architecture", "Primary Role", "Data Sharding"],
      rows: [
        ["Redis Sentinel", "High Availability & Failover monitoring", "No sharding (Single master)"],
        ["Redis Cluster", "Horizontal Scaling & Failover", "Auto-sharded across 16,384 hash slots"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does data sharding work in Redis Cluster?", answer: "Redis Cluster uses 16,384 hash slots. Every key is mapped to a slot using CRC16(key) mod 16384. Master nodes in the cluster divide and own portions of these 16,384 slots." }
    ],
    practiceProblem: {
      description: "Write hash tag example ensuring keys land on same slot.",
      starterCode: `SET {user:10}:name "Alice"`,
      testAssertion: "true",
      solution: `SET {user:10}:name "Alice"`
    },
    quickRevision: "★ Sentinel handles automated master failover.\n★ Redis Cluster shards data across 16,384 Hash Slots.\n★ Use Hash Tags {key} to force keys onto the same node."
  })
};
