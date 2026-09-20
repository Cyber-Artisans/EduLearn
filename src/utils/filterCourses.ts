import type { Course, Level } from '../types/course'

export type SortOption =
  | 'popular'
  | 'rating'
  | 'newest'
  | 'price-asc'
  | 'price-desc'

export type PriceFilter = 'all' | 'free' | 'paid'

export interface CourseFilters {
  search: string
  categories: string[]
  levels: Level[]
  minRating: number
  price: PriceFilter
  sort: SortOption
}

export const DEFAULT_FILTERS: CourseFilters = {
  search: '',
  categories: [],
  levels: [],
  minRating: 0,
  price: 'all',
  sort: 'popular',
}

export const SORT_LABELS: Record<SortOption, string> = {
  popular: 'Most Popular',
  rating: 'Highest Rated',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
}

export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced']

export function filterCourses(
  courses: Course[],
  filters: CourseFilters,
): Course[] {
  const query = filters.search.trim().toLowerCase()

  let result = courses.filter((course) => {
    if (query) {
      const haystack = `${course.title} ${course.description} ${course.tags.join(' ')}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }

    if (filters.categories.length > 0 && !filters.categories.includes(course.categoryId)) {
      return false
    }

    if (filters.levels.length > 0 && !filters.levels.includes(course.level)) {
      return false
    }

    if (filters.minRating > 0 && course.rating < filters.minRating) {
      return false
    }

    if (filters.price === 'free' && !course.isFree) return false
    if (filters.price === 'paid' && course.isFree) return false

    return true
  })

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'popular':
      default:
        return b.students - a.students
    }
  })

  return result
}