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
          <div className="homepageContainer  flex justify-center items-center">
            <img
              className="top-0 w-20 h-20 rounded-3xl"
              src={require("../pictures/LOGO.png")}
              alt=""
            />
            <div className="flex ">
              {/* justify-center items-center */}
              <h1 className="welcomeMessage flex ">awaReHouse</h1>
            </div>

            <div className="containerHomeRight">
              {/* <img
                className="homeImages"
                src={require("../pictures/1.jpg")}
                alt="moving boxes"
              />
              <img
                className="homeImages"
                src={require("../pictures/2.jpg")}
                alt="storage place"
              /> */}
            </div>
          </div>
          <div
            className="opacity-70 text-white bg-gray-600 rounded-xl text-center w-auto mx-2 my-20 px-2 py-20 cursor-pointer"
            onClick={() => console.log("clicked")}
          >
            What is awaReHouse?
          </div>
          <div className="homepage-p">awaReHouse is the xxxxx</div>
          <div className="opacity-50">Who is good for awaReHouse?</div>
          <div className="opacity-50">what is provider?</div>
          <div className="opacity-50">what is user need to do?</div>
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
