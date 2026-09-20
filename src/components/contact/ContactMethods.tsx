import { FiMail, FiMessageCircle, FiBook, FiClock } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { Container } from '../common/Container'

interface Method {
  icon: IconType
  title: string
  description: string
  action: string
  href: string
  color: string
}

const methods: Method[] = [
  {
    icon: FiMail,
    title: 'Email support',
    description: 'Best for detailed questions or account issues.',
    action: 'support@edulearn.dev',
    href: 'mailto:support@edulearn.dev',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: FiMessageCircle,
    title: 'Live chat',
    description: 'For quick questions. Weekdays 9 AM – 6 PM UTC.',
    action: 'Open chat',
    href: '#',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: FiBook,
    title: 'Help center',
    description: 'Guides, walkthroughs, and troubleshooting articles.',
    action: 'Visit help center',
    href: '#',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: FiClock,
    title: 'Response time',
    description: 'We typically reply within one business day.',
    action: 'Usually fast',
    href: '#',
    color: 'bg-success/10 text-success',
  },
]

export function ContactMethods() {
  return (
    <section className="bg-base-100">
      <Container className="pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map(({ icon: Icon, title, description, action, href, color }) => (
            <a
              key={title}
              href={href}
              className="card-edulearn flex flex-col gap-3 no-underline!"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-base-content/70 mt-1">
                  {description}
                </p>
              </div>
              <p className="text-sm font-semibold text-primary mt-auto">
                {action} →
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}