import { useEffect, useRef, useState } from 'react'

interface StatProps {
  value: number
  suffix?: string
  label: string
  duration?: number
}

export function Stat({ value, suffix = '', label, duration = 1500 }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              setCount(Math.floor(progress * value))
              if (progress < 1) requestAnimationFrame(tick)
              else setCount(value)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-extrabold text-primary">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-base-content/70">{label}</p>
    </div>
  )
}