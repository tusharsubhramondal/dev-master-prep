# Complete RabbitMQ Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, AMQP 0-9-1 Protocol, Exchange Types (Direct, Fanout, Topic, Headers), Message Durability, Dead Letter Exchange (DLX), Quorum Queues, Clustering এবং Node.js (`amqplib`) কোডসহ তৈরি করা হয়েছে যাতে যে কেউ RabbitMQ-এর যেকোনো ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: Messaging Queues & AMQP Protocol](#module-1-messaging-queues--amqp-protocol)
2. [Module 2: RabbitMQ vs Kafka vs Redis Pub/Sub](#module-2-rabbitmq-vs-kafka-vs-redis-pubsub)
3. [Module 3: Exchanges, Routing & Queue Architecture](#module-3-exchanges-routing--queue-architecture)
4. [Module 4: Reliability, Acknowledgments & Message Durability](#module-4-reliability-acknowledgments--message-durability)
5. [Module 5: Advanced RabbitMQ (DLX, TTL & Quorum Queues)](#module-5-advanced-rabbitmq-dlx-ttl--quorum-queues)
6. [Module 6: Node.js Integration Code Scenarios](#module-6-nodejs-integration-code-scenarios)
7. [Module 7: Complete Level-by-Level Question Vault](#module-7-complete-level-by-level-question-vault)

---

# Module 1: Messaging Queues & AMQP Protocol

### 1.1 Message Queue কী এবং কেন প্রয়োজন?
মেসেজ কিউ হলো একটি আসিনক্রোনাস কমিউনিকেশন মেকানিজম যা প্রযোজক (Producer) এবং ভোক্তা (Consumer)-কে ডিকাপল (Decouple) করে।  
- **সুবিধা:** System Decoupling, Asynchronous Processing, Rate Limiting / Peak Load Leveling, High Fault Tolerance।

---

### 1.2 AMQP 0-9-1 Architecture

RabbitMQ মূলত **AMQP (Advanced Message Queuing Protocol)** নীতি মেনে কাজ করে।

```
┌──────────┐     Publish      ┌──────────┐   Binding Key   ┌──────────┐   Consume   ┌──────────┐
│ Producer │ ───────────────► │ Exchange │ ──────────────► │  Queue   │ ──────────► │ Consumer │
└──────────┘  (Routing Key)   └──────────┘                 └──────────┘             └──────────┘
```

1. **Producer:** যে মেসেজ পাঠায়।
2. **Exchange:** প্রাপ্ত মেসেজকে তার Routing Key অনুযায়ী নির্দিষ্ট Queue-তে রাউট করে। (মেসেজ কিন্তু সরাসরি Queue-তে যায় না, Exchange-এ যায়!)
3. **Binding:** Exchange এবং Queue-এর মধ্যকার সংযোগ বা সম্পর্ক।
4. **Queue:** মেসেজগুলো জমা রাখার মেমোরি/ডিস্ক বাফার।
5. **Consumer:** যে কিউ থেকে মেসেজ নিয়ে প্রসেস করে।
6. **Channel:** একটিমাত্র TCP Connections-এর ভেতরে একাধিক ভার্চুয়াল লাইটওয়েট কানেকশন।

---

# Module 2: RabbitMQ vs Kafka vs Redis Pub/Sub

| ফিচার | RabbitMQ | Apache Kafka | Redis Pub/Sub |
| :--- | :--- | :--- | :--- |
| **আর্কিটেকচার** | Smart Broker / Dumb Consumer | Dumb Broker / Smart Consumer (Log-based) | In-memory Pub/Sub |
| **Routing Flex** | অত্যন্ত ফ্লেক্সিবল (Topic, Fanout, Direct) | শুধুমাত্র Topic Partition ভিত্তিক | সোজাসাপ্টা চ্যানেল |
| **Message State** | মেসেজ প্রসেস হলে কিউ থেকে ডিলিট হয়ে যায় | মেসেজ একটি নির্দিষ্ট Retention সময় পর্যন্ত থেকে যায় | মেমোরিতে ধরে রাখে না (Fire & Forget) |
| **Use Case** | Complex Routing, Enterprise Order Processing, Task Queues | Big Data, Streaming Analytics, Event Sourcing | Real-time chat, Simple In-memory PubSub |

---

# Module 3: Exchanges, Routing & Queue Architecture

### 3.1 4টি প্রধান Exchange Type

#### 1. Direct Exchange (Exact Match)
Routing Key এবং Binding Key হুবহু মিললে মেসেজ সেই Queue-তে যাবে।  
- *ব্যবহার:* নির্দিষ্ট কাজ (যেমন: `send_email`) নির্দিষ্ট কিউতে পাঠানো।

#### 2. Fanout Exchange (Broadcast)
Routing Key সম্পূর্ণ ইগনোর করে যুক্ত থাকা **সমস্ত Queue-তে** মেসেজ ব্রডকাস্ট করে দেয়।  
- *ব্যবহার:* পাবলিশ-সাবস্ক্রাইব (যেমন: একটি অর্ডার হলে স্টোক আপডেট, ইমেইল পাঠানো এবং এসএমএস নোটিফিকেশন সব সার্ভিসে একসাথে মেসেজ দেওয়া)।

#### 3. Topic Exchange (Pattern Match)
ওয়াইল্ডকার্ড ব্যবহার করে প্যাটার্ন অনুযায়ী রাউটিং করে:
- `*` (Star): ঠিক ১টি শব্দ নির্দেশ করে (e.g., `user.*.created`)
- `#` (Hash): শূন্য বা একাধিক শব্দ নির্দেশ করে (e.g., `user.#`)

#### 4. Headers Exchange
Routing Key বাদ দিয়ে মেসেজের Header-এর অ্যাট্রিবিউট মিলিয়ে রাউট করে।

---

# Module 4: Reliability, Acknowledgments & Message Durability

### 4.1 Message Acknowledgments (ACK / NACK)

কনসিউমার মেসেজ প্রসেস করার পর ব্রোকারকে বার্তা জানায়:
- **`ack` (Acknowledge):** মেসেজ সফলভাবে প্রসেস হয়েছে, কিউ থেকে মুছে ফেলো।
- **`nack` / `reject`:** প্রসেসিং ব্যর্থ হয়েছে।
  - `requeue: true` দিলে মেসেজ আবার কিউতে ফেরত যাবে অন্য কনসিউমার প্রসেস করার জন্য।
  - `requeue: false` দিলে মেসেজটি **Dead Letter Queue (DLQ)**-তে চলে যাবে।

---

### 4.2 How to Prevent Message Loss? (১০০% নির্ভরযোগ্যতা)

মেসেজ যেন কোনোভাবেই না হারায় (Zero Message Loss), তার জন্য ৩টি বিষয় নিশ্চিত করতে হবে:
1. **Producer Side (Publisher Confirms):** প্রডিউসার থেকে মেসেজ এক্সচেঞ্জে না পৌঁছানো পর্যন্ত কনফার্মেশন মেলানো।
2. **Broker Side (Durable Queue + Persistent Message):**  
   - Queue তৈরি করার সময় `durable: true` দেওয়া।
   - Message পাঠানোর সময় `deliveryMode: 2` (Persistent) দেওয়া, যেন রিস্টার্ট হলেও মেসেজ ডিস্কে সেভ থাকে।
3. **Consumer Side (Manual ACK):** Auto ACK বন্ধ করে প্রসেসিং শেষ হওয়ার পর ম্যানুয়ালি `channel.ack(msg)` করা।

---

# Module 5: Advanced RabbitMQ (DLX, TTL & Quorum Queues)

- **Dead Letter Exchange (DLX):** কোনো মেসেজ বারবার ব্যর্থ হলে, এক্সপায়ার হলে (`TTL`) বা কিউ পূর্ণ হয়ে গেলে মেসেজটি হারানো প্রতিরোধ করতে নির্দিষ্ট ব্যর্থতা কালেকশন কিউতে (DLQ) পাঠানোর প্রসেস।
- **Quorum Queues (Modern HA):** Classic Mirrored Queue-এর পরিবর্তে **Raft Consensus Algorithm** দিয়ে একাধিক নোডে ডাটা সিঙ্ক করে হাই-এভেইল্যাবিলিটি নিশ্চিত করার আধুনিক পদ্ধতি।

---

# Module 6: Node.js Integration Code Scenarios

### Complete Producer & Consumer with Manual ACK in Node.js (`amqplib`)

```javascript
// consumer.js
const amqp = require('amqplib');

async function startConsumer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'order_queue';

    // 1. Durable Queue নিশ্চিতকরণ
    await channel.assertQueue(queueName, { durable: true });

    // Prefetch Limit: ১টি মেসেজ প্রসেস না হওয়া পর্যন্ত নতুন মেসেজ আনবে না
    channel.prefetch(1);

    console.log('⌛ Waiting for messages in queue...');

    // 2. Consume with Manual ACK
    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log('📦 Processing Order:', content);

        try {
          // প্রসেসিং সিমুলেশন
          await new Promise(res => setTimeout(res, 1000));

          // 3. Manual ACK
          channel.ack(msg);
          console.log('✅ Order Processed & ACKed');
        } catch (err) {
          console.error('❌ Processing Failed');
          // ব্যর্থ হলে NACK এবং Requeue বাতিল করে DLQ-তে পাঠানো
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

startConsumer();
```

---

# Module 7: Complete Level-by-Level Question Vault

### 🟢 Junior Level
- **Q: Queue এবং Exchange-এর সম্পর্ক কী?**  
  **A:** প্রডিউসার মেসেজ সরাসরি Queue-তে পাঠায় না, Exchange-এ পাঠায়। Exchange তখন Binding Key অনুযায়ী সঠিক Queue-তে মেসেজ রাউট করে।

### 🟡 Mid Level
- **Q: Auto-ACK ব্যবহার করা কেন বিপজ্জনক?**  
  **A:** Auto-ACK দিলে কনসিউমার মেসেজ রিসিভ করা মাত্রই কিউ মেসেজ মুছে ফেলে। যদি মেসেজ প্রসেসিং চলার সময় সার্ভিস ক্র্যাশ করে, তবে সেই মেসেজটি চিরতরে হারিয়ে যাবে।

### 🔴 Senior Level
- **Q: RabbitMQ-তে "Prefetch Count" কেন গুরুত্বপূর্ণ?**  
  **A:** Prefetch count (e.g., `channel.prefetch(10)`) না দিলে RabbitMQ একসাথে হাজার হাজার মেসেজ কনসিউমারকে পাঠিয়ে দেয়, ফলে কনসিউমারের মেমোরি ফুল হয়ে ক্র্যাশ করতে পারে। এটি লোড ব্যালেন্স বজায় রাখে।

---

> **🎉 অভিনন্দন!** আপনি RabbitMQ-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন।
