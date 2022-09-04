import React from "react";
import { DropdownProp, InputType, SelectType, StateSetter } from "../types";
import "./index.css";

export default function SendInvite({
  label,
  type,
  currentValue,
  setterFunction,
  options,
  setValue,
  value,
}: InputType & DropdownProp & StateSetter) {
  return (
    <div className="send-invite">
      <input
        type="text"
        placeholder={label}
        value={currentValue}
        onChange={(e) => setterFunction(e.target.value)}
      />
      <div className="select-wrapper">
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {options.map((option: SelectType) => (
            <option className="invite-options" value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
