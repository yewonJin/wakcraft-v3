import { ChangeEvent, KeyboardEvent, useEffect } from 'react'

import useSearch from '@/hooks/useSearch'
import { Architect } from '@/types/architect'

type Props = {
  architects: Architect[]
  handleMinecraftIdChange: (line: number, tier: number, minecraft_id: string) => void
  lineIndex: number
  lineDetailIndex: number
}

export const useSearchArchitect = (props: Props) => {
  const { architects, handleMinecraftIdChange, lineIndex, lineDetailIndex } = props

  const { input, setInput, highlightedArchitects } = useSearch(architects)

  useEffect(() => {
    if (input === highlightedArchitects[0]?.minecraft_id || input === highlightedArchitects[0]?.wakzoo_id) {
      handleMinecraftIdChange(lineIndex, lineDetailIndex, highlightedArchitects[0].minecraft_id)
    }
  }, [input])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (input === '') return

    if (e.key === 'Tab') {
      if (!highlightedArchitects[0]) return

      setInput(highlightedArchitects[0].wakzoo_id)

      handleMinecraftIdChange(lineIndex, lineDetailIndex, highlightedArchitects[0].minecraft_id)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)

    if (!highlightedArchitects[0]) return

    if (input === highlightedArchitects[0].minecraft_id || input === highlightedArchitects[0].wakzoo_id) {
      handleMinecraftIdChange(lineIndex, lineDetailIndex, highlightedArchitects[0].minecraft_id)

      return
    }
  }

  return {
    input,
    setInput,
    highlightedArchitects,
    handleInputChange,
    handleKeyDown,
  }
}
