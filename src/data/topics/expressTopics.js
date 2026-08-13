import { createTopicSchema } from './createTopicSchema.js';

export const expressTopics = {
  // 1. EXPRESS INITIALIZATION
  "express-basics": createTopicSchema({
    id: "express-basics",
    techId: "express",
    title: "Express.js Initialization, App Server & Project Setup",
    category: "Express Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Node.js Basics"],
    definition: "Express.js is a minimal, un-opinionated Node.js web framework providing a robust suite of features for building RESTful APIs and web applications.",
    simpleExplanation: "Express simplifies building Node.js HTTP servers by giving you easy routing, middleware support, and JSON parsing out-of-the-box.",
    whyDoesItExist: "Eliminates raw Node.js http.createServer() boilerplate code.",
    basicExample: `import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Express Server Running' });
});

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});`,
    howItWorks: [
      "1. express() instantiates application event dispatcher object.",
      "2. HTTP request hits Node.js http server and passes into Express middleware chain.",
      "3. Route handlers match URL path and return JSON or HTML response."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">HTTP Request -&gt; express() Application -&gt; Middleware Pipeline -&gt; res.json()</text></svg>`,
    realWorldExample: `// Using nodemon / tsx for hot-reloading development:
// package.json: "scripts": { "dev": "tsx watch src/server.ts" }`,
    commonUseCases: [
      "Bootstrapping Node.js RESTful API web servers",
      "Building backend services for React, Vue, and mobile clients",
      "Serving static assets and web applications"
    ],
    commonMistakes: [
      "Forgetting app.listen(PORT) so the server never accepts incoming network connections",
      "Putting application logic directly inside the main server.js entry point instead of modular folders"
    ],
    bestPractices: [
      "Use environment variables for server PORT configuration",
      "Separate app definition from app.listen() for clean integration testing"
    ],
    whenToUse: ["In all Node.js web applications and REST APIs"],
    whenNotToUse: ["Do not use heavy frameworks for simple 1-line script executions"],
    relatedConcepts: ["express()", "app.listen()", "res.json()", "Nodemon"],
    comparison: {
      title: "Raw Node.js http vs Express.js",
      headers: ["Aspect", "Raw Node.js http", "Express.js Framework"],
      rows: [
        ["Routing", "Manual URL parsing with if/else conditionals", "Declarative app.get('/path', handler)"],
        ["Middleware", "Manual custom handler pipelines", "Built-in app.use(middleware) pipeline"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is Express.js and why is it preferred over raw Node.js http module?", answer: "Express.js is a minimal, un-opinionated web framework for Node.js. It simplifies building web servers by providing clean routing, middleware pipeline execution, and easy request/response handling." }
    ],
    practiceProblem: {
      description: "Write basic Express app instantiation line.",
      starterCode: `const app = express();`,
      testAssertion: "true",
      solution: `const app = express();`
    },
    quickRevision: "★ express() initializes application object.\n★ app.listen(PORT) starts server listener.\n★ Use res.json() to return JSON responses."
  }),

  // 2. ROUTING & URL PARAMS
  "express-routing": createTopicSchema({
    id: "express-routing",
    techId: "express",
    title: "Express Routing, HTTP Verbs & Route Parameters",
    category: "Express Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["express-basics"],
    definition: "Express Routing maps HTTP request verbs (GET, POST, PUT, PATCH, DELETE) and URL paths to handler functions, supporting URL path parameters (:id) and query parameters.",
    simpleExplanation: "Routing maps URL paths like /api/users/:id to backend functions that fetch and return the correct data.",
    whyDoesItExist: "Provides declarative RESTful URL mapping and parameter extraction.",
    basicExample: `import { Router } from 'express';
const router = Router();

// Route with dynamic path parameter (:id) and query param (?status=active)
router.get('/users/:id', (req, res) => {
  const { id } = req.params; // Route Parameter
  const { status } = req.query; // Query Parameter
  res.json({ userId: id, filterStatus: status });
});

export default router;`,
    howItWorks: [
      "1. Router matches incoming URL path pattern against registered routes.",
      "2. Extracts path parameters into req.params object.",
      "3. Parses URL query string parameters into req.query object."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">URL /users/42?status=active -&gt; req.params.id (42) &amp; req.query.status (active)</text></svg>`,
    realWorldExample: `// Modular Router export & mount:
// src/routes/userRoutes.js
app.use('/api/v1/users', userRouter);`,
    commonUseCases: [
      "Extracting resource primary keys from URL paths (:id)",
      "Handling filter and pagination parameters via req.query",
      "Structuring modular route files using express.Router()"
    ],
    commonMistakes: [
      "Confusing route parameters (req.params) with query parameters (req.query)",
      "Defining wildcards (:id) BEFORE specific routes (e.g. /users/:id before /users/profile causes 'profile' to be captured as an ID!)"
    ],
    bestPractices: [
      "Use express.Router() for modular route organization",
      "Define specific static routes (/users/profile) BEFORE dynamic parameter routes (/users/:id)"
    ],
    whenToUse: ["In all Express route definitions"],
    whenNotToUse: ["Do not put business logic directly inside route definition files"],
    relatedConcepts: ["express.Router", "req.params", "req.query", "Route Order"],
    comparison: {
      title: "req.params vs req.query",
      headers: ["Parameter Type", "URL Location", "Example"],
      rows: [
        ["req.params", "In the URL Path definition (/users/:id)", "/users/42 -> req.params.id = '42'"],
        ["req.query", "In the URL Query String after '?' (/users?page=2)", "/users?page=2 -> req.query.page = '2'"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between req.params and req.query in Express?", answer: "req.params extracts path parameters defined in the route path pattern (e.g. /users/:id -> req.params.id). req.query parses key-value pairs from the URL query string following the '?' character (e.g. /users?role=admin -> req.query.role)." }
    ],
    practiceProblem: {
      description: "Write route parameter definition syntax for user ID.",
      starterCode: `app.get('/users/:id', handler);`,
      testAssertion: "true",
      solution: `app.get('/users/:id', handler);`
    },
    quickRevision: "★ Use express.Router() for modular route files.\n★ req.params extracts URL path variables (:id).\n★ req.query extracts query string parameters (?key=val)."
  }),

  // 3. REQ & RES OBJECTS
  "express-req-res": createTopicSchema({
    id: "express-req-res",
    techId: "express",
    title: "Express Request & Response Objects (req, res)",
    category: "Express Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["express-routing"],
    definition: "The Request (req) object represents the incoming HTTP request (headers, body, params, query), while the Response (res) object sends responses (res.status(), res.json(), res.send(), res.redirect()).",
    simpleExplanation: "req contains everything the client sent to the server. res provides methods to send data back to the client.",
    whyDoesItExist: "Provides a rich API wrapper over raw Node.js IncomingMessage and ServerResponse objects.",
    basicExample: `app.post('/api/users', (req, res) => {
  const { name, email } = req.body; // Needs express.json() middleware!
  const userAgent = req.headers['user-agent'];

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email required' });
  }

  res.status(201).json({ id: 1, name, email });
});`,
    howItWorks: [
      "1. Express wraps Node's IncomingMessage into req and ServerResponse into res.",
      "2. res.json() sets Content-Type: application/json and serializes JS object.",
      "3. Calling return res.status().json() terminates the request-response cycle."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">req (Body, Params, Headers) -&gt; Handler -&gt; res.status(201).json(data)</text></svg>`,
    realWorldExample: `// Setting custom response headers:
res.set('X-Custom-Header', 'MyValue');
res.status(204).send();`,
    commonUseCases: [
      "Reading JSON payload bodies via req.body",
      "Setting HTTP status codes with res.status()",
      "Returning JSON API data with res.json()"
    ],
    commonMistakes: [
      "Forgetting return before res.json() causing 'ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent to the client'",
      "Attempting to read req.body without mounting express.json() middleware"
    ],
    bestPractices: [
      "Always use return res.status().json() to prevent code execution continuation",
      "Mount express.json() middleware at top of application"
    ],
    whenToUse: ["In all Express route handlers and middleware"],
    whenNotToUse: ["Do not send multiple responses for a single request"],
    relatedConcepts: ["req.body", "res.json()", "res.status()", "ERR_HTTP_HEADERS_SENT"],
    comparison: {
      title: "res.json() vs res.send()",
      headers: ["Method", "Content-Type", "Data Conversion"],
      rows: [
        ["res.json(obj)", "application/json", "Explicitly converts objects/arrays to JSON string"],
        ["res.send(data)", "Auto-detected (text/html or application/json)", "Formats strings, objects, or buffers automatically"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What causes the 'Cannot set headers after they are sent to the client' error in Express?", answer: "This error occurs when your code attempts to send more than one response (e.g. calling res.json() twice, or calling res.json() without a return statement so execution continues into another res.send())." }
    ],
    practiceProblem: {
      description: "Write Express response line returning HTTP 201 with JSON object.",
      starterCode: `return res.status(201).json({ success: true });`,
      testAssertion: "true",
      solution: `return res.status(201).json({ success: true });`
    },
    quickRevision: "★ req = incoming request data (body, params, headers).\n★ res = outgoing response handler (res.status(), res.json()).\n★ Always write 'return res.json()' to prevent double-response errors."
  }),

  // 4. MIDDLEWARE ARCHITECTURE
  "express-middleware": createTopicSchema({
    id: "express-middleware",
    techId: "express",
    title: "Express Middleware Architecture & Next Function",
    category: "Express Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["express-req-res"],
    definition: "Middleware functions have access to the req, res, and next parameters. Middleware can execute code, modify req/res objects, end request cycles, or call next() to pass execution to the next middleware in the pipeline.",
    simpleExplanation: "Middleware functions are checkpoints that execute in series between receiving an HTTP request and returning a response.",
    whyDoesItExist: "Enforces modular, reusable request processing (logging, authentication, validation).",
    basicExample: `// Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pass control to next middleware!
};

// Mount globally
app.use(loggerMiddleware);`,
    howItWorks: [
      "1. Express executes registered middleware sequentially in the order mounted via app.use().",
      "2. Calling next() passes execution to next middleware in stack.",
      "3. Calling next(err) bypasses standard middleware and jumps directly to Global Error Handler."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">req -&gt; Middleware 1 (next) -&gt; Middleware 2 (next) -&gt; Controller -&gt; res</text></svg>`,
    realWorldExample: `// Route-level Authentication Middleware:
const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

app.get('/api/dashboard', requireAuth, (req, res) => res.json({ data: 'secret' }));`,
    commonUseCases: [
      "Authenticating requests before route execution",
      "Logging incoming request HTTP details",
      "Attaching custom properties to req (e.g. req.user)"
    ],
    commonMistakes: [
      "Forgetting to call next() inside middleware (hangs the request indefinitely!)",
      "Executing code AFTER calling next() causing unexpected out-of-order execution"
    ],
    bestPractices: [
      "Always call next() or send a response (res.json()) inside middleware",
      "Use next(err) to forward errors to error-handling middleware"
    ],
    whenToUse: ["In all cross-cutting request processing logic"],
    whenNotToUse: ["Do not put specific database query business logic in global middleware"],
    relatedConcepts: ["Middleware Pipeline", "next()", "next(err)", "app.use()"],
    comparison: {
      title: "Application-level vs Route-level Middleware",
      headers: ["Scope", "Mount Method", "Execution"],
      rows: [
        ["Application-level", "app.use(middleware)", "Executes for EVERY request arriving at server"],
        ["Route-level", "router.get('/path', middleware, handler)", "Executes ONLY for matching route path"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What happens if a middleware function does NOT call next() and does NOT return a response?", answer: "The request will hang indefinitely until the client or browser times out, because Express stays waiting for either a response or a next() call." }
    ],
    practiceProblem: {
      description: "Write basic middleware signature parameters list.",
      starterCode: `(req, res, next) => { next(); }`,
      testAssertion: "true",
      solution: `(req, res, next) => { next(); }`
    },
    quickRevision: "★ Middleware signature: (req, res, next).\n★ MUST call next() or return a response (res.json()).\n★ next(err) jumps directly to the Error Handler."
  }),

  // 5. THIRD-PARTY MIDDLEWARES
  "express-third-party": createTopicSchema({
    id: "express-third-party",
    techId: "express",
    title: "Built-in & Third-Party Middlewares (cors, morgan, helmet, express.json)",
    category: "Express Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["express-middleware"],
    definition: "Express provides built-in body-parsing middlewares (express.json(), express.urlencoded()) and integrates popular third-party middlewares: cors (Cross-Origin headers), morgan (HTTP logging), helmet (Security headers), and cookie-parser.",
    simpleExplanation: "Pre-built middlewares add JSON body parsing, CORS headers, security HTTP headers, and request logging to Express with 1 line of code.",
    whyDoesItExist: "Provides battle-tested utility middlewares for common web application requirements.",
    basicExample: `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// Mounting Essential Middlewares
app.use(helmet()); // Security HTTP headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded forms`,
    howItWorks: [
      "1. express.json() intercepts request stream and populates req.body with parsed JSON object.",
      "2. helmet() sets 15+ secure HTTP response headers (X-Frame-Options, CSP, HSTS).",
      "3. cors() adds Access-Control-Allow-Origin headers to response."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">req -&gt; helmet() -&gt; cors() -&gt; morgan() -&gt; express.json() -&gt; req.body</text></svg>`,
    realWorldExample: `// Custom CORS whitelist configuration:
app.use(cors({ origin: 'https://myapp.com', methods: ['GET', 'POST'] }));`,
    commonUseCases: [
      "Parsing JSON request payloads with express.json()",
      "Securing application HTTP headers with helmet()",
      "Enabling cross-origin request permissions with cors()"
    ],
    commonMistakes: [
      "Mounting express.json() AFTER defining routes (req.body will be undefined inside handlers!)",
      "Leaving cors() unconfigured with default '*' wildcard origin in production"
    ],
    bestPractices: [
      "Mount express.json(), cors(), and helmet() at the top of the middleware stack",
      "Configure explicit origin whitelists in production cors options"
    ],
    whenToUse: ["In all production Express applications"],
    whenNotToUse: ["Do not use default cors() wildcard '*' if API handles credentialed cookies"],
    relatedConcepts: ["express.json()", "cors", "helmet", "morgan"],
    comparison: {
      title: "Essential Express Middlewares Summary",
      headers: ["Middleware", "Type", "Primary Function"],
      rows: [
        ["express.json()", "Built-in", "Parses application/json payload into req.body"],
        ["helmet()", "Third-party", "Sets 15+ secure HTTP response headers"],
        ["cors()", "Third-party", "Enables Cross-Origin Resource Sharing headers"],
        ["morgan()", "Third-party", "Logs HTTP request methods, paths, and status codes"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why must express.json() be mounted BEFORE defining API routes?", answer: "Express processes middleware sequentially. If routes are defined before express.json(), incoming request streams won't be parsed into `req.body` before reaching route handlers, resulting in `req.body` being undefined." }
    ],
    practiceProblem: {
      description: "Write line mounting express.json() middleware.",
      starterCode: `app.use(express.json());`,
      testAssertion: "true",
      solution: `app.use(express.json());`
    },
    quickRevision: "★ Mount express.json() BEFORE routes to parse req.body.\n★ Use helmet() for secure HTTP response headers.\n★ Use cors() for Cross-Origin Resource Sharing."
  }),

  // 6. GLOBAL ERROR HANDLING
  "express-error-handling": createTopicSchema({
    id: "express-error-handling",
    techId: "express",
    title: "Global Error Handling Middleware & Custom AppError",
    category: "Express Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["express-third-party"],
    definition: "Global Error Handling in Express uses a special 4-parameter middleware (err, req, res, next) mounted at the end of the stack to catch all errors passed via next(err) or thrown in async handlers.",
    simpleExplanation: "Error handling middleware acts as a centralized net catching all application errors and returning clean structured JSON error responses.",
    whyDoesItExist: "Prevents raw internal error stack traces from leaking and provides centralized error handling.",
    basicExample: `// 1. Custom AppError Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
  }
}

// 2. Global Error Handling Middleware (4 parameters!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error'
  });
});`,
    howItWorks: [
      "1. Route handler encounters error and calls next(err).",
      "2. Express skips all standard 3-parameter middlewares.",
      "3. Passes error directly into the 4-parameter error middleware (err, req, res, next)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">next(err) -&gt; Skips Standard Middlewares -&gt; 4-Param Error Handler (err, req, res, next)</text></svg>`,
    realWorldExample: `// Async Handler Wrapper (Catches rejected Promises in async routes!):
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));`,
    commonUseCases: [
      "Catching unhandled async errors using async handler wrappers",
      "Centralizing error formatting across all routes",
      "Masking raw stack traces in production environment mode"
    ],
    commonMistakes: [
      "Writing error handling middleware with 3 parameters instead of 4 (Express identifies error middleware strictly by inspecting its 4-parameter signature!)",
      "Forgetting to catch unhandled Promise rejections in async routes"
    ],
    bestPractices: [
      "Error handling middleware MUST have 4 parameters: (err, req, res, next)",
      "Use express-async-errors package or async wrapper functions"
    ],
    whenToUse: ["In all production Express applications"],
    whenNotToUse: ["Do not leak err.stack in production mode"],
    relatedConcepts: ["4-Parameter Middleware", "next(err)", "AppError", "asyncHandler"],
    comparison: {
      title: "Standard Middleware vs Error Middleware",
      headers: ["Middleware Type", "Parameter Signature", "Execution Trigger"],
      rows: [
        ["Standard Middleware", "(req, res, next)", "Executed on matching route requests"],
        ["Error Middleware", "(err, req, res, next)", "Executed ONLY when next(err) is called"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How does Express identify an Error Handling middleware function?", answer: "Express identifies Error Handling middleware strictly by inspecting the function's arity (number of declared arguments). Error handling middleware MUST explicitly declare 4 parameters: `(err, req, res, next)`." }
    ],
    practiceProblem: {
      description: "Write 4-parameter signature for Express error middleware.",
      starterCode: `app.use((err, req, res, next) => {});`,
      testAssertion: "true",
      solution: `app.use((err, req, res, next) => {});`
    },
    quickRevision: "★ Error middleware MUST have 4 parameters: (err, req, res, next).\n★ Calling next(err) jumps directly to the Error Handler.\n★ Use asyncHandler wrapper to catch rejected promises in async routes."
  }),

  // 7. ARCHITECTURE (CONTROLLER-SERVICE-REPOSITORY)
  "express-architecture": createTopicSchema({
    id: "express-architecture",
    techId: "express",
    title: "Express Architecture: Controller-Service-Repository Pattern",
    category: "Architecture",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["express-error-handling"],
    definition: "Structuring scalable Express applications uses Layered Architecture: Routes (URL mapping), Controllers (HTTP req/res extraction), Services (Business logic), and Repositories/Models (Database queries).",
    simpleExplanation: "Layered architecture separates route handlers from business logic and database queries so code stays clean, organized, and testable.",
    whyDoesItExist: "Prevents monolithic controller files containing 1,000 lines of mixed HTTP, business, and SQL code.",
    basicExample: `// 1. Controller Layer (src/controllers/userController.js)
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id); // Calls Service Layer!
    res.json(user);
  } catch (err) { next(err); }
};

// 2. Service Layer (src/services/userService.js)
export const getUserById = async (id) => {
  const user = await userRepository.findById(id); // Calls Repository Layer!
  if (!user) throw new AppError('User not found', 404);
  return user;
};`,
    howItWorks: [
      "1. Route layer passes HTTP request to Controller.",
      "2. Controller extracts params/body and calls Service method.",
      "3. Service executes business logic and calls Repository to query Database."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Route -&gt; Controller (HTTP) -&gt; Service (Business Logic) -&gt; Repository (DB Query)</text></svg>`,
    realWorldExample: `// Folder Structure:
// src/
// ├── controllers/
// ├── services/
// ├── repositories/
// └── routes/`,
    commonUseCases: [
      "Structuring enterprise Express applications for team collaboration",
      "Unit testing business logic in Service Layer without mocking HTTP objects",
      "Swapping database drivers in Repository Layer without affecting Controllers"
    ],
    commonMistakes: [
      "Putting database SQL / ORM calls directly inside Controller functions",
      "Accessing req or res objects inside Service layer functions (Services should be framework-agnostic!)"
    ],
    bestPractices: [
      "Keep Controllers thin; move business logic into Services",
      "Keep Services framework-agnostic (do not pass req or res into Service functions)"
    ],
    whenToUse: ["In all scalable production Express applications"],
    whenNotToUse: ["Do not create 4 layer files for a 1-route proof of concept"],
    relatedConcepts: ["Layered Architecture", "Controller", "Service Layer", "Repository Pattern"],
    comparison: {
      title: "Controller vs Service Layer Responsibility",
      headers: ["Layer", "Input / Output", "Primary Responsibility"],
      rows: [
        ["Controller", "Accepts req; Returns res.json()", "Extracts HTTP parameters, handles status codes & response formatting"],
        ["Service", "Accepts plain parameters; Returns domain objects", "Executes core business rules, calculations, and validations"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you avoid passing req or res objects into the Service Layer in Express?", answer: "Services should contain pure, framework-agnostic business logic. Keeping req and res objects in the Controller makes Service methods easy to unit test independently without mocking complex HTTP request/response objects." }
    ],
    practiceProblem: {
      description: "Write architectural layer name executing database queries.",
      starterCode: `Repository Layer`,
      testAssertion: "true",
      solution: `Repository Layer`
    },
    quickRevision: "★ Controllers handle HTTP (req, res).\n★ Services execute business logic.\n★ Repositories handle Database queries."
  }),

  // 8. AUTHENTICATION & AUTHORIZATION
  "express-auth": createTopicSchema({
    id: "express-auth",
    techId: "express",
    title: "Express JWT Authentication & Role-Based Access Control (RBAC)",
    category: "Express Security",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["express-architecture"],
    definition: "JWT Authentication in Express verifies signed Bearer tokens in middleware, attaching decoded user payloads to req.user. Role-Based Access Control (RBAC) middleware restricts routes based on req.user.role.",
    simpleExplanation: "Auth middleware verifies the JWT token in the request header and attaches the user profile to req.user before allowing access.",
    whyDoesItExist: "Secures backend REST API routes and enforces authorization permissions.",
    basicExample: `import jwt from 'jsonwebtoken';

// 1. JWT Authentication Middleware
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request!
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// 2. Role-Based Authorization Middleware
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Permission denied' });
  }
  next();
};`,
    howItWorks: [
      "1. Request header 'Authorization: Bearer <token>' intercepted by protect middleware.",
      "2. jwt.verify() checks signature using secret key.",
      "3. Attaches decoded payload to req.user and executes restrictTo() role check."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">Bearer Token -&gt; protect (jwt.verify) -&gt; req.user -&gt; restrictTo('admin') -&gt; Next</text></svg>`,
    realWorldExample: `// Protecting Admin Route:
app.delete('/api/users/:id', protect, restrictTo('admin'), deleteUserHandler);`,
    commonUseCases: [
      "Securing protected REST API endpoints with JWT tokens",
      "Attaching authenticated user identity to req.user",
      "Restricting routes to specific user roles (admin, manager)"
    ],
    commonMistakes: [
      "Hardcoding JWT secret keys in source code (always use process.env.JWT_SECRET!)",
      "Not checking for Bearer prefix in Authorization header"
    ],
    bestPractices: [
      "Store JWT secrets in process.env",
      "Attach decoded user objects to req.user for downstream handlers"
    ],
    whenToUse: ["In all secure Express REST APIs"],
    whenNotToUse: ["Do not secure public health check endpoints"],
    relatedConcepts: ["JWT", "Bearer Token", "req.user", "RBAC", "protect middleware"],
    comparison: {
      title: "Authentication vs Authorization Middleware",
      headers: ["Middleware", "Action", "Failure Status Code"],
      rows: [
        ["Authentication (protect)", "Verifies identity token (Who are you?)", "401 Unauthorized"],
        ["Authorization (restrictTo)", "Verifies role permission (Are you allowed?)", "403 Forbidden"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you pass the authenticated user object from auth middleware to route handlers in Express?", answer: "Attach the decoded user object directly to the Express `req` object inside the middleware (e.g. `req.user = decodedUser`). Downstream route handlers and middlewares can then access `req.user`." }
    ],
    practiceProblem: {
      description: "Write line attaching decoded user object to request.",
      starterCode: `req.user = decoded;`,
      testAssertion: "true",
      solution: `req.user = decoded;`
    },
    quickRevision: "★ Verify JWT token in protect middleware.\n★ Attach decoded user payload to req.user.\n★ Use restrictTo('admin') for role-based access control."
  }),

  // 9. API SECURITY & SANITIZATION
  "express-security": createTopicSchema({
    id: "express-security",
    techId: "express",
    title: "Express API Security (Helmet, Rate-Limiting, HPP & Sanitization)",
    category: "Express Security",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["express-auth"],
    definition: "Express Security hardening uses Helmet (secure headers), express-rate-limit (DDoS prevention), hpp (HTTP Parameter Pollution defense), express-mongo-sanitize (NoSQL Injection defense), and Zod/Joi validation.",
    simpleExplanation: "API security hardening protects your Express app from DDoS attacks, NoSQL injection, XSS, and parameter pollution.",
    whyDoesItExist: "Protects production Express APIs from security vulnerabilities and OWASP Top 10 exploits.",
    basicExample: `import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL query injection ($gt: '')
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);`,
    howItWorks: [
      "1. mongoSanitize() strips $ and . characters from req.body/params to block NoSQL injection.",
      "2. hpp() prevents parameter pollution array attacks (?id=1&id=2).",
      "3. rateLimit() drops excessive requests returning HTTP 429."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">helmet() -&gt; mongoSanitize() -&gt; hpp() -&gt; rateLimit() -&gt; Secure App</text></svg>`,
    realWorldExample: `// Preventing NoSQL Injection Attack:
// Attack payload: { "email": { "$gt": "" }, "password": "password" }
// mongoSanitize() strips $gt, preventing unauthorized login bypass!`,
    commonUseCases: [
      "Sanitizing user input against NoSQL Injection in MongoDB apps",
      "Preventing HTTP Parameter Pollution with hpp()",
      "Enforcing API rate limits with express-rate-limit"
    ],
    commonMistakes: [
      "Disabling x-powered-by header manually instead of using helmet()",
      "Not sanitizing MongoDB query inputs"
    ],
    bestPractices: [
      "Use helmet(), express-rate-limit, and express-mongo-sanitize in production",
      "Always hide X-Powered-By: Express header"
    ],
    whenToUse: ["In all production Express applications"],
    whenNotToUse: ["Do not skip security hardening in production"],
    relatedConcepts: ["Helmet", "express-mongo-sanitize", "NoSQL Injection", "hpp"],
    comparison: {
      title: "Security Middlewares Summary",
      headers: ["Package", "Defends Against"],
      rows: [
        ["helmet()", "XSS, Clickjacking, MIME sniffing (Sets 15+ headers)"],
        ["express-mongo-sanitize", "NoSQL Query Injection (Strips $ and .)"],
        ["hpp()", "HTTP Parameter Pollution (Prevents array parameter exploits)"],
        ["express-rate-limit", "DDoS & Password Brute-Force attacks (Returns 429)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is NoSQL Injection in Express/MongoDB and how does express-mongo-sanitize prevent it?", answer: "NoSQL Injection occurs when attackers supply MongoDB query operators in JSON body payloads (e.g. `{\"email\": {\"$gt\": \"\"}}`), bypassing login checks. express-mongo-sanitize strips `$` and `.` characters from user input to neutralize the attack." }
    ],
    practiceProblem: {
      description: "Write line mounting helmet security middleware.",
      starterCode: `app.use(helmet());`,
      testAssertion: "true",
      solution: `app.use(helmet());`
    },
    quickRevision: "★ Use helmet() for secure HTTP headers.\n★ Use express-mongo-sanitize to block NoSQL injection ($gt).\n★ Use hpp() to prevent HTTP parameter pollution."
  }),

  // 10. API TESTING & DOCUMENTATION
  "express-testing": createTopicSchema({
    id: "express-testing",
    techId: "express",
    title: "Express Integration Testing (Supertest, Vitest) & Swagger",
    category: "Testing & Docs",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["express-security"],
    definition: "Integration testing in Express uses Supertest combined with Vitest/Jest to simulate HTTP request execution without spinning up real network ports, documented via Swagger/OpenAPI.",
    simpleExplanation: "Supertest lets you write automated tests that send HTTP requests (GET, POST) directly to your Express app and assert status codes.",
    whyDoesItExist: "Validates API endpoint responses and HTTP status codes automatically.",
    basicExample: `import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/app.js';

describe('GET /api/v1/health', () => {
  it('returns HTTP 200 OK with status UP', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('UP');
  });
});`,
    howItWorks: [
      "1. supertest(app) wraps Express app instance.",
      "2. Simulates HTTP request execution in-memory.",
      "3. Evaluates HTTP response status code, headers, and JSON body assertions."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Supertest -&gt; Simulated In-Memory HTTP Request -&gt; Assert Status &amp; Body</text></svg>`,
    realWorldExample: `// Testing authenticated POST endpoint with Supertest:
const res = await request(app)
  .post('/api/v1/orders')
  .set('Authorization', \`Bearer \${token}\`)
  .send({ item: 'Laptop' })
  .expect(201);`,
    commonUseCases: [
      "Writing automated integration tests for Express API endpoints",
      "Testing JWT authentication error responses with Supertest",
      "Generating interactive API documentation with swagger-ui-express"
    ],
    commonMistakes: [
      "Calling app.listen() inside app.js when testing with Supertest (causes port collision errors! Export app without listening in app.js)",
      "Not resetting test databases between integration test runs"
    ],
    bestPractices: [
      "Separate app.js (app export) from server.js (app.listen()) for clean Supertest testing",
      "Use Supertest for integration testing of API routes"
    ],
    whenToUse: ["In all Express API test suites"],
    whenNotToUse: ["Do not run app.listen() inside test files"],
    relatedConcepts: ["Supertest", "Vitest / Jest", "swagger-ui-express", "app export"],
    comparison: {
      title: "Unit Testing vs Supertest Integration Testing",
      headers: ["Testing Type", "Target", "Tools"],
      rows: [
        ["Unit Testing", "Individual Service/Utility functions", "Vitest / Jest"],
        ["Integration Testing", "Full HTTP Endpoint (Routes + Middlewares + Response)", "Supertest + Vitest / Jest"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why should you export app without calling app.listen() in your main app.js file for Supertest testing?", answer: "Supertest automatically manages ephemeral in-memory HTTP servers during tests. If app.listen() is called in app.js, importing app in test files attempts to bind to real network ports, causing EADDRINUSE port collision errors." }
    ],
    practiceProblem: {
      description: "Write Supertest HTTP GET request line for /api/users.",
      starterCode: `const res = await request(app).get('/api/users').expect(200);`,
      testAssertion: "true",
      solution: `const res = await request(app).get('/api/users').expect(200);`
    },
    quickRevision: "★ Supertest simulates HTTP requests in-memory without real ports.\n★ Separate app.js (app definition) from server.js (app.listen()).\n★ Document APIs with swagger-ui-express."
  }),

  // 11. PRODUCTION DEPLOYMENT & PM2
  "express-deployment": createTopicSchema({
    id: "express-deployment",
    techId: "express",
    title: "Production Deployment, PM2 Process Manager & Nginx Reverse Proxy",
    category: "Deployment",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["express-testing"],
    definition: "Deploying Express to production uses PM2 Process Manager (Cluster Mode across CPU cores), Nginx Reverse Proxy (SSL termination & static caching), and Docker containerization.",
    simpleExplanation: "PM2 runs multiple Express process workers across all server CPU cores, automatically restarting them if they crash.",
    whyDoesItExist: "Takes single-threaded Node.js and scales process instances across multi-core servers.",
    basicExample: `# --- PM2 ecosystem.config.js ---
module.exports = {
  apps: [{
    name: 'express-api',
    script: './src/server.js',
    instances: 'max', // Cluster mode across all CPU cores!
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

# Command: pm2 start ecosystem.config.js --env production`,
    howItWorks: [
      "1. PM2 Cluster Mode uses Node.js cluster module to fork processes for every CPU core.",
      "2. Master PM2 process load balances incoming network sockets across worker processes.",
      "3. Nginx terminates SSL and proxies port 80/443 to PM2 port 3000."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Nginx (SSL Port 443) -&gt; PM2 Cluster Master -&gt; Worker 1 | Worker 2 | Worker 3</text></svg>`,
    realWorldExample: `# PM2 Commands:
pm2 logs
pm2 monit
pm2 reload ecosystem.config.js --env production # Zero-downtime reload!`,
    commonUseCases: [
      "Scaling Express across multi-core CPU servers using PM2 Cluster Mode",
      "Performing zero-downtime application reloads with pm2 reload",
      "Using Nginx as a reverse proxy in front of Express"
    ],
    commonMistakes: [
      "Running node server.js directly in production without PM2 or Docker (if the app crashes, the server stays down!)",
      "Using pm2 restart instead of pm2 reload for zero-downtime releases"
    ],
    bestPractices: [
      "Use PM2 Cluster Mode (exec_mode: 'cluster') in production",
      "Use pm2 reload for zero-downtime code deployments"
    ],
    whenToUse: ["In all production bare-metal or VM Express deployments"],
    whenNotToUse: ["Do not use PM2 inside Kubernetes (Kubernetes manages pod scaling natively)"],
    relatedConcepts: ["PM2", "Cluster Mode", "Nginx Reverse Proxy", "Zero-Downtime Reload"],
    comparison: {
      title: "pm2 restart vs pm2 reload",
      headers: ["Command", "Execution Action", "Downtime"],
      rows: [
        ["pm2 restart", "Kills all workers simultaneously then starts new ones", "Brief Downtime"],
        ["pm2 reload", "Reloads workers ONE BY ONE sequentially", "ZERO Downtime"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between pm2 restart and pm2 reload?", answer: "pm2 restart kills all process workers simultaneously before starting new ones, causing brief application downtime. pm2 reload reloads workers one by one sequentially, achieving zero-downtime code deployments." }
    ],
    practiceProblem: {
      description: "Write PM2 command for zero-downtime reload.",
      starterCode: `pm2 reload ecosystem.config.js`,
      testAssertion: "true",
      solution: `pm2 reload ecosystem.config.js`
    },
    quickRevision: "★ PM2 Cluster Mode forks process workers across all CPU cores.\n★ Use pm2 reload for zero-downtime deployments.\n★ Nginx handles SSL termination in front of PM2."
  })
};
