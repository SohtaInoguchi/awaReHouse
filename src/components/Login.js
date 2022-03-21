import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
export default function Login({ setIsLogin, setUser, setEmail, mode }) {
  const navigate = useNavigate();
  const userEmail = window.localStorage.getItem("email_user");
  const [usersCurrentPlan, setUsersCurrentPlan] = useState("");

  useEffect(() => {
    axios.get(`/login/verify/${userEmail}`).then((res) => {
      setUsersCurrentPlan(res.data);
      // usersCurrentPlan === "" ? navigate("/explanation") : navigate("/user");
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
          //
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
    <div className="login flex justify-center items-center w-full  px-72 py-72   ">
      <div className="homeUser flex flex-col justify-center items-center mx-4 my-2 px-4 py-2 rounded-3xl w-96 ">
        <Form
          className="text-center "
          onSubmit={(e) => {
            e.preventDefault();
            sendLoginRequest();
          }}
        >
          {mode === "user" ? "User" : "Provider"} Login
          <Form.Group>
            <Form.Control
              className="my-3"
              id="email"
              type="text"
              placeholder="Email"
              required
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group>
            <Form.Control
              className="my-3"
              id="first_name"
              type="text"
              placeholder="First Name"
              required
            ></Form.Control>
          </Form.Group> */}
          <Form.Group>
            <Form.Control
              className="my-3"
              id="password"
              type="password"
              placeholder="Password"
              required
            ></Form.Control>
          </Form.Group>
          <Button variant="light" type="submit">
            Login
          </Button>
        </Form>

        {mode === "user" ? (
          <div className="text-center pt-2">
            Want to become a user?
            <p
              className="signup cursor-pointer hover:text-blue-600"
              onClick={() => {
                navigate("/signup/user");
              }}
            >
              SIGN UP
            </p>
          </div>
        ) : (
          <div className="text-center pt-2">
            Want to become a storage provider?
            <p
              className="signup cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/signup/provider")}
            >
              SIGN UP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
