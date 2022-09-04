import React from "react";
import { InputType } from "../types";
import "./index.css";

export default function InputField({
  label,
  type,
  currentValue,
  setterFunction,
}: InputType) {


  const handleChange = (newValue: string) => {
    setterFunction((prev) => newValue);
  };

  return (
    <input
      type={type}
      className="input-field1"
      placeholder={label}
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
