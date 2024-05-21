import HomeCarousel from '@/components/organisms/Home/HomeCarousel'
import HomeCalendar from '@/components/organisms/Home/HomeCalendar'
import HomeDescription from '@/components/organisms/Home/HomeDescription'
import HomeRecentWinner from '@/components/organisms/Home/HomeRecentWinner'
import HomeSweepLine from '@/components/organisms/Home/HomeSweepLine'

import { getAllArchitects } from '@/apis/server/architect'
import {
  getAllArchitectureNoobProHackers,
  getAllArchitectureNoobprohackersWithSweepLine,
} from '@/apis/server/architectureNoobProHacker'
import { getAllNoobProHackers, getAllNoobprohackersWithSweepLine } from '@/apis/server/noobprohacker'
import { getAllSchedules } from '@/apis/server/schedule'

import { convertToSweepLine } from '@/utils/noobprohacker'
import { getNumberOfArchitectsByTier } from '@/utils/architect'
import { sortByRecentDate } from '@/utils/shared'

export default async function Home() {
  const contents = await Promise.all([getAllNoobProHackers(), getAllArchitectureNoobProHackers()]).then((res) =>
    sortByRecentDate(res.flat()),
  )
  const schedules = await getAllSchedules()
  const architects = await getAllArchitects()
  const sweepLines = await Promise.all([
    getAllNoobprohackersWithSweepLine(),
    getAllArchitectureNoobprohackersWithSweepLine(),
  ]).then((res) => sortByRecentDate(res.flat()).reverse())

  return (
    <main className="flex flex-col gap-24 md:gap-40 px-4 xl:px-0 pb-20 max-w-[1200px] mx-auto">
      <title>왁크래프트 | 홈</title>
      <HomeCarousel noobprohacker={JSON.parse(JSON.stringify(contents[0]))} />
      <HomeCalendar schedules={JSON.parse(JSON.stringify(schedules))} />
      <HomeDescription numberOfArchitectsByTier={JSON.parse(JSON.stringify(getNumberOfArchitectsByTier(architects)))} />
      <HomeRecentWinner noobprohackers={JSON.parse(JSON.stringify(contents.slice(0, 3)))} />
      <HomeSweepLine sweepLines={JSON.parse(JSON.stringify(convertToSweepLine(sweepLines)))} />
    </main>
  )
}
