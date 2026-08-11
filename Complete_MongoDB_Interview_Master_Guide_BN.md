# Complete MongoDB Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, ডায়াগনস্টিকস এবং নোড-জেএস/mongoose কোডসহ তৈরি করা হয়েছে যাতে যে কেউ (শিক্ষানবিস থেকে সিনিয়র ডাটাবেস আর্কিটেক্ট) MongoDB-এর ইন্টারনাল মেকানিজম, কুয়েরি অপটিমাইজেশন, এগ্রিগেশন পাইপলাইন, ইনডেক্সিং এবং স্কেলিং (Replication & Sharding) আয়ত্ত করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: MongoDB Prerequisites & Basics (Junior Level)](#module-1-mongodb-prerequisites--basics-junior-level)
2. [Module 2: CRUD Operations & Query Operators](#module-2-crud-operations--query-operators)
3. [Module 3: Data Modeling & Schema Design (Embedding vs Referencing)](#module-3-data-modeling--schema-design)
4. [Module 4: Aggregation Framework (Masterclass)](#module-4-aggregation-framework-masterclass)
5. [Module 5: Indexing & Query Performance Tuning (Senior Level)](#module-5-indexing--query-performance-tuning)
6. [Module 6: High Availability & Scaling (Replication & Sharding)](#module-6-high-availability--scaling)
7. [Module 7: Transactions, WiredTiger & Security](#module-7-transactions-wiredtiger--security)
8. [Module 8: Node.js & Mongoose Integration Code Scenarios](#module-8-nodejs--mongoose-integration-code-scenarios)
9. [Module 9: Complete Level-by-Level Question Vault](#module-9-complete-level-by-level-question-vault)

---

# Module 1: MongoDB Prerequisites & Basics (Junior Level)

### 1.1 RDBMS (SQL) বনাম NoSQL (MongoDB)

| ক্রাইটেরিয়া | RDBMS (PostgreSQL, MySQL) | NoSQL (MongoDB) |
| :--- | :--- | :--- |
| **ডাটা মডেল** | টেবিল, রো (Row) এবং কলাম (Column) | ডাইনামিক ডকুমেন্ট (JSON/BSON) এবং কালেকশন |
| **স্কিমা** | স্ট্রিক্ট/ফিক্সড স্কিমা (Fixed Schema) | স্কিমা-লেস বা ফ্লেক্সিবল স্কিমা |
| **স্কেলিং** | Vertical Scaling (CPU/RAM বাড়ানো) | Horizontal Scaling (Sharding/নতুন সার্ভার যোগ) |
| **সম্পর্ক (Relation)** | Foreign Keys & SQL Joins | Embedding (Denormalization) বা `$lookup` |
| **ACID / BASE** | ACID Properties নিশ্চিত করে | BASE (Basically Available, Soft-state, Eventual consistency) ও কাস্টম ACID |

---

### 1.2 JSON বনাম BSON (কেন MongoDB BSON ব্যবহার করে?)

MongoDB অভ্যন্তরীণভাবে ডাটা **BSON (Binary JSON)** ফরম্যাটে রূপান্তর করে স্টোর করে।

**কেন BSON?**
1. **অতিরিক্ত ডাটা টাইপ সাপোর্ট:** JSON কেবল String, Number, Boolean, Array, Object চেনে। কিন্তু BSON সাপোর্ট করে: `ObjectId`, `Date`, `64-bit Integer`, `Decimal128`, `Binary Data` (Images/Files)।
2. **দ্রুত পার্সিং (Fast Parsing):** BSON ফরম্যাটে প্রতিটি ফিল্ডের দৈর্ঘ্য (Length prefix) লেখা থাকে, ফলে ডাটাবেসকে পুরো ডকুমেন্ট পার্স না করেই নির্দিষ্ট ফিল্ড দ্রুত স্ক্যান করার সুবিধা দেয়।

---

### 1.3 Vocabulary Mapping

- **Database:** কালেকশনের ফোল্ডার।
- **Collection:** RDBMS-এর Table-এর সমতুল্য।
- **Document:** RDBMS-এর Single Row-এর সমতুল্য।
- **Field:** RDBMS-এর Column-এর সমতুল্য।

---

### 1.4 ObjectId-এর ইন্টারনাল স্ট্রাকচার (12-Byte Breakdown)

MongoDB-তে প্রতি ডকুমেন্টে একটি ডিফল্ট ইউনিক প্রাইমারি কি থাকে: `_id: ObjectId("64d1f2e...")`।  
এটি একটি **12-byte Hexadecimal value**:

```
 4-byte Timestamp  +  5-byte Random Value  +  3-byte Incrementing Counter
(তৈরির সময় সনাক্তকরণ)  (মেশিন ও প্রসেস আইডি)    (একই সেকেন্ডের কাউন্টার)
```
*ইন্টারভিউ ট্রিক:* ObjectId-এর প্রথম ৪ বাইট হলো Timestamp। তাই `_id` থেকেই তৈরি হওয়ার তারিখ বের করা যায় (`objectId.getTimestamp()`), অতিরিক্ত `createdAt` ফিল্ড ছাড়াই!

---

# Module 2: CRUD Operations & Query Operators

### 2.1 Basic CRUD Commands

#### 🔍 Read Command Deep-Dive (Find with Filter & Projection)

```javascript
db.users.find(
  { age: { $gt: 20 } },               // Argument 1: Filter / Search Condition
  { name: 1, email: 1, _id: 0 }        // Argument 2: Projection / Field Selection
);
```

#### 🛠️ টুকরো টুকরো করে বিস্তারিত ব্যাখ্যা:

1. **`db.users`:**
   - `db` হলো বর্তমান ডাটাবেস।
   - `users` হলো কালেকশনের নাম (SQL-এর Table-এর সমতুল্য)।

2. **`.find( Filter, Projection )`:**
   - `.find()` মেথডটি ডাটাবেস থেকে তথ্য খুঁজতে ব্যবহৃত হয়। এটি মূলত **২টি আর্গুমেন্ট (প্যারামিটার)** গ্রহণ করে:
     - **১ম আর্গুমেন্ট (Filter):** কোন কোন ডকুমেন্ট আনবে তার শর্ত (SQL-এর `WHERE` ক্লজের মতো)।
     - **২য় আর্গুমেন্ট (Projection):** ডকুমেন্টের কোন কোন ফিল্ড আউটপুটে দেখাবে আর কোনটি বাদ দেবে (SQL-এর `SELECT` ফিল্ড চয়েসের মতো)।

3. **১ম আর্গুমেন্ট: `{ age: { $gt: 20 } }` (Filter Condition)**
   - `age`: যে ফিল্ডের ওপর শর্ত বসানো হচ্ছে।
   - `$gt`: MongoDB Operator যার অর্থ **Greater Than** (`>`) বা "চেয়ে বড়"।
   - `20`: টার্গেট ভ্যালু।
   - **অর্থ:** "যাদের বয়স ২০-এর চেয়ে বেশি (`age > 20`), কেবল সেই ইউজারের ডকুমেন্টগুলো খুঁজে বের করো।"

4. **২য় আর্গুমেন্ট: `{ name: 1, email: 1, _id: 0 }` (Projection)**
   - **Projection কী?** ডাটাবেস ডকুমেন্টে হয়তো ১০টি ফিল্ড থাকতে পারে, কিন্তু ফ্রন্টএন্ডে হয়তো শুধু নাম ও ইমেইল লাগবে। অনাবশ্যক ডাটা না এনে নেটওয়ার্ক ব্যান্ডউইথ বাঁচাতে প্রজেকশন ব্যবহৃত হয়।
   - `name: 1` ➔ আউটপুটে `name` ফিল্ডটি **রাখো/দেখাও** (`1` = True/Include)।
   - `email: 1` ➔ আউটপুটে `email` ফিল্ডটি **রাখো/দেখাও** (`1` = True/Include)।
   - `_id: 0` ➔ আউটপুট থেকে `_id` ফিল্ডটি **বাদ দাও** (`0` = False/Exclude)।
   - *বিশেষ নোট:* MongoDB ডিফল্টভাবে যেকোনো কুয়েরিতে `_id` ফিল্ড পাঠিয়ে দেয়। তাই `_id` লুকাতে চাইলে স্পষ্ট করে `_id: 0` লিখতে হয়।

---

#### 🔄 SQL-এর সাথে তুলনা:
রলেশনাল ডাটাবেসে (PostgreSQL/MySQL) এই কুয়েরিটি দেখতে এমন হতো:
```sql
SELECT name, email FROM users WHERE age > 20;
```

---

#### 📊 ইনপুট ডাটা বনাম আউটপুট উদাহরণ:

**ডাটাবেসে থাকা মূল কালেকশন (`users`):**
```json
[
  { "_id": 101, "name": "Tushar", "age": 25, "email": "tushar@example.com", "role": "admin" },
  { "_id": 102, "name": "Karim", "age": 18, "email": "karim@example.com", "role": "user" },
  { "_id": 103, "name": "Rahim", "age": 30, "email": "rahim@example.com", "role": "user" }
]
```

**কুয়েরি চালানোর পর প্রাপ্ত আউটপুট:**
```json
[
  { "name": "Tushar", "email": "tushar@example.com" },
  { "name": "Rahim", "email": "rahim@example.com" }
]
```
*(লক্ষ্য করুন: Karim বাদ পড়েছে কারণ তার বয়স ২০-এর কম। আর `_id` ও `role` ফিল্ড বাদ পড়েছে Projection-এর কারণে।)*

---

#### 📝 অন্যান্য মৌলিক CRUD কমান্ডসমূহ:

```javascript
// Create (ডাটা তৈরি)
db.users.insertOne({ name: "Tushar", age: 25, role: "admin" });
db.users.insertMany([{ name: "Karim", age: 18 }, { name: "Rahim", age: 30 }]);

// Update (ডাটা সংশোধন)
db.users.updateOne(
  { name: "Tushar" },                         // শর্ত (কাকে আপডেট করবে)
  { $set: { age: 26 }, $inc: { loginCount: 1 } } // আপডেট অ্যাকশন
);

// Delete (ডাটা মোছা)
db.users.deleteOne({ name: "Rahim" });
```


### 2.2 Advanced Query & Array Operators

- **Logical Operators:** `$and`, `$or`, `$not`, `$nor`
- **Comparison Operators:** `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`, `$ne`
- **Element Operators:** 
  - `{ age: { $exists: true } }` (ফিল্ডটি আছে কিনা)
  - `{ phone: { $type: "string" } }` (ডাটা টাইপ চেক)
- **Array Operators:**
  - `$push`: অ্যারেতে নতুন আইটেম যোগ করা।
  - `$addToSet`: অ্যারেতে কেবল ইউনিক আইটেম যোগ করা (Duplicate আটকায়)।
  - `$pull`: অ্যারে থেকে নির্দিষ্ট আইটেম মুছে ফেলা।
  - `{ tags: { $all: ["nodejs", "mongodb"] } }`: অ্যারেতে দুটি মানই থাকতে হবে।
  - `{ scores: { $elemMatch: { $gte: 80, $lt: 90 } } }`: অ্যারের কোনো একটি সিঙ্গেল অবজেক্টে উভয় শর্ত মিলতে হবে।

---

### 2.3 Pagination Optimization (`skip` vs Keyset Pagination)

**সমস্যা:** `db.posts.find().skip(100000).limit(10)`  
`skip(100000)` চালাতে MongoDB-কে আগে ১,০০,০০০০০ টি ডকুমেন্ট স্ক্যান করতে হয়, যা বড় ডাটাবেসে অ্যাপ স্লো করে দেয়।

**সমাধান (Keyset/Cursor-based Pagination):**
অফসেট ব্যবহার না করে শেষ প্রাপ্ত আইটেমের `_id` দিয়ে কুয়েরি করা:
```javascript
db.posts.find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(10);
```

---

# Module 3: Data Modeling & Schema Design

MongoDB-তে Schema Design করার ২টি প্রধান কৌশল:

### 3.1 Embedding (Denormalization) বনাম Referencing (Normalization)

#### 1. Embedded Data Model (1-to-1, 1-to-Few)
একই ডকুমেন্টের ভেতরে চাইল্ড অবজেক্ট বা অ্যারে রাখা।

```json
// User Document
{
  "_id": ObjectId("..."),
  "name": "Tushar",
  "address": { "city": "Dhaka", "zip": "1207" } // Embedded
}
```
- **সুবিধা:** ১টি মাত্র কুয়েরিতে সব ডাটা পাওয়া যায় (Fast Reads)।
- **কখন ব্যবহার করবেন:** ১-টু-১ সম্পর্ক এবং ১-টু-কম (যেমন: ইউজারের ২/৩টি ঠিকানা)।
- **সীমাবদ্ধতা:** BSON ডকুমেন্টের সর্বোচ্চ সাইজ **16 MB**। অ্যারে আনলিমিটেড বড় হলে এটি ফাটবে।

---

#### 2. Referenced Data Model (1-to-Many, 1-to-Squillions)
একটি কালেকশনে আইডি রেফারেন্স রেখে ডাটা আলাদা কালেকশনে রাখা।

```json
// Order Document
{
  "_id": ObjectId("..."),
  "user_id": ObjectId("64d1f..."), // Referenced User ID
  "total": 500
}
```
- **সুবিধা:** ডকুমেন্ট সাইজ 16MB ছাড়ায় না, ডাটা ডুপ্লিকেশন রোধ হয়।
- **কখন ব্যবহার করবেন:** ১-টু-অনেক (যেমন: ই-কমার্সের লাখ লাখ অর্ডার) বা N-to-N রিলেশন।
- **সীমাবদ্ধতা:** ডাটা পাওয়ার জন্য `$lookup` (Join) করতে হয়।

---

### 3.2 Advanced Data Modeling Patterns

1. **Subset Pattern:** বড় অ্যারে বা রিভিউ থাকলে সাম্প্রতিক ১০টি রিভিউ মূল ডকুমেন্টে রেখে বাকিগুলো আলাদা কালেকশনে রাখা।
2. **Bucket Pattern (Time-series Data):** প্রতি সেকেন্ডের IoT ডাটা আলাদা ডকুমেন্ট না বানিয়ে ১ ঘণ্টার সেন্সর ডাটা ১টি ডকুমেন্টের অ্যারেতে বাল্ক স্টোর করা।
3. **Attribute Pattern:** প্রোডাক্টের অসংখ্য ডাইনামিক ফিল্ড (Color, Size, Weight) থাকলে `{ k: "color", v: "red" }` ফরম্যাটে রাখা।

---

# Module 4: Aggregation Framework (Masterclass)

Aggregation Pipeline হলো একাধিক ধাপের (Stages) সমাবেশ, যেখানে একটি স্টেজ থেকে ডাটা প্রসেস হয়ে পরবর্তী স্টেজে ইনপুট হিসেবে যায়।

```
Raw Documents ➔ [$match] ➔ [$group] ➔ [$sort] ➔ [$project] ➔ Final Analytics
```

### 4.1 Key Pipeline Stages

- **`$match`:** ডাটা ফিল্টার করা (SQL-এর `WHERE`-এর মতো)। কুয়েরি দ্রুত করতে এটি পাইপলাইনের শুরুতে রাখা উচিত।
- **`$group`:** নির্দিষ্ট ফিল্ড অনুযায়ী গ্রুপ করা (SQL-এর `GROUP BY`) এবং `$sum`, `$avg`, `$min`, `$max` দিয়ে এগ্রিগেট করা।
- **`$project`:** প্রয়োজনীয় ফিল্ড নির্বাচন করা, নতুন ফিল্ড যোগ করা বা রিনেম করা।
- **`$unwind`:** অ্যারে ফিল্ডকে ভেঙে আলাদা আলাদা ডকুমেন্টে পরিণত করা।
- **`$lookup`:** অন্য কালেকশনের সাথে Left Outer Join করা।
- **`$facet`:** একই ডাটার ওপর একাধিক সমান্তরাল (Parallel) এগ্রিগেশন পাইপলাইন চালানো (যেমন: একই এপিআই দিয়ে প্রোডাক্টের ফিল্টার অপশন ও তালিকা একসাথে আনা)।

---

### 4.2 Real-World Complex Aggregation Code Example

**সিনারিও:** ই-কমার্স অ্যাপের প্রতি ক্যাটাগরির সেরা ৩টি বিক্রিত প্রোডাক্ট এবং মোট বিক্রয় হিসেব করা।

```javascript
db.orders.aggregate([
  // ১. কেবল সফল অর্ডার ফিল্টার
  { $match: { status: "COMPLETED" } },

  // ২. প্রোডাক্ট তথ্য আনার জন্য Products কালেকশনে Join
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails"
    }
  },

  // ৩. Join করা অ্যারে ফ্ল্যাট করা
  { $unwind: "$productDetails" },

  // ৪. ক্যাটাগরি অনুযায়ী গ্রুপ এবং মোট সেল হিসেব
  {
    $group: {
      _id: "$productDetails.category",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
      totalSold: { $sum: "$quantity" },
      products: { $push: "$productDetails.name" }
    }
  },

  // ৫. রাজস্ব অনুযায়ী ক্রমানুসারে সাজানো
  { $sort: { totalRevenue: -1 } },

  // ৬. ফিল্ড ফরম্যাটিং
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: 1,
      totalSold: 1,
      topProducts: { $slice: ["$products", 3] } // সেরা ৩টি
    }
  }
]);
```

---

# Module 5: Indexing & Query Performance Tuning (Senior Level)

### 5.1 ইনডেক্স কীভাবে কাজ করে? (B-Tree Data Structure)
ইনডেক্স ছাড়া MongoDB পুরো কালেকশনের সব ডকুমেন্ট স্ক্যান করে (**COLLSCAN**), যা অত্যন্ত ধীরগতির।  
ইনডেক্স তৈরি করলে ডাটাবেস **B-Tree** ডাটা স্ট্রাকচারে ডাটা পয়েন্টার সাজিয়ে রাখে, ফলে স্ক্যান না করেই দ্রুত নির্দিষ্ট লোকেশন খুঁজে পায় (**IXSCAN**)।

---

### 5.2 Index Types

1. **Single Field Index:** `db.users.createIndex({ email: 1 })` (১ = Ascending, -1 = Descending)
2. **Compound Index:** একাধিক ফিল্ড নিয়ে গঠিত ইনডেক্স `db.users.createIndex({ status: 1, createdAt: -1 })`
3. **Multikey Index:** অ্যারে ফিল্ডের ওপর ইনডেক্স।
4. **TTL Index (Time-To-Live):** নির্দিষ্ট সময় পর ডকুমেন্ট স্বয়ংক্রিয়ভাবে মুছে যাওয়ার ইনডেক্স (যেমন: OTP বা Session Delete)।
   `db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })`
5. **Text Index:** সার্চের জন্য全文 Full-text search index।
6. **Partial/Sparse Index:** নির্দিষ্ট শর্তে (যেমন শুধুমাত্র যে ডকুমেন্টে ইমেইল আছে) ইনডেক্স বানানো।

---

### 5.3 Senior Concept: ESR Rule (Compound Index-এর নিয়ম)

Compound Index তৈরির সময় ফিল্ডের অর্ডার নির্ধারণে **ESR Rule** মানতে হয়:
1. **E - Equality:** সমান শর্তের ফিল্ডগুলো সবার আগে দিতে হবে (যেমন: `{ status: "ACTIVE" }`)
2. **S - Sort:** সর্টিং ফিল্ড মাঝখানে দিতে হবে (যেমন: `{ createdAt: -1 }`)
3. **R - Range:** রেঞ্জ ফিল্ড সবার শেষে দিতে হবে (যেমন: `{ age: { $gt: 18 } }`)

---

### 5.4 Query Profiling & `.explain("executionStats")`

ইন্টারভিউ প্রশ্ন: আপনার কুয়েরি স্লো হলে কীভাবে ডায়াগনোজ করবেন?

```javascript
db.users.find({ age: { $gt: 25 } }).explain("executionStats");
```

**আউটপুটে যা দেখতে হবে:**
- `stage`: **COLLSCAN** হলে ইনডেক্স নেই (খারাপ)। **IXSCAN** হলে ইনডেক্স ব্যবহার হচ্ছে (ভালো)।
- `totalDocsExamined`: কতটি ডকুমেন্ট স্ক্যান হয়েছে।
- `nReturned`: কতটি ডকুমেন্ট ফলাফলে এসেছে।
- **Covering Query (সেরা পারফরম্যান্স):** যদি `totalDocsExamined: 0` হয় এবং পুরো তথ্য ইনডেক্স থেকেই পাওয়া যায় (**PROJECTION_COVERAGE**), তবে ডাটাবেসকে র‍্যাম থেকে মূল ডকুমেন্ট রিডই করতে হয় না!

---

# Module 6: High Availability & Scaling (Replication & Sharding)

### 6.1 Replication (High Availability & Fault Tolerance)

Replication হলো একই ডাটার একাধিক কপি একাধিক সার্ভারে রাখা (Replica Set)।

```
              ┌─────────────────┐
              │ Primary Node    │ ◄── Write Operations All Go Here
              └────────┬────────┘
                       │ Replicates (Oplog)
           ┌───────────┴───────────┐
           ▼                       ▼
   ┌───────────────┐       ┌───────────────┐
   │Secondary Node │       │Secondary Node │ ◄── Read Operations (Optional)
   └───────────────┘       └───────────────┘
```

- **Primary Node:** সমস্ত Write آپریشن সামলায়।
- **Secondary Nodes:** Primary-এর `Oplog` (Operations Log) থেকে ডাটা সিঙ্ক করে রাখে। Primary ডাউন হলে ইলেকশনের (Raft Consensus) মাধ্যমে নতুন Primary নির্বাচিত হয়।
- **Write Concern (`w`):** 
  - `w: 1`: প্রাইমারিতে রাইট হলেই সাফল্য দেখাবে।
  - `w: "majority"`: প্রজেক্টের সংখ্যাগরিষ্ঠ নোডে রাইট সেভ হলে রিটার্ন করবে (ডাটা লস রদ করে)।
- **Read Preference:** ক্লায়েন্ট কোথায় ডাটা রিড করবে (`primary`, `secondaryPreferred`, `nearest`)।

---

### 6.2 Sharding (Horizontal Scaling)

যখন ডাটা এত বিশাল হয়ে যায় যে ১টি সার্ভারের ডিস্ক বা র‍্যামে ধরে না, তখন ডাটা একাধিক ক্লাস্টারে ভাগ করে দেওয়াই হলো **Sharding**।

```
                  ┌──────────────┐
                  │ Client / App │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ mongos Router│ ◄── Directs Queries using Shard Key
                  └──────┬───────┘
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Shard A   │   │   Shard B   │   │   Shard C   │
└─────────────┘   └─────────────┘   └─────────────┘
```

- **Shard Key:** ডাটা কোন সার্ভারে যাবে তা নির্ধারণের চাবি। (যেমন: `userId` বা Hash index)।
- **`mongos`:** কুয়েরি রাউটার যা অ্যাপের সাথে সংযোগ রাখে এবং সঠিক শાર્ডে রিকোয়েস্ট পাঠায়।
- **Config Server:** শর্ড ক্লাস্টারের মেটাডাটা ধরে রাখে।
- **Hotspotting Issue:** ভুল Shard Key বেছে নিলে (যেমন Auto-incrementing timestamp) সব রাইট ১টি শার্ডেই ধাক্কা মারে।

---

# Module 7: Transactions, WiredTiger & Security

### 7.1 WiredTiger Storage Engine
MongoDB-এর ডিফল্ট স্টোরেজ ইঞ্জিন।
- **Checkpoints:** প্রতি ৬০ সেকেন্ড পর পর মেমোরি থেকে ডিস্কে ডাটা সেভ করে।
- **Snappy Compression:** ডাটা ও ইনডেক্স কম্প্রেস করে ডিস্কের জায়গা বাঁচায়।
- **Document-Level Concurrency Control:** একাধিক রাইট একসাথে হতে পারে কারণ এটি টেবিল লেভেলে লক না মেরে ডকুমেন্ট লেভেলে লক করে।

---

### 7.2 Multi-Document ACID Transactions
MongoDB 4.0+ থেকে একাধিক কালেকশন ও ডকুমেন্টের মধ্যে ACID Transaction সাপোর্ট করে।

---

# Module 8: Node.js & Mongoose Integration Code Scenarios

### Scenario 1: Optimized Pagination with Mongoose

```javascript
// Post.js Model
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
});

// Index for Pagination
postSchema.index({ createdAt: -1 });

const Post = mongoose.model('Post', postSchema);

// Controller Method
async function getPaginatedPosts(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const lastCreatedAt = req.query.lastCreatedAt;

  const query = {};
  if (lastCreatedAt) {
    query.createdAt = { $lt: new Date(lastCreatedAt) }; // Keyset Cursor
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean(); // Convert Mongoose Document to Plain JS Object (Fast)

  res.json({
    posts,
    lastCreatedAt: posts.length > 0 ? posts[posts.length - 1].createdAt : null
  });
}
```

---

### Scenario 2: ACID Transaction in Mongoose (Bank Account Transfer)

```javascript
const mongoose = require('mongoose');

async function transferMoney(fromAccountId, toAccountId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction(); // Transaction Start

  try {
    // 1. টাকা কাটানো
    const sender = await Account.findByIdAndUpdate(
      fromAccountId,
      { $inc: { balance: -amount } },
      { session, new: true }
    );

    if (sender.balance < 0) {
      throw new Error("পর্যাপ্ত ব্যালেন্স নেই!");
    }

    // 2. টাকা জমা করা
    await Account.findByIdAndUpdate(
      toAccountId,
      { $inc: { balance: amount } },
      { session }
    );

    // 3. সব ঠিক থাকলে Commit
    await session.commitTransaction();
    console.log("ট্রান্সফার সফল হয়েছে!");
  } catch (error) {
    // সমস্যা হলে সব পরিবর্তন রোলব্যাক (Abort)
    await session.abortTransaction();
    console.error("ট্রান্সফার ব্যর্থ! রোলব্যাক করা হয়েছে:", error.message);
  } finally {
    session.endSession();
  }
}
```

---

# Module 9: Complete Level-by-Level Question Vault

### 🟢 Junior Level Questions & Answers

**Q1: MongoDB-তে `find()` এবং `findOne()`-এর পার্থক্য কী?**  
**উত্তর:** `find()` একটি Cursor রিটার্ন করে যা দিয়ে একাধিক ডকুমেন্ট লুপ করা যায়। `findOne()` শুধুমাত্র প্রথম মিলে যাওয়া ১টি ডকুমেন্ট অবজেক্ট রিটার্ন করে।

**Q2: `lean()` কেন Mongoose-এ ব্যবহার করা হয়?**  
**উত্তর:** Mongoose ডিফল্টভাবে ডকুমেন্টের সাথে গেটার, সেটার ও ভার্চুয়াল মেথড যুক্ত করে ভারি অবজেক্ট দেয়। `.lean()` দিলে সাধারণ Plain JS Object পাওয়া যায়, যা রিড অপারেশন ২০-৩০% দ্রুত করে।

---

### 🟡 Mid Level Questions & Answers

**Q1: `$push` এবং `$addToSet`-এর পার্থক্য কী?**  
**উত্তর:** `$push` অ্যারেতে ডুপ্লিকেট থাকলেও ডাটা যোগ করে। `$addToSet` ডাটা যোগ করার আগে চেক করে ডাটাটি ইউনিক কিনা (ডুপ্লিকেট আটকায়)।

**Q2: `capped collection` কী?**  
**উত্তর:** এটি একটি নির্দিষ্ট আকারের ফিক্সড কালেকশন। সাইজ পূর্ণ হয়ে গেলে এটি বৃত্তাকারে পুরোনো ডাটা ডিলিট করে নতুন ডাটা বসায় (যেমন: Log storage)।

---

### 🔴 Senior Level Questions & Answers

**Q1: MongoDB-তে "Write Concern" এবং "Read Preference"-এর প্রভাব কী?**  
**উত্তর:** Write Concern (`w: majority`) নিশ্চিত করে ডাটা কতগুলো র্যাপ্লিকা নোডে নিরাপদে রাইট হওয়ার পর রেসপন্স করবে। Read Preference নির্দেশ করে অ্যাপ ডাটা প্রাইমারি নোড নাকি সেকন্ডারি নোড থেকে রিড করবে।

**Q2: COLLSCAN বনাম IXSCAN কী?**  
**উত্তর:** COLLSCAN হলো কালেকশনের সব ডকুমেন্ট স্ক্যান করা (ইনডেক্স ছাড়া), যা পারফরম্যান্সের জন্য ক্ষতিকর। IXSCAN হলো ইনডেক্স B-Tree ব্যবহার করে পয়েন্টার দিয়ে সরাসরি ডাটা রিড করা।

---

> **🎉 অভিনন্দন!** আপনি MongoDB-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন। নিয়মিত প্র্যাকটিস করুন!
