import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

import { ArchitectureContest, EventNoobProHacker, NoobProHacker } from '@/types/content'

type Props = NoobProHackerProps | EventNoobProHackerProps | ArchitectureContestProps

type NoobProHackerProps = {
  type: '눕프로해커'
  content: NoobProHacker
  fetchedContent: NoobProHacker[]
  setContentByFetchData: (noobprohacker: NoobProHacker) => void
}

type EventNoobProHackerProps = {
  type: '이벤트 눕프핵'
  content: EventNoobProHacker
  fetchedContent: EventNoobProHacker[]
  setContentByFetchData: (eventNoobProHacker: EventNoobProHacker) => void
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

    case '이벤트 눕프핵':
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
