import axios from "axios";
import React, { useCallback } from "react";
import { NoteContext } from "../../../../App";
import { NotePropType } from "../../../../common/types";
import { useDebounce } from "../../../../common/debounce";
import "./index.css";

const TitleArea = ({ note }: NotePropType) => {
  const UpdateTitle = React.useContext(NoteContext);
  const debounceHandler = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    (e) => patchTitle(e.target.value),
    1000
  );
  const callbackDebouncer = useCallback(debounceHandler, [note.id]);

  const patchTitle = async (title: string) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/note/patchnote`,
      {
        id: note.id,
        title: title,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log(res);
    if (res.status === 200) {
    }
  };

  const setNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle: string = e.target.value;
    UpdateTitle({ ...note, title: newTitle });
    callbackDebouncer(e);
  };
  
  return (
    
    <input
      className="title-area"
      value={note.title}
      disabled={note.readOnly ? true : false}
      onChange={setNoteTitle}
    />
  );
};

export default TitleArea;
