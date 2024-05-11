import { Schedule } from '@/types/schedule'

export const getAllSchedules = async () => {
  const result = await (await fetch('/api/schedule')).json()

  return result
}

export const addSchedule = async (body: Schedule) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/schedule`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  if (!response.ok) {
    const { serviceCode } = await response.json()

    throw serviceCode
  }

  return await response.json()
}

export const editSchedule = async (body: Schedule) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/schedule`, {
    method: 'PUT',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  if (!response.ok) {
    const { serviceCode } = await response.json()

    throw serviceCode
  }

  return await response.json()
}
