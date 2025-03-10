import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import toast from 'react-hot-toast'

import { addNoobProHacker, editNoobProHacker, getLastestNoobProHacker } from '@/apis/client/noobprohacker'
import { getAllArchitects } from '@/apis/client/architect'
import { NoobProHacker } from '@/types/content'
import { Architect } from '@/types/architect'

export const useNoobProHacker = () => {
  const [page, setPage] = useState(0)
  const [noobprohacker, setNoobProHacker] = useState<NoobProHacker>(initialNoobProHacker)

  const { data: architects } = useQuery<Architect[]>({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const { data: lastestNoobProHacker } = useQuery({
    queryKey: ['getLastestNoobProHacker'],
    queryFn: getLastestNoobProHacker,
  })

  const addMutation = useMutation({
    mutationKey: ['addNoobProHacker'],
    mutationFn: addNoobProHacker,
  })

  const editMutation = useMutation({
    mutationKey: ['editNoobProHacker'],
    mutationFn: editNoobProHacker,
  })

  useEffect(() => {
    if (!lastestNoobProHacker) return

    setNoobProHacker(
      produce((draft) => {
        draft['contentInfo']['episode'] = lastestNoobProHacker.contentInfo.episode + 1
      }),
    )
  }, [lastestNoobProHacker])

  const moveToNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const setNoobProhackerByFetchData = (noobprohacker: NoobProHacker) => {
    setNoobProHacker(
      produce((draft) => {
        draft['contentInfo'] = noobprohacker['contentInfo']
        draft['lineInfo'] = noobprohacker['lineInfo']
      }),
    )

    moveToNextPage()
  }

  const handleContentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as 'subject' | 'date' | 'youtube_url' | 'episode'

    if (key === 'episode') {
      setNoobProHacker(
        produce((draft) => {
          draft['contentInfo'][key] = parseInt(e.target.value)
        }),
      )
    } else {
      setNoobProHacker(
        produce((draft) => {
          draft['contentInfo'][key] = e.target.value
        }),
      )
    }
  }

  const handleMinecraftIdChange = (line: number, tier: number, minecraft_id: string) => {
    setNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][line].line_details[tier].minecraft_id = minecraft_id
      }),
    )
  }

  const handleArchitectIdSettingSubmit = () => {
    if (!validateInput(noobprohacker.lineInfo)) {
      toast.error('비어있는 입력창이 있습니다.')
      return
    }

    if (!validateDuplicate(noobprohacker.lineInfo)) {
      toast.error('아이디가 중복되어 있습니다.')
      return
    }

    moveToNextPage()
  }

  const handleImageSelectClick = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const BaseURL = `https://wakcraft.s3.ap-northeast-2.amazonaws.com/noobProHacker/episode ${noobprohacker.contentInfo.episode}/`

    setNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][index].line_details[0].image_url = BaseURL + e.target.value + '-noob.png'
      }),
    )

    setNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][index].line_details[1].image_url = BaseURL + e.target.value + '-pro.png'
      }),
    )

    setNoobProHacker(
      produce((draft) => {
        draft['lineInfo'][index].line_details[2].image_url = BaseURL + e.target.value + '-hacker.png'
      }),
    )
  }

  const handleImageSubmit = () => {
    if (!validateImage(noobprohacker.lineInfo)) {
      toast.error('이미지를 모두 채워주세요')
      return
    }

    moveToNextPage()
  }

  const handleLineInfoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.name === 'line_ranking') {
      setNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].line_ranking = parseInt(e.target.value)
        }),
      )
    } else {
      setNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].subject = e.target.value
        }),
      )
    }
  }

  const handleLineDetailChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, tier: number) => {
    if (e.target.name === 'ranking') {
      setNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].line_details[tier].ranking = parseInt(e.target.value)
        }),
      )
    } else {
      setNoobProHacker(
        produce((draft) => {
          draft['lineInfo'][index].line_details[tier].youtube_url = e.target.value
        }),
      )
    }
  }

  const addSubmit = () => {
    if (!validateSubject(noobprohacker.lineInfo)) {
      toast.error('주제를 모두 입력해주세요')
      return
    }


    if (!validateRanking(noobprohacker.lineInfo)) {
      toast.error('랭킹 값을 모두 입력해주세요')
      return
    }

    addMutation.mutate(noobprohacker)
  }

  const editSubmit = () => {
    if (!validateSubject(noobprohacker.lineInfo)) {
      toast.error('주제를 모두 입력해주세요')
      return
    }



    if (!validateRanking(noobprohacker.lineInfo)) {
      toast.error('랭킹 값을 모두 입력해주세요')
      return
    }

    editMutation.mutate(noobprohacker)
  }

  return {
    page,
    moveToNextPage,
    noobprohacker,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleArchitectIdSettingSubmit,
    handleImageSelectClick,
    handleImageSubmit,
    handleLineInfoChange,
    handleLineDetailChange,
    setNoobProhackerByFetchData,
    addSubmit,
    editSubmit,
  }
}

const initialNoobProHacker: NoobProHacker = {
  contentInfo: {
    episode: 0,
    subject: '자유',
    date: new Date().toISOString(),
    youtube_url: 'null',
  },
  lineInfo: Array.from({ length: 6 }, () => ({
    subject: '',
    line_ranking: 0,
    line_details: [
      {
        line: '눕',
        minecraft_id: '',
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
      {
        line: '프로',
        minecraft_id: '',
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
      {
        line: '해커',
        minecraft_id: '',
        youtube_url: 'null',
        image_url: '',
        ranking: 0,
      },
    ],
  })),
}

const validateInput = (lineInfo: NoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) =>
      Object.keys(line.line_details).map(() =>
        line.line_details.map((architecture) => architecture.minecraft_id !== ''),
      ),
    )
    .flat(2)
    .every((item) => item)
}

const validateDuplicate = (lineInfo: NoobProHacker['lineInfo']) => {
  return (
    Array.from(
      new Set(lineInfo.map((line) => line.line_details.map((architecture) => architecture.minecraft_id)).flat()),
    ).length === 18
  )
}

const validateImage = (lineInfo: NoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.line_details.map((tier) => tier.image_url !== ''))
    .flat()
    .every((item) => item)
}

const validateSubject = (lineInfo: NoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.subject !== '')
    .flat()
    .every((item) => item)
}

const validateLineRanking = (lineInfo: NoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.line_ranking !== 0)
    .flat()
    .every((item) => item)
}

const validateRanking = (lineInfo: NoobProHacker['lineInfo']) => {
  return lineInfo
    .map((line) => line.line_details[1].ranking !== 0 && line.line_details[2].ranking !== 0)
    .flat()
    .every((item) => item)
}
