import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { certificateService } from '../services/certificateService'
import type { Certificate } from '../types/certificate'
import {
  CertificateContext,
  type CertificateContextValue,
  type IssueCertificateInput,
} from './CertificateContext'

interface CertificateProviderProps {
  children: ReactNode
  userId: string | null
}

export function CertificateProvider({
  children,
  userId,
}: CertificateProviderProps) {
  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    userId ? certificateService.listForUser(userId) : [],
  )

  const refresh = useCallback(() => {
    if (!userId) {
      setCertificates([])
      return
    }
    setCertificates(certificateService.listForUser(userId))
  }, [userId])

  const issue = useCallback(
    (input: IssueCertificateInput): Certificate | null => {
      if (!userId) return null
      const cert = certificateService.issue({ ...input, userId })
      refresh()
      return cert
    },
    [userId, refresh],
  )

  const revoke = useCallback(
    (courseId: string) => {
      if (!userId) return
      certificateService.revoke(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const getByCourse = useCallback(
    (courseId: string) =>
      certificates.find((c) => c.courseId === courseId) ??
      (userId ? certificateService.getByCourse(userId, courseId) : undefined),
    [certificates, userId],
  )

  const getById = useCallback(
    (id: string) =>
      certificates.find((c) => c.id === id) ?? certificateService.getById(id),
    [certificates],
  )

  const value = useMemo<CertificateContextValue>(
    () => ({ certificates, getByCourse, getById, issue, revoke }),
    [certificates, getByCourse, getById, issue, revoke],
  )

  return (
    <CertificateContext.Provider value={value}>
      {children}
    </CertificateContext.Provider>
  )
}