import { Link } from 'react-router-dom'
import { FiArrowRight, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { Container } from '../common/Container'

export function InstructorCTA() {
    return (
        <section className="section-y bg-base-100">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl bg-linear-to-br from-primary to-secondary p-8 md:p-12 text-primary-content overflow-hidden relative">
                    <div
                        aria-hidden="true"
                        className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-2xl"
                    />
                    <div className="space-y-6 relative">
                        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                            Share Your Knowledge With Thousands of Learners
                        </h2>
                        <p className="text-primary-content/90 max-w-lg">
                            Join our instructor community, publish your first course in
                            minutes, and earn while helping others grow.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/register?role=instructor"
                                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0"
                            >
                                Become an Instructor <FiArrowRight />
                            </Link>
                            <Link
                                to="/about"
                                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                        {[
                            { icon: FiUsers, label: 'Reach learners worldwide' },
                            { icon: FiDollarSign, label: 'Earn from every enrollment' },
                            { icon: FiTrendingUp, label: 'Grow your personal brand' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="rounded-2xl bg-white/10 backdrop-blur p-4 text-center space-y-2 border border-white/20"
                            >
                                <Icon className="mx-auto h-6 w-6" />
                                <p className="text-sm font-medium">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}