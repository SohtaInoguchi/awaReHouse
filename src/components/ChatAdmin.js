import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { io } from "socket.io-client";

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
    if (socket == null) return;
    socket.on("send-back-message", (res) => {
      console.log("admin chat res", res);
      const temp2 = [...receivedMessage];
      temp2.push(res);
      setReceivedMessage(temp2);
    });
    return () => socket.off("send-back-message");
  });

  const sendMessage = async () => {
    const chat = document.getElementById("chat");
    if (chat.value.length === 0) return;
    let temp = [...chatMessages];
    temp.push(chat.value);
    setChatMessages(temp);

    socket.emit("send-message", chat.value);
    chat.value = "";
  };

  return (
    <div className="message-container">
      <div className="message-elements">
        <div id="sent-message" className="send-message">
          {chatMessages.map((message, idx) => (
            <div className="send-child" key={idx}>
              {message}
            </div>
          ))}
        </div>

        <div id="received-message">
          {receivedMessage.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>

        <div className="message-input">
          <input id="chat" type="text" placeholder="Enter message" />
          <button onClick={sendMessage} className="send-button">
            <SendComponent
              icon={<AiOutlineSend size="14" />}
              // onClick={sendMessage}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function SendComponent({ icon }) {
  return <div className="send-icon">{icon}</div>;
}
