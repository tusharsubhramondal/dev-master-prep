import { createTopicSchema } from './createTopicSchema.js';

export const awsTopics = {
  // 1. CLOUD FUNDAMENTALS & IAM
  "aws-basics": createTopicSchema({
    id: "aws-basics",
    techId: "aws",
    title: "AWS Cloud Fundamentals, Global Infrastructure & IAM",
    category: "AWS Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Cloud Computing Basics"],
    definition: "AWS Global Infrastructure spans Regions and isolated Availability Zones (AZs). Identity and Access Management (IAM) controls authentication and authorization via IAM Users, Groups, Roles, and JSON Policies.",
    simpleExplanation: "IAM controls who can access your AWS cloud resources and what actions (read, write, delete) they are allowed to perform.",
    whyDoesItExist: "Provides fine-grained security permissions enforcing the Principle of Least Privilege across AWS cloud resources.",
    basicExample: `// IAM Policy JSON Example (Granting Read-Only S3 Access)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-company-bucket/*"]
    }
  ]
}`,
    howItWorks: [
      "1. AWS Regions consist of 3+ physically isolated Availability Zones (AZs) connected by low-latency fiber.",
      "2. IAM evaluates request Principal, Action, Resource, and Conditions.",
      "3. Default Deny policy requires explicit ALLOW statement to grant permission."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Principal (User/Role) -&gt; IAM Policy Evaluation -&gt; Implicit Deny / Explicit Allow</text></svg>`,
    realWorldExample: `# AWS CLI configuration:
aws configure
aws sts get-caller-identity`,
    commonUseCases: [
      "Granting EC2 instances permissions to access S3 using IAM Roles",
      "Enforcing Multi-Factor Authentication (MFA) on all developer logins",
      "Structuring cloud resources into AWS Regions and Availability Zones"
    ],
    commonMistakes: [
      "Using AWS Root Account for daily development tasks (Root account has unrestricted administrative power!)",
      "Hardcoding AWS Access Key ID and Secret Access Key directly in application source code"
    ],
    bestPractices: [
      "Lock down AWS Root Account with MFA and use IAM Roles for applications",
      "Follow the Principle of Least Privilege when drafting IAM Policies"
    ],
    whenToUse: ["In all AWS cloud security architectures"],
    whenNotToUse: ["Do not share IAM access keys across team members"],
    relatedConcepts: ["IAM Roles", "IAM Policies", "Availability Zones (AZ)", "Least Privilege"],
    comparison: {
      title: "IAM User vs IAM Role",
      headers: ["Identity", "Credentials", "Best Used For"],
      rows: [
        ["IAM User", "Permanent long-term credentials (Password / Access Keys)", "Human developers"],
        ["IAM Role", "Temporary short-term security tokens (STS)", "AWS Services (EC2, Lambda, ECS)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is an IAM Role in AWS and why is it preferred over IAM User access keys for applications?", answer: "An IAM Role provides temporary short-term security credentials (via AWS STS) without hardcoding long-term access keys into application code, eliminating key leak security risks." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command checking active IAM identity.",
      starterCode: `aws sts get-caller-identity`,
      testAssertion: "true",
      solution: `aws sts get-caller-identity`
    },
    quickRevision: "★ Regions contain 3+ isolated Availability Zones (AZs).\n★ Always enforce Principle of Least Privilege in IAM Policies.\n★ Use IAM Roles for AWS services (EC2, Lambda) instead of hardcoded keys."
  }),

  // 2. VIRTUAL COMPUTE (EC2)
  "aws-ec2": createTopicSchema({
    id: "aws-ec2",
    techId: "aws",
    title: "Amazon EC2 (Instance Types, AMIs, Security Groups & EBS)",
    category: "AWS Compute",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["aws-basics"],
    definition: "Amazon Elastic Compute Cloud (EC2) provides resizable virtual servers in the cloud, configured using AMIs (machine images), Instance Types (t3, c6i, m6i), Security Groups (stateful virtual firewalls), and EBS persistent disk storage.",
    simpleExplanation: "EC2 lets you launch virtual cloud servers in seconds to host your Node.js or Laravel backend applications.",
    whyDoesItExist: "Replaces purchasing physical hardware servers with elastic pay-as-you-go cloud virtual machines.",
    basicExample: `# User Data Script (Executes automatically when EC2 launches!)
#!/bin/bash
apt update -y
apt install -y nginx nodejs git
systemctl start nginx`,
    howItWorks: [
      "1. AWS provisions hypervisor virtual machine instance from AMI image.",
      "2. Security Groups enforce stateful firewall rules on incoming/outgoing ports.",
      "3. EBS (Elastic Block Store) volume attaches over network as persistent root disk."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Security Group (Stateful Firewall) -&gt; EC2 Instance -&gt; EBS Storage Volume</text></svg>`,
    realWorldExample: `# Launching EC2 instance via AWS CLI:
aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\
  --instance-type t3.micro \\
  --key-name my-key-pair`,
    commonUseCases: [
      "Hosting Node.js, Laravel, and Python web application backends",
      "Configuring Security Groups to allow port 80/443 web traffic",
      "Using Spot Instances for batch background compute jobs at 90% discount"
    ],
    commonMistakes: [
      "Opening Security Group port 22 (SSH) to 0.0.0.0/0 (exposes SSH to global brute-force bots)",
      "Confusing Security Groups (Stateful, attached to EC2) with Network ACLs (Stateless, attached to Subnets)"
    ],
    bestPractices: [
      "Restrict SSH Security Group access to your specific office/VPN IP address",
      "Use IAM Instance Profiles (Roles) to grant EC2 permissions to AWS S3/RDS"
    ],
    whenToUse: ["When full OS control and custom virtual server configurations are required"],
    whenNotToUse: ["Do not use manual EC2 instances if serverless (Lambda) or containerized (ECS) fits the workload"],
    relatedConcepts: ["EC2", "Security Groups", "EBS Volume", "AMI", "Instance Profile"],
    comparison: {
      title: "Security Groups vs Network ACLs (NACLs)",
      headers: ["Feature", "Security Groups (SG)", "Network ACLs (NACLs)"],
      rows: [
        ["Attachment", "EC2 Instance Level", "Subnet Level"],
        ["State", "Stateful (Return traffic automatically allowed)", "Stateless (Must explicitly allow return traffic)"],
        ["Rules", "ALLOW rules only", "ALLOW and DENY rules"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What does it mean that Security Groups are stateful in Amazon EC2?", answer: "Stateful means if you allow an inbound request (e.g. HTTP on port 80), the outbound response traffic is automatically allowed out regardless of outbound rules." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command describing running EC2 instances.",
      starterCode: `aws ec2 describe-instances`,
      testAssertion: "true",
      solution: `aws ec2 describe-instances`
    },
    quickRevision: "★ EC2 provides virtual servers in the cloud.\n★ Security Groups are stateful firewalls attached to EC2.\n★ EBS volumes provide persistent block storage."
  }),

  // 3. OBJECT STORAGE (S3)
  "aws-s3": createTopicSchema({
    id: "aws-s3",
    techId: "aws",
    title: "Amazon S3 (Buckets, Storage Classes, Policies & Pre-signed URLs)",
    category: "AWS Storage",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["aws-ec2"],
    definition: "Amazon Simple Storage Service (S3) is an object storage service offering 99.999999999% (11 9's) durability for storing files (objects) in global unique Buckets across multiple Storage Classes.",
    simpleExplanation: "S3 is cloud file storage for uploads (images, videos, backups) accessible via web URLs with massive durability.",
    whyDoesItExist: "Provides infinitely scalable, durable file storage without managing disk server capacity.",
    basicExample: `# S3 Bucket Policy (Restricting Bucket to Public Read for Static Assets)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-app-uploads/*"
    }
  ]
}`,
    howItWorks: [
      "1. Objects stored redundantly across minimum 3 physical Availability Zones.",
      "2. Bucket names must be globally unique across ALL AWS accounts worldwide.",
      "3. Pre-signed URLs grant temporary secure upload/download access to private objects."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">S3 Bucket -&gt; 99.999999999% Durability (Redundant across 3 AZs)</text></svg>`,
    realWorldExample: `// Node.js AWS SDK S3 Upload Example:
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const s3 = new S3Client({ region: 'us-east-1' });
await s3.send(new PutObjectCommand({ Bucket: 'my-app', Key: 'file.png', Body: buffer }));

// Laravel Filesystem S3 Driver Example:
Storage::disk('s3')->put('avatars/1.jpg', $fileContents);`,
    commonUseCases: [
      "Storing user file uploads (avatars, images, PDFs) in Node and Laravel apps",
      "Generating temporary secure download links via Pre-signed URLs",
      "Archiving historical logs using S3 Glacier lifecycle rules"
    ],
    commonMistakes: [
      "Disabling 'Block Public Access' accidentally, exposing sensitive company files to global internet",
      "Forgetting lifecycle rules on log buckets causing accumulating storage bills"
    ],
    bestPractices: [
      "Keep 'Block Public Access' enabled by default; use CloudFront or Pre-signed URLs for access",
      "Use S3 Standard-IA or Glacier for infrequently accessed archive data"
    ],
    whenToUse: ["In all cloud file storage applications"],
    whenNotToUse: ["Do not use S3 as a high-speed transactional database disk (use EBS or EFS)"],
    relatedConcepts: ["S3 Bucket", "11 9s Durability", "Pre-signed URL", "Glacier"],
    comparison: {
      title: "S3 Storage Classes",
      headers: ["Storage Class", "Access Frequency", "Cost / GB"],
      rows: [
        ["S3 Standard", "Frequently accessed files", "Standard"],
        ["S3 Standard-IA", "Infrequently accessed (Immediate retrieval)", "Lower Storage / Retrieval Fee"],
        ["S3 Glacier", "Long-term archives (Retrieval takes mins/hrs)", "Lowest Storage Cost"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is an S3 Pre-signed URL and when should you use it?", answer: "An S3 Pre-signed URL is a time-limited URL generated by application code using AWS security credentials. It allows users to upload or download a specific private S3 object securely without making the entire bucket public." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command listing S3 buckets.",
      starterCode: `aws s3 ls`,
      testAssertion: "true",
      solution: `aws s3 ls`
    },
    quickRevision: "★ S3 delivers 11 9s (99.999999999%) data durability.\n★ Bucket names are globally unique worldwide.\n★ Use Pre-signed URLs to grant temporary secure file access."
  }),

  // 4. VIRTUAL PRIVATE CLOUD (VPC)
  "aws-vpc": createTopicSchema({
    id: "aws-vpc",
    techId: "aws",
    title: "Amazon VPC (Subnets, Internet Gateways, NAT Gateways & Route Tables)",
    category: "AWS Networking",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    readingTime: "11 min",
    prerequisites: ["aws-s3"],
    definition: "Amazon VPC (Virtual Private Cloud) is an isolated virtual network containing Public Subnets (connected to Internet Gateway), Private Subnets (outbound internet via NAT Gateway), and Route Tables.",
    simpleExplanation: "A VPC is your private virtual data center in AWS. Public subnets host web servers exposed to the internet; private subnets isolate database servers securely.",
    whyDoesItExist: "Provides complete network isolation and traffic routing security for cloud infrastructure.",
    basicExample: `# Typical Production VPC Architecture:
VPC CIDR Block: 10.0.0.0/16
├── Public Subnet A (10.0.1.0/24)  -> Internet Gateway (ALB / Bastion)
├── Public Subnet B (10.0.2.0/24)  -> Internet Gateway
├── Private Subnet A (10.0.10.0/24) -> NAT Gateway (Application Servers)
└── Database Subnet A (10.0.20.0/24) -> Isolated (MySQL / RDS)`,
    howItWorks: [
      "1. VPC defines IP range (CIDR e.g. 10.0.0.0/16).",
      "2. Public Subnet route table directs 0.0.0.0/0 to Internet Gateway (IGW).",
      "3. Private Subnet route table directs 0.0.0.0/0 to NAT Gateway (allowing outbound updates while blocking inbound internet scans)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Internet -&gt; IGW -&gt; Public Subnet (ALB) -&gt; Private Subnet (App) -&gt; DB Subnet (RDS)</text></svg>`,
    realWorldExample: `# AWS CLI creating VPC:
aws ec2 create-vpc --cidr-block 10.0.0.0/16`,
    commonUseCases: [
      "Isolating database servers (RDS) in private subnets without public IPs",
      "Hosting public web load balancers in Public Subnets",
      "Connecting private subnet servers to internet for package updates via NAT Gateway"
    ],
    commonMistakes: [
      "Placing database servers in Public Subnets with public IP addresses",
      "Forgetting NAT Gateway pricing (NAT Gateways incur hourly and per-GB data transfer charges)"
    ],
    bestPractices: [
      "Always place database instances (RDS, ElastiCache) in isolated Private Subnets",
      "Deploy subnets across at least 2 Availability Zones for Multi-AZ redundancy"
    ],
    whenToUse: ["In all AWS production network infrastructure designs"],
    whenNotToUse: ["Do not expose private backend servers directly to public subnets"],
    relatedConcepts: ["VPC", "Public Subnet", "Private Subnet", "Internet Gateway", "NAT Gateway"],
    comparison: {
      title: "Public Subnet vs Private Subnet",
      headers: ["Subnet Type", "Internet Gateway Route", "Public IP Allowed?", "Best Placed Resources"],
      rows: [
        ["Public Subnet", "Direct route to Internet Gateway (IGW)", "YES", "Application Load Balancer (ALB), Bastion Host"],
        ["Private Subnet", "No direct IGW route (Outbound via NAT Gateway)", "NO", "Backend App Servers, RDS Databases, Redis"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between an Internet Gateway (IGW) and a NAT Gateway in AWS VPC?", answer: "An Internet Gateway allows bi-directional public internet traffic for resources in Public Subnets. A NAT Gateway allows resources in Private Subnets to make outbound internet connections (e.g. for software updates) while preventing un-solicited inbound connections from the public internet." }
    ],
    practiceProblem: {
      description: "Write CIDR notation for VPC containing 65,536 IP addresses.",
      starterCode: `10.0.0.0/16`,
      testAssertion: "true",
      solution: `10.0.0.0/16`
    },
    quickRevision: "★ Public Subnets connect to Internet Gateway (IGW).\n★ Private Subnets use NAT Gateway for outbound updates.\n★ ALWAYS isolate databases (RDS) in Private Subnets."
  }),

  // 5. RELATIONAL DATABASES (RDS)
  "aws-rds": createTopicSchema({
    id: "aws-rds",
    techId: "aws",
    title: "Amazon RDS (PostgreSQL/MySQL, Multi-AZ & Read Replicas)",
    category: "AWS Database",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["aws-vpc"],
    definition: "Amazon RDS (Relational Database Service) is a managed database service supporting PostgreSQL, MySQL, and Aurora, providing Multi-AZ synchronous failover and Read Replicas.",
    simpleExplanation: "RDS manages database OS patching, automated daily backups, hardware scaling, and instant failover without database administration overhead.",
    whyDoesItExist: "Eliminates database administration burden (patching, backups, replication setups).",
    basicExample: `-- Multi-AZ Failover Architecture:
Primary RDS Instance (AZ-a) == Synchronous Replication ==> Standby RDS Instance (AZ-b)
(Auto-fails over DNS within 60s if AZ-a crashes!)`,
    howItWorks: [
      "1. Multi-AZ deployment maintains synchronous block-level secondary replica in a second AZ.",
      "2. On primary failure, RDS automatically updates CNAME DNS record to point to standby instance.",
      "3. Read Replicas replicate asynchronously to offload heavy read queries."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Primary RDS (AZ-a) == Sync Replication ==&gt; Standby RDS (AZ-b Auto Failover)</text></svg>`,
    realWorldExample: `// Node / Laravel DB config pointing to RDS endpoint:
DB_HOST=my-database.c123456.us-east-1.rds.amazonaws.com`,
    commonUseCases: [
      "Hosting managed PostgreSQL and MySQL databases for Node.js and Laravel apps",
      "Configuring Multi-AZ for high availability production deployments",
      "Offloading analytics reads to RDS Read Replicas"
    ],
    commonMistakes: [
      "Confusing Multi-AZ (Disaster Recovery failover) with Read Replicas (Read scaling)",
      "Placing RDS instances in public subnets"
    ],
    bestPractices: [
      "Enable Multi-AZ for production RDS instances",
      "Use Amazon Aurora for 5x performance over standard MySQL/Postgres"
    ],
    whenToUse: ["In all managed relational database hosting on AWS"],
    whenNotToUse: ["Do not host raw self-managed database servers on EC2 if RDS is available"],
    relatedConcepts: ["Multi-AZ", "Read Replicas", "Amazon Aurora", "Automated Backups"],
    comparison: {
      title: "Multi-AZ vs Read Replicas",
      headers: ["Feature", "Multi-AZ Deployment", "Read Replicas"],
      rows: [
        ["Primary Purpose", "High Availability & Disaster Recovery (Failover)", "Scalability (Offloading read SELECT traffic)"],
        ["Replication", "Synchronous (Zero data loss)", "Asynchronous"],
        ["Database Engine Use", "Passive Standby (Cannot accept queries)", "Active Read-Only Instance"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between Multi-AZ and Read Replicas in Amazon RDS?", answer: "Multi-AZ creates a synchronous passive standby instance in a second AZ strictly for automated High Availability failover. Read Replicas use asynchronous replication to create active read-only instances for scaling SELECT query traffic." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command listing RDS DB instances.",
      starterCode: `aws rds describe-db-instances`,
      testAssertion: "true",
      solution: `aws rds describe-db-instances`
    },
    quickRevision: "★ Multi-AZ = Synchronous failover for High Availability.\n★ Read Replicas = Asynchronous read scaling.\n★ Amazon Aurora delivers 5x MySQL performance."
  }),

  // 6. SERVERLESS (LAMBDA)
  "aws-lambda": createTopicSchema({
    id: "aws-lambda",
    techId: "aws",
    title: "AWS Lambda & Serverless Architecture",
    category: "AWS Compute",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["aws-rds"],
    definition: "AWS Lambda is an event-driven serverless compute service that executes application code in response to events (API Gateway, S3, SQS) automatically scaling without server management.",
    simpleExplanation: "Lambda runs your code only when triggered (by an HTTP request or file upload) and charges you only for the exact milliseconds your code runs.",
    whyDoesItExist: "Eliminates server management, idle server costs, and manual scaling infrastructure.",
    basicExample: `// AWS Lambda Node.js Function Example
export const handler = async (event) => {
  const name = event.queryStringParameters?.name || 'World';
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: \`Hello, \${name}!\` }),
  };
};`,
    howItWorks: [
      "1. Event trigger (e.g. API Gateway HTTP request or S3 image upload) invokes Lambda.",
      "2. AWS provisions microVM container instance in milliseconds running handler function.",
      "3. Automatically scales concurrency from 1 to thousands of parallel instances."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">Event Trigger (S3/API Gateway) -&gt; Lambda Handler -&gt; Auto Scale MicroVM</text></svg>`,
    realWorldExample: `// Auto-resizing uploaded images using S3 event trigger -> Lambda:
// S3 ObjectCreated Event -> Invokes Lambda -> Resizes Image -> Saves to S3`,
    commonUseCases: [
      "Building serverless REST APIs using API Gateway + Lambda",
      "Processing S3 file upload events (image thumbnail generation)",
      "Processing background queue jobs from AWS SQS"
    ],
    commonMistakes: [
      "Suffering from Cold Starts (first execution latency delay) on infrequently invoked functions",
      "Exceeding the 15-minute maximum execution timeout per Lambda invocation"
    ],
    bestPractices: [
      "Keep Lambda package sizes small to minimize Cold Start latency",
      "Use Provisioned Concurrency for latency-critical production endpoints"
    ],
    whenToUse: ["In event-driven architectures and serverless API endpoints"],
    whenNotToUse: ["Do not use Lambda for continuous long-running server processes exceeding 15 minutes"],
    relatedConcepts: ["Serverless", "Cold Start", "API Gateway", "Invocation Event"],
    comparison: {
      title: "EC2 vs AWS Lambda",
      headers: ["Aspect", "Amazon EC2", "AWS Lambda"],
      rows: [
        ["Server Management", "Manual OS updates, security patches & scaling", "Zero Server Management (Fully managed by AWS)"],
        ["Billing Model", "Pay per hour running (Even when idle)", "Pay per millisecond execution time (Zero cost when idle)"],
        ["Max Duration", "Unlimited", "15 minutes max per invocation"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is a Cold Start in AWS Lambda and how can it be mitigated?", answer: "A Cold Start is the initial latency delay when Lambda provisions a new execution environment container for an incoming request. Mitigate it by optimizing deployment package size, keeping functions warm, or using Provisioned Concurrency." }
    ],
    practiceProblem: {
      description: "Write basic Lambda response status code object key.",
      starterCode: `return { statusCode: 200, body: 'Hello' };`,
      testAssertion: "true",
      solution: `return { statusCode: 200, body: 'Hello' };`
    },
    quickRevision: "★ Serverless compute billed per millisecond execution.\n★ Max execution timeout is 15 minutes.\n★ Cold starts occur when provisioning new container instances."
  }),

  // 7. LOAD BALANCING & AUTO SCALING
  "aws-alb-autoscaling": createTopicSchema({
    id: "aws-alb-autoscaling",
    techId: "aws",
    title: "Application Load Balancer (ALB) & Auto Scaling Groups",
    category: "AWS Compute",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["aws-lambda"],
    definition: "Application Load Balancer (ALB) operates at Layer 7 distributing HTTP/HTTPS traffic across Target Groups, while Auto Scaling Groups (ASG) dynamically scale EC2 instances based on CPU metrics.",
    simpleExplanation: "ALB distributes incoming website traffic evenly across servers. Auto Scaling Group automatically adds extra servers during traffic spikes and removes them when traffic drops.",
    whyDoesItExist: "Handles high traffic spikes and guarantees application availability across server failures.",
    basicExample: `# Auto Scaling Policy Rule:
Target Tracking Policy: Maintain average CPU utilization at 60%
- If CPU > 60% for 3 mins -> Add 2 EC2 instances
- If CPU < 30% for 5 mins -> Terminate 1 EC2 instance`,
    howItWorks: [
      "1. ALB terminates SSL/TLS and inspects HTTP request path headers.",
      "2. Routes traffic to healthy EC2 instances inside Target Group using Round Robin algorithm.",
      "3. ASG monitors CloudWatch CPU alarms, triggering scale-out or scale-in actions."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">HTTP Traffic -&gt; ALB (Layer 7) -&gt; Target Group -&gt; Auto Scaling Group (EC2)</text></svg>`,
    realWorldExample: `# Path-based routing in ALB:
/api/*  -> Target Group: Node API Servers
/web/*  -> Target Group: Laravel Web Servers`,
    commonUseCases: [
      "Distributing web traffic across multiple EC2 instances in different AZs",
      "Offloading SSL/TLS certificate management using AWS Certificate Manager (ACM)",
      "Path-based HTTP routing (/api vs /app) at load balancer layer"
    ],
    commonMistakes: [
      "Storing user session data locally on EC2 instance disk (breaks ALB round-robin load balancing! Store sessions in Redis!)",
      "Not configuring health checks properly on Target Groups"
    ],
    bestPractices: [
      "Make web application servers stateless by storing session state in Redis",
      "Use AWS Certificate Manager (ACM) for free auto-renewing SSL certificates on ALB"
    ],
    whenToUse: ["In high-traffic production web applications requiring scale"],
    whenNotToUse: ["Do not configure ASG for single-user development instances"],
    relatedConcepts: ["ALB", "Layer 7", "Target Group", "Auto Scaling Group", "ACM SSL"],
    comparison: {
      title: "ALB (Layer 7) vs NLB (Layer 4)",
      headers: ["Load Balancer", "OSI Layer", "Best Used For"],
      rows: [
        ["Application Load Balancer (ALB)", "Layer 7 (HTTP / HTTPS / WebSockets)", "Web applications, microservices & path routing"],
        ["Network Load Balancer (NLB)", "Layer 4 (TCP / UDP / TLS)", "Ultra high performance, gaming, static IP requirements"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why must application servers be stateless when running behind an Application Load Balancer (ALB)?", answer: "Because ALB distributes user HTTP requests across multiple EC2 instances. If sessions are stored on a local instance disk, subsequent requests routed to a different instance will fail. Storing sessions in a central Redis cache keeps servers stateless." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command describing load balancers.",
      starterCode: `aws elbv2 describe-load-balancers`,
      testAssertion: "true",
      solution: `aws elbv2 describe-load-balancers`
    },
    quickRevision: "★ ALB operates at Layer 7 (HTTP/HTTPS) with path-based routing.\n★ Auto Scaling Groups dynamically scale EC2 instances.\n★ Keep web apps stateless using Redis session stores."
  }),

  // 8. CONTAINERS ON AWS (ECS & EKS)
  "aws-ecs-eks": createTopicSchema({
    id: "aws-ecs-eks",
    techId: "aws",
    title: "Containers on AWS: Amazon ECS, Fargate & EKS",
    category: "AWS Compute",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["aws-alb-autoscaling"],
    definition: "AWS provides container orchestration via Amazon ECS (Elastic Container Service) and EKS (Elastic Kubernetes Service), deployed on serverless AWS Fargate compute or EC2 instances.",
    simpleExplanation: "ECS and EKS run and orchestrate your Docker containers on AWS, while Fargate lets you run containers without managing server EC2 instances at all.",
    whyDoesItExist: "Simplifies deploying containerized Docker applications at cloud scale.",
    basicExample: `# AWS ECS Task Definition JSON snippet
{
  "containerDefinitions": [
    {
      "name": "node-app",
      "image": "1234567890.dkr.ecr.us-east-1.amazonaws.com/node-app:v1",
      "cpu": 256,
      "memory": 512,
      "essential": true,
      "portMappings": [{ "containerPort": 3000 }]
    }
  ]
}`,
    howItWorks: [
      "1. ECR (Elastic Container Registry) stores private Docker images.",
      "2. ECS Task Definition specifies container CPU/RAM and environment variables.",
      "3. AWS Fargate provisions serverless compute infrastructure executing containers automatically."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">ECR (Docker Image) -&gt; ECS Task Definition -&gt; AWS Fargate (Serverless Compute)</text></svg>`,
    realWorldExample: `# Pushing Docker image to AWS ECR:
docker tag my-app:latest 123.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123.dkr.ecr.us-east-1.amazonaws.com/my-app:latest`,
    commonUseCases: [
      "Deploying Dockerized Node.js and Laravel applications on AWS Fargate",
      "Storing private container images in AWS ECR",
      "Running enterprise Kubernetes clusters with Amazon EKS"
    ],
    commonMistakes: [
      "Managing EC2 server clusters for ECS manually when serverless Fargate is simpler",
      "Hardcoding database secrets inside Task Definitions (use AWS Secrets Manager)"
    ],
    bestPractices: [
      "Use AWS Fargate launch type for serverless container deployment without EC2 management",
      "Inject secrets into containers from AWS Secrets Manager"
    ],
    whenToUse: ["When deploying containerized applications on AWS"],
    whenNotToUse: ["Do not use complex EKS Kubernetes clusters for simple single-container apps"],
    relatedConcepts: ["ECS", "AWS Fargate", "ECR", "Amazon EKS", "Task Definition"],
    comparison: {
      title: "ECS EC2 Launch Type vs AWS Fargate",
      headers: ["Feature", "ECS EC2 Launch Type", "AWS Fargate"],
      rows: [
        ["Server Management", "You manage and patch EC2 instances", "Zero server management (Serverless compute)"],
        ["Billing", "Pay for EC2 instances running", "Pay per vCPU and Memory consumed by containers"],
        ["Maintenance", "Higher operational overhead", "Zero operational overhead"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is AWS Fargate and how does it differ from traditional ECS on EC2?", answer: "AWS Fargate is a serverless compute engine for ECS and EKS. It runs containers directly without requiring you to provision, configure, patch, or scale underlying EC2 virtual server instances." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command logging in to ECR.",
      starterCode: `aws ecr get-login-password | docker login --username AWS --password-stdin 123.dkr.ecr.us-east-1.amazonaws.com`,
      testAssertion: "true",
      solution: `aws ecr get-login-password | docker login --username AWS --password-stdin 123.dkr.ecr.us-east-1.amazonaws.com`
    },
    quickRevision: "★ ECR stores private Docker container images.\n★ ECS Task Definition specifies container configuration.\n★ Fargate runs containers serverlessly without EC2 servers."
  }),

  // 9. INFRASTRUCTURE AS CODE (IaC)
  "aws-iac": createTopicSchema({
    id: "aws-iac",
    techId: "aws",
    title: "Infrastructure as Code (Terraform & AWS CloudFormation)",
    category: "DevOps",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["aws-ecs-eks"],
    definition: "Infrastructure as Code (IaC) uses declarative configuration files (Terraform HCL, AWS CloudFormation YAML, AWS CDK) to provision and version-control cloud infrastructure reproducibly.",
    simpleExplanation: "IaC lets you define your entire AWS cloud architecture (VPCs, EC2, RDS, S3) as code files that can be version-controlled in Git and deployed with 1 command.",
    whyDoesItExist: "Replaces manual error-prone AWS Console clicking with automated, reproducible infrastructure code.",
    basicExample: `# Terraform HCL snippet provisioning S3 Bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = "my-company-app-bucket-2026"
}

resource "aws_s3_bucket_public_access_block" "app_bucket_privacy" {
  bucket = aws_s3_bucket.app_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
    howItWorks: [
      "1. Developer writes declarative HCL / YAML infrastructure code.",
      "2. terraform plan compares code against current state file (terraform.tfstate).",
      "3. terraform apply calls AWS APIs to create/update infrastructure."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Terraform HCL -&gt; terraform plan -&gt; AWS API Calls -&gt; Cloud Infrastructure</text></svg>`,
    realWorldExample: `# Deploying Terraform infrastructure:
terraform init
terraform plan
terraform apply -auto-approve`,
    commonUseCases: [
      "Provisioning identical Dev, Staging, and Production AWS environments",
      "Version-controlling cloud infrastructure changes in Git repositories",
      "Automating infrastructure teardowns for testing"
    ],
    commonMistakes: [
      "Modifying AWS resources manually in the AWS Web Console after deploying with Terraform (causes State Drift!)",
      "Committing terraform.tfstate containing plain-text database passwords to Git"
    ],
    bestPractices: [
      "Store Terraform state remotely in S3 with DynamoDB state locking",
      "Never modify IaC-managed cloud resources manually in the AWS Console"
    ],
    whenToUse: ["In all production cloud infrastructure management"],
    whenNotToUse: ["Do not commit terraform.tfstate files to public Git"],
    relatedConcepts: ["Terraform", "CloudFormation", "AWS CDK", "State Drift", "Remote State"],
    comparison: {
      title: "Terraform vs CloudFormation",
      headers: ["Feature", "Terraform", "AWS CloudFormation"],
      rows: [
        ["Cloud Support", "Multi-Cloud (AWS, GCP, Azure)", "AWS Only"],
        ["Language", "HashiCorp Configuration Language (HCL)", "JSON or YAML"],
        ["State Storage", "Managed state file (terraform.tfstate)", "Managed automatically by AWS"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is State Drift in Terraform and how do you prevent it?", answer: "State Drift occurs when resources managed by Terraform are manually modified via the AWS Console or CLI. Prevent it by enforcing strict IAM permissions blocking manual console edits and managing resources exclusively through Terraform." }
    ],
    practiceProblem: {
      description: "Write command previewing Terraform execution plan.",
      starterCode: `terraform plan`,
      testAssertion: "true",
      solution: `terraform plan`
    },
    quickRevision: "★ IaC defines infrastructure in version-controlled code.\n★ terraform plan previews changes; apply provisions resources.\n★ Store terraform.tfstate remotely in S3 with DynamoDB locking."
  }),

  // 10. SECURITY & MONITORING
  "aws-security-monitoring": createTopicSchema({
    id: "aws-security-monitoring",
    techId: "aws",
    title: "AWS Security & Monitoring (KMS, Secrets Manager, CloudWatch & CloudTrail)",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["aws-iac"],
    definition: "AWS Security and Monitoring combines KMS (Key Management Service encryption), Secrets Manager (secret rotation), CloudWatch (metrics/logs), and CloudTrail (API audit logging).",
    simpleExplanation: "CloudWatch monitors metrics and logs, CloudTrail logs every AWS user/API action for security audits, and Secrets Manager stores DB passwords securely.",
    whyDoesItExist: "Provides complete observability, security auditing, and compliance across AWS environments.",
    basicExample: `# CloudWatch Metric Alarm Example:
Alarm: CPUUtilization > 85% for 5 minutes
Action: Send alert notification to SNS Topic (Email/Slack)`,
    howItWorks: [
      "1. CloudTrail logs every AWS API call (who did what, when, and from where) to S3.",
      "2. CloudWatch collects metrics, logs, and triggers alarm actions.",
      "3. KMS encrypts data at rest using hardware security modules (HSMs)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">CloudWatch (Metrics &amp; Logs) | CloudTrail (API Security Audit Logs) | KMS Encryption</text></svg>`,
    realWorldExample: `// Fetching database secret from AWS Secrets Manager in Node.js:
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
const client = new SecretsManagerClient({ region: "us-east-1" });
const response = await client.send(new GetSecretValueCommand({ SecretId: "prod/db/password" }));`,
    commonUseCases: [
      "Streaming application logs to CloudWatch Logs",
      "Auditing user activity and API calls with CloudTrail",
      "Rotating database credentials automatically using Secrets Manager"
    ],
    commonMistakes: [
      "Confusing CloudWatch (Performance metrics & app logs) with CloudTrail (AWS API security audit logs)",
      "Disabling CloudTrail audit logging"
    ],
    bestPractices: [
      "Enable CloudTrail in ALL regions for security audit compliance",
      "Use Secrets Manager for database credentials instead of plain text environment variables"
    ],
    whenToUse: ["In all enterprise AWS security and monitoring configurations"],
    whenNotToUse: ["Do not store unencrypted secrets in CloudWatch logs"],
    relatedConcepts: ["CloudWatch", "CloudTrail", "AWS KMS", "Secrets Manager"],
    comparison: {
      title: "CloudWatch vs CloudTrail",
      headers: ["Service", "Primary Focus", "Example Log Data"],
      rows: [
        ["Amazon CloudWatch", "Performance Monitoring & Application Logs", "EC2 CPU %, Nginx access.log, Lambda memory"],
        ["AWS CloudTrail", "Security Auditing & API Call Tracking", "User 'Alice' ran 'DeleteBucket' at 10:15 AM from IP 1.2.3.4"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is the difference between CloudWatch and CloudTrail in AWS?", answer: "CloudWatch monitors application and infrastructure performance (metrics, CPU %, application logs). CloudTrail records a security audit log of every AWS API call made in the account (who performed an action, when, and from what IP address)." }
    ],
    practiceProblem: {
      description: "Write AWS CLI command checking CloudTrail status.",
      starterCode: `aws cloudtrail describe-trails`,
      testAssertion: "true",
      solution: `aws cloudtrail describe-trails`
    },
    quickRevision: "★ CloudWatch = Performance metrics & Application logs.\n★ CloudTrail = Security audit logs of all AWS API calls.\n★ Secrets Manager rotates DB credentials automatically."
  }),

  // 11. WELL-ARCHITECTED FRAMEWORK
  "aws-well-architected": createTopicSchema({
    id: "aws-well-architected",
    techId: "aws",
    title: "AWS Well-Architected Framework (6 Pillars of Cloud Architecture)",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["aws-security-monitoring"],
    definition: "The AWS Well-Architected Framework provides architectural guidelines based on 6 Pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
    simpleExplanation: "The Well-Architected Framework is AWS's official blueprint for building secure, high-performing, resilient, and cost-effective cloud architectures.",
    whyDoesItExist: "Helps cloud architects evaluate and optimize cloud architectures against battle-tested industry standards.",
    basicExample: `# The 6 Pillars of the AWS Well-Architected Framework:
1. Operational Excellence (Automation, IaC, CI/CD)
2. Security (Least Privilege, KMS Encryption, MFA)
3. Reliability (Multi-AZ, Auto-healing, Disaster Recovery)
4. Performance Efficiency (Serverless, Caching, Read Replicas)
5. Cost Optimization (Right-sizing, Reserved Instances, Spot)
6. Sustainability (Reducing environmental footprint)`,
    howItWorks: [
      "1. Architects conduct Well-Architected Reviews against the 6 Pillar questions.",
      "2. Identifies High-Risk Issues (HRIs) and Medium-Risk Issues (MRIs).",
      "3. Generates actionable remediation steps for infrastructure improvements."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">6 Pillars: Ops | Security | Reliability | Performance | Cost | Sustainability</text></svg>`,
    realWorldExample: `# Cost Optimization strategy:
# Using Savings Plans and Reserved Instances for baseline workloads (60% discount)
# Using Spot Instances for stateless batch jobs (90% discount)`,
    commonUseCases: [
      "Evaluating cloud production architectures prior to enterprise launches",
      "Optimizing monthly AWS cloud expenditure using Savings Plans and Spot Instances",
      "Designing multi-region disaster recovery (RTO / RPO goals)"
    ],
    commonMistakes: [
      "Focusing exclusively on performance while ignoring Cost Optimization",
      "Designing single-AZ architectures with single points of failure"
    ],
    bestPractices: [
      "Conduct periodic Well-Architected reviews using the AWS Console Tool",
      "Design for automated recovery from failure"
    ],
    whenToUse: ["In all cloud architectural design reviews"],
    whenNotToUse: ["Do not ignore security recommendations"],
    relatedConcepts: ["6 Pillars", "Cost Optimization", "RTO / RPO", "Multi-AZ"],
    comparison: {
      title: "RTO vs RPO in Disaster Recovery",
      headers: ["Metric", "Acronym", "Meaning"],
      rows: [
        ["RTO", "Recovery Time Objective", "Maximum acceptable TIME application can be offline during outage"],
        ["RPO", "Recovery Point Objective", "Maximum acceptable DATA LOSS duration (e.g. 5 minutes of lost data)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What are the 6 Pillars of the AWS Well-Architected Framework?", answer: "The 6 Pillars are: 1) Operational Excellence, 2) Security, 3) Reliability, 4) Performance Efficiency, 5) Cost Optimization, and 6) Sustainability." }
    ],
    practiceProblem: {
      description: "Write list of 6 AWS Well-Architected Pillars.",
      starterCode: `// Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability`,
      testAssertion: "true",
      solution: `// Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability`
    },
    quickRevision: "★ 6 Pillars: Ops, Security, Reliability, Performance, Cost, Sustainability.\n★ RTO = Max acceptable downtime; RPO = Max acceptable data loss.\n★ Use Savings Plans & Spot Instances for Cost Optimization."
  })
};
