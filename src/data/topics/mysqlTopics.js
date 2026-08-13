import { createTopicSchema } from './createTopicSchema.js';

export const mysqlTopics = {
  // 1. RELATIONAL DB CONCEPTS & SQL BASICS
  "mysql-basics": createTopicSchema({
    id: "mysql-basics",
    techId: "mysql",
    title: "Relational DB Concepts & SQL Basics",
    category: "SQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Database Fundamentals"],
    definition: "MySQL is an open-source Relational Database Management System (RDBMS) that stores structured data in tables consisting of rows and columns with strict schema definitions and primary/foreign key constraints.",
    simpleExplanation: "MySQL organizes data into spreadsheets-like tables with enforced column types and relationships between tables.",
    whyDoesItExist: "Provides reliable, ACID-compliant structured data persistence with powerful relational query capabilities.",
    basicExample: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    howItWorks: [
      "1. MySQL Parser verifies SQL query syntax and table existence.",
      "2. Optimizer chooses query execution plan (Index lookup vs Full Table Scan).",
      "3. InnoDB Storage Engine retrieves data pages from buffer pool RAM or disk storage."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">SQL Parser -&gt; Optimizer -&gt; InnoDB Engine (Buffer Pool RAM / Disk)</text></svg>`,
    realWorldExample: `SELECT id, name, email FROM users WHERE email = 'alice@example.com';`,
    commonUseCases: [
      "Storing structured relational application data (users, orders, invoices)",
      "Enforcing data integrity with primary and foreign keys",
      "Executing relational queries across multiple tables"
    ],
    commonMistakes: [
      "Not defining primary keys on tables causing slow InnoDB record lookups",
      "Using text data types for numbers or dates"
    ],
    bestPractices: [
      "Always define a primary key (e.g. AUTO_INCREMENT INT or UUID)",
      "Always specify appropriate data types (VARCHAR(length), INT, TIMESTAMP)"
    ],
    whenToUse: ["In relational web applications requiring ACID transaction integrity"],
    whenNotToUse: ["When storing unstructured schemaless JSON logs at petabyte scale"],
    relatedConcepts: ["RDBMS", "InnoDB", "Primary Key", "Foreign Key"],
    comparison: {
      title: "RDBMS vs NoSQL",
      headers: ["Aspect", "Relational Database (MySQL)", "NoSQL Database (MongoDB)"],
      rows: [
        ["Data Model", "Tables, Rows, Columns with fixed schema", "BSON Documents with dynamic schema"],
        ["ACID Compliance", "Strict ACID transactions", "Document-level or distributed transactions"],
        ["Query Language", "Standard SQL", "MQL (MongoDB Query Language)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the default storage engine in MySQL and why is it preferred over MyISAM?", answer: "InnoDB is the default storage engine. It is preferred over MyISAM because it supports ACID transactions, row-level locking, and foreign key constraints." }
    ],
    practiceProblem: {
      description: "Write SQL statement creating users table with id and name.",
      starterCode: `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));`,
      testAssertion: "true",
      solution: `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));`
    },
    quickRevision: "★ InnoDB is default storage engine.\n★ Supports ACID transactions & row-level locking.\n★ Enforce table schemas with Primary/Foreign Keys."
  }),

  // 2. DDL
  "mysql-ddl": createTopicSchema({
    id: "mysql-ddl",
    techId: "mysql",
    title: "Data Definition Language (DDL)",
    category: "SQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["mysql-basics"],
    definition: "Data Definition Language (DDL) includes commands (CREATE, ALTER, DROP, TRUNCATE) used to define and modify database schema structures.",
    simpleExplanation: "DDL commands build and alter the structure of database tables, columns, and indexes.",
    whyDoesItExist: "Allows developers to alter database schemas programmatically without destroying existing table data.",
    basicExample: `-- Adding a new column to existing table
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';

-- Truncate table (Faster than DELETE, resets AUTO_INCREMENT)
TRUNCATE TABLE logs;`,
    howItWorks: [
      "1. DDL statement acquires metadata lock on target database object.",
      "2. InnoDB updates system dictionary data tables.",
      "3. Changes committed permanently to database schema file."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">ALTER TABLE -&gt; Metadata Lock -&gt; Schema Dictionary Update</text></svg>`,
    realWorldExample: `ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;`,
    commonUseCases: [
      "Adding columns to existing database tables",
      "Adding foreign key constraints between tables",
      "Truncating temporary staging tables"
    ],
    commonMistakes: [
      "Confusing TRUNCATE (DDL, cannot rollback) with DELETE (DML, can rollback)",
      "Running blocking ALTER TABLE commands on large production tables during peak traffic"
    ],
    bestPractices: [
      "Use online DDL options (ALGORITHM=INPLACE) for zero-downtime alterations",
      "Test ALTER TABLE operations on staging environments first"
    ],
    whenToUse: ["When creating or modifying database schemas"],
    whenNotToUse: ["Do not use DDL statements inside high-frequency application query loops"],
    relatedConcepts: ["CREATE", "ALTER", "DROP", "TRUNCATE", "Metadata Lock"],
    comparison: {
      title: "TRUNCATE vs DELETE",
      headers: ["Command", "Type", "Execution Speed", "Rollback"],
      rows: [
        ["TRUNCATE", "DDL", "Ultra Fast (Drops and recreates table)", "Cannot be rolled back"],
        ["DELETE", "DML", "Slower (Deletes row-by-row logging undo logs)", "Can be rolled back inside transaction"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between TRUNCATE and DELETE in MySQL?", answer: "TRUNCATE is a DDL command that drops and recreates the table, resetting auto-increment counters and executing instantly without logging individual row deletes. DELETE is a DML command that deletes rows one-by-one logging undo records." }
    ],
    practiceProblem: {
      description: "Write SQL to add status column to users table.",
      starterCode: `ALTER TABLE users ADD COLUMN status VARCHAR(20);`,
      testAssertion: "true",
      solution: `ALTER TABLE users ADD COLUMN status VARCHAR(20);`
    },
    quickRevision: "★ DDL commands (CREATE, ALTER, DROP, TRUNCATE) define schemas.\n★ TRUNCATE is faster than DELETE and resets AUTO_INCREMENT.\n★ ALTER TABLE acquires metadata locks."
  }),

  // 3. DML
  "mysql-dml": createTopicSchema({
    id: "mysql-dml",
    techId: "mysql",
    title: "Data Manipulation Language (DML)",
    category: "SQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["mysql-ddl"],
    definition: "Data Manipulation Language (DML) consists of statements (SELECT, INSERT, UPDATE, DELETE) used to query and modify table rows.",
    simpleExplanation: "DML commands handle CRUD operations on actual data rows within database tables.",
    whyDoesItExist: "Allows web applications to insert, retrieve, modify, and delete user records dynamically.",
    basicExample: `-- Insert record
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Update record
UPDATE users SET status = 'premium' WHERE id = 1;

-- Delete record
DELETE FROM users WHERE status = 'inactive';`,
    howItWorks: [
      "1. DML write commands acquire row-level locks in InnoDB.",
      "2. Previous values written to Undo Log (enabling transaction rollback).",
      "3. New values written to Redo Log for durability before buffer flush."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">UPDATE -&gt; Row Lock -&gt; Undo Log -&gt; Redo Log -&gt; Commit</text></svg>`,
    realWorldExample: `INSERT INTO orders (user_id, total_amount) VALUES (10, 150.50) ON DUPLICATE KEY UPDATE total_amount = 150.50;`,
    commonUseCases: [
      "Executing CRUD operations inside backend API services",
      "Bulk inserting user records using multi-row INSERT statements",
      "Updating account balances atomically"
    ],
    commonMistakes: [
      "Executing UPDATE or DELETE statements without a WHERE clause (modifies ALL rows!)",
      "Inserting string values without escaping quotes leading to SQL injection"
    ],
    bestPractices: [
      "Always include explicit WHERE clauses on UPDATE and DELETE statements",
      "Use parameterized prepared statements for all DML operations containing user input"
    ],
    whenToUse: ["In all application database read/write queries"],
    whenNotToUse: ["Do not use raw DML strings with un-escaped user inputs"],
    relatedConcepts: ["INSERT", "UPDATE", "DELETE", "SELECT", "Undo Log"],
    comparison: {
      title: "INSERT vs INSERT ON DUPLICATE KEY UPDATE",
      headers: ["Command", "Duplicate Behavior", "Use Case"],
      rows: [
        ["INSERT INTO", "Throws Duplicate Key Error", "Standard new row creation"],
        ["ON DUPLICATE KEY UPDATE", "Updates existing row if unique key exists", "Upsert operations"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What happens if you run UPDATE users SET status = 'active' without a WHERE clause?", answer: "Without a WHERE clause, MySQL will update the status column for EVERY single row in the users table." }
    ],
    practiceProblem: {
      description: "Write SQL to update user email where id is 5.",
      starterCode: `UPDATE users SET email = 'new@example.com' WHERE id = 5;`,
      testAssertion: "true",
      solution: `UPDATE users SET email = 'new@example.com' WHERE id = 5;`
    },
    quickRevision: "★ DML statements: SELECT, INSERT, UPDATE, DELETE.\n★ ALWAYS specify WHERE clause on UPDATE/DELETE.\n★ Use ON DUPLICATE KEY UPDATE for upserts."
  }),

  // 4. AGGREGATIONS & GROUPING
  "mysql-aggregations": createTopicSchema({
    id: "mysql-aggregations",
    techId: "mysql",
    title: "SQL Aggregations, GROUP BY & HAVING Clause",
    category: "SQL Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["mysql-dml"],
    definition: "Aggregate functions (COUNT, SUM, AVG, MIN, MAX) compute summary values over groups of rows specified by GROUP BY, filtered using the HAVING clause.",
    simpleExplanation: "GROUP BY summarizes rows into categories (e.g. total sales per customer), while HAVING filters aggregated results.",
    whyDoesItExist: "Enables analytical reporting, totals, averages, and group metrics from database records.",
    basicExample: `SELECT user_id, COUNT(*) AS total_orders, SUM(total_amount) AS revenue
FROM orders
GROUP BY user_id
HAVING SUM(total_amount) > 1000;`,
    howItWorks: [
      "1. WHERE clause filters raw rows before aggregation.",
      "2. GROUP BY groups remaining rows into temporary bucket data structures.",
      "3. Aggregate functions compute totals; HAVING clause filters aggregated groups."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="350" y="95" fill="#fbbf24" font-weight="bold" text-anchor="middle">FROM -&gt; WHERE Filter -&gt; GROUP BY Buckets -&gt; HAVING Filter</text></svg>`,
    realWorldExample: `SELECT DATE(created_at) AS order_date, COUNT(*) AS daily_orders
FROM orders
WHERE created_at >= NOW() - INTERVAL 30 DAY
GROUP BY DATE(created_at);`,
    commonUseCases: [
      "Calculating monthly revenue reports and metrics dashboards",
      "Finding top customers with highest total spending",
      "Counting occurrences of categorizable events"
    ],
    commonMistakes: [
      "Trying to filter aggregate function results inside the WHERE clause (use HAVING instead)",
      "Selecting un-aggregated non-GROUP BY columns in SQL strict mode"
    ],
    bestPractices: [
      "Filter raw rows with WHERE first to reduce dataset size before GROUP BY",
      "Use HAVING strictly for filtering aggregate totals (SUM, COUNT)"
    ],
    whenToUse: ["In all reporting, data analytics, and dashboard metrics queries"],
    whenNotToUse: ["When fetching single raw user profiles"],
    relatedConcepts: ["GROUP BY", "HAVING", "COUNT", "SUM", "AVG"],
    comparison: {
      title: "WHERE vs HAVING",
      headers: ["Clause", "Filtering Target", "Execution Order"],
      rows: [
        ["WHERE", "Filters raw individual table rows", "Executes BEFORE GROUP BY"],
        ["HAVING", "Filters aggregated group summaries", "Executes AFTER GROUP BY"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between WHERE and HAVING in SQL?", answer: "WHERE filters raw individual table rows BEFORE aggregation occurs. HAVING filters aggregated group totals AFTER the GROUP BY clause has processed rows." }
    ],
    practiceProblem: {
      description: "Write SQL finding total order count grouped by status.",
      starterCode: `SELECT status, COUNT(*) FROM orders GROUP BY status;`,
      testAssertion: "true",
      solution: `SELECT status, COUNT(*) FROM orders GROUP BY status;`
    },
    quickRevision: "★ WHERE filters rows BEFORE GROUP BY.\n★ HAVING filters aggregate results AFTER GROUP BY.\n★ Aggregate functions: COUNT, SUM, AVG, MIN, MAX."
  }),

  // 5. JOINS
  "mysql-joins": createTopicSchema({
    id: "mysql-joins",
    techId: "mysql",
    title: "SQL JOIN Operations (INNER, LEFT, RIGHT, CROSS & SELF JOIN)",
    category: "SQL Queries",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["mysql-aggregations"],
    definition: "JOIN clauses combine columns from two or more tables based on a related key column between them (INNER JOIN, LEFT JOIN, RIGHT JOIN, CROSS JOIN, SELF JOIN).",
    simpleExplanation: "JOINs connect data across multiple relational tables (e.g. combining orders with user names).",
    whyDoesItExist: "Allows normalized relational database tables to be queried together seamlessly.",
    basicExample: `SELECT users.name, orders.id AS order_id, orders.total_amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE users.status = 'active';`,
    howItWorks: [
      "1. MySQL Optimizer evaluates join order choosing smallest driving table.",
      "2. Uses Indexed Nested Loop Join or Hash Join algorithm.",
      "3. Matches rows satisfying ON key condition and builds output recordset."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">Table A -- [ON Key Match] -- Table B -&gt; Joined Resultset</text></svg>`,
    realWorldExample: `SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;`,
    commonUseCases: [
      "Combining customer profile details with order histories",
      "Finding users with zero orders using LEFT JOIN ... WHERE order.id IS NULL",
      "Building multi-table e-commerce data queries"
    ],
    commonMistakes: [
      "Forgetting to index foreign key columns used in ON join conditions causing full table scans",
      "Using CROSS JOIN accidentally without ON condition generating Cartesian explosion"
    ],
    bestPractices: [
      "Always create indexes on foreign key join columns (e.g. orders.user_id)",
      "Use table aliases (u for users, o for orders) for cleaner query readability"
    ],
    whenToUse: ["In all relational queries combining data across 2+ tables"],
    whenNotToUse: ["Avoid joining 10+ tables in a single query; consider denormalizing or query splitting"],
    relatedConcepts: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "Nested Loop Join"],
    comparison: {
      title: "INNER JOIN vs LEFT JOIN",
      headers: ["JOIN Type", "Matching Rows", "Unmatched Rows"],
      rows: [
        ["INNER JOIN", "Returns ONLY rows that match ON condition in BOTH tables", "Excluded"],
        ["LEFT JOIN", "Returns ALL rows from Left table + matching Right table rows", "Right table columns populated as NULL"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you find users who have never placed an order using SQL JOIN?", answer: "Use a LEFT JOIN from users to orders on user.id = orders.user_id, and filter for WHERE orders.id IS NULL." }
    ],
    practiceProblem: {
      description: "Write SQL INNER JOIN connecting users and orders.",
      starterCode: `SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;`,
      testAssertion: "true",
      solution: `SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;`
    },
    quickRevision: "★ INNER JOIN returns matching rows in both tables.\n★ LEFT JOIN returns ALL left rows + matching right rows.\n★ Index foreign keys used in ON conditions."
  }),

  // 6. SUBQUERIES & CTES
  "mysql-subqueries-cte": createTopicSchema({
    id: "mysql-subqueries-cte",
    techId: "mysql",
    title: "Subqueries, CTEs (WITH Clause) & Correlated Queries",
    category: "SQL Queries",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["mysql-joins"],
    definition: "Subqueries are queries nested inside another query, while Common Table Expressions (CTEs) define temporary named result sets using the WITH clause for clean modular SQL.",
    simpleExplanation: "CTEs let you break long, complex SQL queries into clean, named sub-steps using WITH cte_name AS (...).",
    whyDoesItExist: "Replaces unreadable deeply nested subqueries with clean, modular, reusable CTE queries.",
    basicExample: `-- Common Table Expression (CTE) in MySQL 8+
WITH HighValueUsers AS (
    SELECT user_id, SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total_amount) > 5000
)
SELECT u.name, h.total_spent
FROM users u
JOIN HighValueUsers h ON u.id = h.user_id;`,
    howItWorks: [
      "1. CTE query runs and materializes named temporary resultset in memory.",
      "2. Primary query references CTE name as if it were a standard table.",
      "3. Optimizer merges or evaluates CTE resultset efficiently."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">WITH CTE_Name AS () -&gt; Main Query References CTE</text></svg>`,
    realWorldExample: `SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE total_amount > 1000);`,
    commonUseCases: [
      "Structuring long analytical queries with CTE WITH clause",
      "Filtering records using subqueries (WHERE id IN (...))",
      "Traversing hierarchical tree structures using WITH RECURSIVE"
    ],
    commonMistakes: [
      "Using Correlated Subqueries that re-execute per row for millions of records (use JOIN instead)",
      "Expecting subqueries inside WHERE IN to handle null values properly without care"
    ],
    bestPractices: [
      "Prefer CTEs (WITH clause) over deeply nested subqueries in MySQL 8+",
      "Use EXISTS instead of IN when checking subquery existence"
    ],
    whenToUse: ["In complex multi-step data transformation queries"],
    whenNotToUse: ["Do not use correlated subqueries when a simple JOIN executes faster"],
    relatedConcepts: ["CTE", "WITH Clause", "Correlated Subquery", "EXISTS vs IN"],
    comparison: {
      title: "EXISTS vs IN Subquery",
      headers: ["Operator", "Execution Mechanism", "Best Used For"],
      rows: [
        ["EXISTS", "Short-circuits on first matching row", "Subqueries checking existence"],
        ["IN", "Evaluates full list of values", "Small explicit value lists"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Common Table Expression (CTE) and why is it preferred over nested subqueries?", answer: "A CTE is a temporary named result set defined using the WITH clause. It is preferred because it improves query readability, allows modular step-by-step query construction, and can be referenced multiple times." }
    ],
    practiceProblem: {
      description: "Write a simple WITH CTE query structure.",
      starterCode: `WITH RecentUsers AS (SELECT * FROM users WHERE created_at > '2026-01-01') SELECT * FROM RecentUsers;`,
      testAssertion: "true",
      solution: `WITH RecentUsers AS (SELECT * FROM users WHERE created_at > '2026-01-01') SELECT * FROM RecentUsers;`
    },
    quickRevision: "★ CTEs (WITH clause) make complex SQL modular & readable.\n★ EXISTS short-circuits faster than IN for existence checks.\n★ Avoid Correlated Subqueries on large datasets."
  }),

  // 7. INDEXING
  "mysql-indexes": createTopicSchema({
    id: "mysql-indexes",
    techId: "mysql",
    title: "MySQL Indexing Strategies (B-Tree, Composite & Covering Indexes)",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["mysql-subqueries-cte"],
    definition: "Indexes are B-Tree data structures that speed up query data retrieval at the cost of write performance and extra disk storage. Types include Primary, Unique, Composite, and Covering indexes.",
    simpleExplanation: "An index is like a book index. It allows MySQL to find target rows instantly without scanning every page (Full Table Scan).",
    whyDoesItExist: "Reduces query execution times from seconds to milliseconds on large datasets.",
    basicExample: `-- Composite Index (Column order matters!)
CREATE INDEX idx_user_status_date ON orders(user_id, status, created_at);

-- Query utilizing Covering Index (No table lookup needed!)
SELECT user_id, status, created_at FROM orders WHERE user_id = 10 AND status = 'completed';`,
    howItWorks: [
      "1. InnoDB maintains self-balancing B-Tree index structure on disk.",
      "2. WHERE query traverses B-Tree root -> branch -> leaf node in O(log N) operations.",
      "3. Covering Index supplies all requested SELECT columns directly from index node without table lookup."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">B-Tree Root Node -&gt; Branch Node -&gt; Leaf Node (O(log N) Instant Lookup)</text></svg>`,
    realWorldExample: `CREATE UNIQUE INDEX idx_user_email ON users(email);`,
    commonUseCases: [
      "Accelerating WHERE, JOIN ON, and ORDER BY queries",
      "Enforcing unique constraints with UNIQUE indexes",
      "Achieving zero-table-lookup speed with Covering Indexes"
    ],
    commonMistakes: [
      "Creating too many indexes (slows down INSERT/UPDATE/DELETE writes)",
      "Misunderstanding Composite Index column ordering (Leftmost Prefix Rule)",
      "Applying functions on indexed columns (e.g. WHERE YEAR(created_at) = 2026 prevents index usage!)"
    ],
    bestPractices: [
      "Follow Leftmost Prefix Rule for composite indexes (index cols used left-to-right)",
      "Never wrap indexed columns in SQL functions inside WHERE clauses"
    ],
    whenToUse: ["On frequently queried WHERE, JOIN, and ORDER BY columns in large tables"],
    whenNotToUse: ["Do not index tiny tables with fewer than 100 rows"],
    relatedConcepts: ["B-Tree", "Composite Index", "Covering Index", "Leftmost Prefix Rule"],
    comparison: {
      title: "Full Table Scan vs B-Tree Index Lookup",
      headers: ["Metric", "Full Table Scan", "B-Tree Index Lookup"],
      rows: [
        ["Time Complexity", "O(N) - Linear scan of all table rows", "O(log N) - Logarithmic tree lookup"],
        ["Performance", "Slow (Disk I/O heavy on large tables)", "Ultra Fast (Milliseconds)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the Leftmost Prefix Rule in MySQL Composite Indexes?", answer: "Composite indexes (a, b, c) can only be used by queries filtering on leftmost columns in sequence: (a), (a, b), or (a, b, c). Filtering on (b, c) alone will NOT utilize the composite index." }
    ],
    practiceProblem: {
      description: "Write SQL to create index idx_email on users(email).",
      starterCode: `CREATE INDEX idx_email ON users(email);`,
      testAssertion: "true",
      solution: `CREATE INDEX idx_email ON users(email);`
    },
    quickRevision: "★ B-Tree indexes provide O(log N) lookup speed.\n★ Composite indexes follow Leftmost Prefix Rule.\n★ Never apply functions on indexed columns in WHERE."
  }),

  // 8. TRANSACTIONS & ACID
  "mysql-transactions": createTopicSchema({
    id: "mysql-transactions",
    techId: "mysql",
    title: "Transactions, ACID Guarantees & Isolation Levels",
    category: "Transactions",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["mysql-indexes"],
    definition: "Transactions group multiple SQL statements into an atomic unit satisfying ACID properties (Atomicity, Consistency, Isolation, Durability) with 4 Isolation Levels.",
    simpleExplanation: "Transactions ensure that either ALL database operations succeed together or NONE of them take effect (all rolled back).",
    whyDoesItExist: "Prevents data corruption during concurrent operations or mid-process system crashes.",
    basicExample: `START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If any error occurs: ROLLBACK;
COMMIT;`,
    howItWorks: [
      "1. START TRANSACTION starts atomic transaction context.",
      "2. Undo Log records original row states (for ROLLBACK & MVCC read consistency).",
      "3. Redo Log records committed changes to disk for Durability guarantee."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">START TRANSACTION -&gt; Undo Log -&gt; Redo Log -&gt; COMMIT / ROLLBACK</text></svg>`,
    realWorldExample: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE; -- Row Lock
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT;`,
    commonUseCases: [
      "Processing financial bank transfers and e-commerce checkouts",
      "Preventing Dirty Reads, Non-Repeatable Reads, and Phantom Reads",
      "Row-level pessimistic locking using SELECT ... FOR UPDATE"
    ],
    commonMistakes: [
      "Keeping transactions open for too long, holding locks and causing deadlocks",
      "Assuming MyISAM engine supports transactions (only InnoDB supports transactions!)"
    ],
    bestPractices: [
      "Keep transactions short and concise",
      "Use REPEATABLE READ (MySQL default) or READ COMMITTED isolation levels"
    ],
    whenToUse: ["In all multi-step data mutation workflows requiring consistency"],
    whenNotToUse: ["When performing simple read-only SELECT queries"],
    relatedConcepts: ["ACID", "Undo Log", "Redo Log", "Isolation Levels", "FOR UPDATE"],
    comparison: {
      title: "ACID Guarantees Explained",
      headers: ["Property", "Meaning", "Implementation in InnoDB"],
      rows: [
        ["Atomicity", "All or nothing execution", "Undo Logs & ROLLBACK"],
        ["Consistency", "Valid database state transitions", "Foreign key & check constraints"],
        ["Isolation", "Concurrent transactions don't interfere", "MVCC & Row Locks"],
        ["Durability", "Committed data survives crashes", "Redo Logs & Doublewrite Buffer"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Dirty Read and which isolation level prevents it?", answer: "A Dirty Read occurs when a transaction reads uncommitted changes made by another concurrent transaction. The READ COMMITTED isolation level prevents Dirty Reads." }
    ],
    practiceProblem: {
      description: "Write SQL transaction block with START TRANSACTION and COMMIT.",
      starterCode: `START TRANSACTION;\nUPDATE users SET status = 'active' WHERE id = 1;\nCOMMIT;`,
      testAssertion: "true",
      solution: `START TRANSACTION;\nUPDATE users SET status = 'active' WHERE id = 1;\nCOMMIT;`
    },
    quickRevision: "★ ACID: Atomicity, Consistency, Isolation, Durability.\n★ Repeatable Read is default InnoDB isolation level.\n★ Undo logs enable ROLLBACK; Redo logs ensure Durability."
  }),

  // 9. QUERY OPTIMIZATION
  "mysql-optimization": createTopicSchema({
    id: "mysql-optimization",
    techId: "mysql",
    title: "MySQL Query Optimization, EXPLAIN & Slow Query Log",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["mysql-transactions"],
    definition: "Query optimization analyzes SQL query execution plans using EXPLAIN / EXPLAIN ANALYZE, identifies bottleneck queries using Slow Query Log, and tunes index/buffer configurations.",
    simpleExplanation: "EXPLAIN reveals exactly how MySQL intends to execute your query, showing if it uses an index or scans every row.",
    whyDoesItExist: "Pinpoints high-latency database queries causing server CPU and memory spikes.",
    basicExample: `-- Analyze Execution Plan
EXPLAIN ANALYZE
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';`,
    howItWorks: [
      "1. EXPLAIN parses query and displays type (const, ref, range, ALL).",
      "2. type = ALL indicates dangerous Full Table Scan.",
      "3. EXPLAIN ANALYZE executes query measuring actual execution time in milliseconds per step."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">EXPLAIN ANALYZE -&gt; Type Check (ref vs ALL) -&gt; Execution Time Profiling</text></svg>`,
    realWorldExample: `; Enable Slow Query Log in my.cnf
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2 ; Log queries taking > 2 seconds`,
    commonUseCases: [
      "Debugging slow database queries in production",
      "Verifying composite index usage with EXPLAIN",
      "Optimizing JOIN performance and reducing buffer pool misses"
    ],
    commonMistakes: [
      "Ignoring 'Using filesort' or 'Using temporary' in EXPLAIN output",
      "Relying solely on rows estimated instead of running EXPLAIN ANALYZE"
    ],
    bestPractices: [
      "Aim for type: const, eq_ref, ref, or range in EXPLAIN output (avoid ALL)",
      "Eliminate 'Using filesort' by aligning composite index columns with ORDER BY"
    ],
    whenToUse: ["When optimizing slow queries and tuning database performance"],
    whenNotToUse: ["Do not run EXPLAIN ANALYZE on destructive DML commands in production"],
    relatedConcepts: ["EXPLAIN", "EXPLAIN ANALYZE", "Slow Query Log", "filesort"],
    comparison: {
      title: "EXPLAIN Join Types (Best to Worst)",
      headers: ["Type", "Description", "Performance"],
      rows: [
        ["const / eq_ref", "Primary key or unique index lookup", "Fastest (Sub-ms)"],
        ["ref / range", "Non-unique index or range scan", "Fast"],
        ["ALL", "Full Table Scan (No index used)", "Slowest (Dangerous)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What does type: ALL mean in MySQL EXPLAIN output and how do you fix it?", answer: "type: ALL means MySQL is performing a Full Table Scan, reading every row from disk/memory because no suitable index was found. Fix it by adding appropriate indexes on WHERE and JOIN ON columns." }
    ],
    practiceProblem: {
      description: "Write EXPLAIN query prefix.",
      starterCode: `EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';`,
      testAssertion: "true",
      solution: `EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';`
    },
    quickRevision: "★ EXPLAIN type: ALL = Full Table Scan (Bad).\n★ Aim for const, eq_ref, ref, or range.\n★ EXPLAIN ANALYZE measures actual ms execution time."
  }),

  // 10. PROCEDURES, TRIGGERS & VIEWS
  "mysql-procedures-triggers": createTopicSchema({
    id: "mysql-procedures-triggers",
    techId: "mysql",
    title: "Stored Procedures, Triggers & Views in MySQL",
    category: "Advanced Database",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["mysql-optimization"],
    definition: "MySQL supports procedural code inside the database: Stored Procedures (reusable SQL programs), Triggers (automated actions on DML events), and Views (saved query representations).",
    simpleExplanation: "Stored Procedures store complex SQL programs inside the database, while Triggers automatically run code when rows are inserted or updated.",
    whyDoesItExist: "Enforces database-level business rules and audit trails automatically.",
    basicExample: `-- BEFORE INSERT Trigger for Audit Logging
DELIMITER //
CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_audit_logs(user_id, old_email, new_email)
    VALUES (OLD.id, OLD.email, NEW.email);
END //
DELIMITER ;`,
    howItWorks: [
      "1. Trigger listens for DML events (INSERT, UPDATE, DELETE).",
      "2. Accesses OLD and NEW row variable pseudo-structures.",
      "3. Executes procedural block within target transaction context."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">UPDATE users -&gt; BEFORE UPDATE Trigger -&gt; Insert Audit Log</text></svg>`,
    realWorldExample: `CREATE VIEW active_users_view AS
SELECT id, name, email FROM users WHERE status = 'active';`,
    commonUseCases: [
      "Creating automated audit logging trails with Triggers",
      "Simplifying complex queries using SQL Views",
      "Executing database maintenance scripts with Stored Procedures"
    ],
    commonMistakes: [
      "Putting complex application business logic inside Triggers (makes code hard to debug and version control)",
      "Triggering recursive trigger loops"
    ],
    bestPractices: [
      "Keep Triggers light and focused solely on audit trails",
      "Keep core application business logic in backend application code, not Stored Procedures"
    ],
    whenToUse: ["When database-level audit logging or legacy procedural encapsulation is required"],
    whenNotToUse: ["Do not build entire web applications inside Stored Procedures"],
    relatedConcepts: ["Stored Procedures", "Triggers", "Views", "OLD and NEW keywords"],
    comparison: {
      title: "Stored Procedure vs Trigger",
      headers: ["Feature", "Stored Procedure", "Trigger"],
      rows: [
        ["Execution", "Invoked explicitly via CALL proc_name()", "Executed automatically on DML event (INSERT/UPDATE/DELETE)"],
        ["Parameters", "Accepts IN/OUT parameters", "No parameters (Accesses OLD/NEW pseudo-records)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What are the OLD and NEW keywords in MySQL Triggers?", answer: "OLD refers to the row values BEFORE the DML operation (available in UPDATE/DELETE). NEW refers to the row values AFTER the DML operation (available in INSERT/UPDATE)." }
    ],
    practiceProblem: {
      description: "Write SQL creating a simple view active_users.",
      starterCode: `CREATE VIEW active_users AS SELECT * FROM users WHERE status = 'active';`,
      testAssertion: "true",
      solution: `CREATE VIEW active_users AS SELECT * FROM users WHERE status = 'active';`
    },
    quickRevision: "★ Triggers execute automatically on DML events.\n★ Access OLD and NEW pseudo-row variables.\n★ Views store reusable SELECT queries."
  }),

  // 11. REPLICATION & HIGH AVAILABILITY
  "mysql-replication": createTopicSchema({
    id: "mysql-replication",
    techId: "mysql",
    title: "MySQL High Availability, GTID Replication & Sharding",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["mysql-procedures-triggers"],
    definition: "High Availability in MySQL uses Primary-Replica Replication (using Global Transaction Identifiers - GTID) to offload read queries to replicas and Sharding to scale writes horizontally.",
    simpleExplanation: "Replication copies write data from one primary database server to multiple read-replica servers so your site stays online even if a server fails.",
    whyDoesItExist: "Ensures high availability, fault tolerance, zero-downtime backups, and horizontal read scaling.",
    basicExample: `; Primary Server my.cnf Configuration
server-id = 1
log-bin = mysql-bin
gtid_mode = ON
enforce_gtid_consistency = ON

; Replica Server my.cnf Configuration
server-id = 2
gtid_mode = ON
enforce_gtid_consistency = ON`,
    howItWorks: [
      "1. Primary node writes committed DML changes to Binary Log (binlog).",
      "2. Replica IO Thread fetches binlog events across network into Relay Log.",
      "3. Replica SQL Thread executes Relay Log transactions sequentially or in parallel."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">Primary (Binlog) -&gt; Network -&gt; Replica IO Thread (Relay Log) -&gt; SQL Thread</text></svg>`,
    realWorldExample: `CHANGE REPLICATION SOURCE TO
    SOURCE_HOST='10.0.0.1',
    SOURCE_USER='repl_user',
    SOURCE_PASSWORD='password',
    AUTO_POSITION=1; -- Uses GTID Auto-positioning!
START REPLICA;`,
    commonUseCases: [
      "Offloading heavy read SELECT traffic to multiple Read Replicas",
      "Executing non-blocking database backups on Replica nodes",
      "Achieving High Availability with automated failover (Orchestrator / Group Replication)"
    ],
    commonMistakes: [
      "Ignoring Replication Lag (reading from a replica before binlog events have arrived)",
      "Writing directly to a Read Replica server causing replication breakages"
    ],
    bestPractices: [
      "Enable GTID (Global Transaction Identifier) replication for easy failover management",
      "Set read_only = ON on all Replica database nodes"
    ],
    whenToUse: ["In high-traffic production databases requiring scale and fault tolerance"],
    whenNotToUse: ["In small single-server development databases"],
    relatedConcepts: ["Replication", "Binlog", "GTID", "Relay Log", "Sharding"],
    comparison: {
      title: "Asynchronous vs Semi-Synchronous Replication",
      headers: ["Type", "Primary Wait Behavior", "Data Safety"],
      rows: [
        ["Asynchronous (Default)", "Primary commits without waiting for replica", "Risk of small data loss on primary crash"],
        ["Semi-Synchronous", "Primary waits for at least 1 replica to receive binlog", "High data safety guarantee"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is GTID in MySQL replication and why is it superior to file-and-position replication?", answer: "GTID (Global Transaction Identifier) assigns a unique global ID to every committed transaction. It eliminates manual tracking of binlog file names and byte offsets, allowing seamless failover and replica repositioning." }
    ],
    practiceProblem: {
      description: "Write SQL command to start replica.",
      starterCode: `START REPLICA;`,
      testAssertion: "true",
      solution: `START REPLICA;`
    },
    quickRevision: "★ Primary writes to Binlog; Replica reads into Relay Log.\n★ GTID enables easy auto-positioning failover.\n★ Set read_only=ON on replica nodes."
  })
};
