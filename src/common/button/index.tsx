import React from "react";
import { ButtonPropType } from "../types";
import "./index.css";

export default function Button({ label, authFunction }: ButtonPropType) {
  return (
    <button className="button-main" onClick={() => authFunction()}>
      {label}
    </button>
  );
}
