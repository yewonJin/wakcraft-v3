import { Get, Post, Put } from '@/apis/shared/api'
import { Schedule } from '@/types/schedule'

export const getAllSchedules = async () => {
  const { data } = await Get<Schedule[]>(`schedule`)

  return data.data
}

export const addSchedule = async (body: Schedule) => {
  const { data } = await Post('schedule', body)

  return data
}

export const editSchedule = async (body: Schedule) => {
  const { data } = await Put('schedule', body)

  return data
}
