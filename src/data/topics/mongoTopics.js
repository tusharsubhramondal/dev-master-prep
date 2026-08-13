import { createTopicSchema } from './createTopicSchema.js';

export const mongoTopics = {
  // 1. NOSQL & DOCUMENT MODEL
  "mongodb-basics": createTopicSchema({
    id: "mongodb-basics",
    techId: "mongodb",
    title: "NoSQL & Document Model (BSON, Collections & Documents)",
    category: "MongoDB Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Database Fundamentals"],
    definition: "MongoDB is a leading document-oriented NoSQL database that stores data in flexible, schema-typed BSON (Binary JSON) documents organized into Collections.",
    simpleExplanation: "MongoDB stores data as flexible JSON-like documents (objects) instead of rigid tables and rows.",
    whyDoesItExist: "Provides high write scalability, dynamic schema flexibility, and natural object mapping for modern web applications.",
    basicExample: `// MongoDB BSON Document Example
{
  "_id": ObjectId("64b8a2f1c9e4b2001a123456"),
  "name": "Alice",
  "email": "alice@example.com",
  "tags": ["developer", "react"],
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "createdAt": ISODate("2026-08-13T10:00:00Z")
}`,
    howItWorks: [
      "1. Client driver converts JSON objects to lightweight BSON (Binary JSON) payload.",
      "2. mongod process receives payload and writes to WiredTiger storage engine.",
      "3. Auto-generates unique 12-byte _id ObjectId primary key if omitted."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Client JSON -&gt; Driver BSON Serialization -&gt; WiredTiger Storage Engine</text></svg>`,
    realWorldExample: `// Connecting via Mongoose ORM in Node.js
import mongoose from 'mongoose';
await mongoose.connect('mongodb://localhost:27017/appdb');`,
    commonUseCases: [
      "Storing user profiles and dynamic e-commerce product catalogs",
      "Handling high-speed content management system (CMS) documents",
      "Building real-time event logging and analytics stores"
    ],
    commonMistakes: [
      "Thinking BSON is identical to JSON (BSON supports native Date, ObjectId, Regex, and Decimal128 types)",
      "Storing massive 20MB files in documents (BSON document size limit is strictly 16MB; use GridFS)"
    ],
    bestPractices: [
      "Keep BSON documents well below the 16MB hard limit",
      "Leverage embedding for attributes queried together frequently"
    ],
    whenToUse: ["When building applications with rapidly evolving schemas or dynamic document structures"],
    whenNotToUse: ["When building highly complex multi-table relational financial accounting ledgers"],
    relatedConcepts: ["BSON", "Collections", "Documents", "ObjectId", "WiredTiger"],
    comparison: {
      title: "JSON vs BSON in MongoDB",
      headers: ["Aspect", "JSON", "BSON"],
      rows: [
        ["Format", "Text String", "Binary Encoded Format"],
        ["Data Types", "String, Number, Boolean, Array, Object, Null", "Adds ObjectId, Date, BinData, Decimal128, Regex"],
        ["Read Efficiency", "Slower (Parsing text)", "Fast (Binary length-prefixed fields)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is BSON and what is the maximum document size in MongoDB?", answer: "BSON (Binary JSON) is a binary serialization format used to store documents in MongoDB, supporting extra data types like Date and ObjectId. The maximum single document size limit is 16MB." }
    ],
    practiceProblem: {
      description: "Write Mongoose connection string format.",
      starterCode: `mongodb://localhost:27017/testdb`,
      testAssertion: "true",
      solution: `mongodb://localhost:27017/testdb`
    },
    quickRevision: "★ MongoDB stores data in BSON documents.\n★ Max document size is 16MB.\n★ _id ObjectId is auto-generated 12-byte primary key."
  }),

  // 2. CRUD OPERATIONS
  "mongodb-crud": createTopicSchema({
    id: "mongodb-crud",
    techId: "mongodb",
    title: "MongoDB CRUD Operations (insertOne, find, updateOne, deleteOne)",
    category: "MongoDB Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["mongodb-basics"],
    definition: "MongoDB CRUD methods (insertOne, insertMany, find, findOne, updateOne, updateMany, deleteOne, deleteMany) perform document creation, retrieval, mutation, and removal.",
    simpleExplanation: "MongoDB CRUD operations allow you to insert, search, modify, and delete document records using native JavaScript objects.",
    whyDoesItExist: "Provides native JS object manipulation for database records without raw SQL syntax.",
    basicExample: `// Insert Document
db.users.insertOne({ name: "Alice", email: "alice@example.com", age: 25 });

// Find Documents with Filter and Projection
db.users.find({ age: { $gte: 18 } }, { name: 1, email: 1 });

// Update Document using Atomic Operator ($set)
db.users.updateOne({ email: "alice@example.com" }, { $set: { age: 26 } });

// Delete Document
db.users.deleteOne({ email: "alice@example.com" });`,
    howItWorks: [
      "1. mongod receives write command and validates document format.",
      "2. Atomic update operators ($set, $inc, $push) mutate target fields in-place.",
      "3. Changes written to WiredTiger cache and WiredTiger journal for crash recovery."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">updateOne() -&gt; Atomic $set Operator -&gt; WiredTiger Journal</text></svg>`,
    realWorldExample: `// Upsert operation (Insert if missing, Update if found)
db.users.updateOne(
  { email: "bob@example.com" },
  { $set: { name: "Bob", lastLogin: new Date() } },
  { upsert: true }
);`,
    commonUseCases: [
      "Executing document CRUD operations in Node.js API services",
      "Performing upsert operations using { upsert: true }",
      "Updating embedded fields using dot notation ('address.city')"
    ],
    commonMistakes: [
      "Omitting atomic operators ($set) during updateOne, which completely OVERWRITES the whole document!",
      "Not building indexes on fields queried inside find() filter objects"
    ],
    bestPractices: [
      "ALWAYS use atomic update operators ($set, $inc, $push) during updates",
      "Use projection ({ name: 1, email: 1 }) to return only required fields"
    ],
    whenToUse: ["In all MongoDB document query and mutation operations"],
    whenNotToUse: ["Do not replace updateOne with find -> mutate -> save if atomic $set suffices"],
    relatedConcepts: ["insertOne", "find", "updateOne ($set)", "upsert", "Projection"],
    comparison: {
      title: "updateOne with $set vs Plain Object Update",
      headers: ["Update Syntax", "Behavior", "Safety"],
      rows: [
        ["db.coll.updateOne({id}, { $set: { age: 25 } })", "Mutates ONLY the specified 'age' field", "Safe"],
        ["db.coll.updateOne({id}, { age: 25 })", "Overwrites the ENTIRE document with { age: 25 }", "Dangerous (Data Loss!)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What happens if you omit the $set operator in a MongoDB updateOne query?", answer: "Without $set, MongoDB will replace the entire document with the new object, wiping out all other fields in that document." }
    ],
    practiceProblem: {
      description: "Write updateOne using $set for status active.",
      starterCode: `db.users.updateOne({ id: 1 }, { $set: { status: 'active' } });`,
      testAssertion: "true",
      solution: `db.users.updateOne({ id: 1 }, { $set: { status: 'active' } });`
    },
    quickRevision: "★ ALWAYS use $set operator during updateOne to prevent full document overwrite.\n★ Use { upsert: true } to insert if missing.\n★ Use projection to fetch only needed fields."
  }),

  // 3. QUERY OPERATORS
  "mongodb-operators": createTopicSchema({
    id: "mongodb-operators",
    techId: "mongodb",
    title: "MongoDB Query Operators ($eq, $gt, $in, $and, $elemMatch)",
    category: "MongoDB Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["mongodb-crud"],
    definition: "MongoDB query operators categorize evaluation into Comparison ($eq, $gt, $gte, $in), Logical ($and, $or, $nor, $not), Element ($exists, $type), and Array ($elemMatch) operators.",
    simpleExplanation: "Query operators allow rich conditional filtering like checking if numbers are greater than a value or if array elements match multiple criteria.",
    whyDoesItExist: "Provides rich expressive query filtering capabilities over complex JSON documents.",
    basicExample: `// Querying using $gt, $in, $and, and $elemMatch
db.products.find({
  $and: [
    { price: { $gte: 50, $lte: 200 } },
    { category: { $in: ["electronics", "audio"] } },
    { reviews: { $elemMatch: { rating: { $gte: 4 }, verified: true } } }
  ]
});`,
    howItWorks: [
      "1. Query engine evaluates filters against document field values.",
      "2. $elemMatch ensures that AT LEAST ONE single array element matches all nested criteria.",
      "3. $exists checks for field presence regardless of null value."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">$elemMatch Array Filter -&gt; Checks Single Array Element Match</text></svg>`,
    realWorldExample: `// Finding documents where optional phone field exists
db.users.find({ phone: { $exists: true, $ne: null } });`,
    commonUseCases: [
      "Filtering range prices ($gte, $lte) in e-commerce stores",
      "Matching documents containing tags from an array ($in)",
      "Querying array of objects using $elemMatch"
    ],
    commonMistakes: [
      "Confusing array querying without $elemMatch (matching across separate array elements instead of a single element)",
      "Overusing $or which can prevent efficient index usage"
    ],
    bestPractices: [
      "Use $elemMatch when querying array of objects for multiple criteria on the SAME object",
      "Use $in for matching against explicit lists of values"
    ],
    whenToUse: ["In all conditional filtering queries in MongoDB"],
    whenNotToUse: ["Do not use $or across non-indexed fields"],
    relatedConcepts: ["$elemMatch", "$in", "$exists", "$gte", "Array Querying"],
    comparison: {
      title: "Dot Notation vs $elemMatch on Arrays of Objects",
      headers: ["Query Syntax", "Behavior"],
      rows: [
        ["db.coll.find({ 'items.qty': 5, 'items.color': 'red' })", "Matches if ANY item has qty:5 AND ANY item (possibly different) has color:'red'"],
        ["db.coll.find({ items: { $elemMatch: { qty: 5, color: 'red' } } })", "Matches ONLY if the EXACT SAME single item has both qty:5 AND color:'red'"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why is $elemMatch necessary when querying arrays of embedded documents?", answer: "$elemMatch guarantees that all specified criteria match on the exact same single embedded document element inside the array, rather than matching criteria spread across different array elements." }
    ],
    practiceProblem: {
      description: "Write query using $in for status active or pending.",
      starterCode: `db.users.find({ status: { $in: ['active', 'pending'] } });`,
      testAssertion: "true",
      solution: `db.users.find({ status: { $in: ['active', 'pending'] } });`
    },
    quickRevision: "★ $elemMatch checks criteria on the SAME array element.\n★ $exists checks for field presence.\n★ $in matches against a array list of scalar values."
  }),

  // 4. INDEXING STRATEGIES
  "mongodb-indexes": createTopicSchema({
    id: "mongodb-indexes",
    techId: "mongodb",
    title: "MongoDB Indexing Strategies (Single Field, Compound, Multikey & TTL)",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    readingTime: "10 min",
    prerequisites: ["mongodb-operators"],
    definition: "MongoDB indexes utilize B-Tree structures to optimize query performance. Index types include Single Field, Compound, Multikey (for arrays), TTL (time-to-live auto-deletion), and Text indexes.",
    simpleExplanation: "Indexes speed up document lookups instantly. Compound indexes follow the ESR rule (Equality, Sort, Range).",
    whyDoesItExist: "Prevents slow collection scans (COLLSCAN) on large databases.",
    basicExample: `// Compound Index following ESR Rule (Equality, Sort, Range)
db.orders.createIndex({ status: 1, createdAt: -1, totalAmount: 1 });

// TTL Index (Auto-deletes documents 3600 seconds after createdAt)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });`,
    howItWorks: [
      "1. WiredTiger engine builds B-Tree index structure on disk.",
      "2. Query planner matches find() filters to index keys.",
      "3. Scans IXSCAN leaf nodes instead of COLLSCAN full collection."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">ESR Rule (Equality -&gt; Sort -&gt; Range) B-Tree IXSCAN</text></svg>`,
    realWorldExample: `db.users.createIndex({ email: 1 }, { unique: true });`,
    commonUseCases: [
      "Accelerating document queries with Single and Compound indexes",
      "Automatically expiring session tokens using TTL indexes",
      "Indexing array fields using Multikey indexes"
    ],
    commonMistakes: [
      "Ignoring the ESR (Equality, Sort, Range) rule when designing compound indexes",
      "Attempting to create compound multikey indexes on MORE THAN ONE array field (MongoDB forbids this!)"
    ],
    bestPractices: [
      "Design compound indexes using the ESR Rule: Equality fields first, Sort fields second, Range fields last",
      "Use TTL indexes for automatic session and log cleanup"
    ],
    whenToUse: ["On all frequently queried or sorted MongoDB fields"],
    whenNotToUse: ["Do not index small collections under 1,000 documents"],
    relatedConcepts: ["B-Tree", "ESR Rule", "Multikey Index", "TTL Index", "COLLSCAN vs IXSCAN"],
    comparison: {
      title: "COLLSCAN vs IXSCAN in MongoDB",
      headers: ["Scan Type", "Operation", "Performance"],
      rows: [
        ["COLLSCAN", "Full Collection Scan (Scans every document on disk)", "Slow (High CPU & I/O)"],
        ["IXSCAN", "Index Scan (Traverses B-Tree index nodes)", "Ultra Fast (Milliseconds)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the ESR Rule for designing MongoDB Compound Indexes?", answer: "The ESR Rule stands for Equality, Sort, Range. Place exact equality match fields first in the index, fields used for sorting second, and range filter fields ($gt, $lt) last." }
    ],
    practiceProblem: {
      description: "Write SQL creating unique index on email.",
      starterCode: `db.users.createIndex({ email: 1 }, { unique: true });`,
      testAssertion: "true",
      solution: `db.users.createIndex({ email: 1 }, { unique: true });`
    },
    quickRevision: "★ ESR Rule: Equality -> Sort -> Range.\n★ IXSCAN = Index scan; COLLSCAN = Full collection scan.\n★ TTL indexes auto-delete documents after expiry."
  }),

  // 5. AGGREGATION FRAMEWORK
  "mongodb-aggregation": createTopicSchema({
    id: "mongodb-aggregation",
    techId: "mongodb",
    title: "MongoDB Aggregation Pipeline ($match, $group, $project, $lookup)",
    category: "Aggregation",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["mongodb-indexes"],
    definition: "The Aggregation Framework processes documents through multi-stage pipelines ($match, $group, $project, $sort, $unwind, $lookup) to transform and calculate aggregated results.",
    simpleExplanation: "An aggregation pipeline processes documents step-by-step through stage filters ($match -> $group -> $project) like an assembly line.",
    whyDoesItExist: "Replaces legacy MapReduce with high-speed C++ pipeline data analytics.",
    basicExample: `db.orders.aggregate([
  // Stage 1: Filter active orders
  { $match: { status: "completed" } },
  
  // Stage 2: Group by customer and sum total
  { $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 }
  }},

  // Stage 3: Sort by totalSpent descending
  { $sort: { totalSpent: -1 } },

  // Stage 4: Project clean field names
  { $project: { _id: 0, customerId: "$_id", totalSpent: 1, orderCount: 1 } }
]);`,
    howItWorks: [
      "1. Documents flow sequentially from one pipeline stage to the next.",
      "2. $lookup performs left outer join with another collection.",
      "3. $unwind deconstructs an array field to output a document per array element."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">$match -&gt; $group -&gt; $unwind -&gt; $lookup -&gt; $project Output</text></svg>`,
    realWorldExample: `// $lookup Join Example
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  },
  { $unwind: "$userDetails" }
]);`,
    commonUseCases: [
      "Building metrics dashboards, total sales, and analytical reports",
      "Joining data across collections with $lookup",
      "Deconstructing arrays into individual documents using $unwind"
    ],
    commonMistakes: [
      "Placing $match after $group (always place $match as early as possible in pipeline to utilize indexes and reduce data volume)",
      "Exceeding the 100MB RAM limit per pipeline stage (use { allowDiskUse: true } for massive datasets)"
    ],
    bestPractices: [
      "Place $match and $sort at the very beginning of the pipeline to leverage indexes",
      "Use $project to discard unnecessary fields early"
    ],
    whenToUse: ["In all complex data analytics, metrics, and collection join queries"],
    whenNotToUse: ["Do not use heavy aggregation for single document findOne queries"],
    relatedConcepts: ["$match", "$group", "$lookup", "$unwind", "$project"],
    comparison: {
      title: "$lookup vs SQL LEFT JOIN",
      headers: ["Operation", "Syntax", "Output"],
      rows: [
        ["SQL LEFT JOIN", "JOIN orders ON users.id = orders.user_id", "Flattened joined relational rows"],
        ["MongoDB $lookup", "{ $lookup: { from: 'users', ... as: 'details' } }", "Document with embedded array of matched objects"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is the position of $match crucial in a MongoDB Aggregation Pipeline?", answer: "$match should be placed at the beginning of the pipeline so it can utilize indexes to filter documents early, drastically reducing the number of documents passed to subsequent stages like $group or $lookup." }
    ],
    practiceProblem: {
      description: "Write $match aggregation stage for status completed.",
      starterCode: `db.orders.aggregate([{ $match: { status: 'completed' } }]);`,
      testAssertion: "true",
      solution: `db.orders.aggregate([{ $match: { status: 'completed' } }]);`
    },
    quickRevision: "★ $match filters early to use indexes.\n★ $group calculates totals ($sum, $avg).\n★ $lookup performs left outer joins across collections."
  }),

  // 6. DATA MODELING PATTERNS
  "mongodb-modeling": createTopicSchema({
    id: "mongodb-modeling",
    techId: "mongodb",
    title: "MongoDB Data Modeling: Embedding vs Referencing",
    category: "Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["mongodb-aggregation"],
    definition: "Data modeling in MongoDB involves deciding between Embedding nested documents (Denormalization) for fast single-query reads, or Referencing document ObjectIds (Normalization) for large or unbounded relationships.",
    simpleExplanation: "Embed data if items are queried together and bounded in size. Reference ObjectIds if data is large or shared across multiple entities.",
    whyDoesItExist: "Optimizes read performance by avoiding expensive joins across collections.",
    basicExample: `// 1. Embedded Schema (Fast Single-Read for Bounded 1-to-Few)
{
  "_id": ObjectId("111"),
  "name": "Alice",
  "addresses": [
    { "type": "home", "city": "NYC" },
    { "type": "work", "city": "SF" }
  ]
}

// 2. Referenced Schema (For Unbounded 1-to-Many or Many-to-Many)
{
  "_id": ObjectId("222"),
  "title": "Post Title",
  "authorId": ObjectId("111") // Reference to Users collection
}`,
    howItWorks: [
      "1. Embedding stores related data inside a single BSON document on disk.",
      "2. Single read retrieves entire entity without collection joins.",
      "3. Referencing separates entities to prevent 16MB document size overflow."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Embedding (Single Read) vs Referencing (Unbounded Collections)</text></svg>`,
    realWorldExample: `// Bucket Pattern for Time-Series Logs (Limits array size per document)
{
  "sensorId": 101,
  "day": "2026-08-13",
  "count": 100,
  "readings": [ { "time": "10:00", "temp": 22.5 }, ... ]
}`,
    commonUseCases: [
      "Embedding 1-to-Few bounded sub-documents (user addresses, order line items)",
      "Referencing 1-to-Many unbounded relationships (user posts, product reviews)",
      "Applying the Bucket Pattern for high-volume time-series metrics"
    ],
    commonMistakes: [
      "Embedding unbounded arrays (e.g. storing 500,000 comments inside a single post document until it crashes past 16MB)",
      "Designing MongoDB schemas strictly like relational SQL tables with 100% normalized referencing"
    ],
    bestPractices: [
      "Embed data if it is read together and bounded in size",
      "Reference ObjectIds if data is updated independently or unbounded in size"
    ],
    whenToUse: ["When designing MongoDB document schemas for new features"],
    whenNotToUse: ["Do not embed infinitely growing arrays"],
    relatedConcepts: ["Embedding", "Referencing", "Denormalization", "Bucket Pattern"],
    comparison: {
      title: "Embedding vs Referencing",
      headers: ["Criteria", "Embedded Pattern", "Referenced Pattern"],
      rows: [
        ["Relationship", "One-to-Few (Bounded)", "One-to-Many (Unbounded) / Many-to-Many"],
        ["Query Speed", "Ultra Fast (Single document read)", "Requires $lookup join or 2 queries"],
        ["Document Size Risk", "Risk of exceeding 16MB if array grows", "Zero 16MB document size risk"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "When should you Embed vs Reference documents in MongoDB?", answer: "Embed when data is read together and bounded in size (1-to-Few). Reference ObjectIds when data is updated independently, shared across entities, or unbounded in size (1-to-Many) to prevent exceeding the 16MB document limit." }
    ],
    practiceProblem: {
      description: "Write schema field referencing User ObjectId.",
      starterCode: `const postSchema = { author: { type: Schema.Types.ObjectId, ref: 'User' } };`,
      testAssertion: "true",
      solution: `const postSchema = { author: { type: Schema.Types.ObjectId, ref: 'User' } };`
    },
    quickRevision: "★ Embed data read together and bounded in size.\n★ Reference ObjectIds for unbounded 1-to-Many data.\n★ Never let embedded arrays grow past 16MB limit."
  }),

  // 7. TRANSACTIONS & CONCURRENCY
  "mongodb-transactions": createTopicSchema({
    id: "mongodb-transactions",
    techId: "mongodb",
    title: "Multi-Document ACID Transactions & Write Concern",
    category: "Transactions",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["mongodb-modeling"],
    definition: "MongoDB supports Multi-Document ACID Transactions across collections using Client Sessions, controlled by Write Concern (w:majority) and Read Concern (majority).",
    simpleExplanation: "Transactions let you update multiple documents across different collections atomically using session.startTransaction().",
    whyDoesItExist: "Provides ACID transaction guarantees for multi-document mutations.",
    basicExample: `const session = db.getMongo().startSession();
session.startTransaction();

try {
  db.accounts.updateOne(
    { _id: 1 }, { $inc: { balance: -100 } }, { session }
  );
  db.accounts.updateOne(
    { _id: 2 }, { $inc: { balance: 100 } }, { session }
  );
  
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
} finally {
  session.endSession();
}`,
    howItWorks: [
      "1. session.startTransaction() initializes global transaction ID.",
      "2. All CRUD operations executed within session acquire document locks.",
      "3. commitTransaction() commits changes across WiredTiger engine and Replica Set."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">startSession() -&gt; startTransaction() -&gt; Operations -&gt; commitTransaction()</text></svg>`,
    realWorldExample: `// Setting Write Concern for high data safety
db.orders.insertOne(
  { orderId: 1001, total: 250 },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
);`,
    commonUseCases: [
      "Executing financial transfers across multiple account documents",
      "Ensuring w:majority write confirmation on critical transactions",
      "Managing complex multi-collection order processing workflows"
    ],
    commonMistakes: [
      "Overusing multi-document transactions when single-document embedded atomic updates would suffice",
      "Keeping transactions open for too long causing write lock contention"
    ],
    bestPractices: [
      "Prefer single-document atomic updates ($inc, $push) whenever possible",
      "Use writeConcern: { w: 'majority' } for critical financial data"
    ],
    whenToUse: ["When updating multiple separate documents requiring ACID guarantees"],
    whenNotToUse: ["Do not use multi-document transactions for simple single-document updates"],
    relatedConcepts: ["ACID Transactions", "Client Sessions", "Write Concern", "Read Concern"],
    comparison: {
      title: "Single Document Atomic Update vs Multi-Document Transaction",
      headers: ["Metric", "Single-Document Update", "Multi-Document Transaction"],
      rows: [
        ["Atomic Guarantee", "Built-in natively for single document", "Requires Client Session transaction"],
        ["Overhead", "Ultra Low / High Speed", "Higher lock overhead (Requires Replica Set)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Write Concern in MongoDB?", answer: "Write Concern describes the level of acknowledgment requested from MongoDB for write operations (e.g. w:1 acknowledges primary write; w:'majority' acknowledges write committed to a majority of replica set nodes)." }
    ],
    practiceProblem: {
      description: "Write code to start session transaction.",
      starterCode: `session.startTransaction();`,
      testAssertion: "true",
      solution: `session.startTransaction();`
    },
    quickRevision: "★ Multi-document transactions use Client Sessions.\n★ Single-document updates are natively atomic.\n★ Use writeConcern w:'majority' for data safety."
  }),

  // 8. REPLICA SETS
  "mongodb-replica-sets": createTopicSchema({
    id: "mongodb-replica-sets",
    techId: "mongodb",
    title: "MongoDB Replica Sets, Elections & High Availability",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["mongodb-transactions"],
    definition: "A Replica Set is a cluster of mongod instances maintaining identical datasets via oplog (Operations Log) replication, featuring 1 Primary node and multiple Secondary nodes with automated election failover.",
    simpleExplanation: "Replica Sets keep multiple copies of your data across servers. If the Primary server crashes, a Secondary server is automatically elected Primary within seconds.",
    whyDoesItExist: "Provides high availability, fault tolerance, and disaster recovery.",
    basicExample: `// Connecting Node.js driver to Replica Set with Read Preference
const client = new MongoClient('mongodb://host1,host2,host3/?replicaSet=myReplSet', {
  readPreference: 'secondaryPreferred' // Reads offloaded to secondaries!
});`,
    howItWorks: [
      "1. Primary node writes all data mutations to oplog collection in local database.",
      "2. Secondary nodes continuously replicate primary's oplog and apply mutations locally.",
      "3. If Primary fails, Heartbeat signals trigger Raft-like election electing new Primary."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Primary Node (oplog) -&gt; Async Replication -&gt; Secondary 1 | Secondary 2</text></svg>`,
    realWorldExample: `rs.status(); // Checks Replica Set cluster health and node roles`,
    commonUseCases: [
      "Achieving High Availability and zero downtime in production",
      "Offloading analytics read queries to Secondary nodes using readPreference",
      "Automatic failover election when primary node crashes"
    ],
    commonMistakes: [
      "Configuring an EVEN number of voting nodes without an Arbiter (causes election deadlocks)",
      "Reading stale data from secondaries when readPreference is set to secondary"
    ],
    bestPractices: [
      "Always maintain an ODD number of voting nodes (e.g. 3 nodes: 1 Primary + 2 Secondaries)",
      "Use readPreference: 'primary' for strict read consistency"
    ],
    whenToUse: ["In all production MongoDB deployments"],
    whenNotToUse: ["Do not deploy a single standalone node in production"],
    relatedConcepts: ["Replica Set", "Primary Node", "oplog", "Read Preference", "Failover Election"],
    comparison: {
      title: "Primary vs Secondary Node in Replica Set",
      headers: ["Role", "Writes Allowed?", "Data Synchronization"],
      rows: [
        ["Primary Node", "Yes (ALL write operations target Primary)", "Generates oplog entries"],
        ["Secondary Node", "No (Read-only node)", "Replicates Primary's oplog continuously"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the oplog in MongoDB Replica Sets?", answer: "The oplog (operations log) is a capped collection in the local database that records all data modification operations executed on the Primary node. Secondaries replicate and apply this oplog asynchronously to maintain data synchronization." }
    ],
    practiceProblem: {
      description: "Write command checking replica set status.",
      starterCode: `rs.status();`,
      testAssertion: "true",
      solution: `rs.status();`
    },
    quickRevision: "★ All writes go to Primary node.\n★ Secondaries replicate Primary's oplog.\n★ Odd number of voting nodes required for elections."
  }),

  // 9. SHARDING
  "mongodb-sharding": createTopicSchema({
    id: "mongodb-sharding",
    techId: "mongodb",
    title: "MongoDB Sharding & Horizontal Scaling Architecture",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["mongodb-replica-sets"],
    definition: "Sharding distributes massive datasets horizontally across multiple MongoDB Replica Sets using Shard Keys, routed by mongos query routers and managed by Config Servers.",
    simpleExplanation: "Sharding splits a multi-terabyte database across multiple cluster nodes so no single server runs out of disk or memory space.",
    whyDoesItExist: "Scales database reads, writes, and storage capacity horizontally past single-server hardware limits.",
    basicExample: `// Enabling Sharding on collection with Shard Key
sh.enableSharding("appdb");
sh.shardCollection("appdb.orders", { customerId: "hashed" });`,
    howItWorks: [
      "1. Client sends query to mongos query router.",
      "2. mongos consults Config Servers to find targeted Shard based on Shard Key.",
      "3. mongos routes query directly to the specific Shard containing the data."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Client -&gt; mongos Router -&gt; Config Server -&gt; Targeted Shard 1 / Shard 2</text></svg>`,
    realWorldExample: `// Hashed Shard Key for even write distribution
sh.shardCollection("logs.events", { deviceId: "hashed" });`,
    commonUseCases: [
      "Scaling databases storing tens of terabytes of data",
      "Scaling write throughput past single primary node limits",
      "Distributing global application data by geographic region"
    ],
    commonMistakes: [
      "Choosing a low-cardinality Shard Key (e.g. status), causing massive unbalanced jumbo chunks on a single shard",
      "Choosing a monotonically increasing Shard Key (e.g. Date/ObjectId) causing ALL write operations to hit the exact same shard!"
    ],
    bestPractices: [
      "Choose a high-cardinality Shard Key that appears in most application queries",
      "Use Hashed Shard Keys to achieve even write distribution"
    ],
    whenToUse: ["When dataset size or write throughput exceeds single Replica Set limits"],
    whenNotToUse: ["Do not shard prematurely on small datasets under 1TB"],
    relatedConcepts: ["Sharding", "Shard Key", "mongos Router", "Config Servers", "Chunk Splitting"],
    comparison: {
      title: "Vertical Scaling vs Sharding (Horizontal Scaling)",
      headers: ["Scaling Type", "Mechanism", "Limits"],
      rows: [
        ["Vertical Scaling", "Upgrading single server CPU/RAM", "Hard hardware cost & capacity ceiling"],
        ["Horizontal Sharding", "Adding more server nodes to cluster", "Scales endlessly across hardware nodes"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is choosing the correct Shard Key critical in MongoDB Sharding?", answer: "Because an immutable Shard Key determines data distribution across cluster nodes. A poor key causes unbalanced data chunks, hot-spotting all writes to a single shard, and scatter-gather queries across the entire cluster." }
    ],
    practiceProblem: {
      description: "Write command enabling sharding on database appdb.",
      starterCode: `sh.enableSharding("appdb");`,
      testAssertion: "true",
      solution: `sh.enableSharding("appdb");`
    },
    quickRevision: "★ Sharding scales databases horizontally across cluster nodes.\n★ mongos routes queries using Config Server metadata.\n★ Choose high-cardinality Shard Keys to prevent hotspots."
  }),

  // 10. PERFORMANCE PROFILING
  "mongodb-performance": createTopicSchema({
    id: "mongodb-performance",
    techId: "mongodb",
    title: "MongoDB Performance Profiling & Explain Plan Analysis",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["mongodb-sharding"],
    definition: "Performance profiling in MongoDB uses cursor.explain('executionStats') to inspect query execution plans, Database Profiler to log slow queries, and WiredTiger cache tuning.",
    simpleExplanation: "explain('executionStats') shows exact execution metrics including total documents scanned versus returned.",
    whyDoesItExist: "Identifies unindexed COLLSCAN queries and optimizes query response latency.",
    basicExample: `// Detailed Execution Stats Profiling
db.orders.find({ status: "completed" }).explain("executionStats");`,
    howItWorks: [
      "1. explain('executionStats') executes query measuring totalKeysExamined and totalDocsExamined.",
      "2. Ratio totalDocsExamined / nReturned = 1 indicates an optimal query.",
      "3. High totalDocsExamined with low nReturned signals an unindexed COLLSCAN bottleneck."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">explain('executionStats') -&gt; Check totalDocsExamined vs nReturned</text></svg>`,
    realWorldExample: `// Setting Database Profiler level to log operations > 100ms
db.setProfilingLevel(1, { slowms: 100 });
db.system.profile.find().sort({ millis: -1 }).limit(5);`,
    commonUseCases: [
      "Diagnosing high-latency queries using explain('executionStats')",
      "Inspecting system.profile collection for slow operations",
      "Verifying index coverage using winningPlan stage"
    ],
    commonMistakes: [
      "Ignoring totalDocsExamined in explain output",
      "Leaving Profiling Level 2 (log ALL operations) enabled permanently in production (creates excessive logging overhead)"
    ],
    bestPractices: [
      "Aim for totalDocsExamined / nReturned ratio close to 1",
      "Use db.setProfilingLevel(1, { slowms: 100 }) to capture slow queries"
    ],
    whenToUse: ["When optimizing slow MongoDB queries and collection indexes"],
    whenNotToUse: ["Do not run profiling level 2 in high-traffic production environments"],
    relatedConcepts: ["explain()", "executionStats", "totalDocsExamined", "Database Profiler"],
    comparison: {
      title: "COLLSCAN vs Covered Query in explain()",
      headers: ["Stage", "totalKeysExamined", "totalDocsExamined", "Performance"],
      rows: [
        ["COLLSCAN", "0", "1,000,000 (All docs scanned)", "Very Slow"],
        ["Covered Query (IXSCAN)", "10 (Index keys examined)", "0 (Zero docs scanned from disk!)", "Ultra Fast"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is a Covered Query in MongoDB and how do you verify it with explain()?", answer: "A Covered Query is a query where all returned fields are satisfied directly from the B-Tree index without reading documents from disk storage. In explain(), totalDocsExamined is 0 and stage is IXSCAN." }
    ],
    practiceProblem: {
      description: "Write explain command with executionStats mode.",
      starterCode: `db.users.find({ id: 1 }).explain("executionStats");`,
      testAssertion: "true",
      solution: `db.users.find({ id: 1 }).explain("executionStats");`
    },
    quickRevision: "★ explain('executionStats') reveals actual query execution metrics.\n★ Covered Queries have totalDocsExamined = 0.\n★ Set profiling level 1 to log queries slower than threshold."
  })
};
