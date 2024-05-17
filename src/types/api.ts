export type CommonApiResponse = {
  serviceCode: number
  message: string
  error?: unknown
}

export interface CommonApiResponseWithData<T> extends CommonApiResponse {
  data: T
}
