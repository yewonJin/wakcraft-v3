import { PlacementTest } from '@/types/content'

export const getCurSeason = async () => {
  const result = await (await fetch(`/api/placement_test?curSeason=true`)).json()

  return result
}

export const addPlacementTest = async (body: PlacementTest) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const response = await fetch(`/api/placement_test`, {
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
