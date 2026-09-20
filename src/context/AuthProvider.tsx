import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { authService } from '../services/authService'
import type { Role, User } from '../types/user'
import { AuthContext, type AuthContextValue } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() =>
    authService.getCurrentUser(),
  )
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const next = await authService.login(email, password)
      authService.setCurrentUser(next)
      setUser(next)
      return next
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(
    async (input: {
      name: string
      email: string
      password: string
      role?: Role
    }) => {
      setIsLoading(true)
      try {
        const next = await authService.register(input)
        authService.setCurrentUser(next)
        setUser(next)
        return next
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const updateProfile = useCallback(
    async (patch: Partial<Pick<User, 'name' | 'bio' | 'avatar'>>) => {
      if (!user) throw new Error('Not authenticated')
      setIsLoading(true)
      try {
        const next = await authService.updateProfile(user.id, patch)
        setUser(next)
        return next
      } finally {
        setIsLoading(false)
      }
    },
    [user],
  )

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isInstructor: user?.role === 'instructor',
      isLoading,
      login,
      register,
      updateProfile,
      logout,
    }),
    [user, isLoading, login, register, updateProfile, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}