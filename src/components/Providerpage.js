import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

if(dd > 21){
  mm++;
  dd = 21
  today = mm + '/' + dd + '/' + yyyy;
} else{
  dd=21
  today = mm + '/' + dd + '/' + yyyy;
}

function Providerpage({user}) {
  return (
  <div>
    <h1>Welcome {user}</h1>
    <h3>Next visit will be 02/02/22</h3>
    <h4>Items store in box</h4>
    <h4>Your next pay day is: {today}</h4>
    <h4>Your amount of money made: </h4>
    <h4>You will make 12900 yen this month</h4>
    <button>Add more storage capacity</button>
    <button>Stop being a provider</button>
    <br/>
    <Chat/>


      <button
        onClick={(e) => {
          window.confirm("Are you sure about to quit the provider?");
        }}
      >
        Stop being a provider
      </button>
      <br />
      <Chat />
    </div>
  );
}

export default Providerpage;
