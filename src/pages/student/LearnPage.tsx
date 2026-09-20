import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiHelpCircle,
  FiArrowRight,
} from 'react-icons/fi'
import { LessonTopBar } from '../../components/lesson/LessonTopBar'
import { LessonSidebar } from '../../components/lesson/LessonSidebar'
import { MobileLessonDrawer } from '../../components/lesson/MobileLessonDrawer'
import { LessonContent } from '../../components/lesson/LessonContent'
import { LessonNav } from '../../components/lesson/LessonNav'
import { EmptyState } from '../../components/common/EmptyState'
import { useCourseLessons } from '../../hooks/useCourseLessons'
import { useEnrollment } from '../../hooks/useEnrollment'
import { mockCourses } from '../../data/courses'

export default function LearnPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const course = mockCourses.find((c) => c.id === courseId)

  const {
    modules,
    currentLesson,
    prevLessonId,
    nextLessonId,
    completedSet,
    progressPercent,
  } = useCourseLessons(courseId ?? '', params.get('lesson'))

  const { markLessonComplete, markLessonIncomplete, setLastLesson, isEnrolled } =
    useEnrollment()

  // Persist last visited lesson whenever it changes.
  useEffect(() => {
    if (!courseId || !currentLesson) return
    setLastLesson(courseId, currentLesson.id)
  }, [courseId, currentLesson, setLastLesson])

  // Scroll to top of content when the lesson changes.
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentLesson?.id])

  function goToLesson(lessonId: string) {
    const next = new URLSearchParams(params)
    next.set('lesson', lessonId)
    setParams(next, { replace: false })
  }

  if (!course) {
    return (
      <div className="p-8">
        <EmptyState
          icon={FiAlertCircle}
          title="Course not found"
          description="The course you're trying to open doesn't exist."
          action={
            <Link to="/dashboard" className="btn btn-primary">
              Back to dashboard
            </Link>
          }
        />
      </div>
    )
  }

  if (!isEnrolled(course.id)) {
    return (
      <div className="p-8">
        <EmptyState
          icon={FiAlertCircle}
          title="You're not enrolled"
          description="Enroll in this course to access the lessons."
          action={
            <Link to={`/courses/${course.id}`} className="btn btn-primary">
              View course
            </Link>
          }
        />
      </div>
    )
  }

  const isCompleted = currentLesson
    ? completedSet.has(currentLesson.id)
    : false

  // Find the module containing the current lesson (for the quiz CTA).
  const currentModule = modules.find((m) =>
    m.lessons.some((l) => l.id === currentLesson?.id),
  )
  const currentModuleHasQuiz = currentModule?.quizId

  return (
    <div className="flex h-screen flex-col bg-base-100">
      <LessonTopBar
        courseTitle={course.title}
        progressPercent={progressPercent}
        onOpenSidebar={() => setDrawerOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-80 xl:w-96 shrink-0 flex-col border-r border-base-300 bg-base-100">
          <LessonSidebar
            modules={modules}
            currentLessonId={currentLesson?.id ?? null}
            completedSet={completedSet}
            progressPercent={progressPercent}
            onSelectLesson={goToLesson}
          />
        </aside>

        {/* Main content */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          aria-live="polite"
        >
          <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-10 space-y-8">
            {currentLesson ? (
              <>
                <LessonContent lesson={currentLesson} course={course} />

                {isCompleted && (
                  <div className="flex items-center gap-2 rounded-xl bg-success/10 text-success px-4 py-3 text-sm">
                    <FiCheckCircle /> You completed this lesson.
                  </div>
                )}

                {currentModuleHasQuiz && (
                  <Link
                    to={`/learn/${course.id}/quiz/${currentModuleHasQuiz}`}
                    className="flex items-center justify-between rounded-2xl border border-accent/40 bg-accent/5 p-5 hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FiHelpCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold text-sm">
                          Take the module quiz
                        </p>
                        <p className="text-xs text-base-content/60">
                          Test your understanding of this module
                        </p>
                      </div>
                    </div>
                    <FiArrowRight className="text-accent" />
                  </Link>
                )}

                <LessonNav
                  isCompleted={isCompleted}
                  hasPrev={prevLessonId !== null}
                  hasNext={nextLessonId !== null}
                  onPrev={() => prevLessonId && goToLesson(prevLessonId)}
                  onNext={() => nextLessonId && goToLesson(nextLessonId)}
                  onToggleComplete={() => {
                    if (!courseId || !currentLesson) return
                    if (isCompleted) {
                      markLessonIncomplete(courseId, currentLesson.id)
                    } else {
                      markLessonComplete(courseId, currentLesson.id)
                      // Auto-advance to next lesson after a short delay.
                      if (nextLessonId) {
                        setTimeout(
                          () =>
                            navigate(
                              `/learn/${courseId}?lesson=${nextLessonId}`,
                            ),
                          400,
                        )
                      }
                    }
                  }}
                />
              </>
            ) : (
              <EmptyState
                icon={FiAlertCircle}
                title="No lessons available"
                description="This course doesn't have any lessons yet."
              />
            )}
          </div>
        </main>
      </div>

      <MobileLessonDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        modules={modules}
        currentLessonId={currentLesson?.id ?? null}
        completedSet={completedSet}
        progressPercent={progressPercent}
        onSelectLesson={goToLesson}
      />
    </div>
  )
}