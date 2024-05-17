import { Get, Patch } from '@/apis/shared/api'
import { Difficulty, NumberOfArchitecture, Question } from '@/types/whoseWork'

export const getArchitectures = async (difficulty: Difficulty) => {
  const { data } = await Get<Question[]>(`game/whose_work?difficulty=${difficulty}`)

  return data.data
}

export const increaseCorrectAnswerCount = async (
  difficulty: Difficulty,
  numberOfArchitecture: NumberOfArchitecture,
  correctCount: number,
) => {
  const { data } = await Patch(
    `game/whose_work?difficulty=${difficulty}&numberOfArchitecture=${numberOfArchitecture}&correctCount=${correctCount}`,
  )
  return data
}
