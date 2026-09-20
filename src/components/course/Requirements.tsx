import { FiCircle } from 'react-icons/fi'

interface RequirementsProps {
  requirements: string[]
}

export function Requirements({ requirements }: RequirementsProps) {
  return (
    <section className="card-edulearn">
      <h2 className="text-2xl font-bold mb-5">Requirements</h2>
      <ul className="space-y-2">
        {requirements.map((req) => (
          <li key={req} className="flex items-start gap-3 text-sm">
            <FiCircle className="mt-1.5 h-2 w-2 shrink-0 text-base-content/40" />
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}