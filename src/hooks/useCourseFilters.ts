import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DEFAULT_FILTERS,
  type CourseFilters,
  type PriceFilter,
  type SortOption,
} from '../utils/filterCourses'
import type { Level } from '../types/course'

const SORT_VALUES: SortOption[] = ['popular', 'rating', 'newest', 'price-asc', 'price-desc']
const PRICE_VALUES: PriceFilter[] = ['all', 'free', 'paid']

export function useCourseFilters() {
  const [params, setParams] = useSearchParams()

  const filters: CourseFilters = useMemo(() => {
    const sort = params.get('sort')
    const price = params.get('price')
    const rating = Number(params.get('rating') ?? '0')

    return {
      search: params.get('search') ?? '',
      categories: params.getAll('category'),
      levels: params.getAll('level') as Level[],
      minRating: Number.isFinite(rating) ? rating : 0,
      price: PRICE_VALUES.includes(price as PriceFilter)
        ? (price as PriceFilter)
        : 'all',
      sort: SORT_VALUES.includes(sort as SortOption)
        ? (sort as SortOption)
        : 'popular',
    }
  }, [params])

  const update = useCallback(
    (next: Partial<CourseFilters>) => {
      const merged = { ...filters, ...next }
      const search = new URLSearchParams()

      if (merged.search) search.set('search', merged.search)
      merged.categories.forEach((c) => search.append('category', c))
      merged.levels.forEach((l) => search.append('level', l))
      if (merged.minRating > 0) search.set('rating', String(merged.minRating))
      if (merged.price !== 'all') search.set('price', merged.price)
      if (merged.sort !== 'popular') search.set('sort', merged.sort)

      setParams(search, { replace: true })
    },
    [filters, setParams],
  )

  const clear = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams])

  const activeCount = useMemo(() => {
    let n = 0
    if (filters.search) n++
    n += filters.categories.length
    n += filters.levels.length
    if (filters.minRating > 0) n++
    if (filters.price !== 'all') n++
    return n
  }, [filters])

  return { filters, update, clear, activeCount, defaults: DEFAULT_FILTERS }
}