import React from "react";
import axios from "axios";
export default function Login({ setIsLogin, setUser, setEmail }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input
          id="email"
          type="text"
          // value="hirochanyakosen@yahoo.co.jp"
          placeholder="Email Address"
        />
        <input
          id="first_name"
          type="text"
          // value="Hiromi"
          placeholder="First Name"
        />
        <input
          id="last_name"
          type="text"
          // value="Sato"
          placeholder="Last Name"
        />
        <input
          id="password"
          type="password"
          // value="SatoHiro2307"
          placeholder="Password"
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
                console.log(res.data);
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
