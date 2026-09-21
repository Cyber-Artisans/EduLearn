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
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>

      <div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="fa-regular fa-circle-up 
            fixed bottom-6 right-6 text-blue-900 text-5xl px-4 py-2 hover:text-blue-800 transition"></i>
        </button>
      </div>
    </>  
  )
}

export default App