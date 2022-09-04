import React from "react";
import { HyperType } from "../types";
import "./index.css";

export default function HyperLinkText({ label, authFunction, color,location}: HyperType) {
  return (
    <div className="hyperlink-main2" style={{color: color}} onClick={() =>authFunction(location)}>
      {label}
    </div>
  );
}
