import { Get, Post, Put } from '@/apis/shared/api'
import { EventNoobProHacker } from '@/types/content'

export const getAllEventNoobProHackers = async () => {
  const { data } = await Get<EventNoobProHacker[]>(`event_noobprohacker`)

  return data.data
}

export const addEventNoobProHacker = async (body: EventNoobProHacker) => {
  const { data } = await Post('event_noobprohacker', body)

  return data
}

export const editEventNoobProHacker = async (body: EventNoobProHacker) => {
  const { data } = await Put('event_noobprohacker', body)

  return data
}
