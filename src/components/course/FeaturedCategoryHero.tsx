import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { FiArrowRight } from 'react-icons/fi'
import type { CategoryWithCount } from '../../hooks/useCategoryCounts'

interface FeaturedCategoryHeroProps {
  category: CategoryWithCount
}

const colorGradient: Record<CategoryWithCount['color'], string> = {
  primary: 'from-primary to-primary/60',
  secondary: 'from-secondary to-secondary/60',
  accent: 'from-accent to-accent/60',
  info: 'from-info to-info/60',
  success: 'from-success to-success/60',
  warning: 'from-warning to-warning/60',
  error: 'from-error to-error/60',
  neutral: 'from-neutral to-neutral/60',
}

export function FeaturedCategoryHero({ category }: FeaturedCategoryHeroProps) {
  const Icon = (FiIcons as unknown as Record<string, IconType>)[category.icon]
  const gradient = colorGradient[category.color]

  return (
    <Link
      to={`/courses?category=${category.id}`}
      className={`group relative block overflow-hidden rounded-3xl bg-linear-to-br ${gradient} p-8 md:p-12 text-white shadow-lg transition-transform hover:-translate-y-1`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          {Icon && <Icon className="h-8 w-8" />}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Featured category
          </p>
          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
            {category.name}
          </h2>
          <p className="mt-2 text-white/80 max-w-xl">
            {category.courseCount}{' '}
            {category.courseCount === 1 ? 'course' : 'courses'} · Dive into
            the topic our community is learning most right now.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-white text-neutral font-semibold px-5 py-2.5 text-sm group-hover:gap-3 transition-all">
          Explore <FiArrowRight />
        </span>
      </div>
    </Link>
  )
}