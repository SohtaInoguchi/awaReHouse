import React from "react";

export default function LearnMore() {
  return (
    <div className="flex flex-row justify-between min-h-min my-10 ">
      <div className="learn-more-e  ">
        <h4 className="text-center my-3 text-2xl">Why use awaReHouse?</h4>
        <img
          className="flex align-end h-60"
          src={require("../pictures/Tiny-house.jpeg")}
          alt=""
        />
        <div className="break-words mx-3 my-3 px-3 py-3">
          <p className="text-xl">
            To store low-frequency usage items at a low cost
          </p>

          <p className="text-xl">
            With awaReHouse, you do not have to choose between getting rid of
            items and enjoying a comfortable living space
          </p>
        </div>
      </div>
      <div className="learn-more-e ">
        <h4 className="text-center my-3 text-2xl">
          Looking for passive income?
        </h4>
        <img
          className="flex align-end h-60"
          src={require("../pictures/relaxing-man.webp")}
          alt="relaxing man"
        />
        <div className="break-words mx-3 my-3 px-3 py-3">
          <p className="text-xl">
            Generate revenue by simply turning rooms into storage
          </p>
          <p className="text-xl">
            With awaReHouse, you can create monthly revenues effortlessly, by
            offering available rooms you have in your property for
            storage
          </p>
        </div>
      </div>
      <div className="learn-more-e">
        <h4 className="text-center my-3 text-2xl">Why so cheap?</h4>
        <img
          className="flex align-end h-60"
          src={require("../pictures/fair.jpeg")}
          alt=""
        />
        <div className="break-words mx-3 my-3 px-3 py-3">
          <p className="text-xl">Storage solutions in Japan are costly</p>
          <p className="text-xl">
            By focusing on seasonal items, awaReHouse is able to offer the
            cheapest rate on the market, while your stored items remain fully
            available{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
