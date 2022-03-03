import "../input.css";
import Userpage from "./Userpage.js";
import Providerpage from "./Providerpage.js";
import React, { useState } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import NewCustomer from "./NewCustomer"

function App() {
  //for user
  const [isLogin, setIsLogin] = useState(false);
  // for provider
  const [isLogin2, setIsLogin2] = useState(false);
  const [mode, setMode] = useState("homePage");
  const [user, setUser] = useState("guest");
  const [newCustomer, setNewCustomer] = useState(false);

  return (
    <div>
      {mode === "homePage" ? (
        <div>
          <Homepage setMode={setMode} setNewCustomer={setNewCustomer} />
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
      ) : mode === "registration" ? (
          <NewCustomer/>
      ) : (
        <div>admin page</div>
      )}
    </div>
  );
}

export default App;
