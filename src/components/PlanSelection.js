import React from "react";

export default function PlanSelection({ plan, setPlan }) {
  return (
    <div>
      <div className="flex flex-row justify-center items-center border-8 ">
        <div className="flex radio border-8 border-orange-200 w-auto">
          <label className="btn btn-secondary active option">
            <input
              type="radio"
              name="options"
              value="basic"
              onClick={() => {
                setPlan("basic");
              }}
            />{" "}
            Basic plan
            <p className="box-dimension">Up to 5 boxes for free storage</p>
          </label>
          <label className="btn btn-secondary option">
            <input
              type="radio"
              name="options"
              value="premium"
              onClick={() => {
                setPlan("premium");
              }}
            />{" "}
            Premium
            <p className="box-dimension">Up to 10 boxes for free storage</p>
          </label>
        </div>
        {plan === "premium" ? (
          <div className="flex flex-col border-emerald-200 border-8">
            <div className="items flex  border-8 border-purple-500">
              <div className="col border-8 border-cyan">
                <img
                  className="h-60 w-60 border-8 animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
                <img
                  className=" h-60 w-60 border-8 animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
              </div>
              <div className="ex">
                <h4 className=" border-8 text-center bg-white">
                  Premium Plan JPY5,999
                </h4>
                <p className="border-8 border-blue-300 bg-white">
                  This is the premium plan that allows you to store up to 10
                  boxes without any extra monthly cost. Ideal for families or
                  couples.
                </p>
              </div>
            </div>
          </div>
        ) : plan === "basic" ? (
          <div className="flex flex-col border-emerald-200 border-8 ">
            <div className="items flex  border-8 border-purple-500">
              <img
                className=" h-80 w-80 border-8 animate-wiggle"
                src={require("../pictures/boxes.png")}
                alt="Picture for 5 boxes"
              />
              <div className="ex">
                <h4 className=" border-8 text-center bg-white">
                  Basic Plan JPY3,999
                </h4>
                <p className="border-8 border-blue-300 bg-white">
                  This is the basic plan that allows you to store up to 5 boxes
                  without any extra monthly cost. Ideal for a single person.
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
