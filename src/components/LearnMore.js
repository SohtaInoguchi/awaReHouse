import React from "react";

export default function LearnMore() {
  return (
    <div className="flex flex-row justify-center ">
      <div className="learn-more-e ">
        <h4 className="text-center my-3">Why using awaReHouse?</h4>
        <img
          className="flex align-end h-auto"
          src={require("../pictures/Tiny-house.jpeg")}
          alt=""
        />
        <p className="break-words mx-3 my-3 px-3 py-3">
          <p>To store low-frequency usage items at low cost</p>
          
          <p>With awaReHouse, you do not have to choose between getting rid of items and enjoying a comfortable living space anymore</p>
        </p>
      </div>
      <div className="learn-more-e ">
        <h4 className="text-center my-3">
          Looking for passive income?
        </h4>
        <img
          className="flex align-end h-auto"
          src={require("../pictures/relaxing-man.webp")}
          alt="relaxing man"
        />
        <p className="break-words mx-3 my-3 px-3 py-3">
        <p>Generate revenue by simply turning rooms into storage</p>
          <p>With awaReHouse, you can create monthly revenues without effort, by simply offering available rooms you have in your property for storage</p>
        </p>
      </div>
      <div className="learn-more-e">
        <h4 className="text-center my-3">Why so cheap?</h4>
        <img src={require("../pictures/reasonable-price.jpeg")} alt="" />
        <p className="break-words mx-3 my-3 px-3 py-3">
        <p>Storage solutions in Japan are costly</p>
        <p>By focusing on seasonal items, awaReHouse is able to offer the cheapest rate on the market, while your stored items remain fully available </p>
        </p>
      </div>
    </div>
  );
}
