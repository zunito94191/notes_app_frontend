import axios from "axios";
import React, { useEffect, useState } from "react";
import { NoteType, SidebarHeaderProps } from "../../common/types";
import "./header.css";

export default function Header({
  addNote,
  removeNote,
  updateNote,
}: SidebarHeaderProps) {
  const [tapped, setTapped] = useState(0);
  const note: NoteType = {
    id: new Date().getTime(),
    title: "Untitled",
    body: "",
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
    users: [],
    readOnly: false,
  };

  useEffect(() => {
    if (tapped != 0){
      console.log("creating new note..", note.id)
      createNote();
    } 
  }, [tapped]);

  const btnHandler = () => {
    addNote(note);
    setTapped(prev=>prev+1);
  };
  const createNote = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/note/addnote`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log(res, res.data.data);
    if (res.status === 200) {
      note.id = res.data.data.id;
      updateNote(res.data.data.id);
    } else {
      removeNote();
    }
  };

  return (
    <div className="sidebar-add" style={{position:"sticky",top:"66px"}}>
      <p className="text">My Notes</p>
      <button className="btn-newnotes" onClick={btnHandler}>
        + NEW NOTE
      </button>
    </div>
  );
}
