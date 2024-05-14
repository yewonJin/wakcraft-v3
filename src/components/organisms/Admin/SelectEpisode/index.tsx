import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

import { NoobProHacker } from '@/types/content'

type Props = NoobProHackerProps

type NoobProHackerProps = {
  type: '눕프로해커'
  content: NoobProHacker
  fetchedContent: NoobProHacker[]
  setContentByFetchData: (noobprohacker: NoobProHacker) => void
}

export default function SelectEpisode({ fetchedContent, setContentByFetchData }: Props) {
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
