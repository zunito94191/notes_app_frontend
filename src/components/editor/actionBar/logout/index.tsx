import React, { useEffect, useRef, useContext } from "react";
import Button from "../../../../common/button";
import { Popup } from "../../../../common/popup";
import {
  AuthLogout,
  StateSetter,
} from "../../../../common/types";
import "./index.css";

export default function Logout({
  logout,
  setValue
}: AuthLogout &StateSetter) {
  const ref = useRef<any>();

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


  return (
    <Popup show={true}>
      <div className="collab-box" ref={ref}>

          <div className="login-button" style={{marginLeft:"8px"}}>
          <Button label={"Logout"} authFunction={logout} />
        </div>
      </div>
    </Popup>
  );
}
