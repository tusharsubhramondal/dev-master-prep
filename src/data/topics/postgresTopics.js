import { createTopicSchema } from './createTopicSchema.js';

export const postgresTopics = {
  // 1. POSTGRES SETUP & PSQL
  "postgres-basics": createTopicSchema({
    id: "postgres-basics",
    techId: "postgresql",
    title: "PostgreSQL Setup & psql CLI Architecture",
    category: "Postgres Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Database Fundamentals"],
    definition: "PostgreSQL is an advanced, object-relational open-source database system (ORDBMS) emphasizing extensibility, SQL compliance, and robust data integrity.",
    simpleExplanation: "Postgres is a powerful database engine known for handling complex queries, JSON data, and advanced data types with extreme reliability.",
    whyDoesItExist: "Provides enterprise-grade database features, strict standards compliance, and extensibility.",
    basicExample: `-- Connect via psql CLI: psql -U postgres -d mydatabase
\\c mydatabase -- Connect to database
\\dt -- List all tables
\\d users -- Describe users table schema`,
    howItWorks: [
      "1. Client connects to Postgres master process (postmaster).",
      "2. Postmaster forks dedicated backend process for the client connection.",
      "3. Backend process handles query parsing, execution, and shared memory access."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Client -&gt; Postmaster Process -&gt; Dedicated Forked Backend Process</text></svg>`,
    realWorldExample: `CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    commonUseCases: [
      "Building high-reliability backend database systems",
      "Storing JSON documents alongside relational data",
      "Executing complex analytical window functions and CTE queries"
    ],
    commonMistakes: [
      "Assuming Postgres process connection model scales endlessly (each connection consumes ~5-10MB RAM; use PgBouncer)",
      "Forgetting to use psql slash commands (\\d, \\dt)"
    ],
    bestPractices: [
      "Use connection poolers like PgBouncer for high-connection environments",
      "Prefer TIMESTAMPTZ over TIMESTAMP for timezone safety"
    ],
    whenToUse: ["In all modern enterprise web applications and data services"],
    whenNotToUse: ["When building ultra-lightweight embedded local mobile apps (use SQLite)"],
    relatedConcepts: ["ORDBMS", "psql CLI", "Postmaster", "PgBouncer"],
    comparison: {
      title: "PostgreSQL vs MySQL Connection Architecture",
      headers: ["Aspect", "PostgreSQL", "MySQL"],
      rows: [
        ["Connection Model", "Process-per-connection (Forks OS process)", "Thread-per-connection"],
        ["Extensibility", "Custom data types, index types & extensions", "Standard storage engines"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "How does PostgreSQL process connection architecture work?", answer: "PostgreSQL uses a process-per-connection model. The postmaster master process forks a separate OS backend process for each client connection." }
    ],
    practiceProblem: {
      description: "Write SQL creating table with UUID primary key.",
      starterCode: `CREATE TABLE items (id UUID PRIMARY KEY DEFAULT gen_random_uuid());`,
      testAssertion: "true",
      solution: `CREATE TABLE items (id UUID PRIMARY KEY DEFAULT gen_random_uuid());`
    },
    quickRevision: "★ Postgres uses a process-per-connection model.\n★ Use PgBouncer to manage memory connections.\n★ Use TIMESTAMPTZ for timezone-aware dates."
  }),

  // 2. RICH DATA TYPES
  "postgres-datatypes": createTopicSchema({
    id: "postgres-datatypes",
    techId: "postgresql",
    title: "Postgres Data Types: JSONB, Arrays, UUIDs & ENUMs",
    category: "Postgres Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["postgres-basics"],
    definition: "PostgreSQL supports rich native data types including JSONB (binary structured JSON with GIN indexing), native Arrays (text[]), UUIDs, Range types, and Custom ENUMs.",
    simpleExplanation: "JSONB lets you store and query JSON documents directly inside Postgres with sub-millisecond index speed.",
    whyDoesItExist: "Combines the flexibility of NoSQL document stores with the transactional power of relational databases.",
    basicExample: `CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Querying inside JSONB document using containment operator (@>)
SELECT * FROM orders WHERE metadata @> '{"status": "shipped"}';`,
    howItWorks: [
      "1. JSONB stores JSON data in a decomposed binary format.",
      "2. Eliminates JSON re-parsing on every query read.",
      "3. Integrates with GIN indexes for fast key/value containment searches."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">JSONB Document -&gt; Decomposed Binary Format -&gt; GIN Index Containment (@&gt;)</text></svg>`,
    realWorldExample: `SELECT id, metadata->>'customer_name' AS customer
FROM orders
WHERE metadata->'payment'->>'method' = 'credit_card';`,
    commonUseCases: [
      "Storing dynamic user settings and metadata payloads in JSONB",
      "Using UUIDs for distributed primary keys",
      "Storing tags and categories in native array columns (TEXT[])"
    ],
    commonMistakes: [
      "Using plain JSON type instead of JSONB (plain JSON re-parses on every query)",
      "Overusing JSONB for strictly structured relational data"
    ],
    bestPractices: [
      "Always use JSONB instead of plain JSON for query speed and indexing",
      "Create GIN indexes on frequently searched JSONB columns"
    ],
    whenToUse: ["When storing dynamic, variable-schema attributes alongside relational records"],
    whenNotToUse: ["Do not put your entire database into a single JSONB column"],
    relatedConcepts: ["JSONB", "GIN Index", "UUID", "Arrays", "@> Operator"],
    comparison: {
      title: "JSON vs JSONB in Postgres",
      headers: ["Type", "Storage Format", "Query Read Speed", "Index Support"],
      rows: [
        ["JSON", "Exact text string copy", "Slower (Re-parses on read)", "Limited"],
        ["JSONB", "Decomposed binary format", "Fast (Pre-parsed binary)", "Full GIN index support"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between JSON and JSONB in PostgreSQL?", answer: "JSON stores an exact text copy requiring re-parsing on every query. JSONB stores data in a decomposed binary format, enabling faster query processing and GIN index support." }
    ],
    practiceProblem: {
      description: "Write SQL querying JSONB column for key status = active.",
      starterCode: `SELECT * FROM users WHERE info @> '{"status": "active"}';`,
      testAssertion: "true",
      solution: `SELECT * FROM users WHERE info @> '{"status": "active"}';`
    },
    quickRevision: "★ Use JSONB for binary JSON document storage.\n★ Use @> operator for JSONB containment searches.\n★ JSONB supports GIN indexes."
  }),

  // 3. ADVANCED SQL & QUERIES
  "postgres-queries": createTopicSchema({
    id: "postgres-queries",
    techId: "postgresql",
    title: "Postgres SQL Power Queries: COALESCE, CASE & Array Functions",
    category: "Postgres Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["postgres-datatypes"],
    definition: "Postgres provides expressive SQL function extensions such as COALESCE (first non-null value), CASE conditional expressions, and array manipulation utilities (unnest, array_agg).",
    simpleExplanation: "COALESCE provides fallback values for NULLs, while unnest and array_agg transform arrays to rows and back.",
    whyDoesItExist: "Simplifies complex data transformations directly inside database queries.",
    basicExample: `SELECT 
    name, 
    COALESCE(phone, mobile, 'No Phone') AS contact_number,
    CASE 
        WHEN status = 1 THEN 'Active'
        ELSE 'Inactive'
    END AS status_label
FROM contacts;`,
    howItWorks: [
      "1. COALESCE evaluates arguments left-to-right returning first non-null value.",
      "2. array_agg aggregates query row values into a single Postgres Array.",
      "3. unnest expands a Postgres Array into a vertical resultset of individual rows."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Rows -&gt; array_agg() -&gt; Array [1,2,3] -&gt; unnest() -&gt; Rows</text></svg>`,
    realWorldExample: `SELECT user_id, array_agg(role) AS user_roles
FROM user_roles_table
GROUP BY user_id;`,
    commonUseCases: [
      "Providing fallback values for missing/null columns using COALESCE",
      "Aggregating related rows into arrays using array_agg",
      "Expanding array elements into separate query rows using unnest"
    ],
    commonMistakes: [
      "Passing non-matching data types to COALESCE",
      "Forgetting GROUP BY when using array_agg"
    ],
    bestPractices: [
      "Use COALESCE for clean NULL handling",
      "Use array_agg for lightweight row aggregation without multiple joins"
    ],
    whenToUse: ["In all complex SQL data transformations"],
    whenNotToUse: ["When simple standard SQL functions suffice"],
    relatedConcepts: ["COALESCE", "CASE", "array_agg", "unnest"],
    comparison: {
      title: "array_agg vs unnest",
      headers: ["Function", "Input", "Output"],
      rows: [
        ["array_agg(val)", "Multiple Query Rows", "Single Array [val1, val2]"],
        ["unnest(array)", "Single Array [val1, val2]", "Multiple Query Rows"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What does COALESCE do in PostgreSQL?", answer: "COALESCE evaluates its arguments in order from left to right and returns the first non-NULL value encountered." }
    ],
    practiceProblem: {
      description: "Write SQL using COALESCE for fallback email.",
      starterCode: `SELECT COALESCE(email, 'no-email') FROM users;`,
      testAssertion: "true",
      solution: `SELECT COALESCE(email, 'no-email') FROM users;`
    },
    quickRevision: "★ COALESCE returns first non-null argument.\n★ array_agg bundles rows into an array.\n★ unnest expands an array into rows."
  }),

  // 4. WINDOW FUNCTIONS
  "postgres-window-functions": createTopicSchema({
    id: "postgres-window-functions",
    techId: "postgresql",
    title: "Postgres Window Functions (OVER, PARTITION BY, RANK)",
    category: "Advanced SQL",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["postgres-queries"],
    definition: "Window functions perform calculations across a set of table rows related to the current row without collapsing rows into a single summary output like GROUP BY.",
    simpleExplanation: "Window functions calculate running totals, rankings, and moving averages while preserving every individual row in the output.",
    whyDoesItExist: "Eliminates complex self-joins and temporary tables for analytical rank and running total queries.",
    basicExample: `SELECT 
    department,
    employee_name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    SUM(salary) OVER (PARTITION BY department) as dept_total_salary
FROM employees;`,
    howItWorks: [
      "1. Query evaluates WHERE and GROUP BY filters first.",
      "2. OVER(PARTITION BY ...) divides resultset into independent window partitions.",
      "3. Window function (ROW_NUMBER, RANK, LEAD, LAG) computes value per row within partition."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="350" y="95" fill="#fbbf24" font-weight="bold" text-anchor="middle">OVER(PARTITION BY dept ORDER BY salary) -&gt; Per-Row Window Rank</text></svg>`,
    realWorldExample: `SELECT 
    order_date,
    amount,
    LEAD(amount, 1) OVER (ORDER BY order_date) AS next_order_amount,
    LAG(amount, 1) OVER (ORDER BY order_date) AS prev_order_amount
FROM sales;`,
    commonUseCases: [
      "Ranking employees or products within categories (RANK(), DENSE_RANK())",
      "Calculating cumulative running totals (SUM() OVER (...))",
      "Accessing previous or next row values (LAG(), LEAD())"
    ],
    commonMistakes: [
      "Confusing RANK() (leaves gaps after ties: 1, 2, 2, 4) with DENSE_RANK() (no gaps: 1, 2, 2, 3)",
      "Trying to use Window Functions inside WHERE clause (use a Subquery or CTE instead)"
    ],
    bestPractices: [
      "Use CTEs when filtering by Window Function outputs (e.g. WHERE dept_rank = 1)",
      "Specify explicit ORDER BY inside OVER() for deterministic rankings"
    ],
    whenToUse: ["In all reporting, analytics, running totals, and ranking queries"],
    whenNotToUse: ["Do not use window functions when a simple GROUP BY summary suffices"],
    relatedConcepts: ["OVER()", "PARTITION BY", "RANK()", "LEAD() and LAG()"],
    comparison: {
      title: "ROW_NUMBER vs RANK vs DENSE_RANK",
      headers: ["Function", "Tie Handling", "Example Sequence (Ties at 2nd)"],
      rows: [
        ["ROW_NUMBER()", "Unique sequential number per row", "1, 2, 3, 4"],
        ["RANK()", "Gives same rank, skips next numbers", "1, 2, 2, 4"],
        ["DENSE_RANK()", "Gives same rank, no gaps", "1, 2, 2, 3"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between RANK() and DENSE_RANK() in PostgreSQL?", answer: "RANK() leaves gaps in the ranking sequence after ties (e.g., 1, 2, 2, 4). DENSE_RANK() does not leave gaps (e.g., 1, 2, 2, 3)." }
    ],
    practiceProblem: {
      description: "Write window function assigning row numbers ordered by date.",
      starterCode: `SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) FROM orders;`,
      testAssertion: "true",
      solution: `SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) FROM orders;`
    },
    quickRevision: "★ Window functions keep individual rows intact.\n★ PARTITION BY groups rows into window partitions.\n★ LAG/LEAD inspect previous/next row values."
  }),

  // 5. RECURSIVE CTES
  "postgres-recursive-cte": createTopicSchema({
    id: "postgres-recursive-cte",
    techId: "postgresql",
    title: "Postgres Recursive CTEs (Hierarchical Data Traversal)",
    category: "Advanced SQL",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["postgres-window-functions"],
    definition: "WITH RECURSIVE allows queries to iterate over hierarchical data structures (org charts, category trees, bill-of-materials) until a termination condition is met.",
    simpleExplanation: "Recursive CTEs let you traverse parent-child tree data (like organizational employee charts or nested folder structures).",
    whyDoesItExist: "Replaces procedural loops with set-based SQL queries for tree and graph data.",
    basicExample: `WITH RECURSIVE OrgChart AS (
    -- Anchor Member: Find Top Manager
    SELECT id, name, manager_id, 1 AS depth
    FROM employees WHERE manager_id IS NULL

    UNION ALL

    -- Recursive Member: Join Subordinates
    SELECT e.id, e.name, e.manager_id, o.depth + 1
    FROM employees e
    JOIN OrgChart o ON e.manager_id = o.id
)
SELECT * FROM OrgChart;`,
    howItWorks: [
      "1. Anchor member query executes first creating base resultset.",
      "2. Recursive member query executes iteratively on previous iteration's resultset.",
      "3. Recursion stops automatically when recursive query returns an empty set."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Anchor Query -&gt; Iterative Recursive Join -&gt; Tree Traversal Complete</text></svg>`,
    realWorldExample: `WITH RECURSIVE CategoryTree AS (
    SELECT id, name, parent_id FROM categories WHERE id = 10
    UNION ALL
    SELECT c.id, c.name, c.parent_id FROM categories c JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT * FROM CategoryTree;`,
    commonUseCases: [
      "Traversing organizational employee hierarchies",
      "Fetching multi-level e-commerce product category trees",
      "Graph pathfinding and dependency graph traversal"
    ],
    commonMistakes: [
      "Creating infinite loops in cyclic graph data (use UNION instead of UNION ALL or track visited IDs)",
      "Forgetting the termination condition in the recursive member"
    ],
    bestPractices: [
      "Use UNION (removes duplicate rows) if graph data contains cycles",
      "Include a depth limit counter (WHERE depth < 100) to prevent infinite loops"
    ],
    whenToUse: ["When querying hierarchical parent-child data structures"],
    whenNotToUse: ["Do not use recursive CTEs for flat non-hierarchical queries"],
    relatedConcepts: ["WITH RECURSIVE", "Anchor Member", "Recursive Member", "Tree Traversal"],
    comparison: {
      title: "Standard CTE vs Recursive CTE",
      headers: ["Feature", "Standard CTE (WITH)", "Recursive CTE (WITH RECURSIVE)"],
      rows: [
        ["Execution", "Evaluates once", "Evaluates iteratively until empty set returned"],
        ["Structure", "Single SELECT query", "Anchor query UNION ALL Recursive query"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you prevent infinite loops in a PostgreSQL WITH RECURSIVE query?", answer: "Prevent infinite loops by adding a max depth boundary (WHERE depth < 50), using UNION instead of UNION ALL to discard duplicate rows, or tracking an array of visited IDs." }
    ],
    practiceProblem: {
      description: "Write WITH RECURSIVE anchor query line.",
      starterCode: `WITH RECURSIVE NumberSeq AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM NumberSeq WHERE n < 10) SELECT * FROM NumberSeq;`,
      testAssertion: "true",
      solution: `WITH RECURSIVE NumberSeq AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM NumberSeq WHERE n < 10) SELECT * FROM NumberSeq;`
    },
    quickRevision: "★ WITH RECURSIVE traverses hierarchical tree data.\n★ Combines Anchor Member and Recursive Member.\n★ Always guard against infinite loop cycles."
  }),

  // 6. ADVANCED INDEX TYPES
  "postgres-indexes": createTopicSchema({
    id: "postgres-indexes",
    techId: "postgresql",
    title: "Postgres Index Types: B-Tree, GIN, GiST, BRIN & Partial Indexes",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["postgres-recursive-cte"],
    definition: "Postgres supports multiple specialized index structures: B-Tree (standard equality/range), GIN (Generalized Inverted Index for JSONB/Arrays), GiST (Geospatial/PostGIS), BRIN (Block Range Index for massive time-series tables), and Partial Indexes.",
    simpleExplanation: "GIN indexes search inside JSONB and Arrays instantly. BRIN indexes provide tiny footprint indexing for multi-gigabyte time-series logs.",
    whyDoesItExist: "Provides optimal search data structures tailored to specific data types (JSONB, GIS, Time-Series).",
    basicExample: `-- GIN Index for JSONB / Array searching
CREATE INDEX idx_orders_metadata_gin ON orders USING GIN (metadata);

-- Partial Index (Indexes ONLY active rows - Tiny size!)
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- BRIN Index for massive time-series tables
CREATE INDEX idx_logs_created_brin ON audit_logs USING BRIN (created_at);`,
    howItWorks: [
      "1. GIN index maps individual JSONB keys/values to matching heap row pointers.",
      "2. BRIN index stores min/max column values per 128KB block range of pages.",
      "3. Partial index indexes only a subset of table rows satisfying WHERE condition."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">GIN Index (JSONB Keys) | BRIN Index (Block Min/Max) | Partial Index (WHERE)</text></svg>`,
    realWorldExample: `CREATE INDEX idx_products_tags_gin ON products USING GIN (tags);
SELECT * FROM products WHERE tags @> ARRAY['electronics'];`,
    commonUseCases: [
      "Indexing JSONB documents and array columns with GIN",
      "Indexing active records efficiently using Partial Indexes",
      "Indexing time-series log tables using ultra-compact BRIN indexes"
    ],
    commonMistakes: [
      "Using standard B-Tree indexes on JSONB containment queries (GIN is required)",
      "Creating full indexes when Partial Indexes (WHERE status = 'active') would save 90% disk space"
    ],
    bestPractices: [
      "Use GIN indexes for JSONB and Array columns",
      "Use Partial Indexes when querying specific constant sub-states (e.g. status = 'pending')"
    ],
    whenToUse: ["When optimizing queries on JSONB, time-series, or filtered subsets"],
    whenNotToUse: ["Do not use GIN on plain integer columns (B-Tree is faster)"],
    relatedConcepts: ["GIN Index", "BRIN Index", "Partial Index", "B-Tree"],
    comparison: {
      title: "GIN vs BRIN vs B-Tree Index",
      headers: ["Index Type", "Best Used For", "Index RAM Size"],
      rows: [
        ["B-Tree", "Standard scalar equality & range queries", "Medium"],
        ["GIN", "JSONB containment & Array searching", "Large"],
        ["BRIN", "Massive append-only time-series tables", "Ultra Tiny (1% size of B-Tree)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Partial Index in PostgreSQL and what are its benefits?", answer: "A Partial Index is an index built over a subset of a table defined by a WHERE clause (e.g., WHERE status = 'pending'). Benefits include smaller index size, lower maintenance overhead on writes, and faster lookup speeds." }
    ],
    practiceProblem: {
      description: "Write Partial Index SQL for active users.",
      starterCode: `CREATE INDEX idx_active ON users(id) WHERE active = true;`,
      testAssertion: "true",
      solution: `CREATE INDEX idx_active ON users(id) WHERE active = true;`
    },
    quickRevision: "★ GIN indexes search JSONB & Arrays.\n★ BRIN provides tiny indexes for time-series tables.\n★ Partial Indexes index specific row subsets."
  }),

  // 7. MVCC & CONCURRENCY
  "postgres-mvcc": createTopicSchema({
    id: "postgres-mvcc",
    techId: "postgresql",
    title: "Postgres MVCC & Multi-Version Concurrency Control",
    category: "Transactions",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["postgres-indexes"],
    definition: "Multi-Version Concurrency Control (MVCC) enables concurrent reads and writes in Postgres by creating data row versions (xmin, xmax hidden columns) so readers never block writers and writers never block readers.",
    simpleExplanation: "MVCC means reading queries never get blocked by writing queries because readers inspect historical row snapshots.",
    whyDoesItExist: "Achieves high-concurrency database throughput without coarse read locking.",
    basicExample: `-- Inserts and updates write new row versions with xmin/xmax IDs
SELECT xmin, xmax, ctid, * FROM users WHERE id = 1;`,
    howItWorks: [
      "1. UPDATE creates a NEW version tuple of the row on table page with current transaction xmin ID.",
      "2. Old row tuple xmax field is marked with updating transaction ID.",
      "3. Readers inspect snapshot visibility based on transaction ID; VACUUM cleans up dead tuples later."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Row Update -&gt; New Tuple Version (xmin) -&gt; Old Tuple Marked Dead (xmax) -&gt; VACUUM</text></svg>`,
    realWorldExample: `SELECT * FROM accounts WHERE id = 10 FOR UPDATE; -- Explicit Row Lock for pessimistic concurrency`,
    commonUseCases: [
      "Achieving high concurrent read/write transaction throughput",
      "Pessimistic row locking with SELECT ... FOR UPDATE",
      "Understanding table bloat caused by dead MVCC tuples"
    ],
    commonMistakes: [
      "Disabling Autovacuum leading to massive table bloat from uncleaned dead MVCC tuples",
      "Long-running transactions blocking dead tuple cleanup"
    ],
    bestPractices: [
      "Tune Autovacuum to run frequently on high-update tables",
      "Avoid long-running open transactions"
    ],
    whenToUse: ["In understanding Postgres transaction visibility and table bloat mechanics"],
    whenNotToUse: ["Do not disable MVCC (it is a core engine architecture)"],
    relatedConcepts: ["MVCC", "xmin and xmax", "Dead Tuples", "Autovacuum", "FOR UPDATE"],
    comparison: {
      title: "Lock-Based Concurrency vs MVCC",
      headers: ["Mechanism", "Reader/Writer Interaction", "Performance"],
      rows: [
        ["Lock-Based", "Writers block Readers; Readers block Writers", "High contention / Slow"],
        ["MVCC (Postgres)", "Readers NEVER block Writers; Writers NEVER block Readers", "High Concurrency / Fast"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How does MVCC work in PostgreSQL?", answer: "MVCC creates separate row versions (tuples) for updates and deletes using hidden xmin and xmax transaction headers. Readers see a consistent snapshot based on transaction IDs without locking writers." }
    ],
    practiceProblem: {
      description: "Write SQL querying hidden xmin column.",
      starterCode: `SELECT xmin, * FROM users WHERE id = 1;`,
      testAssertion: "true",
      solution: `SELECT xmin, * FROM users WHERE id = 1;`
    },
    quickRevision: "★ MVCC: Readers never block writers, writers never block readers.\n★ Updates create NEW row version tuples.\n★ Autovacuum cleans up dead tuples."
  }),

  // 8. TABLE PARTITIONING
  "postgres-partitioning": createTopicSchema({
    id: "postgres-partitioning",
    techId: "postgresql",
    title: "Postgres Table Partitioning (Range, List & Hash)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["postgres-mvcc"],
    definition: "Declarative Table Partitioning splits a large logical table into smaller physical partition tables by Range (dates), List (categories), or Hash (IDs) to improve query speed and maintenance.",
    simpleExplanation: "Partitioning divides a 1-billion-row log table into monthly sub-tables, enabling Partition Pruning so queries skip irrelevant months entirely.",
    whyDoesItExist: "Speeds up queries on massive tables and allows instant data drops via DROP TABLE partition.",
    basicExample: `-- Parent Partitioned Table
CREATE TABLE measurement (
    city_id INT NOT NULL,
    log_date DATE NOT NULL,
    temp INT
) PARTITION BY RANGE (log_date);

-- Child Partition for 2026
CREATE TABLE measurement_y2026 PARTITION OF measurement
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');`,
    howItWorks: [
      "1. Query arrives filtering by partition key (WHERE log_date = '2026-05-10').",
      "2. Partition Pruning automatically skips inspecting non-matching child tables.",
      "3. Query scans ONLY the target 2026 partition table."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Logical Parent Table -&gt; Partition Pruning -&gt; Scans ONLY Partition 2026</text></svg>`,
    realWorldExample: `DROP TABLE measurement_y2020; -- Instant drop of 100M rows without DELETE locking overhead!`,
    commonUseCases: [
      "Managing massive multi-gigabyte time-series event and audit logs",
      "Dropping old historical data instantly using DROP TABLE partition",
      "Improving query speeds with Partition Pruning"
    ],
    commonMistakes: [
      "Not including the partition key in primary/unique key constraints",
      "Creating thousands of tiny partitions causing query planning overhead"
    ],
    bestPractices: [
      "Include partition key in unique constraints",
      "Enable enable_partition_pruning = on (default)"
    ],
    whenToUse: ["On large tables exceeding physical RAM size (typically > 100GB or 100M rows)"],
    whenNotToUse: ["Do not partition small tables under 10GB"],
    relatedConcepts: ["Declarative Partitioning", "Partition Pruning", "Range Partitioning"],
    comparison: {
      title: "DELETE vs DROP Partition",
      headers: ["Action", "Execution Speed", "System Overhead"],
      rows: [
        ["DELETE FROM table WHERE date < 2020", "Slow (Generates dead tuples & WAL logs)", "Heavy CPU & Disk I/O"],
        ["DROP TABLE logs_y2020", "Instant (Sub-second file drop)", "Zero WAL & vacuum overhead"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Partition Pruning in PostgreSQL?", answer: "Partition Pruning is a query optimization technique where the query planner analyzes WHERE clauses on partition keys and skips scanning child partitions that cannot contain matching data." }
    ],
    practiceProblem: {
      description: "Write SQL creating range partitioned table.",
      starterCode: `CREATE TABLE sales (id INT, sale_date DATE) PARTITION BY RANGE (sale_date);`,
      testAssertion: "true",
      solution: `CREATE TABLE sales (id INT, sale_date DATE) PARTITION BY RANGE (sale_date);`
    },
    quickRevision: "★ Declarative Partitioning splits large tables into sub-tables.\n★ Partition Pruning skips scanning non-matching partitions.\n★ Drop old data instantly via DROP TABLE partition."
  }),

  // 9. FULL-TEXT SEARCH & EXTENSIONS
  "postgres-extensions": createTopicSchema({
    id: "postgres-extensions",
    techId: "postgresql",
    title: "Postgres Full-Text Search, pg_trgm & PostGIS Extensions",
    category: "Postgres Core",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["postgres-partitioning"],
    definition: "PostgreSQL provides built-in Full-Text Search (tsvector, tsquery), fuzzy trigram matching via pg_trgm extension, and spatial GIS capabilities via the PostGIS extension.",
    simpleExplanation: "Postgres has built-in search engine capabilities (like Elasticsearch) for text search and fuzzy matching using extensions.",
    whyDoesItExist: "Eliminates the need for separate search engine infrastructure (Elasticsearch) for moderate search requirements.",
    basicExample: `-- Full-Text Search using tsvector and tsquery
SELECT title, ts_rank(to_tsvector('english', title), query) AS rank
FROM articles, to_tsquery('english', 'database & performance') query
WHERE to_tsvector('english', title) @@ query
ORDER BY rank DESC;`,
    howItWorks: [
      "1. to_tsvector parses text into stemmed lexemes (words).",
      "2. @@ operator matches lexemes against to_tsquery expression.",
      "3. GIN index accelerates text match lookups."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Text -&gt; to_tsvector Lexemes -&gt; GIN Index -&gt; Ranked Results</text></svg>`,
    realWorldExample: `CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_users_name_trgm ON users USING GIN (name gin_trgm_ops);
SELECT * FROM users WHERE name % 'Tusar'; -- Fuzzy match!`,
    commonUseCases: [
      "Building full-text search engines inside Postgres",
      "Fuzzy string matching and auto-complete search with pg_trgm",
      "Geospatial location queries with PostGIS (ST_Distance)"
    ],
    commonMistakes: [
      "Using LIKE '%keyword%' (causes slow full table scans; use pg_trgm or tsvector instead)",
      "Forgetting to create GIN indexes on tsvector columns"
    ],
    bestPractices: [
      "Store pre-computed tsvector columns for fast full-text searching",
      "Use pg_trgm extension for fuzzy autocomplete search"
    ],
    whenToUse: ["When adding search or spatial features without deploying Elasticsearch"],
    whenNotToUse: ["When building multi-petabyte distributed search engines requiring complex relevance scoring"],
    relatedConcepts: ["tsvector", "tsquery", "pg_trgm", "PostGIS", "Fuzzy Search"],
    comparison: {
      title: "LIKE '%text%' vs Full-Text Search (tsvector)",
      headers: ["Search Method", "Execution Speed", "Stemming & Ranking"],
      rows: [
        ["LIKE '%text%'", "Slow (Full Table Scan)", "No stemming or relevance scoring"],
        ["tsvector + GIN Index", "Ultra Fast (Sub-ms index lookup)", "Supports word stemming and relevance ranking (ts_rank)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does Full-Text Search work in PostgreSQL?", answer: "Text is converted to a tsvector of stemmed lexemes (normalized words). Queries are parsed into a tsquery and matched using the @@ operator, accelerated by a GIN index." }
    ],
    practiceProblem: {
      description: "Write SQL enabling pg_trgm extension.",
      starterCode: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`,
      testAssertion: "true",
      solution: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`
    },
    quickRevision: "★ tsvector stores stemmed word lexemes.\n★ @@ matches tsvector with tsquery.\n★ pg_trgm provides fuzzy trigram searching."
  }),

  // 10. TUNING & VACUUM
  "postgres-tuning": createTopicSchema({
    id: "postgres-tuning",
    techId: "postgresql",
    title: "Postgres Performance Profiling, EXPLAIN & Autovacuum Tuning",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["postgres-extensions"],
    definition: "Performance profiling in Postgres analyzes query execution with EXPLAIN (ANALYZE, BUFFERS), tracks query stats with pg_stat_statements, and prevents table bloat by tuning Autovacuum parameters.",
    simpleExplanation: "EXPLAIN (ANALYZE, BUFFERS) shows exact query execution times and shared memory buffer hits, while Autovacuum cleans up dead MVCC tuples.",
    whyDoesItExist: "Identifies query bottlenecks, disk I/O bottlenecks, and table bloat.",
    basicExample: `-- Profile execution time and shared buffer hits
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.name, COUNT(o.id)
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id;`,
    howItWorks: [
      "1. EXPLAIN (ANALYZE, BUFFERS) executes query measuring exact node timing and memory buffer hits vs disk reads.",
      "2. Shared Read: Data page found in Postgres shared_buffers RAM memory.",
      "3. Read: Data page fetched from disk storage."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">EXPLAIN (BUFFERS) -&gt; Shared Hit (RAM) vs Read (Disk I/O)</text></svg>`,
    realWorldExample: `-- Finding top slow queries via pg_stat_statements
SELECT query, calls, total_exec_time, mean_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC LIMIT 5;`,
    commonUseCases: [
      "Analyzing query execution plans with EXPLAIN (ANALYZE, BUFFERS)",
      "Identifying top slow queries using pg_stat_statements extension",
      "Tuning autovacuum_vacuum_scale_factor to prevent table bloat"
    ],
    commonMistakes: [
      "Ignoring BUFFERS in EXPLAIN output (shared buffer hits vs disk reads are critical)",
      "Disabling autovacuum leading to catastrophic table bloat and query degradation"
    ],
    bestPractices: [
      "Always include BUFFERS when running EXPLAIN ANALYZE",
      "Enable pg_stat_statements in postgresql.conf for query profiling"
    ],
    whenToUse: ["When tuning Postgres database performance and diagnosing latency"],
    whenNotToUse: ["Do not run EXPLAIN ANALYZE on destructive queries in production"],
    relatedConcepts: ["EXPLAIN BUFFERS", "pg_stat_statements", "Autovacuum", "Table Bloat"],
    comparison: {
      title: "Shared Buffer Hit vs Disk Read",
      headers: ["Metric", "Shared Buffer Hit", "Disk Read"],
      rows: [
        ["Location", "PostgreSQL shared_buffers RAM", "OS Disk Storage / NVMe"],
        ["Latency", "Nanoseconds / Microseconds", "Milliseconds (Slow I/O)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is EXPLAIN (ANALYZE, BUFFERS) superior to standard EXPLAIN in PostgreSQL?", answer: "Standard EXPLAIN shows only estimated planner costs. EXPLAIN (ANALYZE, BUFFERS) actually executes the query, showing exact execution timing and shared_buffers RAM hits versus disk reads." }
    ],
    practiceProblem: {
      description: "Write EXPLAIN ANALYZE query with BUFFERS option.",
      starterCode: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users;`,
      testAssertion: "true",
      solution: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users;`
    },
    quickRevision: "★ EXPLAIN (ANALYZE, BUFFERS) shows RAM hits vs Disk reads.\n★ Use pg_stat_statements to track top slow queries.\n★ Autovacuum cleans up dead MVCC tuples."
  }),

  // 11. HIGH AVAILABILITY & PGBOUNCER
  "postgres-ha": createTopicSchema({
    id: "postgres-ha",
    techId: "postgresql",
    title: "Postgres High Availability, Streaming Replication & PgBouncer",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["postgres-tuning"],
    definition: "High Availability in Postgres utilizes Write-Ahead Logging (WAL) for Physical Streaming Replication, Patroni for automated failover, and PgBouncer for lightweight connection pooling.",
    simpleExplanation: "Streaming Replication streams WAL logs to standby replica nodes, while PgBouncer allows thousands of app connections using minimal RAM memory.",
    whyDoesItExist: "Guarantees high availability, automated failover, and high connection scalability.",
    basicExample: `; PgBouncer Configuration (pgbouncer.ini)
[databases]
mydatabase = host=127.0.0.1 port=5432 dbname=mydatabase

[pgbouncer]
pool_mode = transaction ; Transaction pooling mode!
max_client_conn = 5000
default_pool_size = 20`,
    howItWorks: [
      "1. Primary node writes committed transactions to Write-Ahead Log (WAL).",
      "2. WAL sender process streams WAL records over network to Standby node.",
      "3. Standby WAL receiver replays records maintaining exact physical byte replica."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Primary Node (WAL Sender) -&gt; Network -&gt; Standby Node (WAL Receiver)</text></svg>`,
    realWorldExample: `// Connecting application to PgBouncer pooler port 6432 instead of raw Postgres 5432
$db = new PDO("pgsql:host=localhost;port=6432;dbname=mydatabase", "user", "pass");`,
    commonUseCases: [
      "Scaling read traffic across Streaming Replication standby nodes",
      "Managing thousands of microservice client connections via PgBouncer",
      "Configuring automated failover using Patroni and etcd"
    ],
    commonMistakes: [
      "Connecting microservices directly to Postgres port 5432 without PgBouncer (causes memory exhaustion)",
      "Using Session Pooling in PgBouncer when Transaction Pooling is required"
    ],
    bestPractices: [
      "Use PgBouncer with transaction pooling mode in serverless/microservice environments",
      "Use Patroni for production HA failover orchestration"
    ],
    whenToUse: ["In all production PostgreSQL deployment architectures"],
    whenNotToUse: ["In single-node local development setups"],
    relatedConcepts: ["WAL", "Streaming Replication", "PgBouncer", "Patroni"],
    comparison: {
      title: "Raw Postgres vs PgBouncer Connection Handling",
      headers: ["Metric", "Raw Postgres Port (5432)", "PgBouncer Port (6432)"],
      rows: [
        ["Connection Model", "Forks 1 OS process per connection (~10MB RAM)", "Lightweight connection multiplexer"],
        ["Max Connections", "Typically 100 – 500 max", "10,000+ client connections with 20 DB connections"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is PgBouncer essential for serverless and microservice architectures connecting to PostgreSQL?", answer: "Because PostgreSQL uses a process-per-connection model where each connection consumes ~10MB RAM. PgBouncer acts as a lightweight proxy multiplexing thousands of client connections into a small pool of database connections." }
    ],
    practiceProblem: {
      description: "Write PgBouncer transaction pooling mode parameter.",
      starterCode: `pool_mode = transaction`,
      testAssertion: "true",
      solution: `pool_mode = transaction`
    },
    quickRevision: "★ WAL streams byte-for-byte physical replication to standby nodes.\n★ PgBouncer multiplexes thousands of client connections.\n★ Use Transaction Pooling mode for serverless apps."
  })
};
