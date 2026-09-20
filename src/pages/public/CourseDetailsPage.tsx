import { Link, useParams } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { Container } from '../../components/common/Container'
import { EmptyState } from '../../components/common/EmptyState'
import { CourseHero } from '../../components/course/CourseHero'
import { WhatYouLearn } from '../../components/course/WhatYouLearn'
import { Requirements } from '../../components/course/Requirements'
import { CurriculumAccordion } from '../../components/course/CurriculumAccordion'
import { InstructorCard } from '../../components/course/InstructorCard'
import { ReviewsSection } from '../../components/course/ReviewsSection'
import { EnrollmentCard } from '../../components/course/EnrollmentCard'
import { mockCourses } from '../../data/courses'
import { mockInstructors } from '../../data/instructors'
import { getModulesForCourse } from '../../data/modules'
import { getReviewsForCourse } from '../../data/reviews'

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const course = mockCourses.find((c) => c.id === id)

  if (!course) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={FiAlertCircle}
          title="Course not found"
          description="The course you're looking for doesn't exist or has been removed."
          action={
            <Link to="/courses" className="btn btn-primary">
              Browse all courses
            </Link>
          }
        />
      </Container>
    )
  }

  const instructor =
    mockInstructors.find((i) => i.id === course.instructorId) ??
    mockInstructors[0]

  const modules = getModulesForCourse(course.id)
  const reviews = getReviewsForCourse(course.id)

  // Simple deterministic outcomes/requirements per course (mock)
  const outcomes = [
    `Build real projects with ${course.tags[0] ?? course.title}`,
    `Understand core ${course.categoryName.toLowerCase()} concepts deeply`,
    'Write clean, production-ready code',
    'Debug and troubleshoot common issues',
    'Apply best practices from industry professionals',
    `Complete a portfolio-ready final project in ${course.durationHours} hours`,
  ]

  const requirements = [
    'A computer with internet access',
    'No prior experience required (beginners welcome)',
    'Willingness to learn and practice',
    'Basic familiarity with using a code editor is helpful',
  ]

  return (
    <>
      <CourseHero course={course} />

      <Container className="py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-6 min-w-0">
            <WhatYouLearn outcomes={outcomes} />
            <CurriculumAccordion modules={modules} />
            <Requirements requirements={requirements} />
            <InstructorCard instructor={instructor} />
            <ReviewsSection
              reviews={reviews}
              rating={course.rating}
              ratingCount={course.ratingCount}
            />
          </div>

          <EnrollmentCard course={course} />
        </div>
      </Container>
    </>
  )
}