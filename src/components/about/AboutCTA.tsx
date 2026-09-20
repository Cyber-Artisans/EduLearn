import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { Container } from '../common/Container'

export function AboutCTA() {
  return (
    <section className="section-y bg-base-100">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-10 md:p-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to start learning?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base-content/70">
            Join thousands of learners building new skills on EduLearn.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Explore Courses <FiArrowRight />
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}