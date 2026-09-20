import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileForm } from '../../components/profile/ProfileForm'
import { PasswordForm } from '../../components/profile/PasswordForm'
import { LearningStats } from '../../components/profile/LearningStats'
import { EmptyState } from '../../components/common/EmptyState'
import { useAuth } from '../../hooks/useAuth'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <EmptyState
        icon={FiAlertCircle}
        title="Not signed in"
        description="Please log in to view your profile."
        action={
          <Link to="/login?redirect=/profile" className="btn btn-primary">
            Log in
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      <LearningStats />
      <ProfileForm user={user} />
      <PasswordForm />
    </div>
  )
}