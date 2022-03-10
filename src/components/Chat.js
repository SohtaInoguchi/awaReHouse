import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import App from "./App";
import { BsChatRightTextFill } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";


export default function Chat() {

  const [chatMessages, setChatMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [socket, setSocket] = useState();
  const [isChatOpened, setIsChatOpened] = useState(false);

  // open socket io connection
  useEffect(() => {
    console.log("useeffect user");
    const newSocket = io();
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  // For receiving message from admin
  useEffect(() => {
    if (socket == null) return;
    socket.on("send-back-message", (res) => {
      console.log("user chat res", res);
      const receivedMessageObj = {receiveOrSent: "received", message: res};
      // const temp2 = [...receivedMessage];
      const temp2 = [...chatMessages];
      // temp2.push(res);
      temp2.push(receivedMessageObj);
      // setReceivedMessage(temp2);
      setChatMessages(temp2);
    });
    return () => socket.off("send-back-message");
  });

  // For chatbot receive message
  useEffect(() => {
    if (socket == null) return;
    socket.on("bot-send-back", (res) => {
      console.log("user chat res", res);
      // const temp2 = [...receivedMessage];
      const receivedMessageObj = {receiveOrSent: "botMessageReceived", message: res};
      const temp2 = [...chatMessages];
      // temp2.push(res);
      temp2.push(receivedMessageObj);
      // setReceivedMessage(temp2);
      setChatMessages(temp2);
    });
    return () => socket.off("bot-send-back");
  });

  const sendMessage = () => {
    const chat = document.getElementById("chat");
    let temp = [...chatMessages];
    const sentMessageObj = {receiveOrSent: "sent", message: chat.value};
    // temp.push(chat.value);
    temp.push(sentMessageObj);
    setChatMessages(temp);
    // socket.emit("send-message", chat.value);
    socket.emit("send-message", sentMessageObj.message);
    chat.value = "";
  };

  function chatbot(e) {
    const faq = e.target.value;
    let temp = [...chatMessages];
    const sentMessageObj = {receiveOrSent: "botMessageSent", message: faq};
    // temp.push(faq);
    temp.push(sentMessageObj);
    setChatMessages(temp);
    console.log(faq);
    socket.emit("bot-message", faq);
  }

  const toggleChatOpen = () => {
    if(!isChatOpened) {
      setIsChatOpened(true);
    } else {
      setIsChatOpened(false);
    }
  }

  const renderChatBox = () => {
    return <>
          <div id="chat-box">
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

              {/* {chatMessages.map((message, idx) => (
                <div key={idx} className="messages">{message}</div> */}
                
              <div className="message-wrapper">
                {chatMessages.map((message, idx) => (
                  <div key={idx} 
                  className={message.receiveOrSent === "botMessageSent" ? 
                  "bot-message-sent" : 
                  message.receiveOrSent === "botMessageReceived" ? 
                  "bot-message-received" :
                  message.receiveOrSent === "sent" ?
                  "sent-messages" : "messages"}>
                    {message.message}
                  </div>
                ))}
                <div id="send-section-wrapper">
                  <input id="chat" type="text" placeholder="Enter message" />
                  <SendComponent 
                  icon={<AiOutlineSend 
                    id="send-icon"
                    onClick={sendMessage}/>} 
                  />
                </div>
              </div>
          </div>
          <CloseChatComponent 
          icon={<AiFillCloseCircle 
          size="50" 
          onClick={toggleChatOpen}
          className="chat-icons"
          />}/>
          </>
  }

  const check = (e) => {
    e.preventDefault();
    console.log("chat opened", chatMessages);
  }

  return (
    <>
      <button onClick={(e) => check(e)}>Button to Check state</button>

      {
      isChatOpened ? 
      renderChatBox()
      // <CloseChatComponent icon={<AiFillCloseCircle size="50"/>}/>
      :
      <OpenChatComponent 
      icon={<BsChatRightTextFill 
      size="50" 
      onClick={toggleChatOpen}
      className="chat-icons"
      /> }/>
      }
    </>
  );
}

// Icon components
function OpenChatComponent({ icon }) {
  return <div className="chat-icons" >{icon}</div>;
}

function CloseChatComponent({ icon }) {
  return <div className="chat-icons">{icon}</div>;
}

function SendComponent({ icon }) {
  return <div id="send-icon">{icon}</div>;
}
