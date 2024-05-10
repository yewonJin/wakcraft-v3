import { Fragment } from 'react'

import SearchArchitect from '@/components/molecules/SearchArchitect'
import Typography from '@/components/atoms/Typography'
import Button from '@/components/atoms/Button'

import { Architect } from '@/types/architect'

type Props = {
  moveToNextPage: () => void
  architects: Architect[]
  handleMinecraftIdChange: (lineIndex: number, lineDetailIndex: number, minecraft_id: string) => void
  handleArchitectIdSettingSubmit: () => void
  numberOfarchitectsPerLine: number
  numberOfLines: number
}

export default function ArchitectIdSetting({
  architects,
  handleMinecraftIdChange,
  handleArchitectIdSettingSubmit,
  numberOfLines,
  numberOfarchitectsPerLine,
}: Props) {
  return (
    <Fragment>
      <div className="mt-16 mb-8 grid grid-cols-5 gap-8">
        {new Array(numberOfLines).fill(0).map((_, lineIndex) => (
          <div className="" key={lineIndex + 1 + '라인'}>
            <Typography variants="h2" color="primary">
              {lineIndex + 1}라인
            </Typography>
            {new Array(numberOfarchitectsPerLine).fill(0).map((_, lineDetailIndex) => (
              <div key={lineIndex + lineDetailIndex} className="mt-8 flex flex-col gap-2 text-base text-text-secondary">
                <Typography variants="p" color="tertiary">
                  {numberOfarchitectsPerLine === 3 || numberOfarchitectsPerLine === 5
                    ? LINE_TIER[numberOfarchitectsPerLine][lineDetailIndex]
                    : ''}
                </Typography>
                <SearchArchitect
                  lineIndex={lineIndex}
                  lineDetailIndex={lineDetailIndex}
                  architects={architects}
                  handleMinecraftIdChange={handleMinecraftIdChange}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button handleButtonClick={handleArchitectIdSettingSubmit} text="제출" />
    </Fragment>
  )
}

const LINE_TIER = {
  3: ['눕', '프로', '해커'],
  5: ['눕', '계륵', '프로', '국밥', '해커'],
}
