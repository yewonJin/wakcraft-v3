import ArchitectureNoobProHacker from '@/models/architectureNoobProHacker'
import connectMongo from '@/utils/connectMongo'

export const getAllArchitectureNoobProHackers = async () => {
  'use server'
  connectMongo()

  const result = await ArchitectureNoobProHacker.findAll()

  return result
}

export const getAllArchitectureNoobprohackersWithSweepLine = async () => {
  'use server'
  connectMongo()

  const result = await ArchitectureNoobProHacker.findAllWithSweepLine()

  return result
}

export const getArchitectureNoobProHacker = async (episode: number) => {
  'use server'
  connectMongo()

  const result = await ArchitectureNoobProHacker.findByEpisode(episode)

  return result
}
