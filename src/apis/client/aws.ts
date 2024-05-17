import { Get } from '@/apis/shared/api'
import { Content } from '@/utils/aws'

export const getImagesName = async (content: Content, episode: number) => {
  const { data } = await Get<string[]>(`aws?content=${content}&episode=${episode}`)

  return data.data
}
