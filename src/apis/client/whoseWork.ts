import { Difficulty, NumberOfArchitecture } from '@/types/whoseWork'

export const getArchitectures = async (difficulty: Difficulty) => {
  const result = await (await fetch(`/api/game/whose_work?difficulty=${difficulty}`)).json()

  return result
}

export const increaseCorrectAnswerCount = async (
  difficulty: Difficulty,
  numberOfArchitecture: NumberOfArchitecture,
  correctCount: number,
) => {
  const res = await (
    await fetch(
      `/api/game/whose_work?difficulty=${difficulty}&numberOfArchitecture=${numberOfArchitecture}&correctCount=${correctCount}`,
      {
        method: 'PATCH',
      },
    )
  ).json()

  return res
}
