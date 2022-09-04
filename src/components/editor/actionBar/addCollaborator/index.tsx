import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "../../../../common/button";
import Collaborator from "../../../../common/collaborator";
import { Popup } from "../../../../common/popup";
import {
  NotePropType,
  SelectType,
  StateSetter,
} from "../../../../common/types";
import "./index.css";
import SendInvite from "../../../../common/sendInvite";
import { NoteContext } from "../../../../App";
import axios from "axios";

export default function AddCollaborator({
  note,
  setValue,
}: NotePropType & StateSetter) {
  const [email, setEmail] = useState("");
  const [tapped, setTapped] = useState("Send Invite");
  const [access, setAccess] = useState("view");
  const ref = useRef<any>();
  const user = JSON.parse(
    localStorage.getItem("user") ?? '{"name": "", "photo": ""}'
  );
  const setActiveNote = useContext(NoteContext);
  const options: SelectType[] = [
    {
      label: "Can view",
      value: "view",
    },
    {
      label: "Can edit",
      value: "edit",
    },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setValue(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
   if(email){
    setTapped("Send Invite");
   }
  }, [email]);

  const addCollaborator = async () => {
    setTapped("Invite Sent");
    const res = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/email/collaborator`,
      {
        email: email,
        noteId: note.id,
        role: access === "view" ? "viewer" : "editor",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data.data)
      setActiveNote(res.data.data);
    }
  };

  return (
    <Popup show={true}>
      <div className="collab-box" ref={ref}>
        <div>Invite</div>
        <div className="overview-row border-invite">
          <SendInvite
            label={"Email, comma separated"}
            type="email"
            currentValue={email}
            options={options}
            setterFunction={setEmail}
            setValue={setAccess}
            value={access}
          />
          <div className="send-invite-button">
            <Button label={tapped} authFunction={addCollaborator} />
          </div>
        </div>
        {note.users.map((c) => (
          <div key={c.email} style={{ padding: "0px 16px" }}>
            <Collaborator
              photo={c.photo}
              name={c.name}
              role={c.collab?.role ?? "Editor"}
            />
            <div className="bottom-invite" />
          </div>
        ))}
        <Collaborator photo={user.photo} name={user.name} role={"Owner"} />
      </div>
    </Popup>
  );
}
