import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../common/button";
import HyperLinkText from "../../../common/hyperlink";
import HyperLinkSignUp from "../../../common/hyperlink-signup";
import InputField from "../../../common/inputField";
import Modal from "../../../common/modal";
import Spinner from "../../../common/spinner";
import { authResponse, authType } from "../../../common/types";
import ForgotPassword from "./forgotPassword";
import GoogleLogin from "./googleLogin/googleLogin";
import { signWithGoogle, getLoginResult } from "../../../firebase";
import "./index.css";
import { UserCredential } from "firebase/auth";

const Login = ({ setAuthType, setUserID }: authType) =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setSpinner] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const forgotPasswordHandler = () => {
    setForgotPassword((prev) => true);
  };

  const login = async () => {
    setSpinner((prev) => !prev);
    try {
      const { data, status } = await axios.post<authResponse>(
        `${process.env.REACT_APP_ENDPOINT}/v1/api/user/login`,
        { email: email, password: password }
      );
      setSpinner((prev) => !prev);
    if (status === 200) {
      console.log(data);
      setUserID(data.token);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    } catch(error: any) {
      const response  = error?.response;
      const { data, status } = response;
      setSpinner((prev) => !prev);
      if (status === 400) {
        setErrorMessage(data.message)
        setEmail("");
        setPassword("");
      }
      
    }
    

  };

  useEffect(()=>{
    if(window.innerWidth <=768)
      googleRedirectResult();
  },[]);

  const googleRedirectResult= async()=>{
    try{
    const res = await getLoginResult();
    console.log("getting redirected res", res)
    console.log(" nkvdnvkd");
    if(res){
      setGoogleLoginData(res);
    }}catch(e){}
  }

  const googleLogin = async () => {
    try {
      console.log("---ddd---")
      const res = await signWithGoogle();
      setGoogleLoginData(res);
      // if(res.user.email)
    } catch (e) {}
  };

  const setGoogleLoginData =  async(res:UserCredential) => {
    setSpinner((prev) => !prev);
    const { data, status } = await axios.post<authResponse>(
      `${process.env.REACT_APP_ENDPOINT}/v1/api/user/login`,
      {
        email: res.user.email,
        name: res.user.displayName,
        photo: res.user.photoURL,
        isGoogle: true,
      }
    );
    setSpinner((prev) => !prev);
    if (status === 200) {
      setUserID(data.token);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  return (
    <Modal>
      {showSpinner ? (
        <Spinner />
      ) : forgotPassword ? (
        <ForgotPassword
          setUserId={setUserID}
          setSpinner={setSpinner}
        />
      ) : (
        <div className="modal-content-login">
          <div className="login-title">Log in</div>
          <div className="padding-bottom-32"/>
          <div onClick={googleLogin}>
            <GoogleLogin />
          </div>
          <div className="login-subtitle">or use your email to login in:</div>
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
          <div className="padding-bottom-10" />
          <HyperLinkText
              label={"I forgot my password"}
              authFunction={forgotPasswordHandler}
              color={"#000000"}
            />
          <div className="padding-bottom-20" />
          <div className="width-100">
            <Button label={"Log in"} authFunction={login} />
          </div>
          <div className="padding-bottom-20" />
          <HyperLinkSignUp
            label={"Sign Up"}
            location="signup"
            authFunction={setAuthType}
            color="#4861F6"
          />
          {errorMessage && <div className="padding-top-20 error-mssg font-size-20">{errorMessage}</div> }
        </div>
      )}
    </Modal>
  );
}


export default Login;