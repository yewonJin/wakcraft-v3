import Input from '@/components/atoms/Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputForm = ({ label, handleInputChange, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-secondary">{label}</label>
      <Input handleInputChange={handleInputChange} {...rest} />
    </div>
  )
}
