import React from 'react'

import Input from '@/components/atoms/Input'
import { Architect } from '@/types/architect'
import SearchResult from '../SearchResult'
import { useSearchArchitect } from '@/hooks/Admin/useSearchArchitect'

type Props = {
  lineIndex: number
  lineDetailIndex: number
  architects: Architect[]
  handleMinecraftIdChange: (lineIndex: number, lineDetailIndex: number, minecraft_id: string) => void
}

function SearchArchitect(props: Props) {
  const { input, setInput, highlightedArchitects, handleInputChange, handleKeyDown } = useSearchArchitect(props)
  return (
    <div
      className={`relative ${
        input === highlightedArchitects[0]?.wakzoo_id || input === highlightedArchitects[0]?.minecraft_id
          ? '[&>input]:bg-background-tertiary'
          : ''
      }`}
    >
      <Input
        type="text"
        name="architect"
        value={input}
        placeholder="검색..."
        handleInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchResult input={input} setInput={setInput} highlightedArchitects={highlightedArchitects} />
    </div>
  )
}

export default React.memo(SearchArchitect)
