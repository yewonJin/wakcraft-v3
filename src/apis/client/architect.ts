import { Get, Patch, Post } from '@/apis/shared/api'
import { Architect, DetailedTier } from '@/types/architect'

export const getAllArchitects = async () => {
  const { data } = await Get<Architect[]>('architect')

  return data.data
}

export const getArchitectByMinecraftId = async (id: string) => {
  const { data } = await Get<Architect>(`architect?minecraftId=${id}`)

  return data.data
}

export const addArchitect = async (body: AddArchitectBody) => {
  const { data } = await Post('architect', body)

  return data
}

export type AddArchitectBody = {
  minecraft_id: string
  wakzoo_id: string
}

export const updateArchitect = async (body: UpdateArchitectBody) => {
  const { data } = await Patch('architect', body)

  return data
}

export type UpdateArchitectBody = {
  beforeId: string
  afterId: string
  wakzoo_id: string
  curTier: DetailedTier
}
