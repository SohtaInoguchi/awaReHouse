import React from "react";
import axios from "axios";
export default function Login({ setIsLogin, setUser }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input id="email" value="k13.Mizuumi@gmail.com" type="text" placeholder="Email Address" />
        <input id="first_name" value="Kaori" type="text" placeholder="First Name" />
        <input id="last_name" value="Mizumi" type="text" placeholder="Last Name" />
        <input id="password" value="ichiGO111" type="password" placeholder="Password" />
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
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
