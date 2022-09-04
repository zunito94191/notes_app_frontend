import axios from "axios";
import React, { useCallback } from "react";
import { NoteContext } from "../../../../App";
import { NotePropType } from "../../../../common/types";
import { useDebounce } from "../../../../common/debounce";
import "./index.css";

const TextArea = ({ note }: NotePropType) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const UpdateNoteBody = React.useContext(NoteContext);
  const debounceHandler = useDebounce<React.ChangeEvent<HTMLTextAreaElement>>(
    (e) => patchTitle(e.target.value),
    1000
  );
  const callbackDebouncer = useCallback(debounceHandler, [note.id]);

  const patchTitle = async (newBody: string) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/note/patchnote`,
      {
        id: note.id,
        body: newBody,
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

  const setNoteBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const body = e.target.value;
    UpdateNoteBody({ ...note, body });
    callbackDebouncer(e);
  };

  React.useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "100px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [note]);

  return (
    <textarea
      ref={textareaRef}
      className="text-area"
      disabled={note.readOnly ? true : false}
      value={note.body.length === 0 ? "" : note.body}
      onChange={setNoteBody}
    />
  );
};

export default TextArea;
