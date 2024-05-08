import { useEffect, useRef, useState } from 'react'

import { NoobProHacker } from '@/types/content'
import { getWinnerLine } from '@/utils/noobprohacker'

export const useHomeCarousel = (noobprohacker: NoobProHacker) => {
  const [curLine, setCurLine] = useState(getWinnerLine(noobprohacker))

  const intervalRef = useRef<any>(null)

  const autoScroll = () => {
    setCurLine((prev) => {
      if (prev === 4) {
        return 0
      }
      return prev + 1
    })
  }

  const initInterval = () => {
    if (window.innerWidth < 800) return

    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const startInterval = () => {
    if (window.innerWidth < 800) return

    intervalRef.current = setInterval(autoScroll, 4000)
  }

  useEffect(() => {
    startInterval()
  }, [])

  const handleCategoryClick = (index: number) => {
    setCurLine(index)
    initInterval()
    startInterval()
  }

  return { curLine, initInterval, startInterval, handleCategoryClick }
}
