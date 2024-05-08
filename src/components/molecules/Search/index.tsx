import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";

type Props = {
  name: string;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ name, value, handleInputChange }: Props) {
  return (
    <div className="flex justify-center items-center relative">
      <Input
        name={name}
        value={value}
        placeholder="검색하세요..."
        handleInputChange={handleInputChange}
      />
      <div className="absolute right-3">
        <Icon type="search" width="24px" height="24px" />
      </div>
    </div>
  );
}
