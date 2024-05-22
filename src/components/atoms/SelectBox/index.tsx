interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[] | number[]
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  optionSuffix?: string
}

export default function SelectBox(props: Props) {
  const { value, options, handleSelectChange, name, optionSuffix, ...rest } = props

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      name={name}
      className="rounded-md border-2 border-background-tertiary bg-background-primary pl-2 text-text-secondary outline-none"
      {...rest}
    >
      {options.map((option) => (
        <option className="bg-background-primary hover:cursor-pointer" value={option} key={option}>
          {`${option}${optionSuffix ? optionSuffix : ''}`}
        </option>
      ))}
    </select>
  )
}
