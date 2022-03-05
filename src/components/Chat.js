import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import App from "./App";
// require('dotenv').config();

export default function Chat({ chatMessages, setChatMessages }) {
  const inputRef = React.createRef();
  //   const [chatMessages, setChatMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [aaa, setAAA] = useState([]);

  let socket;

  useEffect(() => {
    console.log("useeffect user");
    socket = io();
  }, []);

  const sendMessage = async () => {
    // const socket = io();
    socket = io();
    const chat = document.getElementById("chat");

    const faq = document.getElementById("faq");

    let temp = [...chatMessages];
    temp.push(chat.value);
    setChatMessages(temp);
    socket.emit("send-message", chat.value);

    socket.on("send-back-message", (res) => {
      console.log(res);

      // setChatMessages(temp);

      const temp2 = [...receivedMessage];
      temp2.push(res);

      setReceivedMessage(temp2);

      socket.disconnect("send-back-message");
    });

    chat.value = "";
  };

  function chatbot(e) {
    const faq = e.target.value;
    const botSocket = io();

    let temp = [...chatMessages];
    temp.push(faq);
    setChatMessages(temp);
    console.log(faq);
    botSocket.emit("bot-message", faq);
    botSocket.on("bot-send-back", (res) => {
      console.log(res);
      const temp2 = [...receivedMessage];
      temp2.push(res);

      setReceivedMessage(temp2);
      botSocket.disconnect("bot-message");
    });
  }


  return (
    <>
      <button onClick={sendMessage}>Send messege</button>
      <br />
      {/* <div>{chatMessages}</div>
      <div>{receivedMessage}</div> */}
      {/* <input ref={inputRef} type="text" placeholder="Enter message" /> */}
      <input id="chat" type="text" placeholder="Enter message" />
      <button
        id="faq"
        value="Where can I check the seasonal retrieval / store period?"
        onClick={chatbot}
      >
        Where can I check the seasonal retrieval / store period?
      </button>
      <button
        id="faq"
        value="What do I need to do to get items out of seasonal period?"
        onClick={chatbot}
      >
        What do I need to do to get items out of seasonal period?
      </button>
      <button
        id="faq"
        value="Where can I check items I store?"
        onClick={chatbot}
      >
        Where can I check items I store?
      </button>
      {/* <div>{chatMessages}</div> */}
      <div id="sent-message">
        {chatMessages.map((message, idx) => (
          <div key={idx}>{message}</div>
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
