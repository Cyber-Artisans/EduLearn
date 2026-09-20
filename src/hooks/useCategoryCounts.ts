import { mockCategories } from '../data/categories'
import { courseService } from '../services/courseService'
import type { Category } from '../types/course'

export interface CategoryWithCount extends Category {
  /** Live count from the full catalog (seed + instructor-created). */
  courseCount: number
}

/**
 * Returns the category list with counts computed from the actual catalog.
 * Falls back to the seeded `courseCount` if the catalog has no courses in
 * a category yet.
 *
 * No `useMemo` here on purpose — React Compiler handles memoization
 * automatically when it can prove the computation is safe to cache.
 * Manual memoization with external module calls (courseService) blocks
 * the compiler from optimizing.
 */
export function useCategoryCounts(): CategoryWithCount[] {
  const allCourses = courseService.list()

  if (allCourses.length === 0) {
    return mockCategories.map((c) => ({ ...c, courseCount: c.courseCount }))
  }

  return mockCategories.map((cat) => {
    const live = allCourses.filter((c) => c.categoryId === cat.id).length
    return {
      ...cat,
      courseCount: live > 0 ? live : cat.courseCount,
    }
  })
}