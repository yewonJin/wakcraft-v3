import { Architect } from '@/types/architect'
import { ArchitectureContest } from '@/types/content'

type ArchitectsInfo = {
  minecraft_id: string
  portfolio: Architect['portfolio']['architectureContest'][0]
}

export const convertToArchitectPortfolio = (architectureContest: ArchitectureContest) => {
  const { contentInfo, lineInfo } = architectureContest

  const architectsInfo: ArchitectsInfo[] = []

  lineInfo.forEach((line, index) => {
    line.line_details.forEach((item) => {
      const portfolioInfo: Architect['portfolio']['architectureContest'][0] = {
        contentName: '치즐 건콘 - ' + contentInfo.subject,
        episode: contentInfo.episode,
        subject: item.bottomText,
        line: line.line,
        image_url: item.image_url,
        youtube_url: item.youtube_url,
        ranking: item.ranking,
        date: new Date(contentInfo.date),
        constructionTime: item.constructionTime,
      }

      architectsInfo.push({
        minecraft_id: item.minecraft_id,
        portfolio: portfolioInfo,
      })
    })
  })

  return architectsInfo
}
