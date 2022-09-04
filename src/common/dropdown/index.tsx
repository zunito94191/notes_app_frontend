import React from "react";
import { DropdownProp, SelectType, StateSetter } from "../types";

const Dropdown = ({ options, setValue, value }: DropdownProp & StateSetter) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select className="dropdown-select" value={value} onChange={handleChange}>
      {options.map((option: SelectType,index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
