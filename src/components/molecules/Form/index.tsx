import Input from '@/components/atoms/Input'

type InputFormProps = {
  label: string
  placeholder?: string
  type?: string
  name: string
  value: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputForm = ({ label, type = 'text', name, value, placeholder, handleInputChange }: InputFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-secondary">{label}</label>
      <Input type={type} name={name} value={value} placeholder={placeholder} handleInputChange={handleInputChange} />
    </div>
  )
}
