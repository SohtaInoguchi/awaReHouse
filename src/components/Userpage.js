import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";

function Userpage({ user, message, success }) {
  return (
    <div>
      Welcome {user}
      <Chat/>
      {success === true ? <Success message={message} /> : <Subscription />}
    </div>
  );
}

export default Userpage;
