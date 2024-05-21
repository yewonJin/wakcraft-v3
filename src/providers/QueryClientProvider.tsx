'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { handleMutationError, handleMutationSuccess } from '@/utils/mutationHandlers'

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: handleMutationError,
      onSuccess: handleMutationSuccess,
    },
    queries: {
      staleTime: 5000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={defaultQueryClient}>{children}</QueryClientProvider>
}
