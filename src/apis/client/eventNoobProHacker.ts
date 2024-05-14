import { EventNoobProHacker } from '@/types/content'

export const getAllEventNoobProHackers = async (): Promise<EventNoobProHacker[]> => {
  const response = await (await fetch(`/api/event_noobprohacker`)).json()

  return response
}

export const addEventNoobProHacker = async (body: EventNoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/event_noobprohacker`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  return await response.json()
}

export const editEventNoobProHacker = async (body: EventNoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/event_noobprohacker`, {
    method: 'PUT',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  return await response.json()
}
