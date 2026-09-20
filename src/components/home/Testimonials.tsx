import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { Rating } from '../common/Rating'
import { mockTestimonials } from '../../data/testimonials'

export function Testimonials() {
  return (
    <section className="section-y bg-base-200">
      <Container>
        <SectionHeading
          eyebrow="Loved by learners"
          title="What our students say"
          description="Real reviews from learners who transformed their careers with EduLearn."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTestimonials.map((t) => (
            <figure key={t.id} className="card-edulearn flex flex-col gap-4">
              <Rating value={t.rating} size="md" showValue={false} />
              <blockquote className="text-sm text-base-content/80 leading-relaxed flex-1">
                "{t.review}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-2 border-t border-base-300">
                <img
                  src={t.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-base-content/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}