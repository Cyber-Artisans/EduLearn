import { AboutHero } from '../../components/about/AboutHero'
import { MissionSection } from '../../components/about/MissionSection'
import { ValuesSection } from '../../components/about/ValuesSection'
import { TeamSection } from '../../components/about/TeamSection'
import { AboutCTA } from '../../components/about/AboutCTA'
import { Statistics } from '../../components/home/Statistics'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <Statistics />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </>
  )
}