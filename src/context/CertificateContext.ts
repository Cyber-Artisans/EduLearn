import { createContext } from 'react'
import type { Certificate } from '../types/certificate'

export interface IssueCertificateInput {
  userId: string
  courseId: string
  studentName: string
  courseName: string
  instructorName: string
}

export interface CertificateContextValue {
  certificates: Certificate[]
  getByCourse: (courseId: string) => Certificate | undefined
  getById: (id: string) => Certificate | undefined
  issue: (input: IssueCertificateInput) => Certificate | null
  revoke: (courseId: string) => void
}

export const CertificateContext = createContext<
  CertificateContextValue | undefined
>(undefined)