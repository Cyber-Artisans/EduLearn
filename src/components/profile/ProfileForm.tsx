import { useState, type FormEvent } from 'react'
import { FiSave } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import type { User } from '../../types/user'

interface ProfileFormProps {
  user: User
}

interface FormErrors {
  name?: string
  avatar?: string
  general?: string
}

const URL_RE = /^https?:\/\/.+/i

export function ProfileForm({ user }: ProfileFormProps) {
  const { updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio ?? '')
  const [avatar, setAvatar] = useState(user.avatar)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const isDirty =
    name !== user.name || bio !== (user.bio ?? '') || avatar !== user.avatar

  function validate(): boolean {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Name is required.'
    else if (name.trim().length < 2) next.name = 'Name is too short.'
    if (avatar && !URL_RE.test(avatar))
      next.avatar = 'Avatar must be a valid URL starting with http(s)://'
    setErrors(next)
    return Object.keys(next).length === 0  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setErrors({})
    try {
      await updateProfile({ name: name.trim(), bio: bio.trim(), avatar })
      setSavedAt(Date.now())
      setTimeout(() => setSavedAt(null), 2500)
    } catch (err) {
      setErrors({
        general:
          err instanceof Error ? err.message : 'Could not save. Try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setName(user.name)
    setBio(user.bio ?? '')
    setAvatar(user.avatar)
    setErrors({})
  }

  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-5">Edit profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {errors.general && (
          <div role="alert" className="alert alert-error py-3 text-sm">
            {errors.general}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-5">
          <img
            src={avatar || user.avatar}
            alt=""
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = user.avatar
            }}
            className="h-20 w-20 rounded-full object-cover ring-2 ring-base-300"
          />
          <div className="flex-1">
            <label htmlFor="profile-avatar" className="label">
              <span className="label-text font-medium">Avatar URL</span>
            </label>
            <input
              id="profile-avatar"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className={`input input-bordered w-full ${
                errors.avatar ? 'input-error' : ''
              }`}
            />
            {errors.avatar ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.avatar}
                </span>
              </label>
            ) : (
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Paste a link to your profile picture
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="profile-name" className="label">
            <span className="label-text font-medium">Full name</span>
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`input input-bordered w-full ${
              errors.name ? 'input-error' : ''
            }`}
            autoComplete="name"
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.name}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="profile-email" className="label">
            <span className="label-text font-medium">Email</span>
            <span className="label-text-alt text-base-content/60">
              Cannot be changed
            </span>
          </label>
          <input
            id="profile-email"
            type="email"
            value={user.email}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div className="form-control">
          <label htmlFor="profile-bio" className="label">
            <span className="label-text font-medium">Bio</span>
            <span className="label-text-alt text-base-content/60">
              {bio.length}/280
            </span>
          </label>
          <textarea
            id="profile-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 280))}
            rows={4}
            placeholder="Tell us a bit about yourself…"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {savedAt && (
            <span className="text-sm text-success font-medium">
              ✓ Profile saved
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-ghost"
            disabled={!isDirty || saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isDirty || saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving…
              </>
            ) : (
              <>
                <FiSave /> Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}