import { Link } from 'react-router-dom'
import { FiAward } from 'react-icons/fi'
import { CertificateCard } from '../../components/certificate/CertificateCard'
import { EmptyState } from '../../components/common/EmptyState'
import { useCertificate } from '../../hooks/useCertificate'

export default function CertificatesPage() {
  const { certificates } = useCertificate()

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          My Certificates
        </h1>
        <p className="mt-2 text-base-content/60">
          {certificates.length > 0
            ? `You've earned ${certificates.length} ${
                certificates.length === 1 ? 'certificate' : 'certificates'
              }.`
              : 'Complete a course to earn your first certificate.'}
        </p>
      </header>

      {certificates.length === 0 ? (
        <EmptyState
          icon={FiAward}
          title="You haven't earned any certificates yet"
          description="Finish all lessons in a course and your certificate will appear here automatically."
          action={
            <Link to="/my-courses" className="btn btn-primary">
              Go to My Courses
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  )
}