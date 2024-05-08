import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Architect, DetailedTier } from '@/types/architect'
import useSearch from '@/hooks/useSearch'
import { getAllArchitects, getArchitectByMinecraftId, updateArchitect } from '@/apis/client/architect'

type Input = {
  minecraft_id: string
  wakzoo_id: string
  tier: DetailedTier
}

export const useEditArchitect = () => {
  const { data: architects } = useQuery<Architect[]>({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const { input: searchInput, setInput: setSearchInput, highlightedArchitects } = useSearch(architects || [])

  const isExistedArchitect =
    !!searchInput &&
    (searchInput === highlightedArchitects[0]?.wakzoo_id || searchInput === highlightedArchitects[0]?.minecraft_id)

  const { data: architect } = useQuery<Architect>({
    queryKey: ['getArchitect', highlightedArchitects[0]?.minecraft_id],
    queryFn: () => getArchitectByMinecraftId(highlightedArchitects[0]?.minecraft_id),
    enabled: !!isExistedArchitect,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['updateArchitect'],
    mutationFn: () =>
      updateArchitect({
        beforeId: architect?.minecraft_id || '',
        afterId: input.minecraft_id,
        wakzoo_id: input.wakzoo_id,
        curTier: input.tier,
      }),
    onSuccess() {
      toast.success('변경 성공')
      queryClient.invalidateQueries({
        queryKey: ['getArchitect'],
      })
      queryClient.invalidateQueries({
        queryKey: ['getAllArchitects'],
      })
    },
  })

  const [input, setInput] = useState<Input>({
    minecraft_id: '',
    wakzoo_id: '',
    tier: '언랭',
  })

  useEffect(() => {
    if (!architect) return

    setInput((prev) => ({
      ...prev,
      minecraft_id: architect.minecraft_id,
      wakzoo_id: architect.wakzoo_id,
      tier: architect.curTier,
    }))
  }, [architect])

  useEffect(() => {
    if (searchInput !== '') return

    setInput((prev) => ({
      ...prev,
      minecraft_id: '',
      wakzoo_id: '',
      tier: '언랭',
    }))
  }, [searchInput])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInput((prev) => ({ ...prev, tier: e.target.value as DetailedTier }))
  }

  return {
    searchInput,
    setSearchInput,
    highlightedArchitects,
    architect,
    input,
    handleInputChange,
    handleSelectChange,
    mutation,
  }
}
