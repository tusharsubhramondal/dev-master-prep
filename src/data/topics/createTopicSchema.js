// Schema builder for master topic guides
export const createTopicSchema = ({
  id,
  techId = "javascript",
  category,
  title,
  difficulty,
  experienceBand,
  readingTime = "10 min",
  prerequisites = ["JavaScript Basics"],
  definition,
  simpleExplanation,
  whyDoesItExist,
  basicExample,
  howItWorks,
  visualDiagram,
  realWorldExample,
  commonUseCases,
  commonMistakes,
  bestPractices,
  whenToUse,
  whenNotToUse,
  relatedConcepts,
  comparison,
  interviewQuestions,
  practiceProblem,
  quickRevision
}) => ({
  id,
  techId,
  category: category || "Core Mastery",
  title,
  difficulty: difficulty || "Intermediate",
  experienceBand: experienceBand || "1–3 years",
  readingTime,
  prerequisites,
  definition,
  simpleExplanation,
  whyDoesItExist,
  basicExample,
  howItWorks: howItWorks || ["1. Execution Context initialized.", "2. Variable Environment allocated.", "3. Code evaluated."],
  visualDiagram: visualDiagram || `<svg viewBox="0 0 700 180" class="w-full bg-slate-900 rounded-lg p-2"><rect x="30" y="40" width="640" height="100" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="350" y="95" fill="#60a5fa" font-weight="bold" text-anchor="middle">${title} Architecture &amp; Data Flow</text></svg>`,
  realWorldExample: realWorldExample || basicExample,
  commonUseCases: commonUseCases || ["Building production web applications", "Handling asynchronous data flows", "Optimizing performance"],
  commonMistakes: commonMistakes || ["Not handling error boundaries", "Mutating shared references unintentionally"],
  bestPractices: bestPractices || ["Follow clean code conventions", "Keep functions small and pure"],
  whenToUse: whenToUse || ["In modern application architectures"],
  whenNotToUse: whenNotToUse || ["When a simpler primitive or built-in operation suffices"],
  relatedConcepts: relatedConcepts || ["Execution Context", "Runtime Engine", "Scope"],
  comparison: comparison || {
    title: `${title} Comparison`,
    headers: ["Aspect", "Standard Pattern", "Optimized Pattern"],
    rows: [
      ["Performance", "Standard allocation", "Memoized allocation"],
      ["Readability", "Moderate", "High"]
    ]
  },
  interviewQuestions: interviewQuestions || [
    { level: difficulty || "Intermediate", question: `What is ${title} and why is it important?`, answer: definition }
  ],
  practiceProblem: practiceProblem || {
    description: `Implement a function that demonstrates ${title}.`,
    starterCode: `// Write your code here\nfunction test() {\n  return true;\n}\nconsole.log(test());`,
    testAssertion: "test() === true",
    solution: `function test() {\n  return true;\n}`
  },
  quickRevision: quickRevision || `★ ${title}: Essential core concept.\n★ Understand memory allocation and execution flow.\n★ Always test edge cases.`
});
