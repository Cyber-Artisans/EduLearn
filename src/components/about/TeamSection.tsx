import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { mockTeam } from '../../data/team'

export function TeamSection() {
  return (
    <section className="section-y bg-base-200">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="People behind EduLearn"
          description="A small, opinionated team of engineers, designers, and educators."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTeam.map((member) => (
            <div key={member.id} className="card-edulearn text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
              />
              <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
              <p className="text-sm text-primary font-medium mt-0.5">
                {member.role}
              </p>
              <p className="mt-3 text-sm text-base-content/70">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}