import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import toast from 'react-hot-toast'

import { getAllArchitects } from '@/apis/client/architect'
import { Architect } from '@/types/architect'
import { ArchitectureContest } from '@/types/content'
import { addArchitectureContest, editArchitectureContest } from '@/apis/client/architectureContest'

export const useArchitectureContest = () => {
  const [page, setPage] = useState(0)

  const [architectureContest, setArchitectureContest] = useState<ArchitectureContest>(initialArchitectureContest)

  const { data: architects } = useQuery<Architect[]>({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const addMutation = useMutation({
    mutationKey: ['addArchitectureContest'],
    mutationFn: () => addArchitectureContest(architectureContest),
    onSuccess() {
      toast.success('건축 콘테스트 추가 성공')
    },
  })

  const editMutation = useMutation({
    mutationKey: ['editArchitectureContest'],
    mutationFn: () => editArchitectureContest(architectureContest),
    onSuccess() {
      toast.success('건축 콘테스트 수정 성공')
    },
  })

  const moveToNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const setArchitectureContestByFetchData = (architectureContest: ArchitectureContest) => {
    setArchitectureContest(
      produce((draft) => {
        draft['contentInfo'] = architectureContest['contentInfo']
        draft['lineInfo'] = architectureContest['lineInfo']
      }),
    )

    moveToNextPage()
  }

  const handleContentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as 'subject' | 'date' | 'youtube_url' | 'episode'

    if (key === 'episode') {
      setArchitectureContest(
        produce((draft) => {
          draft['contentInfo'][key] = parseInt(e.target.value)
        }),
      )
    } else {
      setArchitectureContest(
        produce((draft) => {
          draft['contentInfo'][key] = e.target.value
        }),
      )
    }
  }

  const handleMinecraftIdChange = (line: number, tier: number, minecraft_id: string) => {
    setArchitectureContest(
      produce((draft) => {
        draft['lineInfo'][line].line_details[tier].minecraft_id = minecraft_id
      }),
    )
  }

  const handleArchitectIdSettingSubmit = () => {
    if (!validateInput(architectureContest.lineInfo)) {
      toast.error('비어있는 입력창이 있습니다.')
      return
    }

    if (!validateDuplicate(architectureContest.lineInfo)) {
      toast.error('아이디가 중복되어 있습니다.')
      return
    }

    moveToNextPage()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, lineIndex: number, lineDetailIndex: number) => {
    setArchitectureContest(
      produce((draft) => {
        draft['lineInfo'][lineIndex].line_details[lineDetailIndex].image_url = e.target.value
      }),
    )
  }

  const handleImageSubmit = () => {
    moveToNextPage()
  }

  const handleLineDetailChange = (e: ChangeEvent<HTMLInputElement>, index: number, tier: number) => {
    if (e.target.name === 'ranking') {
      setArchitectureContest(
        produce((draft) => {
          draft['lineInfo'][index].line_details[tier].ranking = parseInt(e.target.value)
        }),
      )
    } else {
      setArchitectureContest(
        produce((draft) => {
          draft['lineInfo'][index].line_details[tier][e.target.name as 'youtube_url' | 'topText' | 'bottomText'] =
            e.target.value
        }),
      )
    }
  }

  const addSubmit = () => {
    addMutation.mutate()
  }

  const editSubmit = () => {
    editMutation.mutate()
  }

  return {
    page,
    moveToNextPage,
    architectureContest,
    handleContentInfoChange,
    architects,
    handleMinecraftIdChange,
    handleArchitectIdSettingSubmit,
    handleImageChange,
    handleImageSubmit,
    handleLineDetailChange,
    setArchitectureContestByFetchData,
    addSubmit,
    editSubmit,
  }
}

const initialArchitectureContest: ArchitectureContest = {
  contentInfo: {
    episode: 0,
    subject: '자유',
    date: new Date().toISOString(),
    youtube_url: 'null',
  },
  lineInfo: Array.from({ length: 7 }, () => ({
    subject: '',
    line: '',
    line_ranking: 0,
    line_details: Array.from({ length: 7 }, () => ({
      topText: '',
      bottomText: '',
      minecraft_id: '',
      youtube_url: 'null',
      image_url: '',
      ranking: 0,
    })),
  })),
}

const validateInput = (lineInfo: ArchitectureContest['lineInfo']) => {
  return lineInfo
    .map((line) =>
      Object.keys(line.line_details).map(() =>
        line.line_details.map((architecture) => architecture.minecraft_id !== ''),
      ),
    )
    .flat(2)
    .every((item) => item)
}

const validateDuplicate = (lineInfo: ArchitectureContest['lineInfo']) => {
  return (
    Array.from(
      new Set(lineInfo.map((line) => line.line_details.map((architecture) => architecture.minecraft_id)).flat()),
    ).length ===
    lineInfo.length * lineInfo[0].line_details.length -
      lineInfo
        .map((line) => line.line_details.map((architecture) => architecture.minecraft_id === 'admin'))
        .flat()
        .filter((x) => x).length +
      1
  )
}
