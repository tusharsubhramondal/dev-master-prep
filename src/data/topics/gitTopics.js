import { createTopicSchema } from './createTopicSchema.js';

export const gitTopics = {
  // 1. VERSION CONTROL CONCEPTS & INIT
  "git-basics": createTopicSchema({
    id: "git-basics",
    techId: "git",
    title: "Version Control Concepts, Git Architecture & Initialization",
    category: "Git Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "8 min",
    prerequisites: ["Terminal Basics"],
    definition: "Git is a distributed version control system (DVCS) that tracks changes in source code files, allowing teams to collaborate, revert history, and maintain code branches.",
    simpleExplanation: "Git acts as a time machine for your code. It records snapshots of your project so you can track changes and undo mistakes easily.",
    whyDoesItExist: "Eliminates manual folder backups (e.g. project_final_v2.zip) and coordinates multi-developer collaboration.",
    basicExample: `# Configure Git global identity
git config --global user.name "Alice Developer"
git config --global user.email "alice@example.com"

# Initialize a new Git repository in current project directory
git init`,
    howItWorks: [
      "1. git init creates hidden .git directory containing object database.",
      "2. Git stores snapshots as immutable Blob objects (files), Tree objects (directories), and Commit objects.",
      "3. Computes cryptographic SHA-1 / SHA-256 hash hashes for every commit object."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">git init -&gt; Creates .git Directory -&gt; Tracks SHA Commit Snapshots</text></svg>`,
    realWorldExample: `# Standard .gitignore for Node.js & Laravel projects:
# Node
node_modules/
npm-debug.log

# Laravel
vendor/
.env
storage/*.key`,
    commonUseCases: [
      "Initializing Git tracking in new Node.js or Laravel projects",
      "Configuring global user name and email",
      "Setting up standard project .gitignore files"
    ],
    commonMistakes: [
      "Forgetting to create a .gitignore file, accidentally committing node_modules, vendor, or secret .env files to Git!",
      "Committing sensitive API secret keys or passwords"
    ],
    bestPractices: [
      "Always create a .gitignore file BEFORE your initial git commit",
      "Never commit secret .env files or dependency folders (node_modules, vendor)"
    ],
    whenToUse: ["In all software development codebases"],
    whenNotToUse: ["Do not track massive binary media files directly in Git (use Git LFS)"],
    relatedConcepts: ["DVCS", "SHA Hash", ".git Directory", ".gitignore"],
    comparison: {
      title: "Centralized VCS vs Distributed VCS (Git)",
      headers: ["Aspect", "Centralized VCS (SVN)", "Distributed VCS (Git)"],
      rows: [
        ["Repository Location", "Single central server only", "Every developer has full local clone of repository"],
        ["Offline Work", "Impossible (Requires server connection)", "Fully functional offline (Commit, branch, inspect log)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is the difference between Centralized and Distributed Version Control Systems?", answer: "In Centralized VCS (SVN), full repository history lives only on a single central server. In Distributed VCS (Git), every developer clones a complete local copy of the full repository history on their machine, enabling offline commits and branching." }
    ],
    practiceProblem: {
      description: "Write command initializing a Git repository.",
      starterCode: `git init`,
      testAssertion: "true",
      solution: `git init`
    },
    quickRevision: "★ Git is a Distributed VCS with complete local history.\n★ git init creates hidden .git directory.\n★ Always setup .gitignore for node_modules and vendor."
  }),

  // 2. BASIC WORKFLOW
  "git-workflow": createTopicSchema({
    id: "git-workflow",
    techId: "git",
    title: "Git Basic Workflow (Working Directory, Staging & Commit)",
    category: "Git Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "9 min",
    prerequisites: ["git-basics"],
    definition: "The core Git workflow moves file changes through three states: Working Directory (modified files), Staging Area / Index (prepared files via git add), and Repository (committed snapshots via git commit).",
    simpleExplanation: "Editing files changes your Working Directory. git add moves changes to the Staging Area. git commit saves a permanent snapshot to history.",
    whyDoesItExist: "Allows developers to review and stage specific file changes selectively before committing.",
    basicExample: `# Check status of modified files
git status

# Stage specific modified file (or all files via git add .)
git add src/server.js

# Record committed snapshot with clear descriptive message
git commit -m "feat(auth): implement JWT token verification"`,
    howItWorks: [
      "1. Working Directory tracks active un-staged file edits.",
      "2. git add creates blob objects in .git/objects and updates Staging Index file.",
      "3. git commit creates tree and commit objects linked to parent commit SHA."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">Working Directory -- [git add] --&gt; Staging Area -- [git commit] --&gt; Repository</text></svg>`,
    realWorldExample: `# Inspecting differences before committing:
git diff # Unstaged changes
git diff --staged # Staged changes ready to commit`,
    commonUseCases: [
      "Staging selective files for modular commits",
      "Inspecting unstaged changes using git diff",
      "Writing conventional commit messages (feat:, fix:, docs:)"
    ],
    commonMistakes: [
      "Writing vague unhelpful commit messages like 'fixed stuff' or 'wip'",
      "Committing unrelated changes across 20 files in a single mega-commit"
    ],
    bestPractices: [
      "Write concise atomic commits focused on a single logical change",
      "Use Conventional Commits format (e.g. fix(api): resolve CORS header issue)"
    ],
    whenToUse: ["In daily software code changes"],
    whenNotToUse: ["Do not commit broken code that fails build tests"],
    relatedConcepts: ["Working Directory", "Staging Area / Index", "git diff", "Conventional Commits"],
    comparison: {
      title: "git diff vs git diff --staged",
      headers: ["Command", "Compares"],
      rows: [
        ["git diff", "Compares Working Directory against Staging Area (Unstaged changes)"],
        ["git diff --staged", "Compares Staging Area against last Commit (Staged changes)"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What are the 3 main states of files in Git?", answer: "The 3 states are: 1) Working Directory (modified files not yet staged), 2) Staging Area / Index (files marked via git add to go into the next commit), and 3) Repository (permanently committed snapshot objects)." }
    ],
    practiceProblem: {
      description: "Write command staging all changes.",
      starterCode: `git add .`,
      testAssertion: "true",
      solution: `git add .`
    },
    quickRevision: "★ 3 States: Working Directory -> Staging Area -> Repository.\n★ git add stages files; git commit saves snapshot.\n★ Use git diff --staged to review staged changes."
  }),

  // 3. BRANCHING & MERGING
  "git-branching": createTopicSchema({
    id: "git-branching",
    techId: "git",
    title: "Git Branching, Checkout & Merging (Fast-Forward vs 3-Way)",
    category: "Git Core",
    difficulty: "Beginner",
    experienceBand: "0–1 year",
    readingTime: "10 min",
    prerequisites: ["git-workflow"],
    definition: "Git branches are lightweight pointers to specific commit SHAs. Merging integrates changes from one branch into another using Fast-Forward merges or 3-Way Merge commits.",
    simpleExplanation: "Branching creates an isolated workspace to develop features without breaking the main codebase. Merging brings those changes back into main.",
    whyDoesItExist: "Allows multiple developers to work on features concurrently without affecting production main code.",
    basicExample: `# Create and switch to new feature branch
git checkout -b feature/login-api
# Modern alternative: git switch -c feature/login-api

# Make commits, then return to main branch
git checkout main

# Merge feature branch into main
git merge feature/login-api`,
    howItWorks: [
      "1. A Git branch is simply a 41-byte text file containing a 40-character SHA commit hash pointer.",
      "2. HEAD pointer points to currently active branch.",
      "3. Fast-Forward merge simply moves branch pointer forward if no diverged commits exist."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">main -- [Commit] --&gt; feature/login-api -&gt; git merge (Fast-Forward / 3-Way)</text></svg>`,
    realWorldExample: `# Deleting merged feature branch:
git branch -d feature/login-api`,
    commonUseCases: [
      "Creating isolated feature branches for task tickets",
      "Merging approved feature branches into main development branch",
      "Listing local and remote branches using git branch -a"
    ],
    commonMistakes: [
      "Developing directly on the main branch in team projects",
      "Forgetting to delete stale local feature branches after merging"
    ],
    bestPractices: [
      "Always create short-lived feature branches (feature/feature-name)",
      "Use git switch -c branch-name for modern branch creation"
    ],
    whenToUse: ["In all feature development and bug fixes"],
    whenNotToUse: ["Do not commit directly to protected main/master production branches"],
    relatedConcepts: ["HEAD Pointer", "Fast-Forward Merge", "3-Way Merge", "git switch"],
    comparison: {
      title: "Fast-Forward Merge vs 3-Way Merge Commit",
      headers: ["Merge Type", "Condition", "Commit History Result"],
      rows: [
        ["Fast-Forward", "Main branch has NO new commits since branch point", "Moves pointer forward; zero new merge commits created"],
        ["3-Way Merge", "Both main and feature branch have new diverged commits", "Creates a new dedicated Merge Commit joining histories"]
      ]
    },
    interviewQuestions: [
      { level: "Beginner", question: "What is a Fast-Forward merge in Git?", answer: "A Fast-Forward merge occurs when merging a target branch into a main branch that has received no new commits since the target branch was created. Git simply moves the main branch pointer forward to the target branch commit SHA without creating a new merge commit." }
    ],
    practiceProblem: {
      description: "Write command creating and switching to branch feature/user.",
      starterCode: `git checkout -b feature/user`,
      testAssertion: "true",
      solution: `git checkout -b feature/user`
    },
    quickRevision: "★ Branches are lightweight 41-byte pointers to commit SHAs.\n★ HEAD points to active branch.\n★ Use git switch -c feature-name to create branches."
  }),

  // 4. RESOLVING CONFLICTS
  "git-conflicts": createTopicSchema({
    id: "git-conflicts",
    techId: "git",
    title: "Resolving Git Merge Conflicts & Conflict Markers",
    category: "Git Core",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["git-branching"],
    definition: "A Merge Conflict occurs when Git cannot automatically reconcile competing changes to the same lines of a file across merging branches, requiring manual human resolution.",
    simpleExplanation: "A conflict happens when two developers edit the same lines in the same file differently. Git pauses and highlights conflict markers for you to choose the correct code.",
    whyDoesItExist: "Prevents Git from making assumptions and overwriting developer code silently.",
    basicExample: `# File conflict markers inside conflicted file:
<<<<<<< HEAD
const PORT = process.env.PORT || 3000; // Your current branch change
=======
const PORT = process.env.PORT || 8080; // Incoming branch change
>>>>>>> feature/port-config

# Resolution steps:
# 1. Edit file to keep desired code and remove conflict markers
# 2. Stage resolved file: git add file.js
# 3. Finalize merge commit: git commit`,
    howItWorks: [
      "1. Git detects overlapping changes on identical line numbers during merge.",
      "2. Pauses merge execution and inserts conflict markers (<<<<<<<, =======, >>>>>>>).",
      "3. Developer edits file, runs git add, and commits to complete merge."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#e11d48" stroke-width="2"/><text x="350" y="95" fill="#fda4af" font-weight="bold" text-anchor="middle">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current) | ======= | &gt;&gt;&gt;&gt;&gt;&gt;&gt; Incoming Branch</text></svg>`,
    realWorldExample: `# Aborting a messy merge during conflict:
git merge --abort`,
    commonUseCases: [
      "Resolving overlapping edits in Node.js package.json or Laravel routes/web.php",
      "Aborting a bad merge using git merge --abort",
      "Using VS Code Conflict Resolution UI"
    ],
    commonMistakes: [
      "Leaving raw conflict markers (<<<<<<<, =======) inside production code by mistake!",
      "Panicking and manually deleting files instead of using git merge --abort"
    ],
    bestPractices: [
      "Pull main updates frequently into feature branches to resolve conflicts early",
      "Use git merge --abort if a conflict becomes too complex to resolve safely"
    ],
    whenToUse: ["When merging diverged branches that modified identical line numbers"],
    whenNotToUse: ["Do not leave unresolved conflict markers in committed code"],
    relatedConcepts: ["Merge Conflicts", "Conflict Markers", "git merge --abort"],
    comparison: {
      title: "Conflict Marker Anatomy",
      headers: ["Marker Syntax", "Meaning"],
      rows: [
        ["<<<<<<< HEAD", "Start of YOUR current branch code"],
        ["=======", "Divider line between competing changes"],
        [">>>>>>> branch-name", "End of INCOMING branch code"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "How do you resolve a Git merge conflict safely?", answer: "Open conflicted files, locate conflict markers (<<<<<<<, =======, >>>>>>>), decide which code to keep, remove the marker lines, save the file, stage it with `git add`, and finalize the merge with `git commit`." }
    ],
    practiceProblem: {
      description: "Write command aborting an in-progress merge.",
      starterCode: `git merge --abort`,
      testAssertion: "true",
      solution: `git merge --abort`
    },
    quickRevision: "★ Conflict markers: <<<<<<< HEAD | ======= | >>>>>>> incoming.\n★ Edit file -> remove markers -> git add -> git commit.\n★ Abort messy merges using git merge --abort."
  }),

  // 5. REMOTE REPOSITORIES
  "git-remotes": createTopicSchema({
    id: "git-remotes",
    techId: "git",
    title: "Remote Repositories (git fetch, pull, push & Upstreams)",
    category: "Git Workflows",
    difficulty: "Intermediate",
    experienceBand: "1–2 years",
    prerequisites: ["git-conflicts"],
    definition: "Remote repositories (hosted on GitHub, GitLab, Bitbucket) synchronize team code changes using git remote, git push, git fetch, and git pull.",
    simpleExplanation: "Remotes are cloud copies of your Git repository. git push uploads your commits; git fetch/pull downloads remote team commits.",
    whyDoesItExist: "Enables cloud backup, code reviews (Pull Requests), and multi-developer collaboration.",
    basicExample: `# Add remote origin server URL
git remote add origin https://github.com/user/project.git

# Push feature branch and set upstream tracking (-u)
git push -u origin feature/login-api

# Fetch remote changes without merging automatically
git fetch origin

# Fetch AND merge remote changes into current branch
git pull origin main`,
    howItWorks: [
      "1. git fetch downloads remote commits into tracking branches (origin/main) without touching working directory.",
      "2. git pull executes git fetch followed immediately by git merge origin/main.",
      "3. git push uploads local commit objects to remote Git server."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Local Repo -- [git push] --&gt; GitHub Remote | GitHub Remote -- [git pull] --&gt; Local Repo</text></svg>`,
    realWorldExample: `# Setting upstream tracking on first push:
git push -u origin main`,
    commonUseCases: [
      "Pushing feature branches to GitHub for Pull Request (PR) code reviews",
      "Fetching remote branch updates safely using git fetch",
      "Pulling latest main changes before starting new work"
    ],
    commonMistakes: [
      "Using git push --force on shared team branches (overwrites remote team commit history!)",
      "Confusing git fetch (safe inspection) with git pull (auto-merges immediately)"
    ],
    bestPractices: [
      "Use git fetch to inspect remote changes before merging",
      "Use git push --force-with-lease instead of plain --force if force-pushing is strictly required"
    ],
    whenToUse: ["In all remote team collaboration"],
    whenNotToUse: ["Do not force push to shared production main branches"],
    relatedConcepts: ["git fetch", "git pull", "git push", "Upstream (-u)", "--force-with-lease"],
    comparison: {
      title: "git fetch vs git pull",
      headers: ["Command", "Action", "Working Directory Impact"],
      rows: [
        ["git fetch", "Downloads remote commits into origin/main", "Zero impact (Safe inspection)"],
        ["git pull", "Downloads remote commits AND merges them into active branch", "Modifies working directory files & creates merge commit"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between git fetch and git pull?", answer: "git fetch downloads new commits from the remote repository into remote tracking branches (origin/main) without modifying your local working files. git pull executes git fetch followed immediately by git merge to combine changes into your current active branch." }
    ],
    practiceProblem: {
      description: "Write command pushing feature branch and setting upstream.",
      starterCode: `git push -u origin feature/login`,
      testAssertion: "true",
      solution: `git push -u origin feature/login`
    },
    quickRevision: "★ git fetch is safe (doesn't modify local working directory).\n★ git pull = git fetch + git merge.\n★ Use --force-with-lease instead of dangerous --force."
  }),

  // 6. INTERACTIVE REBASING
  "git-rebase": createTopicSchema({
    id: "git-rebase",
    techId: "git",
    title: "Interactive Rebasing (git rebase -i & Squashing Commits)",
    category: "Advanced Git",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["git-remotes"],
    definition: "Rebasing rewinds, re-applies, or cleans up commit history. Interactive rebasing (git rebase -i) allows developers to squash, reorder, edit, or reword messy feature commits into a clean linear history.",
    simpleExplanation: "git rebase -i lets you clean up 10 messy 'wip' commits into 1 clean, professional commit before creating a Pull Request.",
    whyDoesItExist: "Maintains a clean, readable, linear Git commit log history across team repositories.",
    basicExample: `# Interactive rebase over the last 4 commits
git rebase -i HEAD~4

# In the opened editor pick / squash commands:
pick a1b2c3d feat(auth): add login endpoint
squash e4f5g6h wip login validation
squash i7j8k9l fix typo in login route`,
    howItWorks: [
      "1. Git rewinds active branch back to base commit.",
      "2. Re-applies chosen commits sequentially, squashing marked commits into unified SHA.",
      "3. Creates clean, linear commit history."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">4 Messy Commits (wip) -- [git rebase -i] --&gt; 1 Clean Linear Commit</text></svg>`,
    realWorldExample: `# Rebasing feature branch onto updated main branch:
git checkout feature/api
git rebase main`,
    commonUseCases: [
      "Squashing draft WIP commits before submitting GitHub Pull Requests",
      "Rewording old commit messages",
      "Rebasing feature branches onto main for linear history"
    ],
    commonMistakes: [
      "Rebasing public commits that have ALREADY been pushed to shared team branches (The Golden Rule of Rebasing!)",
      "Panicking during rebase conflict (use git rebase --abort to safely cancel)"
    ],
    bestPractices: [
      "The Golden Rule of Rebasing: NEVER rebase public shared commits",
      "Use git rebase -i to squash local feature commits before PR review"
    ],
    whenToUse: ["When cleaning up local feature branch commit history"],
    whenNotToUse: ["NEVER rebase commits that have already been pushed to public shared team branches"],
    relatedConcepts: ["git rebase -i", "Squashing", "Golden Rule of Rebasing", "Linear History"],
    comparison: {
      title: "git merge vs git rebase",
      headers: ["Aspect", "git merge", "git rebase"],
      rows: [
        ["History Preservation", "Preserves exact historical timeline with merge commits", "Creates clean linear history by re-applying commits"],
        ["Golden Rule", "Safe on public shared branches", "ONLY perform on local un-shared feature branches"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the Golden Rule of Rebasing in Git?", answer: "The Golden Rule of Rebasing is: Never rebase commits that exist outside your local repository and have been pushed to a public shared branch. Rebasing rewrites commit SHAs, which breaks team member repositories." }
    ],
    practiceProblem: {
      description: "Write command starting interactive rebase for last 3 commits.",
      starterCode: `git rebase -i HEAD~3`,
      testAssertion: "true",
      solution: `git rebase -i HEAD~3`
    },
    quickRevision: "★ Golden Rule: NEVER rebase public shared commits.\n★ git rebase -i squashes messy WIP commits into 1 clean commit.\n★ Cancel a bad rebase using git rebase --abort."
  }),

  // 7. STASHING & CHERRY-PICKING
  "git-stash-cherrypick": createTopicSchema({
    id: "git-stash-cherrypick",
    techId: "git",
    title: "Git Stashing & Cherry-Picking (git stash, git cherry-pick)",
    category: "Advanced Git",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["git-rebase"],
    definition: "git stash temporarily shelves uncommitted working changes to provide a clean working directory, while git cherry-pick selectively applies specific individual commit SHAs from another branch.",
    simpleExplanation: "git stash saves your uncommitted work in progress so you can switch branches quickly. git cherry-pick copies a single commit fix from one branch to another.",
    whyDoesItExist: "Provides workflow flexibility when context-switching or hotfixing urgent bugs.",
    basicExample: `# 1. Stashing uncommitted work
git stash push -m "WIP login feature"
git checkout main # Switch branches cleanly
git checkout feature/login
git stash pop # Restore stashed changes

# 2. Cherry-picking a single commit SHA from another branch
git cherry-pick a1b2c3d4`,
    howItWorks: [
      "1. git stash saves working directory index state to .git/refs/stash stack.",
      "2. Resets working directory to clean HEAD commit state.",
      "3. git cherry-pick extracts diff of specified commit SHA and applies it to current branch."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">git stash (Shelves WIP) | git cherry-pick SHA (Copies single commit)</text></svg>`,
    realWorldExample: `# Listing stashed items:
git stash list
git stash apply stash@{0}`,
    commonUseCases: [
      "Stashing unfinished edits to switch branches for an urgent hotfix",
      "Cherry-picking a production bugfix commit from main into a release branch",
      "Stashing untracked files with git stash -u"
    ],
    commonMistakes: [
      "Forgetting you have stashed changes and creating conflicting edits later",
      "Overusing cherry-pick instead of proper branch merging"
    ],
    bestPractices: [
      "Use descriptive messages with git stash push -m 'message'",
      "Use git cherry-pick -x to record original commit SHA in log"
    ],
    whenToUse: ["When context switching or applying individual bugfix commits across branches"],
    whenNotToUse: ["Do not use cherry-pick for merging entire feature branches"],
    relatedConcepts: ["git stash", "git stash pop", "git cherry-pick", "Context Switching"],
    comparison: {
      title: "git stash pop vs git stash apply",
      headers: ["Command", "Action", "Stash Stack Impact"],
      rows: [
        ["git stash pop", "Applies most recent stash AND removes it from stack", "Removes top item from stash list"],
        ["git stash apply", "Applies stash BUT keeps copy on stash stack", "Retains item on stash list"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is the difference between git stash pop and git stash apply?", answer: "git stash pop applies the stashed changes to your working directory and immediately removes them from the stash stack. git stash apply applies the changes but keeps the stashed item saved on the stack." }
    ],
    practiceProblem: {
      description: "Write command stashing uncommitted changes with message 'wip'.",
      starterCode: `git stash push -m "wip"`,
      testAssertion: "true",
      solution: `git stash push -m "wip"`
    },
    quickRevision: "★ git stash shelves uncommitted work to give a clean working tree.\n★ git stash pop applies and removes top stash.\n★ git cherry-pick SHA copies a single commit to your active branch."
  }),

  // 8. GIT HOOKS & HUSKY
  "git-hooks": createTopicSchema({
    id: "git-hooks",
    techId: "git",
    title: "Git Hooks & Client Automation (Husky, Pre-Commit & Pre-Push)",
    category: "Automation",
    difficulty: "Intermediate",
    experienceBand: "2–4 years",
    prerequisites: ["git-stash-cherrypick"],
    definition: "Git Hooks are event-driven scripts located in .git/hooks/ (or managed via Husky in Node.js) that run automatically before or after Git actions like commit (pre-commit) or push (pre-push).",
    simpleExplanation: "Git Hooks automatically run code linters, formatters (Prettier), and unit tests before allowing a commit or push to succeed.",
    whyDoesItExist: "Enforces code quality standards and prevents broken code from entering the repository.",
    basicExample: `# --- Node.js Husky Pre-Commit Setup ---
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint && npm test`,
    howItWorks: [
      "1. git commit triggers .git/hooks/pre-commit event script.",
      "2. Script executes linters (ESLint, PHP CS Fixer) and unit tests.",
      "3. Exit code 0 allows commit; Exit code non-zero aborts commit with error."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="350" y="95" fill="#34d399" font-weight="bold" text-anchor="middle">git commit -&gt; Pre-Commit Hook (Lint &amp; Test) -&gt; Exit 0: Success | Exit 1: Abort</text></svg>`,
    realWorldExample: `# --- Laravel Pre-Commit Script Example ---
#!/bin/sh
./vendor/bin/pint --test
php artisan test`,
    commonUseCases: [
      "Running ESLint and Prettier automatically on pre-commit in Node projects",
      "Running Laravel Pint and PHPUnit/Pest tests on pre-commit in Laravel projects",
      "Enforcing Conventional Commit message formats using commit-msg hooks"
    ],
    commonMistakes: [
      "Bypassing hooks carelessly with git commit --no-verify",
      "Running slow 5-minute full integration test suites inside pre-commit hooks (keep pre-commit under 5 seconds!)"
    ],
    bestPractices: [
      "Use lint-staged to run linters ONLY on staged files for super fast pre-commit hooks",
      "Share hooks across the team using Husky in package.json"
    ],
    whenToUse: ["In all professional team software repositories"],
    whenNotToUse: ["Do not put multi-minute end-to-end browser tests in local pre-commit hooks"],
    relatedConcepts: ["Git Hooks", "pre-commit", "Husky", "lint-staged"],
    comparison: {
      title: "Pre-Commit Hook vs CI/CD Pipeline",
      headers: ["Stage", "Execution Location", "Primary Purpose"],
      rows: [
        ["Pre-Commit Hook (Husky)", "Local developer machine", "Instant feedback (Linting, formatting, quick unit tests)"],
        ["CI/CD Pipeline (GitHub Actions)", "Cloud Runner Server", "Enforces authoritative build, test, and security verification"]
      ]
    },
    interviewQuestions: [
      { level: "Intermediate", question: "What is Husky and how does it improve Git workflow in Node.js applications?", answer: "Husky makes it easy to configure and share native Git hooks (like pre-commit and pre-push) in Node.js projects, ensuring linters (ESLint), code formatters (Prettier), and unit tests run automatically before code is committed." }
    ],
    practiceProblem: {
      description: "Write Git CLI flag bypassing hooks during commit.",
      starterCode: `git commit --no-verify -m "quick fix"`,
      testAssertion: "true",
      solution: `git commit --no-verify -m "quick fix"`
    },
    quickRevision: "★ Git hooks automate tasks before commit/push.\n★ Husky shares hooks in Node.js repos.\n★ Use lint-staged to run formatters only on staged files."
  }),

  // 9. GIT REFLOG & EMERGENCY RECOVERY
  "git-reflog": createTopicSchema({
    id: "git-reflog",
    techId: "git",
    title: "Git Reflog & Emergency Recovery (Rescuing Deleted Commits)",
    category: "Advanced Git",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["git-hooks"],
    definition: "git reflog (Reference Log) records every local tip update of HEAD in your local repository, enabling recovery of deleted branches, lost commits, or broken rebases.",
    simpleExplanation: "git reflog is Git's safety net. Even if you accidentally delete a branch or break a rebase, reflog lets you restore any lost commit.",
    whyDoesItExist: "Provides complete disaster recovery for lost local commits.",
    basicExample: `# 1. Display local HEAD reference history log
git reflog

# Output example:
# a1b2c3d HEAD@{0}: checkout: moving from feature to main
# e4f5g6h HEAD@{1}: commit: feat: lost feature commit

# 2. Rescue lost commit by checking out SHA or HEAD index!
git checkout e4f5g6h
git branch rescued-feature`,
    howItWorks: [
      "1. Every time HEAD moves (commit, checkout, rebase, reset), Git appends entry to .git/logs/HEAD.",
      "2. Keeps references to dangling orphaned commits for 90 days before garbage collection.",
      "3. Checking out reflog SHA resurrects lost commits instantly."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/><text x="350" y="95" fill="#f472b6" font-weight="bold" text-anchor="middle">git reflog -&gt; Inspect Dangling HEAD@{n} SHA -&gt; git checkout SHA (Rescued!)</text></svg>`,
    realWorldExample: `# Undo accidental hard reset (git reset --hard HEAD~1):
git reflog
git reset --hard HEAD@{1}`,
    commonUseCases: [
      "Recovering accidentally deleted local branches (git branch -D)",
      "Undoing a catastrophic git reset --hard",
      "Rescuing code after a broken git rebase"
    ],
    commonMistakes: [
      "Assuming git reflog works on remote servers (reflog is 100% LOCAL to your machine only!)",
      "Waiting longer than 90 days (default expire time before git gc cleans orphaned commits)"
    ],
    bestPractices: [
      "Use git reflog immediately whenever you think you lost code locally",
      "Create a new branch from the recovered reflog SHA"
    ],
    whenToUse: ["Emergency recovery of lost commits or reset branches"],
    whenNotToUse: ["Do not rely on reflog for uncommitted working directory edits (git reflog ONLY tracks committed HEAD states)"],
    relatedConcepts: ["git reflog", "HEAD@{n}", "Dangling Commits", "Disaster Recovery"],
    comparison: {
      title: "git log vs git reflog",
      headers: ["Command", "Scope", "Contains Deleted Commits?"],
      rows: [
        ["git log", "Shows commit history tree of active branch", "No (Hides deleted/orphaned commits)"],
        ["git reflog", "Shows EVERY local HEAD movement on machine", "YES (Includes deleted branches & resets)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "How does git reflog enable recovery of deleted branches or hard resets?", answer: "git reflog maintains a local journal (.git/logs/HEAD) of every single time the HEAD pointer moved. Even if a branch is deleted or reset, its commit SHA remains in reflog for 90 days, allowing you to checkout the SHA and restore it." }
    ],
    practiceProblem: {
      description: "Write command displaying local reference log.",
      starterCode: `git reflog`,
      testAssertion: "true",
      solution: `git reflog`
    },
    quickRevision: "★ git reflog is your local safety net for lost commits.\n★ Tracks every local HEAD movement.\n★ Recover deleted branches via git checkout HEAD@{n} or SHA."
  }),

  // 10. GIT WORKTREES & LARGE FILES
  "git-worktrees": createTopicSchema({
    id: "git-worktrees",
    techId: "git",
    title: "Git Worktrees & Git LFS (Large File Storage)",
    category: "Advanced Git",
    difficulty: "Senior",
    experienceBand: "3–5 years",
    prerequisites: ["git-reflog"],
    definition: "Git Worktrees (git worktree) allow multiple working directories attached to the same repository simultaneously, while Git LFS replaces large binary files with text pointer files.",
    simpleExplanation: "Git Worktree lets you checkout and work on 2 different branches in separate folders at the same time without stashing or re-cloning.",
    whyDoesItExist: "Eliminates repository re-cloning overhead and prevents repository bloat caused by large media files.",
    basicExample: `# 1. Add new linked worktree in parallel folder for hotfix branch
git worktree add ../project-hotfix hotfix/login-bug

# 2. Work on hotfix in ../project-hotfix while main feature stays open in original folder!

# 3. Remove worktree when finished
git worktree remove ../project-hotfix`,
    howItWorks: [
      "1. git worktree creates secondary working directory sharing the main .git object database.",
      "2. Eliminates duplicate disk storage of .git history.",
      "3. Git LFS replaces large binary files (video, zip) with 1KB text pointer files in Git storage."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">Main Folder (feature) &amp; Worktree Folder (hotfix) -&gt; Shared .git Database</text></svg>`,
    realWorldExample: `# Git LFS setup for tracking video files:
git lfs install
git lfs track "*.mp4"
git add .gitattributes`,
    commonUseCases: [
      "Working on a feature and an urgent hotfix simultaneously in separate folders",
      "Testing Pull Requests in parallel worktree directories",
      "Tracking large binary assets (models, videos, zips) using Git LFS"
    ],
    commonMistakes: [
      "Trying to checkout the SAME branch in two active worktrees simultaneously (Git forbids this)",
      "Committing 500MB binary ZIP files directly to standard Git (use Git LFS!)"
    ],
    bestPractices: [
      "Use git worktree when performing long parallel tasks",
      "Use Git LFS for binary files >50MB"
    ],
    whenToUse: ["When parallel branch development or large binary tracking is required"],
    whenNotToUse: ["Do not use worktrees for simple 1-minute quick edits"],
    relatedConcepts: ["git worktree", "Git LFS", "Parallel Development"],
    comparison: {
      title: "Multiple Repository Clones vs Git Worktrees",
      headers: ["Metric", "Multiple git clone Directories", "Git Worktrees (git worktree)"],
      rows: [
        ["Disk Space", "Duplicates entire .git object database (Heavy)", "Shares single .git object database (Lightweight)"],
        ["Setup Speed", "Slow (Re-downloads full history)", "Instant (Local pointer creation)"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is a Git Worktree and what advantage does it have over cloning a repository twice?", answer: "A Git Worktree allows you to checkout multiple branches simultaneously into separate directories while sharing a single underlying .git object repository, saving disk space and avoiding re-cloning." }
    ],
    practiceProblem: {
      description: "Write command adding worktree folder ../hotfix for branch fix.",
      starterCode: `git worktree add ../hotfix fix`,
      testAssertion: "true",
      solution: `git worktree add ../hotfix fix`
    },
    quickRevision: "★ git worktree checks out multiple branches in parallel folders.\n★ Shares single underlying .git object database.\n★ Git LFS replaces large binaries with 1KB pointers."
  }),

  // 11. MONOREPO WORKFLOWS
  "git-monorepo-workflows": createTopicSchema({
    id: "git-monorepo-workflows",
    techId: "git",
    title: "Monorepo Workflows, Branch Protection & CI/CD Pipelines",
    category: "Architecture",
    difficulty: "Senior",
    experienceBand: "4–6+ years",
    prerequisites: ["git-worktrees"],
    definition: "Enterprise Git architecture uses Monorepos (Turborepo / Nx), Submodules/Subtree, Branch Protection policies, and CI/CD pipelines (GitHub Actions) for automated build testing.",
    simpleExplanation: "Monorepos store multiple apps (Node API + React Frontend + Shared Libs) in 1 repository, protected by mandatory CI/CD test checks and code reviews.",
    whyDoesItExist: "Simplifies cross-project code sharing and enforces strict quality gates across enterprise teams.",
    basicExample: `# --- GitHub Actions CI/CD Workflow (.github/workflows/ci.yml) ---
name: Node & Laravel CI Test Suite
on:
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
    howItWorks: [
      "1. Developer pushes feature branch and opens GitHub Pull Request.",
      "2. Branch protection rules trigger GitHub Actions CI pipeline.",
      "3. Runs linters, unit tests, and security scans; blocks PR merge if tests fail."
    ],
    visualDiagram: `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="350" y="95" fill="#818cf8" font-weight="bold" text-anchor="middle">PR Created -&gt; GitHub Actions CI Pipeline (Tests) -&gt; PR Merge Allowed</text></svg>`,
    realWorldExample: `# Monorepo structure example:
# /apps/web-react
# /apps/api-node
# /packages/shared-dto`,
    commonUseCases: [
      "Managing fullstack Node.js + React monorepos with Turborepo",
      "Configuring GitHub Actions CI/CD test automation pipelines",
      "Enforcing Branch Protection rules requiring 2 peer code reviews"
    ],
    commonMistakes: [
      "Allowing direct commits to main branch without CI status check requirements",
      "Building every package in a monorepo on every PR (use incremental cache tools like Nx/Turborepo)"
    ],
    bestPractices: [
      "Enforce Branch Protection on main (Require PR review + Passing CI checks)",
      "Use Trunk-Based Development with short-lived feature branches"
    ],
    whenToUse: ["In multi-team enterprise applications and monorepo architectures"],
    whenNotToUse: ["Do not configure complex monorepo tooling for a tiny 1-file script"],
    relatedConcepts: ["Monorepo", "GitHub Actions", "Branch Protection", "Trunk-Based Development"],
    comparison: {
      title: "Trunk-Based Development vs GitFlow",
      headers: ["Workflow", "Branch Lifetime", "Deployment Frequency"],
      rows: [
        ["Trunk-Based Development", "Very short-lived feature branches (merged daily)", "Continuous Deployment (Multiple times per day)"],
        ["GitFlow", "Long-lived develop/release/hotfix branches", "Scheduled periodic releases"]
      ]
    },
    interviewQuestions: [
      { level: "Senior", question: "What is Trunk-Based Development and how does it compare to traditional GitFlow?", answer: "Trunk-Based Development emphasizes developers merging short-lived feature branches into a single 'main' branch frequently (often multiple times per day) supported by automated CI/CD tests. GitFlow uses long-lived feature, develop, release, and hotfix branches." }
    ],
    practiceProblem: {
      description: "Write GitHub Actions event trigger for pull_request on main.",
      starterCode: `on:\n  pull_request:\n    branches: [ main ]`,
      testAssertion: "true",
      solution: `on:\n  pull_request:\n    branches: [ main ]`
    },
    quickRevision: "★ Monorepos store multiple apps/packages in 1 repository.\n★ Branch Protection requires code review + passing CI tests.\n★ Trunk-Based Development uses short-lived feature branches."
  })
};
