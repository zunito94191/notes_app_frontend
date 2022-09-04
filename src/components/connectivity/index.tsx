import React from "react";
import "./index.css"

function Connectivity() {
  const [isOnline, setNetwork] = React.useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };
  React.useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });
  return isOnline ? (
    <></>
  ) : (
    <div className="connectivity-wrapper"><div className="connectivity-text">You are not connected to the internet. Changes will not be saved</div></div>
  );
}

export default Connectivity;
