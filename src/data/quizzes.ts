import type { Quiz, QuizQuestion } from '../types/quiz'

/**
 * Question pool. Each course's modules get a deterministic slice of this
 * pool so quiz content is stable across reloads (no random re-shuffling).
 */
const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  web: [
    {
      id: 'w1',
      question: 'What does JSX stand for?',
      options: [
        'JavaScript XML',
        'Java Syntax Extension',
        'JSON XML',
        'JavaScript Extension',
      ],
      correctIndex: 0,
      explanation:
        'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files.',
    },
    {
      id: 'w2',
      question: 'Which hook manages local component state in React?',
      options: ['useEffect', 'useState', 'useRef', 'useMemo'],
      correctIndex: 1,
      explanation:
        'useState returns a stateful value and a setter function that re-renders the component when updated.',
    },
    {
      id: 'w3',
      question: 'What is a React key used for in lists?',
      options: [
        'Styling list items',
        'Sorting list items',
        'Uniquely identifying list items between renders',
        'Limiting the number of items',
      ],
      correctIndex: 2,
      explanation:
        'Keys help React identify which items changed, were added, or were removed — improving reconciliation.',
    },
    {
      id: 'w4',
      question: 'What does the "dependency array" of useEffect control?',
      options: [
        'The order of hooks',
        'When the effect re-runs',
        'Which components can use the effect',
        'Whether the component re-renders',
      ],
      correctIndex: 1,
      explanation:
        'React re-runs the effect whenever any value in the dependency array changes.',
    },
    {
      id: 'w5',
      question: 'Which is NOT a valid HTTP method?',
      options: ['GET', 'POST', 'FETCH', 'DELETE'],
      correctIndex: 2,
      explanation:
        'FETCH is a JavaScript API, not an HTTP method. Valid methods include GET, POST, PUT, PATCH, DELETE.',
    },
    {
      id: 'w6',
      question: 'What does CSS specificity determine?',
      options: [
        'Which stylesheet loads first',
        'Which CSS rule wins when rules conflict',
        'How fast a page renders',
        'Whether a rule is valid',
      ],
      correctIndex: 1,
      explanation:
        'Specificity decides which competing CSS declaration is applied to an element.',
    },
    {
      id: 'w7',
      question: 'In TypeScript, what does `interface` describe?',
      options: [
        'A runtime object',
        'The shape of a value at compile time',
        'A CSS class',
        'A function body',
      ],
      correctIndex: 1,
      explanation:
        'Interfaces are compile-time contracts — they describe the shape of an object and disappear at runtime.',
    },
    {
      id: 'w8',
      question: 'What is the virtual DOM?',
      options: [
        'A browser feature',
        'A lightweight in-memory representation of the UI',
        'A CSS layout engine',
        'A database',
      ],
      correctIndex: 1,
      explanation:
        'React maintains a virtual DOM — a JS object tree — and diffs it against the previous version to compute minimal updates.',
    },
  ],
  data: [
    {
      id: 'd1',
      question: 'Which pandas method loads a CSV file?',
      options: ['read_csv', 'load_csv', 'open_csv', 'csv_read'],
      correctIndex: 0,
      explanation:
        '`pandas.read_csv` reads a CSV file into a DataFrame.',
    },
    {
      id: 'd2',
      question: 'What does NumPy primarily provide?',
      options: [
        'Web servers',
        'Numerical arrays and math operations',
        'Database connections',
        'HTML templating',
      ],
      correctIndex: 1,
      explanation:
        'NumPy provides the ndarray and fast vectorized math operations.',
    },
    {
      id: 'd3',
      question: 'Which plot type best shows a distribution?',
      options: ['Bar chart', 'Histogram', 'Pie chart', 'Scatter plot'],
      correctIndex: 1,
      explanation:
        'Histograms bin values and show the frequency distribution of a numeric variable.',
    },
    {
      id: 'd4',
      question: 'What is overfitting in machine learning?',
      options: [
        'The model performs well on training but poorly on new data',
        'The model is too simple',
        'The dataset is too large',
        'The model trains too fast',
      ],
      correctIndex: 0,
      explanation:
        'Overfitting means the model memorized the training data instead of learning generalizable patterns.',
    },
    {
      id: 'd5',
      question: 'What does the `groupby` operation do?',
      options: [
        'Sorts a DataFrame',
        'Joins two DataFrames',
        'Aggregates rows by a key',
        'Drops missing values',
      ],
      correctIndex: 2,
      explanation:
        '`groupby` splits data by a key and lets you apply aggregations per group.',
    },
  ],
  design: [
    {
      id: 'g1',
      question: 'What is a design system?',
      options: [
        'A single Figma file',
        'A collection of reusable components, tokens, and guidelines',
        'A CSS framework',
        'A color palette',
      ],
      correctIndex: 1,
      explanation:
        'Design systems unify components, tokens, and usage rules across teams.',
    },
    {
      id: 'g2',
      question: 'What does "atomic design" refer to?',
      options: [
        'Breaking UI into atoms, molecules, organisms, templates, and pages',
        'A physics engine',
        'A CSS methodology',
        'A testing framework',
      ],
      correctIndex: 0,
      explanation:
        'Brad Frost\'s atomic design breaks interfaces into composable layers.',
    },
    {
      id: 'g3',
      question: 'Which is a WCAG minimum for body text contrast?',
      options: ['2:1', '3:1', '4.5:1', '7:1'],
      correctIndex: 2,
      explanation:
        'WCAG AA requires at least 4.5:1 contrast for normal body text.',
    },
    {
      id: 'g4',
      question: 'What is a design token?',
      options: [
        'A Figma plugin',
        'A named value like `color.primary` reused across designs',
        'A typeface',
        'A prototype link',
      ],
      correctIndex: 1,
      explanation:
        'Tokens are the smallest reusable design decisions — colors, spacing, radii, typography.',
    },
    {
      id: 'g5',
      question: 'What does "mobile-first" mean?',
      options: [
        'Only designing for phones',
        'Starting design at the smallest screen and scaling up',
        'Using iOS guidelines',
        'Building native apps first',
      ],
      correctIndex: 1,
      explanation:
        'Mobile-first starts at the smallest viewport and progressively enhances for larger screens.',
    },
  ],
  security: [
    {
      id: 's1',
      question: 'What does HTTPS protect against?',
      options: [
        'Server crashes',
        'Man-in-the-middle eavesdropping',
        'SQL injection',
        'Cross-site scripting',
      ],
      correctIndex: 1,
      explanation:
        'HTTPS encrypts traffic in transit, preventing interception and tampering.',
    },
    {
      id: 's2',
      question: 'What is SQL injection?',
      options: [
        'A type of database',
        'Injecting malicious SQL via unsanitized input',
        'Encrypting database files',
        'A backup strategy',
      ],
      correctIndex: 1,
      explanation:
        'SQL injection occurs when untrusted input is concatenated into SQL queries.',
    },
    {
      id: 's3',
      question: 'What does 2FA stand for?',
      options: [
        'Two-Factor Authentication',
        'Trusted Fast Access',
        'Two-File Archive',
        'Token Firewall Auth',
      ],
      correctIndex: 0,
      explanation:
        'Two-factor authentication requires two independent proofs of identity.',
    },
    {
      id: 's4',
      question: 'Which is a strong password?',
      options: [
        'password123',
        'qwerty',
        'correct horse battery staple 42!',
        '12345678',
      ],
      correctIndex: 2,
      explanation:
        'Long passphrases are both memorable and resistant to brute-force attacks.',
    },
    {
      id: 's5',
      question: 'What does CORS protect against?',
      options: [
        'Cross-origin requests reading responses without permission',
        'Password leaks',
        'Denial of service',
        'SQL injection',
      ],
      correctIndex: 0,
      explanation:
        'CORS is enforced by browsers to prevent a page from reading cross-origin responses without explicit server permission.',
    },
  ],
  business: [
    {
      id: 'b1',
      question: 'What is a KPI?',
      options: [
        'Key Performance Indicator',
        'Key Platform Integration',
        'Knowledge Process Interface',
        'Known Product Issue',
      ],
      correctIndex: 0,
      explanation:
        'KPIs are measurable values that indicate how effectively objectives are being achieved.',
    },
    {
      id: 'b2',
      question: 'What does "churn" measure?',
      options: [
        'New signups',
        'Users who cancel or stop using a product',
        'Revenue growth',
        'Support tickets',
      ],
      correctIndex: 1,
      explanation:
        'Churn is the rate at which customers stop subscribing or using a product.',
    },
    {
      id: 'b3',
      question: 'Which is a leading indicator?',
      options: [
        'Monthly revenue',
        'Website demo requests this week',
        'Quarterly churn',
        'Annual profit',
      ],
      correctIndex: 1,
      explanation:
        'Leading indicators predict future outcomes; trailing indicators report past ones.',
    },
    {
      id: 'b4',
      question: 'What does "CAC" stand for in SaaS?',
      options: [
        'Customer Acquisition Cost',
        'Central Analytics Console',
        'Contract Approval Cycle',
        'Client Advisory Council',
      ],
      correctIndex: 0,
      explanation:
        'CAC is the average cost to acquire one new customer.',
    },
    {
      id: 'b5',
      question: 'What is A/B testing?',
      options: [
        'Testing two code branches',
        'Comparing two variants to measure impact',
        'Running two servers',
        'A regression test suite',
      ],
      correctIndex: 1,
      explanation:
        'A/B testing splits traffic between two versions to measure which performs better.',
    },
  ],
}

function bankFor(courseId: string): QuizQuestion[] {
  if (courseId.includes('c-00') && ['c-001', 'c-003', 'c-009', 'c-010'].includes(courseId)) return QUESTION_BANK.web
  if (['c-002', 'c-005', 'c-011'].includes(courseId)) return QUESTION_BANK.data
  if (['c-004', 'c-012'].includes(courseId)) return QUESTION_BANK.design
  if (courseId === 'c-006') return QUESTION_BANK.security
  if (courseId === 'c-008') return QUESTION_BANK.business
  return QUESTION_BANK.web
}

/**
 * Deterministic slice: module order n picks questions [n*5 % bank.length, ... +5].
 * Produces the same quiz for the same module every time — no random shuffling.
 */
function sliceQuestions(bank: QuizQuestion[], seed: number, count = 5): QuizQuestion[] {
  const out: QuizQuestion[] = []
  for (let i = 0; i < count; i++) {
    out.push(bank[(seed + i) % bank.length])
  }
  return out
}

const cache = new Map<string, Quiz>()

export function getQuiz(quizId: string): Quiz | null {
  if (cache.has(quizId)) return cache.get(quizId)!

  // Format: `${courseId}-quiz-m${order}`
  const match = /^(c-\d+)-quiz-m(\d+)$/.exec(quizId)
  if (!match) return null

  const [, courseId, orderStr] = match
  const order = Number(orderStr)
  const bank = bankFor(courseId)
  const questions = sliceQuestions(bank, (order - 1) * 3)

  const quiz: Quiz = {
    id: quizId,
    courseId,
    moduleId: `${courseId}-m${order}`,
    moduleOrder: order,
    title: `Module ${order} Quiz`,
    questions,
    passingScore: 70,
  }

  cache.set(quizId, quiz)
  return quiz
}