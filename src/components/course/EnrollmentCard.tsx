import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiHeart,
  FiShare2,
  FiCheck,
  FiClock,
  FiAward,
  FiSmartphone,
  FiRepeat,
  FiVideo,
} from 'react-icons/fi'
import { useEnrollment } from '../../hooks/useEnrollment'
import { useAuth } from '../../hooks/useAuth'
import { useWishlist } from '../../hooks/useWishlist'
import type { Course } from '../../types/course'

interface EnrollmentCardProps {
  course: Course
}

const includes = [
  { icon: FiVideo, label: 'On-demand video lessons' },
  { icon: FiClock, label: 'Lifetime access' },
  { icon: FiSmartphone, label: 'Access on mobile and TV' },
  { icon: FiAward, label: 'Certificate of completion' },
  { icon: FiRepeat, label: 'All future updates included' },
]

export function EnrollmentCard({ course }: EnrollmentCardProps) {
  const { isAuthenticated } = useAuth()
  const { isEnrolled, enroll } = useEnrollment()
  const { isWishlisted, toggle } = useWishlist()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const enrolled = isEnrolled(course.id)
  const wishlisted = isWishlisted(course.id)

  function handleEnroll() {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/courses/${course.id}`)
      return
    }
    if (enrolled) {
      navigate(`/learn/${course.id}`)
      return
    }
    enroll(course.id)
  }

  function handleWishlist() {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/courses/${course.id}`)
      return
    }
    toggle(course.id)
  }

  function handleShare() {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      })
      .catch(() => {})
  }

  const priceLabel = course.isFree ? 'Free' : `$${course.price.toFixed(2)}`

  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      <div className="card-edulearn p-0! overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold ${
                course.isFree ? 'text-success' : ''
              }`}
            >
              {priceLabel}
            </span>
            {!course.isFree && (
              <span className="text-sm text-base-content/50 line-through">
                ${(course.price * 1.6).toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleEnroll}
            className={`btn btn-block btn-lg ${
              enrolled ? 'btn-success' : 'btn-primary'
            }`}
          >
            {enrolled ? (
              <>
                <FiCheck /> Go to Course
              </>
            ) : (
              'Enroll Now'
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleWishlist}
              aria-pressed={wishlisted}
            >
              <FiHeart
                className={wishlisted ? 'fill-current text-error' : ''}
              />
              {wishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleShare}
            >
              <FiShare2 />
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>

          <p className="text-xs text-center text-base-content/60">
            30-day money-back guarantee
          </p>
        </div>

        <div className="border-t border-base-300 p-6">
          <h3 className="font-bold text-sm uppercase tracking-wide mb-3">
            This course includes
          </h3>
          <ul className="space-y-2.5 text-sm">
            {includes.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-base-content/60 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}