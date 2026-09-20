import { FiCheck } from 'react-icons/fi'

interface WhatYouLearnProps {
  outcomes: string[]
}

export function WhatYouLearn({ outcomes }: WhatYouLearnProps) {
  return (
    <section className="card-edulearn">
      <h2 className="text-2xl font-bold mb-5">What you'll learn</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {outcomes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
              <FiCheck className="h-3.5 w-3.5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}