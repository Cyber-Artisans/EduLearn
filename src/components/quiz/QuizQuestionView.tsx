import type { QuizQuestion } from '../../types/quiz'

interface QuizQuestionViewProps {
  question: QuizQuestion
  index: number
  total: number
  selectedIndex: number | null
  onSelect: (optionIndex: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuizQuestionView({
  question,
  index,
  total,
  selectedIndex,
  onSelect,
}: QuizQuestionViewProps) {
  return (
    <fieldset>
      <legend className="sr-only">
        Question {index + 1} of {total}
      </legend>

      <h2 className="text-xl md:text-2xl font-bold leading-snug mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const selected = selectedIndex === i
          const id = `q-${question.id}-opt-${i}`
          return (
            <label
              key={id}
              htmlFor={id}
              className={`flex items-start gap-4 rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                selected
                  ? 'border-primary bg-primary/5'
                  : 'border-base-300 hover:border-primary/50 hover:bg-base-200'
              }`}
            >
              <input
                id={id}
                type="radio"
                name={`question-${question.id}`}
                className="sr-only"
                checked={selected}
                onChange={() => onSelect(i)}
              />
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  selected
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-200 text-base-content/70'
                }`}
                aria-hidden="true"
              >
                {LETTERS[i]}
              </span>
              <span className="text-base pt-1">{option}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}