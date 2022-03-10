import "../input.css";
import { io } from "socket.io-client";
import Userpage from "./Userpage.js";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import NewUser from "./NewUser";
import NewProvider from "./NewProvider";
import Success from "./Success";
import Subscription from "./Subscription";
import Providerpage from "./Providerpage";
import axios from "axios";
import Admin from "./Admin";
import ExtraCharge from "./ExtraCharge";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Cancel from "./Cancel";
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
  const [chatMessages, setChatMessages] = useState([]);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  // email for provider
  const [email2, setEmail2] = useState("");

  //Axios
  useEffect(() => {
    console.log("useEffect was called");
    axios.post("/allItems", { email }).then((res) => setItems(res.data));
  }, []);

  return (
    <Router>
      <button onClick={() => setMessage("")}>
        <Link to="/">To go back home</Link>
      </button>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setMode={setMode}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/user"
          element={
            <Userpage
              user={user}
              message={message}
              success={success}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              setMode={setMode}
              mode={mode}
              items={items}
              email={email}
              setItems={setItems}
            />
          }
        />
        <Route path="/provider" element={<Providerpage user={user} />} />

        <Route
          path="/login/user"
          element={
            <Login
              setIsLogin={setIsLogin}
              setUser={setUser}
              setEmail={setEmail}
              mode="user"
            />
          }
        />
        <Route
          path="/login/provider"
          element={
            <Login
              setIsLogin={setIsLogin2}
              setUser={setUser}
              setEmail={setEmail2}
              mode="provider"
            />
          }
        />

        <Route path="signup/user" element={<NewUser />} />
        <Route path="signup/provider" element={<NewProvider />} />
        <Route
          path="admin"
          element={
            <Admin
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          }
        />
        <Route path="/?success=true" element={<Success message={message} />} />
        <Route path="/?canceled=true" element={<Cancel />} />
        <Route
          path="extra-charge"
          element={<ExtraCharge user={user} items={items} />}
        />
      </Routes>
    </Router>
    // <div>
    //   {mode === "homePage" ? (
    //     <Homepage setMode={setMode} />
    //   ) : mode === "userLogin" && isLogin ? (
    //     <Userpage
    //       user={user}
    //       message={message}
    //       success={success}
    //       chatMessages={chatMessages}
    //       setChatMessages={setChatMessages}
    //       setMode={setMode}
    //       mode={mode}
    //       items={items}
    //       email={email}
    //       setItems={setItems}
    //     />
    //   ) : mode === "userLogin" && !isLogin ? (
    //     <Login
    //       setIsLogin={setIsLogin}
    //       setUser={setUser}
    //       setEmail={setEmail}
    //       mode="user"
    //     />
    //   ) : mode === "providerLogin" && isLogin2 ? (
    //     <Providerpage user={user} />
    //   ) : mode === "providerLogin" && !isLogin2 ? (
    //     <Login
    //       setIsLogin={setIsLogin2}
    //       setUser={setUser}
    //       setEmail={setEmail2}
    //       mode="provider"
    //     />
    //   ) : mode === "registration" ? (
    //     <NewCustomer setMode={setMode} />
    //   ) : mode === "extraCharge" ? (
    //     <ExtraCharge user={user} items={items} />
    //   ) : (
    //     <Admin chatMessages={chatMessages} setChatMessages={setChatMessages} />
    //   )}
    // </div>
  );
}

export default App;
