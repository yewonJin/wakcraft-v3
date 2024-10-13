'use client'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import ArchitectIdSetting from '@/components/organisms/Admin/ArchitectIdSetting'
import ImageSetting from '@/components/organisms/Admin/ImageSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import Typography from '@/components/atoms/Typography'

import { useNoobProHacker } from '@/hooks/Admin/useNoobProHacker'

export default function Page() {
  const {
    page,
    moveToNextPage,
    noobprohacker,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleImageSelectClick,
    handleImageSubmit,
    handleArchitectIdSettingSubmit,
    handleLineInfoChange,
    handleLineDetailChange,
    addSubmit,
  } = useNoobProHacker()

  if (!architects)
    return (
      <Typography variants="p" color="primary">
        loading...
      </Typography>
    )

  switch (page) {
    case 0:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={noobprohacker.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 1:
      return (
        <ArchitectIdSetting
          moveToNextPage={moveToNextPage}
          architects={architects}
          handleMinecraftIdChange={handleMinecraftIdChange}
          handleArchitectIdSettingSubmit={handleArchitectIdSettingSubmit}
          numberOfLines={6}
          numberOfarchitectsPerLine={3}
        />
      )

    case 2:
      return (
        <ImageSetting
          type="눕프로해커"
          moveToNextPage={moveToNextPage}
          handleImageSelectClick={handleImageSelectClick}
          handleImageSubmit={handleImageSubmit}
          episode={noobprohacker.contentInfo.episode}
          lineInfo={noobprohacker.lineInfo}
        />
      )

    case 3:
      return (
        <LineDetailSetting
          type="눕프로해커"
          lineInfo={noobprohacker.lineInfo}
          handleLineInfoChange={handleLineInfoChange}
          handleLineDetailChange={handleLineDetailChange}
          handleSubmit={addSubmit}
        />
      )
  }
}
