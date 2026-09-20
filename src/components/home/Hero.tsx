import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import { Container } from '../common/Container'

export function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/courses?search=${encodeURIComponent(q)}` : '/courses')
  }

  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <Container className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
        <div className="space-y-6 animate-fade-in">
          <span className="badge badge-primary badge-outline">
            🎓 Trusted by 10,000+ learners
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Learn Skills.
            <br />
            <span className="text-gradient">Build Your Future.</span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-xl">
            Access high-quality courses taught by experienced instructors and
            learn at your own pace — anytime, anywhere.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl">
            <label htmlFor="hero-search" className="sr-only">
              Search courses
            </label>
            <div className="join w-full shadow-lg">
              <div className="relative flex-1">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What do you want to learn today?"
                  className="input input-bordered input-lg join-item w-full pl-12 bg-base-100"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg join-item">
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Explore Courses <FiArrowRight />
            </Link>
            <Link to="/register?role=instructor" className="btn btn-outline btn-lg">
              Become an Instructor
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-4 text-sm text-base-content/60">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" /> Free courses available
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" /> Certificates on completion
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-slide-up">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300 bg-base-100 aspect-4/3">
            <img
              src="https://picsum.photos/seed/edulearn-hero/900/700"
              alt="Students learning online"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-base-100/95 backdrop-blur p-4 shadow-lg flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-success-content">
                ✓
              </span>
              <div className="text-sm">
                <p className="font-bold">Lesson completed</p>
                <p className="text-base-content/60">
                  React Hooks — Advanced Patterns
                </p>
              </div>
            </div>
          </div>

          {/* Floating stat */}
          <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-base-100 border border-base-300 shadow-xl p-4">
            <p className="text-xs text-base-content/60">Average rating</p>
            <p className="text-2xl font-extrabold text-primary">4.9 ★</p>
          </div>
        </div>
      </Container>
    </section>
  )
}