import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default forwardRef<HTMLInputElement, Props>(function Input({ handleInputChange, ...rest }, ref) {
  return (
    <input
      ref={ref}
      onChange={handleInputChange}
      className={`h-[40px] w-full rounded-md border-2 border-background-tertiary bg-background-primary pl-3 text-text-secondary outline-none`}
      {...rest}
    />
  )
})
