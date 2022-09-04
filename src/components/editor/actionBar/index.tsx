import share from "../../../assets/Icons_24px_Send.png";
import collaborate from "../../../assets/add_colab.png";
import more from "../../../assets/Icons-24px-More_horizontal.png";
import ShareAsUrl from "./share";
import "./index.css";
import React from "react";
import { NotePropType, SelectType } from "../../../common/types";
import AddCollaborator from "./addCollaborator";

const ActionBar = ({ note }: NotePropType) => {
  const [collab, setCollab] = React.useState(0);

  return (
    <div className="action-bar" style={{ position: "sticky",top:"66px" }}>
      <div className="action-bar-left">{note.title}</div>

      <div className="right">
        <img
          src={collaborate}
          alt="Collaborate"
          className="action"
          onClick={(e) => {
            e.stopPropagation();
            if(!note.readOnly)setCollab(1);
          }}
        />
        <img
          src={share}
          className="action spacing"
          alt="Share"
          onClick={(e) => {
            e.stopPropagation();
            if(!note.readOnly)setCollab(2);
          }}
        />
        <img src={more} className="action spacing" alt="More" />
      </div>
      {collab === 1 && <AddCollaborator note={note} setValue={setCollab} />}
      {collab === 2 && <ShareAsUrl note={note} setValue={setCollab} />}
    </div>
  );
};

export default ActionBar;
