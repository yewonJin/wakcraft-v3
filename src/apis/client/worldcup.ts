export const getWorldCups = async () => {
  const result = await (await fetch(`/api/game/worldcup`)).json()
  return result
}

export const setWinner = async (subject: string) => {
  const result = await (
    await fetch(`/api/game/worldcup?winner=${subject}`, {
      method: 'PATCH',
    })
  ).json()

  return result
}
