import { useState, MouseEvent, useMemo } from 'react'

import { SortBy, useArchitectStore } from '@/store/architect'
import { Architect } from '@/types/architect'
import { All_TIER_LIST } from '@/constants/architect'

const useSortArchitect = (architects: Architect[]) => {
  const { sortBy, setSortBy } = useArchitectStore()
  const [isDescending, setIsDescending] = useState(true)

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset['value'] as SortBy

    if (sortBy === value) {
      setIsDescending((prev) => !prev)
      return
    }

    setIsDescending(true)
    setSortBy(value)
  }

  const sortedArchitects = useMemo(() => {
    if (sortBy === 'tier') {
      const result = architects.sort((a, b) => {
        if (a.curTier === b.curTier) {
          return a['minecraft_id'].localeCompare(b['minecraft_id'])
        }

        return isDescending
          ? All_TIER_LIST.indexOf(a.curTier) - All_TIER_LIST.indexOf(b.curTier)
          : All_TIER_LIST.indexOf(b.curTier) - All_TIER_LIST.indexOf(a.curTier)
      })

      return result
    }

    const result = architects.sort((a, b) => {
      if (a.noobprohackerInfo[sortBy] === b.noobprohackerInfo[sortBy]) {
        return a['minecraft_id'].localeCompare(b['minecraft_id'])
      }

      return isDescending
        ? b.noobprohackerInfo[sortBy] - a.noobprohackerInfo[sortBy]
        : a.noobprohackerInfo[sortBy] - b.noobprohackerInfo[sortBy]
    })

    return result
  }, [sortBy, isDescending])

  return { sortBy, isDescending, handleSortClick, sortedArchitects }
}

export default useSortArchitect
