# Complete Docker Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, Containerization মেকানিজম, cgroups/namespaces, Multi-stage Dockerfile, Docker Compose, Storage drivers, Networking এবং Security সহ তৈরি করা হয়েছে যাতে যে কেউ Docker-এর যেকোনো ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: Containerization vs Virtualization](#module-1-containerization-vs-virtualization)
2. [Module 2: Docker Architecture & Core Components](#module-2-docker-architecture--core-components)
3. [Module 3: Dockerfile Best Practices & Multi-Stage Builds](#module-3-dockerfile-best-practices--multi-stage-builds)
4. [Module 4: Docker Storage (Volumes) & Networking](#module-4-docker-storage-volumes--networking)
5. [Module 5: Docker Compose & Container Orchestration](#module-5-docker-compose--container-orchestration)
6. [Module 6: Docker Security & Image Optimization](#module-6-docker-security--image-optimization)
7. [Module 7: Complete Level-by-Level Question Vault](#module-7-complete-level-by-level-question-vault)

---

# Module 1: Containerization vs Virtualization

### 1.1 Virtual Machines (VM) বনাম Containers (Docker)

| ক্রাইটেরিয়া | Virtual Machine (VM) | Container (Docker) |
| :--- | :--- | :--- |
| **আর্কিটেকচার** | **Hardware Level Virtualization** (Hypervisor এর ওপর চলে) | **OS Level Virtualization** (Host OS Kernel শেয়ার করে) |
| **Guest OS** | প্রতিটি VM-এর নিজস্ব পূর্ণাঙ্গ Guest OS লাগে (GBs of size) | কোনো Guest OS লাগে না (MBs of size) |
| **Boot Time** | কয়েক মিনিট সময় নেয় | কয়েক মিলি-সেকেন্ডে বুট হয় |
| **Resource Usage** | মেমোরি ও সিপিইউ আগেই ফিক্সড বরাদ্দ করতে হয় | অন-ডিমান্ড প্রসেস রিসোর্স ব্যবহার করে |

---

### 1.2 Linux Kernel Components (কীভাবে কন্টেইনার আইসোলেটেড হয়?)

ইন্টারভিউ প্রশ্ন: **Docker কীভাবে একটি প্রসেসকে আইসোলেট বা পৃথক করে?**

১. **Namespaces (আইসোলেশন/Isolation):** প্রসেসকে বাইরের জগত থেকে আলাদা করে।
   - `PID Namespace`: প্রসেস আইডি আলাদা করে (কন্টেইনারে প্রসেস আইডি ১ দেখায়)।
   - `NET Namespace`: নেটওয়ার্ক ইন্টারফেস, আইপি এড্রেস আলাদা করে।
   - `MNT Namespace`: ফাইল সিস্টেম মাউন্ট পয়েন্ট আলাদা করে।
   - `IPC Namespace`: ইন্টার-প্রসেস কমিউনিকেশন আলাদা করে।
২. **Control Groups (cgroups - রিসোর্স লিমিট):** কন্টেইনার কতটুকু CPU, Memory, Disk I/O ব্যবহার করতে পারবে তা নিয়ন্ত্রণ করে।

---

# Module 2: Docker Architecture & Core Components

```
┌────────────────────────────────────────────────────────┐
│ Docker Client (docker build, docker run, docker push)  │
└───────────────────────────┬────────────────────────────┘
                            │ REST API / Unix Socket
                            ▼
┌────────────────────────────────────────────────────────┐
│ Docker Host (Docker Daemon / dockerd)                  │
│  ├─ Images                                             │
│  ├─ Containers                                         │
│  ├─ Networks & Volumes                                 │
└───────────────────────────┬────────────────────────────┘
                            │ Pull / Push
                            ▼
┌────────────────────────────────────────────────────────┐
│ Docker Registry (Docker Hub, AWS ECR, GitHub Artifact) │
└────────────────────────────────────────────────────────┘
```

- **Docker Image:** কন্টেইনার তৈরির জন্য একটি Read-Only ব্লুপ্রিন্ট/টেমপ্লেট।
- **Docker Container:** ডকার ইমেজের একটি চলমান (Running) ও ম্যূটেবল ইনস্ট্যান্স।
- **Docker Engine:** `dockerd` ব্যাকগ্রাউন্ড প্রসেস যা কন্টেইনার ম্যানেজ করে।

---

# Module 3: Dockerfile Best Practices & Multi-Stage Builds

### 3.1 CMD বনাম ENTRYPOINT (পার্থক্য ও আসল ব্যবহার)

| নির্দেশনা | বিবরণ | ওভাররাইড করার নিয়ম |
| :--- | :--- | :--- |
| `CMD ["node", "app.js"]` | ডিফল্ট কমান্ড দেয় | `docker run myimage npm start` দিলে `CMD` সম্পূর্ণ ওভাররাইড হয়ে যাবে |
| `ENTRYPOINT ["node"]` | কন্টেইনারের ফিক্সড এক্সিকিউটেবল নির্ধারণ করে | `docker run myimage app.js` দিলে `node app.js` হিসেবে অ্যাপেন্ড হবে |

**সেরা নিয়ম (Best Practice):**  
`ENTRYPOINT` এ বাইনারি দিন এবং `CMD` তে ডিফল্ট আর্গুমেন্ট দিন:
```dockerfile
ENTRYPOINT ["node"]
CMD ["app.js"]
```

---

### 3.2 Production Ready Multi-Stage Dockerfile Example

**সমস্যা:** সাধারণ ইমেজে ডেভেলপমেন্ট ডিপেন্ডেন্সি ও সোর্স কোড থাকায় ইমেজ সাইজ ১ জিবি ছাড়িয়ে যায়।  
**সমাধান:** **Multi-Stage Build** দিয়ে বিল্ড স্টেজ আলাদা করে ফাইনাল প্রোডাকশন ইমেজে শুধু প্রয়োজনীয় ফাইন্যান্সিয়াল আর্টিফ্যাক্ট রাখা।

```dockerfile
# Stage 1: Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Stage (ছোট ইমেজের জন্য)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# সিকিউরিটির জন্য Root ছাড়া Non-root ইউজার ব্যবহার
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# শুধু বিল্ডের প্রসেস করা ফাইল ও প্রোডাকশন মডিউল কপি করা
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

# Module 4: Docker Storage (Volumes) & Networking

### 4.1 Storage Types

1. **Bind Mounts:** হোস্ট মেশিনের যেকোনো নির্দিষ্ট ফাইল/ফোল্ডার কন্টেইনারে মাউন্ট করা (`-v /host/path:/container/path`) — *Dev Environment-এর জন্য ভালো*।
2. **Named Volumes:** ডকার নিজেই ডেডিকেটেড স্থানে মেমোরি ধরে রাখে (`-v mydata:/app/data`) — *Database/Production ডাটার জন্য সেরা*।
3. **tmpfs Mounts:** ডাটা কন্টেইনারের মেমোরিতে (RAM) থাকে, ডিস্কে সেভ হয় না।

---

### 4.2 Network Drivers

- **Bridge (Default):** একই হোস্ট মেশিনের একাধিক কন্টেইনার নিজেদের মধ্যে প্রাইভেট নেটওয়ার্কে কথা বলে।
- **Host:** কন্টেইনারের নেটওয়ার্ক আইসোলেশন উঠে যায় এবং সরাসরি হোস্ট মেশিনের নেটওয়ার্ক ও পোর্ট ব্যবহার করে (`--net=host`) — *উচ্চ পারফরম্যান্সের জন্য*।
- **Overlay:** একাধিক আলাদা হোস্ট মেশিনের কন্টেইনারকে স্বয়ংক্রিয়ভাবে সংযুক্ত করে (Docker Swarm / K8s)।
- **None:** কন্টেইনারের সব নেটওয়ার্ক বন্ধ থাকে (পূর্ণ আইসোলেটেড)।

---

# Module 5: Docker Compose & Multi-Container Architecture (Deep Dive)

### 5.1 Docker Compose কী এবং কেন প্রয়োজন?

ম্যানুয়ালি ১০টি আলাদা কন্টেইনারের জন্য `docker run` কমান্ড চালানো, নেটওয়ার্ক যুক্ত করা এবং পোর্ট সেট করা অত্যন্ত জটিল ও ভুলপ্রবণ।  
**Docker Compose** হলো একটি ডিক্লারেটিভ টুল যা ১টি মাত্র YAML ফাইল (`docker-compose.yml`) ব্যবহার করে একাধিক কন্টেইনারের পুরো স্ট্যাক (Multi-container Stack) এক সাথে বিল্ড, রান ও পরিচালনা করতে দেয়।

---

### 5.2 `docker-compose.yml` ফাইলের প্রধান কি-ওয়ার্ডসমূহ (Directives Explained)

1. **`version`:** কম্পোজ ফাইলের ফাইল ফরম্যাট ভার্সন (e.g., `'3.8'`)।
2. **`services`:** প্রতিটি আলাদা কন্টেইনারকে সার্ভিস বলে (যেমন: `web`, `database`, `cache`)।
3. **`build`:** কন্টেইনারের জন্য ডকারফাইল কোথায় আছে (e.g., `build: .` বা `context: ./backend`)।
4. **`image`:** ডকার হাব বা রেজিস্ট্রি থেকে সরাসরি রেডিমেড ইমেজ ব্যবহার করতে (e.g., `image: mongo:6.0`)।
5. **`ports`:** হোস্ট মেশিনের পোর্টের সাথে কন্টেইনারের পোর্টের ম্যাপিং (`"HOST_PORT:CONTAINER_PORT"`)।
6. **`environment` & `env_file`:** এনভায়রনমেন্ট ভ্যারিয়েবল বা `.env` ফাইল সেটিং।
7. **`volumes`:** ডাটা পারসিস্ট করার জন্য ভলিউম বা হোস্ট ফোল্ডার মাউন্ট।
8. **`networks`:** সার্ভিসগুলোর যোগাযোগের জন্য আইসোলেটেড প্রাইভেট নেটওয়ার্ক তৈরি।
9. **`depends_on` (with `condition`):** কন্টেইনারগুলো রান করার সঠিক ধারাবাহিকতা রক্ষা করা।
10. **`healthcheck`:** কন্টেইনার সম্পূর্ণ রেডি/হেলদি (Healthy) কিনা তা পরীক্ষা করা।
11. **`restart`:** কন্টেইনার বন্ধ হলে কী করবে (`always`, `unless-stopped`, `on-failure`)।

---

### 5.3 Real-World Multi-Container `docker-compose.yml` Architecture

**সিনারিও:** Node.js App + MongoDB + Redis Cache + Nginx Reverse Proxy (Healthcheck ও Dependency Order সহ প্রোডাকশন গ্রেড স্ট্রাকচার)।

```yaml
version: '3.8'

services:
  # 1. Reverse Proxy Service (Nginx)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api
    networks:
      - app-network

  # 2. Node.js API Service
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://db:27017/myapp
      - REDIS_HOST=redis
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy # ডাটাবেস সম্পূর্ণ রেডি হলে এপিআই চালু হবে
      redis:
        condition: service_started
    networks:
      - app-network

  # 3. Database Service (MongoDB)
  db:
    image: mongo:6.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secretpassword
    volumes:
      - mongo-data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # 4. Cache Service (Redis)
  redis:
    image: redis:alpine
    restart: always
    volumes:
      - redis-data:/data
    networks:
      - app-network

# Top-level Volumes (Data Persistence)
volumes:
  mongo-data:
  redis-data:

# Top-level Custom Isolated Network
networks:
  app-network:
    driver: bridge
```

---

### 5.4 Complete Docker Compose CLI Commands Master Cheatsheet

```bash
# ১. সব সার্ভিস বিল্ড করে ব্যাকগ্রাউন্ডে (Detached Mode) চালানো
docker compose up -d

# ২. ডকারফাইলের পরিবর্তন ইমেজে প্রয়োগ করতে জোরপূর্বক পুনঃবিল্ড করা
docker compose up -d --build

# ৩. সমস্ত সার্ভিস বন্ধ করা এবং কনটেইনার মুছে ফেলা
docker compose down

# ৪. সার্ভিস বন্ধ করার পাশাপাশি ভলিউমস (Volumes) সহ সবকিছু মুছে ফেলা (Caution!)
docker compose down -v

# ৫. চলমান সমস্ত কম্পোজ সার্ভিসের স্ট্যাটাস দেখা
docker compose ps

# ৬. কম্পোজের সব কন্টেইনারের লাইভ মেমোরি ও প্রসেস দেখা
docker compose top

# ৭. সমস্ত কম্পোজ সার্ভিসের রিয়েল-টাইম কম্বাইন্ড লগ দেখা
docker compose logs -f
docker compose logs -f api # নির্দিষ্ট 'api' সার্ভিসের লগ দেখতে

# ৮. নির্দিষ্ট কম্পোজ সার্ভিসের কন্টেইনারের ভেতর ইন্টারঅ্যাক্টিভ শ্যালে ঢোকা
docker compose exec api sh

# ৯. docker-compose.yml ফাইলে কোনো সিনট্যাক্স ভুল আছে কিনা যাচাই (Validate) করা
docker compose config

# ১০. একটি নির্দিষ্ট সার্ভিস রিস্টার্ট দেওয়া
docker compose restart api
```

---


# Module 6: Docker Security & Image Optimization

1. **Non-Root User:** কখনো কন্টেইনার `root` ইউজার হিসেবে চালাবেন না (Dockerfile-এ `USER node` ব্যবহার করুন)।
2. **Minimal Base Image:** `ubuntu` বা `debian` না নিয়ে `alpine` বা `distroless` ইমেজ নিন।
3. **Vulnerability Scanning:** `docker scan myimage` বা `trivy image myimage` দিয়ে নিরাপত্তা ত্রুটি চেক করা।
4. **Layer Caching:** কাস্টম কোডের আগে `package.json` কপি করে `npm install` চালান যাতে কোড পাল্টালেও ডিপেন্ডেন্সি ক্যাশ না ভাঙে।

---

# Module 7: Essential Docker CLI Commands Master Cheatsheet

দৈনন্দিন কাজ এবং ইন্টারভিউতে জিজ্ঞাসিত সমস্ত ডকার কমান্ডের তালিকা ও ব্যাখ্যা:

### 1. Container Management Commands
```bash
# ১. কন্টেইনার ব্যাকগ্রাউন্ডে (Detached Mode) পোর্ট ম্যাপিং ও নাম দিয়ে চালানো
docker run -d -p 8080:80 --name my-app --restart always nginx:alpine

# ২. চলমান কন্টেইনারের তালিকা দেখা (সব দেখতে -a যোগ করুন)
docker ps
docker ps -a

# ৩. কন্টেইনার স্টপ, স্টার্ট এবং রিস্টার্ট করা
docker stop <container_id_or_name>
docker start <container_id_or_name>
docker restart <container_id_or_name>

# ৪. কন্টেইনারের ভেতর ইন্টারঅ্যাক্টিভ শ্যাল (Shell) এ ঢোকা
docker exec -it <container_id> /bin/sh

# ৫. কন্টেইনারের রিয়েল-টাইম লগ (Logs) দেখা
docker logs -f --tail 100 <container_id>

# ৬. কন্টেইনারের লাইভ মেমোরি ও সিপিইউ ব্যবহার দেখা
docker stats

# ৭. কন্টেইনারের বিস্তারিত মেটাডাটা ও আইপি পরীক্ষা করা
docker inspect <container_id>

# ৮. কন্টেইনার মুছে ফেলা (Force Delete করতে -f)
docker rm <container_id>
docker rm -f $(docker ps -aq) # সব কন্টেইনার একবারে ডিলেট
```

---

### 2. Image Management Commands
```bash
# ১. Dockerfile থেকে ইমেজ বিল্ড করা
docker build -t myapp:v1 .
docker build -f Dockerfile.prod -t myapp:prod . # কাস্টম ডকারফাইল দিয়ে

# ২. লোকাল ইমেজের তালিকা দেখা এবং ইমেজ মোছা
docker images
docker rmi <image_id_or_name>

# ৩. ইমেজে নতুন ট্যাগ দেওয়া এবং রেজিস্ট্রিতে পুশ করা
docker tag myapp:v1 myusername/myapp:1.0
docker push myusername/myapp:1.0
docker pull myusername/myapp:1.0

# ৪. ইমেজের লেয়ার ও সাইজ পরিদর্শন করা
docker history myapp:v1
```

---

### 3. Volume & Network Commands
```bash
# ভলিউম ম্যানেজমেন্ট
docker volume create my-vol
docker volume ls
docker volume inspect my-vol
docker volume rm my-vol

# নেটওয়ার্ক ম্যানেজমেন্ট
docker network create --driver bridge my-net
docker network ls
docker network connect my-net my-container
```

---

### 4. Cleanup & System Prune Commands (মেমোরি খালি করা)
```bash
# সমস্ত বন্ধ হওয়া কন্টেইনার, আনইউজড নেটওয়ার্ক এবং ড্যাঙ্গলিং ইমেজ একবারে মুছে ফেলা
docker system prune -f

# ভলিউমস সহ সব অব্যবহৃত উপাদান চিরতরে মুছে ফেলা (সতর্কতা!)
docker system prune -a --volumes -f
```

---

### 5. Docker Compose Commands
```bash
# ব্যাকগ্রাউন্ডে সব সার্ভিস চালানো
docker compose up -d

# সব কন্টেইনার বন্ধ করা এবং ভলিউম সহ মুছে ফেলা
docker compose down -v

# কম্পোজের সমস্ত লাইভ লগ দেখা
docker compose logs -f

# নির্দিষ্ট সার্ভিসের কন্টেইনারে ঢোকা
docker compose exec web sh
```

---

# Module 8: Complete Level-by-Level Question Vault

### 🟢 Junior Level
- **Q: Docker Image এবং Container-এর পার্থক্য কী?**  
  **A:** Image হলো একটি Read-Only টেমপ্লেট, আর Container হলো সেই ইমেজের রানিং (Running) এক্সিকিউটেবল ইনস্ট্যান্স।

### 🟡 Mid Level
- **Q: `COPY` এবং `ADD`-এর পার্থক্য কী?**  
  **A:** `COPY` শুধু লোকাল ফাইল ইমেজে কপি করে। `ADD` দূরবর্তী URL থেকে ফাইল ডাউনলোড করতে পারে এবং `.tar.gz` ফাইল স্বয়ংক্রিয়ভাবে এক্সট্র্যাক্ট করতে পারে। (নিরাপত্তার জন্য `COPY` ব্যবহার করা শ্রেয়)।

### 🔴 Senior Level
- **Q: "Dangling Image" কী এবং কীভাবে ডিলিট করবেন?**  
  **A:** কোনো কন্টেইনার বা ইমেজের সাথে কানেক্টেড না থাকা আন-ট্যাগড (`<none>`) ইমেজকে Dangling Image বলে। মুছে ফেলার কমান্ড: `docker system prune` বা `docker image prune`।

---

> **🎉 অভিনন্দন!** আপনি Docker-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন।

