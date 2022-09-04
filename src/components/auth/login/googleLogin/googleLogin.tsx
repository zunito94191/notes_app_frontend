import React from "react";
import "./googleLogin.css"
import googleImg from "../../../../assets/google.png";

export default function GoogleLogin() {
  return (
    <div className="google-main">
      <img src={googleImg} alt="google" />
      <div className="google-text">Log in with Google</div>
    </div>
  );
}
