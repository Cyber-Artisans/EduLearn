import { Link } from 'react-router-dom'
import { FiCheckCircle, FiCircle, FiHelpCircle, FiLock } from 'react-icons/fi'
import type { Module } from '../../types/lesson'

interface LessonSidebarModuleProps {
  module: Module
  isOpen: boolean
  onToggle: () => void
  currentLessonId: string | null
  completedSet: Set<string>
  onSelectLesson: (lessonId: string) => void
}

export function LessonSidebarModule({
  module,
  isOpen,
  onToggle,
  currentLessonId,
  completedSet,
  onSelectLesson,
}: LessonSidebarModuleProps) {
  const completedInModule = module.lessons.filter((l) =>
    completedSet.has(l.id),
  ).length

  return (
    <div className="border-b border-base-300 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-base-200 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">
            Module {module.order}
          </p>
          <p className="font-semibold text-sm truncate">{module.title}</p>
          <p className="text-xs text-base-content/60 mt-0.5">
            {completedInModule}/{module.lessons.length} completed
          </p>
        </span>
        <span
          className={`text-base-content/40 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
          aria-hidden="true"
        >
          ▸
        </span>
      </button>

      {isOpen && (
        <ul className="pb-2">
          {module.lessons.map((lesson) => {
            const isCompleted = completedSet.has(lesson.id)
            const isCurrent = lesson.id === currentLessonId
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`w-full flex items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    isCurrent
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'hover:bg-base-200 border-l-2 border-transparent'
                  }`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  {isCompleted ? (
                    <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <FiCircle className="mt-0.5 h-4 w-4 shrink-0 text-base-content/30" />
                  )}
                  <span className="flex-1 min-w-0">
                    <span className="block truncate font-medium">
                      {lesson.title}
                    </span>
                    <span className="block text-xs text-base-content/50">
                      {lesson.durationMinutes} min
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
          {module.quizId && (
            <li>
              <Link
                to={`/learn/${module.courseId}/quiz/${module.quizId}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 transition-colors border-l-2 border-transparent"
              >
                <FiHelpCircle className="h-4 w-4 shrink-0 text-accent" />
                <span className="flex-1">Module {module.order} quiz</span>
                <span className="badge badge-accent badge-outline badge-xs">
                  Quiz
                </span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export function LessonSidebarLocked() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-base-content/50">
      <FiLock className="h-4 w-4" /> Locked
    </div>
  )
}