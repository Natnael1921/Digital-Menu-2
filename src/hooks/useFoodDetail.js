import { useQuery } from '@tanstack/react-query'
import { fetchFoodById } from '../api/menuApi'

/**
 * Fetch a single food item – only runs when an id is provided.
 */
export const useFoodDetail = (id) => {
  return useQuery({
    queryKey: ['food', id],
    queryFn: () => fetchFoodById(id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
  })
}
