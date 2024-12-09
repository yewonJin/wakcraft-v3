import ArchitectureContest from '@/models/architectureContest'
import EventNoobProHacker from '@/models/eventNoobProHacker'
import PlacementTest from '@/models/placementTest'
import connectMongo from '@/utils/connectMongo'

export const getAllArchitectureContest = async () => {
  'use server'
  connectMongo()

  const result = await ArchitectureContest.findAll()

  return result
}

export const getArchitectureContest = async (id: number) => {
  'use server'
  connectMongo()

  const result = await ArchitectureContest.findByEpisode(id)

  return result
}

export const getAllEventNoobProHacker = async () => {
  'use server'
  connectMongo()

  const result = await EventNoobProHacker.findAll()

  return result
}

export const getEventNoobProHacker = async (id: number) => {
  'use server'
  connectMongo()

  const result = await EventNoobProHacker.findByEpisode(id)

  return result
}

export const getAllPlacementTest = async () => {
  'use server'
  connectMongo()

  const result = await PlacementTest.findAll()

  return result
}

export const getPlacementTest = async (id: number) => {
  'use server'
  connectMongo()

  const result = await PlacementTest.findBySeason(id)

  return result
}
