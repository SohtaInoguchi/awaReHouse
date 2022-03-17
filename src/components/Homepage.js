import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BoxFlow } from "./BoxFlow";
import Response from "./Response";

import LearnMore from "./LearnMore";
import MoreLife from "./MoreLife";
import { Button } from "bootstrap";
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

  useEffect((e) => {
    const bodyRect = document.body.getBoundingClientRect();
    const sloganRect = document
      .getElementById("slogan")
      .getBoundingClientRect();

    // console.log(bodyRect.top - sloganRect.x);
    // window.scrollTo(
    //   0,
    //   document.getElementById("slogan").scrollIntoView(true, { block: "end" })
    // );
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
          <MoreLife />
          <div
            id="slogan"
            className="flex flex-col
           justify-center items-center w-full  py-12 my-10 bg-gray-200 border-2 border-gray-200"
          >
            <h3 className="flex text-gray-500 font-serif text-6xl ">
              More Space, More Life
            </h3>
          </div>
          <LearnMore />
          <div className="flex justify-center items-center w-full py-4 ">
            <button
              className="text-blue-600 bg-gray-200 rounded-lg mx-3 px-3 my-3 py-3 cursor-pointer hover:bg-gray-300"
              onClick={() => navigate("/signup/user")}
            >
              Sign Up as a User
            </button>
            <button
              className="text-blue-600 bg-gray-200 rounded-lg mx-3 px-3 my-3 py-3 cursor-pointer hover:bg-gray-300"
              onClick={() => navigate("/signup/provider")}
            >
              Sign Up as a Provider
            </button>
          </div>
          <div className="flex justify-center items-center bg-gray-50 w-full h-36">
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
