import { Get, Post, Put } from '@/apis/shared/api'
import { ArchitectureContest } from '@/types/content'

export const getLastestArchitectureContest = async () => {
  const { data } = await Get<ArchitectureContest>(`architecture_contest?lastestOne=true`)

  return data.data
}

export const getAllArchitectureContests = async () => {
  const { data } = await Get<ArchitectureContest[]>('architecture_contest')

  return data.data
}

export const addArchitectureContest = async (body: ArchitectureContest) => {
  const { data } = await Post('architecture_contest', body)

  return data
}

export const editArchitectureContest = async (body: ArchitectureContest) => {
  const { data } = await Put('architecture_contest', body)

  return data
}
