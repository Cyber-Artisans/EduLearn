import { Link } from 'react-router-dom'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { Logo } from '../common/Logo'

interface LessonTopBarProps {
  courseTitle: string
  progressPercent: number
  onOpenSidebar: () => void
}

export function LessonTopBar({
  courseTitle,
  progressPercent,
  onOpenSidebar,
}: LessonTopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open curriculum"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm gap-2 hidden sm:inline-flex"
        >
          <FiArrowLeft /> Dashboard
        </Link>

        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" title={courseTitle}>
            {courseTitle}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="w-40">
            <progress
              className="progress progress-primary w-full"
              value={progressPercent}
              max={100}
              aria-label={`Course progress ${progressPercent}%`}
            />
          </div>
          <span className="text-sm font-semibold text-primary tabular-nums">
            {progressPercent}%
          </span>
        </div>
      </div>
    </header>
  )
}