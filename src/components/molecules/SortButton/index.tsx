import Icon from '../../atoms/Icon'

type Props = {
  text: string
  isClicked: boolean
  isDescending: boolean
  handleButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function SortButton(props: Props) {
  const { text, isClicked, isDescending, handleButtonClick, ...rest } = props

  return (
    <button
      onClick={handleButtonClick}
      className={`flex rounded-md bg-background-secondary p-2 px-3 text-text-secondary hover:cursor-pointer [&>svg]:h-6 [&>svg]:w-6  [&>div>svg]:duration-100 ${
        isClicked && !isDescending ? '[&>div>svg]:rotate-180' : ''
      } ${isClicked ? '[&>div>svg]:fill-white' : '[&>div>svg]:fill-text-tertiary'}`}
      style={{
        backgroundColor: isClicked ? '#881337' : '',
        color: isClicked ? 'white' : '',
      }}
      {...rest}
    >
      {text}
      <Icon type="arrow_down" width="24px" height="24px" />
    </button>
  )
}
