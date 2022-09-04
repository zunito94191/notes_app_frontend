import React, { useState } from "react";
import { StateForget } from "../../../../common/types";
import Email from "./email";
import OTP from "./otp";
import Reset from "./reset";
import "./index.css";


const ForgotPassword = ({ setUserId, setSpinner }: StateForget) => {
  const [email, setEmail] = useState("");
  const [generated, setGenerated] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <div className="forgot-modal-content">
      {!generated && <Email email={email} setEmail={setEmail} setGenerated={setGenerated} />}
      {generated && !verified && <OTP setValue={setVerified} value={email} />}
      {verified && <Reset setUserId={setUserId} value={email} setSpinner={setSpinner}/>}
    </div>
  );
}

export default ForgotPassword