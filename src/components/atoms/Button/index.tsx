import { useMemo } from 'react'

import { TIER_COLOR_VARIENTS } from '@/constants/architect'
import { TierColor } from '@/types/architect'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      return TIER_COLOR_VARIENTS[color] + ' text-[white]'
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
