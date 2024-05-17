import { Post } from '@/apis/shared/api'

export const login = async ({ id, password }: { id: string; password: string }) => {
  const { data } = await Post('auth', { id, password })

  return data
}
