import { NoobProHacker, SweepLine } from '@/types/content'

export const getHackerWinnerLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.lineInfo.filter((line) => line.line_details[2].ranking === 1)[0]
}

export const getProWinnerLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.lineInfo.filter((line) => line.line_details[1].ranking === 1)[0]
}

export const getWinnerLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.lineInfo.findIndex((line) => line.line_ranking === 1)
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
