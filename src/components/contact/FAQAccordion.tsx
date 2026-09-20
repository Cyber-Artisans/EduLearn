import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { mockFAQs } from '../../data/faqs'

export function FAQAccordion() {
  return (
    <section className="section-y bg-base-100">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick answers to the most common questions we receive."
        />
        <div className="space-y-3">
          {mockFAQs.map((faq, idx) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow border border-base-300 rounded-xl bg-base-100"
            >
              <input
                type="checkbox"
                defaultChecked={idx === 0}
                aria-label={`Toggle ${faq.question}`}
              />
              <div className="collapse-title font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-sm text-base-content/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}