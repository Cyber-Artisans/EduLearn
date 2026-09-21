import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiAlertCircle, FiArrowLeft, FiPlus } from 'react-icons/fi'
import { EmptyState } from '../../components/common/EmptyState'
import { BuilderModuleCard } from '../../components/instructor/BuilderModuleCard'
import { useInstructorCourses } from '../../hooks/useInstructorCourses'
import type { Lesson, Module } from '../../types/lesson'
import type { Course } from '../../types/course'

export default function CourseBuilderPage() {
  const { id } = useParams<{ id: string }>()
  const { getCourse } = useInstructorCourses()

  const course = id ? getCourse(id) : undefined

  if (!course || !id) {
    return (
      <EmptyState
        icon={FiAlertCircle}
        title="Course not found"
        description="This course doesn't exist or you don't have permission to edit it."
        action={
          <Link to="/instructor/courses" className="btn btn-primary">
            Back to my courses
          </Link>
        }
      />
    )
  }

  // Keyed by id → remounts the builder when the route param changes,
  // so the inner component never needs a reset effect.
  return <CourseBuilderRunner key={id} courseId={id} course={course} />
}

interface CourseBuilderRunnerProps {
  courseId: string
  course: Course
}

function CourseBuilderRunner({ courseId, course }: CourseBuilderRunnerProps) {
  const { getModules, saveModules } = useInstructorCourses()

  // Initial state read synchronously — no effect, no setState-in-effect.
  const [modules, setModules] = useState<Module[]>(() => getModules(courseId))
  const [savedAt, setSavedAt] = useState<number | null>(null)

  function persist(next: Module[]) {
    saveModules(courseId, next)
    // eslint-disable-next-line react-hooks/purity
    setSavedAt(Date.now())
    setTimeout(() => setSavedAt(null), 1500)
  }

  /** Compute the next unused module order — avoids ID collisions after deletes. */
  function nextModuleOrder(list: Module[]): number {
    return list.reduce((max, m) => Math.max(max, m.order), 0) + 1
  }

  /** Compute the next unused lesson index within a module. */
  function nextLessonIndex(module: Module): number {
    const nums = module.lessons
      .map((l) => {
        const match = /-l(\d+)$/.exec(l.id)
        return match ? Number(match[1]) : 0
      })
      .filter((n) => Number.isFinite(n) && n > 0)
    return nums.length > 0 ? Math.max(...nums) + 1 : 1
  }

  function addModule() {
    const order = nextModuleOrder(modules)
    const next: Module = {
      id: `${courseId}-m${order}`,
      courseId,
      title: `Module ${order}`,
      order,
      lessons: [],
    }
    const updated = [...modules, next]
    setModules(updated)
    persist(updated)
  }

  function updateModule(moduleId: string, patch: Partial<Module>) {
    const updated = modules.map((m) =>
      m.id === moduleId ? { ...m, ...patch } : m,
    )
    setModules(updated)
    persist(updated)
  }

  function deleteModule(moduleId: string) {
    const updated = modules
      .filter((m) => m.id !== moduleId)
      .map((m, i) => ({ ...m, order: i + 1 }))
    setModules(updated)
    persist(updated)
  }

  function addLesson(moduleId: string, title: string, durationMinutes: number) {
    const updated = modules.map((m) => {
      if (m.id !== moduleId) return m
      const idx = nextLessonIndex(m)
      const lesson: Lesson = {
        id: `${m.id}-l${idx}`,
        title,
        durationMinutes,
        isPreview: false,
        description: '',
        videoUrl: '',
        resources: [],
      }
      return { ...m, lessons: [...m.lessons, lesson] }
    })
    setModules(updated)
    persist(updated)
  }

  function updateLesson(
    moduleId: string,
    lessonId: string,
    patch: Partial<Lesson>,
  ) {
    const updated = modules.map((m) =>
      m.id === moduleId
        ? {
            ...m,
            lessons: m.lessons.map((l) =>
              l.id === lessonId ? { ...l, ...patch } : l,
            ),
          }
        : m,
    )
    setModules(updated)
    persist(updated)
  }

  function deleteLesson(moduleId: string, lessonId: string) {
    const updated = modules.map((m) =>
      m.id === moduleId
        ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
        : m,
    )
    setModules(updated)
    persist(updated)
  }

  function moveLesson(
    moduleId: string,
    lessonId: string,
    direction: 'up' | 'down',
  ) {
    const updated = modules.map((m) => {
      if (m.id !== moduleId) return m
      const idx = m.lessons.findIndex((l) => l.id === lessonId)
      if (idx === -1) return m
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= m.lessons.length) return m
      const lessons = [...m.lessons]
      ;[lessons[idx], lessons[target]] = [lessons[target], lessons[idx]]
      return { ...m, lessons }
    })
    setModules(updated)
    persist(updated)
  }

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const totalMinutes = modules.reduce(
    (s, m) => s + m.lessons.reduce((ss, l) => ss + l.durationMinutes, 0),
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/instructor/courses"
            className="btn btn-ghost btn-sm gap-2"
          >
            <FiArrowLeft /> Back to my courses
          </Link>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            {course.title}
          </h1>
          <p className="mt-2 text-base-content/60">
            {modules.length} modules · {totalLessons} lessons ·{' '}
            {Math.round((totalMinutes / 60) * 10) / 10}h total
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedAt && (
            <span className="text-sm text-success font-medium">✓ Saved</span>
          )}
          <Link
            to={`/courses/${course.id}`}
            className="btn btn-outline btn-sm"
          >
            Preview
          </Link>
        </div>
      </div>

      {/* Modules */}
      {modules.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-base-300 bg-base-200 p-10 text-center">
          <h2 className="text-xl font-bold">No modules yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
            A course is made of modules. Each module contains lessons. Start
            by creating your first module.
          </p>
          <button
            type="button"
            className="btn btn-primary mt-6"
            onClick={addModule}
          >
            <FiPlus /> Add first module
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((m) => (
            <BuilderModuleCard
              key={m.id}
              module={m}
              onUpdate={(patch) => updateModule(m.id, patch)}
              onDelete={() => deleteModule(m.id)}
              onAddLesson={(title, duration) =>
                addLesson(m.id, title, duration)
              }
              onUpdateLesson={(lessonId, patch) =>
                updateLesson(m.id, lessonId, patch)
              }
              onDeleteLesson={(lessonId) => deleteLesson(m.id, lessonId)}
              onMoveLesson={(lessonId, dir) =>
                moveLesson(m.id, lessonId, dir)
              }
            />
          ))}

          <button
            type="button"
            onClick={addModule}
            className="btn btn-outline btn-block"
          >
            <FiPlus /> Add module
          </button>
        </div>
      )}
    </div>
  )
}