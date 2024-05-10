import { Fragment } from 'react'

import { InputForm } from '@/components/molecules/Form'
import Button from '@/components/atoms/Button'

import { ContentInfo, PlacementTest } from '@/types/content'

type Props = DefaultContentProps | PlacementTestProps

type DefaultContentProps = {
  type: '기본'
  moveToNextPage: () => void
  contentInfo: ContentInfo
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type PlacementTestProps = {
  type: '배치고사'
  moveToNextPage: () => void
  contentInfo: Omit<PlacementTest, 'participants'>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ContentSetting({ type, contentInfo, handleInputChange, moveToNextPage }: Props) {
  return (
    <Fragment>
      <div className="mt-12 flex gap-8 ">
        <InputForm
          label={type === '배치고사' ? '시즌' : '회차'}
          name={type === '배치고사' ? 'season' : 'episode'}
          type="number"
          value={type === '배치고사' ? contentInfo.season : contentInfo.episode}
          handleInputChange={handleInputChange}
        />
        {type !== '배치고사' && (
          <InputForm
            label="주제(컨텐츠 명)"
            name="subject"
            type="text"
            value={contentInfo.subject}
            handleInputChange={handleInputChange}
          />
        )}
        <InputForm
          label="날짜"
          name="date"
          type="date"
          value={contentInfo.date.split('T')[0]}
          handleInputChange={handleInputChange}
        />
        <InputForm
          label="유튜브 링크"
          name="youtube_url"
          type="text"
          value={contentInfo.youtube_url}
          handleInputChange={handleInputChange}
        />
        <Button text="제출" handleButtonClick={() => moveToNextPage()} />
      </div>
    </Fragment>
  )
}
