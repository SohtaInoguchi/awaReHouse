import React, { useState, useEffect } from "react";
import { AiOutlineSend, AiFillAlipaySquare } from "react-icons/ai";
import { io } from "socket.io-client";

// export default function ChatAdmin({ chatMessages, setChatMessages }) {
export default function ChatAdmin() {
  const [receivedMessage, setReceivedMessage] = useState([]);
  // const [chatMessages, setChatMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [div, setDiv] = useState();

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
      // const temp2 = [...receivedMessage];
      const temp2 = [...messages];
      const receivedMessageObj = {sentOrReceive: "received", message: res}
      console.log("received", receivedMessageObj.message);
      temp2.push(receivedMessageObj);
      // setReceivedMessage(temp2);
      setMessages(temp2);
    });
    return () => socket.off("send-back-message");
  });

  const sendMessage = async () => {
    const chat = document.getElementById("chat");
    if (chat.value.length === 0) return;
    // let temp = [...chatMessages];
    let temp = [...messages];
    const sentMessageObj = {sentOrReceive: "sent", message: chat.value}
    // temp.push(chat.value);
    temp.push(sentMessageObj);
    // setChatMessages(temp);
    setMessages(temp);

    // socket.emit("send-message", chat.value);
    socket.emit("send-message", sentMessageObj.message);
    chat.value = "";
  };

  // const renderDiv = () => {
  //   return (
  //     React.createElement(
  //       "div",
  //       {className: "send-message"},
  //       chatMessages[chatMessages.length - 1]
  //     )
  //   )
  // }

  return (
    <div className="message-container">
      <div className="message-elements">
        <div className="message-wrapper">
          {messages.map((message, index) => <div 
          className="send-message"
          style={{ marginLeft: message.sentOrReceive === "sent" ? 
          '0px' : '50px', 
          marginRight: message.sentOrReceive === "received" ? 
          '0px' : '50px'}} 
          key={index}>{message.message}</div>)}
          {/* <div id="sent-message"> */}
            {/* {chatMessages.map((message, idx) => (
              <div className="send-message" key={idx}>
                {message}
              </div>
            ))} */}
            {/* {renderDiv()} */}
          {/* </div>

          <div id="received-message">
            {receivedMessage.map((message, index) => (
              <div className="received-message" key={index}>{message}</div>
              ))}
          </div> */}
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
