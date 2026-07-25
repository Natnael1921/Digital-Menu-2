import { useQuery } from '@tanstack/react-query'
import { fetchMenu } from '../api/menuApi'

/**
 * Single query that returns everything: restaurant, categories, categorisedFoods.
 * staleTime is set globally in main.jsx to 5 minutes.
 */
export const useMenu = () => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  })
}
