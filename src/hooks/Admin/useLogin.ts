import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { produce } from 'immer'
import { useMutation } from '@tanstack/react-query'

import { login } from '@/apis/client/login'

const useLogin = () => {
  const router = useRouter()

  const [input, setInput] = useState({
    id: '',
    password: '',
  })

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const keys = e.target.name as 'id' | 'password'

    setInput(
      produce((draft) => {
        draft[keys] = e.target.value
      }),
    )
  }

  const handleButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutation.mutate(input, {
      onSuccess: () => {
        router.push('/admin')
      },
    })
  }

  return { input, handleButtonClick, handleInputChange }
}

export default useLogin
