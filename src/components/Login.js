import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
export default function Login({ setIsLogin, setUser, setEmail, mode }) {
  const navigate = useNavigate();
  const userEmail = window.localStorage.getItem("email_user");
  const [usersCurrentPlan, setUsersCurrentPlan] = useState("");

  useEffect(() => {
    axios.get(`/login/verify/${userEmail}`).then((res) => {
      setUsersCurrentPlan(res.data);
    });
  });
  function sendLoginRequest() {
    axios
      .post("/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        mode,
      })
      .then((res) => {
        setIsLogin(res.data.boolean);
        setUser(res.data.first_name);
        setEmail(res.data.email);
        console.log(res.data);
        if (res.data.boolean && mode === "user") {
          window.localStorage.setItem("token_user", res.data.token);
          window.localStorage.setItem("firstName_user", res.data.first_name);
          window.localStorage.setItem("email_user", res.data.email);
          window.localStorage.setItem("plan_user", res.data.plan);

          let numberOfBox = "";
          res.data.plan === "basic"
            ? (numberOfBox = "5")
            : res.data.plan === "premium"
            ? (numberOfBox = "10")
            : (numberOfBox = "0");
          window.localStorage.setItem("boxes_user", numberOfBox);

          if (
            window.localStorage.getItem("plan_user") === "premium" ||
            window.localStorage.getItem("plan_user") === "basic"
          )
            navigate("/user");
          else navigate("/explanation");
        } else if (res.data.boolean && mode === "provider") {
          window.localStorage.setItem("token_provider", res.data.token);
          window.localStorage.setItem(
            "firstName_provider",
            res.data.first_name
          );
          window.localStorage.setItem("email_provider", res.data.email);
          navigate("/provider");
        }
      });
  }
  return (
    <div className="login flex justify-center items-center  px-72 py-72   ">
      <div className=" flex flex-col justify-center items-center mx-4 my-2 px-4 py-2 rounded-3xl w-96 ">
        <LoginForm mode={mode} sendLoginRequest={sendLoginRequest} />

        {mode === "user" ? (
          <div className="text-center pt-2 text-white">
            Want to become a user?
            <p
              className=" cursor-pointer hover:text-blue-300 text-xl"
              onClick={() => {
                navigate("/signup/user");
              }}
            >
              SIGN UP
            </p>
          </div>
        ) : (
          <div className="text-center pt-2 text-white">
            Want to become a storage provider?
            <p
              className=" cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/signup/provider")}
            >
              SIGN UP
            </p>
          </div>
        )}
        <p
          className="cursor-pointer my-5 text-white"
          onClick={() => navigate("/")}
        >
          Back to Home
        </p>
      </div>
    </div>
  );
}
