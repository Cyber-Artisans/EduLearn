import { Link } from 'react-router-dom'
import { FiPlayCircle, FiArrowRight } from 'react-icons/fi'
import type { EnrolledCourse } from '../../hooks/useDashboardStats'

interface ContinueLearningCardProps {
  item: EnrolledCourse
}

export function ContinueLearningCard({ item }: ContinueLearningCardProps) {
  const { course, percent, nextLessonId, isComplete } = item

  const targetLesson = nextLessonId ?? 'start'
  const learnUrl = `/learn/${course.id}?lesson=${targetLesson}`

  return (
    <article className="card-edulearn p-0! overflow-hidden flex flex-col w-72 shrink-0 snap-start">
      <Link to={learnUrl} className="relative block aspect-video">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
          <FiPlayCircle className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
        </span>
        {isComplete && (
          <span className="absolute right-2 top-2 badge badge-success badge-sm font-semibold">
            Completed
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 gap-3">
        <h3 className="font-bold text-sm leading-snug line-clamp-2">
          {course.title}
        </h3>

        <div>
          <div className="flex items-center justify-between text-xs text-base-content/60 mb-1">
            <span>{percent}% complete</span>
            {!isComplete && nextLessonId && (
              <span>Next: lesson {percent + 1}</span>
            )}
          </div>
          <progress
            className="progress progress-primary w-full"
            value={percent}
            max={100}
            aria-label={`${percent}% complete`}
          />
        </div>

        <Link
          to={learnUrl}
          className={`btn btn-sm btn-block mt-auto ${
            isComplete ? 'btn-outline' : 'btn-primary'
          }`}
        >
          {isComplete ? 'Review course' : 'Continue'} <FiArrowRight />
        </Link>
      </div>
    </article>
  )
}