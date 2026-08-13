import { createTopicSchema } from './createTopicSchema.js';

export const prismaTopics = {
  // 1. PRISMA CORE & SCHEMA DEFINITION
  "prisma-basics": createTopicSchema({
    id: "prisma-basics",
    techId: "prisma",
    title: "Prisma ORM Core Architecture & Schema Definition (schema.prisma)",
    category: "ORM & Databases",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["SQL Basics"],
    definition: "Prisma is a next-generation open-source ORM for Node.js and TypeScript. It uses declarative schema definitions (`schema.prisma`) to generate a strongly-typed Prisma Client for database access.",
    simpleExplanation: "Prisma lets you define your database tables in a `schema.prisma` file, auto-generating a fully type-safe database client for your Node.js code.",
    whyDoesItExist: "Eliminates raw SQL string bugs and provides 100% auto-completed TypeScript database queries.",
    basicExample: `// 1. PRISMA SCHEMA DEFINITION (prisma/schema.prisma)
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}

// 2. LARAVEL ELOQUENT MODEL COMPARISON
// In Laravel, Eloquent models map to tables via PHP classes:
class User extends Model {
    protected $fillable = ['email', 'name', 'role'];
}`,
    howItWorks: [
      "1. Define database models in `prisma/schema.prisma`.",
      "2. Run `npx prisma generate` to build custom TypeScript types.",
      "3. Import `PrismaClient` to execute type-safe database queries."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">schema.prisma -&gt; npx prisma generate -&gt; Auto-generated Type-Safe Prisma Client</text></svg>`,
    realWorldExample: `// Initializing Prisma Client in Node.js:
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const newUser = await prisma.user.create({
  data: { email: 'alice@example.com', name: 'Alice' }
});`,
    commonUseCases: [
      "Building type-safe Node.js and Express REST APIs with PostgreSQL/MySQL",
      "Auto-generating TypeScript interfaces from database schemas",
      "Running declarative database migrations with `prisma migrate dev`"
    ],
    commonMistakes: [
      "Forgetting to run `npx prisma generate` after updating `schema.prisma` (causes outdated TypeScript autocompletion!)",
      "Instantiating multiple `new PrismaClient()` instances in serverless environments (exhausts DB connection pool!)"
    ],
    bestPractices: [
      "Use a singleton pattern for PrismaClient instantiation in development",
      "Store database credentials in `.env` referenced by `env(\"DATABASE_URL\")`"
    ],
    whenToUse: ["In all Node.js and TypeScript database-backed applications"],
    whenNotToUse: ["Do not use Prisma in pure PHP/Laravel applications (use native Laravel Eloquent ORM)"],
    relatedConcepts: ["schema.prisma", "Prisma Client", "Prisma Migrate", "TypeScript ORM"],
    comparison: {
      title: "Prisma ORM vs Laravel Eloquent ORM",
      headers: ["Aspect", "Prisma ORM (Node.js/TS)", "Laravel Eloquent ORM (PHP)"],
      rows: [
        ["Schema Source", "Single declarative `schema.prisma` file", "PHP Migration files + Model classes"],
        ["Type Safety", "100% Auto-generated TypeScript types", "PHP Docblocks / IDE Helper"],
        ["Query Engine", "Rust-based Query Engine binary", "PHP PDO database driver"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is `npx prisma generate` and what does it accomplish?", answer: "`npx prisma generate` reads your `schema.prisma` file and generates a custom, strongly-typed `@prisma/client` tailored specifically to your database schema models and TypeScript interfaces." }
    ],
    practiceProblem: {
      description: "Write CLI command generating Prisma Client.",
      starterCode: `npx prisma generate`,
      testAssertion: "true",
      solution: `npx prisma generate`
    },
    quickRevision: "★ Define schema models in `prisma/schema.prisma`.\n★ Run `npx prisma generate` for TypeScript typings.\n★ Use a single PrismaClient singleton instance."
  }),

  // 2. PRISMA CRUD OPERATIONS
  "prisma-crud": createTopicSchema({
    id: "prisma-crud",
    techId: "prisma",
    title: "Prisma Client CRUD Operations & Query Filtering",
    category: "ORM & Databases",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["prisma-basics"],
    definition: "Prisma Client provides strongly-typed CRUD methods (`create`, `findUnique`, `findMany`, `update`, `delete`, `upsert`) supporting advanced filtering, pagination, and relational includes.",
    simpleExplanation: "Prisma Client methods let you read and write database records using plain JavaScript objects without writing SQL queries.",
    whyDoesItExist: "Provides intuitive, auto-completed database query execution.",
    basicExample: `# 1. NODE.JS PRISMA CRUD EXAMPLES
// Create:
const user = await prisma.user.create({ data: { name: 'Alice', email: 'alice@test.com' } });

// Find Many with Filtering & Sorting:
const admins = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  orderBy: { createdAt: 'desc' },
  take: 10 // Limit 10
});

# 2. LARAVEL ELOQUENT EQUIVALENT
$admins = User::where('role', 'ADMIN')
    ->orderBy('created_at', 'desc')
    ->take(10)
    ->get();`,
    howItWorks: [
      "1. Prisma Client formats JS query object into AST.",
      "2. Passes AST to Rust Query Engine binary.",
      "3. Rust Engine translates AST into optimized SQL string, executes query, and returns type-safe objects."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Prisma Query Object -&gt; Rust Engine (SQL Translation) -&gt; Type-Safe JS Result</text></svg>`,
    realWorldExample: `// Upsert (Update if exists, Create if not!):
const user = await prisma.user.upsert({
  where: { email: 'alice@test.com' },
  update: { name: 'Alice Smith' },
  create: { email: 'alice@test.com', name: 'Alice Smith' }
});`,
    commonUseCases: [
      "Executing database CRUD operations in Express and Next.js APIs",
      "Performing safe atomic upserts with `prisma.user.upsert()`",
      "Paginating query results using `take` and `skip`"
    ],
    commonMistakes: [
      "Confusing `findUnique` (requires `@unique` or `@id` field in `where`) with `findFirst`",
      "Forgetting that `deleteMany` returns a count `{ count: 5 }` rather than deleted entity objects"
    ],
    bestPractices: [
      "Use `findUnique` when querying by primary keys or unique email fields",
      "Use `select` or `include` to specify exact return fields and relations"
    ],
    whenToUse: ["In all Prisma data manipulation handlers"],
    whenNotToUse: ["Do not use `findUnique` on non-unique database columns"],
    relatedConcepts: ["findUnique", "findMany", "upsert", "Rust Engine"],
    comparison: {
      title: "include vs select in Prisma",
      headers: ["Option", "Behavior", "Result"],
      rows: [
        ["include: { posts: true }", "Returns ALL model scalar fields PLUS the requested relation", "Full User object + posts array"],
        ["select: { name: true }", "Returns ONLY the explicitly requested scalar fields", "Targeted payload (reduces query memory)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between `findUnique` and `findFirst` in Prisma Client?", answer: "`findUnique` requires querying strictly by fields marked with `@id` or `@unique` in `schema.prisma`, optimizing query execution. `findFirst` allows filtering by any arbitrary column conditions, returning the first matching record." }
    ],
    practiceProblem: {
      description: "Write Prisma method used for updating or creating a record.",
      starterCode: `upsert`,
      testAssertion: "true",
      solution: `upsert`
    },
    quickRevision: "★ `findUnique` requires `@unique` or `@id` fields.\n★ `upsert` updates if record exists, creates if not.\n★ Use `select` to specify exact return columns."
  })
};
