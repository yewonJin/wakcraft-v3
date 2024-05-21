import { Get } from '@/apis/shared/api'
import { AwsContent } from '@/utils/aws'

export const getImagesName = async (content: AwsContent, episode: number) => {
  const { data } = await Get<string[]>(`aws?content=${content}&episode=${episode}`)

  return data.data
}
