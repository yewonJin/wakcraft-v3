import { Get, Post, Put } from '@/apis/shared/api'
import { NoobProHacker } from '@/types/content'

export const getLastestNoobProHacker = async () => {
  const { data } = await Get<NoobProHacker>('noobprohacker?lastestOne=true')

  return data.data
}

export const getNoobProHackersWithoutURL = async () => {
  const { data } = await Get<NoobProHacker[]>(`noobprohacker?withoutYoutubeLink=true`)

  return data.data
}

export const addNoobProHacker = async (body: NoobProHacker) => {
  const { data } = await Post('noobprohacker', body)

  return data
}

export const editNoobProHacker = async (body: NoobProHacker) => {
  const { data } = await Put('noobprohacker', body)

  return data
}
