import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Response from "./Response";


export default function Homepage({
  setMode,
  setNewCustomer,
  updateItemList,
  message,
  setMessage,
}) {
  const navigate = useNavigate();

  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [query]);

  return (
    <div>
      {message ? (
        <Response message={message} />
      ) : (
        <div>
          {" "}
          <div className="toni">Toni</div>
          <div className="bg-red-500 text-yellow-300">jeje</div>
          <div className="homepageContainer">
            <div className="containerHomeLeft">
              <img
                className="logo"
                src={require("../pictures/LOGO.png")}
                alt="logo awaReHouse"
              />
              <h1 className="welcomeMessage">
                Welcome to <br></br> awaReHouse
              </h1>
            </div>
            <div className="containerHomeRight">
              <img
                className="homeImages"
                src={require("../pictures/1.jpg")}
                alt="moving boxes"
              />
              <img
                className="homeImages"
                src={require("../pictures/2.jpg")}
                alt="storage place"
              />
            </div>
          </div>
          <div className="homeButtons">
            <div className="homeUser">
              <button
                className="loginButton"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login/user")}
              >
                User LOGIN
              </button>
              <div>
                <br></br>
                Want to become a user? <br></br>
                <p
                  className="signup"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/signup/user");
                  }}
                >
                  SIGN UP
                </p>
              </div>
            </div>
            <div className="homeProvider">
              <button
                className="loginButton"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login/provider");
                }}
              >
                Provider LOGIN
              </button>
              <div>
                <br></br>
                Want to become a provider? <br></br>
                <p
                  className="signup"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/signup/provider")}
                >
                  SIGN UP
                </p>
              </div>
            </div>
            <h1 className="admin" onClick={() => navigate("admin")}>
              Admin
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
