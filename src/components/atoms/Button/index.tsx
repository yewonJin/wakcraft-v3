import { useMemo } from 'react'

type Props = {
  name?: string
  text: string
  isClicked?: boolean
  color?: TierColor
  handleButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ handleButtonClick, isClicked, name, text, color, ...rest }: Props) {
  const getColor = useMemo(() => {
    if (!color && !isClicked) {
      return 'bg-background-secondary text-text-secondary hover:bg-background-tertiary'
    }

    if (!color) {
      return 'bg-text-secondary text-background-secondary'
    }

    if (color && isClicked) {
      return colorVariants[color] + ' text-[white]'
    }

    return 'bg-background-primary  text-text-primary'
  }, [color, isClicked])

  return (
    <button
      name={name}
      onClick={handleButtonClick}
      className={`rounded-md text-center duration-300 py-2 px-4 hover:cursor-pointer ${getColor}`}
      {...rest}
    >
      {text}
    </button>
  )
}

export type TierColor = 'pink' | 'violet' | 'cyan' | 'amber' | 'slate' | 'yellow'

const colorVariants: { [key in TierColor]: string } = {
  pink: 'bg-pink-500',
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
  amber: 'bg-amber-500',
  slate: 'bg-slate-500',
  yellow: 'bg-yellow-500',
}
