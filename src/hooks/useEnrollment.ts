import { useContext } from 'react'
import { EnrollmentContext } from '../context/EnrollmentContext'

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext)
  if (!ctx) {
    throw new Error('useEnrollment must be used inside <EnrollmentProvider>')
  }
  return ctx
}