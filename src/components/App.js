import "../input.css";
import Userpage from "./Userpage.js";
import Providerpage from "./Providerpage.js";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import Success from "./Success";
import Subscription from "./Subscription";
import axios from 'axios'

function App() {
  //for user
  const [isLogin, setIsLogin] = useState(false);
  // for provider
  const [isLogin2, setIsLogin2] = useState(false);
  const [mode, setMode] = useState("homePage");
  const [user, setUser] = useState("guest");
  const [sessionId, setSessionId] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([])

  //Axios
  useEffect(() => {
    axios.get('/items').then(response => setItems(response.data))
    
  }, [items])

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
      {/* success === true ? (
        <Success message={message} />
      ) : success === false ? (
        <Subscription />
      ) : mode === "homePage" ? (
        <div>
          <Homepage setMode={setMode} />
          <Userpage />
          <Providerpage />
        </div>
      ) : */}

      {mode === "homePage" ? (
        <Homepage setMode={setMode} />
      ) : mode === "userLogin" && isLogin ? (
        <Userpage user={user} message={message} success={success} items = {items} />
      ) : mode === "userLogin" && !isLogin ? (
        <Login setIsLogin={setIsLogin} setUser={setUser} />
      ) : mode === "providerLogin" && isLogin2 ? (
        <div>Welcome Provider </div>
      ) : mode === "providerLogin" && !isLogin2 ? (
        <div>Provider Login Page</div>
      ) : (
        <div>admin page</div>
      )}
    </div>
  );
}

export default App;
