import { Get } from '@/apis/shared/api'
import { AWSContent } from '@/utils/aws'

export const getImagesName = async (content: AWSContent, episode: number) => {
  const { data } = await Get<string[]>(`aws?content=${content}&episode=${episode}`)

  return data.data
}
