import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import App from "./App";
// require('dotenv').config();

export default function Chat() {
  const inputRef = React.createRef();
  const [chatMessages, setChatMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);

  const socket = io();
  //   socket.on("connect", () => {
  //     console.log(`you login with ${socket.id}`);
  //   });

  //   socket.on("receive-message", (message) => {
  //     let temp = [...receivedMessage];
  //     temp.push(message);
  //     setReceivedMessage(temp);
  //   });

  const sendMessage = async (e) => {
    e.preventDefault();
    let temp = [...chatMessages];
    temp.push(inputRef.current.value);
    setChatMessage(temp);
    socket.emit("send-message", inputRef.current.value);
    //inputRef.current.value
    // socket.on("receive-message", (message) => {
    //   let temp = [...receivedMessage];
    //   temp.push(message);
    //   setReceivedMessage(temp);
    // });

    inputRef.current.value = "";
  };

  return (
    <>
      <button onClick={sendMessage}>Send messege</button>
      <br />
      <input ref={inputRef} type="text" placeholder="Enter message" />
      <div id="sent-message">
        {chatMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div id="received-message">
        {receivedMessage.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
}
