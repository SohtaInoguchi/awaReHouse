import React from "react";

export default function LearnMore() {
  return (
    <div className="flex flex-row justify-center ">
      <div className="learn-more-e ">
        <h4 className="text-center my-3">Who is good for awaReHouse?</h4>
        <img
          className="flex align-end h-auto"
          src={require("../pictures/Tiny-house.jpeg")}
          alt=""
        />
        <p className="break-words mx-3 my-3 px-3 py-3">
          awaReHouse is good for someone who is looking for extra space in
          cheapest price in the market
        </p>
      </div>
      <div className="learn-more-e ">
        <h4 className="text-center my-3">
          Why is awaReHouse consider to be good?
        </h4>
        <img
          className="flex align-end h-auto"
          src={require("../pictures/relaxing-man.webp")}
          alt="relaxing man"
        />
        <p className="break-words mx-3 my-3 px-3 py-3">
          AwaReHouse is good because it helps you have more space. Remember More
          Space, More Life
        </p>
      </div>
      <div className="learn-more-e">
        <h4 className="text-center my-3">Why is awaReHouse so cheap?</h4>
        <img src={require("../pictures/reasonable-price.jpeg")} alt="" />
        <p className="break-words mx-3 my-3 px-3 py-3">
          Japan is the extremely packed country except urban area. We store
          items in sub-urban area. Therefore, it is cheaper than renting
          container in Tokyo.
        </p>
      </div>
    </div>
  );
}
