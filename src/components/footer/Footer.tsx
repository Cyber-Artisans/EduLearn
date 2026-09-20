import { Link } from 'react-router-dom'
import {
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa6'
import { Logo } from '../common/Logo'
import { Container } from '../common/Container'
import { NewsletterForm } from './NewsletterForm'

const footerColumns = [
  {
    heading: 'Learn',
    links: [
      { label: 'All Courses', to: '/courses' },
      { label: 'Categories', to: '/categories' },
      { label: 'Free Courses', to: '/courses?price=free' },
      { label: 'Certificates', to: '/certificates' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about' },
      { label: 'Blog', to: '/about' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Terms', to: '/about' },
      { label: 'Privacy', to: '/about' },
      { label: 'Accessibility', to: '/about' },
    ],
  },
]

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com', Icon: FaXTwitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedinIn },
  { label: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
  { label: 'GitHub', href: 'https://github.com', Icon: FaGithub },
]

export function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="max-w-sm text-sm text-base-content/70">
              Learn skills. Build your future. High-quality courses from expert
              instructors — at your own pace.
            </p>
            <NewsletterForm />
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-base-content/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-base-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-100 text-base-content/70 hover:bg-primary hover:text-primary-content transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}