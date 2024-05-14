'use client'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import ArchitectIdSetting from '@/components/organisms/Admin/ArchitectIdSetting'
import ImageSetting from '@/components/organisms/Admin/ImageSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import Typography from '@/components/atoms/Typography'

import { useArchitectureContest } from '@/hooks/Admin/useArchitectureContest'

export default function Page() {
  const {
    page,
    moveToNextPage,
    architectureContest,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleImageChange,
    handleImageSubmit,
    handleArchitectIdSettingSubmit,
    handleLineDetailChange,
    addSubmit,
  } = useArchitectureContest()

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
          contentInfo={architectureContest.contentInfo}
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
          numberOfLines={architectureContest.lineInfo.length}
          numberOfarchitectsPerLine={architectureContest.lineInfo[0].line_details.length}
        />
      )

    case 2:
      return (
        <ImageSetting
          type="건축 콘테스트"
          moveToNextPage={moveToNextPage}
          handleImageChange={handleImageChange}
          handleImageSubmit={handleImageSubmit}
          episode={architectureContest.contentInfo.episode}
          lineInfo={architectureContest.lineInfo}
        />
      )

    case 3:
      return (
        <LineDetailSetting
          type="건축 콘테스트"
          lineInfo={architectureContest.lineInfo}
          handleLineDetailChange={handleLineDetailChange}
          handleSubmit={addSubmit}
        />
      )
  }
}
