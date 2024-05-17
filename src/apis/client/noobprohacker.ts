import { Get, Post, Put } from '@/apis/shared/api'
import { NoobProHacker } from '@/types/content'

export const getLastestNoobProHacker = async () => {
  const { data } = await Get<NoobProHacker>('noobprohacker')

  return data.data
}

export const getNoobProHackersWithoutURL = async () => {
  const { data } = await Get<NoobProHacker[]>(`noobprohacker?withoutURL=${true}`)

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
