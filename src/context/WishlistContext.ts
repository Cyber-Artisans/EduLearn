import { createContext } from 'react'

export interface WishlistContextValue {
  wishlistIds: string[]
  isWishlisted: (courseId: string) => boolean
  add: (courseId: string) => void
  remove: (courseId: string) => void
  toggle: (courseId: string) => void
  clear: () => void
}

export const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined,
)