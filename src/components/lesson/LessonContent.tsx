import { FiDownload, FiFileText } from 'react-icons/fi'
import { VideoPlayer } from './VideoPlayer'
import type { Lesson } from '../../types/lesson'
import type { Course } from '../../types/course'

interface LessonContentProps {
    lesson: Lesson
    course: Course
}

export function LessonContent({ lesson, course }: LessonContentProps) {
    return (
        <div className="space-y-6">
            <VideoPlayer
                src={lesson.videoUrl}
                poster={course.thumbnail}
                title={lesson.title}
            />

            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    {lesson.title}
                </h1>
                <p className="mt-1 text-sm text-base-content/60">
                    {lesson.durationMinutes} min · {course.title}
                </p>
            </div>

            <p className="text-base-content/80">{lesson.description}</p>

            {lesson.resources.length > 0 && (
                <div className="rounded-2xl border border-base-300 p-5">
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-base-content/70 mb-4">
                        <FiFileText className="h-4 w-4" /> Lesson resources
                    </h2>
                    <ul className="space-y-2">
                        {lesson.resources.map((res) => (
                            <li key={res.label}>
                                <a
                                    href={res.url}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-base-200 transition-colors text-sm"
                                >
                                    <span className="flex items-center gap-2">
                                        <FiDownload className="h-4 w-4 text-primary" />
                                        {res.label}
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        Download
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}