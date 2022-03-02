import React from "react";
import axios from "axios";
export default function Login() {
  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        action="submit"
      >
        <input className="" type="text" placeholder="Email Address" />
        <input className="" type="text" placeholder="First Name" />
        <input className="" type="text" placeholder="Last Name" />
        <button
          className=""
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            axios.get("/login");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
