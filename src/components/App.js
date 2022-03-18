import "../style.css";
import "../input.css";

import Userpage from "./Userpage.js";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import NewUser from "./NewUser";
import NewProvider from "./NewProvider";

import Providerpage from "./Providerpage";
import axios from "axios";
import Admin from "./Admin";
import ExtraCharge from "./ExtraCharge";
import BoxFlow from "./BoxFlow";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import LearnMore from "./LearnMore";
import ExplanationPage from "./ExplanationPage";
import WelcomingPage from "./WelcomingPage";

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
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  //Axios
  useEffect(() => {
    axios.post("/allItems", { email }).then((res) => setItems(res.data));
  }, []);

  // Delete later
  useEffect(() => {
    console.log("items in App", items);
  }, [items]);

  return (
    <div>
      <div className="header flex flex-row flex-wrap justify-between w-44  ">
        <img
          className="top-0 w-40 h-40 rounded-3xl cursor-pointer mx-3 my-3 border-8"
          src={require("../pictures/LOGO.png")}
          alt=""
          onClick={() => {
            window.scrollTo(500, 350);
            navigate("/");
          }}
        />
        <div className="flex flex-row flex-wrap justify-center items-center"></div>
      </div>

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
              address={address}
              setAddress={setAddress}
            />
          }
        />
        <Route
          path="/provider"
          element={<Providerpage user={user} email2={email2} />}
        />

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
        <Route path="signup/user/confirmation" element={<WelcomingPage/>}/>
        <Route path="signup/provider" element={<NewProvider />} />
        <Route path="signup/provider/confirmation" element={<WelcomingPage/>}/>
        <Route
          path="admin"
          element={
            <Admin
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          }
        />

        <Route
          path="extra-charge"
          element={
            <ExtraCharge
              user={user}
              items={items}
              email={email}
              setItems={setItems}
            />
          }
        />
        <Route path="learn" element={<LearnMore />} />
        <Route path="extra-storage" element={<BoxFlow addy={address} />} />
        <Route path="explanation" element={<ExplanationPage />} />
      </Routes>
    </div>
  );
}

export default App;
