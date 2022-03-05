import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function ChatAdmin({ chatMessages, setChatMessages }) {

  const [receivedMessage, setReceivedMessage] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
      console.log("useeffect admin");
      const newSocket = io();
      setSocket(newSocket);
      return () => newSocket.close();
    }, []);

    useEffect(() => {
      if (socket == null) return
      socket.on("send-back-message", (res) => {
        console.log("admin chat res", res);
        const temp2 = [...receivedMessage];
        temp2.push(res);
        setReceivedMessage(temp2);
      });
      return () => socket.off('send-back-message');
    });
  

  const sendMessage = async () => {
    const chat = document.getElementById("chat");
    
    let temp = [...chatMessages];
    temp.push(chat.value);
    setChatMessages(temp);

    socket.emit("send-message", chat.value);      
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
