import { Fragment } from 'react'
import Image from 'next/image'

import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'
import { InputForm } from '@/components/molecules/Form'

import { useImageSetting } from '@/hooks/Admin/useImageSetting'
import { ArchitectureContest, EventNoobProHacker, LineInfo } from '@/types/content'
import { renameToWebp } from '@/utils/shared'

type Props = NoobProHackerProps | EventNoobProHackerProps | ArchitectureContestProps

type EventNoobProHackerProps = {
  type: '이벤트 눕프핵'
  moveToNextPage: () => void
  lineInfo: EventNoobProHacker['lineInfo']
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => void
  handleImageSubmit: () => void
  episode: number
}

type NoobProHackerProps = {
  type: '눕프로해커' | '건축 눕프핵'
  moveToNextPage: () => void
  lineInfo: LineInfo
  handleImageSelectClick: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  handleImageSubmit: () => void
  episode: number
}

type ArchitectureContestProps = {
  type: '건축 콘테스트'
  moveToNextPage: () => void
  lineInfo: ArchitectureContest['lineInfo']
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => void
  handleImageSubmit: () => void
  episode: number
}

export default function ImageSetting(props: Props) {
  const { moveToNextPage, lineInfo, handleImageSubmit, episode } = props

  switch (props.type) {
    case '눕프로해커':
      return (
        <NoobProHackerImageSetting
          type="눕프로해커"
          moveToNextPage={moveToNextPage}
          lineInfo={lineInfo as LineInfo}
          handleImageSelectClick={props.handleImageSelectClick}
          handleImageSubmit={handleImageSubmit}
          episode={episode}
        />
      )

    case '건축 눕프핵':
      return (
        <NoobProHackerImageSetting
          type="건축 눕프핵"
          moveToNextPage={moveToNextPage}
          lineInfo={lineInfo as LineInfo}
          handleImageSelectClick={props.handleImageSelectClick}
          handleImageSubmit={handleImageSubmit}
          episode={episode}
        />
      )

    case '이벤트 눕프핵':
      return (
        <EventNoobProHackerImageSetting
          type="이벤트 눕프핵"
          moveToNextPage={moveToNextPage}
          lineInfo={lineInfo as EventNoobProHacker['lineInfo']}
          handleImageChange={props.handleImageChange}
          handleImageSubmit={handleImageSubmit}
          episode={episode}
        />
      )

    case '건축 콘테스트':
      return (
        <ArchitectureContestImageSetting
          type="건축 콘테스트"
          moveToNextPage={moveToNextPage}
          lineInfo={lineInfo as ArchitectureContest['lineInfo']}
          handleImageChange={props.handleImageChange}
          handleImageSubmit={handleImageSubmit}
          episode={episode}
        />
      )

    default:
      break
  }
}

const NoobProHackerImageSetting = ({
  type,
  lineInfo,
  handleImageSelectClick,
  handleImageSubmit,
  episode,
}: NoobProHackerProps) => {
  const { subjects } = useImageSetting(type, episode)

  return (
    <Fragment>
      <div className="mt-16 flex items-center gap-8">
        <Typography variants="h2" color="primary" fontSize="28px" lineHeight="32px">
          이미지 추가
        </Typography>
        <Button text="제출" handleButtonClick={handleImageSubmit} />
      </div>
      <div className="mt-10 grid grid-cols-5 gap-8">
        {new Array(5).fill(0).map((_, lineIndex) => (
          <div className="" key={lineIndex + 1 + '라인'}>
            <Typography variants="h3" color="primary">
              {lineIndex + 1}라인
            </Typography>
            <div className="mt-4 flex gap-2 [&>input]:h-[40px] [&>input]:w-full">
              <select
                onChange={(e) => handleImageSelectClick(e, lineIndex)}
                className="h-[40px] w-[200px] rounded-md border-2 border-background-tertiary bg-background-primary px-2 text-text-secondary outline-none"
              >
                <option value="" selected disabled hidden>
                  이미지 선택
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            {new Array(5).fill(0).map((_, lineDetailIndex) => (
              <div key={lineIndex + lineDetailIndex} className="mt-8 flex flex-col gap-2 text-base text-text-secondary">
                <Typography variants="p" color="tertiary">
                  {LINE_TIER[3][lineDetailIndex]}
                </Typography>
                <div className="relative aspect-video">
                  {lineInfo[lineIndex].line_details[lineDetailIndex]?.image_url && (
                    <Image
                      alt="이미지"
                      fill
                      src={renameToWebp(lineInfo[lineIndex].line_details[lineDetailIndex].image_url)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

const EventNoobProHackerImageSetting = ({
  lineInfo,
  handleImageChange,
  handleImageSubmit,
}: EventNoobProHackerProps) => {
  return (
    <Fragment>
      <div className="mt-16 flex items-center gap-8">
        <Typography variants="h2" color="primary" fontSize="28px" lineHeight="32px">
          이미지 추가
        </Typography>
        <Button text="제출" handleButtonClick={handleImageSubmit} />
      </div>
      <div className="mt-10 grid grid-cols-5 gap-8">
        {lineInfo.map((line, lineIndex) => (
          <div key={lineIndex + 1 + '라인'}>
            <Typography variants="h3" color="primary">
              {lineIndex + 1}라인
            </Typography>
            {line.line_details.map((lineDetail, lineDetailIndex) => (
              <div
                key={lineDetail.minecraft_id[0] + lineDetailIndex}
                className="mt-4 flex flex-col gap-2 [&>input]:h-[40px] [&>input]:w-full"
              >
                <InputForm
                  label="이미지 링크"
                  name="image_url"
                  value={line.line_details[lineDetailIndex].image_url}
                  handleInputChange={(e) => handleImageChange(e, lineIndex, lineDetailIndex)}
                />
                <div className="relative aspect-video">
                  <Image alt="이미지" fill src={renameToWebp(lineDetail.image_url)} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

const ArchitectureContestImageSetting = ({
  lineInfo,
  handleImageChange,
  handleImageSubmit,
}: ArchitectureContestProps) => {
  return (
    <Fragment>
      <div className="mt-16 flex items-center gap-8">
        <Typography variants="h2" color="primary" fontSize="28px" lineHeight="32px">
          이미지 추가
        </Typography>
        <Button text="제출" handleButtonClick={handleImageSubmit} />
      </div>
      <div className="mt-10 grid grid-cols-5 gap-8">
        {lineInfo.map((line, lineIndex) => (
          <div key={lineIndex + 1 + '라인'}>
            <Typography variants="h3" color="primary">
              {lineIndex + 1}라인
            </Typography>
            {line.line_details.map((lineDetail, lineDetailIndex) => (
              <div
                key={lineDetail.minecraft_id}
                className="mt-4 flex flex-col gap-2 [&>input]:h-[40px] [&>input]:w-full"
              >
                <InputForm
                  label="이미지 링크"
                  name="image_url"
                  value={line.line_details[lineDetailIndex].image_url}
                  handleInputChange={(e) => handleImageChange(e, lineIndex, lineDetailIndex)}
                />
                <div className="relative aspect-video">
                  <Image alt="이미지" fill src={renameToWebp(lineDetail.image_url)} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
}
const LINE_TIER = {
  3: ['눕', '프로', '해커'],
  5: ['눕', '계륵', '프로', '국밥', '해커'],
}
