import { Get, Patch } from '@/apis/shared/api'
import { Worldcup } from '@/types/worldcup'

export const getWorldCups = async () => {
  const { data } = await Get<Worldcup[]>(`game/worldcup`)

  return data.data
}

export const setWinner = async (subject: string) => {
  const { data } = await Patch(`game/worldcup?winner=${subject}`)

  return data
}
