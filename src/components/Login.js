import React from "react";
import axios from "axios";
export default function Login({ setIsLogin, setUser, setEmail, mode }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
<<<<<<< HEAD
        <input
          id="email"
          type="text"
          value="hirochanyakosen@yahoo.co.jp"
          placeholder="Email Address"
        />
        <input
          id="first_name"
          type="text"
          value="Hiromi"
          placeholder="First Name"
        />
        <input
          id="last_name"
          type="text"
           value="Sato"
         placeholder="Last Name"
        />
        <input
          id="password"
          type="password"
          value="SatoHiro2307"
          placeholder="Password"
        />
=======
        <input id="email" type="text" placeholder="Email Address" />
        <input id="first_name" type="text" placeholder="First Name" />
        <input id="last_name" type="text" placeholder="Last Name" />
        <input id="password" type="password" placeholder="Password" />
>>>>>>> b9254ff1d312058c6616ae6d414d5585188dd969
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
