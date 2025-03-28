'use client'

import { useQuery } from '@tanstack/react-query'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import SelectEpisode from '@/components/organisms/Admin/SelectEpisode'

import { useLineEventNoobProHacker } from '@/hooks/Admin/useLineEventNoobProHacker'
import { getAllEventNoobProHackers } from '@/apis/client/eventNoobProHacker'
import { LineEventNoobProHacker } from '@/types/content'

export default function Page() {
  const {
    page,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    handleLineInfoChange,
    handleLineDetailChange,
    setEventNoobProhackerByFetchData,
    editSubmit,
  } = useLineEventNoobProHacker()

  const { data: eventNoobProHackers } = useQuery({
    queryKey: ['getAllEventNoobProHackers'],
    queryFn: getAllEventNoobProHackers,
  })

  if (!eventNoobProHackers) return <div>loading...</div>

  const lineEventNoobProHackers = eventNoobProHackers.filter((item) => item.type === 'line') as LineEventNoobProHacker[]

  switch (page) {
    case 0:
      return (
        <SelectEpisode
          type="이벤트 눕프핵 - 라인"
          content={eventNoobProHacker}
          fetchedContent={lineEventNoobProHackers.filter((item) => item.contentInfo.youtube_url === 'null')}
          setContentByFetchData={setEventNoobProhackerByFetchData}
        />
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
        <LineDetailSetting
          type="이벤트 눕프핵"
          lineInfo={eventNoobProHacker.lineInfo}
          handleLineDetailChange={handleLineDetailChange}
          handleLineInfoChange={handleLineInfoChange}
          handleSubmit={editSubmit}
        />
      )
  }
}
