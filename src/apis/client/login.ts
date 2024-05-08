export const login = async (id: string, password: string) => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const body = { id, password }

  const response = await fetch(`/api/auth`, {
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
