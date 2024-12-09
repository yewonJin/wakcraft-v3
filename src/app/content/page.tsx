import ContentHome from '@/components/templates/ContentHome'
import CardViewItem from '@/components/molecules/CardViewItem'

import { getAllArchitectureContest, getAllEventNoobProHacker, getAllPlacementTest } from '@/apis/server/content'

export default async function Page() {
  const [eventNoobProHackers, architectureContests, placementTests] = await Promise.all([
    getAllEventNoobProHacker(),
    getAllArchitectureContest(),
    getAllPlacementTest(),
  ])

  const cardList: JSX.Element[] = []

  eventNoobProHackers.forEach((eventNoobProHacker) => {
    cardList.push(
      <CardViewItem
        key={eventNoobProHacker.contentInfo.date}
        type="이벤트 눕프핵"
        episode={eventNoobProHacker.contentInfo.episode}
        subject={eventNoobProHacker.contentInfo.subject}
        date={new Date(eventNoobProHacker.contentInfo.date)}
        youtube_url={eventNoobProHacker.contentInfo.youtube_url}
        linesSubject={eventNoobProHacker.type === 'line' ? eventNoobProHacker.lineInfo.map((line) => line.subject) : []}
        isContributedContent={eventNoobProHacker.contentInfo.isContributedContent}
      />,
    )
  })

  architectureContests.forEach((architectureContest) => {
    cardList.push(
      <CardViewItem
        key={architectureContest.contentInfo.date}
        type="건축 콘테스트"
        episode={architectureContest.contentInfo.episode}
        subject={architectureContest.contentInfo.subject}
        date={new Date(architectureContest.contentInfo.date)}
        youtube_url={architectureContest.contentInfo.youtube_url}
        isContributedContent={architectureContest.contentInfo.isContributedContent}
      />,
    )
  })

  placementTests.forEach((placementTest) => {
    cardList.push(
      <CardViewItem
        key={placementTest.date}
        type="배치고사"
        episode={placementTest.season}
        subject="배치고사"
        date={new Date(placementTest.date)}
        youtube_url={placementTest.youtube_url}
      />,
    )
  })

  return (
    <ContentHome
      cardList={cardList.sort((a, b) => new Date(b.key as string).getTime() - new Date(a.key as string).getTime())}
    />
  )
}
