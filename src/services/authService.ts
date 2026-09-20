import { mockUsers } from '../data/users'
import type { Role, User, UserRecord } from '../types/user'

const STORAGE_KEY = 'edulearn.user'
const REGISTERED_KEY = 'edulearn.registeredUsers'
const PROFILE_OVERRIDES_KEY = 'edulearn.profileOverrides'
const SESSION_DELAY_MS = 600

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

function delay<T>(value: T, ms = SESSION_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function stripPassword(record: UserRecord): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...user } = record
  return user
}

function readRegistered(): UserRecord[] {
  try {
    const raw = localStorage.getItem(REGISTERED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as UserRecord[]) : []
  } catch {
    return []
  }
}

function writeRegistered(list: UserRecord[]): void {
  try {
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

function readOverrides(): Record<string, Partial<User>> {
  try {
    const raw = localStorage.getItem(PROFILE_OVERRIDES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object'
      ? (parsed as Record<string, Partial<User>>)
      : {}
  } catch {
    return {}
  }
}

function writeOverrides(data: Record<string, Partial<User>>): void {
  try {
    localStorage.setItem(PROFILE_OVERRIDES_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

function applyOverride(user: User): User {
  const overrides = readOverrides()
  return overrides[user.id] ? { ...user, ...overrides[user.id] } : user
}

function allUsers(): UserRecord[] {
  return [...mockUsers, ...readRegistered()]
}

export const authService = {
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return null
      // Re-apply any saved profile overrides so a rename survives reload.
      return applyOverride(parsed as User)
    } catch {
      return null
    }
  },

  setCurrentUser(user: User | null): void {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  },

  async login(email: string, password: string): Promise<User> {
    const normalized = email.trim().toLowerCase()
    const record = allUsers().find(
      (u) => u.email.toLowerCase() === normalized,
    )
    if (!record) throw new AuthError('No account found with that email.')
    if (record.password !== password)
      throw new AuthError('Incorrect password. Please try again.')
    return delay(applyOverride(stripPassword(record)))
  },

  async register(input: {
    name: string
    email: string
    password: string
    role?: Role
  }): Promise<User> {
    const normalized = input.email.trim().toLowerCase()

    if (allUsers().some((u) => u.email.toLowerCase() === normalized)) {
      throw new AuthError('An account with that email already exists.')
    }

    const record: UserRecord = {
      id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: input.name.trim(),
      email: normalized,
      password: input.password,
      avatar: `https://i.pravatar.cc/200?u=${encodeURIComponent(normalized)}`,
      role: input.role ?? 'student',
      bio: '',
      joinedAt: new Date().toISOString().slice(0, 10),
    }

    writeRegistered([...readRegistered(), record])
    return delay(stripPassword(record))
  },

  /** Update the current user's profile. Persists as an override. */
  async updateProfile(
    userId: string,
    patch: Partial<Pick<User, 'name' | 'bio' | 'avatar'>>,
  ): Promise<User> {
    const current = this.getCurrentUser()
    if (!current || current.id !== userId) {
      throw new AuthError('You must be logged in to update your profile.')
    }

    const overrides = readOverrides()
    overrides[userId] = { ...overrides[userId], ...patch }
    writeOverrides(overrides)

    const next: User = { ...current, ...patch }
    this.setCurrentUser(next)
    return delay(next, 500)
  },

  async requestPasswordReset(email: string): Promise<void> {
    await delay(undefined, 700)
    void email
  },

  logout(): void {
    this.setCurrentUser(null)
  },
}