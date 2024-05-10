import { NoobProHacker } from '@/types/content'

export const getLastestNoobProHacker = async () => {
  const result = await (await fetch(`/api/noobprohacker`)).json()

  return result
}

export const getNoobProHackersWithoutURL = async () => {
  const result = await (await fetch(`/api/noobprohacker?withoutURL=${true}`)).json()

  return result
}

export const addNoobProHacker = async (body: NoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/noobprohacker`, {
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

export const editNoobProHacker = async (body: NoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/noobprohacker`, {
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
