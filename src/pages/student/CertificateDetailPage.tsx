import { Link, useParams } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { CertificatePreview } from '../../components/certificate/CertificatePreview'
import { EmptyState } from '../../components/common/EmptyState'
import { useCertificate } from '../../hooks/useCertificate'

export default function CertificateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getById } = useCertificate()
  const certificate = id ? getById(id) : undefined

  if (!certificate) {
    return (
      <EmptyState
        icon={FiAlertCircle}
        title="Certificate not found"
        description="This certificate doesn't exist or belongs to another account."
        action={
          <Link to="/certificates" className="btn btn-primary">
            Back to certificates
          </Link>
        }
      />
    )
  }

  return <CertificatePreview certificate={certificate} />
}