import { Dispatch, Fragment, SetStateAction } from 'react'

import { SearchedArchitect } from '@/types/architect'

type Props = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  highlightedArchitects: SearchedArchitect[]
}

export default function SearchResult(props: Props) {
  const { input, highlightedArchitects, setInput } = props

  return (
    <Fragment>
      {input && highlightedArchitects[0]?.wakzoo_id !== input && (
        <div className="border-b-none absolute z-10 mx-auto flex max-h-[20vh] w-full flex-col overflow-y-scroll border-l-2 border-background-tertiary bg-background-secondary sm:max-h-[300px]">
          {highlightedArchitects.map((architect) => (
            <div
              key={architect.minecraft_id}
              onClick={() => setInput(architect.wakzoo_id)}
              className="flex  items-center gap-3 border-b-2 border-background-tertiary bg-background-primary pb-2 pl-3 pt-2 hover:cursor-pointer md:gap-2"
            >
              <p className="text-sm text-text-primary sm:text-base ">
                {!input || architect.wakzooIdIndexArr.includes(-1)
                  ? architect.wakzoo_id
                  : architect.wakzoo_id.split('').map((char: string, index: number) => {
                      if (architect.wakzooIdIndexArr.includes(index)) {
                        return (
                          <span key={char + index} className="text-[#d97706]">
                            {char}
                          </span>
                        )
                      }

                      return <span key={char + index}>{char}</span>
                    })}
              </p>
              <p className="text-xs text-text-secondary sm:text-sm">
                {!input || architect.minecraftIdIndexArr.includes(-1)
                  ? architect.minecraft_id
                  : architect.minecraft_id.split('').map((char: string, index: number) => {
                      if (architect.minecraftIdIndexArr.includes(index)) {
                        return (
                          <span key={char + index} className="text-[#d97706]">
                            {char}
                          </span>
                        )
                      }

                      return <span key={char + index}>{char}</span>
                    })}
              </p>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  )
}
