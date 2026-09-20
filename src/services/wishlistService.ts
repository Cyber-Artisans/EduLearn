const STORAGE_KEY = 'edulearn.wishlist'

interface StoredWishlist {
  [userId: string]: string[] // userId -> array of courseIds
}

function readAll(): StoredWishlist {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as StoredWishlist) : {}
  } catch {
    return {}
  }
}

function writeAll(data: StoredWishlist): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export const wishlistService = {
  list(userId: string): string[] {
    return readAll()[userId] ?? []
  },

  has(userId: string, courseId: string): boolean {
    return (readAll()[userId] ?? []).includes(courseId)
  },

  add(userId: string, courseId: string): void {
    const all = readAll()
    const list = all[userId] ?? []
    if (list.includes(courseId)) return
    all[userId] = [...list, courseId]
    writeAll(all)
  },

  remove(userId: string, courseId: string): void {
    const all = readAll()
    const list = all[userId] ?? []
    all[userId] = list.filter((id) => id !== courseId)
    writeAll(all)
  },

  toggle(userId: string, courseId: string): boolean {
    const has = this.has(userId, courseId)
    if (has) this.remove(userId, courseId)
    else this.add(userId, courseId)
    return !has
  },

  clear(userId: string): void {
    const all = readAll()
    delete all[userId]
    writeAll(all)
  },
}