import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { CertificateProvider } from './context/CertificateProvider'
import { EnrollmentProvider } from './context/EnrollmentProvider'
import { QuizProvider } from './context/QuizProvider'
import { WishlistProvider } from './context/WishlistProvider'
import { AppRoutes } from './routes/AppRoutes'
import { useAuth } from './hooks/useAuth'

function AppShell() {
  const { user } = useAuth()
  const key = user?.id ?? 'guest'

  return (
    <WishlistProvider key={`wl-${key}`} userId={user?.id ?? null}>
      <CertificateProvider key={`cert-${key}`} userId={user?.id ?? null}>
        <EnrollmentProvider key={`enr-${key}`} userId={user?.id ?? null}>
          <QuizProvider key={`quiz-${key}`} userId={user?.id ?? null}>
            <AppRoutes />
          </QuizProvider>
        </EnrollmentProvider>
      </CertificateProvider>
    </WishlistProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App