import { useRouter } from 'next/navigation'
import { produce } from 'immer'
import { useState, ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { login } from '@/apis/client/login'

const useLogin = () => {
  const router = useRouter()

  const [input, setInput] = useState({
    id: '',
    password: '',
  })

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: () => login(input.id, input.password),
    onSuccess() {
      toast.success('로그인 성공')

      router.push('/admin')
    },
    onError() {
      toast.error('로그인 실패')
    },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const keys = e.target.name as 'id' | 'password'

    setInput(
      produce((draft) => {
        draft[keys] = e.target.value
      }),
    )
  }

  return { input, mutation, handleInputChange }
}

export default useLogin
