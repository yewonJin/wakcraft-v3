import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

import { ArchitectureContest, GridEventNoobProHacker, LineEventNoobProHacker, NoobProHacker } from '@/types/content'

type Props = NoobProHackerProps | LineEventNoobProHackerProps | GridEventNoobProHackerProps | ArchitectureContestProps

type NoobProHackerProps = {
  type: '눕프로해커'
  content: NoobProHacker
  fetchedContent: NoobProHacker[]
  setContentByFetchData: (noobprohacker: NoobProHacker) => void
}

type LineEventNoobProHackerProps = {
  type: '이벤트 눕프핵 - 라인'
  content: LineEventNoobProHacker
  fetchedContent: LineEventNoobProHacker[]
  setContentByFetchData: (eventNoobProHacker: LineEventNoobProHacker) => void
}

type GridEventNoobProHackerProps = {
  type: '이벤트 눕프핵 - 그리드'
  content: GridEventNoobProHacker
  fetchedContent: GridEventNoobProHacker[]
  setContentByFetchData: (eventNoobProHacker: GridEventNoobProHacker) => void
}

type ArchitectureContestProps = {
  type: '건축 콘테스트'
  content: ArchitectureContest
  fetchedContent: ArchitectureContest[]
  setContentByFetchData: (architectureContest: ArchitectureContest) => void
}

export default function SelectEpisode({ type, fetchedContent, setContentByFetchData }: Props) {
  switch (type) {
    case '눕프로해커':
      return (
        <div className="">
          <Typography variants="h1">에피소드 선택</Typography>
          <div className="flex gap-4 mt-4">
            {fetchedContent.map((item) => (
              <Button
                key={item.contentInfo.episode}
                text={item.contentInfo.episode + '화'}
                handleButtonClick={() => setContentByFetchData(item)}
              />
            ))}
          </div>
        </div>
      )

    case '이벤트 눕프핵 - 라인':
      return (
        <div className="">
          <Typography variants="h1">에피소드 선택</Typography>
          <div className="flex gap-4 mt-4">
            {fetchedContent.map((item) => (
              <Button
                key={item.contentInfo.episode}
                text={item.contentInfo.episode + '화'}
                handleButtonClick={() => setContentByFetchData(item)}
              />
            ))}
          </div>
        </div>
      )

    case '이벤트 눕프핵 - 그리드':
      return (
        <div className="">
          <Typography variants="h1">에피소드 선택</Typography>
          <div className="flex gap-4 mt-4">
            {fetchedContent.map((item) => (
              <Button
                key={item.contentInfo.episode}
                text={item.contentInfo.episode + '화'}
                handleButtonClick={() => setContentByFetchData(item)}
              />
            ))}
          </div>
        </div>
      )

    case '건축 콘테스트':
      return (
        <div className="">
          <Typography variants="h1">에피소드 선택</Typography>
          <div className="flex gap-4 mt-4">
            {fetchedContent.map((item) => (
              <Button
                key={item.contentInfo.episode}
                text={item.contentInfo.episode + '화'}
                handleButtonClick={() => setContentByFetchData(item)}
              />
            ))}
          </div>
        </div>
      )
  }
}
