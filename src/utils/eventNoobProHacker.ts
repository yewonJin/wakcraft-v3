import { Architect } from '@/types/architect'
import { EventNoobProHacker } from '@/types/content'

type ArchitectsInfo = {
  minecraft_id: string
  portfolio: Architect['portfolio']['eventNoobProHacker'][0]
}

export const convertToArchitectPortfolio = (eventNoobProHacker: EventNoobProHacker) => {
  const { contentInfo, type } = eventNoobProHacker

  const architectsInfo: ArchitectsInfo[] = []

  if (type === 'line') {
    const { lineInfo } = eventNoobProHacker

    lineInfo.forEach((line, index) => {
      line.line_details.forEach((item) => {
        const portfolioInfo: Architect['portfolio']['eventNoobProHacker'][0] = {
          type: 'line',
          contentName: contentInfo.subject,
          episode: contentInfo.episode,
          subject: lineInfo[index].subject,
          line: item.line,
          image_url: item.image_url,
          youtube_url: item.youtube_url,
          ranking: item.ranking,
          date: new Date(contentInfo.date),
          constructionTime: item.constructionTime,
        }

        item.minecraft_id.forEach((id) => {
          architectsInfo.push({
            minecraft_id: id,
            portfolio: portfolioInfo,
          })
        })
      })
    })
  } else {
    const { participants } = eventNoobProHacker

    participants.forEach((participant, index) => {
      const portfolioInfo: Architect['portfolio']['eventNoobProHacker'][0] = {
        type: 'grid',
        contentName: contentInfo.subject,
        episode: contentInfo.episode,
        subject: participant.topText,
        line: '',
        image_url: participant.image_url,
        youtube_url: participant.youtube_url,
        ranking: participant.ranking,
        date: new Date(contentInfo.date),
        constructionTime: participant.constructionTime,
      }

      architectsInfo.push({
        minecraft_id: participant.minecraft_id,
        portfolio: portfolioInfo,
      })
    })
  }

  return architectsInfo
}
