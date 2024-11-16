import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import toast from 'react-hot-toast'

import { getAllArchitects } from '@/apis/client/architect'
import {
  addEventNoobProHacker,
  editEventNoobProHacker,
  getLastestEventNoobProHacker,
} from '@/apis/client/eventNoobProHacker'
import { GridEventNoobProHacker } from '@/types/content'
import { Architect } from '@/types/architect'
import { getImagesName } from '@/apis/client/aws'

export const useGridEventNoobProHacker = () => {
  const [page, setPage] = useState(0)

  const [eventNoobProHacker, setEventNoobProHacker] = useState<GridEventNoobProHacker>(initialEventNoobProHacker)

  const { data: architects } = useQuery<Architect[]>({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const { data: lastestEventNoobProHacker } = useQuery({
    queryKey: ['getLastestEventNoobProHacker'],
    queryFn: getLastestEventNoobProHacker,
  })

  const { data: imagesName } = useQuery({
    queryKey: ['getAllImages', lastestEventNoobProHacker?.contentInfo.episode],
    queryFn: () => getImagesName('eventNoobProHacker', lastestEventNoobProHacker?.contentInfo.episode! + 1),
    enabled: !!lastestEventNoobProHacker,
  })

  useEffect(() => {
    if (!imagesName) return

    if (!Array.isArray(imagesName)) return

    const participants: GridEventNoobProHacker['participants'] = imagesName.map((imageName) => ({
      minecraft_id: imageName.split('/')[2].split('.')[0],
      image_url: 'https://wakcraft.s3.ap-northeast-2.amazonaws.com/' + imageName,
      youtube_url: 'null',
      order: 0,
      ranking: 0,
      topText: '',
      bottomText: '',
    }))

    setEventNoobProHacker(
      produce((draft) => {
        draft.participants = participants
      }),
    )
  }, [imagesName])

  const addMutation = useMutation({
    mutationKey: ['addEventNoobProHacker'],
    mutationFn: addEventNoobProHacker,
  })

  const editMutation = useMutation({
    mutationKey: ['editEventNoobProHacker'],
    mutationFn: editEventNoobProHacker,
  })

  useEffect(() => {
    if (!lastestEventNoobProHacker) return

    setEventNoobProHacker(
      produce((draft) => {
        draft['contentInfo']['episode'] = lastestEventNoobProHacker.contentInfo.episode + 1
      }),
    )
  }, [lastestEventNoobProHacker])

  const handleContentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as 'subject' | 'date' | 'youtube_url' | 'episode'

    if (key === 'episode') {
      setEventNoobProHacker(
        produce((draft) => {
          draft['contentInfo'][key] = parseInt(e.target.value)
        }),
      )
    } else {
      setEventNoobProHacker(
        produce((draft) => {
          draft['contentInfo'][key] = e.target.value
        }),
      )
    }
  }

  const handleParticipantInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.name === 'order' || e.target.name === 'ranking') {
      setEventNoobProHacker(
        produce((draft) => {
          draft['participants'][index][e.target.name as 'order' | 'ranking'] = parseInt(e.target.value)
        }),
      )
    } else {
      setEventNoobProHacker(
        produce((draft) => {
          draft['participants'][index][
            e.target.name as Exclude<keyof GridEventNoobProHacker['participants'][number], 'order' | 'ranking'>
          ] = e.target.value
        }),
      )
    }
  }

  const moveToNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const addSubmit = () => {
    if (!validateOrder(eventNoobProHacker)) {
      toast.error('순서를 모두 입력해주세요')
      return
    }

    if (!validateDuplicateOrder(eventNoobProHacker)) {
      toast.error('중복된 순서가 있습니다.')
      return
    }

    addMutation.mutate(eventNoobProHacker)
  }

  const editSubmit = () => {
    editMutation.mutate(eventNoobProHacker)
  }

  return {
    page,
    imagesName,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    handleParticipantInputChange,
    architects,
    addSubmit,
    editSubmit,
  }
}

const initialEventNoobProHacker: GridEventNoobProHacker = {
  type: 'grid',
  contentInfo: {
    episode: 0,
    subject: '',
    date: new Date().toISOString(),
    youtube_url: 'null',
    isContributedContent: false,
  },
  participants: [],
}

const validateOrder = (eventNoobProHacker: GridEventNoobProHacker) => {
  return eventNoobProHacker.participants.every((participant) => participant.order !== 0)
}

const validateDuplicateOrder = (eventNoobProHacker: GridEventNoobProHacker) => {
  return (
    Array.from(new Set(eventNoobProHacker.participants.map((participant) => participant.order))).length ===
    eventNoobProHacker.participants.length
  )
}
