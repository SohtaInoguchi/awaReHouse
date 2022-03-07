import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";

function Providerpage({user}) {
  return (
  <div>
    <h1>Welcome {user}</h1>
    <h3>Next visit will be 01/2022</h3>
    <h4>Items store in box</h4>
    <h4>Your amount of money made: </h4>
    <h4>You will make 12900 yen this month</h4>
    <button>Add more storage capacity</button>
    <button>Stop being a provider</button>
    <br/>
    <Chat/>

  </div>
  );
}

export default Providerpage;
