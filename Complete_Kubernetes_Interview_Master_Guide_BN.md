# Complete Kubernetes (K8s) Interview Master Guide (Junior → Mid → Senior → Lead Level) — বিস্তারিত ব্যাখ্যাসহ অল-ইন-ওয়ান হ্যান্ডবুক

> **লক্ষ্য:** এই গাইডটি এমনভাবে বিস্তৃত ব্যাখ্যা, Control Plane Architecture, Pod Lifecycle, Services, Ingress, PV/PVC, HPA, Probes, RBAC এবং Helm সহ তৈরি করা হয়েছে যাতে যে কেউ Kubernetes-এর যেকোনো ইন্টারভিউ ক্র্যাক করতে পারেন।

---

## 📑 সূচিপত্র (Table of Contents)

1. [Module 1: Kubernetes Architecture & Control Plane](#module-1-kubernetes-architecture--control-plane)
2. [Module 2: Core K8s Objects & Workloads](#module-2-core-k8s-objects--workloads)
3. [Module 3: Networking & Services](#module-3-networking--services)
4. [Module 4: Storage, Configs & Secrets](#module-4-storage-configs--secrets)
5. [Module 5: Auto-scaling, Probes & QoS Classes](#module-5-auto-scaling-probes--qos-classes)
6. [Module 6: Security, RBAC & Helm Package Manager](#module-6-security-rbac--helm-package-manager)
7. [Module 7: Complete Level-by-Level Question Vault](#module-7-complete-level-by-level-question-vault)

---

# Module 1: Kubernetes Architecture & Control Plane

Kubernetes (K8s) হলো একটি ওপেন-সোর্স কন্টেইনার অর্কেস্ট্রেশন প্ল্যাটফর্ম যা স্বয়ংক্রিয়ভাবে Deployment, Scaling এবং Container Management পরিচালনা করে।

```
                       ┌─────────────────────────────────────────┐
                       │           CONTROL PLANE (Master)        │
                       │  ┌──────────────┐    ┌──────────────┐   │
                       │  │ kube-apiserver│    │     etcd     │   │
                       │  └──────────────┘    └──────────────┘   │
                       │  ┌──────────────┐    ┌──────────────┐   │
                       │  │kube-scheduler│    │ controller   │   │
                       │  └──────────────┘    └──────────────┘   │
                       └────────────────────┬────────────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
         ┌─────────────────────┐                         ┌─────────────────────┐
         │  WORKER NODE 1      │                         │  WORKER NODE 2      │
         │  ┌───────────────┐  │                         │  ┌───────────────┐  │
         │  │    kubelet    │  │                         │  │    kubelet    │  │
         │  └───────────────┘  │                         │  └───────────────┘  │
         │  ┌───────────────┐  │                         │  ┌───────────────┐  │
         │  │  kube-proxy   │  │                         │  │  kube-proxy   │  │
         │  └───────────────┘  │                         │  └───────────────┘  │
         │  ┌───────────────┐  │                         │  ┌───────────────┐  │
         │  │ Container Runtime│                        │  │ Container Runtime│
         │  └───────────────┘  │                         │  └───────────────┘  │
         └─────────────────────┘                         └─────────────────────┘
```

### 1.1 Control Plane Components (Master Node)

1. **`kube-apiserver`:** K8s ক্লাস্টারের মূল প্রবেশদ্বার (Front-end)। সমস্ত `kubectl` কমান্ড বা ইন্টারনাল রিকোয়েস্ট এর মাধ্যমে মেমোরিতে যায়।
2. **`etcd`:** ক্লাস্টারের সমস্ত মেটাডাটা ও স্টেট সেভ করে রাখার অত্যন্ত নির্ভরযোগ্য Consistent & Highly-Available **Key-Value Store**।
3. **`kube-scheduler`:** নতুন তৈরি হওয়া Pod কোন নোডে (Worker Node) যাবে তা সিদ্ধান্ত নেয় (CPU, RAM চাহিদা দেখে)।
4. **`kube-controller-manager`:** ক্লাস্টারের কাঙ্ক্ষিত স্টেট (Desired State) ঠিক রাখতে কন্ট্রোলার লুপগুলো (Deployment, ReplicaSet, Node controller) চালায়।

---

### 1.2 Worker Node Components

1. **`kubelet`:** প্রতি Worker Node-এ চলা এজেন্ট যা Master API Server-এর নির্দেশ অনুযায়ী Pod তৈরি ও হেলথ চেক করে।
2. **`kube-proxy`:** প্রতিটি নোডের নেটওয়ার্ক রুলস মেনটেইন করে Pod-to-Pod এবং Service কমিউনিকেশন নিশ্চিত করে।
3. **Container Runtime:** কন্টেইনার এক্সিকিউট করার ইঞ্জিন (যেমন: `containerd`, `CRI-O`)।

---

# Module 2: Core K8s Objects & Workloads

### 2.1 Pod কী?
K8s-এর সবচেয়ে ক্ষুদ্রতম রেন্ডারিং ইউনিট। একটি Pod-এর ভেতর ১টি বা একাধিক কন্টেইনার থাকতে পারে যা একই IP Address এবং Network Space শেয়ার করে।

### 2.2 Workload Objects

- **Deployment:** স্টেটলেস অ্যাপের (Stateless Apps) জন্য। রিলিজের জন্য RollingUpdate বা Recreate স্ট্র্যাটেজি সাপোর্ট করে।
- **StatefulSet:** স্টেটফুল অ্যাপের (যেমন: Databases, Kafka) জন্য। যেখানে প্রতিটি পডের ইউনিক আইডেন্টিটি (e.g., `db-0`, `db-1`) এবং নির্দিষ্ট ফাইল মাউন্ট থাকা জরুরি।
- **DaemonSet:** ক্লাস্টারের প্রতিটি Worker Node-এ বাধ্যতামূলক ১টি করে পড নিশ্চিত করে (যেমন: Log Collector, Monitoring Agents)।
- **Job / CronJob:** সাময়িক কাজ বা নির্দিষ্ট সময় পর পর ব্যাচ প্রসেসিং চালানো।

---

# Module 3: Networking & Services

### 3.1 Service Types (পডকে বাহিরে এক্সপোজ করা)

1. **`ClusterIP` (Default):** শুধুমাত্র ক্লাস্টারের অভ্যন্তরীণ পডগুলোর যোগাযোগের জন্য প্রাইভেট আইপি দেয়।
2. **`NodePort`:** প্রতিটি Worker Node-এর নির্দিষ্ট পোর্ট দিয়ে (Port Range: 30000-32767) বাহ্যিক ট্রাফিক পডে পাঠায়।
3. **`LoadBalancer`:** ক্লাউড প্রোভাইডারের (AWS NLB/ALB, GCP) এক্সটার্নাল লোড ব্যালেন্সার প্রোভিশন করে সরাসরি সার্ভিস এক্সপোজ করে।

---

### 3.2 Ingress Controller
একাধিক সার্ভিসকে ১টি মাত্র এক্সটার্নাল আইপি/ডোমেইন দিয়ে HTTP/HTTPS রুট সাজানোর জন্য **Ingress** ব্যবহৃত হয় (যেমন: Nginx Ingress Controller)।

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
```

---

# Module 4: Storage, Configs & Secrets

- **PersistentVolume (PV):** ক্লাস্টারের স্টোরেজ রিসোর্স (যেমন: AWS EBS Volume)।
- **PersistentVolumeClaim (PVC):** পড কর্তৃক স্টোরেজের জন্য রিকোয়েস্ট।
- **StorageClass:** ডাইনামিকভাবে চাহিদা অনুযায়ী অটোমেটিক PV প্রোভিশন করার টেমপ্লেট।
- **ConfigMap & Secret:** অ্যাপের কনফিগারেশন এবং সংবেদনশীল পাসওয়ার্ড/টোকেন (Base64) পড থেকে আলাদা রাখা।

---

# Module 5: Auto-scaling, Probes & QoS Classes

### 5.1 Probes (পডের হেলথ চেক)

1. **Liveness Probe:** পড বেঁচে আছে কিনা চেক করে। ব্যর্থ হলে K8s পডটিকে Restart মারে।
2. **Readiness Probe:** পড ট্রাফিক নেওয়ার জন্য তৈরি কিনা চেক করে। ব্যর্থ হলে সার্ভিস থেকে পডটি সরিয়ে দেয়।
3. **Startup Probe:** ধীরগতির স্লো অ্যাপ বুট হওয়া পর্যন্ত অন্য প্রোবগুলো থামিয়ে রাখে।

---

### 5.2 Resource Limits & OOMKilled

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m" # 0.25 CPU Core
  limits:
    memory: "512Mi"
    cpu: "500m"
```
*ইন্টারভিউ ট্রিক:* পড যদি তার Memory Limit (512Mi) পার করে ফেলে, তবে K8s প্রসেসটিকে **OOMKilled (Out of Memory)** স্ট্যাটাস দিয়ে মেমোরি খালি করতে পড রিস্টার্ট মারে!

---

### 5.3 Auto-scaling

- **HPA (Horizontal Pod Autoscaler):** সিপিইউ বা মেমোরি লোড বাড়লে পডের সংখ্যা বাড়ায় (`kubectl autoscale deployment`).
- **VPA (Vertical Pod Autoscaler):** পডের CPU/RAM সাইজ ডাইনামিকালি বাড়ায়।
- **Cluster Autoscaler:** ক্লাস্টারে নতুন Worker Node যোগ করে।

---

# Module 6: Security, RBAC & Helm Package Manager

- **RBAC (Role-Based Access Control):** `Role` (Namespace level) এবং `ClusterRole` (Cluster level) দিয়ে কার কী পারমিশন থাকবে তা ঠিক করা (`RoleBinding` দিয়ে ইউজার বা সার্ভিস একাউন্টে অ্যাসাইন করা)।
- **Helm:** Kubernetes-এর প্যাকেজ ম্যানেজার। জটিল K8s YAML ফাইলগুলোকে **Charts** আকারে রিইউজেবল টেমপ্লেট বানাতে ব্যবহৃত হয়।

---

# Module 7: Essential `kubectl` CLI Commands Master Cheatsheet

ইন্টারভিউ ও প্র্যাকটিক্যাল ফিল্ডে ব্যবহৃত সবচেয়ে গুরুত্বপূর্ণ `kubectl` কমান্ডসমূহ:

### 1. Cluster & Info Commands
```bash
# ক্লাস্টার স্ট্যাটাস এবং নোডের তথ্য দেখা
kubectl cluster-info
kubectl get nodes -o wide

# বর্তমান কন্টেক্সট এবং নেমস্পেস চেক করা
kubectl config get-contexts
kubectl config use-context <context_name>
```

---

### 2. Pod & Workload Operations
```bash
# ১. পডের তালিকা দেখা (নির্দিষ্ট নেমস্পেস বা সব নেমস্পেসে)
kubectl get pods -n <namespace>
kubectl get pods -A # All Namespaces

# ২. ইমপারেটিভ উপায়ে দ্রুত টেস্ট পড তৈরি করা
kubectl run test-pod --image=nginx:alpine

# ৩. YAML ফাইল প্রয়োগ বা মোছা
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# ৪. পডের বিস্তারিত ইভেন্ট, আইপি ও প্রোব ট্রাবলশুট করা (অতি গুরুত্বপূর্ণ!)
kubectl describe pod <pod_name>

# ৫. পডের রিয়েল-টাইম লগ (Logs) দেখা
kubectl logs -f <pod_name>
kubectl logs -f <pod_name> -c <container_name> # Multi-container pod এর জন্য

# ৬. পডের ভেতরে ইন্টারঅ্যাক্টিভ শ্যালে ঢোকা
kubectl exec -it <pod_name> -- /bin/sh

# ৭. পোর্ট ফরওয়ার্ডিং (লোকাল পোর্টে পড পরীক্ষা করা)
kubectl port-forward pod/<pod_name> 8080:80
```

---

### 3. Deployment & Scaling Commands
```bash
# ১. ডাইনামিকালি পডের সংখ্যা (Replicas) বাড়ানো বা কমানো
kubectl scale deployment/myapp --replicas=5

# ২. রোলআউট স্ট্যাটাস ও ইতিহাস দেখা
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp

# ৩. পূর্ববর্তী রিলিজ ভার্সনে রোলব্যাক করা (Emergency Undo!)
kubectl rollout undo deployment/myapp
```

---

### 4. Debugging & Resource Metrics Commands
```bash
# ১. ক্লাস্টারের সাম্প্রতিক এরর ইভেন্টগুলো ক্রমানুসারে দেখা
kubectl get events --sort-by='.metadata.creationTimestamp'

# ২. নোড এবং পডের রিয়েল-টাইম CPU ও Memory ব্যবহার দেখা (Metrics Server প্রয়োজন)
kubectl top nodes
kubectl top pods

# ৩. সব রিসোর্স (Pod, Service, PVC, Ingress) এক সাথে দেখা
kubectl get pv,pvc,svc,ingress
```

---

# Module 8: Complete Level-by-Level Question Vault

### 🟢 Junior Level
- **Q: `kubectl get pods` দিলে পড CrashLoopBackOff দেখালে এর অর্থ কী?**  
  **A:** পডটি শুরু হওয়ার পর বারবার ক্র্যাশ করছে এবং K8s রিস্টার্ট মারার জন্য অপেক্ষার সময় বাড়াচ্ছে (Logs দেখতে হবে: `kubectl logs <pod-name>`)।

### 🟡 Mid Level
- **Q: RollingUpdate এবং Recreate Deployment Strategy-র মধ্যে পার্থক্য কী?**  
  **A:** RollingUpdate কোনো ডাউনটাইম ছাড়াই ১টি ১টি করে পড নতুন ভার্সনে আপডেট করে। Recreate আগের সব পড একবারে বন্ধ করে তারপর নতুন ভার্সন বানায় (Downtime হয়)।

### 🔴 Senior Level
- **Q: K8s-এ `etcd` ডাটাবেস ডাউন হয়ে গেলে কী ঘটবে?**  
  **A:** বিদ্যমান চলমান পড ও অ্যাপ সচল থাকবে, কিন্তু কোনো নতুন পড তৈরি, স্কেলিং, মুছে ফেলা বা পরিবর্তন করা যাবে না (কারণ Control Plane এর স্ট্যাটাস রিড/রাইট করতে পারবে না)।

---

> **🎉 অভিনন্দন!** আপনি Kubernetes-এর একটি সম্পূর্ণ **Senior Level Master Handbook** অর্জন করেছেন।

