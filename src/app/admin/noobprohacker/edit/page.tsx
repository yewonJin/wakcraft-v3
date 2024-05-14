'use client'

import { useQuery } from '@tanstack/react-query'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import SelectEpisode from '@/components/organisms/Admin/SelectEpisode'

import { getNoobProHackersWithoutURL } from '@/apis/client/noobprohacker'
import { useNoobProHacker } from '@/hooks/Admin/useNoobProHacker'

export default function Page() {
  const {
    page,
    moveToNextPage,
    noobprohacker,
    handleContentInfoChange,
    setNoobProhackerByFetchData,
    handleLineDetailChange,
    handleLineInfoChange,
    editSubmit,
  } = useNoobProHacker()

  const { data: editableNoobProHacker } = useQuery({
    queryKey: ['editableNoobProHacker'],
    queryFn: getNoobProHackersWithoutURL,
  })

  if (!editableNoobProHacker) return <div>loading...</div>

  switch (page) {
    case 0:
      return (
        <SelectEpisode
          type="눕프로해커"
          content={noobprohacker}
          fetchedContent={editableNoobProHacker}
          setContentByFetchData={setNoobProhackerByFetchData}
        />
      )

    case 1:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={noobprohacker.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 2:
      return (
        <LineDetailSetting
          type="눕프로해커"
          lineInfo={noobprohacker.lineInfo}
          handleLineDetailChange={handleLineDetailChange}
          handleLineInfoChange={handleLineInfoChange}
          handleSubmit={editSubmit}
        />
      )
  }
}
