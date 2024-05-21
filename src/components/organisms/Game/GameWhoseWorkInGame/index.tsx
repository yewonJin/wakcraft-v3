import Image from 'next/image'

import SearchResult from '@/components/molecules/SearchResult'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'

import useWhoseWorkGame from '@/hooks/useWhoseWorkGame'
import { Architect } from '@/types/architect'
import { Question } from '@/types/whoseWork'
import { renameTo1080Webp } from '@/utils/shared'

type Props = {
  architects: Architect[]
  questions: Question[]
  endGame: () => void
}

export default function GameWhoseWorkInGame({ architects, questions, endGame }: Props) {
  const {
    input,
    setInput,
    index,
    highlightedArchitects,
    showAnswer,
    handleInputChange,
    nextButtonRef,
    inputRef,
    handleKeyDown,
    moveToNextAnswer,
    onSubmit,
  } = useWhoseWorkGame(architects, questions, endGame)

  return (
    <div className="mt-0 sm:mt-8">
      {index < questions.length && (
        <div
          className={`relative mx-auto aspect-square h-full max-h-[60vh] max-w-[1200px] md:aspect-video xl:w-[60vw]`}
        >
          <Image
            alt="작품 이미지"
            priority
            style={{ objectFit: 'cover' }}
            sizes="1200px"
            fill
            src={renameTo1080Webp(questions[index]?.image_url)}
          />
          {questions[index + 1] && (
            <Image
              style={{ display: 'none' }}
              alt="작품 이미지"
              priority
              sizes="1200px"
              fill
              src={renameTo1080Webp(questions[index + 1]?.image_url)}
            />
          )}
        </div>
      )}
      {showAnswer ? (
        <div className="mx-auto flex h-[70px] w-full items-center justify-center gap-2 pt-8 text-lg text-text-secondary sm:w-[400px]">
          <p className="text-base">정답 :</p>
          <p className="text-text-primary">
            {architects.filter((architect) => architect.minecraft_id === questions[index].minecraft_id)[0].wakzoo_id}
          </p>
          <p className="text-base">
            {architects.filter((architect) => architect.minecraft_id === questions[index].minecraft_id)[0].minecraft_id}
          </p>
          <button
            ref={nextButtonRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                moveToNextAnswer()
              }
            }}
            onClick={() => moveToNextAnswer()}
            className={`ml-5 h-[48px] rounded-md border-2 border-background-secondary bg-background-secondary px-3 text-text-primary outline-none hover:bg-background-secondary [&>div]:rotate-180 [&>div>svg]:fill-text-secondary`}
          >
            <Icon type="arrow_back" />
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-8 flex max-w-[900px] justify-center gap-4">
          <div className="relative">
            <Input
              name="search"
              type="text"
              ref={inputRef}
              onKeyDown={handleKeyDown}
              handleInputChange={handleInputChange}
              value={input}
              width="280px"
              height="48px"
            />
            <SearchResult input={input} setInput={setInput} highlightedArchitects={highlightedArchitects} />
          </div>
          <button
            onClick={() => {
              if (highlightedArchitects.length > 1) return

              onSubmit()
            }}
            className={`rounded-md border-2 border-background-secondary px-3 ${
              input.toLowerCase() === highlightedArchitects[0]?.wakzoo_id.toLowerCase() ||
              input.toLowerCase() === highlightedArchitects[0]?.minecraft_id.toLowerCase() ||
              input === '?'
                ? 'bg-background-secondary text-text-primary [&>div>svg]:fill-text-secondary'
                : 'text-background-tertiary  hover:cursor-default [&>div>svg]:fill-background-secondary'
            } outline-none [&>div]:rotate-180 `}
          >
            <Icon type="arrow_back" />
          </button>
        </div>
      )}
    </div>
  )
}
