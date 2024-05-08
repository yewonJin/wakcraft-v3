type Props = {
  value: string | number;
  options: string[] | number[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  optionSuffix?: string;
  width?: string;
  height?: string;
};

export default function SelectBox(props: Props) {
  const {
    value,
    options,
    handleSelectChange,
    name,
    optionSuffix,
    width,
    height,
  } = props;

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      name={name}
      className="rounded-md border-2 border-background-tertiary bg-background-primary pl-2 text-text-secondary outline-none"
      style={{ width: width, height: height }}
    >
      {options.map((option) => (
        <option
          className="bg-background-primary hover:cursor-pointer"
          value={option}
          key={option}
        >
          {`${option}${optionSuffix ? optionSuffix : ""}`}
        </option>
      ))}
    </select>
  );
}
