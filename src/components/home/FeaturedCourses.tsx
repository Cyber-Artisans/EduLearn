import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { CourseCard } from '../course/CourseCard'
import { mockCourses } from '../../data/courses'

export function FeaturedCourses() {
  const featured = [...mockCourses]
    .sort((a, b) => b.rating * b.students - a.rating * a.students)
    .slice(0, 8)

  return (
    <section className="section-y bg-base-100">
      <Container>
        <SectionHeading
          eyebrow="Handpicked for you"
          title="Featured Courses"
          description="The most popular courses this month, chosen by our community."
          align="left"
          action={
            <Link to="/courses" className="btn btn-outline">
              View all <FiArrowRight />
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </section>
  )
}