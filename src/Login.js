import React from "react";
import axios from "axios";
export default function Login({ setIsLogin }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {/* <input id="email" type="text" placeholder="Email Address" /> */}
        <input id="first_name" type="text" placeholder="First Name" />
        <input id="last_name" type="text" placeholder="Last Name" />
        <input id="password" type="password" placeholder="Password" />
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
            axios
              .post("/login", {
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                //   email: document.getElementById("email").value,
                password: document.getElementById("password").value,
              })
              .then((res) => setIsLogin(res.data));
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
