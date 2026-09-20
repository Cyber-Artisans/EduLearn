import { Link, useParams } from 'react-router-dom'
import { FiTool, FiArrowLeft } from 'react-icons/fi'
import { EmptyState } from '../../components/common/EmptyState'

export default function CourseBuilderPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      <Link
        to="/instructor/dashboard"
        className="btn btn-ghost btn-sm gap-2"
      >
        <FiArrowLeft /> Back to dashboard
      </Link>
      <EmptyState
        icon={FiTool}
        title="Course Builder"
        description={`Builder for course "${id}" will be built in Phase 15.`}
      />
    </div>
  )
}