import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi'
import { CourseForm } from '../../components/instructor/CourseForm'
import {
  courseToFormValues,
  formValuesToInput,
  type CourseFormValues,
} from '../../components/instructor/courseFormHelpers'
import { EmptyState } from '../../components/common/EmptyState'
import { useInstructorCourses } from '../../hooks/useInstructorCourses'

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getCourse, updateCourse } = useInstructorCourses()
  const [submitting, setSubmitting] = useState(false)

  const course = id ? getCourse(id) : undefined

  if (!course) {
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

  async function handleSubmit(values: CourseFormValues) {
    setSubmitting(true)
    try {
      if (!id) return
      const input = formValuesToInput(values)
      updateCourse(id, {
        title: input.title,
        description: input.description,
        longDescription: input.longDescription,
        thumbnail: input.thumbnail || course!.thumbnail,
        categoryId: input.categoryId,
        level: input.level,
        price: input.price,
        isFree: input.isFree,
        tags: input.tags,
        requirements: input.requirements,
        outcomes: input.outcomes,
      })
      navigate('/instructor/courses')
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
          Edit course
        </h1>
        <p className="mt-2 text-base-content/60">
          Update the course details. Changes are visible immediately.
        </p>
      </div>

      <CourseForm
        mode="edit"
        initialValues={courseToFormValues(course)}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/instructor/courses')}
        submitting={submitting}
      />
    </div>
  )
}