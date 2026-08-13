# 🚀 DEV MASTER — Developer Learning & Interview Preparation Platform
> **Developed by AppZone**

**DEV MASTER** is a modern, professional, data-driven **Developer Learning & Technical Interview Preparation Platform**. Designed for developers across all experience levels—from Junior to Principal Architect—it provides structured learning paths, deep technical breakdowns, interactive practice runners, message queue integration labs, and an extensive technical Q&A database.

```text
LEARN ➔ UNDERSTAND ➔ PRACTICE ➔ BUILD ➔ INTERVIEW ➔ ADVANCE
```

---

## 📚 Table of Contents

- [🌟 Platform Overview & Core Features](#-platform-overview--core-features)
- [🎯 The 17-Part Topic Standard](#-the-17-part-topic-standard)
- [🗺️ Interactive Roadmaps](#️-interactive-roadmaps)
- [⚡ Queue & Infrastructure Integration Lab](#-queue--infrastructure-integration-lab)
- [❓ Technical Q&A Bank](#-technical-qa-bank)
- [📖 Standalone Master Interview Guides](#-standalone-master-interview-guides)
- [🛠️ Tech Stack & Dependencies](#️-tech-stack--dependencies)
- [📁 Project Folder Structure](#-project-folder-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🌐 Hostinger Deployment via GitHub Actions](#-hostinger-deployment-via-github-actions)
- [📊 Seniority & Experience Bands](#-seniority--experience-bands)
- [📄 License & Credits](#-license--credits)

---

## 🌟 Platform Overview & Core Features

### 1. Technology-Independent Data-Driven Architecture
- **26+ Core Tech Stacks Covered**: JavaScript, TypeScript, PHP, Laravel, Node.js, Express.js, React, Next.js, Vue.js, MySQL, PostgreSQL, MongoDB, Redis, Docker, Git, Linux, AWS, REST API, GraphQL, System Design, Microservices, BullMQ, Kafka, Kubernetes, RabbitMQ, and Prisma.
- **Schema-Driven Data Engine (`src/data/`)**: Adding new technologies, topics, or interview questions is a pure content operation using structured schemas without requiring UI modifications.

### 2. Main Platform Modules & Pages
- **Technology Explorer (`/technologies`)**: A searchable catalog with category filtering (Frontend, Backend, Database, Cloud/DevOps, Architecture), topic counts, and difficulty indicators.
- **Structured 17-Part Topic Study Engine (`/topics`)**: Deep technical breakdowns following an enterprise 17-section standard complete with interactive test runners and code copy buttons.
- **Interactive Developer Roadmaps (`/roadmaps`)**: Step-by-step visual progression flowcharts tracking skill milestones from Junior to Architect.
- **Queue & Infrastructure Integration Lab (`/integration`)**: Production-grade integration guides for **Apache Kafka**, **RabbitMQ**, and **BullMQ**, featuring Node.js & Laravel implementations, Docker Compose configurations, and Producer/Consumer scripts.
- **Interview Q&A Bank (`/qna`)**: Searchable repository of real-world interview questions organized by technology and seniority levels with trap warnings.
- **Global Instant Search (`SearchModal.jsx`)**: Keyboard shortcut (`Cmd+K` / `Ctrl+K`) for fast access to technologies, topics, roadmaps, and interview questions.

---

## 🎯 The 17-Part Topic Standard

Every topic inside the platform strictly adheres to a comprehensive 17-section specification:

| # | Section | Purpose / Description |
|---|---|---|
| 1 | **Definition** | Formal technical definition of the concept |
| 2 | **Simple Explanation** | Real-world analogy and intuitive explanation |
| 3 | **Why Does It Exist?** | Core architectural/engineering problem solved in production |
| 4 | **Basic Example** | Syntax-highlighted code snippet with copy capability |
| 5 | **How It Works** | Internal step-by-step mechanism breakdown |
| 6 | **Visual Diagram** | Flowcharts and visual architectural diagrams |
| 7 | **Real-World Example** | Production-grade implementation pattern |
| 8 | **Common Use Cases** | Core industry applications |
| 9 | **Common Mistakes** | Anti-patterns and red-alert warnings |
| 10 | **Best Practices** | Recommended green-flag engineering standards |
| 11 | **When To Use** | Ideal application scenarios |
| 12 | **When NOT To Use** | Scenarios where alternative patterns are better suited |
| 13 | **Related Concepts** | Connected topic tags and references |
| 14 | **Comparison** | Side-by-side specification grid |
| 15 | **Interview Questions** | Level-graded accordions (Beginner to Architect) with Senior Traps |
| 16 | **Practice Problem** | Interactive playground with test assertion runner & solution toggle |
| 17 | **Quick Revision** | Compact cheat sheet for quick review before interviews |

---

## 🗺️ Interactive Roadmaps

The **Roadmaps Engine** (`/roadmaps`) maps out step-by-step career milestones for each technology stack:

- **Junior Level**: Foundational concepts, syntax mastery, core API usage.
- **Mid/Senior Level**: Internals, performance optimization, design patterns, security.
- **Architect Level**: High availability, scaling, distributed systems, trade-off evaluations.

---

## ⚡ Queue & Infrastructure Integration Lab

Located at `/integration`, this module provides hands-on setup guides for event-driven and background processing infrastructure:

- **Technologies**: Apache Kafka, RabbitMQ, BullMQ.
- **Framework Support**: Node.js (KafkaJS, amqplib, BullMQ) and Laravel (Laravel Queues, Bernard/Kafka connectors).
- **Features Included**:
  - One-click copyable `docker-compose.yml` environment configurations.
  - Production Producer and Consumer implementations.
  - Architecture breakdown (Topics, Partitions, Consumer Groups, Exchanges, Dead Letter Queues, Redis Backed Queues).

---

## ❓ Technical Q&A Bank

Located at `/qna`, this module serves as an interview preparation vault:

- Filter by technology stack or search by keyword.
- Experience-level tags: **Beginner**, **Intermediate**, **Senior**, **Architect**.
- Includes **"Senior Traps"** highlighting common trick questions asked during technical rounds.

---

## 📖 Standalone Master Interview Guides

In addition to the interactive app, the repository includes 11 standalone, comprehensive Markdown guides located in the root directory:

- 📘 [`Complete_Angular_Senior_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_Angular_Senior_Interview_Master_Guide_BN.md)
- 📘 [`Complete_BullMQ_Master_Guide.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_BullMQ_Master_Guide.md)
- 📘 [`Complete_Docker_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_Docker_Interview_Master_Guide_BN.md)
- 📘 [`Complete_GraphQL_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_GraphQL_Interview_Master_Guide_BN.md)
- 📘 [`Complete_JavaScript_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_JavaScript_Interview_Master_Guide_BN.md)
- 📘 [`Complete_Kafka_Master_Guide.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_Kafka_Master_Guide.md)
- 📘 [`Complete_Kubernetes_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_Kubernetes_Interview_Master_Guide_BN.md)
- 📘 [`Complete_MongoDB_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_MongoDB_Interview_Master_Guide_BN.md)
- 📘 [`Complete_RabbitMQ_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_RabbitMQ_Interview_Master_Guide_BN.md)
- 📘 [`Complete_React_Interview_Master_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/Complete_React_Interview_Master_Guide_BN.md)
- 📘 [`React_Hooks_Senior_Interview_Guide_BN.md`](file:///c:/Users/tusha/Desktop/dev-master-prep/React_Hooks_Senior_Interview_Guide_BN.md)

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: Modern CSS with Glassmorphism design system & FontAwesome icons
- **Code Quality**: ESLint 10

---

## 📁 Project Folder Structure

```text
dev-master-prep/
├── public/                      # Static public assets
├── src/
│   ├── assets/                  # Project images and graphic assets
│   ├── components/              # Shared UI components
│   │   ├── LearningPathsView.jsx # Learning path component view
│   │   ├── ScrollToTop.jsx      # Auto-scroll utility on route change
│   │   ├── SearchModal.jsx      # Global search modal (Cmd+K / Ctrl+K)
│   │   └── TechGrid.jsx         # Technology catalog card grid
│   ├── data/                    # Application datasets & schema builders
│   │   ├── topics/              # 26 topic dataset files (aws, react, kafka, etc.)
│   │   ├── createTopicSchema.js # 17-part topic schema builder helper
│   │   ├── qnaData.js           # Interview Q&A dataset
│   │   ├── roadmapsData.js      # Technology roadmaps dataset
│   │   ├── technologiesData.js  # Technology catalog metadata
│   │   └── topicsData.js        # Aggregated topic data exporter
│   ├── layout/                  # Page layout containers & navigation
│   │   ├── Header.jsx           # App top header & search trigger
│   │   ├── Sidebar.jsx          # Collapsible navigation sidebar
│   │   ├── Footer.jsx           # Global footer
│   │   └── main.jsx             # Main layout wrapper
│   ├── pages/                   # Primary route pages
│   │   ├── TechnologiesPage.jsx # /technologies — Tech catalog grid view
│   │   ├── RoadmapsPage.jsx     # /roadmaps — Visual roadmap milestones
│   │   ├── TopicsPage.jsx       # /topics — Structured 17-part study topics
│   │   ├── IntegrationPage.jsx  # /integration — Kafka/RabbitMQ/BullMQ guides
│   │   └── QnaPage.jsx          # /qna — Interview Q&A repository
│   ├── redux/                   # Centralized application state
│   │   └── store.js             # Redux store & active slice
│   ├── App.jsx                  # Root router configuration
│   ├── App.css                  # Custom glassmorphism & component styles
│   ├── index.css                # Global base styles & reset
│   └── main.jsx                 # React DOM entry point
├── Complete_*_Guide*.md         # 11 standalone master interview guide documents
├── eslint.config.js             # ESLint flat config
├── index.html                   # Main HTML template
├── package.json                 # Node dependencies and npm scripts
├── vite.config.js               # Vite builder configuration
└── README.md                    # Platform documentation
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### 1. Clone & Install
```bash
# Clone the repository
git clone <repository-url>

# Navigate into project directory
cd dev-master-prep

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
# Generate production bundle
npm run build

# Preview production build locally
npm run preview
```

### 4. Code Quality
```bash
# Run ESLint check
npm run lint
```

---

## 🌐 Hostinger Deployment via GitHub Actions

This repository includes an automated deployment workflow configured in [`.github/workflows/deploy.yml`](file:///c:/Users/tusha/Desktop/dev-master-prep/.github/workflows/deploy.yml). Whenever code is pushed to the `main` or `master` branch, GitHub Actions will automatically install dependencies, build the production bundle (`dist/`), and upload it to Hostinger via FTP/SFTP.

### 1. Configure Hostinger FTP Account
1. Log in to your **Hostinger hPanel**.
2. Go to **Files** ➔ **FTP Accounts**.
3. Copy your **FTP Hostname / Server IP**, **FTP Username**, and **FTP Password** (or create a new FTP account pointing to `public_html`).

### 2. Add Secrets to GitHub Repository
In your GitHub repository, navigate to **Settings** ➔ **Secrets and variables** ➔ **Actions**, and add the following repository secrets:

| Secret Name | Value | Example |
| :--- | :--- | :--- |
| `FTP_SERVER` | FTP Host / Server IP | `ftp.yourdomain.com` or `185.185.xxx.xxx` |
| `FTP_USERNAME` | Hostinger FTP Username | `u123456789.user` |
| `FTP_PASSWORD` | Hostinger FTP Password | `YourSecurePassword123` |
| `FTP_SERVER_DIR` | Hostinger Target Directory *(Optional)* | `./public_html/` |
| `FTP_PROTOCOL` | Connection Protocol *(Optional)* | `ftps` or `ftp` (default: `ftps`) |

### 3. Automatic SPA Client Routing (`.htaccess`)
To prevent `404 Not Found` errors when refreshing routes on Hostinger's web server (Apache/LiteSpeed), an [`.htaccess`](file:///c:/Users/tusha/Desktop/dev-master-prep/public/.htaccess) file is included in `public/.htaccess`. It is automatically included in the production build artifact (`dist/.htaccess`) during deployment.

---

## 📊 Seniority & Experience Bands

| Band | Experience Horizon | Focus Area |
| :--- | :--- | :--- |
| **Beginner** | 0–1 year | Syntax, foundational structures, core definitions |
| **Junior** | 1–2 years | Practical usage, CRUD operations, basic debugging |
| **Intermediate** | 2–4 years | Framework internals, async flows, ORMs, basic architecture |
| **Advanced** | 4–6 years | Performance, security, design patterns, testing |
| **Senior** | 6–10 years | Trade-off evaluation, outage post-mortems, scalability |
| **Architect** | 10+ years | Distributed systems, event streaming, reliability, cost optimization |

---

## 📄 License & Credits

Developed with ❤️ by **AppZone**. All rights reserved.


