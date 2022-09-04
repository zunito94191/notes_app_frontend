import React, { useState, useRef, useEffect } from "react";
import Button from "../../../../common/button";
import { Popup } from "../../../../common/popup";
import {
  NotePropType,
  SelectType,
  StateSetter,
} from "../../../../common/types";
import "./index.css";
import ResizeInputField from "../../../../common/resizeInput";
import Dropdown from "../../../../common/dropdown";

export default function ShareAsUrl({
  note,
  setValue,
}: NotePropType & StateSetter) {
  const [access, setAccess] = useState("view");
  const [tapped, setTapped] = useState("Copy Link");
  const ref = useRef<any>();
  const url = `${process.env.REACT_APP_SHARE}/note/${note.id}`;
  const options: SelectType[] = [
    {
      label: "Anyone with the link can view",
      value: "view",
    },
    {
      label: "Anyone with the link can edit",
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
    setTapped("Copy Link");
  }, [access]);

  const copyUrl = () => {
    navigator.clipboard.writeText(
      url + (access === "view" ? "244uc7h70x" : "3tcm09aw1g")
    );
    setTapped("Copied");
  };

  return (
    <Popup show={true}>
      <div className="collab-box" ref={ref}>
        <div>Share</div>
        <div className="overview-row border-invite">
          <ResizeInputField
            label=""
            type="text"
            currentValue={
              url + (access === "view" ? "244uc7h70x" : "3tcm09aw1g")
            }
            setterFunction={() => {}}
          />
          <div className="send-invite-button">
            <Button label={tapped} authFunction={copyUrl} />
          </div>
        </div>
        <div className="dropdown-wrapper">
          <Dropdown options={options} setValue={setAccess} value={access} />
        </div>
      </div>
    </Popup>
  );
}
