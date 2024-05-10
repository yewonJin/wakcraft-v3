import { Architect } from '@/types/architect'
import { EventNoobProHacker } from '@/types/content'

type ArchitectsInfo = {
  minecraft_id: string
  portfolio: Architect['portfolio']['eventNoobProHacker'][0]
}

export const convertToArchitectPortfolio = (eventNoobProHacker: EventNoobProHacker) => {
  const { contentInfo, lineInfo } = eventNoobProHacker

  const architectsInfo: ArchitectsInfo[] = []

  lineInfo.forEach((line, index) => {
    line.line_details.forEach((item) => {
      const portfolioInfo: Architect['portfolio']['eventNoobProHacker'][0] = {
        contentName: contentInfo.subject,
        episode: contentInfo.episode,
        subject: lineInfo[index].subject,
        line: item.line,
        image_url: item.image_url,
        youtube_url: item.youtube_url,
        ranking: item.ranking,
        date: new Date(contentInfo.date),
      }

      item.minecraft_id.forEach((id) => {
        architectsInfo.push({
          minecraft_id: id,
          portfolio: portfolioInfo,
        })
      })
    })
  })

  return architectsInfo
}
