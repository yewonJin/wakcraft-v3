import Schedule from '@/models/schedule'
import connectMongo from '@/utils/connectMongo'

export const getAllSchedules = async () => {
  'use server'
  connectMongo()

  const result = await Schedule.find({})

  return result
}
