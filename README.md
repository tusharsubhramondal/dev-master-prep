# 🚀 DEV MASTER — Developer Learning & Interview Preparation Platform
> **Developed by AppZone**

DEV MASTER is a modern, professional, data-driven **Developer Learning & Technical Interview Preparation Platform** created by **AppZone**. It is designed to take developers through the progression hierarchy:

```text
LEARN → UNDERSTAND → PRACTICE → BUILD → INTERVIEW → ADVANCE
```

---

## 🌟 Key Features & Architecture

### 1. Technology Independent & Data-Driven Architecture
- Supports 20+ technologies: **JavaScript, TypeScript, PHP, Laravel, Node.js, Express.js, React, Next.js, Vue.js, MySQL, PostgreSQL, MongoDB, Redis, Docker, Git, Linux, AWS, REST API, GraphQL, System Design, Microservices, DevOps**.
- Structured Schema-Driven Data System (`src/data/`): Adding new technologies or topics is a pure content operation without UI code modifications.

### 2. Universal 17-Part Topic Page Standard
Every topic adheres strictly to the 17-section structure:
1. **Definition** — Formal technical definition
2. **Simple Explanation** — Real-world analogy & intuition
3. **Why Does It Exist?** — Core problem solved in enterprise software
4. **Basic Example** — Syntax-highlighted code with copy button
5. **How It Works** — Internal step-by-step mechanism breakdown
6. **Visual Diagram** — SVG architecture flowchart
7. **Real-World Example** — Production-grade code pattern
8. **Common Use Cases** — Core applications
9. **Common Mistakes** — Anti-patterns & red alert warnings
10. **Best Practices** — Recommended green-flag engineering patterns
11. **When To Use** — Ideal application scenarios
12. **When NOT To Use** — Scenarios where alternative patterns suit better
13. **Related Concepts** — Connected topic tags
14. **Comparison** — Side-by-side spec grid
15. **Interview Questions** — Level-graded accordions (Beginner to Architect) with Senior Traps
16. **Practice Problem** — Interactive playground with test assertion runner & solution toggle
17. **Quick Revision** — Compact cheat sheet

### 3. Core Platform Modules
- **Left Sidebar Navigation** (`Navbar.jsx`): Fixed vertical sidebar with quick `⌘K` search trigger, theme switcher, and mobile drawer.
- **Technology Explorer** (`TechCatalog.jsx`): Searchable catalog with progress metrics, topic counts, and category filters.
- **Technology Hub & Version Switcher** (`TechOverview.jsx`): Version target selection (Laravel 12/11, Node 24/22, React 19/18) with version diff notices.
- **Interactive Roadmap Visualizer** (`RoadmapView.jsx`): Step-by-step visual flowchart milestones.
- **Comparison Engine** (`ComparisonView.jsx`): Side-by-side spec grid, trade-offs verdicts, code diffs, and interview Qs (e.g. Laravel vs Node, Mongo vs MySQL, REST vs GraphQL).
- **Senior & Architect Interview Simulator** (`InterviewPlatform.jsx`): Customized interview builder, step-by-step runner, scratchpad for user answer, reveal criteria breakdown, trap alerts, self-evaluation scoring.
- **Real-World Projects Blueprint** (`ProjectsView.jsx`): Beginner to Senior Architect blueprints with architecture diagrams, schema, API endpoints, interview Qs.
- **System Design Hub** (`SystemDesignView.jsx`): Tech-agnostic deep dives into Load Balancers, Redis Caching, Rate Limiting, Message Queues, Sharding.
- **Global Search Modal** (`SearchModal.jsx`): Keyboard-driven instant search (`Cmd+K` / `Ctrl+K`).
- **Admin Schema Inspector** (`AdminSchemaInspector.jsx`): Live JSON schema inspector to preview, validate, export/import data schemas dynamically.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/appzone/appzone-interview-prep.git

# Navigate to project folder
cd appzone-interview-prep

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

```bash
npm run build
```

---

## 💻 Experience Bands

| Band | Learning Horizon | Target Focus |
| :--- | :--- | :--- |
| **Beginner** | 0–1 year | Syntax, basic structures, core definitions |
| **Junior** | 1–2 years | Practical usage, basic CRUD, debugging |
| **Intermediate** | 2–4 years | Framework internals, async flow, ORM |
| **Advanced** | 4–6 years | Performance, security, design patterns |
| **Senior** | 6–10 years | Trade-offs, production outages, scaling |
| **Architect** | 10+ years | Distributed systems, reliability, cost optimization |

---

## 📄 License & Credits

Developed with ❤️ by **AppZone**. All rights reserved.
