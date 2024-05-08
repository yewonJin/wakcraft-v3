import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useQueryString = (query: string) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const queryString = searchParams.get(query)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const resetQueryString = () => {
    router.push(pathname)
  }

  const setQueryString = (value: string) => {
    router.push(pathname + '?' + createQueryString(query, value))
  }

  return { queryString, resetQueryString, setQueryString }
}
