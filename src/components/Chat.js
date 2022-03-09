import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import App from "./App";
import { BsChatRightTextFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";


export default function Chat() {

  const [chatMessages, setChatMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [socket, setSocket] = useState();
  const [isChatOpened, setIsChatOpened] = useState(false);

  useEffect(() => {
    console.log("useeffect user");
    const newSocket = io();
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("send-back-message", (res) => {
      console.log("user chat res", res);
      // const temp2 = [...receivedMessage];
      const temp2 = [...chatMessages];
      temp2.push(res);
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
      const temp2 = [...chatMessages];
      temp2.push(res);
      // setReceivedMessage(temp2);
      setChatMessages(temp2);
    });
    return () => socket.off("bot-send-back");
  });

  const sendMessage = () => {
    const chat = document.getElementById("chat");

    let temp = [...chatMessages];
    temp.push(chat.value);
    setChatMessages(temp);

    // send message
    socket.emit("send-message", chat.value);

    // receive response
    socket.on("send-back-message", (res) => {
      console.log("user chat res", res);
      // const temp2 = [...receivedMessage];
      // temp2.push(res);

      // setReceivedMessage(temp2);
    });

    chat.value = "";
  };

  function chatbot(e) {
    const faq = e.target.value;
    // const botSocket = io();

    let temp = [...chatMessages];
    temp.push(faq);
    setChatMessages(temp);
    console.log(faq);
    // botSocket.emit("bot-message", faq);
    // botSocket.on("bot-send-back", (res) => {
    socket.emit("bot-message", faq);
    // socket.on("bot-send-back", (res) => {
      // console.log(res);
      // temp.push(res);
      // setChatMessages(temp);
      // const temp2 = [...receivedMessage];
      // const temp2 = [...chatMessages];
      // temp2.push(res);

      // setReceivedMessage(temp2);
    //   setChatMessages(temp2);
    //   botSocket.disconnect("bot-message");
    // });
  }

  const toggleChatOpen = () => {
    if(!isChatOpened) {
      setIsChatOpened(true);
    } else {
      setIsChatOpened(false);
    }
  }

  const renderChatBox = () => {
    return <div id="chat-box">
            <input id="chat" type="text" placeholder="Enter message" />
              <button
                id="faq"
                value="Where can I check the seasonal retrieval / store period?"
                onClick={chatbot}
              >
                Where can I check the seasonal retrieval / store period?
              </button>

              {chatMessages.map((message, idx) => (
                <div key={idx} className="messages">{message}</div>
              ))}
            <CloseChatComponent 
            icon={<AiFillCloseCircle 
            size="50" 
            onClick={toggleChatOpen}
            className="chat-icons"
            />}/>
          </div>
  }

  const check = (e) => {
    e.preventDefault();
    console.log("chat opened", isChatOpened);
  }

  return (
    <>
      <br />

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
      <button onClick={(e) => check(e)}>Check</button>

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

      {/* <div id="chat-box">
        {chatMessages.map((message, idx) => (
          <div key={idx} className="messages">{message}</div>
        ))}
      </div> */}
      {/* <div id="received-message">
        {receivedMessage.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div> */}
      <button onClick={sendMessage}>Send messege</button>
    </>
  );
}

function OpenChatComponent({ icon }) {
  return <div className="chat-icons" >{icon}</div>;
}

function CloseChatComponent({ icon }) {
  // return <div className="chat-icons">{icon}</div>;
  return <div className="chat-icons">{icon}</div>;
}
