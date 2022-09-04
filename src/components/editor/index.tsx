import React from "react";
import { AuthLogout, NotePropType, StateSetter } from "../../common/types";
import ActionBar from "./actionBar";
import "./index.css";
import TypingArea from "./typingArea";

export default function Editor({ note, setValue,logout }: NotePropType & StateSetter&AuthLogout) {
  const width = window.innerWidth;
  return (
    <div className={width< 768 ? "mobile-editor": "editor-title" } >
      <ActionBar note={note}/>
      <TypingArea note={note} setValue={setValue}/>
    </div>
  );
}
