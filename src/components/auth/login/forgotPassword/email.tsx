import React, { useState } from "react";
import axios from "axios";
import Button from "../../../../common/button";
import InputField from "../../../../common/inputField";
import { ForgotPasswordProps } from "../../../../common/types";
import "./email.css";
const Email = ({ email, setEmail, setGenerated }: ForgotPasswordProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const generateOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/api/email/generateotp`,
        {
          "email": email,
        }
      );
      if (res.status === 200) {
        setGenerated(true);
      }
    } catch (error: any) {
      const { response } = error; 
      const { status, data } = response
      if (status === 400) {
        setErrorMessage(data.message)
        setEmail("");
      }
    }
  };

  return (
    <> 
      <div className="email-title">Reset Password</div>
      <InputField
        label={"Enter your email ID"}
        type={"email"}
        currentValue={email}
        setterFunction={setEmail}
      />
      <div className="margin-bottom"/>
      <Button label="Generate otp" authFunction={generateOtp} />
      {errorMessage && <div className="padding-top-20 error-mssg font-size-20">{errorMessage}</div> }
    </>
  );
}

export default Email;