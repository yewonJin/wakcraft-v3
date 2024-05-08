import { DetailedTier } from '@/types/architect'

export const getAllArchitects = async () => {
  const result = await (await fetch(`/api/architect`)).json()

  return result
}

export const getArchitectByMinecraftId = async (id: string) => {
  const result = await (await fetch(`/api/architect?minecraftId=${id}`)).json()

  return result
}

export const addArchitect = async (body: AddArchitectBody) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  console.log(body)

  const response = await fetch(`/api/architect`, {
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

export type AddArchitectBody = {
  minecraft_id: string
  wakzoo_id: string
}

export const updateArchitect = async (body: UpdateArchitectBody) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/architect`, {
    method: 'PATCH',
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

export type UpdateArchitectBody = {
  beforeId: string
  afterId: string
  wakzoo_id: string
  curTier: DetailedTier
}
