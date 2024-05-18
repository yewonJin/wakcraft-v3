import { useQueryString } from '@/hooks/useQueryString'
import { Architect } from '@/types/architect'

const useFilteringByTier = () => {
  const { queryString, setQueryString, resetQueryString } = useQueryString('tier')

  const handleCategoryClick = (clickedTier: string) => {
    if (clickedTier === queryString) {
      return resetQueryString()
    }

    setQueryString(clickedTier)
  }

  const filteredArchitectsByTier = (arr: Architect[]) => {
    return arr.filter((architect) => {
      if (queryString === null) {
        return true
      }

      return architect.curTier === queryString
    })
  }

  return { queryString, handleCategoryClick, filteredArchitectsByTier }
}

export default useFilteringByTier
