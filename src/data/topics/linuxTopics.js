import { createTopicSchema } from './createTopicSchema.js';

export const linuxTopics = {
  // 1. TERMINAL & NAVIGATION BASICS
  "linux-basics": createTopicSchema({
    id: "linux-basics",
    techId: "linux",
    title: "Terminal Navigation, Shell Environment & File Manipulation",
    category: "Linux Fundamentals",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Terminal Access"],
    definition: "Linux Shell (Bash/Zsh) provides a command-line interface to interact with the Linux OS kernel, navigate directory trees (pwd, cd, ls), and inspect files (cat, nano, vim).",
    simpleExplanation: "The Linux terminal lets you navigate directories, create files, and manage your system using text commands.",
    whyDoesItExist: "Forms the foundational administration interface for cloud servers and backend application hosting.",
    basicExample: `# Directory navigation & listing
pwd                       # Print Working Directory
ls -la                    # List all files including hidden with permissions
cd /var/www/html          # Change directory
mkdir -p app/storage      # Create nested directories
touch app/index.php       # Create empty file`,
    howItWorks: [
      "1. User enters command in terminal (Bash/Zsh).",
      "2. Shell evaluates PATH environment variable to locate executable binary.",
      "3. Fork-exec model runs binary as child OS process communicating via standard streams (stdin, stdout, stderr)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Terminal Entry -&gt; Shell PATH Evaluation -&gt; OS Fork-Exec Binary Process</text></svg>`,
    realWorldExample: `ls -lh /var/log/nginx/access.log # Inspect log file size in human-readable format`,
    commonUseCases: [
      "Navigating server file systems on remote AWS / Linux cloud instances",
      "Creating directory structures for web server applications",
      "Inspecting application log files"
    ],
    commonMistakes: [
      "Running rm -rf / recklessly as root user (wipes entire system file tree!)",
      "Confusing relative paths (cd app) with absolute paths (cd /app)"
    ],
    bestPractices: [
      "Use tab completion to avoid typing errors in directory paths",
      "Use ls -lh to inspect file sizes in human-readable units (MB, GB)"
    ],
    whenToUse: ["In all Linux server administration tasks"],
    whenNotToUse: ["Do not execute destructive rm -rf commands without double-checking pwd"],
    relatedConcepts: ["Bash", "Zsh", "Absolute vs Relative Path", "PATH Variable"],
    comparison: {
      title: "ls vs ls -la",
      headers: ["Command", "Output", "Hidden Files"],
      rows: [
        ["ls", "Basic file list in current folder", "Hides dotfiles (.env, .git)"],
        ["ls -la", "Detailed list with permissions, owner, size & dates", "Shows all hidden dotfiles"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between an absolute path and a relative path in Linux?", answer: "An absolute path begins from the root directory '/' (e.g. /var/www/html). A relative path begins from the current working directory (e.g. ./src or ../app)." }
    ],
    practiceProblem: {
      description: "Write command showing detailed file list with hidden files.",
      starterCode: `ls -la`,
      testAssertion: "true",
      solution: `ls -la`
    },
    quickRevision: "★ pwd shows current directory path.\n★ ls -la shows detailed files including hidden dotfiles.\n★ PATH environment variable maps command binaries."
  }),

  // 2. FILE PERMISSIONS & OWNERSHIP
  "linux-permissions": createTopicSchema({
    id: "linux-permissions",
    techId: "linux",
    title: "Linux File Permissions (chmod, chown, chgrp & umask)",
    category: "Security",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["linux-basics"],
    definition: "Linux controls file security via POSIX permissions: Read (r=4), Write (w=2), and Execute (x=1) assigned to User (u), Group (g), and Others (o), managed via chmod and chown.",
    simpleExplanation: "Permissions define who can read, modify, or run files on a Linux server. E.g. chmod 755 allows execution; chmod 644 makes files read-only.",
    whyDoesItExist: "Protects sensitive configuration files and isolates user accounts on multi-user operating systems.",
    basicExample: `# Change file permissions (755 = rwxr-xr-x)
chmod 755 script.sh

# Change file ownership to web server user (www-data)
chown -R www-data:www-data /var/www/html

# Secure private key file (Read-only for owner: 600 = rw-------)
chmod 600 ~/.ssh/id_rsa`,
    howItWorks: [
      "1. File mode bitmask stored in filesystem inode (9 bits: rwxrwxrwx).",
      "2. User = Owner (bits 1-3), Group = Group (bits 4-6), Others = World (bits 7-9).",
      "3. Kernel checks process UID against file inode permissions before allowing file access."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Inode Mode Bitmask: User (rwx: 4+2+1=7) | Group (r-x: 4+0+1=5) | Others (r-x: 5)</text></svg>`,
    realWorldExample: `# Fixing Laravel storage folder permission issues:
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache`,
    commonUseCases: [
      "Securing SSH private keys with chmod 600",
      "Setting web server document root ownership with chown -R www-data:www-data",
      "Making shell scripts executable with chmod +x"
    ],
    commonMistakes: [
      "Using chmod 777 carelessly in production (grants EVERY user write access to files!)",
      "Forgetting -R (recursive flag) when modifying folder tree ownership"
    ],
    bestPractices: [
      "Never use chmod 777 in production",
      "Use 644 for standard files and 755 for directories and executable scripts"
    ],
    whenToUse: ["In all Linux file security configurations"],
    whenNotToUse: ["Do not grant world write permissions to root files"],
    relatedConcepts: ["chmod", "chown", "rwx Bitmask", "SSH Keys 600"],
    comparison: {
      title: "Numeric Permission Code Breakdown",
      headers: ["Number", "Binary / Symbol", "Permission Granted"],
      rows: [
        ["7", "111 (rwx)", "Read (4) + Write (2) + Execute (1) = Full Control"],
        ["5", "101 (r-x)", "Read (4) + Execute (1) = Read & Execute"],
        ["4", "100 (r--)", "Read (4) = Read Only"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What does chmod 755 mean in Linux?", answer: "chmod 755 grants the Owner full read, write, and execute permissions (7 = 4+2+1), while Group and Others receive read and execute permissions (5 = 4+1)." }
    ],
    practiceProblem: {
      description: "Write command setting SSH key file to read-only for owner (600).",
      starterCode: `chmod 600 ~/.ssh/id_rsa`,
      testAssertion: "true",
      solution: `chmod 600 ~/.ssh/id_rsa`
    },
    quickRevision: "★ Read=4, Write=2, Execute=1.\n★ 755 = rwxr-xr-x (Standard executable folder).\n★ 600 = rw------- (Secure SSH key file)."
  }),

  // 3. PACKAGE MANAGEMENT
  "linux-packages": createTopicSchema({
    id: "linux-packages",
    techId: "linux",
    title: "Package Management (apt, dnf/yum & Package Repositories)",
    category: "System Admin",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["linux-permissions"],
    definition: "Package managers (apt on Ubuntu/Debian, dnf/yum on RHEL/CentOS) automate software installation, dependency resolution, and updates from official package repositories.",
    simpleExplanation: "Package managers act like app stores for Linux servers, letting you install tools like Node.js, Nginx, or PHP using simple commands.",
    whyDoesItExist: "Eliminates manual source code compilation and resolves complex software dependencies automatically.",
    basicExample: `# Ubuntu/Debian (apt)
sudo apt update                       # Refresh package repository list
sudo apt install -y nginx git curl     # Install software packages
sudo apt upgrade -y                    # Upgrade installed software

# RHEL/CentOS (dnf)
sudo dnf install -y nginx`,
    howItWorks: [
      "1. apt update downloads repository metadata index files from remote mirrors.",
      "2. Resolves dependency graph for requested packages.",
      "3. Downloads compiled .deb/.rpm binaries and installs system files to /usr/bin and /etc."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">apt update -&gt; Dependency Tree Resolver -&gt; Download .deb -&gt; Install to /usr/bin</text></svg>`,
    realWorldExample: `# Adding Node.js PPA repository on Ubuntu:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs`,
    commonUseCases: [
      "Installing Nginx, Node.js, PHP, Redis, and MySQL on cloud servers",
      "Keeping server software patched with security updates",
      "Managing custom PPA package repositories"
    ],
    commonMistakes: [
      "Installing packages without running apt update first (fails to locate newer package versions)",
      "Mixing conflicting PPA repositories causing broken dependency locks"
    ],
    bestPractices: [
      "Run apt update before apt install",
      "Use unattended-upgrades for automated OS security patches"
    ],
    whenToUse: ["In all Linux server software installation workflows"],
    whenNotToUse: ["Do not manually compile software from source if official apt/dnf packages exist"],
    relatedConcepts: ["apt", "dnf / yum", "PPA Repository", ".deb / .rpm"],
    comparison: {
      title: "apt (Debian/Ubuntu) vs dnf (RHEL/CentOS)",
      headers: ["Distro Family", "Package Manager", "Package Extension"],
      rows: [
        ["Debian / Ubuntu", "apt (Advanced Package Tool)", ".deb"],
        ["RHEL / CentOS / Fedora", "dnf (Dandified YUM)", ".rpm"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between apt update and apt upgrade in Ubuntu?", answer: "apt update refreshes the local package index list from remote repositories without installing anything. apt upgrade actually downloads and installs available updates for installed packages." }
    ],
    practiceProblem: {
      description: "Write apt command refreshing package index.",
      starterCode: `sudo apt update`,
      testAssertion: "true",
      solution: `sudo apt update`
    },
    quickRevision: "★ apt update refreshes repository index lists.\n★ apt upgrade installs software updates.\n★ Debian uses .deb (apt); RHEL uses .rpm (dnf)."
  }),

  // 4. PROCESS MANAGEMENT
  "linux-processes": createTopicSchema({
    id: "linux-processes",
    techId: "linux",
    title: "Process Control & Monitoring (ps, top, htop, kill, bg/fg)",
    category: "System Admin",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    readingTime: "10 min",
    prerequisites: ["linux-packages"],
    definition: "Process management tools (ps aux, top, htop, kill, killall) allow administrators to monitor CPU/RAM usage and signal OS processes (SIGTERM 15, SIGKILL 9).",
    simpleExplanation: "Process commands let you view running background programs, inspect memory/CPU usage, and stop stuck processes.",
    whyDoesItExist: "Diagnoses memory leaks, CPU spikes, and unresponsive server applications.",
    basicExample: `# View all running processes with CPU/RAM details
ps aux | grep node

# Interactive real-time process monitor
htop

# Gracefully terminate process (SIGTERM 15)
kill 1234

# Force kill stuck process (SIGKILL 9)
kill -9 1234`,
    howItWorks: [
      "1. Kernel assigns unique Process ID (PID) to every running task.",
      "2. /proc virtual filesystem exposes real-time process state (CPU, RAM, file descriptors).",
      "3. kill command sends POSIX signals (SIGTERM, SIGKILL) to target PID."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">kill -15 PID (Graceful SIGTERM) -- Fallback --&gt; kill -9 PID (Force SIGKILL)</text></svg>`,
    realWorldExample: `# Finding process occupying port 3000:
lsof -i :3000
kill -9 <PID>`,
    commonUseCases: [
      "Finding and terminating frozen background processes",
      "Monitoring CPU and RAM consumption with top / htop",
      "Running commands in background using trailing '&' (e.g. node app.js &)"
    ],
    commonMistakes: [
      "Using kill -9 immediately without attempting graceful SIGTERM 15 first (SIGKILL prevents database cleanups and file handle flushes!)",
      "Leaving orphan background jobs running unwittingly"
    ],
    bestPractices: [
      "Try graceful SIGTERM (kill PID) first before resorting to force SIGKILL (kill -9 PID)",
      "Use htop for intuitive interactive process monitoring"
    ],
    whenToUse: ["When diagnosing server performance spikes or stopping hung processes"],
    whenNotToUse: ["Do not force kill -9 database engines unless emergency shutdown is required"],
    relatedConcepts: ["PID", "SIGTERM (15)", "SIGKILL (9)", "/proc Filesystem", "htop"],
    comparison: {
      title: "SIGTERM (15) vs SIGKILL (9)",
      headers: ["Signal", "Catchable?", "Behavior"],
      rows: [
        ["SIGTERM (15)", "YES (App can run cleanup handlers)", "Graceful request to terminate process"],
        ["SIGKILL (9)", "NO (Cannot be caught or ignored)", "Immediate forced termination by Kernel (No cleanup)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between SIGTERM (15) and SIGKILL (9) in Linux?", answer: "SIGTERM (15) asks a process to terminate gracefully, allowing it to complete active transactions and release resources. SIGKILL (9) forces the Linux Kernel to kill the process immediately without giving it a chance to clean up." }
    ],
    practiceProblem: {
      description: "Write command force killing process PID 5678.",
      starterCode: `kill -9 5678`,
      testAssertion: "true",
      solution: `kill -9 5678`
    },
    quickRevision: "★ ps aux lists all running processes.\n★ SIGTERM (15) = Graceful termination; SIGKILL (9) = Force kill.\n★ htop provides real-time CPU/RAM process monitoring."
  }),

  // 5. TEXT PROCESSING
  "linux-text-processing": createTopicSchema({
    id: "linux-text-processing",
    techId: "linux",
    title: "Linux Text Processing (grep, sed, awk, pipes & redirection)",
    category: "Text Utilities",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    readingTime: "11 min",
    prerequisites: ["linux-processes"],
    definition: "Text processing utilities (grep for searching, sed for stream editing, awk for field extraction, pipes '|', and redirection '>') compose powerful data parsing pipelines.",
    simpleExplanation: "Pipes and text tools let you search log files, extract specific columns, and transform text strings directly from the command line.",
    whyDoesItExist: "Parses gigabytes of log files and system text outputs instantly without opening heavy GUI text editors.",
    basicExample: `# 1. Search log file for 500 error status
grep -i "500 Internal Server Error" /var/log/nginx/access.log

# 2. Extract 1st column (IP addresses) using awk
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# 3. Replace text in file using sed
sed -i 's/APP_ENV=local/APP_ENV=production/g' .env`,
    howItWorks: [
      "1. Pipe operator '|' connects stdout of left command to stdin of right command.",
      "2. Redirection '>' overwrites file; '>>' appends to file.",
      "3. awk parses lines into space/tab-delimited field variables ($1, $2, $3)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">cat access.log | grep 500 | awk '{print $1}' | sort | uniq -c</text></svg>`,
    realWorldExample: `# Real-time streaming log filter:
tail -f /var/log/laravel.log | grep -E "ERROR|CRITICAL"`,
    commonUseCases: [
      "Searching error stack traces in Nginx, Node, and Laravel logs with grep",
      "Automating configuration updates in .env files with sed",
      "Calculating IP request frequency counts with awk and uniq -c"
    ],
    commonMistakes: [
      "Using single '>' redirection accidentally, overwriting valuable log files instead of appending with '>>'!",
      "Forgetting -i flag on sed for in-place file replacement"
    ],
    bestPractices: [
      "Use tail -f to stream live log files in real-time",
      "Use '>>' for safe log appending to prevent accidental file deletion"
    ],
    whenToUse: ["In all server log analysis and text stream manipulation"],
    whenNotToUse: ["Do not use sed for complex multi-level JSON parsing (use jq instead)"],
    relatedConcepts: ["grep", "sed", "awk", "Pipes |", "Redirection > and >>"],
    comparison: {
      title: "Redirection '>' vs '>>'",
      headers: ["Operator", "Behavior", "File State"],
      rows: [
        [">", "Overwrites file content completely", "Wipes existing text"],
        [">>", "Appends new text to end of file", "Preserves existing text"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between '>' and '>>' in Linux shell redirection?", answer: "'>' overwrites the target file completely with the new output (truncating existing content). '>>' appends the new output to the end of the target file without destroying existing content." }
    ],
    practiceProblem: {
      description: "Write command tailing log file in real-time.",
      starterCode: `tail -f /var/log/syslog`,
      testAssertion: "true",
      solution: `tail -f /var/log/syslog`
    },
    quickRevision: "★ grep searches text patterns.\n★ awk extracts specific column fields.\n★ '>' overwrites file; '>>' appends to file."
  }),

  // 6. NETWORKING & SSH
  "linux-networking": createTopicSchema({
    id: "linux-networking",
    techId: "linux",
    title: "Linux Networking Commands (curl, ss, netstat, ping & SSH)",
    category: "Networking",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["linux-text-processing"],
    definition: "Networking tools (curl, wget, ping, ss, netstat, ip, ssh, scp, rsync) inspect open network ports, test HTTP endpoints, and manage secure remote SSH server connections.",
    simpleExplanation: "Networking tools let you check server IP addresses, test web APIs via CLI, inspect active ports, and connect securely to cloud servers via SSH.",
    whyDoesItExist: "Diagnoses network connectivity bottlenecks, open ports, and secure remote server management.",
    basicExample: `# 1. Connect to remote cloud server via SSH with key
ssh -i ~/.ssh/id_rsa ubuntu@10.0.0.1

# 2. Inspect active listening TCP ports
ss -tulpn

# 3. Test API endpoint with HTTP GET request
curl -i https://api.example.com/health

# 4. Sync local files securely to remote server
rsync -avz ./dist/ ubuntu@10.0.0.1:/var/www/app/`,
    howItWorks: [
      "1. SSH uses asymmetric RSA/ED25519 keypairs to authenticate encrypted tunnel over port 22.",
      "2. ss queries kernel socket table directly to list listening TCP/UDP ports.",
      "3. curl sends HTTP requests displaying raw response headers and payloads."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Client -- [SSH Encrypted Tunnel Port 22] --&gt; Remote Server</text></svg>`,
    realWorldExample: `# Testing POST request with JSON payload via curl:
curl -X POST https://api.example.com/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@test.com","password":"secret"}'`,
    commonUseCases: [
      "Connecting securely to AWS EC2 instances using SSH keys",
      "Testing backend REST API endpoints using curl",
      "Checking which process is occupying port 80 or 443 using ss -tulpn"
    ],
    commonMistakes: [
      "Leaving SSH password authentication enabled in /etc/ssh/sshd_config (always enforce SSH Key authentication!)",
      "Using netstat on modern Linux (netstat is deprecated; use ss instead)"
    ],
    bestPractices: [
      "Disable password authentication in SSH; use SSH keys exclusively",
      "Use rsync instead of scp for efficient file deployments (rsync syncs only modified diffs)"
    ],
    whenToUse: ["In all remote server management and API network troubleshooting"],
    whenNotToUse: ["Do not commit private SSH keys (~/.ssh/id_rsa) to Git repositories"],
    relatedConcepts: ["SSH Keypair", "ss -tulpn", "curl", "rsync"],
    comparison: {
      title: "scp vs rsync",
      headers: ["Tool", "Sync Efficiency", "Interrupted Resume"],
      rows: [
        ["scp", "Copies ALL files blindly every time", "No"],
        ["rsync", "Transfers ONLY modified file diffs (delta transfer)", "YES (Can resume interrupted uploads)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is rsync preferred over scp for deploying files to a remote Linux server?", answer: "rsync uses a delta-transfer algorithm to copy ONLY the file differences that have changed, drastically saving bandwidth and time. It also supports resuming interrupted file transfers." }
    ],
    practiceProblem: {
      description: "Write ss command listing listening TCP ports with process names.",
      starterCode: `ss -tulpn`,
      testAssertion: "true",
      solution: `ss -tulpn`
    },
    quickRevision: "★ SSH uses encrypted keypairs over port 22.\n★ ss -tulpn lists open listening ports.\n★ rsync transfers only changed file diffs."
  }),

  // 7. BASH SCRIPTING
  "linux-bash-scripting": createTopicSchema({
    id: "linux-bash-scripting",
    techId: "linux",
    title: "Shell Scripting with Bash (Variables, Loops & Exit Codes)",
    category: "Automation",
    difficulty: "Intermediate",
    experienceBand: "1–3 years",
    prerequisites: ["linux-networking"],
    definition: "Bash Scripting automates system tasks using executable scripts containing variables, conditional logic (if/else), loops (for/while), functions, and exit status codes ($?).",
    simpleExplanation: "Bash scripts bundle series of terminal commands into automated executable scripts to automate deployments and database backups.",
    whyDoesItExist: "Automates repetitive server administration tasks without manual human entry.",
    basicExample: `#!/bin/bash
set -e # Exit immediately if any command fails

APP_DIR="/var/www/app"
BACKUP_DIR="/var/backups"

echo "Starting automated backup for $APP_DIR..."
mkdir -p "$BACKUP_DIR"

if [ -d "$APP_DIR" ]; then
    tar -czf "$BACKUP_DIR/app-$(date +%F).tar.gz" "$APP_DIR"
    echo "Backup successful! Exit Code: $?"
else
    echo "Directory $APP_DIR does not exist!"
    exit 1
fi`,
    howItWorks: [
      "1. Shebang (#!/bin/bash) specifies script interpreter binary.",
      "2. set -e ensures script halts immediately if any sub-command returns non-zero exit code.",
      "3. Evaluates $? exit status codes ($? = 0 means success; non-zero means failure)."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">#!/bin/bash -&gt; set -e -&gt; Conditionals &amp; Loops -&gt; Exit Status ($?)</text></svg>`,
    realWorldExample: `# Automated database deployment script snippet:
chmod +x deploy.sh
./deploy.sh`,
    commonUseCases: [
      "Automating database backups and server provisioning scripts",
      "Writing deployment scripts for Node.js and Laravel applications",
      "Health monitoring and notification scripts"
    ],
    commonMistakes: [
      "Forgetting set -e (script continues running even if a critical sub-command fails!)",
      "Not quoting variables containing spaces ('$VAR' instead of $VAR)"
    ],
    bestPractices: [
      "Always include set -e at the top of production Bash scripts",
      "Quote all variable references (\"$VAR\") to handle spaces safely"
    ],
    whenToUse: ["When automating server maintenance and deployment scripts"],
    whenNotToUse: ["Do not write 2,000-line complex software applications in Bash (use Python/Node)"],
    relatedConcepts: ["Shebang #!/bin/bash", "set -e", "Exit Code $?", "Conditionals [ -f ]"],
    comparison: {
      title: "Exit Code 0 vs Non-Zero Exit Code",
      headers: ["Exit Code ($?)", "Meaning", "Behavior"],
      rows: [
        ["0", "Success", "Command executed cleanly without errors"],
        ["1 - 255", "Failure / Error", "Command failed (Triggers error handling or set -e exit)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "Why is set -e important at the top of a Bash script?", answer: "set -e instructs Bash to exit the script immediately if any command returns a non-zero failure exit status code, preventing error cascading." }
    ],
    practiceProblem: {
      description: "Write shebang line for Bash scripts.",
      starterCode: `#!/bin/bash`,
      testAssertion: "true",
      solution: `#!/bin/bash`
    },
    quickRevision: "★ Shebang: #!/bin/bash.\n★ set -e exits script immediately on any error.\n★ Exit code $? = 0 indicates success."
  }),

  // 8. SYSTEMD & CRON
  "linux-systemd-cron": createTopicSchema({
    id: "linux-systemd-cron",
    techId: "linux",
    title: "Systemd Service Units & Cron Job Automation",
    category: "System Admin",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["linux-bash-scripting"],
    definition: "Systemd manages background background service daemons (systemctl start/enable) using unit files, while Cron schedules recurring time-based tasks using crontab specifications.",
    simpleExplanation: "Systemd keeps your Node.js or Laravel queue workers running continuously (restarting them if they crash). Cron runs scheduled jobs at specific times (like midnight backups).",
    whyDoesItExist: "Ensures background services auto-restart on crashes/reboots and handles periodic scheduled jobs.",
    basicExample: `# --- Systemd Service Unit (/etc/systemd/system/node-app.service) ---
[Unit]
Description=Node.js API Server
After=network.target

[Service]
ExecStart=/usr/bin/node /var/www/app/server.js
Restart=always
User=www-data
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`,
    howItWorks: [
      "1. systemctl enable node-app links unit file for auto-start on server boot.",
      "2. Systemd PID 1 monitors service process and auto-restarts on non-zero crash.",
      "3. crond daemon parses crontab syntax (* * * * *) executing scheduled jobs per minute."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Systemd PID 1 (Auto-restart service) | Crond Daemon (* * * * * Schedule)</text></svg>`,
    realWorldExample: `# Crontab running Laravel Scheduler every minute:
* * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1`,
    commonUseCases: [
      "Running Node.js applications as background Systemd services",
      "Running Laravel Queue Workers continuously with Systemd",
      "Scheduling nightly database backups with Crontab"
    ],
    commonMistakes: [
      "Forgetting systemctl daemon-reload after editing unit files",
      "Assuming Cron inherits shell PATH variables (always specify absolute paths in Crontab!)"
    ],
    bestPractices: [
      "Use absolute executable paths (/usr/bin/node, /usr/bin/php) inside Crontab",
      "Set Restart=always in Systemd service unit files"
    ],
    whenToUse: ["In all background service hosting and periodic task scheduling"],
    whenNotToUse: ["Do not use Cron for high-frequency sub-second jobs"],
    relatedConcepts: ["Systemd", "systemctl", "Crontab", "WantedBy", "Restart=always"],
    comparison: {
      title: "Systemd vs Cron",
      headers: ["Tool", "Execution Model", "Primary Purpose"],
      rows: [
        ["Systemd", "Continuous background daemon process", "Running persistent web servers & queue workers"],
        ["Cron", "Periodic time-scheduled executions", "Running scheduled batch tasks (Nightly backups, cleanup)"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the crontab syntax for running a task every minute?", answer: "* * * * * (5 asterisks representing: Minute, Hour, Day of Month, Month, Day of Week)." }
    ],
    practiceProblem: {
      description: "Write command reloading systemd configuration after unit file edit.",
      starterCode: `sudo systemctl daemon-reload`,
      testAssertion: "true",
      solution: `sudo systemctl daemon-reload`
    },
    quickRevision: "★ Systemd keeps background services running with Restart=always.\n★ Run systemctl daemon-reload after editing unit files.\n★ Crontab syntax: Minute Hour Day Month DayOfWeek."
  }),

  // 9. USER & GROUP MANAGEMENT
  "linux-user-management": createTopicSchema({
    id: "linux-user-management",
    techId: "linux",
    title: "User & Group Administration (useradd, sudoers & /etc/passwd)",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["linux-systemd-cron"],
    definition: "User management controls system security by creating isolated user accounts (useradd, usermod), configuring group memberships, managing /etc/passwd and /etc/shadow, and delegating administrative privileges via /etc/sudoers.",
    simpleExplanation: "User management creates separate login accounts and grants administrative privileges safely using sudo instead of sharing root passwords.",
    whyDoesItExist: "Enforces least privilege security principles across team server access.",
    basicExample: `# Create new service user without login shell
sudo useradd -r -s /bin/false deployer

# Grant user sudo privileges by adding to sudo group
sudo usermod -aG sudo deployer

# Edit sudoers file safely (ALWAYS use visudo!)
sudo visudo`,
    howItWorks: [
      "1. /etc/passwd stores user account metadata (UID, GID, home dir, shell).",
      "2. /etc/shadow stores salted password hashes readable ONLY by root.",
      "3. sudo verifies user privilege against rules defined in /etc/sudoers."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">/etc/passwd (User Metadata) | /etc/shadow (Hashes) | visudo (/etc/sudoers)</text></svg>`,
    realWorldExample: `# Adding deployer user to www-data web server group:
sudo usermod -aG www-data deployer`,
    commonUseCases: [
      "Creating unprivileged system users for application daemons",
      "Managing developer access to cloud Linux servers",
      "Editing sudoers rules using visudo"
    ],
    commonMistakes: [
      "Editing /etc/sudoers directly with nano/vim instead of visudo (syntax errors lock you out of sudo permanently!)",
      "Forgetting -a flag in usermod -aG (overwrites all existing group memberships!)"
    ],
    bestPractices: [
      "ALWAYS use visudo to edit /etc/sudoers (validates syntax before saving)",
      "ALWAYS use the append flag -a when adding users to groups (usermod -aG)"
    ],
    whenToUse: ["In all Linux user authentication and security administration"],
    whenNotToUse: ["Do not grant NOPASSWD: ALL in sudoers unless strictly necessary"],
    relatedConcepts: ["/etc/passwd", "/etc/shadow", "visudo", "sudoers", "usermod -aG"],
    comparison: {
      title: "/etc/passwd vs /etc/shadow",
      headers: ["File", "Permissions", "Content Stored"],
      rows: [
        ["/etc/passwd", "World-readable (644)", "User account names, UIDs, home directories, default shell"],
        ["/etc/shadow", "Root-only (600)", "Encrypted/salted user password hashes & password expiration metadata"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "Why must you ALWAYS use visudo to edit the /etc/sudoers file?", answer: "visudo performs strict syntax checking on the /etc/sudoers file before saving. Editing the file directly with standard editors risks syntax errors that can permanently lock all users out of administrative sudo access." }
    ],
    practiceProblem: {
      description: "Write command adding user to group using append flag.",
      starterCode: `sudo usermod -aG docker alice`,
      testAssertion: "true",
      solution: `sudo usermod -aG docker alice`
    },
    quickRevision: "★ ALWAYS use visudo to edit /etc/sudoers.\n★ ALWAYS use usermod -aG (append) when adding users to groups.\n★ /etc/shadow contains root-encrypted password hashes."
  }),

  // 10. FIREWALL & SECURITY
  "linux-firewall-security": createTopicSchema({
    id: "linux-firewall-security",
    techId: "linux",
    title: "Linux Firewall Security (UFW, iptables, Fail2ban & SSH Hardening)",
    category: "Security",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["linux-user-management"],
    definition: "Firewall security configures network packet filtering rules (UFW, iptables), blocks brute-force authentication attacks using Fail2ban, and hardens SSH configuration.",
    simpleExplanation: "Firewalls block unauthorized incoming internet ports, Fail2ban bans malicious IP addresses automatically, and SSH hardening blocks root logins.",
    whyDoesItExist: "Protects cloud Linux servers against internet port scans and automated SSH brute-force attacks.",
    basicExample: `# 1. Configure UFW Firewall rules
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# 2. SSH Hardening (/etc/ssh/sshd_config)
PermitRootLogin no
PasswordAuthentication no`,
    howItWorks: [
      "1. UFW acts as a user-friendly frontend interface for Linux Netfilter / iptables kernel firewall.",
      "2. Fail2ban monitors /var/log/auth.log for failed SSH login attempts.",
      "3. Automatically inserts iptables drop rules for IP addresses exceeding fail thresholds."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Internet Packets -&gt; UFW / iptables Kernel Firewall -&gt; Fail2ban IP Ban</text></svg>`,
    realWorldExample: `# Checking UFW firewall active rules:
sudo ufw status verbose`,
    commonUseCases: [
      "Closing unneeded server ports with UFW",
      "Blocking SSH brute-force bots using Fail2ban",
      "Disabling SSH root login and password authentication in sshd_config"
    ],
    commonMistakes: [
      "Enabling UFW (ufw enable) BEFORE allowing SSH port 22 (locks you out of remote cloud server instantly!)",
      "Leaving database ports (3306, 5432, 27017) open to world 0.0.0.0"
    ],
    bestPractices: [
      "ALWAYS run sudo ufw allow 22 BEFORE running sudo ufw enable",
      "Set PasswordAuthentication no in /etc/ssh/sshd_config"
    ],
    whenToUse: ["In all public production Linux server deployments"],
    whenNotToUse: ["Do not leave database ports open to public internet"],
    relatedConcepts: ["UFW", "iptables", "Fail2ban", "sshd_config", "Port Hardening"],
    comparison: {
      title: "UFW vs iptables",
      headers: ["Tool", "Level", "Complexity"],
      rows: [
        ["UFW (Uncomplicated Firewall)", "High-level CLI wrapper for Ubuntu", "Simple syntax (ufw allow 80)"],
        ["iptables", "Low-level Linux Kernel packet filter table engine", "Complex rule syntax"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What critical step must you perform before enabling UFW on a remote cloud server?", answer: "You must explicitly allow SSH access (`sudo ufw allow 22` or `sudo ufw allow ssh`) BEFORE running `sudo ufw enable`, otherwise you will be immediately locked out of your remote cloud server." }
    ],
    practiceProblem: {
      description: "Write UFW command allowing HTTP port 80.",
      starterCode: `sudo ufw allow 80/tcp`,
      testAssertion: "true",
      solution: `sudo ufw allow 80/tcp`
    },
    quickRevision: "★ ALWAYS allow port 22 BEFORE enabling UFW.\n★ Fail2ban bans brute-force IPs automatically.\n★ Disable root login & password auth in sshd_config."
  }),

  // 11. KERNEL TUNING & MEMORY
  "linux-kernel-tuning": createTopicSchema({
    id: "linux-kernel-tuning",
    techId: "linux",
    title: "Linux Kernel Tuning & Memory Profiling (sysctl, vmstat, iostat)",
    category: "System Admin",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["linux-firewall-security"],
    definition: "Kernel tuning configures OS runtime parameters using sysctl (/etc/sysctl.conf) and diagnoses memory/storage I/O bottlenecks using free, vmstat, iostat, and tuning Swappiness.",
    simpleExplanation: "Kernel tuning optimizes Linux RAM memory handling, network socket limits, and file descriptor limits for high-concurrency web servers.",
    whyDoesItExist: "Prevents Out-Of-Memory (OOM Killer) server crashes and eliminates file descriptor bottlenecks.",
    basicExample: `# --- High-Performance Web Server Tuning (/etc/sysctl.conf) ---
# Increase max open file descriptors
fs.file-max = 2097152

# Reduce Swappiness (Avoid aggressive disk swapping)
vm.swappiness = 10

# Increase max socket connection backlog queue
net.core.somaxconn = 65535

# Apply sysctl parameters immediately
sudo sysctl -p`,
    howItWorks: [
      "1. sysctl modifies runtime kernel variables in /proc/sys/.",
      "2. vmstat monitors memory paging, process context switches, and swap space.",
      "3. OOM Killer algorithm terminates highest badness-score process when RAM is exhausted."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">RAM Memory Exhaustion -&gt; Kernel OOM Killer -&gt; Terminates Highest Badness PID</text></svg>`,
    realWorldExample: `# Analyzing real-time RAM usage and swap:
free -h
vmstat 1 5`,
    commonUseCases: [
      "Increasing file descriptor limits (ulimit -n 65535) for Node/Nginx web servers",
      "Tuning vm.swappiness = 10 to prevent premature disk swapping",
      "Monitoring I/O bottleneck wait times using iostat -x 1"
    ],
    commonMistakes: [
      "Leaving vm.swappiness = 60 on database servers (causes aggressive disk swapping slowdowns)",
      "Not increasing somaxconn on high-concurrency web servers"
    ],
    bestPractices: [
      "Set vm.swappiness = 10 or 1 on Redis and database servers",
      "Use free -h to monitor available RAM"
    ],
    whenToUse: ["In high-throughput Linux production infrastructure tuning"],
    whenNotToUse: ["Do not tweak sysctl values randomly without performance metrics"],
    relatedConcepts: ["sysctl", "vm.swappiness", "OOM Killer", "ulimit -n", "somaxconn"],
    comparison: {
      title: "free -h: 'used' vs 'available' RAM",
      headers: ["Column", "Meaning"],
      rows: [
        ["used", "RAM actively allocated by processes"],
        ["buff/cache", "RAM used by Linux kernel for file caching (Reclaimable instantly)"],
        ["available", "TRUE usable memory available for new applications without swapping"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is vm.swappiness in Linux and why should it be lowered on database servers?", answer: "vm.swappiness (0-100) controls how aggressively the Linux kernel swaps RAM memory pages to disk. Lowering it (e.g., vm.swappiness = 10) forces the kernel to keep application and database data in fast RAM memory rather than swapping to slow disk storage." }
    ],
    practiceProblem: {
      description: "Write command applying sysctl config file updates.",
      starterCode: `sudo sysctl -p`,
      testAssertion: "true",
      solution: `sudo sysctl -p`
    },
    quickRevision: "★ sysctl tunes runtime kernel parameters (/etc/sysctl.conf).\n★ Lower vm.swappiness (10) for database & cache servers.\n★ free -h: 'available' shows true usable memory."
  })
};
