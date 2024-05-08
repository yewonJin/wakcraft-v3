import { useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

import { getArchitectures, increaseCorrectAnswerCount } from '@/apis/client/whoseWork'
import { Question, WhoseWork } from '@/types/whoseWork'
import { shuffle } from '@/utils/shared'
import { useWhoseWorkStore } from '@/store/whoseWork'

const useWhoseWorkSetting = () => {
  const [page, setPage] = useState(0)

  const { difficulty, numberOfArchitecture, correctCount, index, setIndex, setCorrectCount } = useWhoseWorkStore()

  const [questions, setQuestions] = useState<Question[]>([])
  const [whoseWork, setWhoseWork] = useState<WhoseWork>()

  const { refetch } = useQuery({
    queryKey: ['getWhoseWorkArchitectures'],
    queryFn: () => getArchitectures(difficulty),
    enabled: false,
  })

  const startGame = async () => {
    if (difficulty === null || numberOfArchitecture === null) return

    toast.loading('게임을 만드는 중입니다...', { id: 'whoseWork_loading' })

    await refetch().then((res) => {
      setQuestions(shuffle(res.data).slice(0, numberOfArchitecture))
      toast.remove('whoseWork_loading')
    })

    setCorrectCount(0)
    setIndex(0)
    setPage((prev) => prev + 1)
  }

  const endGame = async () => {
    await increaseCorrectAnswerCount(difficulty, numberOfArchitecture, correctCount).then((res) => setWhoseWork(res))

    setPage(2)
  }

  const restartGame = async () => {
    setIndex(0)
    setCorrectCount(0)
    setPage(0)

    await startGame()
  }

  return {
    page,
    questions,
    startGame,
    endGame,
    restartGame,
    whoseWork,
  }
}

export default useWhoseWorkSetting
