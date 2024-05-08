import Add from '../../../../public/assets/icons/add.svg'
import ArrowBack from '../../../../public/assets/icons/arrow_back.svg'
import ArrowDown from '../../../../public/assets/icons/arrow_down.svg'
import ArrowDropUp from '../../../../public/assets/icons/arrow_drop_up.svg'
import ArrowUpWard from '../../../../public/assets/icons/arrow_upward.svg'
import Close from '../../../../public/assets/icons/close.svg'
import Group from '../../../../public/assets/icons/group.svg'
import Link from '../../../../public/assets/icons/link.svg'
import Menu from '../../../../public/assets/icons/menu.svg'
import Moon from '../../../../public/assets/icons/moon.svg'
import Pause from '../../../../public/assets/icons/pause.svg'
import PlayArrow from '../../../../public/assets/icons/play_arrow.svg'
import Search from '../../../../public/assets/icons/search.svg'
import Sun from '../../../../public/assets/icons/sun.svg'

type Props = {
  type: IconType
  width?: string
  height?: string
  backgroundColorOnHover?: boolean
  pointerOnHover?: boolean
}

type IconType =
  | 'add'
  | 'arrow_back'
  | 'arrow_down'
  | 'arrow_drop_up'
  | 'arrow_upward'
  | 'close'
  | 'moon'
  | 'group'
  | 'sun'
  | 'link'
  | 'menu'
  | 'pause'
  | 'play_arrow'
  | 'search'

const icons: { [key in IconType]: any } = {
  add: <Add />,
  arrow_back: <ArrowBack />,
  arrow_down: <ArrowDown />,
  arrow_drop_up: <ArrowDropUp />,
  arrow_upward: <ArrowUpWard />,
  close: <Close />,
  group: <Group />,
  link: <Link />,
  menu: <Menu />,
  moon: <Moon />,
  pause: <Pause />,
  play_arrow: <PlayArrow />,
  search: <Search />,
  sun: <Sun />,
}

export default function Icon({ type, width, height, backgroundColorOnHover, pointerOnHover }: Props) {
  return (
    <div
      className={`w-7 h-7 [&>svg]:h-full [&>svg]:w-full flex justify-center items-center fill-text-primary ${
        backgroundColorOnHover ? 'hover:fill-text-tertiary' : ''
      } ${pointerOnHover ? 'hover:cursor-pointer' : ''} `}
      style={{ width: width || '', height: height || '' }}
    >
      {icons[type]}
    </div>
  )
}
