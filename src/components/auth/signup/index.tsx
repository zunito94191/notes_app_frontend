import axios from "axios";
import React, { useState } from "react";
import Button from "../../../common/button";
import HyperLinkSignUp from "../../../common/hyperlink-signup";
import InputField from "../../../common/inputField";
import  Modal  from "../../../common/modal";
import Spinner from "../../../common/spinner";
import { authResponse, authType } from "../../../common/types";
import "./index.css";

const SignUp = ({ setAuthType, setUserID }: authType) =>  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setterFunction = (value: string, type: number) => {};

  const forgotPassword = () => {
    //do something here
  };

  const signUp = async () => {
    setShowSpinner((prev) => !prev);
    try {
      const { data, status } = await axios.post<authResponse>(
        `${process.env.REACT_APP_ENDPOINT}/v1/api/user/signup`,
        { email: email, password: password, name: name }
      );
      console.log(data);
      setShowSpinner((prev) => !prev);
  
      if (status === 200) {
        setUserID(data.token);
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user))
      }
    } catch(error:any) {
      const response  = error?.response;
      const { data, status } = response;
      setShowSpinner((prev) => !prev);
      if (status === 400) {
        setErrorMessage(data.message)
        setName("");
        setEmail("");
        setPassword("");
      }
    }

    
  };

  return (
    <Modal>
      {showSpinner ? (
        <Spinner />
      ) : (
        <div className="modal-content-signup">
          <div className="signup-title">SignUp</div>
          <div className="padding-bottom-32" />
          <InputField
            label={"Name"}
            type={"text"}
            currentValue={name}
            setterFunction={setName}
          />
          <div className="padding-bottom-10" />
          <InputField
            label={"Email"}
            type={"email"}
            currentValue={email}
            setterFunction={setEmail}
          />
          <div className="padding-bottom-10" />
          <InputField
            label={"Password"}
            type={"password"}
            currentValue={password}
            setterFunction={setPassword}
          />
          <div className="padding-bottom-20" />
          <div className="width-100">
            <Button label={"Sign Up"} authFunction={signUp} />
          </div>
          <div className="padding-bottom-20" />
          <HyperLinkSignUp
            label={"Already have an account ? Sign in here"}
            authFunction={setAuthType}
            location="login"
            color={"#4861F6"}
          />
          {errorMessage && <div className="padding-top-20 error-mssg font-size-20">{errorMessage}</div> }
        </div>
      )}
    </Modal>
  );
}

export default SignUp;