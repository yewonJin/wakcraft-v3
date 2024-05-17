import { ChangeEvent, MouseEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { addArchitect } from '@/apis/client/architect'
import { defaultQueryClient } from '@/providers/QueryClientProvider'

type Input = {
  minecraft_id: string
  wakzoo_id: string
}

export const useAddArchitect = () => {
  const [input, setInput] = useState<Input>({
    minecraft_id: '',
    wakzoo_id: '',
  })

  const mutation = useMutation({
    mutationKey: ['addArchitect'],
    mutationFn: addArchitect,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (input.minecraft_id === '' || input.wakzoo_id === '') {
      toast.error('아이디를 입력해주세요')
      return
    }

    mutation.mutate(input, {
      onSuccess: () => {
        defaultQueryClient.invalidateQueries({ queryKey: ['getAllArchitects'] })
        setInput({ minecraft_id: '', wakzoo_id: '' })
      },
    })
  }

  return { input, handleInputChange, handleButtonClick }
}
