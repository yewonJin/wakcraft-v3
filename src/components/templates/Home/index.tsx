import HomeCarousel from '@/components/organisms/HomeCarousel'
import HomeCalendar from '@/components/organisms/HomeCalendar'
import HomeDescription from '@/components/organisms/HomeDescription'
import HomeRecentWinner from '@/components/organisms/HomeRecentWinner'
import HomeSweepLine from '@/components/organisms/HomeSweepLine'

import { getAllArchitects } from '@/apis/server/architect'
import {
  getAllArchitectureNoobProHackers,
  getAllArchitectureNoobprohackersWithSweepLine,
} from '@/apis/server/architectureNoobProHacker'
import { getAllNoobProHackers, getAllNoobprohackersWithSweepLine } from '@/apis/server/noobprohacker'
import { getAllSchedules } from '@/apis/server/schedule'

import { convertToSweepLine } from '@/utils/noobprohacker'
import { getNumberOfArchitectsByTier } from '@/utils/architect'

export default async function Home() {
  const noobprohackers = (await getAllNoobProHackers()).sort((a, b) => b.contentInfo.episode - a.contentInfo.episode)
  const architectureNoobProHackers = (await getAllArchitectureNoobProHackers()).sort(
    (a, b) => b.contentInfo.episode - a.contentInfo.episode,
  )

  const noobprohackersWithSweepLine = (await getAllNoobprohackersWithSweepLine()).sort(
    (a, b) => a.contentInfo.episode - b.contentInfo.episode,
  )

  const architectureNoobProHackersWithSweepLine = (await getAllArchitectureNoobprohackersWithSweepLine()).sort(
    (a, b) => a.contentInfo.episode - b.contentInfo.episode,
  )

  const architects = await getAllArchitects()
  const schedules = await getAllSchedules()
  const contents = [...noobprohackers, ...architectureNoobProHackers].sort(
    (a, b) => new Date(b.contentInfo.date).getTime() - new Date(a.contentInfo.date).getTime(),
  )

  return (
    <main className="flex flex-col gap-24 md:gap-40 px-4 xl:px-0 pb-20 max-w-[1200px] mx-auto">
      <title>왁크래프트 | 홈</title>
      <HomeCarousel noobprohacker={JSON.parse(JSON.stringify(contents[0]))} />
      <HomeCalendar schedules={JSON.parse(JSON.stringify(schedules))} />
      <HomeDescription numberOfArchitectsByTier={JSON.parse(JSON.stringify(getNumberOfArchitectsByTier(architects)))} />
      <HomeRecentWinner noobprohackers={JSON.parse(JSON.stringify(contents.slice(0, 3)))} />
      <HomeSweepLine
        sweepLines={convertToSweepLine([...noobprohackersWithSweepLine, ...architectureNoobProHackersWithSweepLine])}
      />
    </main>
  )
}
