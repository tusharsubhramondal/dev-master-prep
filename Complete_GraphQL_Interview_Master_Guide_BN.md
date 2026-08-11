# Complete GraphQL Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, REST বনাম GraphQL তুলনা, Schema SDL, Resolvers, N+1 Problem সমাধান (DataLoader), Apollo Server, Federation এবং ক্লায়েন্ট ক্যাশিং কোডসহ তৈরি করা হয়েছে যাতে যে কেউ (শিক্ষানবিস থেকে সিনিয়র এপিআই আর্কিটেক্ট) GraphQL-এর যেকোনো ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: GraphQL Fundamentals & REST vs GraphQL](#module-1-graphql-fundamentals--rest-vs-graphql)
2. [Module 2: Schema Definition Language (SDL) & Type System](#module-2-schema-definition-language-sdl--type-system)
3. [Module 3: Resolvers & Server Architecture](#module-3-resolvers--server-architecture)
4. [Module 4: The N+1 Problem & DataLoader (Senior Performance)](#module-4-the-n1-problem--dataloader)
5. [Module 5: Real-time Subscriptions & Apollo Federation](#module-5-real-time-subscriptions--apollo-federation)
6. [Module 6: Security & Best Practices](#module-6-security--best-practices)
7. [Module 7: Complete Apollo Server & DataLoader Code Scenario](#module-7-complete-apollo-server--dataloader-code-scenario)
8. [Module 8: Complete Level-by-Level Question Vault](#module-8-complete-level-by-level-question-vault)

---

# Module 1: GraphQL Fundamentals & REST vs GraphQL

### 1.1 GraphQL কী?
GraphQL হলো এপিআই-এর জন্য একটি ওপেন-সোর্স **Query Language** এবং সেই কুয়েরি সম্পন্ন করার জন্য একটি Server-side Runtime (Facebook কর্তৃক ২০১৫ সালে প্রকাশিত)।  
এটি ক্লায়েন্টকে সুবিধা দেয় যে সে **ঠিক যতটুকু ডাটা চায়, ঠিক ততটুকু ডাটাই সার্ভারের কাছে দাবি করতে পারে**।

---

### 1.2 REST API বনাম GraphQL (গভীর তুলনা)

| ক্রাইটেরিয়া | REST API | GraphQL |
| :--- | :--- | :--- |
| **Endpoint** | একাধিক এন্ডপয়েন্ট (`/users`, `/posts/1`, `/comments`) | একটি মাত্র এন্ডপয়েন্ট (`/graphql` - HTTP POST) |
| **Data Fetching** | **Over-fetching** (অপ্রয়োজনীয় ডাটা আসায় ব্যান্ডউইথ নষ্ট) এবং **Under-fetching** (বারবার API কল করা) হয় | **Declarative Fetching** (ক্লায়েন্ট যে ফিল্ড চায় শুধু সেটাই আসে, Over/Under fetching ০%) |
| **Versioning** | v1, v2 দিয়ে এন্ডপয়েন্ট সংস্করণ করতে হয় | কোনো ভার্সনিং লাগে না; ফিল্ড `@deprecated` করা যায় |
| **Strong Typing** | স্বয়ংক্রিয় টাইপ সেফটি নেই (OpenAPI/Swagger লাগে) | **Schema-first** ও স্ট্রংলি টাইপড (Strongly Typed) |
| **Real-time** | SSE বা আলাদা WebSockets হ্যান্ডেল করতে হয় | **Subscriptions** ডিফল্টভাবে সাপোর্ট করে |

---

### 1.3 GraphQL-এর ৩টি প্রধান অপারেশন

1. **Query (Read):** ডাটা রিড করার জন্য (REST-এর `GET`-এর মতো)।
2. **Mutation (Write):** ডাটা তৈরি, আপডেট বা ডিলেট করার জন্য (REST-এর `POST/PUT/DELETE`-এর মতো)।
3. **Subscription (Real-time):** সকেট কানেকশন বজায় রেখে সার্ভার থেকে নতুন ডাটা পুশ রিসিভ করা।

---

# Module 2: Schema Definition Language (SDL) & Type System

GraphQL সম্পূর্ণ **Schema-first** ডেভেলপমেন্ট নীতি মেনে চলে।

### 2.1 Scalar Types & Modifiers
- **Built-in Scalars:** `String`, `Int`, `Float`, `Boolean`, `ID` (অনন্য স্ট্রিং আইডেন্টিফায়ার)।
- **Custom Scalars:** `Date`, `JSON`, `Decimal` ইত্যাদি কাস্টম টাইপ তৈরি করা যায়।
- **Type Modifiers:**
  - `String!`: Non-Null (অবশ্যই থাকতে হবে, null হবে না)।
  - `[String]`: স্ট্রিং-এর অ্যারে (অ্যারে খালি বা null হতে পারে)।
  - `[String!]!`: অ্যারে নিজে null হতে পারবে না এবং এর ভেতরে কোনো এলিমেন্টও null হতে পারবে না।

---

### 2.2 Enums, Inputs, Interfaces & Unions

```graphql
# Enum Definition
enum Role {
  ADMIN
  USER
  GUEST
}

# Input Type (Mutation-এ আর্গুমেন্ট হিসেবে পাঠানোর জন্য)
input CreateUserInput {
  name: String!
  email: String!
  role: Role!
}

# Interface
interface Character {
  id: ID!
  name: String!
}

type Human implements Character {
  id: ID!
  name: String!
  totalFriends: Int!
}

# Union Type (একাধিক টাইপের সমষ্টি)
union SearchResult = Human | Post
```

---

### 2.3 Directives (`@skip`, `@include`, `@deprecated`)

```graphql
query GetUser($showEmail: Boolean!) {
  user(id: "101") {
    name
    email @include(if: $showEmail) # শর্ত সত্যি হলেই ফিল্ড আসবে
    age @deprecated(reason: "Use birthDate instead")
  }
}
```

---

# Module 3: Resolvers & Server Architecture

### 3.1 Resolver কী?
Schema-তে ঘোষিত প্রতিটি ফিল্ডের ডাটা কোথা থেকে আসবে (Database, REST API বা Third-party) তা নির্ধারণকারী জাভাস্ক্রিপ্ট ফাংশনই হলো **Resolver**।

### 3.2 Resolver Signature: `(parent, args, context, info)`

1. **`parent` (বা `root`):** আগের প্যারেন্ট রিজলভার থেকে প্রাপ্ত অবজেক্ট (Nested Queries-এর ক্ষেত্রে লাগে)।
2. **`args`:** কুয়েরিতে ইউজার কর্তৃক পাঠানো প্যারামিটার অবজেক্ট (যেমন: `{ id: "101" }`)।
3. **`context`:** সব রিজলভারের মধ্যে শেয়ার করা গ্লোবাল অবজেক্ট (যেমন: Auth Tokens, Current User, Database Instance, DataLoaders)।
4. **`info`:** কুয়েরির মেটাডাটা ও AST তথ্য।

```javascript
const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      // context থেকে ইউজারের অথেন্টিকেশন চেক
      if (!context.currentUser) throw new Error("Unauthorized");
      return await context.db.User.findById(args.id);
    }
  }
};
```

---

# Module 4: The N+1 Problem & DataLoader (Senior Performance)

### 4.1 The Infamous N+1 Problem কী?

ইন্টারভিউ প্রশ্ন: GraphQL-এ **N+1 Problem** কী এবং কেন এটি ঘটে?

**উদাহরণ:**  
ধরা যাক আপনি ৫০টি পোস্ট (`N = 50`) এবং প্রতিটি পোস্টের লেখকের (Author) তথ্য পেতে কুয়েরি করলেন:
```graphql
query {
  posts {
    title
    author { name }
  }
}
```
**পর্দার পেছনে কী ঘটে?**
১. `posts` রিজলভার রান করে ১টি কুয়েরিতে ৫০টি পোস্ট আনে। (**১টি SQL Query**)  
২. প্রতিটি পোস্টের ভেতর `author` ফিল্ডের জন্য আলাদা রিজলভার রান করে। ফলে ৫০ বার ডাটাবেসে কুয়েরি যায়! (**N = ৫০টি SQL Query**)  
**মোট কুয়েরি:** `1 + N` = ৫১টি ডাটাবেস কুয়েরি! ডাটাবেস সম্পূর্ণ ক্র্যাশ করবে।

---

### 4.2 DataLoader সমাধান (Batching & Caching Mechanism)

**DataLoader** হলো ফেসবুকের তৈরি একটি মেকানিজম যা Node.js-এর Event Loop-এর `process.nextTick` মেকানিজম ব্যবহার করে একই টিকের সমস্ত আইডকে একটিমাত্র Batch Query-তে রূপান্তর করে (`SELECT * FROM users WHERE id IN (1, 2, 3...)`)।

```javascript
const DataLoader = require('dataloader');

// Batch Loading Function
const batchUsers = async (userIds) => {
  // ৫০টি আলাদা কুয়েরির বদলে ১টি IN Query
  const users = await User.find({ _id: { $in: userIds } });
  
  // ID অনুযায়ী সাজিয়ে রিটার্ন করা
  const userMap = {};
  users.forEach(u => { userMap[u.id] = u; });
  return userIds.map(id => userMap[id]);
};

// DataLoader Instance
const userLoader = new DataLoader(batchUsers);

// Resolver-এ ব্যবহার
const resolvers = {
  Post: {
    author: (post, args, context) => {
      // আলাদা DB কলের বদলে Loader-এ লোড করা
      return context.userLoader.load(post.authorId);
    }
  }
};
```

---

# Module 5: Real-time Subscriptions & Apollo Federation

### 5.1 Real-time Subscriptions (`graphql-ws`)
Subscriptions কাজ করে **WebSockets** ওভারলেতে **PubSub** (Publish-Subscribe) প্যাটার্ন মেনে।

```javascript
const resolvers = {
  Subscription: {
    commentAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(['COMMENT_ADDED'])
    }
  }
};
```

---

### 5.2 Apollo Federation (Microservices Architecture)

যখন বিশাল সিস্টেমে একাধিক টিম আলাদা সার্ভিস (User Service, Order Service, Product Service) চালনা করে, তখন সব মাইক্রোসার্ভিসের GraphQL Schema-কে একটিমাত্র **Gateway/Supergraph**-এ যুক্ত করাকে **Apollo Federation** বলে।

- **Subgraph:** স্বতন্ত্র মাইক্রোসার্ভিসের Schema।
- **Supergraph / Gateway:** সমস্ত Subgraph-কে একত্রিত করা একমাত্র এন্ডপয়েন্ট।
- **`@key(fields: "id")` Directives:** সার্ভিসের মধ্যে সত্তা (Entity) শেয়ার করার চাবি।

---

# Module 6: Security & Best Practices

1. **Introspection বন্ধ করা:** প্রোডাকশনে GraphQL Playground/Introspection ডিজেবল রাখা যাতে হ্যাকাররা পুরো Schema দেখতে না পায়।
2. **Depth Limiting:** ডীপ নেস্টেড আক্রমণ বন্ধ করা (`graphql-depth-limit` দিয়ে কুয়েরির সর্বোচ্চ গভীরতা ৩-৪ লেভেলে সীমাবদ্ধ রাখা)।
3. **Query Cost Analysis:** কুয়েরির জটিলতা মেপে নির্দিষ্ট পয়েন্টের বেশি খরচ হলে বাটন না চলা।
4. **Authentication:** Auth লজিক রিজলভারের ভেতর না রেখে Context-এ টোকেন ভেরিফাই করা এবং বিজনেস লজিক লেয়ারে চেক করা।

---

# Module 7: Complete Apollo Server & DataLoader Code Scenario

```javascript
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const DataLoader = require('dataloader');

// 1. Schema (SDL)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Query {
    posts: [Post!]!
  }
`;

// Dummy DB Batch Function
const batchUsers = async (keys) => {
  console.log('--- Batch DB Query Executed Once for IDs:', keys);
  const dbUsers = [
    { id: '1', name: 'Tushar' },
    { id: '2', name: 'Karim' }
  ];
  return keys.map(k => dbUsers.find(u => u.id === k));
};

// 2. Resolvers
const resolvers = {
  Query: {
    posts: () => [
      { id: '101', title: 'GraphQL Mastery', authorId: '1' },
      { id: '102', title: 'React Guide', authorId: '2' },
      { id: '103', title: 'Node.js Performance', authorId: '1' }
    ]
  },
  Post: {
    author: (parent, args, context) => {
      // N+1 সমাধান: DataLoader ব্যবহার করা
      return context.userLoader.load(parent.authorId);
    }
  }
};

// 3. Server Initialization
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      // প্রতি রিকোয়েস্টে নতুন DataLoader ইনস্ট্যান্স
      userLoader: new DataLoader(batchUsers)
    }),
    listen: { port: 4000 }
  });

  console.log(`🚀 GraphQL Server running at ${url}`);
}

startServer();
```

---

# Module 8: Complete Level-by-Level Question Vault

### 🟢 Junior Level Questions & Answers

**Q1: REST-এর Over-fetching এবং Under-fetching বলতে কী বোঝায়?**  
**উত্তর:** Over-fetching মানে এন্ডপয়েন্ট থেকে প্রয়োজনের চেয়ে বেশি ডাটা আসা। Under-fetching মানে ১টি পেজের ডাটা দেখাতে একাধিক API এন্ডপয়েন্টে বারবার কল দেওয়া। GraphQL এই দুটি সমস্যারই সমাধান করে।

**Q2: GraphQL-এ `Query` এবং `Mutation`-এর মৌলিক পার্থক্য কী?**  
**উত্তর:** `Query` দিয়ে ডাটা রিড/ফেচ করা হয়। `Mutation` দিয়ে সার্ভারে ডাটা রাইট, আপডেট বা ডিলেট করা হয়।

---

### 🟡 Mid Level Questions & Answers

**Q1: GraphQL Resolver-এর `context` প্যারামিটারের কাজ কী?**  
**উত্তর:** `context` হলো একটি গ্লোবাল অবজেক্ট যা রিকোয়েস্ট লাইফসাইকেলে সমস্ত রিজলভারের সাথে শেয়ার হয়। এতে Auth User, Database connections এবং DataLoaders রাখা হয়।

**Q2: Interface এবং Union Type-এর পার্থক্য কী?**  
**উত্তর:** Interface-এ সাব-টাইপগুলোর কিছু নির্দিষ্ট কমন ফিল্ড থাকতে হয়। Union-এ বিভিন্ন টাইপের কোনো কমন ফিল্ড থাকা আবশ্যক নয়, এটি ভিন্ন ভিন্ন টাইপের সমাহার।

---

### 🔴 Senior Level Questions & Answers

**Q1: GraphQL-এর N+1 Problem কী এবং এটি কীভাবে সমাধান করা হয়?**  
**উত্তর:** নেস্টেড কুয়েরিতে প্যারেন্ট তালিকার প্রতিটি আইটেমের জন্য আলাদা চাইল্ড রিজলভার ডাটাবেস কুয়েরি চালালে N+1 প্রবলেম ঘটে। সমাধান: **DataLoader** দিয়ে `IN` অপারেটরের মাধ্যমে Batching ও Caching করা।

**Q2: Apollo Federation কী এবং কেন ব্যবহার করা হয়?**  
**উত্তর:** এটি একটি মাইক্রোসার্ভিস আর্কিটেকচার যা বিভিন্ন সার্ভিস (Subgraphs)-এর আলাদা GraphQL Schema-কে একটিমাত্র Gateway (Supergraph)-এ সিঙ্ক করে এন্টারপ্রাইজ স্কেলে কাজ করার সুবিধা দেয়।

---

> **🎉 অভিনন্দন!** আপনি GraphQL-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন। নিয়মিত প্র্যাকটিস করুন!
