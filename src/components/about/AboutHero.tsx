import { Container } from '../common/Container'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-base-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-32 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <Container className="py-16 md:py-24 text-center">
        <span className="badge badge-primary badge-outline">
          About EduLearn
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mx-auto">
          Learning that fits{' '}
          <span className="text-gradient">real life</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/70">
          EduLearn exists so that anyone, anywhere, can build the skills they
          need — without quitting their job, moving cities, or taking on debt.
        </p>
      </Container>
    </section>
  )
}