import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import toast from 'react-hot-toast'

import { getAllArchitects } from '@/apis/client/architect'
import { EventNoobProHacker } from '@/types/content'
import { Architect } from '@/types/architect'
import { addEventNoobProHacker, editEventNoobProHacker } from '@/apis/client/eventNoobProHacker'

export const useEventNoobProHacker = () => {
  const [page, setPage] = useState(0)

  const [eventNoobProHacker, setEventNoobProHacker] = useState<EventNoobProHacker>(initialEventNoobProHacker)

  const addMutation = useMutation({
    mutationKey: ['addEventNoobProHacker'],
    mutationFn: () => addEventNoobProHacker(eventNoobProHacker),
    onSuccess: () => {
      toast.success('이벤트 눕프핵 추가')
    },
  })

  const editMutation = useMutation({
    mutationKey: ['editEventNoobProHacker'],
    mutationFn: () => editEventNoobProHacker(eventNoobProHacker),
    onSuccess: () => {
      toast.success('이벤트 눕프핵 수정')
    },
  })

  const { data: architects } = useQuery<Architect[]>({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const incNumberOfLines = () => {
    setEventNoobProHacker(
      produce((draft) => {
        draft['lineInfo'].push({
          subject: '',
          line_ranking: 0,
          line_details: [
            {
              line: '',
              minecraft_id: [''],
              youtube_url: 'null',
              image_url: '',
              ranking: 0,
            },
            {
              line: '',
              minecraft_id: [''],
              youtube_url: 'null',
              image_url: '',
              ranking: 0,
            },
            {
              line: '',
              minecraft_id: [''],
              youtube_url: 'null',
              image_url: '',
              ranking: 0,
            },
          ],
        })
      }),
    )
  }

  const incNumberOfArchitectsPerLine = () => {
    setEventNoobProHacker(
      produce((draft) => {
        draft['lineInfo'].forEach((line) =>
          line.line_details.push({
            line: '',
            minecraft_id: [''],
            youtube_url: 'null',
            image_url: '',
            ranking: 0,
          }),
        )
      }),
    )
  }

  const moveToNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const setEventNoobProhackerByFetchData = (eventNoobProHacker: EventNoobProHacker) => {
    setEventNoobProHacker(
      produce((draft) => {
        draft['contentInfo'] = eventNoobProHacker['contentInfo']
        draft['lineInfo'] = eventNoobProHacker['lineInfo']
      }),
    )

    moveToNextPage()
  }

  const handleContentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleMinecraftIdChange = (lineIndex: number, lineDetailIndex: number, minecraft_id: string) => {
    setEventNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][lineIndex].line_details[lineDetailIndex].minecraft_id[0] = minecraft_id
      }),
    )
  }

  const handleArchitectIdSettingSubmit = () => {
    if (!validateInput(eventNoobProHacker.lineInfo)) {
      toast.error('비어있는 입력창이 있습니다.')
      return
    }

    if (!validateDuplicate(eventNoobProHacker.lineInfo)) {
      toast.error('아이디가 중복되어 있습니다.')
      return
    }

    moveToNextPage()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => {
    setEventNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][lineIndex].line_details[lineDetailIndex].image_url = e.target.value
      }),
    )
  }

  const handleImageSubmit = () => {
    if (!validateImage(eventNoobProHacker.lineInfo)) {
      toast.error('이미지를 모두 채워주세요')
      return
    }

    moveToNextPage()
  }

  const handleLineInfoChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.name === 'line_ranking') {
      setEventNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].line_ranking = parseInt(e.target.value)
        }),
      )
    } else {
      setEventNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].subject = e.target.value
        }),
      )
    }
  }

  const handleLineDetailChange = (e: ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => {
    if (e.target.name === 'ranking') {
      setEventNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][lineIndex].line_details[lineDetailIndex].ranking = parseInt(e.target.value)
        }),
      )
    } else {
      setEventNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][lineIndex].line_details[lineDetailIndex][e.target.name as 'line' | 'youtube_url'] =
            e.target.value
        }),
      )
    }
  }

  const addSubmit = () => {
    if (!validateSubject(eventNoobProHacker.lineInfo)) {
      toast.error('주제를 모두 입력해주세요')
      return
    }

    addMutation.mutate()
  }

  const editSubmit = () => {
    if (!validateSubject(eventNoobProHacker.lineInfo)) {
      toast.error('주제를 모두 입력해주세요')
      return
    }

    editMutation.mutate()
  }

  return {
    page,
    incNumberOfLines,
    incNumberOfArchitectsPerLine,
    moveToNextPage,
    eventNoobProHacker,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleArchitectIdSettingSubmit,
    handleImageChange,
    handleImageSubmit,
    handleLineInfoChange,
    handleLineDetailChange,
    setEventNoobProhackerByFetchData,
    addSubmit,
    editSubmit,
  }
}

const initialEventNoobProHacker: EventNoobProHacker = {
  contentInfo: {
    episode: 0,
    subject: '',
    date: new Date().toISOString(),
    youtube_url: 'null',
  },
  lineInfo: Array.from({ length: 5 }, () => ({
    subject: '',
    line_ranking: 0,
    line_details: [
      {
        line: '',
        minecraft_id: [''],
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
      {
        line: '',
        minecraft_id: [''],
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
      {
        line: '',
        minecraft_id: [''],
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
    ],
  })),
}

const validateInput = (lineInfo: EventNoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.line_details.map((architecture) => architecture.minecraft_id.join('') !== ''))
    .flat(2)
    .every((item) => item)
}

const validateDuplicate = (lineInfo: EventNoobProHacker['lineInfo']) => {
  return (
    Array.from(
      new Set(lineInfo.map((line) => line.line_details.map((architecture) => architecture.minecraft_id)).flat()),
    ).length === 15
  )
}

const validateImage = (lineInfo: EventNoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.line_details.map((tier) => tier.image_url !== ''))
    .flat()
    .every((item) => item)
}

const validateSubject = (lineInfo: EventNoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.subject !== '')
    .flat()
    .every((item) => item)
}
