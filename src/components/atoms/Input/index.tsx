import { ForwardedRef, forwardRef } from 'react'

type Props = {
  name: string
  value: string | number
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
  height?: string
  [key: string]: any
}

function Input(props: Props, ref?: ForwardedRef<HTMLInputElement>) {
  const { name, value, type = 'text', placeholder, handleInputChange, width, height, ...rest } = props

  return (
    <input
      ref={ref}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      {...rest}
      className={`h-[40px] w-full rounded-md border-2 border-background-tertiary bg-background-primary pl-3 text-text-secondary outline-none`}
      style={{ width: width || '', height: height || '' }}
    />
  )
}

Input.displayName = 'Input'

export default forwardRef<HTMLInputElement, Props>(Input)
