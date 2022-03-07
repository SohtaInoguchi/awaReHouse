import "../input.css";
import { io } from "socket.io-client";
import Userpage from "./Userpage.js";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import NewCustomer from "./NewCustomer";
import Success from "./Success";
import Subscription from "./Subscription";
import axios from "axios";
import Admin from "./Admin";
import ExtraCharge from "./ExtraCharge";

function App() {
  //for user
  const [isLogin, setIsLogin] = useState(false);
  // for provider
  const [isLogin2, setIsLogin2] = useState(false);
  const [mode, setMode] = useState("homePage");
  const [user, setUser] = useState("guest");
  const [newCustomer, setNewCustomer] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
// <<<<<<< HEAD
// =======
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  // const socket = io();
// >>>>>>> ef5e10e5eb04acfea18b9bc93a5b0788cc307df8

  //Axios
  useEffect(() => {
// <<<<<<< HEAD
    console.log("useEffect was called");
  // }, [chatMessages]);
// =======
    axios.post("/allItems", { email }).then((res) => setItems(res.data));
  }, [email]);
// >>>>>>> ef5e10e5eb04acfea18b9bc93a5b0788cc307df8

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setMessage("Thank you for your purchase");
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  return (
    <div>
      {mode === "homePage" ? (
        <Homepage setMode={setMode} />
      ) : mode === "userLogin" && isLogin ? (
        <Userpage
          user={user}
          message={message}
          success={success}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          setMode={setMode}
          mode={mode}
          items={items}
        />
      ) : mode === "userLogin" && !isLogin ? (
        <Login setIsLogin={setIsLogin} setUser={setUser} setEmail={setEmail} />
      ) : mode === "providerLogin" && isLogin2 ? (
        <div>Welcome Provider </div>
      ) : mode === "providerLogin" && !isLogin2 ? (
        <div>Provider Login Page</div>
      ) : mode === "registration" ? (
          <NewCustomer setMode={setMode}/>
      ) : mode === "extraCharge" ? (
        // <ExtraCharge user={user} items={items}/>
        <ExtraCharge user={user}/>
      ) : (
        <Admin chatMessages={chatMessages} setChatMessages={setChatMessages} />
      )}
    </div>
  );
}

export default App;
