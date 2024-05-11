import { ChangeEvent, KeyboardEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Schedule } from '@/types/schedule'
import { getDateString } from '@/utils/shared'
import { addSchedule, editSchedule, getAllSchedules } from '@/apis/client/schedule'

const initialSchedule: Schedule = {
  status: 'before_announcement',
  isTributeContent: false,
  date: getDateString(new Date()),
  content: '',
  title: '',
  episode: 0,
  participants: [],
  announcement_link: '',
  youtube_link: '',
}

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule)

  const [isEdit, setIsEdit] = useState(false)

  const { data: schedules } = useQuery<Schedule[]>({ queryKey: ['getAllSchedules'], queryFn: getAllSchedules })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationKey: ['addSchedule'],
    mutationFn: () => addSchedule(schedule),
    onSuccess() {
      toast.success('추가 성공')
      queryClient.invalidateQueries({ queryKey: ['getAllSchedules'] })
      setSchedule(initialSchedule)
    },
  })

  const editMutation = useMutation({
    mutationKey: ['editSchedule'],
    mutationFn: () => editSchedule(schedule),
    onSuccess() {
      toast.success('수정 성공')
      queryClient.invalidateQueries({ queryKey: ['getAllSchedules'] })
      setSchedule(initialSchedule)
    },
  })

  const handleEditClick = (index: number) => {
    if (!schedules) return

    setSchedule(schedules[index])

    setIsEdit(true)
  }

  const handleSubmit = () => {
    if (isEdit) {
      editMutation.mutate()
      setIsEdit(false)
      return
    }

    addMutation.mutate()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'episode' ? parseInt(e.target.value) : e.target.value

    setSchedule((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'isTributeContent') {
      setSchedule((prev) => ({
        ...prev,
        isTributeContent: e.target.value === 'true' ? true : false,
      }))
      return
    }

    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return {
    isEdit,
    schedule,
    schedules,

    handleInputChange,
    handleSelectChange,
    handleEditClick,
    handleSubmit,
  }
}
