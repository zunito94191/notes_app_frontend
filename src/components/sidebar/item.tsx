import React from "react";
import "./item.css";
import { ItemType } from "../../common/types";

export default function Item({ title, body, date, isActive }: ItemType) {
  return (
    <div className={"notes-widget" + (isActive ? " selected" : "")}>
      <div className="notes-date">{date}</div>
      <div className="notes-title truncate">{title}</div>
      <div className="notes-body truncate">{body}</div>
    </div>
  );
}
