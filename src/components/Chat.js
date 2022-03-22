import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import App from "./App";
import { BsChatRightTextFill } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineSend, AiFillWechat } from "react-icons/ai";
import { Accordion } from "react-bootstrap";
import { GoCommentDiscussion } from "react-icons/go";
import { RiQuestionAnswerLine } from "react-icons/ri"

export default function Chat() {

  const [chatMessages, setChatMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [socket, setSocket] = useState();
  const [isChatOpened, setIsChatOpened] = useState(false);
  const setRef = useCallback(node => {
    if (node){
      node.scrollIntoView({ smooth:true })
    }
  }, []);

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
      const temp2 = [...chatMessages];
      temp2.push(receivedMessageObj);
      setChatMessages(temp2);
    });
    return () => socket.off("send-back-message");
  });

  // For chatbot receive message
  useEffect(() => {
    if (socket == null) return;
    socket.on("bot-send-back", (res) => {
      console.log("user chat res", res);
      const receivedMessageObj = {receiveOrSent: "botMessageReceived", message: res};
      const temp2 = [...chatMessages];
      temp2.push(receivedMessageObj);
      setChatMessages(temp2);
    });
    return () => socket.off("bot-send-back");
  });

  const sendMessage = () => {
    const chat = document.getElementById("chat");
    if (chat.value.length < 1) return;
    let temp = [...chatMessages];
    const sentMessageObj = {receiveOrSent: "sent", message: chat.value};
    temp.push(sentMessageObj);
    setChatMessages(temp);
    socket.emit("send-message", sentMessageObj.message);
    chat.value = "";
  };

  function chatbot(e) {
    const faq = e.target.value;
    let temp = [...chatMessages];
    const sentMessageObj = {receiveOrSent: "botMessageSent", message: faq};
    temp.push(sentMessageObj);
    setChatMessages(temp);
    console.log(faq);
    socket.emit("bot-message", faq);
  }

  const toggleChatOpen = (e) => {
    e.preventDefault();
    console.log("toggling")
    if(!isChatOpened) {
      setIsChatOpened(true);
    } else {
      setIsChatOpened(false);
    }
  }

  const renderChatBox = () => {
    return <>
          <div id="outer-wrapper">
            <div id="chat-box-faq-wrapper">
              <Accordion id="faq" defaultActiveKey="0">
              <Accordion.Item eventKey="1">
              <Accordion.Header >FAQ</Accordion.Header>
              <Accordion.Body>
                <button
                  className="faq"
                  value="Where can I check the seasonal retrieval / store period?"
                  onClick={chatbot}
                  >
                  - Where can I check the seasonal retrieval / store period?
                </button>
                <button
                  className="faq"
                  value="What do I need to do to get items outside of seasonal period?"
                  onClick={chatbot}
                  >
                  - Can I retrieve items outside the retrieval/storing period?
                </button>
                <button
                  className="faq"
                  value="Where can I check items I stored?"
                  onClick={chatbot}
                  >
                  - Where are my stored goods listed?
                </button>
              </Accordion.Body>
              </Accordion.Item>    
              </Accordion> 

                <div id="chat-box">
                  <div className="message-wrapper">
                    {chatMessages.map((message, idx) => {
                    // const isLastMessage = chatMessages.length - 1 === idx; 
                    return (
                      <div 
                      // ref={isLastMessage ? setRef : null}
                      key={idx} 
                      className={message.receiveOrSent === "botMessageSent" ? 
                      "bot-message-sent" : 
                      message.receiveOrSent === "botMessageReceived" ? 
                      "bot-message-received" :
                      message.receiveOrSent === "sent" ?
                      "sent-messages" : "messages"}>
                        {message.message}
                      </div>
                    )})}
                  </div>
                </div>
            </div>
                <div id="send-section-wrapper">
                  <input id="chat" type="text" placeholder={`${""}  Enter your inquiry`} />
                  <SendComponent 
                  icon={<AiOutlineSend 
                    id="send-icon"
                    onClick={sendMessage}/>} 
                  />
                </div>
                <CloseChatComponent 
                icon={<AiFillCloseCircle 
                  size="50" 
                  onClick={toggleChatOpen}
                  className="chat-icons-close"
                  />}/>
          </div>
          </>
  }

  return (
    <>
      {
      isChatOpened ? 
      renderChatBox()
      :
      <OpenChatComponent 
      icon={<AiFillWechat 
      size="50" 
      onClick={toggleChatOpen}
      className="chat-icons-open"
      /> }/>
      }
    </>
  );
}


// Icon components
function OpenChatComponent({ icon }) {
  return <div className="chat-icons-open" >{icon}</div>;
}

function CloseChatComponent({ icon }) {
  return <div className="chat-icons-close">{icon}</div>;
}

function SendComponent({ icon }) {
  return <div id="send-icon">{icon}</div>;
}
