import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { wishlistService } from '../services/wishlistService'
import { WishlistContext, type WishlistContextValue } from './WishlistContext'

interface WishlistProviderProps {
  children: ReactNode
  userId: string | null
}

export function WishlistProvider({ children, userId }: WishlistProviderProps) {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    userId ? wishlistService.list(userId) : [],
  )

  const refresh = useCallback(() => {
    if (!userId) {
      setWishlistIds([])
      return
    }
    setWishlistIds(wishlistService.list(userId))
  }, [userId])

  const add = useCallback(
    (courseId: string) => {
      if (!userId) return
      wishlistService.add(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const remove = useCallback(
    (courseId: string) => {
      if (!userId) return
      wishlistService.remove(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const toggle = useCallback(
    (courseId: string) => {
      if (!userId) return
      wishlistService.toggle(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const clear = useCallback(() => {
    if (!userId) return
    wishlistService.clear(userId)
    refresh()
  }, [userId, refresh])

  const isWishlisted = useCallback(
    (courseId: string) => wishlistIds.includes(courseId),
    [wishlistIds],
  )

  const value = useMemo<WishlistContextValue>(
    () => ({ wishlistIds, isWishlisted, add, remove, toggle, clear }),
    [wishlistIds, isWishlisted, add, remove, toggle, clear],
  )

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}