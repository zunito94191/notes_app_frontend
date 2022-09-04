import React from "react";
import "./index.css";
import { NotePropType } from "../../../../common/types";
import Collaborator from "../../../../common/collaborator";

const NoteOverView = ({ note }: NotePropType) => {
  const date = new Date(note.createdAt.toString());

  return (
    <div className="note-overview">
      <div className="overview-row">
        <div className="key">Collaborators</div>
        {!note.users || note.users.length === 0 ? (
          <div className="font-style">Not collaborating with anyone</div>
        ) : (
          note.users.map((c) => (
            <div key={c.name.toString()}>
              <Collaborator
                name={c.name}
                photo={c.photo}
              />
              <div style={{paddingRight:"8px"}}/>
            </div>
          ))
        )}
      </div>
      <div className="col-space" />
      <div className="overview-row">
        <div className="key">Last updated</div>
        <div className="key">
          {date.toLocaleString("en-us", {
            year: "numeric",
            day: "numeric",
            month: "long",
          }) +
            " at " +
            date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </div>
      </div>
    </div>
  );
};

export default NoteOverView;
