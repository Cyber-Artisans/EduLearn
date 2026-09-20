import { FiSearch, FiUserPlus, FiBookOpen, FiCheckCircle, FiAward } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'

interface Step {
  icon: IconType
  title: string
  description: string
}

const steps: Step[] = [
  { icon: FiSearch,      title: 'Find a course',    description: 'Browse our library or search for a specific topic.' },
  { icon: FiUserPlus,    title: 'Enroll',           description: 'Sign up in seconds and enroll with one click.' },
  { icon: FiBookOpen,    title: 'Learn',            description: 'Watch lessons, follow along, and build projects.' },
  { icon: FiCheckCircle, title: 'Complete quizzes', description: 'Test your knowledge and reinforce what you learned.' },
  { icon: FiAward,       title: 'Earn your certificate', description: 'Show the world what you\'ve accomplished.' },
]

export function HowItWorks() {
  return (
    <section className="section-y bg-base-100">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From curious to certified in 5 steps"
          description="A simple path designed to keep you motivated from start to finish."
        />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Connector line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-base-300 -z-10"
          />
          {steps.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="relative flex flex-col items-center text-center gap-3 bg-base-100 px-4"
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg">
                <Icon className="h-7 w-7" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-content text-xs font-bold">
                  {i + 1}
                </span>
              </span>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-base-content/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}