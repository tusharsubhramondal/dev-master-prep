import { createTopicSchema } from './createTopicSchema.js';

export const restTopics = {
  // 1. REST PRINCIPLES & HTTP PROTOCOL
  "rest-principles": createTopicSchema({
    id: "rest-principles",
    techId: "rest-api",
    title: "REST Architecture Principles & The HTTP Protocol",
    category: "REST Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["HTTP Protocol Basics"],
    definition: "REST (Representational State Transfer) is an architectural style for designing networked APIs based on 6 core constraints: Client-Server, Statelessness, Cacheability, Uniform Interface, Layered System, and Code-on-Demand.",
    simpleExplanation: "REST APIs allow applications to communicate over HTTP using standard web conventions (URLs for resources, JSON payloads for data).",
    whyDoesItExist: "Provides a standardized, scalable, and stateless API communication protocol across web, mobile, and desktop clients.",
    basicExample: `// HTTP Request / Response Example
// Request:
GET /api/v1/users/100 HTTP/1.1
Host: api.example.com
Accept: application/json

// Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 100,
  "name": "Alice",
  "email": "alice@example.com"
}`,
    howItWorks: [
      "1. Client sends HTTP request containing method, URL path, headers, and body.",
      "2. Server processes request statelessly without relying on server-side session memory.",
      "3. Returns HTTP status code and representation payload (usually JSON)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Client (Mobile/Web) -- [Stateless HTTP Request] --&gt; REST API -&gt; JSON Response</text></svg>`,
    realWorldExample: `// Express.js Node.js REST Handler:
app.get('/api/v1/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});`,
    commonUseCases: [
      "Building backend APIs for mobile applications and single-page applications (React, Vue)",
      "Integrating third-party web services (Stripe, Twilio)",
      "Designing microservice communication"
    ],
    commonMistakes: [
      "Storing client session state in server memory (violates REST Statelessness constraint!)",
      "Using verbs in URL endpoints (e.g. GET /getUserList instead of RESTful GET /users)"
    ],
    bestPractices: [
      "Ensure API endpoints are strictly stateless (each request contains all credentials needed)",
      "Use nouns for URIs (/users) and HTTP verbs (GET, POST) for actions"
    ],
    whenToUse: ["In all standard web and mobile API backends"],
    whenNotToUse: ["When ultra-high throughput real-time streaming is required (use WebSockets or gRPC)"],
    relatedConcepts: ["Statelessness", "Client-Server", "Uniform Interface", "JSON Payload"],
    comparison: {
      title: "REST vs RPC vs GraphQL",
      headers: ["API Style", "Data Structure", "Flexibility"],
      rows: [
        ["REST", "Resource URIs (/users/123)", "Standardized HTTP conventions & caching"],
        ["GraphQL", "Single endpoint (/graphql) with custom query payload", "Prevents over-fetching; client specifies fields"],
        ["gRPC", "Protocol Buffers over HTTP/2", "Ultra high performance microservice RPC"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What does Statelessness mean in REST API architecture?", answer: "Statelessness means every HTTP request from client to server must contain all the information necessary to understand and process the request. The server stores no client session context between requests." }
    ],
    practiceProblem: {
      description: "Write HTTP GET request line for /api/v1/products.",
      starterCode: `GET /api/v1/products HTTP/1.1`,
      testAssertion: "true",
      solution: `GET /api/v1/products HTTP/1.1`
    },
    quickRevision: "★ REST is based on 6 core constraints (Statelessness, Client-Server, etc.).\n★ Use nouns for URIs (/users) and HTTP verbs for actions.\n★ Requests must contain all necessary authentication data."
  }),

  // 2. HTTP REQUEST METHODS
  "rest-http-methods": createTopicSchema({
    id: "rest-http-methods",
    techId: "rest-api",
    title: "HTTP Request Methods (GET, POST, PUT, PATCH, DELETE & Idempotency)",
    category: "REST Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["rest-principles"],
    definition: "HTTP Request Methods define the target operation on a resource. Methods are categorized by Safety (does not modify data) and Idempotency (multiple identical requests produce identical server state).",
    simpleExplanation: "GET reads data, POST creates new data, PUT replaces data completely, PATCH updates fields partially, and DELETE removes data.",
    whyDoesItExist: "Provides semantic CRUD mapping using standardized HTTP protocol verbs.",
    basicExample: `GET    /api/users       // Safe & Idempotent: Fetch users list
POST   /api/users       // Unsafe & Non-Idempotent: Create new user
PUT    /api/users/10    // Idempotent: Replace entire user #10
PATCH  /api/users/10    // Non-Idempotent / Idempotent: Update specific fields of user #10
DELETE /api/users/10    // Idempotent: Delete user #10`,
    howItWorks: [
      "1. GET requests are safe and cacheable; must not mutate backend data state.",
      "2. PUT replaces target resource completely (requires full payload).",
      "3. PATCH applies partial modifications to target resource."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">GET (Read/Safe) | POST (Create) | PUT (Replace) | PATCH (Partial) | DELETE</text></svg>`,
    realWorldExample: `// Express.js Route mapping:
app.get('/api/orders', getOrders);
app.post('/api/orders', createOrder);
app.patch('/api/orders/:id', updateOrderStatus);
app.delete('/api/orders/:id', deleteOrder);`,
    commonUseCases: [
      "Mapping CRUD API operations to proper HTTP methods",
      "Ensuring GET endpoints remain safe for CDN caching",
      "Using PATCH for updating partial resource fields (e.g. status)"
    ],
    commonMistakes: [
      "Using GET requests to perform data mutations (e.g. GET /deleteUser?id=5 breaks web crawlers!)",
      "Confusing PUT (complete resource replacement) with PATCH (partial update)"
    ],
    bestPractices: [
      "Never mutate data inside GET request handlers",
      "Use PUT for complete resource replacements and PATCH for partial updates"
    ],
    whenToUse: ["In all REST API endpoint route design"],
    whenNotToUse: ["Do not use POST for pure read operations"],
    relatedConcepts: ["Idempotency", "Safety", "PUT vs PATCH", "HTTP Verbs"],
    comparison: {
      title: "HTTP Method Attributes Summary",
      headers: ["Method", "CRUD Mapping", "Safe?", "Idempotent?"],
      rows: [
        ["GET", "Read", "YES", "YES"],
        ["POST", "Create", "NO", "NO"],
        ["PUT", "Replace (Full)", "NO", "YES"],
        ["PATCH", "Update (Partial)", "NO", "NO / YES"],
        ["DELETE", "Delete", "NO", "YES"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is Idempotency in HTTP methods and which methods are idempotent?", answer: "An HTTP method is idempotent if executing it multiple times produces the exact same result on the server state as executing it once. GET, PUT, and DELETE are idempotent. POST is NOT idempotent." }
    ],
    practiceProblem: {
      description: "Write HTTP method used for partial resource updates.",
      starterCode: `PATCH`,
      testAssertion: "true",
      solution: `PATCH`
    },
    quickRevision: "★ GET is safe (never mutates data).\n★ Idempotent methods (GET, PUT, DELETE) produce identical results on repeated calls.\n★ PUT replaces full object; PATCH updates partial fields."
  }),

  // 3. HTTP STATUS CODES
  "rest-status-codes": createTopicSchema({
    id: "rest-status-codes",
    techId: "rest-api",
    title: "HTTP Response Status Codes (2xx, 3xx, 4xx, 5xx Conventions)",
    category: "REST Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["rest-http-methods"],
    definition: "HTTP Status Codes are 3-digit numerical responses categorized into 5 classes: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error).",
    simpleExplanation: "Status codes tell the client if the request succeeded (200 OK, 201 Created), failed due to client error (400 Bad Request, 401 Unauthorized, 404 Not Found), or server failure (500 Error).",
    whyDoesItExist: "Provides standardized machine-readable feedback on HTTP request execution status.",
    basicExample: `200 OK              // Request succeeded
201 Created         // Resource successfully created (POST)
204 No Content      // Succeeded with no response payload (DELETE)
400 Bad Request     // Validation failed / invalid JSON payload
401 Unauthorized    // Missing or invalid authentication token
403 Forbidden       // Authenticated but lacks permissions
404 Not Found       // Target resource URI does not exist
429 Too Many Req    // Rate limit exceeded
500 Internal Error  // Server crash / unhandled exception`,
    howItWorks: [
      "1. Server processes incoming request.",
      "2. Sets numerical status code in HTTP response header.",
      "3. Client SDK evaluates status code class (2xx vs 4xx/5xx) to trigger success handlers or throw errors."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Status Classes: 2xx Success | 3xx Redirect | 4xx Client Error | 5xx Server Error</text></svg>`,
    realWorldExample: `// Express.js returning 201 Created on POST:
app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});`,
    commonUseCases: [
      "Returning 201 Created on successful POST creations",
      "Returning 401 Unauthorized when Bearer token is missing",
      "Returning 403 Forbidden when user lacks required role permissions",
      "Returning 422 Unprocessable Entity for form validation failures"
    ],
    commonMistakes: [
      "Returning 200 OK for error responses containing { 'error': 'User not found' } inside JSON (Always return appropriate 4xx/5xx codes!)",
      "Confusing 401 Unauthorized (Unauthenticated: missing login credentials) with 403 Forbidden (Unauthorized: logged in but permission denied)"
    ],
    bestPractices: [
      "Always return proper 4xx status codes for client errors (never return 200 OK with error body)",
      "Return 204 No Content for successful DELETE requests"
    ],
    whenToUse: ["In all HTTP REST API response handling"],
    whenNotToUse: ["Do not invent custom 3-digit HTTP status codes"],
    relatedConcepts: ["201 Created", "401 vs 403", "422 Validation Error", "204 No Content"],
    comparison: {
      title: "401 Unauthorized vs 403 Forbidden",
      headers: ["Status Code", "Meaning", "Authentication Status"],
      rows: [
        ["401 Unauthorized", "Unauthenticated (Missing or invalid credentials)", "Not logged in"],
        ["403 Forbidden", "Unauthorized (User identified but lacks permission)", "Logged in, but access denied"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between 401 Unauthorized and 403 Forbidden in REST APIs?", answer: "401 Unauthorized means the user is unauthenticated (missing or invalid credentials/token). 403 Forbidden means the user is authenticated, but their account does not have permission to access the requested resource." }
    ],
    practiceProblem: {
      description: "Write HTTP status code returned for newly created resource.",
      starterCode: `201`,
      testAssertion: "true",
      solution: `201`
    },
    quickRevision: "★ 201 Created for POST; 204 No Content for DELETE.\n★ 401 = Unauthenticated (Not logged in); 403 = Forbidden (Access denied).\n★ Never return 200 OK for error responses."
  }),

  // 4. RESOURCE NAMING & DESIGN
  "rest-resource-design": createTopicSchema({
    id: "rest-resource-design",
    techId: "rest-api",
    title: "RESTful Resource Naming & Endpoint Design Conventions",
    category: "REST Design",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["rest-status-codes"],
    definition: "RESTful URL design uses plural nouns (/users, /orders), lower-case kebab-case naming, hierarchical parent-child path relationships (/users/12/orders), and query parameters for filtering.",
    simpleExplanation: "Good REST APIs use clean, predictable URLs formatted as plural nouns (e.g. GET /api/v1/customers/5/invoices).",
    whyDoesItExist: "Provides predictable, intuitive API endpoint URIs for client developers.",
    basicExample: `// Good RESTful Endpoint Conventions:
GET    /api/v1/users                  // Fetch list of users
POST   /api/v1/users                  // Create new user
GET    /api/v1/users/42               // Fetch user #42
GET    /api/v1/users/42/orders        // Fetch orders belonging to user #42
POST   /api/v1/users/42/orders        // Create order for user #42

// BAD Endpoint Examples (Avoid!):
GET /api/getUsers                      // Verb in URL
POST /api/createUser/42                // Verb in URL
GET /api/user_list                     // Snake_case / singular noun`,
    howItWorks: [
      "1. Endpoints represent resource collections (/users) or single entities (/users/42).",
      "2. Nested paths express parent-child relationships (/users/42/orders).",
      "3. Query parameters filter, sort, and paginate collections (/users?role=admin&sort=-createdAt)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Plural Noun Collections (/users) -&gt; Nested Hierarchy (/users/42/orders)</text></svg>`,
    realWorldExample: `// Express.js RESTful nested route:
app.get('/api/v1/users/:userId/orders', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});`,
    commonUseCases: [
      "Designing clean RESTful API endpoint structures for enterprise web services",
      "Expressing sub-resource ownership (/authors/5/books)",
      "Using query parameters for filtering and searching"
    ],
    commonMistakes: [
      "Using verbs in URIs (/getAllProducts, /deleteProduct)",
      "Nesting resources more than 2 levels deep (e.g. /authors/1/books/5/chapters/2/comments - keep paths flat!)"
    ],
    bestPractices: [
      "Use plural nouns for collections (/users, /orders)",
      "Keep nesting depth to a maximum of 2 levels (e.g. /users/42/orders)"
    ],
    whenToUse: ["In all REST API URL URI design"],
    whenNotToUse: ["Do not use verbs in resource paths"],
    relatedConcepts: ["Plural Nouns", "Sub-resources", "Kebab-case", "Query Parameters"],
    comparison: {
      title: "Good REST Naming vs Bad Naming",
      headers: ["Action", "Bad Endpoint (Avoid)", "Good RESTful Endpoint"],
      rows: [
        ["Fetch Users", "GET /api/getUsers", "GET /api/v1/users"],
        ["Create Order", "POST /api/createOrder", "POST /api/v1/orders"],
        ["Delete User", "GET /api/deleteUser?id=5", "DELETE /api/v1/users/5"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you use plural nouns instead of verbs in REST API endpoint URIs?", answer: "REST endpoints represent RESOURCES (data entities), while HTTP methods (GET, POST, PUT, DELETE) represent the VERBS (actions). Using verbs in URIs creates redundancy and violates REST uniform interface constraints." }
    ],
    practiceProblem: {
      description: "Write RESTful GET endpoint path for order #10 of user #5.",
      starterCode: `/api/v1/users/5/orders/10`,
      testAssertion: "true",
      solution: `/api/v1/users/5/orders/10`
    },
    quickRevision: "★ Use plural nouns (/users, /orders) for resource endpoints.\n★ HTTP methods supply the actions (GET, POST, DELETE).\n★ Keep nested paths flat (max 2 levels deep)."
  }),

  // 5. REQUEST VALIDATION & ENVELOPES
  "rest-validation": createTopicSchema({
    id: "rest-validation",
    techId: "rest-api",
    title: "Request Validation & Structured JSON Error Envelopes",
    category: "REST Design",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["rest-resource-design"],
    definition: "Request validation verifies incoming JSON payloads against schema rules, returning HTTP 422 / 400 with a consistent, structured JSON Error Envelope.",
    simpleExplanation: "When a user submits invalid form data, the API rejects it immediately with a structured JSON response detailing exact field errors.",
    whyDoesItExist: "Prevents malformed data from corrupting database records and provides clear error feedback to API clients.",
    basicExample: `// Structured JSON Error Envelope (HTTP 422 Unprocessable Entity)
{
  "status": 422,
  "error": "Validation Failed",
  "message": "Invalid payload parameters provided",
  "timestamp": "2026-08-13T10:00:00Z",
  "details": [
    { "field": "email", "message": "Must be a valid email address" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}`,
    howItWorks: [
      "1. Validation middleware (Joi/Zod in Node, FormRequest in Laravel) intercepts incoming body.",
      "2. Validates types, required fields, formats, and constraints.",
      "3. Rejects invalid input immediately with 422 Unprocessable Entity and JSON error envelope."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">HTTP Payload -&gt; Zod / Laravel Validation -&gt; Reject with 422 Error Envelope</text></svg>`,
    realWorldExample: `// Node.js Zod validation example:
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Middleware:
const result = userSchema.safeParse(req.body);
if (!result.success) {
  return res.status(422).json({ error: result.error.format() });
}`,
    commonUseCases: [
      "Validating registration and login request payloads",
      "Returning standardized JSON error envelopes across all API endpoints",
      "Preventing malicious payload injection"
    ],
    commonMistakes: [
      "Returning raw internal database stack traces in production error responses (Security risk!)",
      "Returning inconsistent error structures across different API endpoints"
    ],
    bestPractices: [
      "Use a single, standardized JSON error envelope structure across your entire API",
      "Never leak internal stack traces or database schema details in production error responses"
    ],
    whenToUse: ["In all REST API request handling and error handling middleware"],
    whenNotToUse: ["Do not skip validation on external user inputs"],
    relatedConcepts: ["422 Unprocessable Entity", "JSON Error Envelope", "Zod", "Joi"],
    comparison: {
      title: "Raw Error vs Structured JSON Error Envelope",
      headers: ["Format", "Client Usability", "Security Risk"],
      rows: [
        ["Raw Stack Trace", "Hard to parse programmatically", "High (Exposes file paths & DB schemas)"],
        ["Structured Error Envelope", "Easy for mobile/web apps to display field error messages", "Low (Safe & sanitized)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is a standardized JSON error envelope important in REST APIs?", answer: "A standardized error envelope provides a consistent, predictable JSON structure for all API errors across the application, allowing frontend and mobile clients to parse and display field validation messages uniformly." }
    ],
    practiceProblem: {
      description: "Write HTTP status code returned for validation errors.",
      starterCode: `422`,
      testAssertion: "true",
      solution: `422`
    },
    quickRevision: "★ 422 Unprocessable Entity is returned for validation failures.\n★ Use a consistent JSON error envelope structure across all endpoints.\n★ Never leak internal raw stack traces in production."
  }),

  // 6. AUTHENTICATION & JWT
  "rest-auth": createTopicSchema({
    id: "rest-auth",
    techId: "rest-api",
    title: "API Authentication, JWT (JSON Web Tokens) & CORS Headers",
    category: "REST Security",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["rest-validation"],
    definition: "REST API security uses stateless Bearer Token authentication via JSON Web Tokens (JWT: Header, Payload, Signature), OAuth 2.0 flows, and CORS (Cross-Origin Resource Sharing) headers.",
    simpleExplanation: "JWT tokens allow clients to authenticate statelessly by sending an encrypted Bearer token in the HTTP Authorization header on every request.",
    whyDoesItExist: "Secures API endpoints statelessly across cross-domain web and mobile clients.",
    basicExample: `// 1. Authorization Header:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// 2. JWT Structure (3 parts separated by dots):
// Header.Payload.Signature

// 3. CORS Response Headers:
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE`,
    howItWorks: [
      "1. Client logs in with credentials -> Server signs JWT token using secret key.",
      "2. Client sends token in 'Authorization: Bearer <token>' header on subsequent API calls.",
      "3. Auth Middleware verifies JWT signature statelessly without database lookup."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Login -&gt; Signed JWT Token -&gt; Authorization: Bearer Header -&gt; Verify Signature</text></svg>`,
    realWorldExample: `// Express.js JWT Auth Middleware:
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}`,
    commonUseCases: [
      "Securing REST APIs for mobile applications and single-page apps (SPAs)",
      "Stateless user authentication using JWT Bearer Tokens",
      "Configuring CORS headers for multi-domain frontend requests"
    ],
    commonMistakes: [
      "Storing sensitive passwords or credit card numbers inside unencrypted JWT payload (JWT payload is Base64 decoded and publicly readable!)",
      "Using Access-Control-Allow-Origin: * in production with credentialed requests"
    ],
    bestPractices: [
      "Store short expiry times on JWT access tokens (e.g. 15 mins) combined with Refresh Tokens",
      "Never put sensitive secret data inside JWT payload claims"
    ],
    whenToUse: ["In all secure REST API backend endpoints"],
    whenNotToUse: ["Do not store confidential secrets inside JWT payload claims"],
    relatedConcepts: ["JWT", "Bearer Token", "CORS", "OAuth 2.0", "Header.Payload.Signature"],
    comparison: {
      title: "JWT Structure Breakdown",
      headers: ["Component", "Format", "Purpose"],
      rows: [
        ["Header", "Base64 JSON", "Specifies algorithm (HS256) and token type"],
        ["Payload", "Base64 JSON", "Contains claims (user ID, expiration timestamp, roles)"],
        ["Signature", "Cryptographic Hash", "Verifies token integrity using secret key (prevents tampering)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Can anyone read the contents of a JWT payload?", answer: "Yes! A JWT payload is merely Base64Url encoded, NOT encrypted. Anyone can decode and read the payload fields. The signature only guarantees that the payload has NOT been tampered with." }
    ],
    practiceProblem: {
      description: "Write HTTP header name used for sending JWT Bearer tokens.",
      starterCode: `Authorization`,
      testAssertion: "true",
      solution: `Authorization`
    },
    quickRevision: "★ JWT has 3 parts: Header.Payload.Signature.\n★ JWT payload is Base64 decoded (NOT encrypted; do not put secrets inside!).\n★ Send via 'Authorization: Bearer <token>' header."
  }),

  // 7. PAGINATION, FILTERING & SORTING
  "rest-pagination": createTopicSchema({
    id: "rest-pagination",
    techId: "rest-api",
    title: "API Pagination (Offset vs Cursor), Filtering & Sorting",
    category: "REST Design",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["rest-auth"],
    definition: "API pagination manages large result sets using Offset-based (page=2&limit=20) or Cursor-based (cursor=xyz&limit=20) methods, alongside filtering and sorting parameter conventions.",
    simpleExplanation: "Pagination breaks thousands of database records into manageable pages, preventing server memory overflow and slow network responses.",
    whyDoesItExist: "Protects database and network bandwidth when querying large collections.",
    basicExample: `// 1. Offset-Based Pagination:
GET /api/v1/orders?page=2&limit=20

// 2. Cursor-Based Pagination (Fast for large datasets!):
GET /api/v1/orders?cursor=eyJpZCI6MTAwMH0&limit=20

// 3. Filtering & Sorting:
GET /api/v1/orders?status=completed&sort=-createdAt`,
    howItWorks: [
      "1. Offset pagination uses SQL OFFSET (page - 1) * limit (gets slow on deep page 10,000).",
      "2. Cursor pagination uses index pointer (WHERE id > cursor LIMIT 20) maintaining sub-ms speed at any depth.",
      "3. Returns data array alongside pagination metadata envelope."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Offset Pagination (SQL OFFSET) vs Cursor Pagination (WHERE id &gt; cursor)</text></svg>`,
    realWorldExample: `// Standard JSON Pagination Response Envelope:
{
  "data": [ { "id": 101, "total": 99.99 } ],
  "meta": {
    "currentPage": 2,
    "perPage": 20,
    "totalItems": 450,
    "totalPages": 23
  }
}`,
    commonUseCases: [
      "Paginating e-commerce product catalogs and user order histories",
      "Using Cursor-based pagination for infinite scroll feeds (Twitter/Instagram style)",
      "Sorting query results via ?sort=-price (descending) or ?sort=price (ascending)"
    ],
    commonMistakes: [
      "Using Offset-based pagination on massive tables with millions of rows (SQL OFFSET becomes extremely slow at high page numbers)",
      "Allowing clients to request unlimited limit size (e.g. ?limit=1000000 causes server RAM crash! Always enforce max limit cap)"
    ],
    bestPractices: [
      "Enforce a strict maximum limit cap (e.g. max limit = 100)",
      "Use Cursor-based pagination for real-time infinite scroll feeds and high-volume collections"
    ],
    whenToUse: ["In all REST API collection list endpoints"],
    whenNotToUse: ["Do not allow uncapped limit parameters"],
    relatedConcepts: ["Offset Pagination", "Cursor Pagination", "Infinite Scroll", "Sort Parameters"],
    comparison: {
      title: "Offset Pagination vs Cursor Pagination",
      headers: ["Metric", "Offset-Based (page=2&limit=20)", "Cursor-Based (cursor=xyz&limit=20)"],
      rows: [
        ["Deep Page Speed", "Slow (SQL OFFSET scans all previous skipped rows)", "Ultra Fast (Index lookup WHERE id > cursor)"],
        ["Duplicate Items Risk", "High (If items inserted while user paginates)", "Zero (Stable cursor pointer)"],
        ["Random Page Jump", "Easy (Can jump directly to page 50)", "Hard (Can only navigate next/prev)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is Cursor-based pagination superior to Offset-based pagination for large datasets?", answer: "Offset pagination uses SQL `OFFSET n`, forcing the database to read and discard `n` rows, getting progressively slower at deep pages. Cursor pagination uses an indexed pointer (`WHERE id > cursor LIMIT 20`), executing at constant sub-millisecond speed regardless of depth." }
    ],
    practiceProblem: {
      description: "Write query string parameter for sorting by createdAt descending.",
      starterCode: `?sort=-createdAt`,
      testAssertion: "true",
      solution: `?sort=-createdAt`
    },
    quickRevision: "★ Enforce max limit cap (e.g. limit=100) to prevent RAM crashes.\n★ Cursor-based pagination is faster than Offset at deep pages.\n★ Prefix sort field with '-' for descending order (?sort=-price)."
  }),

  // 8. RATE LIMITING & THROTTLING
  "rest-rate-limiting": createTopicSchema({
    id: "rest-rate-limiting",
    techId: "rest-api",
    title: "API Rate Limiting, Throttling & HTTP 429 Responses",
    category: "REST Security",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["rest-pagination"],
    definition: "Rate limiting restricts the number of API requests a client can make in a given timeframe using algorithms like Token Bucket, Leaky Bucket, or Fixed/Sliding Window counters, returning HTTP 429 Too Many Requests.",
    simpleExplanation: "Rate limiting prevents DDoS attacks and API abuse by capping users to e.g. 60 requests per minute.",
    whyDoesItExist: "Protects API servers from denial-of-service (DDoS) attacks, brute-force bots, and resource starvation.",
    basicExample: `// HTTP 429 Response Headers:
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1672531200
Retry-After: 30

{
  "status": 429,
  "error": "Too Many Requests",
  "message": "API rate limit exceeded. Please try again in 30 seconds."
}`,
    howItWorks: [
      "1. Rate Limiter middleware checks client IP or API key in Redis memory.",
      "2. Increments request counter for current time window.",
      "3. If counter exceeds threshold, returns HTTP 429 with Retry-After header."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Request -&gt; Redis Sliding Window Counter -&gt; Exceeded? 429 Too Many Requests</text></svg>`,
    realWorldExample: `// Express.js express-rate-limit middleware:
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);`,
    commonUseCases: [
      "Protecting public API endpoints against DDoS attacks",
      "Preventing credential brute-force attacks on /login endpoints",
      "Monetizing API access tiers (Free = 100 req/hr, Pro = 10,000 req/hr)"
    ],
    commonMistakes: [
      "Storing rate limit counters in server memory instead of Redis (fails when scaling across multiple load-balanced web servers)",
      "Forgetting to return the Retry-After header in HTTP 429 responses"
    ],
    bestPractices: [
      "Use Redis for distributed rate limit counter storage",
      "Include standard X-RateLimit-* and Retry-After response headers"
    ],
    whenToUse: ["On all public and authenticated REST API endpoints"],
    whenNotToUse: ["Do not set ultra-low rate limits on internal microservice-to-microservice traffic"],
    relatedConcepts: ["HTTP 429", "Token Bucket Algorithm", "Redis Sliding Window", "Retry-After"],
    comparison: {
      title: "Rate Limiting Algorithms",
      headers: ["Algorithm", "Mechanism", "Pros & Cons"],
      rows: [
        ["Fixed Window", "Resets counter at fixed clock intervals", "Simple, but vulnerable to traffic bursts at window boundary"],
        ["Sliding Window Counter", "Calculates request rate over smooth rolling time window", "Accurate & smooth; requires Redis ZSET/memory"],
        ["Token Bucket", "Tokens added to bucket at steady rate", "Allows short controlled traffic bursts"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What HTTP status code and response header should be returned when an API rate limit is exceeded?", answer: "Return HTTP 429 Too Many Requests alongside the `Retry-After: <seconds>` response header indicating how many seconds the client must wait before retrying." }
    ],
    practiceProblem: {
      description: "Write HTTP status code for rate limit exceeded.",
      starterCode: `429`,
      testAssertion: "true",
      solution: `429`
    },
    quickRevision: "★ Return HTTP 429 Too Many Requests when rate limit is exceeded.\n★ Include Retry-After: <seconds> header.\n★ Use Redis for distributed multi-server rate limiting."
  }),

  // 9. API VERSIONING STRATEGIES
  "rest-versioning": createTopicSchema({
    id: "rest-versioning",
    techId: "rest-api",
    title: "API Versioning Strategies (URI Path, Header & Media Type)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["rest-rate-limiting"],
    definition: "API Versioning prevents breaking existing client applications when introducing backwards-incompatible API changes, implemented via URI Path (/v1/users), Query Params, Custom Headers, or Accept Media Type Negotiation.",
    simpleExplanation: "API Versioning allows old mobile apps using /v1/users to continue working smoothly while new clients use updated /v2/users endpoints.",
    whyDoesItExist: "Prevents breaking deployed mobile apps and third-party client integrations when backend data schemas change.",
    basicExample: `// 1. URI Path Versioning (Most Popular & Developer Friendly):
GET /api/v1/users
GET /api/v2/users

// 2. Custom Request Header Versioning:
GET /api/users
X-API-Version: 2

// 3. Media Type Negotiation (Accept Header):
GET /api/users
Accept: application/vnd.mycompany.v2+json`,
    howItWorks: [
      "1. Router evaluates version strategy (URL path prefix /v1/ vs Header).",
      "2. Routes request to corresponding controller version.",
      "3. Deprecated versions return 'Warning: 299 - API Version Deprecated' header."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Client Request -&gt; Router (/v1/ vs /v2/) -&gt; Version Controller Execution</text></svg>`,
    realWorldExample: `// Express.js URI Path Version Routing:
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);`,
    commonUseCases: [
      "Preventing breaking changes when renaming response JSON keys",
      "Supporting legacy mobile application versions",
      "Gracefully deprecating old API features over a deprecation window"
    ],
    commonMistakes: [
      "Incrementing major API version for non-breaking additions (adding a new optional field does NOT require a new API version!)",
      "Maintaining 10 obsolete API versions indefinitely without a deprecation schedule"
    ],
    bestPractices: [
      "Use URI Path Versioning (/v1/, /v2/) for maximum clarity and caching support",
      "Only increment major version numbers for true breaking changes"
    ],
    whenToUse: ["In all public or multi-client production REST APIs"],
    whenNotToUse: ["Do not create v2 for simple additive non-breaking response changes"],
    relatedConcepts: ["URI Path Versioning", "Header Versioning", "Breaking Changes", "Deprecation"],
    comparison: {
      title: "URI Path Versioning vs Header Versioning",
      headers: ["Strategy", "Example Syntax", "Pros & Cons"],
      rows: [
        ["URI Path Versioning", "GET /api/v1/users", "Easy to test in browser & Cache friendly; pollution of URL namespace"],
        ["Header Versioning", "X-API-Version: 2", "Clean URLs; harder to test in browser & harder to cache"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "When should you increment a major API version number?", answer: "Increment a major version number ONLY when introducing breaking changes (e.g. deleting a field, renaming a key, changing data types, or changing URL structure). Adding new optional fields or new endpoints is non-breaking and does NOT require a version bump." }
    ],
    practiceProblem: {
      description: "Write URI path for v2 users endpoint.",
      starterCode: `/api/v2/users`,
      testAssertion: "true",
      solution: `/api/v2/users`
    },
    quickRevision: "★ URI Path Versioning (/v1/users) is the industry standard.\n★ Version bump ONLY for breaking changes (deleting/renaming fields).\n★ Non-breaking additions (new fields) do NOT require a version bump."
  }),

  // 10. OPENAPI SPECIFICATION & DOCS
  "rest-openapi": createTopicSchema({
    id: "rest-openapi",
    techId: "rest-api",
    title: "OpenAPI Specification (Swagger) & Contract-First Design",
    category: "Documentation",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["rest-versioning"],
    definition: "OpenAPI Specification (formerly Swagger) is a standard, machine-readable format (YAML/JSON) for describing REST APIs, enabling automated interactive documentation (Swagger UI), SDK generation, and mock servers.",
    simpleExplanation: "OpenAPI acts as a blueprint contract for your API that automatically generates interactive Swagger documentation and client SDK code.",
    whyDoesItExist: "Eliminates outdated manual documentation and enforces contract-first API development.",
    basicExample: `# OpenAPI 3.1 YAML Specification Snippet
openapi: 3.1.0
info:
  title: Users API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User object
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id: { type: integer }
        name: { type: string }`,
    howItWorks: [
      "1. Developers write OpenAPI YAML spec (Contract-First) or generate from code annotations.",
      "2. Swagger UI renders interactive browser interface allowing developers to test endpoints.",
      "3. OpenAPI Generator compiles spec into client SDKs (TypeScript, Swift, Kotlin)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">OpenAPI YAML Spec -&gt; Swagger UI Docs &amp; Auto-Generated Client SDKs</text></svg>`,
    realWorldExample: `// Mounting Swagger UI in Express.js:
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));`,
    commonUseCases: [
      "Generating interactive Swagger UI documentation for frontend and third-party developers",
      "Enforcing Contract-First API development between frontend and backend teams",
      "Auto-generating client SDKs using OpenAPI Generator"
    ],
    commonMistakes: [
      "Writing manual documentation in Word or static HTML that quickly becomes outdated",
      "Not validating OpenAPI YAML specs against JSON schema rules"
    ],
    bestPractices: [
      "Adopt Contract-First API design (write OpenAPI spec before coding backend endpoints)",
      "Serve interactive Swagger UI documentation at /api-docs"
    ],
    whenToUse: ["In all professional production REST API projects"],
    whenNotToUse: ["Do not skip API documentation in team environments"],
    relatedConcepts: ["OpenAPI 3.1", "Swagger UI", "Contract-First Design", "SDK Generation"],
    comparison: {
      title: "Code-First vs Contract-First API Design",
      headers: ["Approach", "Workflow", "Pros & Cons"],
      rows: [
        ["Code-First", "Write backend code first -> Generate docs from annotations", "Fast initial coding; documentation & contract are an afterthought"],
        ["Contract-First", "Write OpenAPI spec first -> Generate code stubs & docs", "Frontend & Backend teams can work in parallel; guaranteed spec alignment"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Contract-First API Design and why is OpenAPI essential for it?", answer: "Contract-First API Design means defining the API specification (the contract) in OpenAPI YAML format before writing backend code. Frontend and backend teams agree on the contract first, allowing frontend teams to build against mock servers while backend teams build the implementation." }
    ],
    practiceProblem: {
      description: "Write path for Swagger UI documentation endpoint.",
      starterCode: `/api-docs`,
      testAssertion: "true",
      solution: `/api-docs`
    },
    quickRevision: "★ OpenAPI (Swagger) is the standard machine-readable API spec format.\n★ Powers interactive Swagger UI documentation & client SDK generation.\n★ Contract-First design defines OpenAPI spec before writing code."
  }),

  // 11. API GATEWAY & MICROSERVICES
  "rest-gateway": createTopicSchema({
    id: "rest-gateway",
    techId: "rest-api",
    title: "API Gateway Pattern, Microservices & Circuit Breakers",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["rest-openapi"],
    definition: "The API Gateway pattern acts as a single reverse-proxy entry point (Kong, AWS API Gateway, Nginx) for microservice architectures, handling routing, authentication offloading, rate limiting, and Circuit Breaking.",
    simpleExplanation: "An API Gateway is a central front door for your microservices that routes incoming client requests to the correct backend microservice, handles SSL, and enforces rate limits.",
    whyDoesItExist: "Prevents clients from making complex individual requests to dozens of separate microservices.",
    basicExample: `# API Gateway Routing Architecture:
Client Request (https://api.company.com/orders)
                   │
                   ▼
┌─────────────────────────────────────┐
│          API GATEWAY                │
│ (Auth Check, Rate Limit, SSL Term)  │
└──────────────────┬──────────────────┘
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
Order Microservice      User Microservice
(http://order-svc:3001) (http://user-svc:3002)`,
    howItWorks: [
      "1. Client sends request to central API Gateway domain.",
      "2. API Gateway offloads SSL termination, JWT authentication verification, and rate limiting.",
      "3. Proxies request to internal backend microservice (handling response aggregation and Circuit Breaker retries)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Client -&gt; API Gateway (Auth &amp; Rate Limit) -&gt; Targeted Internal Microservice</text></svg>`,
    realWorldExample: `# Nginx as API Gateway location block:
location /api/v1/orders/ {
    proxy_pass http://order-service:3001/;
}`,
    commonUseCases: [
      "Decoupling frontend clients from internal microservice network topology",
      "Offloading authentication and rate limiting to a central gateway (Kong / KrakenD / Nginx)",
      "Preventing cascading microservice failures using the Circuit Breaker pattern"
    ],
    commonMistakes: [
      "Putting heavy domain business logic inside the API Gateway (keeps gateway thin!)",
      "Creating a single monolithic point of failure without gateway load balancing"
    ],
    bestPractices: [
      "Keep API Gateways thin (focused strictly on routing, auth, and rate limiting)",
      "Use Circuit Breakers (e.g. Opossum in Node) to trip open when downstream microservices fail"
    ],
    whenToUse: ["In all enterprise microservice backend architectures"],
    whenNotToUse: ["Do not deploy an API Gateway for a simple 1-server monolithic application"],
    relatedConcepts: ["API Gateway", "Kong", "Circuit Breaker", "SSL Termination"],
    comparison: {
      title: "Monolithic API vs API Gateway Microservices",
      headers: ["Aspect", "Monolithic API", "API Gateway + Microservices"],
      rows: [
        ["Entry Point", "Single server handles everything", "API Gateway routes to specialized microservices"],
        ["Auth Handling", "Inside monolith app code", "Centralized at Gateway level"],
        ["Scalability", "Must scale entire monolith", "Scale individual microservices independently"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the primary responsibility of an API Gateway in a Microservices architecture?", answer: "An API Gateway acts as a single, thin reverse-proxy entry point. It handles request routing to internal microservices, offloads cross-cutting concerns (SSL termination, JWT auth, rate limiting), and protects backend services with circuit breaking." }
    ],
    practiceProblem: {
      description: "Write Nginx proxy directive for gateway routing.",
      starterCode: `proxy_pass http://user-service:3000/;`,
      testAssertion: "true",
      solution: `proxy_pass http://user-service:3000/;`
    },
    quickRevision: "★ API Gateway is a central front door for microservices.\n★ Offloads SSL, JWT auth verification, and rate limiting.\n★ Use Circuit Breakers to prevent cascading microservice failures."
  })
};
