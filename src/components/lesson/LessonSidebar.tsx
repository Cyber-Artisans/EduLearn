import { useState } from 'react'
import { LessonSidebarModule } from './LessonSidebarModule'
import type { Module } from '../../types/lesson'

interface LessonSidebarProps {
  modules: Module[]
  currentLessonId: string | null
  completedSet: Set<string>
  progressPercent: number
  onSelectLesson: (lessonId: string) => void
}

export function LessonSidebar({
  modules,
  currentLessonId,
  completedSet,
  progressPercent,
  onSelectLesson,
}: LessonSidebarProps) {
  // Open the module that contains the current lesson by default.
  const [openModules, setOpenModules] = useState<Set<string>>(() => {
    const set = new Set<string>()
    for (const mod of modules) {
      if (mod.lessons.some((l) => l.id === currentLessonId)) set.add(mod.id)
    }
    if (set.size === 0 && modules[0]) set.add(modules[0].id)
    return set
  })

  function toggleModule(id: string) {
    setOpenModules((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-base-300 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">
          Course progress
        </p>
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-primary flex-1"
            value={progressPercent}
            max={100}
            aria-label={`Course progress ${progressPercent}%`}
          />
          <span className="text-sm font-semibold text-primary tabular-nums">
            {progressPercent}%
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {modules.map((mod) => (
          <LessonSidebarModule
            key={mod.id}
            module={mod}
            isOpen={openModules.has(mod.id)}
            onToggle={() => toggleModule(mod.id)}
            currentLessonId={currentLessonId}
            completedSet={completedSet}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </div>
    </div>
  )
}