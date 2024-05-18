import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { getAllArchitects, getArchitectByMinecraftId, updateArchitect } from '@/apis/client/architect'
import useSearch from '@/hooks/useSearch'
import { defaultQueryClient } from '@/providers/QueryClientProvider'
import { Architect, DetailedTier } from '@/types/architect'

type Input = {
  minecraft_id: string
  wakzoo_id: string
  tier: DetailedTier
}

export const useEditArchitect = () => {
  const { data: architects } = useQuery({
    queryKey: ['getAllArchitects'],
    queryFn: getAllArchitects,
  })

  const { input: searchInput, setInput: setSearchInput, highlightedArchitects } = useSearch(architects || [])

  const isExistedArchitect =
    !!searchInput &&
    (searchInput === highlightedArchitects[0]?.wakzoo_id || searchInput === highlightedArchitects[0]?.minecraft_id)

  const { data: architect } = useQuery<Architect>({
    queryKey: ['getArchitectById', highlightedArchitects[0]?.minecraft_id],
    queryFn: () => getArchitectByMinecraftId(highlightedArchitects[0]?.minecraft_id),
    enabled: !!isExistedArchitect,
  })

  const mutation = useMutation({
    mutationKey: ['updateArchitect'],
    mutationFn: updateArchitect,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput((prev) => ({ ...prev, tier: e.target.value as DetailedTier }))
  }

  const handleButtonClick = () => {
    mutation.mutate(
      {
        beforeId: architect!.minecraft_id,
        afterId: input.minecraft_id,
        wakzoo_id: input.wakzoo_id,
        curTier: input.tier,
      },
      {
        onSuccess: () => {
          defaultQueryClient.invalidateQueries({
            queryKey: ['getArchitectById'],
          })
          defaultQueryClient.invalidateQueries({
            queryKey: ['getAllArchitects'],
          })
        },
      },
    )
  }

  return {
    searchInput,
    setSearchInput,
    highlightedArchitects,
    architect,
    input,
    handleInputChange,
    handleSelectChange,
    handleButtonClick,
  }
}
