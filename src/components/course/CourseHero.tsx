import { FiUsers, FiClock, FiBarChart2, FiCalendar, FiGlobe } from 'react-icons/fi'
import { Container } from '../common/Container'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Rating } from '../common/Rating'
import type { Course } from '../../types/course'

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="bg-neutral text-neutral-content">
      <Container className="py-8 md:py-12">
        <div className="mb-6 text-neutral-content/70 [&_a]:text-neutral-content/70 [&_a:hover]:text-neutral-content">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Courses', to: '/courses' },
              { label: course.title },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="space-y-5 max-w-3xl">
            <span className="badge badge-primary badge-lg font-semibold">
              {course.categoryName}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {course.title}
            </h1>

            <p className="text-lg text-neutral-content/80">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Rating value={course.rating} count={course.ratingCount} size="md" />
              <span className="flex items-center gap-1.5 text-neutral-content/80">
                <FiUsers /> {course.students.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-neutral-content/80">
                <FiClock /> {course.durationHours} hours
              </span>
              <span className="flex items-center gap-1.5 text-neutral-content/80">
                <FiBarChart2 /> {course.level}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-content/60">
              <span className="flex items-center gap-1.5">
                <FiCalendar /> Last updated {course.createdAt}
              </span>
              <span className="flex items-center gap-1.5">
                <FiGlobe /> English
              </span>
            </div>

            <p className="text-sm text-neutral-content/80">
              Created by{' '}
              <span className="font-semibold text-neutral-content">
                {course.instructorName}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}