import { Hero } from '../../components/home/Hero'
import { PopularCategories } from '../../components/home/PopularCategories'
import { FeaturedCourses } from '../../components/home/FeaturedCourses'
import { WhyChooseUs } from '../../components/home/WhyChooseUs'
import { HowItWorks } from '../../components/home/HowItWorks'
import { Statistics } from '../../components/home/Statistics'
import { InstructorCTA } from '../../components/home/InstructorCTA'
import { Testimonials } from '../../components/home/Testimonials'
import { FinalCTA } from '../../components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <FeaturedCourses />
      <WhyChooseUs />
      <HowItWorks />
      <Statistics />
      <InstructorCTA />
      <Testimonials />
      <FinalCTA />
    </>
  )
}