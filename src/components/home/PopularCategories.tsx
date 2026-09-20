import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { CategoryCard } from '../course/CategoryCard'
import { mockCategories } from '../../data/categories'

export function PopularCategories() {
  return (
    <section className="section-y bg-base-200">
      <Container>
        <SectionHeading
          eyebrow="Browse by topic"
          title="Popular Categories"
          description="Find the right course for your goals — from code to design to business."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockCategories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </Container>
    </section>
  )
}