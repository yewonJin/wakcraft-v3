'use client'

import ArchitectCategory from '@/components/organisms/Architect/ArchitectCategory'
import ArchitectList from '@/components/organisms/Architect/ArchitectList'

import useFilteringByTier from '@/hooks/useFilteringByTier'
import useSearch from '@/hooks/useSearch'
import useSortArchitect from '@/hooks/useSortArchitect'
import { Architect } from '@/types/architect'

type Props = {
  architects: Architect[]
}

export default function ArchitectHome({ architects }: Props) {
  const { queryString, handleCategoryClick, filteredArchitectsByTier } = useFilteringByTier()
  const { sortBy, isDescending, handleSortClick, sortedArchitects } = useSortArchitect(architects)
  const { input, handleInputChange, highlightedArchitects } = useSearch(filteredArchitectsByTier(sortedArchitects))

  return (
    <main className="flex max-w-[1200px] flex-col mx-auto">
      <ArchitectCategory
        input={input}
        handleCategoryClick={handleCategoryClick}
        isDescending={isDescending}
        sortBy={sortBy}
        handleSortClick={handleSortClick}
        handleInputChange={handleInputChange}
        curCategory={queryString || ''}
      />
      <ArchitectList architects={highlightedArchitects} input={input} />
    </main>
  )
}
