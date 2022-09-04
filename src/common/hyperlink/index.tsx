import React from "react";
import { ButtonPropType } from "../types";
import "./index.css";

export default function HyperLinkText({ label, authFunction, color}: ButtonPropType) {
  return (
    <div className="hyperlink-main1" style={{color: color}} onClick={() => authFunction()}>
      {label}
    </div>
  );
}
