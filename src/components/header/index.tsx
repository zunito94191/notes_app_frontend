import person from "../../assets/person.png";
import avatar from "../../assets/img_avatar.png";
import notification from "../../assets/notification.png";
import "./index.css";
import React from "react";

export default function Header() {
  const user = JSON.parse(
    localStorage.getItem("user") ?? '{"name": "", "photo": ""}'
  );
  const logout =() =>{
    
  }
  return (
    <div className="header">
    <div className="title-left">NOTES</div>
      <div className="right">
        <img src={(user.photo? user.photo: avatar)} onClick={logout}alt="Avatar" className="circularImg"/>
        <img src={notification} className="spacing" alt=""/>
        <img src={person} className="spacing" alt="" />  
      </div>
    </div>
  );
}
