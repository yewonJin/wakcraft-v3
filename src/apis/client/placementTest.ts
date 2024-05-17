import { Get, Post } from '@/apis/shared/api'
import { PlacementTest } from '@/types/content'

export const getCurSeason = async () => {
  const { data } = await Get<number>('placement_test?curSeason=true')

  return data.data
}

export const addPlacementTest = async (body: PlacementTest) => {
  const { data } = await Post('placement_test', body)

  return data
}
