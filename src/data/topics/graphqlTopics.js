import { createTopicSchema } from './createTopicSchema.js';

export const graphqlTopics = {
  // 1. CORE CONCEPTS
  "graphql-basics": createTopicSchema({
    id: "graphql-basics",
    techId: "graphql",
    title: "GraphQL Core Concepts & REST Comparison",
    category: "GraphQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["API Fundamentals"],
    definition: "GraphQL is a query language for APIs and a runtime for fulfilling queries with existing data, offering a single POST endpoint (/graphql) where clients request exact fields.",
    simpleExplanation: "GraphQL solves REST over-fetching and under-fetching by allowing frontend clients to request only the exact JSON fields they need.",
    whyDoesItExist: "Eliminates multiple REST HTTP roundtrips and avoids returning heavy unused JSON attributes.",
    basicExample: `# Single GraphQL Query requesting targeted fields
query GetUserProfile {
  user(id: "100") {
    id
    name
    email
  }
}`,
    howItWorks: [
      "1. Client posts GraphQL query string to single /graphql HTTP endpoint.",
      "2. GraphQL engine parses query AST (Abstract Syntax Tree) against Schema Definition.",
      "3. Resolvers fetch target fields in parallel returning exact matching JSON object structure."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Single /graphql Endpoint -&gt; AST Parser -&gt; Parallel Resolvers -&gt; Exact JSON</text></svg>`,
    realWorldExample: `// Apollo Server Node.js Setup:
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`type Query { hello: String }\`;
const resolvers = { Query: { hello: () => 'Hello GraphQL' } };

const server = new ApolloServer({ typeDefs, resolvers });
await startStandaloneServer(server, { listen: { port: 4000 } });`,
    commonUseCases: [
      "Building flexible mobile client APIs that require minimal payload size",
      "Aggregating data from multiple microservices into a single GraphQL gateway",
      "Eliminating REST endpoint sprawl"
    ],
    commonMistakes: [
      "Using GET requests with giant query strings instead of sending POST requests to /graphql",
      "Expecting REST-style HTTP status codes per sub-field (GraphQL returns 200 OK with an errors array inside JSON!)"
    ],
    bestPractices: [
      "Send all GraphQL queries via POST to /graphql",
      "Inspect the 'errors' JSON array in responses for query errors"
    ],
    whenToUse: ["When building multi-platform APIs requiring flexible, lightweight client payloads"],
    whenNotToUse: ["When simple static file downloads or binary streaming is required"],
    relatedConcepts: ["Over-fetching", "Under-fetching", "Schema", "Single Endpoint"],
    comparison: {
      title: "REST vs GraphQL",
      headers: ["Metric", "REST API", "GraphQL API"],
      rows: [
        ["Endpoints", "Multiple URIs (/users, /orders)", "Single Endpoint (/graphql)"],
        ["Data Fetching", "Fixed server-defined JSON fields", "Client specifies exact required JSON fields"],
        ["Network Calls", "Can require multiple waterfall HTTP calls", "Fetches nested relational data in 1 request"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What problems does GraphQL solve compared to traditional REST APIs?", answer: "GraphQL solves Over-fetching (downloading unused data attributes) and Under-fetching (requiring multiple waterfall REST requests to assemble related data) by allowing clients to query exact fields in a single HTTP request." }
    ],
    practiceProblem: {
      description: "Write basic GraphQL query requesting user name.",
      starterCode: `query { user { name } }`,
      testAssertion: "true",
      solution: `query { user { name } }`
    },
    quickRevision: "★ GraphQL uses a single /graphql POST endpoint.\n★ Prevents over-fetching and under-fetching.\n★ Client defines exact requested JSON structure."
  }),

  // 2. SCHEMA DEFINITION LANGUAGE (SDL)
  "graphql-schema": createTopicSchema({
    id: "graphql-schema",
    techId: "graphql",
    title: "GraphQL Schema Definition Language (SDL) & Scalar Types",
    category: "GraphQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["graphql-basics"],
    definition: "Schema Definition Language (SDL) defines the strongly-typed GraphQL contract: Object Types, Scalar Types (Int, Float, String, Boolean, ID), Non-Null modifiers (!), and List modifiers ([]).",
    simpleExplanation: "SDL is the type definition blueprint for your GraphQL server, specifying what queries, mutations, and data fields exist.",
    whyDoesItExist: "Enforces strong type safety and contract validation between frontend and backend.",
    basicExample: `# GraphQL SDL Definition
type User {
  id: ID!               # Non-null ID
  name: String!         # Non-null String
  age: Int
  email: String!
  friends: [User!]!    # Non-null array of non-null Users
}

type Query {
  user(id: ID!): User
  users: [User!]!
}`,
    howItWorks: [
      "1. SDL parsed into GraphQL Schema Object model on server start.",
      "2. Non-null modifier (!) throws runtime schema error if resolver returns null.",
      "3. Auto-generates interactive GraphiQL / Apollo Sandbox documentation."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">SDL Types (Int, String, ID!) -&gt; Type Validation -&gt; GraphiQL Sandbox</text></svg>`,
    realWorldExample: `// Custom Scalar Type definition in SDL:
scalar DateTime

type Post {
  id: ID!
  title: String!
  createdAt: DateTime!
}`,
    commonUseCases: [
      "Defining strongly-typed GraphQL API contracts",
      "Using non-null modifiers (!) for mandatory database fields",
      "Creating custom scalar types (e.g., DateTime, JSON)"
    ],
    commonMistakes: [
      "Confusing [User!]! (non-null array containing non-null users) with [User] (array can be null or contain null elements)",
      "Forgetting to mark primary identifiers as ID!"
    ],
    bestPractices: [
      "Use ID! for entity primary key identifiers",
      "Use custom scalars for dates, emails, and currency values"
    ],
    whenToUse: ["In all GraphQL schema design"],
    whenNotToUse: ["Do not leave mandatory database columns as nullable in SDL"],
    relatedConcepts: ["SDL", "Scalars", "Non-Null (!)", "List Modifier ([])"],
    comparison: {
      title: "GraphQL SDL Array Modifiers",
      headers: ["SDL Syntax", "Array Can Be Null?", "Elements Can Be Null?"],
      rows: [
        ["[User]", "YES", "YES"],
        ["[User!]", "YES", "NO"],
        ["[User!]!", "NO (Must return empty array [])", "NO"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What does the exclamation mark (!) mean in GraphQL SDL?", answer: "The exclamation mark (!) is the Non-Null modifier. It guarantees that the field or argument can never return a null value; if a resolver returns null, GraphQL raises a runtime execution error." }
    ],
    practiceProblem: {
      description: "Write SDL field definition for non-null String name.",
      starterCode: `name: String!`,
      testAssertion: "true",
      solution: `name: String!`
    },
    quickRevision: "★ Built-in Scalars: Int, Float, String, Boolean, ID.\n★ Exclamation mark (!) denotes a Non-Null field.\n★ [User!]! means a non-null list of non-null User objects."
  }),

  // 3. QUERIES & ARGUMENTS
  "graphql-queries": createTopicSchema({
    id: "graphql-queries",
    techId: "graphql",
    title: "GraphQL Queries, Arguments, Aliases & Fragments",
    category: "GraphQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["graphql-schema"],
    definition: "GraphQL Queries fetch data using Arguments, Aliases (renaming output fields), Fragments (reusable field sets), and Query Variables.",
    simpleExplanation: "Fragments let you reuse field selections across queries, while Aliases let you fetch the same field twice with different arguments.",
    whyDoesItExist: "Prevents field selection duplication and enables complex multi-argument data fetching.",
    basicExample: `# GraphQL Query using Fragments & Aliases
fragment UserFields on User {
  id
  name
  email
}

query GetUsers($adminRole: String!) {
  admins: users(role: $adminRole) {
    ...UserFields
  }
  guests: users(role: "guest") {
    ...UserFields
  }
}`,
    howItWorks: [
      "1. Query Variables pass dynamic inputs separately from query text.",
      "2. Aliases (admins:, guests:) prevent key collisions in JSON output.",
      "3. Fragments expand field selections inline during query AST execution."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Query Variables + Aliases + Fragments (...UserFields) -&gt; Merged AST Execution</text></svg>`,
    realWorldExample: `// Query Variables JSON payload:
{
  "query": "query ($id: ID!) { user(id: $id) { name } }",
  "variables": { "id": "100" }
}`,
    commonUseCases: [
      "Reusing UI component field requirements with Fragments",
      "Fetching multiple variants of a resource using Aliases",
      "Passing dynamic variables safely with Query Variables"
    ],
    commonMistakes: [
      "Hardcoding string values inside query strings instead of using Query Variables",
      "Creating cyclic fragment spreads causing infinite query parsing"
    ],
    bestPractices: [
      "Always use Query Variables for dynamic user inputs",
      "Co-locate Fragments with UI components in frontend code"
    ],
    whenToUse: ["In all frontend GraphQL query executions"],
    whenNotToUse: ["Do not hardcode dynamic IDs directly into query strings"],
    relatedConcepts: ["Fragments", "Aliases", "Query Variables", "AST"],
    comparison: {
      title: "Hardcoded Query vs Variable Query",
      headers: ["Approach", "Caching", "Security"],
      rows: [
        ["Hardcoded String", "Poor (Query string changes on every ID)", "Risk of query injection"],
        ["Query Variables", "High (Query template stays constant)", "Safe (Variable types validated)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What are Aliases in GraphQL queries and when are they required?", answer: "Aliases allow you to rename the result of a field to a custom name in the JSON output. They are required when querying the exact same field multiple times with different arguments in a single request to avoid key collisions." }
    ],
    practiceProblem: {
      description: "Write fragment spread syntax for UserDetails.",
      starterCode: `...UserDetails`,
      testAssertion: "true",
      solution: `...UserDetails`
    },
    quickRevision: "★ Fragments (...FragmentName) reuse field selections.\n★ Aliases (customName: field) prevent JSON key collisions.\n★ Always use Query Variables ($id: ID!) for dynamic inputs."
  }),

  // 4. MUTATIONS & INPUT TYPES
  "graphql-mutations": createTopicSchema({
    id: "graphql-mutations",
    techId: "graphql",
    title: "GraphQL Mutations & Input Object Types",
    category: "GraphQL Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["graphql-queries"],
    definition: "Mutations perform server-side data writes, creates, updates, and deletes, utilizing Input Object Types (input CreateUserInput) for structured arguments.",
    simpleExplanation: "Mutations are the GraphQL equivalent of POST, PUT, and DELETE, allowing you to modify backend data and return updated fields in 1 request.",
    whyDoesItExist: "Provides atomic data mutations that instantly return updated resource selections.",
    basicExample: `# SDL Mutation & Input Type Definition
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}

# Executing Mutation Query
mutation AddUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    createdAt
  }
}`,
    howItWorks: [
      "1. Mutation execution runs mutation resolvers SEQUENTIALLY (unlike parallel query resolvers).",
      "2. Input Object Type validates argument object schema.",
      "3. Returns updated object payload matching requested field selection."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Mutation (Sequential Execution) -&gt; Input Object Validation -&gt; Updated Return Payload</text></svg>`,
    realWorldExample: `// Apollo Server Mutation Resolver:
const resolvers = {
  Mutation: {
    createUser: async (_, { input }, context) => {
      return await User.create(input);
    }
  }
};`,
    commonUseCases: [
      "Creating new user accounts and e-commerce orders",
      "Updating application settings using Input Object Types",
      "Returning updated object state immediately to update frontend UI cache"
    ],
    commonMistakes: [
      "Using standard output Types inside input arguments (GraphQL strictly requires 'input' keywords for input objects!)",
      "Assuming mutation fields resolve in parallel (Mutations run top-to-bottom sequentially!)"
    ],
    bestPractices: [
      "Wrap mutation arguments inside a single 'input' Input Object Type",
      "Return the updated created/modified entity from the mutation"
    ],
    whenToUse: ["In all data write and mutation operations in GraphQL"],
    whenNotToUse: ["Do not perform side-effects inside standard Query resolvers"],
    relatedConcepts: ["Mutation", "Input Object Type", "Sequential Execution"],
    comparison: {
      title: "Query Execution vs Mutation Execution",
      headers: ["Type", "Execution Order", "Purpose"],
      rows: [
        ["Query", "PARALLEL execution", "Read-only data retrieval"],
        ["Mutation", "SEQUENTIAL (Serial) execution", "Data write & mutation side-effects"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How does execution order differ between Query resolvers and Mutation resolvers in GraphQL?", answer: "Query field resolvers execute in PARALLEL to optimize read performance. Mutation field resolvers execute top-to-bottom SEQUENTIALLY (serially) to prevent race conditions during data modifications." }
    ],
    practiceProblem: {
      description: "Write SDL keyword for defining input types.",
      starterCode: `input UserInput { name: String! }`,
      testAssertion: "true",
      solution: `input UserInput { name: String! }`
    },
    quickRevision: "★ Mutations execute top-to-bottom SEQUENTIALLY.\n★ Use 'input' keyword for argument objects.\n★ Return the updated object so client caches update."
  }),

  // 5. RESOLVERS & CONTEXT
  "graphql-resolvers": createTopicSchema({
    id: "graphql-resolvers",
    techId: "graphql",
    title: "Resolvers Signature, Context Injection & Parent Chain",
    category: "GraphQL Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["graphql-mutations"],
    definition: "Resolvers are functions that fetch data for a specific field. Resolver signatures accept 4 parameters: (parent, args, context, info), with Context injecting shared database models and auth user sessions.",
    simpleExplanation: "Resolvers are backend handlers that fetch the actual data for each field in your GraphQL query tree.",
    whyDoesItExist: "Maps schema fields to backend database queries and external APIs.",
    basicExample: `// Standard Resolver Signature: (parent, args, context, info)
const resolvers = {
  Query: {
    user: async (parent, { id }, context, info) => {
      // Access authenticated user and DB from context!
      if (!context.currentUser) throw new Error("Unauthenticated");
      return await context.db.users.findById(id);
    }
  },
  User: {
    // Nested Field Resolver (parent = User object resolved above)
    orders: async (parent, args, context) => {
      return await context.db.orders.find({ userId: parent.id });
    }
  }
};`,
    howItWorks: [
      "1. Request arrives -> Context function instantiates auth session and DB connections.",
      "2. Root Query resolver executes returning parent object.",
      "3. Child field resolvers execute receiving parent object as 1st argument."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Context Creation -&gt; Root Resolver (Query) -&gt; Child Resolver (parent.id)</text></svg>`,
    realWorldExample: `// Apollo Server Context creation:
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const currentUser = await verifyToken(token);
    return { currentUser, db };
  }
});`,
    commonUseCases: [
      "Injecting database drivers and auth sessions into Context",
      "Writing nested field resolvers to fetch related models",
      "Enforcing field-level authentication inside resolvers"
    ],
    commonMistakes: [
      "Performing database queries inside root context creation (context runs on EVERY request; keep it fast!)",
      "Forgetting that 1st argument is the parent object"
    ],
    bestPractices: [
      "Inject shared resources (DB connections, DataLoader, Auth user) into Context",
      "Keep field resolvers small and modular"
    ],
    whenToUse: ["In all GraphQL server resolver implementations"],
    whenNotToUse: ["Do not put heavy slow database setup inside the context generator"],
    relatedConcepts: ["Resolver Signature", "Context Injection", "Parent Parameter", "Nested Resolvers"],
    comparison: {
      title: "Resolver 4 Parameters Breakdown",
      headers: ["Parameter", "Meaning"],
      rows: [
        ["parent", "Result of the previous parent field resolver"],
        ["args", "Arguments passed to the field in the GraphQL query"],
        ["context", "Shared object across all resolvers for the request (Auth, DB, DataLoader)"],
        ["info", "Execution state AST query tree details"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What are the 4 arguments passed to a GraphQL resolver function?", answer: "The 4 arguments are: 1) parent (return value of parent resolver), 2) args (query arguments), 3) context (shared per-request object containing DB/auth), and 4) info (query AST execution state)." }
    ],
    practiceProblem: {
      description: "Write resolver signature parameters list.",
      starterCode: `(parent, args, context, info) => {}`,
      testAssertion: "true",
      solution: `(parent, args, context, info) => {}`
    },
    quickRevision: "★ 4 Resolver Args: (parent, args, context, info).\n★ Context holds shared DB connections & auth sessions per request.\n★ Parent contains return value from the parent resolver node."
  }),

  // 6. DATALOADER & N+1 PROBLEM
  "graphql-dataloader": createTopicSchema({
    id: "graphql-dataloader",
    techId: "graphql",
    title: "DataLoader & The GraphQL N+1 Query Problem",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["graphql-resolvers"],
    definition: "DataLoader is a utility library that solves the GraphQL N+1 query problem by Batching and Caching individual field resolver database requests into a single batch SQL IN (...) query.",
    simpleExplanation: "DataLoader collects 100 individual user ID queries during a single tick of the event loop and combines them into 1 single SQL IN query.",
    whyDoesItExist: "Prevents GraphQL nested field resolvers from flooding the database with hundreds of redundant queries.",
    basicExample: `import DataLoader from 'dataloader';

// Create Batch Loading Function
const userLoader = new DataLoader(async (userIds) => {
  // Executes 1 SQL query for ALL collected user IDs!
  const users = await db.users.find({ id: { $in: userIds } });
  
  // MUST return array matching exact order of userIds!
  return userIds.map(id => users.find(u => u.id === id));
});

// Inside Resolver:
const resolvers = {
  Post: {
    author: (post, _, context) => context.userLoader.load(post.authorId)
  }
};`,
    howItWorks: [
      "1. userLoader.load(id) queues individual ID requests during event loop tick.",
      "2. Next tick -> DataLoader batches all queued IDs into batch function call.",
      "3. Executes single WHERE id IN (...) DB query and caches results in RAM per request."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">100 load(id) Calls -&gt; Event Loop Tick -&gt; 1 Batch SQL WHERE id IN (...)</text></svg>`,
    realWorldExample: `// Instantiate NEW DataLoader instance per HTTP request in Context:
context: () => ({
  userLoader: new DataLoader(batchBatchUsers)
})`,
    commonUseCases: [
      "Eliminating N+1 database query bugs in nested GraphQL resolvers",
      "Batching author lookups for lists of blog posts",
      "Per-request memoization caching"
    ],
    commonMistakes: [
      "Reusing a single global DataLoader instance across multiple HTTP requests (causes cross-user data caching leaks! Create a fresh DataLoader per request context!)",
      "Returning batch results out of order (DataLoader requires batch results array order to match requested keys order exactly!)"
    ],
    bestPractices: [
      "Instantiate fresh DataLoader instances inside request Context on every request",
      "Ensure batch loader function returns results matching key order"
    ],
    whenToUse: ["In all GraphQL servers with nested relational field resolvers"],
    whenNotToUse: ["Do not share DataLoader instances globally across requests"],
    relatedConcepts: ["DataLoader", "N+1 Problem", "Batching", "Event Loop Tick"],
    comparison: {
      title: "Without DataLoader vs With DataLoader",
      headers: ["Metric", "Without DataLoader", "With DataLoader"],
      rows: [
        ["DB Queries Executed", "1 + N queries (e.g. 101 DB queries for 100 posts)", "2 queries total (1 query for posts + 1 batch query for authors)"],
        ["Performance", "Slow (Database latency bottleneck)", "Ultra Fast"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why must a new DataLoader instance be created per HTTP request instead of globally?", answer: "Creating a new DataLoader instance per request prevents cross-request data caching leaks between different users, ensuring user A's private data is never returned from cache to user B." }
    ],
    practiceProblem: {
      description: "Write DataLoader load call line.",
      starterCode: `context.userLoader.load(post.authorId);`,
      testAssertion: "true",
      solution: `context.userLoader.load(post.authorId);`
    },
    quickRevision: "★ DataLoader solves GraphQL N+1 problem via Batching & Caching.\n★ Instantiates 1 batch SQL WHERE id IN (...) query.\n★ Create a NEW DataLoader instance per HTTP request in Context."
  }),

  // 7. SUBSCRIPTIONS
  "graphql-subscriptions": createTopicSchema({
    id: "graphql-subscriptions",
    techId: "graphql",
    title: "GraphQL Subscriptions & Real-Time WebSockets",
    category: "GraphQL Core",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["graphql-dataloader"],
    definition: "GraphQL Subscriptions stream real-time data pushes from server to client over persistent WebSockets using PubSub event triggers.",
    simpleExplanation: "Subscriptions keep a WebSocket connection open so the server can push live updates (e.g. new chat messages) to the frontend instantly.",
    whyDoesItExist: "Provides real-time bi-directional messaging in GraphQL applications.",
    basicExample: `# SDL Subscription Definition
type Subscription {
  messageAdded(roomId: ID!): Message!
}

# Server PubSub Execution
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

// Publish Event:
pubsub.publish('MESSAGE_ADDED', { messageAdded: newMsg });

// Subscription Resolver:
const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
    }
  }
};`,
    howItWorks: [
      "1. Client establishes WebSocket connection (graphql-ws protocol).",
      "2. Subscription resolver returns AsyncIterator subscribed to PubSub channel.",
      "3. pubsub.publish() pushes payload down active WebSocket connection."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Client -- [WebSocket Connection] -- PubSub Event --&gt; AsyncIterator Push</text></svg>`,
    realWorldExample: `// Frontend Apollo Client Subscription:
useSubscription(MESSAGE_ADDED_SUBSCRIPTION, { variables: { roomId: '1' } });`,
    commonUseCases: [
      "Building real-time chat applications",
      "Streaming live sports scores and stock tickers",
      "Real-time notifications"
    ],
    commonMistakes: [
      "Using in-memory PubSub across multiple load-balanced servers (use Redis PubSub for multi-server clusters)",
      "Attempting to run Subscriptions over standard HTTP POST endpoints (requires WebSockets!)"
    ],
    bestPractices: [
      "Use Redis PubSub engine (graphql-redis-subscriptions) in production clusters",
      "Use graphql-ws protocol library"
    ],
    whenToUse: ["When real-time low-latency server-to-client data streaming is required"],
    whenNotToUse: ["Do not use subscriptions for static one-time data reads (use Queries)"],
    relatedConcepts: ["Subscription", "WebSocket", "PubSub", "AsyncIterator"],
    comparison: {
      title: "Query vs Mutation vs Subscription",
      headers: ["Operation", "Transport Protocol", "Communication Pattern"],
      rows: [
        ["Query", "HTTP POST", "Request / Response (Read)"],
        ["Mutation", "HTTP POST", "Request / Response (Write)"],
        ["Subscription", "WebSocket (WS / WSS)", "Persistent Real-Time Push Stream"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What transport protocol do GraphQL Subscriptions use?", answer: "GraphQL Subscriptions use persistent WebSockets (WS / WSS) rather than standard HTTP POST requests to stream real-time data pushes from server to client." }
    ],
    practiceProblem: {
      description: "Write SDL keyword for defining real-time subscriptions.",
      starterCode: `type Subscription { commentAdded: Comment! }`,
      testAssertion: "true",
      solution: `type Subscription { commentAdded: Comment! }`
    },
    quickRevision: "★ Subscriptions stream real-time data over WebSockets.\n★ Resolver returns AsyncIterator.\n★ Use Redis PubSub in production multi-server clusters."
  }),

  // 8. AUTHENTICATION & FIELD AUTHORIZATION
  "graphql-auth": createTopicSchema({
    id: "graphql-auth",
    techId: "graphql",
    title: "GraphQL Authentication & Field-Level Authorization",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["graphql-subscriptions"],
    definition: "Authentication verifies user identity in Context, while Field-Level Authorization enforces fine-grained permission checks directly inside individual field resolvers or via Schema Directives (@auth).",
    simpleExplanation: "Authentication checks who the user is. Field-level authorization checks if the user has permission to view specific fields (e.g. user.salary).",
    whyDoesItExist: "Prevents unauthorized users from accessing sensitive individual JSON fields.",
    basicExample: `// Field-Level Authorization Resolver Example
const resolvers = {
  User: {
    salary: (parent, args, context) => {
      // 1. Check Authentication
      if (!context.currentUser) throw new Error("Unauthenticated");

      // 2. Check Field Authorization
      if (context.currentUser.id !== parent.id && context.currentUser.role !== 'ADMIN') {
        throw new Error("Unauthorized to view salary field");
      }

      return parent.salary;
    }
  }
};`,
    howItWorks: [
      "1. HTTP Authorization header (JWT) verified in request Context handler.",
      "2. Query executes; individual field resolvers check context.currentUser permissions.",
      "3. If authorized, returns field value; if unauthorized, returns null with field-level error."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">JWT Header -&gt; Context User -&gt; Field Resolver Permission Check -&gt; Return Value / Null Error</text></svg>`,
    realWorldExample: `// Schema Directive @auth(requires: ADMIN):
type User {
  id: ID!
  name: String!
  email: String! @auth(requires: ADMIN)
}`,
    commonUseCases: [
      "Restricting sensitive attributes (ssn, salary, billingAddress) to admin roles",
      "Verifying JWT Bearer tokens in Apollo Server Context",
      "Using Schema Directives (@auth) for declarative permissions"
    ],
    commonMistakes: [
      "Performing authorization checks ONLY at the root Query level (children fields can still be queried if accessible via alternative paths!)",
      "Leaking sensitive data in un-protected field resolvers"
    ],
    bestPractices: [
      "Enforce authorization business logic at the data model / domain layer, not just in resolvers",
      "Use declarative Schema Directives (@auth) for clean field-level authorization"
    ],
    whenToUse: ["In all secure GraphQL production applications"],
    whenNotToUse: ["Do not rely solely on frontend UI hiding of fields"],
    relatedConcepts: ["Field-Level Authorization", "Schema Directives", "@auth", "Context"],
    comparison: {
      title: "Root Query Auth vs Field-Level Authorization",
      headers: ["Approach", "Check Location", "Security Coverage"],
      rows: [
        ["Root Query Auth", "Top-level Query resolver", "Incomplete (Does not protect fields reachable through relationship graphs)"],
        ["Field-Level Auth", "Specific field resolver or Domain Model", "Complete (Protects field regardless of query path entry point)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is Field-Level Authorization crucial in GraphQL compared to REST?", answer: "In GraphQL, relational graphs allow fields to be reached through multiple query entry points (e.g. `user { salary }` vs `company { employees { salary } }`). Authorizing only root queries leaves nested fields exposed; authorization must be enforced at the field or domain model level." }
    ],
    practiceProblem: {
      description: "Write directive annotation @auth for ADMIN role.",
      starterCode: `@auth(requires: ADMIN)`,
      testAssertion: "true",
      solution: `@auth(requires: ADMIN)`
    },
    quickRevision: "★ Verify JWT token in Context handler.\n★ Enforce authorization at field or domain model level.\n★ GraphQL graph relationships require field-level protection."
  }),

  // 9. APOLLO FEDERATION
  "graphql-federation": createTopicSchema({
    id: "graphql-federation",
    techId: "graphql",
    title: "Apollo Federation & Schema Stitching (Microservice Graphs)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["graphql-auth"],
    definition: "Apollo Federation architecture composes multiple independent sub-graph microservices (Users service, Products service, Orders service) into a unified federated Supergraph Gateway.",
    simpleExplanation: "Apollo Federation combines separate GraphQL microservices into a single seamless GraphQL API for frontend clients.",
    whyDoesItExist: "Allows autonomous teams to own independent GraphQL microservices while exposing a single unified graph to clients.",
    basicExample: `# Subgraph 1: Users Service
type User @key(fields: "id") {
  id: ID!
  name: String!
}

# Subgraph 2: Products Service (Extending User type!)
type User @key(fields: "id") {
  id: ID! @external
  reviews: [Review!]!
}`,
    howItWorks: [
      "1. Subgraphs declare entities using @key(fields: \"id\") directive.",
      "2. Gateway (Rover / Apollo Router) composes subgraphs into unified Supergraph schema.",
      "3. Gateway splits client queries and fetches data across subgraphs in parallel using _entities resolvers."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Supergraph Gateway -&gt; Subgraph Users | Subgraph Products | Subgraph Orders</text></svg>`,
    realWorldExample: `// Apollo Router Rust binary execution:
// ./router --config config.yaml --supergraph supergraph.graphql`,
    commonUseCases: [
      "Building enterprise microservice architectures with GraphQL",
      "Enabling autonomous team ownership of GraphQL subgraphs",
      "Extending entity types across multiple backend microservices (@key)"
    ],
    commonMistakes: [
      "Attempting Schema Stitching for modern microservices (Apollo Federation has superseded legacy Schema Stitching)",
      "Creating circular entity dependencies between subgraphs"
    ],
    bestPractices: [
      "Use Apollo Router (Rust-based high performance gateway) for Supergraph routing",
      "Use @key directives to define clear entity boundaries"
    ],
    whenToUse: ["In enterprise multi-team microservice GraphQL architectures"],
    whenNotToUse: ["Do not use Apollo Federation for simple single-server applications"],
    relatedConcepts: ["Apollo Federation", "Supergraph", "Subgraphs", "@key Directive", "Apollo Router"],
    comparison: {
      title: "Schema Stitching vs Apollo Federation",
      headers: ["Architecture", "Schema Ownership", "Performance"],
      rows: [
        ["Schema Stitching (Legacy)", "Gateway stitching code handles merging", "Imperative / Maintenance heavy"],
        ["Apollo Federation (Modern)", "Declarative subgraphs using @key directives", "Declarative / Apollo Router Rust speed"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Apollo Federation and how does the @key directive work?", answer: "Apollo Federation composes multiple GraphQL microservice subgraphs into a unified Supergraph. The `@key(fields: \"id\")` directive designates an entity (e.g. User) that can be referenced and extended by other subgraphs." }
    ],
    practiceProblem: {
      description: "Write SDL entity key directive for id.",
      starterCode: `@key(fields: "id")`,
      testAssertion: "true",
      solution: `@key(fields: "id")`
    },
    quickRevision: "★ Apollo Federation composes subgraphs into a unified Supergraph.\n★ @key(fields: \"id\") designates entity primary keys.\n★ Use Apollo Router (Rust) for high-performance query routing."
  }),

  // 10. PERFORMANCE & QUERY COST ANALYSIS
  "graphql-performance": createTopicSchema({
    id: "graphql-performance",
    techId: "graphql",
    title: "GraphQL Security, Query Complexity & Depth Limiting",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["graphql-federation"],
    definition: "GraphQL Performance and Security hardening protects servers against malicious nested queries using Query Depth Limiting, Query Complexity Analysis, and Persisted Queries (APQ).",
    simpleExplanation: "Query depth limits stop malicious users from running 100-level nested queries (e.g. user -> friends -> friends -> friends...) that crash your database.",
    whyDoesItExist: "Prevents Denial of Service (DoS) attacks caused by recursive or deeply nested GraphQL queries.",
    basicExample: `# Malicious Deeply Nested Query (Prevents server crash using Depth Limiting!):
query MaliciousQuery {
  user {
    friends {
      friends {
        friends {
          friends {
            name # Depth 5! Rejects query if maxDepth = 4!
          }
        }
      }
    }
  }
}`,
    howItWorks: [
      "1. Validation plugin inspects incoming query AST before execution.",
      "2. Calculates query depth and assigns complexity points per field.",
      "3. If query depth > 5 or complexity points > 1000, rejects request with 400 Bad Request."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Query AST Validation -&gt; Depth &gt; 5? -&gt; REJECT (400 Bad Request)</text></svg>`,
    realWorldExample: `// Automatic Persisted Queries (APQ) setup:
// Client sends 64-char SHA256 hash of query instead of full query string!`,
    commonUseCases: [
      "Protecting public GraphQL APIs against DoS attacks using Depth Limiting",
      "Using Automatic Persisted Queries (APQ) to reduce network payload size",
      "Disabling Introspection in production environments"
    ],
    commonMistakes: [
      "Leaving Schema Introspection enabled in public production APIs (exposes entire schema structure to attackers!)",
      "Not setting query depth limits"
    ],
    bestPractices: [
      "Disable GraphQL Schema Introspection in production",
      "Enforce maximum Query Depth (e.g. maxDepth: 5) and Complexity scoring"
    ],
    whenToUse: ["In all public production GraphQL API servers"],
    whenNotToUse: ["Do not disable introspection in local development"],
    relatedConcepts: ["Query Depth Limiting", "Complexity Analysis", "Persisted Queries (APQ)", "Disable Introspection"],
    comparison: {
      title: "Security Hardening Controls",
      headers: ["Security Control", "Target Attack", "Action"],
      rows: [
        ["Query Depth Limiting", "Recursive nested queries", "Rejects queries deeper than N levels"],
        ["Complexity Analysis", "Resource-heavy field combinations", "Assigns point costs per field; rejects if total > MAX"],
        ["Disable Introspection", "Schema reverse-engineering", "Blocks __schema queries in production"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is Query Depth Limiting critical for public GraphQL APIs?", answer: "GraphQL allows clients to request nested relations. Without Query Depth Limiting, a malicious actor can craft a deeply nested recursive query (100 levels deep) that forces the database to execute millions of joins, crashing the server." }
    ],
    practiceProblem: {
      description: "Write introspection field name used for schema queries.",
      starterCode: `__schema`,
      testAssertion: "true",
      solution: `__schema`
    },
    quickRevision: "★ Enforce Query Depth Limiting (e.g. maxDepth: 5).\n★ Assign complexity points per field.\n★ Disable Introspection (__schema) in production."
  })
};
