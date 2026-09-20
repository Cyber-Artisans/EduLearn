export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  bio: string
  socials?: { label: string; url: string }[]
}

export const mockTeam: TeamMember[] = [
  {
    id: 't-001',
    name: 'Sarah Chen',
    role: 'Co-founder & Head of Curriculum',
    avatar: 'https://i.pravatar.cc/200?img=47',
    bio: 'Former frontend lead at Meta and Shopify. Sarah designs the learning paths that make EduLearn courses actually stick.',
  },
  {
    id: 't-002',
    name: 'David Okafor',
    role: 'Co-founder & Head of Data',
    avatar: 'https://i.pravatar.cc/200?img=12',
    bio: 'Data scientist turned educator. David builds the platform features that help instructors understand their students.',
  },
  {
    id: 't-003',
    name: 'Maya Patel',
    role: 'Engineering Lead',
    avatar: 'https://i.pravatar.cc/200?img=32',
    bio: 'Staff engineer with a decade of shipping production apps. Maya keeps EduLearn fast and reliable at scale.',
  },
  {
    id: 't-004',
    name: 'Liam Novak',
    role: 'Head of Design',
    avatar: 'https://i.pravatar.cc/200?img=15',
    bio: 'Design systems specialist. Liam makes sure every page on EduLearn feels coherent, accessible, and worth the visit.',
  },
  {
    id: 't-005',
    name: 'Dr. Aisha Rahman',
    role: 'Head of Learning Science',
    avatar: 'https://i.pravatar.cc/200?img=45',
    bio: 'PhD in machine learning. Aisha applies research on how people learn to every course and quiz on the platform.',
  },
  {
    id: 't-006',
    name: 'Nina Alvarez',
    role: 'Head of Instructor Success',
    avatar: 'https://i.pravatar.cc/200?img=23',
    bio: 'Former instructor with millions of student hours. Nina helps new instructors publish their first great course.',
  },
]