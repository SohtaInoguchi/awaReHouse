import "../input.css";
import Userpage from "./Userpage.js";
import Providerpage from "./Providerpage.js";
import React, { useState } from "react";
import Login from "./Login";
import Homepage from "./Homepage";

function App() {
  //for user
  const [isLogin, setIsLogin] = useState(false);
  // for provider
  const [isLogin2, setIsLogin2] = useState(false);
  const [mode, setMode] = useState("homePage");
  const [user, setUser] = useState("guest");
  console.log(isLogin);
  return (
    <div>
      {mode === "homePage" ? (
        <div>
          <Homepage setMode={setMode} />
          <Userpage />
          <Providerpage />
        </div>
      ) : mode === "userLogin" && isLogin ? (
        <div>Welcome {user}</div>
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
