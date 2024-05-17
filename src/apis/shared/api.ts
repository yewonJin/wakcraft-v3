import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { CommonApiResponse, CommonApiResponseWithData } from '@/types/api'

const defaultInstance = axios.create({ baseURL: '/api' })

const authInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonApiResponseWithData<T>>> => {
  const response = await defaultInstance.get(url, config)
  return response
}

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonApiResponse>> => {
  const response = await authInstance.post(url, data, config)
  return response
}

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonApiResponse>> => {
  const response = await authInstance.patch(url, data, config)
  return response
}

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonApiResponse>> => {
  const response = await authInstance.put(url, data, config)
  return response
}
