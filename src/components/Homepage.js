import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BoxFlow } from "./BoxFlow";
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
  const [isSuccess, setIsSuccess] = useState("");

  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      setIsSuccess(true);
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
      setIsSuccess(false);
    }
  }, [query]);

  return (
    <div>
      {message ? (
        <Response message={message} isSuccess={isSuccess} />
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
                    onClick={() => {
                      console.log(
                        window.localStorage.getItem("firstName_user")
                      );
                      if (window.localStorage.getItem("firstName_user")) {
                        window.localStorage.removeItem("firstName_provider");
                        window.localStorage.removeItem("email_provider");
                        window.localStorage.removeItem("token_provider");
                        navigate("/user");
                      } else navigate("/login/user");
                    }}
                  >
                    <Icon icon={<FaUser size="24" />} />
                    User
                  </button>
                </div>

                <div className="">
                  <button
                    className="login-button"
                    onClick={() => {
                      console.log(
                        window.localStorage.getItem("firstName_provider")
                      );
                      if (window.localStorage.getItem("firstName_provider")) {
                        window.localStorage.removeItem("firstName_user");
                        window.localStorage.removeItem("email_user");
                        window.localStorage.removeItem("token_user");
                        navigate("/provider");
                      } else navigate("/login/provider");
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
            <div className="flex flex-col justify-center items-center w-60 bg-gray-100 text-blue-500 text-center  rounded-tr-3xl rounded-br-3xl border-2 ">
              <h2>What is awaReHouse?</h2>
              <p className="break-words">
                awaReHouse is a service connecting private storage providers to storage seekers in Japan and is specifically designed for seasonal items
              </p>
              <p
                className="rounded-3xl text-blue-600 bg-slate-300 px-2 py-2 mx-2 my-2 hover:bg-slate-400 hover:text-blue-700 cursor-pointer"
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
