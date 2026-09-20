interface CourseGridSkeletonProps {
  count?: number
}

export function CourseGridSkeleton({ count = 8 }: CourseGridSkeletonProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden">
          <div className="skeleton aspect-video w-full rounded-none" />
          <div className="p-5 space-y-3">
            <div className="flex gap-2">
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 w-20" />
            </div>
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-4 w-3/4" />
            <div className="flex justify-between pt-2">
              <div className="skeleton h-6 w-16" />
              <div className="skeleton h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}