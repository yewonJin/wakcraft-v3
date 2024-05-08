import { ChangeEvent, useState } from 'react'

import { Architect } from '@/types/architect'
import { fuzzySearch, fuzzySearchRegExp } from '@/utils/fuzzySearch'

const useSearch = (architects: Architect[]) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const resetInput = () => {
    setInput('')
  }

  const generateIndexOfMatches = (id: string) => {
    const inputCharArr = input.toLowerCase().split('')

    const indexArr: number[] = []

    let i = 0

    inputCharArr.forEach((inputChar) => {
      if (inputChar.match(/[ㄱ-힣]/g)) {
        const result = id.match(fuzzySearchRegExp(inputChar))

        if (!result) return

        indexArr.push(result.index as number)
      }

      i = id.toLowerCase().indexOf(inputChar, i)
      indexArr.push(i++)
    })

    return indexArr
  }

  const filterByFuzzySearch = (arr: Architect[]) => {
    return arr.filter(
      (item) =>
        fuzzySearch(item.minecraft_id.toLowerCase(), input.toLowerCase()) ||
        fuzzySearch(item.wakzoo_id.toLowerCase(), input.toLowerCase()),
    )
  }

  const highlighting = (arr: Architect[]) => {
    return arr
      .map((architect) => ({
        ...architect,
        minecraftIdIndexArr: generateIndexOfMatches(architect.minecraft_id),
        wakzooIdIndexArr: generateIndexOfMatches(architect.wakzoo_id),
      }))
      .sort((a, b) => {
        if (a.minecraftIdIndexArr.includes(-1)) {
          return parseInt(a.wakzooIdIndexArr.join('')) - parseInt(b.minecraftIdIndexArr.join(''))
        }

        return parseInt(a.minecraftIdIndexArr.join('')) - parseInt(b.minecraftIdIndexArr.join(''))
      })
  }

  const highlightedArchitects = highlighting(filterByFuzzySearch(architects))

  return {
    input,
    setInput,
    handleInputChange,
    resetInput,
    highlightedArchitects,
  }
}

export default useSearch
