import { createContext } from 'react'
import type { Role, User } from '../types/user'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isInstructor: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (input: {
    name: string
    email: string
    password: string
    role?: Role
  }) => Promise<User>
  updateProfile: (
    patch: Partial<Pick<User, 'name' | 'bio' | 'avatar'>>,
  ) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)