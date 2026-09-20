import { Container } from '../common/Container'
import { Stat } from '../common/Stat'

export function Statistics() {
  return (
    <section className="section-y bg-neutral text-neutral-content">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value={10000} suffix="+" label="Students learning" />
          <Stat value={200}   suffix="+" label="Expert-led courses" />
          <Stat value={100}   suffix="+" label="Professional instructors" />
          <Stat value={50000} suffix="+" label="Lessons completed" />
        </div>
      </Container>
    </section>
  )
}