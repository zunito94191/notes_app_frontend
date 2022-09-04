import React from "react";
import { ModalProps } from "../types";
import "./index.css";

const Modal = ({  children }: ModalProps) => {
  return (
    <div className="modal-css">
      <div className="modal-main">{children}</div>
    </div>
  );
};

export default Modal;
