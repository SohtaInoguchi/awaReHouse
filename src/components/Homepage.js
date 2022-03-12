import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Response from "./Response";
import { FaUserTie, FaUser, FaUserShield } from "react-icons/fa";

import Icon from "./Icon";
import LearnMore from "./LearnMore";
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
        <div className="flex flex-wrap justify-center items-center ">
          {" "}
          <div className="homepageContainer flex justify-center items-center flex-wrap ">
            <img
              className="top-0 w-20 h-20 rounded-3xl"
              src={require("../pictures/LOGO.png")}
              alt=""
            />

            <h1 className="welcomeMessage flex flex-wrap">awaReHouse</h1>

            <div className="flex flex-row flex-wrap ">
              <div className="flex ">
                <div className="flex justify-center items-center">
                  <button
                    className="login-button"
                    onClick={() => navigate("/login/user")}
                  >
                    <Icon icon={<FaUser size="24" />} />
                    User
                  </button>
                </div>

                <div className="">
                  <button
                    className="login-button"
                    onClick={() => {
                      navigate("/login/provider");
                    }}
                  >
                    <Icon icon={<FaUserTie size="24" />} />
                    Provider
                  </button>
                </div>

                <button
                  className="login-button"
                  onClick={() => navigate("admin")}
                >
                  <Icon icon={<FaUserShield size="24" />} />
                  Admin
                </button>
              </div>
            </div>
            <div className="containerHomeRight"></div>
          </div>
          <div className="flex flex-row justify-center  text-white rounded-xl text-center w-full  flex-wrap  ">
            <img
              className=" object-contain w-auto rounded-tl-3xl rounded-bl-3xl opacity-80"
              // src={require("../pictures/homepage-img.jpeg")}
              src={require("../pictures/clean-house.jpeg")}
              alt=""
            />
            <div className="flex flex-col justify-center items-center w-60 bg-gray-100 text-blue-500 text-center cursor-pointer rounded-tr-3xl rounded-br-3xl border-2 ">
              <h2>What is awaReHouse?</h2>
              <p className="break-words">
                awaReHouse is the something makes your life better. So let's
                imagine you can make money without working. That sounds splendid
                doesn't it?
              </p>
              <p
                className="rounded-3xl bg-slate-300 px-2 py-2 mx-2 my-2 hover:bg-slate-400"
                onClick={() => navigate("/learn")}
              >
                Learn more
              </p>
            </div>
          </div>
          <div
            className="flex flex-col
           justify-center items-center border-8 w-full mx-3 my-12 px-3 py-12 bg-gray-200 "
          >
            <h3 className="flex text-gray-500 font-serif text-6xl ">
              More Space, More Life
            </h3>
          </div>
          <LearnMore />
        </div>
      )}
    </div>
  );
}
