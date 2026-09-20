export interface Review {
  id: string
  courseId: string
  userName: string
  userAvatar: string
  rating: number
  title: string
  body: string
  createdAt: string
  helpfulCount: number
}

const seedReviews: Omit<Review, 'id' | 'courseId'>[] = [
  {
    userName: 'Emma Rodriguez',
    userAvatar: 'https://i.pravatar.cc/80?img=47',
    rating: 5,
    title: 'Best course I have taken',
    body: 'Clear explanations, real projects, and the instructor responds to every question. Worth every dollar.',
    createdAt: '2024-09-02',
    helpfulCount: 42,
  },
  {
    userName: 'Ravi Kumar',
    userAvatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    title: 'Practical and thorough',
    body: 'I came in with basic knowledge and left able to build real apps. The pacing is perfect.',
    createdAt: '2024-08-21',
    helpfulCount: 31,
  },
  {
    userName: 'Sophie Laurent',
    userAvatar: 'https://i.pravatar.cc/80?img=32',
    rating: 4,
    title: 'Great content, could be shorter',
    body: 'Fantastic material. Some sections drag a bit, but the meat of the course is excellent.',
    createdAt: '2024-08-10',
    helpfulCount: 18,
  },
  {
    userName: 'Daniel Osei',
    userAvatar: 'https://i.pravatar.cc/80?img=68',
    rating: 5,
    title: 'Changed my career',
    body: 'Landed a new job two months after finishing. The projects were exactly what interviewers asked about.',
    createdAt: '2024-07-30',
    helpfulCount: 56,
  },
  {
    userName: 'Yuki Tanaka',
    userAvatar: 'https://i.pravatar.cc/80?img=45',
    rating: 4,
    title: 'Solid fundamentals',
    body: 'The fundamentals are covered really well. I would like more advanced material at the end.',
    createdAt: '2024-07-14',
    helpfulCount: 12,
  },
  {
    userName: 'Chloe Bennett',
    userAvatar: 'https://i.pravatar.cc/80?img=23',
    rating: 5,
    title: 'Highly recommended',
    body: 'As a freelancer, this course paid for itself within a month. The exercises are gold.',
    createdAt: '2024-06-29',
    helpfulCount: 27,
  },
]

export function getReviewsForCourse(courseId: string): Review[] {
  return seedReviews.map((r, i) => ({
    ...r,
    id: `${courseId}-r${i + 1}`,
    courseId,
  }))
}