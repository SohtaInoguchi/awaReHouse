import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";

function Userpage({ user, message, success }) {
  return (
    <div>
      Welcome {user}
      {success === true ? <Success message={message} /> : <Subscription />}
    </div>
  );
}

export default Userpage;
