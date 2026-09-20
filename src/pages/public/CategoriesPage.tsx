import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiTag } from 'react-icons/fi'
import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { EmptyState } from '../../components/common/EmptyState'
import { CategoryCard } from '../../components/course/CategoryCard'
import { FeaturedCategoryHero } from '../../components/course/FeaturedCategoryHero'
import { useCategoryCounts } from '../../hooks/useCategoryCounts'

export default function CategoriesPage() {
  const categories = useCategoryCounts()
  const [query, setQuery] = useState('')

  const featured = categories[0] // Web Development is first in mockCategories

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  // Don't show the featured hero if the user is searching
  const showFeatured = !query.trim() && featured

  return (
    <div className="bg-base-100 min-h-screen">
      <Container className="py-10 md:py-14">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Browse Categories
          </h1>
          <p className="mt-2 text-base-content/60">
            {categories.length} categories ·{' '}
            {categories.reduce((s, c) => s + c.courseCount, 0)} courses total
          </p>
        </header>

        {/* Search */}
        <div className="mb-10 max-w-md">
          <label className="relative block">
            <span className="sr-only">Search categories</span>
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories…"
              className="input input-bordered w-full pl-9"
            />
          </label>
        </div>

        {/* Featured hero */}
        {showFeatured && (
          <div className="mb-10">
            <FeaturedCategoryHero category={featured} />
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={FiTag}
            title="No categories found"
            description="Try a different search term."
            action={
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setQuery('')}
              >
                Clear search
              </button>
            }
          />
        ) : (
          <section>
            <SectionHeading
              eyebrow={showFeatured ? 'All categories' : 'Search results'}
              title={
                showFeatured
                  ? 'Explore every topic'
                  : `${filtered.length} ${
                      filtered.length === 1 ? 'category' : 'categories'
                    } found`
              }
              align="left"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-base-300 bg-base-200 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base-content/70">
            Browse the full catalog and filter by level, rating, or price to
            find the perfect course.
          </p>
          <Link to="/courses" className="btn btn-primary btn-lg mt-6">
            Explore All Courses
          </Link>
        </div>
      </Container>
    </div>
  )
}