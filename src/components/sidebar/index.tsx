import "./index.css";
import Header from "./header";
import Item from "./item";
import React from "react";
import { PropType } from "../../common/types";

export default function Sidebar({
  notes,
  setActiveNote,
  activeIndex,
  addNote,
  removeNote,
  updateNote,
}: PropType) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const width = window.innerWidth;
  return (
    <div className={width<768? "mobile-main-view":"sidebar-main"}>
      <Header
        addNote={addNote}
        removeNote={removeNote}
        updateNote={updateNote}
      />
      <div className="note-display">
      {notes.map((note, index) => (
        <div
          onClick={(e) => setActiveNote(note, index)}
          key={note.id.toString()}
        >
          <Item
            title={note.title.length === 0 ? "Untitled Note" : note.title}
            body={note.body ?? ""}
            date={
              new Date(note.createdAt.toString()).getDate() +
              " " +
              monthNames[new Date(note.createdAt.toString()).getMonth()]
                .substring(0, 3)
                .toUpperCase()
            }
            isActive={index === activeIndex}
          />
        </div>
      ))}
      </div>
    </div>
  );
}
