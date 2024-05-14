import { NoobProHacker } from '@/types/content'

export const getArchitectureNoobProHackersWithoutURL = async () => {
  const result = await (await fetch(`/api/architecture_noobprohacker?withoutURL=${true}`)).json()

  return result
}

export const addArchitectureNoobProHacker = async (body: NoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/architecture_noobprohacker`, {
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

export const editArchitectureNoobProHacker = async (body: NoobProHacker) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/architecture_noobprohacker`, {
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
