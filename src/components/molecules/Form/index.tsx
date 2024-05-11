import Input from '@/components/atoms/Input'

type InputFormProps = {
  label: string
  placeholder?: string
  type?: string
  name: string
  value: string | number
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
  height?: string
}

export const InputForm = ({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  handleInputChange,
  width,
  height,
}: InputFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-secondary">{label}</label>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        handleInputChange={handleInputChange}
        width={width}
        height={height}
      />
    </div>
  )
}
