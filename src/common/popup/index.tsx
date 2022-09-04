import React from "react";
import { ModalProps } from "../types";
import "./index.css";

export const Popup = ({ show, children }: ModalProps) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  return (
    <div className={showHideClassName}>
      <div className="popup-main">{children}</div>
    </div>
  );
};
