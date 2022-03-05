import React from "react";
import axios from "axios";
export default function Login({ setIsLogin, setUser, setEmail }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input
          id="email"
          type="text"
          placeholder="Email Address"
          value="hirochanyakosen@yahoo.co.jp"
        />
        <input
          id="first_name"
          type="text"
          placeholder="First Name"
          value="Hiromi"
        />
        <input
          id="last_name"
          type="text"
          placeholder="Last Name"
          value="Sato"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value="SatoHiro2307"
        />
        <button
          className=""
          onClick={(e) => {
            // e.preventDefault();
            console.log("clicked");
            axios
              .post("/login", {
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
              })
              .then((res) => {
                setIsLogin(res.data.boolean);
                setUser(res.data.first_name);
                setEmail(res.data.email);
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
