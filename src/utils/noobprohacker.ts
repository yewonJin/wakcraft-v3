import { Architect } from '@/types/architect'
import { NoobProHacker, SweepLine } from '@/types/content'

export const getHackerWinnerLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.lineInfo.filter((line) => line.line_details[2].ranking === 1)[0]
}

export const getProWinnerLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.lineInfo.filter((line) => line.line_details[1].ranking === 1)[0]
}

export const getWinnerLine = (noobprohacker: NoobProHacker) => {
  const lineIndex = noobprohacker.lineInfo.findIndex((line) => line.line_ranking === 1)
  return lineIndex === -1 ? 0 : lineIndex
}

/** 눕프핵 정보를 싹슬이 라인 정보로 변환하는 함수 */
export const convertToSweepLine = (arr: any[]): SweepLine[] => {
  const sweepLineArr: SweepLine[] = []

  arr
    .sort((a, b) => new Date(a.contentInfo.date).getTime() - new Date(b.contentInfo.date).getTime())
    .forEach((item) => {
      const winnerLine = item.lineInfo as NoobProHacker['lineInfo'][0]

      sweepLineArr.push({
        episode: item.contentInfo.episode,
        line_details: winnerLine.line_details,
        line_ranking: winnerLine.line_ranking,
        subject: winnerLine.subject,
      })
    })

  return sweepLineArr
}

type ArchitectsInfo = {
  minecraft_id: string
  portfolio: Architect['portfolio']['noobprohacker'][0]
}

/** 눕프로해커 정보를 건축가 포트폴리오로 변환하는 함수 */
export const convertToNoobProHackerPortfolio = (noobprohacker: NoobProHacker) => {
  const { contentInfo, lineInfo } = noobprohacker

  const architectsInfo: ArchitectsInfo[] = []

  lineInfo.forEach((line) => {
    for (const key in line.line_details) {
      const portfolioInfo: Architect['portfolio']['noobprohacker'][0] = {
        episode: contentInfo.episode,
        subject: line.subject,
        line: line.line_details[key].line,
        image_url: line.line_details[key].image_url,
        youtube_url: line.line_details[key].youtube_url,
        ranking: line.line_details[key].ranking,
        date: new Date(contentInfo.date),
      }

      architectsInfo.push({
        minecraft_id: line.line_details[key].minecraft_id,
        portfolio: portfolioInfo,
      })
    }
  })

  return architectsInfo
}
