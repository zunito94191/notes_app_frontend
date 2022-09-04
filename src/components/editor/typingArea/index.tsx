import React from "react";
import { NotePropType, StateSetter } from "../../../common/types";
import NoteOverView from "./noteOverview";
import TextArea from "./textarea";
import TitleArea from "./titleArea";
import "./index.css"
import BackButton from "../../../common/back-button";

export default function TypingArea({note, setValue}: NotePropType & StateSetter) {
  const width = window.innerWidth;
  return (
    <div className={width< 768 ? "mobile-typing-area":"typing-area"}>
      {width < 768 ? 
      <div className="overview-row"> 
        <div onClick={()=> setValue(true)}><BackButton /></div>
        <TitleArea note={note}/> 
      </div>
      : 
      <TitleArea note={note}/> 
    } 
      
      <NoteOverView note={note}/>
      <TextArea note={note}/>
    </div>
  );
}
