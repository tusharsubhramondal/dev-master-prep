import { createTopicSchema } from './createTopicSchema.js';

export const dockerTopics = {
  // 1. CONTAINERS VS VMS
  "docker-basics": createTopicSchema({
    id: "docker-basics",
    techId: "docker",
    title: "Containers vs Virtual Machines & Docker Architecture",
    category: "Docker Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["DevOps Fundamentals"],
    definition: "Docker is an open-source platform that packages applications and dependencies into isolated lightweight Containers sharing the host OS kernel, unlike heavy Virtual Machines.",
    simpleExplanation: "Containers bundle your Node.js or Laravel code with all system dependencies so it runs identically on any computer or cloud server.",
    whyDoesItExist: "Eliminates the 'It works on my machine' problem across development, staging, and production.",
    basicExample: `# Check Docker Engine status & running containers
docker version
docker info
docker run hello-world`,
    howItWorks: [
      "1. Docker Engine CLI communicates with dockerd daemon process via REST API.",
      "2. Uses Linux kernel namespaces (for PID/Network isolation) and cgroups (for CPU/RAM resource limits).",
      "3. Executes immutable container images instantly without booting a guest OS kernel."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Docker CLI -&gt; Docker Daemon (dockerd) -&gt; Namespaces &amp; cgroups</text></svg>`,
    realWorldExample: `// Node.js Container Run:
docker run -p 3000:3000 node:20-alpine

// Laravel Container Run:
docker run -p 8000:8000 bitnami/laravel:latest`,
    commonUseCases: [
      "Standardizing development environments across engineering teams",
      "Packaging Node.js and Laravel applications for microservices",
      "Achieving instant sub-second application startup"
    ],
    commonMistakes: [
      "Treating containers like full Virtual Machines and running multiple services inside a single container",
      "Expecting container file changes to persist without defining Docker Volumes"
    ],
    bestPractices: [
      "Run single primary process per container (One process per container principle)",
      "Use lightweight Alpine or Slim base images"
    ],
    whenToUse: ["In all modern web application deployment and local development workflows"],
    whenNotToUse: ["When running legacy monolithic apps relying on deep kernel modifications"],
    relatedConcepts: ["Containers", "Namespaces", "cgroups", "Docker Daemon"],
    comparison: {
      title: "Containers vs Virtual Machines",
      headers: ["Aspect", "Containers (Docker)", "Virtual Machines (Hypervisor)"],
      rows: [
        ["OS Kernel", "Shares Host OS Kernel", "Includes full Guest OS Kernel"],
        ["Startup Time", "Milliseconds", "Minutes"],
        ["Resource Overhead", "Ultra Lightweight (MBs of RAM)", "Heavy (GBs of RAM)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "How do Docker containers achieve isolation without running a full guest OS?", answer: "Docker uses Linux kernel features: Namespaces (providing isolated views of PIDs, Network, and Mounts) and Control Groups / cgroups (enforcing CPU, Memory, and I/O resource limits)." }
    ],
    practiceProblem: {
      description: "Write command checking Docker version.",
      starterCode: `docker version`,
      testAssertion: "true",
      solution: `docker version`
    },
    quickRevision: "★ Containers share the Host OS kernel.\n★ Uses Namespaces (isolation) and cgroups (resource limits).\n★ One process per container principle."
  }),

  // 2. DOCKER CLI
  "docker-cli": createTopicSchema({
    id: "docker-cli",
    techId: "docker",
    title: "Docker CLI Commands (run, exec, ps, stop, logs)",
    category: "Docker Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["docker-basics"],
    definition: "The Docker CLI provides control commands (docker run, ps, exec, stop, rm, rmi, logs, inspect) for managing container lifecycles and images.",
    simpleExplanation: "Docker CLI commands let you start, inspect, debug, and stop running containers on your server.",
    whyDoesItExist: "Provides complete terminal command interface for container lifecycle management.",
    basicExample: `# Start container in detached background mode (-d) on port 8080
docker run -d --name my-app -p 8080:80 node:20-alpine

# View running containers
docker ps

# Inspect logs
docker logs -f my-app

# Execute terminal shell inside running container
docker exec -it my-app sh`,
    howItWorks: [
      "1. docker run checks local image cache; pulls from Docker Hub if missing.",
      "2. Creates container writable layer over read-only image layers.",
      "3. Binds host network ports to container internal ports."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">docker run -&gt; Image Pull -&gt; Writable Container Layer -&gt; Port Binds</text></svg>`,
    realWorldExample: `# Executing Artisan CLI command inside running Laravel container:
docker exec -it laravel-app php artisan migrate

# Executing npm test inside running Node container:
docker exec -it node-app npm test`,
    commonUseCases: [
      "Running background application containers with -d",
      "Debugging running container environments with docker exec -it",
      "Monitoring application console stdout with docker logs -f"
    ],
    commonMistakes: [
      "Confusing container port mapping order (-p hostPort:containerPort)",
      "Accumulating stopped dead containers (clean with docker system prune)"
    ],
    bestPractices: [
      "Use docker run --rm to auto-delete temporary containers on exit",
      "Use docker system prune periodically to clean unused images and containers"
    ],
    whenToUse: ["In all command-line Docker container management"],
    whenNotToUse: ["Do not use manual CLI commands in production (use Docker Compose or Kubernetes)"],
    relatedConcepts: ["docker run", "docker exec", "docker logs", "-p host:container"],
    comparison: {
      title: "docker exec vs docker run",
      headers: ["Command", "Action", "Target"],
      rows: [
        ["docker run", "Creates and starts a BRAND NEW container", "New Container"],
        ["docker exec", "Runs a command inside an ALREADY RUNNING container", "Existing Active Container"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between docker run and docker exec?", answer: "docker run creates and starts a brand new container instance from an image. docker exec runs a new process or shell command inside an already running container." }
    ],
    practiceProblem: {
      description: "Write docker exec command opening sh terminal in container 'app'.",
      starterCode: `docker exec -it app sh`,
      testAssertion: "true",
      solution: `docker exec -it app sh`
    },
    quickRevision: "★ -p 8080:80 maps Host Port 8080 to Container Port 80.\n★ docker exec runs commands in existing containers.\n★ Clean dead containers with docker system prune."
  }),

  // 3. WRITING DOCKERFILES
  "dockerfile-guide": createTopicSchema({
    id: "dockerfile-guide",
    techId: "docker",
    title: "Writing Production Dockerfiles (Node.js & Laravel)",
    category: "Docker Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "11 min",
    prerequisites: ["docker-cli"],
    definition: "A Dockerfile is a text blueprint manifest containing instructions (FROM, WORKDIR, COPY, RUN, CMD, EXPOSE, ENV) used to build reproducible, immutable container images.",
    simpleExplanation: "A Dockerfile is a recipe script that installs dependencies and packages your app into a runnable Docker image.",
    whyDoesItExist: "Automates container image creation for seamless CI/CD deployments.",
    basicExample: `# --- Node.js Dockerfile Example ---
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
    howItWorks: [
      "1. docker build parses Dockerfile step-by-step.",
      "2. Each instruction creates a cached, read-only filesystem layer.",
      "3. Final CMD directive specifies default container startup command."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">FROM -&gt; WORKDIR -&gt; COPY package.json -&gt; RUN npm ci -&gt; COPY . -&gt; CMD</text></svg>`,
    realWorldExample: `# --- Laravel Dockerfile Example ---
FROM php:8.2-fpm-alpine
WORKDIR /var/www
RUN docker-php-ext-install pdo pdo_mysql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY . .
RUN composer install --no-dev --optimize-autoloader
EXPOSE 9000
CMD ["php-fpm"]`,
    commonUseCases: [
      "Building Node.js API server container images",
      "Building Laravel PHP-FPM container images",
      "Leveraging Docker build cache layer optimization"
    ],
    commonMistakes: [
      "Copying application code BEFORE dependency files (invalidates npm ci / composer cache on every code change!)",
      "Confusing RUN (executed at image build time) with CMD (executed at container runtime)"
    ],
    bestPractices: [
      "Copy dependency files (package.json / composer.json) first before copying source code to maximize layer caching",
      "Use alpine Linux base images to keep image size small (<100MB)"
    ],
    whenToUse: ["When packaging custom web applications into Docker images"],
    whenNotToUse: ["Do not write custom Dockerfiles if pre-built official images (e.g. redis:alpine) satisfy requirements"],
    relatedConcepts: ["Dockerfile", "Layer Caching", "CMD vs RUN", "Alpine"],
    comparison: {
      title: "RUN vs CMD in Dockerfile",
      headers: ["Instruction", "Execution Time", "Purpose"],
      rows: [
        ["RUN npm install", "Build Time (During docker build)", "Installs packages into image layer"],
        ["CMD ['node', 'app.js']", "Runtime (During docker run)", "Default startup command when container launches"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why should package.json be copied before source code in a Node.js Dockerfile?", answer: "Docker caches build layers. By copying package.json and running npm install first, Docker reuses the cached node_modules layer on rebuilds unless package.json changes, drastically speeding up build times." }
    ],
    practiceProblem: {
      description: "Write Dockerfile WORKDIR instruction for /app.",
      starterCode: `WORKDIR /app`,
      testAssertion: "true",
      solution: `WORKDIR /app`
    },
    quickRevision: "★ Copy package.json/composer.json BEFORE app source code for caching.\n★ RUN executes at build time; CMD executes at container launch.\n★ Use Alpine base images for small footprint."
  }),

  // 4. VOLUMES & PERSISTENCE
  "docker-volumes": createTopicSchema({
    id: "docker-volumes",
    techId: "docker",
    title: "Docker Volumes & Data Persistence (Named Volumes vs Bind Mounts)",
    category: "Docker Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["dockerfile-guide"],
    definition: "Docker Volumes persist data outside the container lifecycle. Storage types include Named Volumes (managed by Docker on host disk) and Bind Mounts (mounting host directories directly into containers).",
    simpleExplanation: "Containers are temporary. Volumes keep your database files and uploaded media safe even if the container is destroyed.",
    whyDoesItExist: "Prevents data loss when containers restart or undergo upgrades.",
    basicExample: `# 1. Named Volume for MySQL Database Persistence
docker volume create db_data
docker run -d -v db_data:/var/lib/mysql mysql:8

# 2. Bind Mount for Local Development Hot Reloading (Node/Laravel)
docker run -d -v $(pwd):/app -p 3000:3000 node:20-alpine`,
    howItWorks: [
      "1. Named Volumes store files in Docker host storage (/var/lib/docker/volumes/).",
      "2. Bind Mounts mirror host directory directly into container target path.",
      "3. Bypasses container writable copy-on-write storage driver for native I/O speed."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Container (Ephemeral) -- Mount Point -- Host Disk (Named Volume / Bind Mount)</text></svg>`,
    realWorldExample: `# Bind Mount for Laravel hot reloading during local development:
docker run -d -v $(pwd):/var/www -p 8000:8000 laravel-dev-image`,
    commonUseCases: [
      "Persisting database files (MySQL, Postgres, MongoDB, Redis)",
      "Hot-reloading Node.js and Laravel code during local development using Bind Mounts",
      "Sharing log files across containers"
    ],
    commonMistakes: [
      "Storing database files inside ephemeral container layers without a Volume",
      "Using Bind Mounts in production environments (Bind Mounts depend on host directory paths!)"
    ],
    bestPractices: [
      "Use Named Volumes for production database persistence",
      "Use Bind Mounts strictly for local development hot-reloading"
    ],
    whenToUse: ["In all stateful containers requiring persistent data storage"],
    whenNotToUse: ["Do not use volumes for stateless API servers"],
    relatedConcepts: ["Named Volumes", "Bind Mounts", "Data Persistence", "Hot Reloading"],
    comparison: {
      title: "Named Volumes vs Bind Mounts",
      headers: ["Feature", "Named Volumes", "Bind Mounts"],
      rows: [
        ["Host Path", "Managed by Docker (/var/lib/docker/volumes)", "Explicit user path (e.g. /home/user/project)"],
        ["Best Use Case", "Production Databases (MySQL, Redis, Mongo)", "Local Development Hot-Reloading"],
        ["Portability", "High (Managed via Docker CLI)", "Low (Depends on host OS paths)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between Named Volumes and Bind Mounts in Docker?", answer: "Named Volumes are fully managed by Docker on the host storage filesystem, ideal for production database persistence. Bind Mounts map a specific host directory directly into the container, ideal for local development code hot-reloading." }
    ],
    practiceProblem: {
      description: "Write CLI flag for mounting volume named mydata to /data.",
      starterCode: `-v mydata:/data`,
      testAssertion: "true",
      solution: `-v mydata:/data`
    },
    quickRevision: "★ Use Named Volumes (-v db_data:/var/lib/mysql) in production DBs.\n★ Use Bind Mounts (-v $(pwd):/app) for local dev hot reloading.\n★ Volumes survive container deletion."
  }),

  // 5. DOCKER NETWORKING
  "docker-networking": createTopicSchema({
    id: "docker-networking",
    techId: "docker",
    title: "Docker Networking (Bridge, Host, Overlay & DNS Resolution)",
    category: "Docker Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["docker-volumes"],
    definition: "Docker Networking connects containers using network drivers: Bridge (default isolated private network with container name DNS resolution), Host (shares host network stack), and Overlay (multi-host Swarm networking).",
    simpleExplanation: "Custom Bridge networks allow containers to talk to each other securely using container names as hostname domains (e.g. http://backend-api:3000).",
    whyDoesItExist: "Enables secure inter-container communication without exposing internal ports to the host.",
    basicExample: `# 1. Create custom isolated bridge network
docker network create app-net

# 2. Run Redis on network
docker run -d --name my-redis --network app-net redis:alpine

# 3. Node.js app connects using hostname "my-redis"!
docker run -d --name my-app --network app-net -p 3000:3000 node-app`,
    howItWorks: [
      "1. Custom Bridge network creates virtual veth pair interface on host.",
      "2. Embedded Docker DNS server resolves container names (my-redis) to internal IP addresses.",
      "3. Containers on the same custom network communicate directly without host port exposure."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Node Container -- [Docker Embedded DNS: my-redis] -- Redis Container</text></svg>`,
    realWorldExample: `// Node.js ioredis connection inside custom bridge network:
const redis = new Redis({ host: 'my-redis', port: 6379 });

// Laravel DB config inside custom bridge network:
'host' => env('DB_HOST', 'my-mysql'),`,
    commonUseCases: [
      "Connecting Node.js / Laravel backend containers to MySQL and Redis containers",
      "Isolating database tiers from public web access",
      "Using container names as DNS hostnames"
    ],
    commonMistakes: [
      "Relying on the default bridge network (default bridge DOES NOT support container name DNS resolution! Custom networks are required)",
      "Hardcoding container internal IP addresses instead of container name hostnames"
    ],
    bestPractices: [
      "Always create custom user-defined bridge networks for automatic DNS resolution",
      "Use container names as hostnames in application config files"
    ],
    whenToUse: ["In all multi-container communication setups"],
    whenNotToUse: ["Do not expose database ports to host 0.0.0.0 unnecessarily"],
    relatedConcepts: ["Bridge Network", "Embedded DNS", "veth pair", "Host Network"],
    comparison: {
      title: "Default Bridge vs Custom User Bridge Network",
      headers: ["Network Type", "Automatic Container DNS Resolution?", "Use Case"],
      rows: [
        ["Default Bridge", "NO (Must use IP addresses or legacy links)", "Not recommended"],
        ["Custom Bridge (docker network create)", "YES (Resolves container names to IPs)", "Production & Development Standard"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why should you create custom user-defined bridge networks instead of using the default bridge network in Docker?", answer: "Custom bridge networks provide automatic container name DNS resolution (allowing containers to reach each other using container names as hostnames) and provide better security isolation." }
    ],
    practiceProblem: {
      description: "Write command creating custom network 'my-network'.",
      starterCode: `docker network create my-network`,
      testAssertion: "true",
      solution: `docker network create my-network`
    },
    quickRevision: "★ Custom Bridge networks enable container name DNS resolution.\n★ Default bridge network does NOT support container name DNS.\n★ Connect using container name hostnames (e.g. host='redis')."
  }),

  // 6. DOCKER COMPOSE
  "docker-compose": createTopicSchema({
    id: "docker-compose",
    techId: "docker",
    title: "Docker Compose (Multi-Container Orchestration for Node & Laravel)",
    category: "Docker Tools",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["docker-networking"],
    definition: "Docker Compose defines and runs multi-container Docker applications using a YAML specification file (docker-compose.yml) to configure services, networks, and volumes.",
    simpleExplanation: "Docker Compose lets you start your entire tech stack (Node/Laravel app + MySQL + Redis) using a single command: docker compose up -d.",
    whyDoesItExist: "Replaces long complex docker run CLI commands with a single version-controlled YAML configuration file.",
    basicExample: `# --- Fullstack Node.js + Redis docker-compose.yml ---
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=redis
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"`,
    howItWorks: [
      "1. docker compose up reads docker-compose.yml specification.",
      "2. Automatically creates shared custom bridge network and named volumes.",
      "3. Builds images and starts container services in proper dependency order."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/><text x="350" y="95" fill="#c084fc" font-weight="bold" text-anchor="middle">docker compose up -d -&gt; Builds App + Connects DB + Connects Redis</text></svg>`,
    realWorldExample: `# --- Laravel + MySQL + Redis docker-compose.yml ---
version: '3.8'
services:
  laravel:
    build: .
    ports:
      - "8000:8000"
    environment:
      DB_HOST: mysql
      REDIS_HOST: redis
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - db_data:/var/lib/mysql

  redis:
    image: redis:alpine

volumes:
  db_data:`,
    commonUseCases: [
      "Spinning up local multi-service development environments with 1 command",
      "Orchestrating Laravel + Nginx + MySQL + Redis stacks",
      "Orchestrating Node.js + MongoDB + Redis stacks"
    ],
    commonMistakes: [
      "Assuming depends_on waits for database to be fully READY (depends_on waits for container to START, not for DB to accept connections! Use healthchecks)",
      "Committing secret passwords in production docker-compose.yml (use env_file)"
    ],
    bestPractices: [
      "Combine depends_on with healthcheck condition for database readiness",
      "Use docker compose up -d --build to force container image rebuilds"
    ],
    whenToUse: ["In all multi-container local development environments"],
    whenNotToUse: ["Do not use single-node Docker Compose for massive multi-node cloud clusters (use Kubernetes)"],
    relatedConcepts: ["docker-compose.yml", "services", "depends_on", "healthcheck"],
    comparison: {
      title: "docker run vs docker compose",
      headers: ["Feature", "Manual docker run CLI", "Docker Compose (docker-compose.yml)"],
      rows: [
        ["Service Count", "Requires separate command per container", "Orchestrates all services simultaneously"],
        ["Networking & Volumes", "Manual docker network create setup", "Auto-creates isolated networks & volumes"],
        ["Maintainability", "Hard to remember CLI flags", "Version controlled YAML specification"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Does depends_on in docker-compose.yml wait for a database to accept connections?", answer: "No. depends_on only waits for the database container process to start running, not for the database to be fully initialized and ready for connections. Use healthchecks with condition: service_healthy for true readiness." }
    ],
    practiceProblem: {
      description: "Write CLI command to launch Docker Compose in detached mode.",
      starterCode: `docker compose up -d`,
      testAssertion: "true",
      solution: `docker compose up -d`
    },
    quickRevision: "★ docker compose up -d starts all multi-container services.\n★ Auto-creates shared network and volumes.\n★ Combine depends_on with healthcheck for DB readiness."
  }),

  // 7. MULTI-STAGE BUILDS
  "docker-multistage": createTopicSchema({
    id: "docker-multistage",
    techId: "docker",
    title: "Multi-Stage Docker Builds (Optimizing Image Size)",
    category: "Performance",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["docker-compose"],
    definition: "Multi-Stage Builds use multiple FROM directives in a single Dockerfile to compile artifacts in a heavy build stage and copy ONLY the compiled binaries into a tiny production runtime image.",
    simpleExplanation: "Multi-Stage builds keep your final production Docker image small by throwing away build compilers, devDependencies, and source code tools.",
    whyDoesItExist: "Reduces container image size from 1GB+ down to under 50MB, speeding up deployment and reducing security attack surfaces.",
    basicExample: `# --- Multi-Stage Build for Node.js ---
# Stage 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runtime Stage (Tiny!)
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
    howItWorks: [
      "1. Stage 1 compiles TypeScript/Assets and installs devDependencies.",
      "2. Stage 2 starts fresh from a clean lightweight base image.",
      "3. COPY --from=builder copies compiled production assets, leaving build tools behind."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Build Stage (Compilers &amp; DevDeps) -- COPY --from=builder --&gt; Production Runtime (Tiny!)</text></svg>`,
    realWorldExample: `# --- Multi-Stage Build for Laravel (Frontend Assets + PHP runtime) ---
# Stage 1: Build Frontend Assets (Vite/Node)
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production PHP Runtime
FROM php:8.2-fpm-alpine
WORKDIR /var/www
COPY . .
COPY --from=frontend /app/public/build ./public/build
RUN composer install --no-dev --optimize-autoloader`,
    commonUseCases: [
      "Building production Node.js TypeScript microservices",
      "Compiling frontend Vite assets for Laravel applications",
      "Reducing cloud deployment image transfer times"
    ],
    commonMistakes: [
      "Including heavy build toolchains (gcc, python, node_modules devDeps) inside production images",
      "Forgetting AS stage_name aliases"
    ],
    bestPractices: [
      "Use COPY --from=stage_name to copy only compiled production artifacts",
      "Use alpine or distroless base images in the final runtime stage"
    ],
    whenToUse: ["In all production application Dockerfiles"],
    whenNotToUse: ["In simple local development scripts"],
    relatedConcepts: ["Multi-Stage Builds", "COPY --from", "Image Optimization"],
    comparison: {
      title: "Single Stage vs Multi-Stage Docker Image Size",
      headers: ["Build Type", "Included Files", "Final Image Size"],
      rows: [
        ["Single Stage", "Source code, Node/PHP, compilers, devDependencies, git", "~1GB (Bloated & Insecure)"],
        ["Multi-Stage Build", "ONLY compiled production binaries & production dependencies", "~50MB – 100MB (Fast & Secure)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the main advantage of Multi-Stage Docker builds?", answer: "Multi-Stage builds allow you to separate the build environment (compilers, devDependencies, SDKs) from the runtime environment, producing tiny, secure, and fast-to-deploy production container images." }
    ],
    practiceProblem: {
      description: "Write COPY --from syntax copying /app/dist from builder.",
      starterCode: `COPY --from=builder /app/dist ./dist`,
      testAssertion: "true",
      solution: `COPY --from=builder /app/dist ./dist`
    },
    quickRevision: "★ Multi-Stage uses multiple FROM directives.\n★ COPY --from=builder copies only compiled production artifacts.\n★ Reduces image size from 1GB+ down to ~50MB."
  }),

  // 8. DOCKER SECURITY
  "docker-security": createTopicSchema({
    id: "docker-security",
    techId: "docker",
    title: "Docker Security Best Practices & Non-Root Users",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["docker-multistage"],
    definition: "Docker Security hardening involves running container processes as non-root users (USER node), scanning images for CVE vulnerabilities (docker scan/Trivy), and making container filesystems read-only.",
    simpleExplanation: "By default, Docker containers run as the root superuser. Security hardening ensures processes run as unprivileged users so attackers cannot compromise the host server.",
    whyDoesItExist: "Prevents container breakout attacks from compromising the underlying host server OS.",
    basicExample: `# Dockerfile Security Hardening
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Switch from root superuser to unprivileged 'node' user!
USER node

EXPOSE 3000
CMD ["node", "server.js"]`,
    howItWorks: [
      "1. USER node instruction switches execution UID from 0 (root) to unprivileged UID 1000.",
      "2. Restricts process OS permissions inside container.",
      "3. Vulnerability scanners (Trivy / Snyk) scan layer package databases for known CVE security flaws."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">USER node (Non-root UID 1000) -&gt; Trivy CVE Scan -&gt; Secure Container</text></svg>`,
    realWorldExample: `# Scanning container image for CVE vulnerabilities using Trivy:
trivy image my-node-app:latest`,
    commonUseCases: [
      "Running Node.js and Laravel production containers as non-root users",
      "Scanning CI/CD container images for security vulnerabilities with Trivy / Snyk",
      "Mounting Docker socket (/var/run/docker.sock) securely"
    ],
    commonMistakes: [
      "Running production containers as default root user (UID 0)",
      "Exposing /var/run/docker.sock to un-trusted application containers (gives full root control of host server!)"
    ],
    bestPractices: [
      "Always add USER node or USER www-data in production Dockerfiles",
      "Scan container images for CVE vulnerabilities in CI/CD pipelines"
    ],
    whenToUse: ["In all production Docker image builds and deployment pipelines"],
    whenNotToUse: ["Do not run containers as root in production"],
    relatedConcepts: ["USER directive", "Non-root User", "Trivy", "CVE Vulnerability"],
    comparison: {
      title: "Root Container vs Non-Root Container",
      headers: ["User Mode", "Container Process UID", "Host Security Risk"],
      rows: [
        ["Default Root", "UID 0 (Root)", "High (Container breakout grants root host access)"],
        ["Non-Root (USER node)", "UID 1000 (Unprivileged)", "Low (Blocked from host privilege escalation)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is running Docker containers as a non-root user a critical security best practice?", answer: "By default, container root (UID 0) maps to host root permissions. If an attacker exploits an application vulnerability and breaks out of the container, a non-root user (USER node) prevents them from escalating privileges on the host server OS." }
    ],
    practiceProblem: {
      description: "Write Dockerfile USER instruction for node user.",
      starterCode: `USER node`,
      testAssertion: "true",
      solution: `USER node`
    },
    quickRevision: "★ NEVER run production containers as root user.\n★ Use USER node or USER www-data in Dockerfiles.\n★ Scan images for CVE vulnerabilities with Trivy."
  }),

  // 9. PRODUCTION OPTIMIZATION
  "docker-optimization": createTopicSchema({
    id: "docker-optimization",
    techId: "docker",
    title: "Docker Production Optimization (.dockerignore & Layer Caching)",
    category: "Performance",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["docker-security"],
    definition: "Production optimization optimizes build speed and image size using .dockerignore files, BuildKit layer caching, Distroless images, and explicit HEALTHCHECK instructions.",
    simpleExplanation: ".dockerignore excludes unnecessary node_modules and .git folders from build context, while HEALTHCHECK lets Docker monitor container health.",
    whyDoesItExist: "Speeds up build pipelines and provides automated container health recovery.",
    basicExample: `# --- .dockerignore file ---
node_modules
.git
.env
dist
coverage
npm-debug.log`,
    howItWorks: [
      "1. .dockerignore filters files sent to Docker Daemon during build context initialization.",
      "2. BuildKit caches unchanged layers in remote registry cache.",
      "3. HEALTHCHECK runs periodic health commands inside container, updating container status to healthy/unhealthy."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">.dockerignore -&gt; BuildKit Cache -&gt; HEALTHCHECK status</text></svg>`,
    realWorldExample: `# Adding HEALTHCHECK instruction to Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1`,
    commonUseCases: [
      "Excluding local node_modules, vendor, and .git folders from docker build context",
      "Monitoring API server readiness using HEALTHCHECK instructions",
      "Enabling BuildKit (DOCKER_BUILDKIT=1) for parallel layer compilation"
    ],
    commonMistakes: [
      "Forgetting .dockerignore causing gigabytes of local node_modules/vendor directories to be transferred to Docker daemon",
      "Not adding HEALTHCHECK instructions on production services"
    ],
    bestPractices: [
      "Always create a .dockerignore file in every repository",
      "Enable Docker BuildKit for faster parallel builds"
    ],
    whenToUse: ["In all production Docker projects"],
    whenNotToUse: ["Do not upload secret .env files into Docker build context"],
    relatedConcepts: [".dockerignore", "BuildKit", "HEALTHCHECK", "Layer Cache"],
    comparison: {
      title: ".gitignore vs .dockerignore",
      headers: ["File", "Target System", "Purpose"],
      rows: [
        [".gitignore", "Git Version Control", "Prevents committing generated files to Git repository"],
        [".dockerignore", "Docker Build Context", "Prevents transferring unnecessary files to Docker daemon during build"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why is a .dockerignore file essential for Docker build performance?", answer: "Without .dockerignore, Docker copies the entire directory—including huge local node_modules, vendor, and .git folders—to the Docker daemon on every build. .dockerignore skips these files, drastically accelerating build context transfers." }
    ],
    practiceProblem: {
      description: "Write line for .dockerignore excluding node_modules.",
      starterCode: `node_modules`,
      testAssertion: "true",
      solution: `node_modules`
    },
    quickRevision: "★ .dockerignore prevents sending node_modules/.git to Docker daemon.\n★ Enable DOCKER_BUILDKIT=1 for parallel builds.\n★ Use HEALTHCHECK for container health monitoring."
  }),

  // 10. TRANSITIONING TO KUBERNETES
  "docker-to-k8s": createTopicSchema({
    id: "docker-to-k8s",
    techId: "docker",
    title: "Transitioning Containers to Kubernetes (Pods & Deployments)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["docker-optimization"],
    definition: "Transitioning from Docker Compose to Kubernetes involves wrapping container images inside Pods, managing replicas using Deployments, and exposing networking services using K8s Services and Ingress.",
    simpleExplanation: "Kubernetes orchestrates your Docker containers across clusters of hundreds of cloud servers with automated scaling and self-healing.",
    whyDoesItExist: "Provides automated horizontal auto-scaling, self-healing, and rolling deployments across large production server clusters.",
    basicExample: `# Kubernetes Deployment Manifest (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-api
  template:
    metadata:
      labels:
        app: node-api
    spec:
      containers:
      - name: node-api
        image: myregistry/node-api:v1.0
        ports:
        - containerPort: 3000`,
    howItWorks: [
      "1. Kubernetes API Server receives deployment.yaml manifest.",
      "2. Controller Manager schedules Pods across Kubernetes Worker Nodes.",
      "3. Kubelet agent on worker nodes invokes Container Runtime (containerd) to pull and run Docker images."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">K8s Deployment Manifest -&gt; 3 Replicated Pods -&gt; Kubelet Container Runtime</text></svg>`,
    realWorldExample: `# Deploying container to Kubernetes cluster:
kubectl apply -f deployment.yaml
kubectl get pods`,
    commonUseCases: [
      "Deploying Node.js and Laravel container images to EKS / GKE Kubernetes clusters",
      "Configuring automated horizontal pod autoscaling (HPA)",
      "Zero-downtime rolling update deployments"
    ],
    commonMistakes: [
      "Hardcoding environment secrets in Kubernetes deployment manifests (use K8s Secrets instead)",
      "Omitting CPU/Memory requests and limits on container pod specifications"
    ],
    bestPractices: [
      "Define resource requests and limits for all container pods",
      "Use Helm charts to manage complex Kubernetes application manifests"
    ],
    whenToUse: ["When orchestrating containerized applications across large production cloud clusters"],
    whenNotToUse: ["Do not use Kubernetes for simple single-server web apps"],
    relatedConcepts: ["Kubernetes", "Pods", "Deployments", "Services", "containerd"],
    comparison: {
      title: "Docker Compose vs Kubernetes",
      headers: ["Feature", "Docker Compose", "Kubernetes (K8s)"],
      rows: [
        ["Scope", "Single-host container orchestration", "Multi-node production cluster orchestration"],
        ["Auto-Scaling", "Manual scaling only", "Automated Horizontal Pod Autoscaling (HPA)"],
        ["Self-Healing", "Basic container restart", "Automated node failover & Pod rescheduling"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is a Pod in Kubernetes and how does it relate to Docker containers?", answer: "A Pod is the smallest deployable unit in Kubernetes. It encapsulates one or more co-located Docker containers that share the same network IP namespace, storage volumes, and IPC specifications." }
    ],
    practiceProblem: {
      description: "Write kubectl command applying manifest file.",
      starterCode: `kubectl apply -f deployment.yaml`,
      testAssertion: "true",
      solution: `kubectl apply -f deployment.yaml`
    },
    quickRevision: "★ Pods are the smallest deployable units in Kubernetes.\n★ K8s Deployments manage container replica scaling & rolling updates.\n★ Use kubectl apply -f manifest.yaml to deploy."
  })
};
