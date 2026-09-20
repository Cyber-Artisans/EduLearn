import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { CourseForm } from '../../components/instructor/CourseForm'
import {
  emptyFormValues,
  formValuesToInput,
  type CourseFormValues,
} from '../../components/instructor/courseFormHelpers'
import { useInstructorCourses } from '../../hooks/useInstructorCourses'

export default function CreateCoursePage() {
  const navigate = useNavigate()
  const { createCourse } = useInstructorCourses()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(values: CourseFormValues) {
    setSubmitting(true)
    try {
      const input = formValuesToInput(values)
      const created = createCourse(input)
      if (created) {
        navigate(`/instructor/courses/${created.id}/builder`, {
          replace: true,
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/instructor/courses"
          className="btn btn-ghost btn-sm gap-2"
        >
          <FiArrowLeft /> Back to my courses
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Create a new course
        </h1>
        <p className="mt-2 text-base-content/60">
          Fill in the basics. You'll add lessons in the next step.
        </p>
      </div>

      <CourseForm
        mode="create"
        initialValues={emptyFormValues()}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/instructor/courses')}
        submitting={submitting}
      />
    </div>
  )
}