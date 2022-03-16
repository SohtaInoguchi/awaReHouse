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
    window.scrollTo(0, 200);
  }, []);

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
          <div className="flex flex-row justify-center bg-white  text-blue-500 rounded-3xl text-center w-auto opacity-90 mt-12 flex-wrap">
            <img
              className=" object-contain w-auto rounded-tl-3xl rounded-bl-3xl opacity-80 "
              src={require("../pictures/clean-house.jpeg")}
              alt=""
            />
            <div className="flex flex-col justify-center items-center w-60  text-blue-500 text-center  rounded-tr-3xl rounded-br-3xl border-2 ">
              <h2>What is awaReHouse?</h2>
              <p className="break-words">
                awaReHouse is a service connecting private storage providers to
                storage seekers in Japan and is specifically designed for
                seasonal items
              </p>
              <p
                className="rounded-3xl text-blue-600 bg-slate-200 px-8 py-8 mx-8 my-8 hover:bg-slate-300 hover:text-blue-700 cursor-pointer"
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
          <div className="flex justify-center items-center bg-gray-600 w-full h-72">
            <h6>privacy&policy|</h6>
            <h6
              className="w-12 cursor-pointer"
              onClick={() => navigate("admin")}
            >
              Admin
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}
