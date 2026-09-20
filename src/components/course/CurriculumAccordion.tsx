import { FiPlayCircle, FiFileText, FiHelpCircle, FiLock } from 'react-icons/fi'
import type { Module } from '../../types/lesson'

interface CurriculumAccordionProps {
  modules: Module[]
}

export function CurriculumAccordion({ modules }: CurriculumAccordionProps) {
  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0)
  const totalMinutes = modules.reduce(
    (n, m) => n + m.lessons.reduce((s, l) => s + l.durationMinutes, 0),
    0,
  )
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60

  return (
    <section className="card-edulearn">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Course content</h2>
          <p className="text-sm text-base-content/60 mt-1">
            {modules.length} modules · {totalLessons} lessons · {totalHours}h{' '}
            {remainingMins}m total
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((module, idx) => {
          const moduleMinutes = module.lessons.reduce(
            (s, l) => s + l.durationMinutes,
            0,
          )
          return (
            <div
              key={module.id}
              className="collapse collapse-arrow border border-base-300 rounded-xl"
            >
              <input
                type="checkbox"
                defaultChecked={idx === 0}
                aria-label={`Toggle ${module.title}`}
              />
              <div className="collapse-title font-semibold flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  Module {module.order} — {module.title}
                </span>
                <span className="text-xs text-base-content/60">
                  {module.lessons.length} lessons · {moduleMinutes} min
                </span>
              </div>
              <div className="collapse-content">
                <ul className="space-y-1 pt-2">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-base-200"
                    >
                      {lesson.isPreview ? (
                        <FiPlayCircle className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <FiLock className="h-4 w-4 text-base-content/40 shrink-0" />
                      )}
                      <span className="flex-1 text-sm">{lesson.title}</span>
                      {lesson.isPreview && (
                        <span className="badge badge-primary badge-outline badge-sm">
                          Free preview
                        </span>
                      )}
                      <span className="text-xs text-base-content/60">
                        {lesson.durationMinutes} min
                      </span>
                    </li>
                  ))}
                  {module.quizId && (
                    <li className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-base-200">
                      <FiHelpCircle className="h-4 w-4 text-accent shrink-0" />
                      <span className="flex-1 text-sm">
                        Module {module.order} quiz
                      </span>
                      <span className="text-xs text-base-content/60">
                        Quiz
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-5 text-xs text-base-content/60 flex items-center gap-2">
        <FiFileText className="h-3.5 w-3.5" />
        All lessons include downloadable resources and source code.
      </p>
    </section>
  )
}