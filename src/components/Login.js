import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login({ setIsLogin, setUser, setEmail, mode }) {
  let navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input id="email" type="text" placeholder="Email Address" />
        <input id="first_name" type="text" placeholder="First Name" />
        <input id="password" type="password" placeholder="Password" />
        <button
          className=""
          onClick={() => {
            console.log("clicked");
            console.log(mode);
            axios
              .post("/login", {
                first_name: document.getElementById("first_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                mode,
              })
              .then((res) => {
                setIsLogin(res.data.boolean);
                setUser(res.data.first_name);
                setEmail(res.data.email);
                if (res.data.boolean && mode === "user") navigate("/user");
                else if (res.data.boolean && mode === "provider")
                  navigate("/provider");
              });
          }}
        >
          Login
        </button>
      </div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
