export interface FAQ {
  id: string
  question: string
  answer: string
}

export const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I enroll in a course?',
    answer:
      'Browse the catalog, open any course you like, and click "Enroll Now". Free courses start immediately; paid courses complete a mock checkout. Once enrolled, the course appears on your dashboard.',
  },
  {
    id: 'faq-2',
    question: 'Are the courses really self-paced?',
    answer:
      'Yes. Every lesson is pre-recorded and available on demand. You get lifetime access to any course you enroll in, so you can learn at whatever pace fits your schedule.',
  },
  {
    id: 'faq-3',
    question: 'Do I get a certificate when I finish a course?',
    answer:
      'Yes. Once you complete every lesson in a course, a certificate is issued automatically. You can view, print, or save it as PDF from your certificates page.',
  },
  {
    id: 'faq-4',
    question: 'What is your refund policy?',
    answer:
      'Paid courses come with a 30-day money-back guarantee. If a course is not right for you, contact support within 30 days of purchase and we will refund you — no questions asked.',
  },
  {
    id: 'faq-5',
    question: 'Can I become an instructor on EduLearn?',
    answer:
      'Absolutely. Register an account and choose "I\'m an instructor" during sign-up. You can then create courses, upload lessons, build quizzes, and start earning from every enrollment.',
  },
  {
    id: 'faq-6',
    question: 'How do I contact support?',
    answer:
      'Email us at support@edulearn.dev or use the form on this page. We typically reply within one business day. For urgent issues, mention "urgent" in your subject line.',
  },
]