import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButtons from "./LoginButtons";
export default function MoreLife() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end items-center more-life w-screen h-screen">
      <div className="flex flex-row justify-center items-center    text-blue-500 rounded-3xl text-center w-auto  mx-2    flex-wrap ">
        <div className="flex flex-col justify-center  items-center   w-60  text-blue-500 text-center  rounded-3xl  mx-6  ">
          <p className="text-5xl ">What is awaReHouse?</p>

          <p className="break-words text-xl ">
            awaReHouse is a service connecting private storage providers to
            storage seekers in Japan, specifically designed for seasonal items
          </p>

          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
