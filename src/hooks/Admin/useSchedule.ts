import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { addSchedule, editSchedule, getAllSchedules } from '@/apis/client/schedule'
import { defaultQueryClient } from '@/providers/QueryClientProvider'
import { Schedule } from '@/types/schedule'
import { getDateString } from '@/utils/shared'

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

  const { data: schedules } = useQuery({ queryKey: ['getAllSchedules'], queryFn: getAllSchedules })

  const addMutation = useMutation({
    mutationKey: ['addSchedule'],
    mutationFn: addSchedule,
  })

  const editMutation = useMutation({
    mutationKey: ['editSchedule'],
    mutationFn: editSchedule,
  })

  const handleEditClick = (index: number) => {
    if (!schedules) return

    setSchedule(schedules[index])

    setIsEdit(true)
  }

  const handleSubmit = () => {
    if (isEdit) {
      editMutation.mutate(schedule, {
        onSuccess: (data) => {
          toast.success(data.message)
          defaultQueryClient.invalidateQueries({ queryKey: ['getAllSchedules'] })
          setSchedule(initialSchedule)
        },
      })
      setIsEdit(false)
      return
    }

    addMutation.mutate(schedule, {
      onSuccess: (data) => {
        toast.success(data.message)
        defaultQueryClient.invalidateQueries({ queryKey: ['getAllSchedules'] })
        setSchedule(initialSchedule)
      },
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'episode' ? parseInt(e.target.value) : e.target.value

    setSchedule((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
