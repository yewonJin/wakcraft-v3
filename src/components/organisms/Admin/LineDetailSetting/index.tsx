import { Fragment } from 'react'
import Image from 'next/image'

import { InputForm } from '@/components/molecules/Form'
import Button from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

import { ArchitectureContest, EventNoobProHacker, LineInfo } from '@/types/content'
import { renameToWebp } from '@/utils/shared'

type Props = NoobProHackerProps | EventNoobProHackerProps | ArchitectureContestProps

type NoobProHackerProps = {
  type: '눕프로해커'
  isEdit?: boolean
  lineInfo: LineInfo
  handleSubmit: () => void
  handleLineInfoChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, tier: number) => void
}

type EventNoobProHackerProps = {
  type: '이벤트 눕프핵'
  isEdit?: boolean
  lineInfo: EventNoobProHacker['lineInfo']
  handleSubmit: () => void
  handleLineInfoChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, tier: number) => void
}

type ArchitectureContestProps = {
  type: '건축 콘테스트'
  isEdit?: boolean
  lineInfo: ArchitectureContest['lineInfo']
  handleSubmit: () => void
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, tier: number) => void
}

export default function LineDetailSetting(props: Props) {
  const { type, isEdit, lineInfo, handleSubmit, handleLineDetailChange } = props

  return (
    <Fragment>
      <div className="mt-12 flex flex-col gap-16">
        {lineInfo.map((_, lineIndex) => (
          <div key={lineIndex}>
            {type !== '건축 콘테스트' && (
              <Line
                index={lineIndex}
                subject={lineInfo[lineIndex].subject}
                line_ranking={lineInfo[lineIndex].line_ranking}
                handleLineInfoChange={props.handleLineInfoChange}
              />
            )}
            <div className="mt-6 grid grid-cols-3 gap-8">
              {new Array(lineInfo[lineIndex].line_details.length).fill(0).map((_, lineDetailIndex) => {
                switch (type) {
                  case '눕프로해커':
                    return (
                      <LineDetail
                        type="눕프로해커"
                        key={lineIndex + lineDetailIndex}
                        lineIndex={lineIndex}
                        lineDetailIndex={lineDetailIndex}
                        lineInfo={lineInfo}
                        handleLineDetailChange={handleLineDetailChange}
                      />
                    )

                  case '이벤트 눕프핵':
                    return (
                      <LineDetail
                        type="이벤트 눕프핵"
                        key={lineIndex + lineDetailIndex}
                        lineIndex={lineIndex}
                        lineDetailIndex={lineDetailIndex}
                        lineInfo={lineInfo}
                        handleLineDetailChange={handleLineDetailChange}
                      />
                    )

                  case '건축 콘테스트':
                    return (
                      <LineDetail
                        type="건축 콘테스트"
                        key={lineIndex + lineDetailIndex}
                        lineIndex={lineIndex}
                        lineDetailIndex={lineDetailIndex}
                        lineInfo={lineInfo}
                        handleLineDetailChange={handleLineDetailChange}
                      />
                    )

                  default:
                    break
                }
              })}
            </div>
          </div>
        ))}
      </div>
      <Button handleButtonClick={handleSubmit} text={isEdit ? '수정' : '추가'} />
    </Fragment>
  )
}

type LineProps = {
  index: number
  subject: string
  line_ranking: number
  handleLineInfoChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const Line = ({ index, subject, line_ranking, handleLineInfoChange }: LineProps) => {
  return (
    <div className="flex items-center gap-4">
      <Typography variants="h2" color="secondary">
        {index + 1}라인
      </Typography>
      <InputForm
        label="주제"
        name="subject"
        type="text"
        value={subject}
        handleInputChange={(e) => handleLineInfoChange(e, index)}
      />
      <InputForm
        label="라인 순위"
        name="line_ranking"
        type="number"
        value={line_ranking}
        handleInputChange={(e) => handleLineInfoChange(e, index)}
      />
    </div>
  )
}

type LineDetailProps =
  | NoobProHackerLineDetailProps
  | EventNoobProHackerLineDetailProps
  | ArchitectureContestLineDetailProps

type NoobProHackerLineDetailProps = {
  type: '눕프로해커'
  lineIndex: number
  lineDetailIndex: number
  lineInfo: LineInfo
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => void
}

type EventNoobProHackerLineDetailProps = {
  type: '이벤트 눕프핵'
  lineIndex: number
  lineDetailIndex: number
  lineInfo: EventNoobProHacker['lineInfo']
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => void
}

type ArchitectureContestLineDetailProps = {
  type: '건축 콘테스트'
  lineIndex: number
  lineDetailIndex: number
  lineInfo: ArchitectureContest['lineInfo']
  handleLineDetailChange: (e: React.ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => void
}

const LineDetail = ({ type, lineIndex, lineDetailIndex, lineInfo, handleLineDetailChange }: LineDetailProps) => {
  return (
    <div>
      <div className="relative aspect-video">
        <Image alt={`thumbnail`} fill src={renameToWebp(lineInfo[lineIndex].line_details[lineDetailIndex].image_url)} />
        <p className="absolute left-2 top-2 z-10 bg-[rgba(0,0,0,0.6)] px-2 text-lg text-text-secondary">
          {lineInfo[lineIndex].line_details[lineDetailIndex].minecraft_id}
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        {type === '이벤트 눕프핵' && (
          <InputForm
            label="라인명"
            name="line"
            type="text"
            value={lineInfo[lineIndex].line_details[lineDetailIndex].line}
            handleInputChange={(e) => handleLineDetailChange(e, lineIndex, lineDetailIndex)}
          />
        )}
        <InputForm
          label="순위"
          name="ranking"
          type="number"
          value={lineInfo[lineIndex].line_details[lineDetailIndex].ranking}
          handleInputChange={(e) => handleLineDetailChange(e, lineIndex, lineDetailIndex)}
        />
        <InputForm
          label="개인 유튜브 링크"
          name="youtube_url"
          type="text"
          value={lineInfo[lineIndex].line_details[lineDetailIndex].youtube_url}
          handleInputChange={(e) => handleLineDetailChange(e, lineIndex, lineDetailIndex)}
        />
        {type === '건축 콘테스트' && (
          <Fragment>
            <InputForm
              label="위 설명"
              name="topText"
              type="text"
              value={lineInfo[lineIndex].line_details[lineDetailIndex].topText}
              handleInputChange={(e) => handleLineDetailChange(e, lineIndex, lineDetailIndex)}
            />
            <InputForm
              label="아래 설명"
              name="bottomText"
              type="text"
              value={lineInfo[lineIndex].line_details[lineDetailIndex].bottomText}
              handleInputChange={(e) => handleLineDetailChange(e, lineIndex, lineDetailIndex)}
            />
          </Fragment>
        )}
      </div>
    </div>
  )
}
