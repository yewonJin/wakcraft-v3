import { Content } from '@/utils/aws'

export const getImagesName = async (content: Content, episode: number) => {
  const result = await (await fetch(`/api/aws?content=${content}&episode=${episode}`)).json()

  return result
}
