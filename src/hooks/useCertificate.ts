import { useContext } from 'react'
import { CertificateContext } from '../context/CertificateContext'

export function useCertificate() {
  const ctx = useContext(CertificateContext)
  if (!ctx) {
    throw new Error('useCertificate must be used inside <CertificateProvider>')
  }
  return ctx
}