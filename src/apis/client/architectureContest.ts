import { ArchitectureContest } from '@/types/content'

export const addArchitectureContest = async (body: ArchitectureContest) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/architecture_contest`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  return await response.json()
}

export const editArchitectureContest = async (body: ArchitectureContest) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/architecture_contest`, {
    method: 'PUT',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: myHeaders,
  })

  return await response.json()
}
