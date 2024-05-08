import { useState } from 'react'

import { RoundOfNumber } from '@/types/worldcup'

const useWorldCupSetting = () => {
  const [page, setPage] = useState(0)

  const [roundOfNumber, setRoundOfNumber] = useState<RoundOfNumber>(128)

  const startGame = () => {
    setPage(1)
  }

  const endGame = () => {
    setPage(2)
  }

  return { page, roundOfNumber, setRoundOfNumber, startGame, endGame }
}

export default useWorldCupSetting
