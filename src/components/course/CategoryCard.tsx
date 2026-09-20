import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { Category } from '../../types/course'

interface CategoryCardProps {
  category: Category
}

const colorClasses: Record<Category['color'], string> = {
  primary:   'bg-primary/10 text-primary group-hover:bg-primary',
  secondary: 'bg-secondary/10 text-secondary group-hover:bg-secondary',
  accent:    'bg-accent/10 text-accent group-hover:bg-accent',
  info:      'bg-info/10 text-info group-hover:bg-info',
  success:   'bg-success/10 text-success group-hover:bg-success',
  warning:   'bg-warning/10 text-warning group-hover:bg-warning',
  error:     'bg-error/10 text-error group-hover:bg-error',
  neutral:   'bg-neutral/10 text-neutral group-hover:bg-neutral',
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = (FiIcons as unknown as Record<string, IconType>)[category.icon]
  const iconClasses = colorClasses[category.color]

  return (
    <Link
      to={`/courses?category=${category.id}`}
      className="group card-edulearn flex flex-col items-start gap-3 p-5!"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-primary-content ${iconClasses}`}
      >
        {Icon && <Icon className="h-6 w-6" />}
      </span>
      <div>
        <h3 className="font-bold text-base group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-base-content/60">
          {category.courseCount} courses
        </p>
      </div>
    </Link>
  )
}