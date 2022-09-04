import React, { useState } from "react";
import axios from "axios";
import Button from "../../../../common/button";
import InputField from "../../../../common/inputField";
import { StateSetter } from "../../../../common/types";
import "./otp.css";

const OTP = ({ setValue, value }: StateSetter) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/api/user/verifyotp`,
        {
          email: value,
          otp: otp
        }
      );
  
      if (res.status === 200) {
        setValue(true);
      }
    }
    catch (error: any) {
      const { response } = error;
      const { data, status } = response;
      if ( status === 400)  {
        setErrorMessage(data.message);
      }
    }
    
  };

  return (
    <>
      <div className="otp-title">Reset Password</div>
      <InputField
        label={"Enter OTP code here"}
        type={"text"}
        currentValue={otp}
        setterFunction={setOtp}
      />
      <div className="margin-bottom"/>
      <Button label="Verify" authFunction={verifyOtp} />
      {errorMessage && <div className="padding-top-20 error-mssg font-size-20">{errorMessage}</div> }
    </>
  );
}

export default OTP;
