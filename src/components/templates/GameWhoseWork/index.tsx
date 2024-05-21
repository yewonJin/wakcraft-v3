'use client'

import GameWhoseWorkSetting from '@/components/organisms/Game/GameWhoseWorkSetting'
import GameWhoseWorkInGame from '@/components/organisms/Game/GameWhoseWorkInGame'
import GameWhoseWorkScore from '@/components/organisms/Game/GameWhoseWorkScore'

import useWhoseWorkSetting from '@/hooks/useWhoseWorkSetting'
import { Architect } from '@/types/architect'
import { WhoseWork } from '@/types/whoseWork'

type Props = {
  architects: Architect[]
}

export default function GameWhoseWork(props: Props) {
  const { architects } = props

  const { page, startGame, questions, endGame, restartGame, whoseWork } = useWhoseWorkSetting()

  const gameProgression = () => {
    switch (page) {
      case 0:
        return <GameWhoseWorkSetting startGame={startGame} />

      case 1:
        return <GameWhoseWorkInGame architects={architects} questions={questions} endGame={endGame} />

      case 2:
        return <GameWhoseWorkScore whoseWork={whoseWork as WhoseWork} restartGame={restartGame} />
    }
  }

  return <div className="mx-auto max-w-[1200px]">{gameProgression()}</div>
}
