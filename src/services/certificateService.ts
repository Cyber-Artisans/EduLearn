import type { Certificate } from '../types/certificate'

const STORAGE_KEY = 'edulearn.certificates'

function readAll(): Certificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Certificate[]) : []
  } catch {
    return []
  }
}

function writeAll(list: Certificate[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

/** Deterministic-ish code. Frontend-only; a real backend would sign this. */
function generateCode(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')
  return `EDL-${hex.slice(0, 4)}-${hex.slice(4, 8)}`
}

export const certificateService = {
  listForUser(userId: string): Certificate[] {
    return readAll()
      .filter((c) => c.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime(),
      )
  },

  getById(id: string): Certificate | undefined {
    return readAll().find((c) => c.id === id)
  },

  getByCourse(userId: string, courseId: string): Certificate | undefined {
    return readAll().find(
      (c) => c.userId === userId && c.courseId === courseId,
    )
  },

  /** Idempotent — returns the existing certificate if one already exists. */
  issue(input: {
    userId: string
    courseId: string
    studentName: string
    courseName: string
    instructorName: string
  }): Certificate {
    const existing = this.getByCourse(input.userId, input.courseId)
    if (existing) return existing

    const now = new Date().toISOString()
    const certificate: Certificate = {
      id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: input.userId,
      courseId: input.courseId,
      studentName: input.studentName,
      courseName: input.courseName,
      instructorName: input.instructorName,
      issuedAt: now,
      certificateCode: generateCode(`${input.userId}:${input.courseId}:${now}`),
    }
    writeAll([certificate, ...readAll()])
    return certificate
  },

  revoke(userId: string, courseId: string): void {
    writeAll(
      readAll().filter(
        (c) => !(c.userId === userId && c.courseId === courseId),
      ),
    )
  },
}