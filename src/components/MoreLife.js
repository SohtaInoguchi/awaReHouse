import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButtons from "./LoginButtons";
export default function MoreLife() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end items-center more-life  w-full h-screen">
      <div className="flex flex-row justify-center items-center    text-blue-500 rounded-3xl text-center w-auto  mx-2    flex-wrap ">
        {/* <img
          className=" object-contain w-auto opacity-0 "
          src={require("../pictures/clean-house.jpeg")}
          alt=""
        /> */}
        <div className="flex flex-col justify-center  items-center   w-60  text-blue-500 text-center  rounded-3xl  mx-6  ">
          <h2>What is awaReHouse?</h2>

          <p className="break-words">
            awaReHouse is a service connecting private storage providers to
            storage seekers in Japan and is specifically designed for seasonal
            items
          </p>

          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
