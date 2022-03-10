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
        <input id="last_name" type="text" placeholder="Last Name" />
        <input id="password" type="password" placeholder="Password" />
        <button
          className=""
          onClick={(e) => {
            // e.preventDefault();
            console.log("clicked");
            console.log(mode);
            axios
              .post("/login", {
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                mode,
              })
              .then((res) => {
                console.log("nan naya");
                console.log(res.data);
                setIsLogin(res.data.boolean);
                setUser(res.data.first_name);
                setEmail(res.data.email);
                if (res.data.boolean) navigate("/user");
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
