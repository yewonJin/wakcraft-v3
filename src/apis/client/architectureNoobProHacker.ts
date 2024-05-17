import { Get, Post, Put } from '@/apis/shared/api'
import { NoobProHacker } from '@/types/content'

export const getLastestArchitectureNoobProHacker = async () => {
  const { data } = await Get<NoobProHacker>(`architecture_noobprohacker?lastestOne=true`)

  return data.data
}

export const getArchitectureNoobProHackersWithoutURL = async () => {
  const { data } = await Get<NoobProHacker[]>(`architecture_noobprohacker?withoutYoutubeLink=true`)

  return data.data
}

export const addArchitectureNoobProHacker = async (body: NoobProHacker) => {
  const { data } = await Post('architecture_noobprohacker', body)

  return data
}

export const editArchitectureNoobProHacker = async (body: NoobProHacker) => {
  const { data } = await Put('architecture_noobprohacker', body)

  return data
}
