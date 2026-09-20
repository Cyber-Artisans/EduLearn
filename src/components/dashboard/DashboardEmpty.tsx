import { Link } from 'react-router-dom'
import { FiBookOpen, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

export function DashboardEmpty() {
    const { user } = useAuth()
    const firstName = user?.name.split(' ')[0] ?? 'there'

    return (
        <div className="rounded-3xl border border-base-300 bg-base-200 p-8 md:p-14 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FiBookOpen className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-2xl md:text-3xl font-extrabold tracking-tight">
                Welcome, {firstName} 👋
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base-content/70">
                You haven't enrolled in any courses yet. Browse our catalog and start
                learning today — many courses are completely free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/courses" className="btn btn-primary btn-lg">
                    Explore Courses <FiArrowRight />
                </Link>
                <Link to="/wishlist" className="btn btn-outline btn-lg">
                    View Wishlist
                </Link>
            </div>
        </div>
    )
}