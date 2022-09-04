import React, { useState } from "react";
import axios from "axios";
import Button from "../../../../common/button";
import InputField from "../../../../common/inputField";
import { StateForget } from "../../../../common/types";
import "./reset.css";

const Reset = ({ setUserId, value, setSpinner }: StateForget) =>  {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const updatePassword = async () => {
    if (password === repeatPassword) {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/api/user/forgetpassword`,
        {
          email: value,
          newpassword: password,
        }
      );
        setSpinner(prev=>!prev)
      if (res.status === 200) {
        setUserId(res.data.token);
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } else {
      setErrorMessage("Both passwords must match")
    }
    
  };

  return (
    <>
      <div className="reset-title">Reset Password</div>
      <InputField
        label="Enter new password"
        type="password"
        currentValue={password}
        setterFunction={setPassword}
      />
      <div className="padding-bottom-10"/>
      <InputField
        label="Enter password again"
        type="password"
        currentValue={repeatPassword}
        setterFunction={setRepeatPassword} 
      />
      <div className="margin-bottom"/>
      <Button label="Change password" authFunction={updatePassword} />
      {errorMessage && <div className="padding-top-20 error-mssg font-size-20">{errorMessage}</div> }
    </>
  );
}

export default Reset;