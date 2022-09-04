import React from "react";
import { CollaboratorType } from "../types";
import person from "../../assets/img_avatar.png";
import "./index.css";

function Collaborator({ name, photo, role }: CollaboratorType) {
  return (
    <div className="overview-row collaborator-frame">
      <img className="circularImg" src={photo || person} alt="" />
      <div className="collaborator-name">{name}</div>

      {role && <div className="role-text">{ role.charAt(0).toUpperCase() + role.slice(1)}</div>}
    </div>
  );
}

export default Collaborator;
