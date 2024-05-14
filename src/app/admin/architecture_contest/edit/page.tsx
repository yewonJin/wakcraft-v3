'use client'

import { useQuery } from '@tanstack/react-query'

import ContentSetting from '@/components/organisms/Admin/ContentSetting'
import LineDetailSetting from '@/components/organisms/Admin/LineDetailSetting'
import SelectEpisode from '@/components/organisms/Admin/SelectEpisode'

import { useArchitectureContest } from '@/hooks/Admin/useArchitectureContest'
import { getAllArchitectureContests } from '@/apis/client/architectureContest'

export default function Page() {
  const {
    page,
    moveToNextPage,
    architectureContest,
    setArchitectureContestByFetchData,
    editSubmit,
    handleContentInfoChange,
    handleLineDetailChange,
  } = useArchitectureContest()

  console.log(architectureContest)

  const { data: architectureContests } = useQuery({
    queryKey: ['getAllArchitectureContest'],
    queryFn: getAllArchitectureContests,
  })

  if (!architectureContests) return <div>loading...</div>

  switch (page) {
    case 0:
      return (
        <SelectEpisode
          type="건축 콘테스트"
          content={architectureContest}
          fetchedContent={architectureContests.filter((item) => item.contentInfo.youtube_url === 'null')}
          setContentByFetchData={setArchitectureContestByFetchData}
        />
      )

    case 1:
      return (
        <ContentSetting
          type="기본"
          moveToNextPage={moveToNextPage}
          contentInfo={architectureContest.contentInfo}
          handleInputChange={handleContentInfoChange}
        />
      )

    case 2:
      return (
        <LineDetailSetting
          type="건축 콘테스트"
          lineInfo={architectureContest.lineInfo}
          handleLineDetailChange={handleLineDetailChange}
          handleSubmit={editSubmit}
        />
      )
  }
}
