import person from "../../assets/person.png";
import avatar from "../../assets/img_avatar.png";
import notification from "../../assets/notification.png";
import "./index.css";
import React from "react";
import { AuthLogout } from "../../common/types";
import Logout from "../editor/actionBar/logout";

export default function Header({logout}:AuthLogout) {
  const [collab, setCollab] = React.useState(0);
  const user = JSON.parse(
    localStorage.getItem("user") ?? '{"name": "", "photo": ""}'
  );
  const logOut=()=>{
    logout();
    setCollab(0);
  }
  return (
    <div className="header">
    <div className="title-left">NOTES</div>
      <div className="right">
        <img src={(user.photo? user.photo: avatar)} alt="Avatar" className="circularImg"/>
        <img src={notification} className="spacing" alt=""/>
        <img src={person} className="spacing" alt="" onClick={
          (e)=>{e.stopPropagation();
          setCollab(1)
          }
        }/>
        {collab ===1&&<Logout setValue={setCollab}logout={logOut}/>}  
      </div>
    </div>
  );
}
