import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getImagesName } from '@/apis/client/aws'

export const useGetImages = (
  type: '눕프로해커' | '이벤트 눕프핵' | '건축 눕프핵' | '건축 콘테스트',
  episode: number,
) => {
  const getObjectName = () => {
    switch (type) {
      case '눕프로해커':
        return 'noobProHacker'

      case '건축 눕프핵':
        return 'architectureNoobProHacker'

      case '건축 콘테스트':
        return 'architectureContest'

      case '이벤트 눕프핵':
        return 'eventNoobProHacker'
    }
  }

  const { data: imagesName } = useQuery({
    queryKey: ['getImagesName'],
    queryFn: () => getImagesName(getObjectName(), episode),
  })

  const subjects: string[] = useMemo(
    () => Array.from(new Set(imagesName?.map((item: any) => item.split('/')[2].split('-')[0]))),
    [imagesName],
  )

  return { subjects }
}
