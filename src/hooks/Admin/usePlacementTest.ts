import { ChangeEvent, useEffect, useState } from 'react'
import { produce } from 'immer'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { PlacementTest } from '@/types/content'
import { getImagesName } from '@/apis/client/aws'
import { addPlacementTest, getLastestPlacementTest } from '@/apis/client/placementTest'
import { DetailedTier } from '@/types/architect'
import { getDateString } from '@/utils/shared'

const initialPlacementTest: PlacementTest = {
  season: 0,
  date: getDateString(new Date()),
  youtube_url: 'null',
  participants: [],
}

export const usePlacementTest = () => {
  const [placementTest, setPlacementTest] = useState<PlacementTest>(initialPlacementTest)

  const { data: lastestPlacementTest } = useQuery({
    queryKey: ['getLastestPlacementTest'],
    queryFn: getLastestPlacementTest,
  })

  const { data: imagesName } = useQuery({
    queryKey: ['getAllImages', lastestPlacementTest?.season],
    queryFn: () => getImagesName('placementTest', lastestPlacementTest?.season! + 1),
    enabled: !!lastestPlacementTest,
  })

  useEffect(() => {
    if (!lastestPlacementTest) return

    setPlacementTest(
      produce((draft) => {
        draft['season'] = lastestPlacementTest.season + 1
      }),
    )
  }, [lastestPlacementTest])

  useEffect(() => {
    if (!imagesName) return

    if (!Array.isArray(imagesName)) return

    const participants: PlacementTest['participants'] = imagesName.map((imageName) => ({
      minecraft_id: imageName.split('/')[2].split('.')[0],
      image_url: 'https://wakcraft.s3.ap-northeast-2.amazonaws.com/' + imageName,
      placement_result: '언랭',
      order: 0,
      ranking: 0,
    }))

    setPlacementTest(
      produce((draft) => {
        draft.participants = participants
      }),
    )
  }, [imagesName])

  const addMutation = useMutation({
    mutationKey: ['addPlacementTest'],
    mutationFn: addPlacementTest,
  })

  const handleContentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlacementTest(
      produce((draft) => {
        draft[e.target.name as 'date' | 'youtube_url'] = e.target.value
      }),
    )
  }

  const handleParticipantInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPlacementTest(
      produce((draft) => {
        draft.participants[index][e.target.name as 'ranking' | 'order'] = parseInt(e.target.value)
      }),
    )
  }

  const handleParticipantSelectChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setPlacementTest(
      produce((draft) => {
        draft.participants[index].placement_result = e.target.value as DetailedTier
      }),
    )
  }

  const handleSubmit = () => {
    if (!validateOrder(placementTest)) {
      toast.error('순서를 모두 입력해주세요')
      return
    }

    if (!validateDuplicateOrder(placementTest)) {
      toast.error('중복된 순서가 있습니다.')
      return
    }

    if (!validatePlacementResult(placementTest)) {
      toast.error('모든 배치 티어를 입력해주세요')
      return
    }

    addMutation.mutate(placementTest)
  }

  return {
    imagesName,
    placementTest,
    handleContentInputChange,
    handleParticipantInputChange,
    handleParticipantSelectChange,
    handleSubmit,
  }
}

const validateOrder = (placementTest: PlacementTest) => {
  return placementTest.participants.every((participant) => participant.order !== 0)
}

const validatePlacementResult = (placementTest: PlacementTest) => {
  return placementTest.participants.every((participant) => participant.placement_result !== '언랭')
}

const validateDuplicateOrder = (placementTest: PlacementTest) => {
  return (
    Array.from(new Set(placementTest.participants.map((participant) => participant.order))).length ===
    placementTest.participants.length
  )
}
