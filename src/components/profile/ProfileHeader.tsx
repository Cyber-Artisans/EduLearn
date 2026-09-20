import { FiCalendar, FiMail, FiShield } from 'react-icons/fi'
import type { User } from '../../types/user'

interface ProfileHeaderProps {
  user: User
}

function formatJoinDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  })
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const roleBadgeColor =
    user.role === 'instructor'
      ? 'badge-secondary'
      : user.role === 'admin'
        ? 'badge-error'
        : 'badge-primary'

  return (
    <section className="card-edulearn flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
      />

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {user.name}
          </h1>
          <span className={`badge ${roleBadgeColor} badge-sm font-semibold capitalize`}>
            {user.role}
          </span>
        </div>

        {user.bio && (
          <p className="mt-2 text-sm text-base-content/70 max-w-xl">
            {user.bio}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-base-content/60">
          <span className="flex items-center gap-1.5">
            <FiMail /> {user.email}
          </span>
          <span className="flex items-center gap-1.5">
            <FiCalendar /> Joined {formatJoinDate(user.joinedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiShield /> ID: <span className="font-mono text-xs">{user.id}</span>
          </span>
        </div>
      </div>
    </section>
  )
}