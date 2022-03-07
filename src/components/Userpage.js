import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";

function Userpage({ user, message, success, chatMessages, setChatMessages, setMode, mode }) {

  const extraChargeOnClick = () => {
    setMode("extraCharge");
    console.log("mode", mode);
  }

  return (
    <div>
      Welcome {user}
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
      {success === true ? <Success message={message} /> : <Subscription />}
      <button onClick={extraChargeOnClick} id="extra-charge">Extra retrieval/storage</button>
    </div>
  );
}

export default Userpage;
