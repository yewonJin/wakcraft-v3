'use client'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import ArchitectIdSetting from '@/components/organisms/Admin/ArchitectIdSetting'
import ImageSetting from '@/components/organisms/Admin/ImageSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import Typography from '@/components/atoms/Typography'

import { useEventNoobProHacker } from '@/hooks/Admin/useEventNoobProHacker'
import Button from '@/components/atoms/Button'

export default function Page() {
  const {
    page,
    incNumberOfLines,
    incNumberOfArchitectsPerLine,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleImageChange,
    handleImageSubmit,
    handleArchitectIdSettingSubmit,
    handleLineInfoChange,
    handleLineDetailChange,
    addSubmit,
  } = useEventNoobProHacker()

  if (!architects)
    return (
      <Typography variants="p" color="primary">
        loading...
      </Typography>
    )

  switch (page) {
    case 0:
      return (
        <div className="flex gap-4">
          <div>
            <Typography variants="p" color="secondary">
              라인 수 : {eventNoobProHacker.lineInfo.length}
            </Typography>
            <Button text="라인 추가" handleButtonClick={incNumberOfLines} />
          </div>
          <div>
            <Typography variants="p" color="secondary">
              라인별 건축가 : {eventNoobProHacker.lineInfo[0].line_details.length}
            </Typography>
            <Button text="라인별 건축가 추가" handleButtonClick={incNumberOfArchitectsPerLine} />
          </div>
          <Button text="다음" handleButtonClick={moveToNextPage} />
        </div>
      )

    case 1:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={eventNoobProHacker.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 2:
      return (
        <ArchitectIdSetting
          moveToNextPage={moveToNextPage}
          architects={architects}
          handleMinecraftIdChange={handleMinecraftIdChange}
          handleArchitectIdSettingSubmit={handleArchitectIdSettingSubmit}
          numberOfLines={eventNoobProHacker.lineInfo.length}
          numberOfarchitectsPerLine={eventNoobProHacker.lineInfo[0].line_details.length}
        />
      )

    case 3:
      return (
        <ImageSetting
          type="이벤트 눕프핵"
          moveToNextPage={moveToNextPage}
          handleImageChange={handleImageChange}
          handleImageSubmit={handleImageSubmit}
          episode={eventNoobProHacker.contentInfo.episode}
          lineInfo={eventNoobProHacker.lineInfo}
        />
      )

    case 4:
      return (
        <LineDetailSetting
          type="이벤트 눕프핵"
          lineInfo={eventNoobProHacker.lineInfo}
          handleLineInfoChange={handleLineInfoChange}
          handleLineDetailChange={handleLineDetailChange}
          handleSubmit={addSubmit}
        />
      )
  }
}
