import React from "react";
import InputBox from "./InputBox";

interface FilterInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, onChangeText, placeholder }) => {
  return (
    <InputBox
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      leftIcon={require('../../assets/search-normal.png')}
      className="ps-2"
      maxLength={20}
    />
  );
};

export default FilterInput;
