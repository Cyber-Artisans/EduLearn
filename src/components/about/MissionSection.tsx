import { FiTarget, FiUsers, FiAward } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'

interface Pillar {
  icon: IconType
  title: string
  description: string
  color: string
}

const pillars: Pillar[] = [
  {
    icon: FiTarget,
    title: 'Practical, not theoretical',
    description:
      'Every course is built around real projects and skills you can use on the job from day one.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: FiUsers,
    title: 'Taught by people who do the work',
    description:
      'Our instructors are working professionals, not career lecturers. You learn from people who actually ship.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: FiAward,
    title: 'Recognized on completion',
    description:
      'Certificates are issued automatically when you finish a course, ready to share on your profile or CV.',
    color: 'bg-accent/10 text-accent',
  },
]

export function MissionSection() {
  return (
    <section className="section-y bg-base-200">
      <Container>
        <SectionHeading
          eyebrow="Our mission"
          title="Make great learning accessible to everyone"
          description="We believe education should be a launchpad, not a barrier. So we build the platform we wished we had when we started our own careers."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card-edulearn">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-base-content/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}