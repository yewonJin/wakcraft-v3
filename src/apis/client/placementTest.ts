import { Get, Post } from '@/apis/shared/api'
import { PlacementTest } from '@/types/content'

export const getLastestPlacementTest = async () => {
  const { data } = await Get<PlacementTest>('placement_test?lastestOne=true')

  return data.data
}

export const addPlacementTest = async (body: PlacementTest) => {
  const { data } = await Post('placement_test', body)

  return data
}
