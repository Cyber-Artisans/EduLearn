import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'

const values = [
  {
    title: 'Learner first',
    description:
      'Every design decision starts with a question: does this help someone learn faster?',
  },
  {
    title: 'Honest pricing',
    description:
      'No hidden fees, no forced subscriptions, no dark patterns. You pay for what you get.',
  },
  {
    title: 'Lifetime access',
    description:
      'When you enroll, the course is yours. Updates, new lessons, and improvements are free forever.',
  },
  {
    title: 'Respect for your time',
    description:
      'Lessons are short, structured, and skippable. No filler. No 20-minute intros.',
  },
  {
    title: 'Accessible by default',
    description:
      'Keyboard-navigable, screen-reader-friendly, and WCAG AA compliant on every page.',
  },
  {
    title: 'Built to last',
    description:
      'We would rather ship fewer features well than many features badly. Quality beats novelty.',
  },
]

export function ValuesSection() {
  return (
    <section className="section-y bg-base-100">
      <Container>
        <SectionHeading
          eyebrow="What we value"
          title="Six principles we build by"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="card-edulearn">
              <span className="text-xs font-mono text-primary/70 font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}