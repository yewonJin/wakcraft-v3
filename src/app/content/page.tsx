import ContentHome from '@/components/templates/ContentHome'
import CardViewItem from '@/components/molecules/CardViewItem'

import {
  getAllArchitectureContest,
  getAllEventNoobProHacker,
  getAllGuessTimes,
  getAllMatchYourTier,
  getAllPlacementTest,
} from '@/apis/server/content'

export default async function Page() {
  const [eventNoobProHackers, matchYourTiers, architectureContests, placementTests, guessTimes] = await Promise.all([
    getAllEventNoobProHacker(),
    getAllMatchYourTier(),
    getAllArchitectureContest(),
    getAllPlacementTest(),
    getAllGuessTimes(),
  ])

  const cardList: JSX.Element[] = []

  eventNoobProHackers.forEach((eventNoobProHacker) => {
    cardList.push(
      <CardViewItem
        key={eventNoobProHacker.contentInfo.date}
        type="이벤트 눕프핵"
        episode={eventNoobProHacker.contentInfo.episode}
        subject={eventNoobProHacker.contentInfo.contentName}
        date={new Date(eventNoobProHacker.contentInfo.date)}
        youtube_url={eventNoobProHacker.contentInfo.youtube_url}
        linesSubject={eventNoobProHacker.lineInfo.map((line) => line.subject)}
      />,
    )
  })

  matchYourTiers.forEach((matchYourTier) => {
    cardList.push(
      <CardViewItem
        key={matchYourTier.contentInfo.date}
        type="티어 맞추기"
        episode={matchYourTier.contentInfo.episode}
        subject={matchYourTier.contentInfo.contentName}
        date={new Date(matchYourTier.contentInfo.date)}
        youtube_url={matchYourTier.contentInfo.youtube_url}
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

  guessTimes.forEach((guessTime) => {
    cardList.push(
      <CardViewItem
        key={guessTime.contentInfo.date}
        type="시간 맞추기"
        episode={guessTime.contentInfo.episode}
        subject={guessTime.contentInfo.contentName}
        date={new Date(guessTime.contentInfo.date)}
        youtube_url={guessTime.contentInfo.youtube_url}
      />,
    )
  })

  return (
    <ContentHome
      cardList={cardList.sort((a, b) => new Date(b.key as string).getTime() - new Date(a.key as string).getTime())}
    />
  )
}
