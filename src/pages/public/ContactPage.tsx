import { ContactHero } from '../../components/contact/ContactHero'
import { ContactMethods } from '../../components/contact/ContactMethods'
import { ContactForm } from '../../components/contact/ContactForm'
import { FAQAccordion } from '../../components/contact/FAQAccordion'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <FAQAccordion />
    </>
  )
}