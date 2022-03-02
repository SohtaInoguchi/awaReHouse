import { io } from "socket.io-client";
import "../input.css";
import React, { useState } from "react";
import Login from "./Login";
function App() {
  // change it to .env variable later
  const socket = io("http://localhost:7777");
  socket.on("connection", () => {});
  socket.on("receive-message", (message) => {
    console.log(message);
  });
  // console.log(document.getElementById("message1").textContent);
  const [message, setMessage] = useState("Screen");
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <div className="text-green-500 flex justify-center items-center flex-col">
        {" "}
        super
        {isLogin ? <div>Welcome</div> : <Login setIsLogin={setIsLogin} />}
        <div className="border-2 w-max h-max flex flex-col">
          <div className="screen flex justify-center bg-blue-300 text-yellow-200">
            {message}
          </div>
          <button
            onClick={() => {
              setMessage("easy piecy");
              socket.emit(
                "send-message",
                document.getElementById("message1").textContent
              );
            }}
          >
            <div id="message1">How to pay money?</div>
          </button>
          <button
            onClick={() => {
              setMessage("ABSOLUTELY YAAASSSSS");
              socket.emit(
                "send-message",
                document.getElementById("message2").textContent
              );
            }}
          >
            <div id="message2">Am I look good?</div>
          </button>
          <button
            onClick={() => {
              setMessage("ASK ETIENNE");
              socket.emit(
                "send-message",
                document.getElementById("message3").textContent
              );
            }}
          >
            <div id="message3">How to become a rich man?</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
