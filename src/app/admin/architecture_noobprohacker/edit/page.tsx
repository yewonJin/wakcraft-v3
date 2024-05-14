'use client'

import { useQuery } from '@tanstack/react-query'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import SelectEpisode from '@/components/organisms/Admin/SelectEpisode'

import { useArchitectureNoobProHacker } from '@/hooks/Admin/useArchitectureNoobProHacker'
import { getArchitectureNoobProHackersWithoutURL } from '@/apis/client/architectureNoobProHacker'

export default function Page() {
  const {
    page,
    moveToNextPage,
    architectureNoobProHacker,
    handleContentInfoChange,
    setArchitectureNoobProhackerByFetchData,
    handleLineDetailChange,
    handleLineInfoChange,
    editSubmit,
  } = useArchitectureNoobProHacker()

  const { data: editableArchitectureNoobProHacker } = useQuery({
    queryKey: ['editableArchitectureNoobProHacker'],
    queryFn: getArchitectureNoobProHackersWithoutURL,
  })

  if (!editableArchitectureNoobProHacker) return <div>loading...</div>

  switch (page) {
    case 0:
      return (
        <SelectEpisode
          type="눕프로해커"
          content={architectureNoobProHacker}
          fetchedContent={editableArchitectureNoobProHacker}
          setContentByFetchData={setArchitectureNoobProhackerByFetchData}
        />
      )

    case 1:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={architectureNoobProHacker.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 2:
      return (
        <LineDetailSetting
          type="눕프로해커"
          lineInfo={architectureNoobProHacker.lineInfo}
          handleLineDetailChange={handleLineDetailChange}
          handleLineInfoChange={handleLineInfoChange}
          handleSubmit={editSubmit}
        />
      )
  }
}
