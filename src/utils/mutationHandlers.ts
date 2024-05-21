import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { SERVICE_CODE } from '@/constants/serviceCode'
import { CommonApiResponse } from '@/types/api'

export const handleMutationError = (e: Error) => {
  const axiosError = e as AxiosError

  const { serviceCode, message, error } = axiosError.response?.data as CommonApiResponse

  if (!message) {
    toast.error(SERVICE_CODE[serviceCode])
  } else {
    toast.error(message)
  }
}

export const handleMutationSuccess = (data: unknown) => {
  const { serviceCode, message } = data as CommonApiResponse

  toast.success(message)
}
