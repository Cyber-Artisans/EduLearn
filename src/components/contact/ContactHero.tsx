import { Container } from '../common/Container'

export function ContactHero() {
  return (
    <section className="bg-base-100">
      <Container className="py-12 md:py-16 text-center">
        <span className="badge badge-primary badge-outline">Contact</span>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Get in touch
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/70">
          Questions, feedback, or partnership ideas? We would love to hear from
          you.
        </p>
      </Container>
    </section>
  )
}