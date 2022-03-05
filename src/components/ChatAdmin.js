import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function ChatAdmin({ chatMessages, setChatMessages }) {

  const [receivedMessage, setReceivedMessage] = useState([]);

  const sendMessage = async () => {
    const socket = io();
    const chat = document.getElementById("chat");

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


  return (
      <div>
        <div>ChatAdmin</div>
        <button onClick={sendMessage}>Send messege</button>
        <input id="chat" type="text" placeholder="Enter message" />

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

      </div>
    )
}