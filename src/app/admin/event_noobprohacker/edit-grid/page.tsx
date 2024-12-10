'use client'

import { useQuery } from '@tanstack/react-query'

import Button from '@/components/atoms/Button'
import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import GridSetting from '@/components/organisms/Admin/GridSetting'
import SelectEpisode from '@/components/organisms/Admin/SelectEpisode'

import { getAllEventNoobProHackers } from '@/apis/client/eventNoobProHacker'
import { useGridEventNoobProHacker } from '@/hooks/Admin/useGridEventNoobProHacker'
import { GridEventNoobProHacker } from '@/types/content'

export default function Page() {
  const {
    page,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    handleParticipantInputChange,
    setEventNoobProhackerByFetchData,
    editSubmit,
  } = useGridEventNoobProHacker()

  const { data: eventNoobProHackers } = useQuery({
    queryKey: ['getAllEventNoobProHackers'],
    queryFn: getAllEventNoobProHackers,
  })

  if (!eventNoobProHackers) return <div>loading...</div>

  const gridEventNoobProHackers = eventNoobProHackers.filter((item) => item.type === 'grid') as GridEventNoobProHacker[]

  switch (page) {
    case 0:
      return (
        <SelectEpisode
          type="이벤트 눕프핵 - 그리드"
          content={eventNoobProHacker}
          fetchedContent={gridEventNoobProHackers.filter((item) => item.contentInfo.youtube_url === 'null')}
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
        <div className="flex flex-col gap-4">
          <GridSetting
            eventNoobProHacker={eventNoobProHacker}
            handleParticipantInputChange={handleParticipantInputChange}
          />
          <Button onClick={editSubmit} text="수정" />
        </div>
      )
  }
}
