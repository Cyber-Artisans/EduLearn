import { Link } from 'react-router-dom'
import { FiAward, FiDownload, FiExternalLink } from 'react-icons/fi'
import type { Certificate } from '../../types/certificate'

interface CertificateCardProps {
  certificate: Certificate
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <article className="card-edulearn flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
          <FiAward className="h-7 w-7" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Certificate of Completion
          </p>
          <h3 className="mt-1 font-bold leading-snug line-clamp-2">
            {certificate.courseName}
          </h3>
          <p className="mt-1 text-xs text-base-content/60">
            {certificate.instructorName} · Issued {formatDate(certificate.issuedAt)}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-base-200 px-3 py-2 text-xs">
        <span className="text-base-content/60">Certificate ID: </span>
        <span className="font-mono font-semibold">{certificate.certificateCode}</span>
      </div>

      <div className="flex gap-2 pt-1">
        <Link
          to={`/certificates/${certificate.id}`}
          className="btn btn-primary btn-sm flex-1"
        >
          <FiExternalLink /> View
        </Link>
        <Link
          to={`/certificates/${certificate.id}?print=1`}
          className="btn btn-outline btn-sm"
          aria-label="Download certificate"
        >
          <FiDownload />
        </Link>
      </div>
    </article>
  )
}