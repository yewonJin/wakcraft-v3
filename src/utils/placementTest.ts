import { Architect } from '@/types/architect'
import { PlacementTest } from '@/types/content'

export const convertToArchitectPortfolio = (placementTest: PlacementTest) => {
  type ArchitectsInfo = {
    minecraft_id: string
    portfolio: Architect['portfolio']['placementTest'][0]
  }

  const architectsInfo: ArchitectsInfo[] = []

  placementTest.participants.forEach((participant) => {
    architectsInfo.push({
      minecraft_id: participant.minecraft_id,
      portfolio: {
        ranking: participant.ranking,
        season: placementTest.season,
        image_url: participant.image_url,
        placement_result: participant.placement_result,
        date: new Date(placementTest.date),
      },
    })
  })

  return architectsInfo
}
