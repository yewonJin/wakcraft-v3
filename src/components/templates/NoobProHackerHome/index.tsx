import CardViewItem from '@/components/molecules/CardViewItem'
import PageTitle from '@/components/organisms/Common/PageTitle'
import { ArchitectureNoobProHacker, NoobProHacker } from '@/types/content'

type Props = {
  noobprohackers: NoobProHacker[]
  architectureNoobProHackers: ArchitectureNoobProHacker[]
}

export default function NoobProHackerHome({ noobprohackers, architectureNoobProHackers }: Props) {
  const cardList: JSX.Element[] = []

  noobprohackers.forEach((noobprohacker) => {
    cardList.push(
      <CardViewItem
        key={noobprohacker.contentInfo.date}
        type="눕프로해커"
        episode={noobprohacker.contentInfo.episode}
        subject={noobprohacker.contentInfo.main_subject}
        date={new Date(noobprohacker.contentInfo.date)}
        youtube_url={noobprohacker.contentInfo.youtube_url}
        linesSubject={noobprohacker.lineInfo.map((line) => line.subject)}
      />,
    )
  })

  architectureNoobProHackers.forEach((architectureNoobProHacker) => {
    cardList.push(
      <CardViewItem
        key={architectureNoobProHacker.contentInfo.date}
        type="건축 눕프핵"
        episode={architectureNoobProHacker.contentInfo.episode}
        subject={architectureNoobProHacker.contentInfo.main_subject}
        date={new Date(architectureNoobProHacker.contentInfo.date)}
        youtube_url={architectureNoobProHacker.contentInfo.youtube_url}
        linesSubject={architectureNoobProHacker.lineInfo.map((line) => line.subject)}
      />,
    )
  })

  return (
    <main className="max-w-[1200px] mx-auto flex flex-col gap-8 px-4 xl:px-0">
      <PageTitle title="눕프로해커" summary="마인크래프트 눕프로해커 컨텐츠를 볼 수 있다." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {cardList.sort((a, b) => new Date(b.key as string).getTime() - new Date(a.key as string).getTime())}
      </div>
    </main>
  )
}
