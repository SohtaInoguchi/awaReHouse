import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Response({ message, isSuccess }) {
  const navigate = useNavigate();

  isSuccess &&
    setTimeout(() => {
      document.getElementById("heart").classList.remove("heart-before");
    }, 3500);
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="bg-white w-96 rounded-lg mx-3 my-3 px-3 py-3 text-center ">
          {message}
        </div>
      </div>
      {isSuccess ? (
        <div className="flex justify-center items-center mx-3 my-3 px-3 py-3 ">
          <img
            id="heart"
            className="heart-before   opacity-80  rounded-3xl  px-3 py-3 mx-3 my-3 "
            src={require("../pictures/heart.png")}
            alt=""
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mx-3 my-3 px-3 py-3 ">
          <img
            className="border-8 bg-blue-300 opacity-80  rounded-3xl  px-3 py-3 mx-3 my-3 "
            src={require("../pictures/announcement.jpeg")}
            alt=""
          />
        </div>
      )}
      <div className="flex justify-center items-center">
        <Button onClick={() => navigate("/user")}>Go back to user page</Button>
      </div>
    </div>
  );
}
