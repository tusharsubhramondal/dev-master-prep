import { createTopicSchema } from './createTopicSchema.js';

export const kubernetesTopics = {
  // 1. KUBERNETES CORE ARCHITECTURE
  "k8s-basics": createTopicSchema({
    id: "k8s-basics",
    techId: "kubernetes",
    title: "Kubernetes Architecture, Control Plane & Node Components",
    category: "Container Orchestration",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["Docker Basics"],
    definition: "Kubernetes (K8s) is an open-source container orchestration system that automates deployment, scaling, and management of containerized applications across Control Plane nodes and Worker nodes.",
    simpleExplanation: "Kubernetes acts as an automated cluster manager that runs your Node.js and Laravel Docker containers, automatically restarting them if they crash.",
    whyDoesItExist: "Eliminates manual container management, server failover, and hardware scaling.",
    basicExample: `# 1. NODE.JS KUBERNETES DEPLOYMENT MANIFEST (node-deployment.yaml)
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
        image: myregistry/node-api:v1.0.0
        ports:
        - containerPort: 3000

---
# 2. LARAVEL KUBERNETES DEPLOYMENT MANIFEST (laravel-deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: laravel-app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: laravel-app
  template:
    metadata:
      labels:
        app: laravel-app
    spec:
      containers:
      - name: laravel-app
        image: myregistry/laravel-app:v1.0.0
        ports:
        - containerPort: 80
        env:
        - name: DB_HOST
          value: "postgres-service"`,
    howItWorks: [
      "1. Control plane components (kube-apiserver, etcd, kube-scheduler) store desired state.",
      "2. Kubelet agent on worker nodes monitors Pod containers.",
      "3. Controller manager automatically reconciles actual state to match desired replica counts."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">kube-apiserver -&gt; etcd State -&gt; Kubelet Node Agent -&gt; Pod Containers (Node/Laravel)</text></svg>`,
    realWorldExample: `# Kubectl CLI Commands:
kubectl apply -f node-deployment.yaml
kubectl apply -f laravel-deployment.yaml
kubectl get pods -o wide`,
    commonUseCases: [
      "Deploying high-availability Node.js REST API pod replicas",
      "Deploying Laravel PHP-FPM web applications in Kubernetes worker nodes",
      "Automating zero-downtime rolling updates"
    ],
    commonMistakes: [
      "Storing stateful user files directly inside ephemeral Pod container disks (use PersistentVolumes!)",
      "Not setting CPU/Memory resource requests and limits"
    ],
    bestPractices: [
      "Always set resource `requests` and `limits` on all containers",
      "Use kubectl apply -f for declarative manifest management"
    ],
    whenToUse: ["In all production containerized microservice deployments"],
    whenNotToUse: ["Do not deploy Kubernetes for a simple 1-container static web page"],
    relatedConcepts: ["Control Plane", "Kubelet", "Pod", "Deployment", "kubectl"],
    comparison: {
      title: "Docker Compose vs Kubernetes",
      headers: ["Aspect", "Docker Compose", "Kubernetes (K8s)"],
      rows: [
        ["Scope", "Single-host multi-container testing", "Production multi-node cluster orchestration"],
        ["Auto-healing", "Basic container restart", "Automated node failover & Pod rescheduling"],
        ["Auto-scaling", "Manual scale command", "Horizontal Pod Autoscaler (HPA)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the role of the Kubelet in Kubernetes worker nodes?", answer: "The Kubelet is the primary node agent that runs on every worker node. It receives PodSpec manifests from the kube-apiserver and ensures the specified containers are running and healthy." }
    ],
    practiceProblem: {
      description: "Write kubectl CLI command applying a manifest file.",
      starterCode: `kubectl apply -f deployment.yaml`,
      testAssertion: "true",
      solution: `kubectl apply -f deployment.yaml`
    },
    quickRevision: "★ Control Plane manages state (apiserver, etcd).\n★ Kubelet runs on worker nodes to monitor Pods.\n★ Deployments automate zero-downtime rolling updates."
  }),

  // 2. PODS & DEPLOYMENTS
  "k8s-pods-deployments": createTopicSchema({
    id: "k8s-pods-deployments",
    techId: "kubernetes",
    title: "Kubernetes Pods, Declarative Deployments & Rolling Updates",
    category: "Container Orchestration",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["k8s-basics"],
    definition: "A Pod is the smallest deployable computing unit in Kubernetes containing 1 or more containers. Deployments manage Pod ReplicaSets, handling zero-downtime Rolling Updates and instant Rollbacks.",
    simpleExplanation: "A Pod wraps your Docker container. A Deployment maintains e.g. 5 replica Pods, updating them 1 by 1 without stopping your website.",
    whyDoesItExist: "Provides zero-downtime application updates and self-healing container instances.",
    basicExample: `# Rolling Update Config in Deployment Manifest
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Creates 1 new Pod before deleting old one
      maxUnavailable: 0  # Guarantees zero downtime!`,
    howItWorks: [
      "1. Deployment creates new ReplicaSet with updated container image version.",
      "2. Gradually scales up new ReplicaSet while scaling down old ReplicaSet.",
      "3. If new version fails readiness probes, triggers instant `kubectl rollout undo` rollback."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Old Pods (v1) -&gt; Scale Up New Pod (v2) -&gt; Health Check OK -&gt; Scale Down v1</text></svg>`,
    realWorldExample: `# Rolling update and rollback commands:
kubectl set image deployment/node-api-deployment node-api=myregistry/node-api:v2.0.0
kubectl rollout status deployment/node-api-deployment
kubectl rollout undo deployment/node-api-deployment # Instant rollback!`,
    commonUseCases: [
      "Executing zero-downtime code updates for Node.js and Laravel microservices",
      "Rolling back failed container deployments instantly with `kubectl rollout undo`",
      "Scaling pod replicas from 2 to 20 dynamically"
    ],
    commonMistakes: [
      "Deploying raw bare Pods directly without a Deployment controller (bare Pods will NOT automatically restart if a worker node crashes!)",
      "Setting `maxUnavailable: 100%` causing total downtime during updates"
    ],
    bestPractices: [
      "Always manage Pods through Deployment controllers",
      "Set `maxUnavailable: 0` for strict zero-downtime rolling updates"
    ],
    whenToUse: ["In all stateless microservice Pod deployments"],
    whenNotToUse: ["Do not deploy raw un-managed Pods"],
    relatedConcepts: ["Pod", "Deployment", "ReplicaSet", "RollingUpdate", "kubectl rollout"],
    comparison: {
      title: "Pod vs Deployment",
      headers: ["Object", "Role", "Resilience"],
      rows: [
        ["Pod", "Single atomic execution unit containing container(s)", "No self-healing if node fails"],
        ["Deployment", "Controller that manages ReplicaSets of Pods", "Automatic self-healing, scaling, and rolling updates"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "Why should you never deploy bare Pods directly in production Kubernetes?", answer: "Bare Pods are not bound to a controller. If the worker node hosting a bare Pod dies, the Pod is lost forever. Deployments create ReplicaSets that automatically reschedule Pods onto healthy nodes if a failure occurs." }
    ],
    practiceProblem: {
      description: "Write kubectl command to rollback a deployment.",
      starterCode: `kubectl rollout undo deployment/app`,
      testAssertion: "true",
      solution: `kubectl rollout undo deployment/app`
    },
    quickRevision: "★ Pod is the smallest execution unit in K8s.\n★ Deployments manage ReplicaSets for rolling updates.\n★ Use `kubectl rollout undo` to instantly rollback."
  })
};
