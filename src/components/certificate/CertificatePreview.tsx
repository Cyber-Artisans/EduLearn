import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa6'
import { FiPrinter, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import type { Certificate } from '../../types/certificate'

interface CertificatePreviewProps {
    certificate: Certificate
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function CertificatePreview({ certificate }: CertificatePreviewProps) {
    const [params] = useSearchParams()

    // Auto-print if ?print=1 (used by the download button on the list page).
    useEffect(() => {
        if (params.get('print') === '1') {
            const t = setTimeout(() => window.print(), 400)
            return () => clearTimeout(t)
        }
    }, [params])

    return (
        <div className="space-y-6">
            {/* Action bar — hidden when printing */}
            <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                <Link
                    to="/certificates"
                    className="btn btn-ghost btn-sm gap-2"
                >
                    <FiArrowLeft /> All certificates
                </Link>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.print()}
                >
                    <FiPrinter /> Print / Save as PDF
                </button>
            </div>

            {/* The certificate itself */}
            <article
                id="certificate"
                className="
          certificate-print
          relative mx-auto w-full max-w-4xl overflow-hidden
          rounded-2xl border-4 border-double border-primary/40 bg-base-100
          p-8 sm:p-12 md:p-16
          shadow-xl
        "
            >
                {/* Decorative corners */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-xl border border-primary/20"
                />

                <div className="relative text-center">
                    {/* Brand */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content">
                            <FaGraduationCap className="h-6 w-6" />
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight">
                            Edu<span className="text-primary">Learn</span>
                        </span>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-base-content/60">
                        Certificate of Completion
                    </p>

                    <div className="mx-auto my-6 h-px w-24 bg-primary/40" />

                    <p className="text-sm text-base-content/70">
                        This is to certify that
                    </p>

                    <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-base-content">
                        {certificate.studentName}
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-base-content/70">
                        has successfully completed the course
                    </p>

                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                        {certificate.courseName}
                    </h2>

                    <p className="mt-6 max-w-xl mx-auto text-sm text-base-content/60">
                        demonstrating dedication, skill, and completion of all required
                        lessons and assessments.
                    </p>

                    {/* Signature block */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                        <div className="text-center">
                            <p className="text-sm font-semibold">
                                {formatDate(certificate.issuedAt)}
                            </p>
                            <div className="mt-1 mx-auto h-px w-32 bg-base-300" />
                            <p className="text-xs text-base-content/60 mt-1">Date Issued</p>
                        </div>

                        <div className="text-center order-first sm:order-0">
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                                <FiCheckCircle className="h-7 w-7" />
                            </span>
                            <p className="text-xs text-base-content/60 mt-2">Verified</p>
                        </div>

                        <div className="text-center">
                            <p className="font-serif text-xl italic">
                                {certificate.instructorName}
                            </p>
                            <div className="mt-1 mx-auto h-px w-32 bg-base-300" />
                            <p className="text-xs text-base-content/60 mt-1">Instructor</p>
                        </div>
                    </div>

                    {/* Certificate ID footer */}
                    <div className="mt-10 text-xs text-base-content/50">
                        Certificate ID:{' '}
                        <span className="font-mono font-semibold text-base-content/70">
                            {certificate.certificateCode}
                        </span>
                    </div>
                </div>
            </article>

            {/* Print-only footer hint */}
            <p className="text-center text-xs text-base-content/50 print:hidden">
                Tip: In the print dialog, choose "Save as PDF" to download.
            </p>
        </div>
    )
}