import { FiUsers, FiVideo, FiStar } from 'react-icons/fi'
import type { Instructor } from '../../types/instructor'

interface InstructorCardProps {
  instructor: Instructor
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <section className="card-edulearn">
      <h2 className="text-2xl font-bold mb-5">Your instructor</h2>

      <div className="flex flex-col sm:flex-row gap-5">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="h-24 w-24 rounded-2xl object-cover shrink-0"
        />

        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className="text-xl font-bold">{instructor.name}</h3>
            <p className="text-sm text-base-content/60">{instructor.headline}</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-base-content/70 pt-1">
            <span className="flex items-center gap-1.5">
              <FiStar className="text-accent" />
              {instructor.rating.toFixed(1)} rating
            </span>
            <span className="flex items-center gap-1.5">
              <FiUsers /> {instructor.studentCount.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1.5">
              <FiVideo /> {instructor.courseCount} courses
            </span>
          </div>

          <p className="text-sm text-base-content/70 pt-2">{instructor.bio}</p>
        </div>
      </div>
    </section>
  )
}