import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import { GuestRoute } from '../components/common/GuestRoute'

import HomePage from '../pages/public/HomePage'
import CoursesPage from '../pages/public/CoursesPage'
import CourseDetailsPage from '../pages/public/CourseDetailsPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'
import NotFoundPage from '../pages/public/NotFoundPage'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

import DashboardPage from '../pages/student/DashboardPage'
import MyCoursesPage from '../pages/student/MyCoursesPage'
import WishlistPage from '../pages/student/WishlistPage'
import CertificatesPage from '../pages/student/CertificatesPage'
import ProfilePage from '../pages/student/ProfilePage'
import LearnPage from '../pages/student/LearnPage'
import QuizPage from '../pages/student/QuizPage'

import CourseBuilderPage from '../pages/instructor/CourseBuilderPage'
import InstructorDashboardPage from '../pages/instructor/InstructorDashboardPage'
import InstructorCoursesPage from '../pages/instructor/InstructorCoursesPage'
import CreateCoursePage from '../pages/instructor/CreateCoursePage'
import EditCoursePage from '../pages/instructor/EditCoursePage'
import CertificateDetailPage from '../pages/student/CertificateDetailPage'
import CategoriesPage from '../pages/public/CategoriesPage'

export function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Guest-only (login/register/forgot) */}
            <Route element={<GuestRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                </Route>
            </Route>

            {/* Protected: student + instructor (any logged-in user) */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/my-courses" element={<MyCoursesPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/certificates" element={<CertificatesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/certificates" element={<CertificatesPage />} />
                    <Route path="/certificates/:id" element={<CertificateDetailPage />} />
                </Route>
            </Route>

            {/* Instructor-only */}
            <Route element={<ProtectedRoute requiredRole="instructor" />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        path="/instructor/dashboard"
                        element={<InstructorDashboardPage />}
                    />
                    <Route
                        path="/instructor/courses"
                        element={<InstructorCoursesPage />}
                    />
                    <Route
                        path="/instructor/courses/create"
                        element={<CreateCoursePage />}
                    />
                    <Route
                        path="/instructor/courses/:id/edit"
                        element={<EditCoursePage />}
                    />
                    <Route
                        path="/instructor/courses/:id/builder"
                        element={<CourseBuilderPage />}
                    />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/learn/:courseId" element={<LearnPage />} />
                <Route path="/learn/:courseId/quiz/:quizId" element={<QuizPage />} />
            </Route>
        </Routes>
    )
}