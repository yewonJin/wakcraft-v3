'use client'

import GameWorldCupSetting from '@/components/organisms/Game/GameWorldCupSetting'
import GameWorldCupInGame from '@/components/organisms/Game/GameWorldCupInGame'
import GameWorldCupWinner from '@/components/organisms/Game/GameWorldCupWinner'

import useWorldCupSetting from '@/hooks/useWorldCupSetting'

export default function GameWorldCup() {
  const { page, roundOfNumber, setRoundOfNumber, startGame, endGame } = useWorldCupSetting()

  if (page === 0) {
    return (
      <GameWorldCupSetting roundOfNumber={roundOfNumber} setRoundOfNumber={setRoundOfNumber} startGame={startGame} />
    )
  } else if (page === 1) {
    return <GameWorldCupInGame roundOfNumber={roundOfNumber} endGame={endGame} />
  } else if (page === 2) {
    return <GameWorldCupWinner roundOfNumber={roundOfNumber} />
  }
}
