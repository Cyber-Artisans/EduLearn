import { FiAward, FiClock, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'

interface Feature {
  icon: IconType
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: FiUsers,
    title: 'Learn from Experts',
    description:
      'Courses taught by industry professionals with real-world experience.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: FiClock,
    title: 'Learn at Your Own Pace',
    description:
      'Lifetime access to every course you enroll in — study when it suits you.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: FiZap,
    title: 'Practical Projects',
    description:
      'Build real projects that strengthen your portfolio and get you hired.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: FiAward,
    title: 'Earn Certificates',
    description:
      'Get recognized certificates to showcase your new skills on LinkedIn.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: FiTrendingUp,
    title: 'Track Your Progress',
    description:
      'Detailed dashboard so you always know what to learn next.',
    color: 'bg-info/10 text-info',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-y bg-base-200">
      <Container>
        <SectionHeading
          eyebrow="Why EduLearn"
          title="Why Choose EduLearn"
          description="Everything you need to go from curious to confident — in one place."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card-edulearn">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}