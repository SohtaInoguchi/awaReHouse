import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";

function Userpage({ user, message, success, chatMessages, setChatMessages }) {
  return (
    <div>
      Welcome {user}
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
      {success === true ? <Success message={message} /> : <Subscription />}
    </div>
  );
}

export default Userpage;
