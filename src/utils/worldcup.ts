import { Architect } from '@/types/architect'
import { Worldcup } from '@/types/worldcup'

export const getWinRate = (item: Worldcup) => {
  const { numberOfWin, numberOfParticipation } = item

  return numberOfParticipation === 0 ? '??%' : ((numberOfWin * 100) / numberOfParticipation).toFixed(2) + '%'
}

export const getRankingTableData = (data: Worldcup[]) => {
  const sortedByWinRate = data.sort(
    (a, b) =>
      Math.floor((b.numberOfWin / b.numberOfParticipation) * 10000) -
      Math.floor((a.numberOfWin / a.numberOfParticipation) * 10000),
  )

  const moveNoParticipationToEnd = sortedByWinRate
    .filter((item) => item.numberOfParticipation !== 0)
    .concat(data.filter((item) => item.numberOfParticipation === 0))

  return moveNoParticipationToEnd
}

export const createWorldcup = (architect: {
  minecraft_id: string
  portfolio: Architect['portfolio']['noobprohacker'][0]
}) => {
  const worldCup: Worldcup = {
    game: 'HackerWorldCup',
    workInfo: {
      minecraft_id: architect.minecraft_id,
      episode: architect.portfolio.episode,
      subject: architect.portfolio.subject,
      image_url: architect.portfolio.image_url,
      youtube_url: architect.portfolio.youtube_url,
    },
    numberOfParticipation: 0,
    numberOfWin: 0,
  }

  return worldCup
}
