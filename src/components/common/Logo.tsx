import { Link } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa6'

interface LogoProps {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group"
      aria-label="EduLearn home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content transition-transform duration-200 group-hover:scale-105">
        <FaGraduationCap className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="text-xl font-extrabold tracking-tight">
          Edu<span className="text-primary">Learn</span>
        </span>
      )}
    </Link>
  )
}