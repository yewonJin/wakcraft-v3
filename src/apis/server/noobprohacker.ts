import { revalidatePath } from 'next/cache'

import NoobProHacker from '@/models/noobprohacker'
import connectMongo from '@/utils/connectMongo'

export const getAllNoobProHackers = async () => {
  'use server'
  connectMongo()

  const result = await NoobProHacker.findAll()

  return result
}

export const getAllNoobprohackersWithSweepLine = async () => {
  'use server'
  connectMongo()

  const result = await NoobProHacker.findAllWithSweepLine()

  return result
}

export const getNoobProHacker = async (episode: number) => {
  'use server'
  connectMongo()

  const result = await NoobProHacker.findByEpisode(episode)

  return result
}

export const revalidateNoobProHackers = async () => {
  'use server'

  revalidatePath('/noobprohacker', 'page')
}
