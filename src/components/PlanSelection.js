import React from "react";
import ExplainButtons from "./ExplainButtons";
import PlanRadioButtons from "./PlanRadioButtons";
import { Button } from "react-bootstrap";
export default function PlanSelection({ plan, setPlan }) {
  return (
    <div className="">
      <div className="flex flex-row justify-center items-center ">
        {plan === "premium" ? (
          <div className="flex flex-col">
            <div className="items flex ">
              <div className="col mx-5  ">
                <img
                  className="h-60 w-80  animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
                <img
                  className=" h-60 w-80  animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
              </div>
              <div className="ex border-8 bg-gray-200 rounded-3xl shadow-lg">
                <div className="flex justify-center items-center">
                  <PlanRadioButtons setPlan={setPlan} />
                </div>
                <h4 className="mt-3  text-center bg-gray-200 w-auto text-5xl">
                  Premium Plan JPY5,999
                </h4>
                <p className=" bg-gray-200 text-2xl break-words  ">
                  This is the premium plan that allows you to store up to 10
                  boxes without any extra monthly cost. Ideal for families or
                  couples.
                </p>
                <div className="flex justify-center items-center bg-gray-300">
                  <img src={require("../pictures/PREMIUM.png")} alt="" />
                </div>
                <ExplainButtons />
              </div>
            </div>
          </div>
        ) : plan === "basic" ? (
          <div className="flex flex-col  ">
            <div className="items flex  ">
              <img
                className=" h-80 w-80  animate-wiggle mx-5"
                src={require("../pictures/boxes.png")}
                alt="Picture for 5 boxes"
              />
              <div className="ex border-8 bg-gray-200 rounded-3xl shadow-lg ">
                <div className="flex justify-center items-center">
                  <PlanRadioButtons setPlan={setPlan} />
                </div>
                <h4 className="mt-3 text-center bg-gray-200 w-auto text-5xl">
                  Basic Plan JPY3,999
                </h4>
                <p className=" bg-gray-200 text-2xl break-words ">
                  This is the basic plan that allows you to store up to 5 boxes
                  without any extra monthly cost. Ideal for a single person.
                </p>
                <div className="flex justify-center items-center bg-gray-300">
                  <img src={require("../pictures/basic.png")} alt="" />
                </div>
                <ExplainButtons />
              </div>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            <div className="flex flex-col items-center justify-center bg-gray-200 rounded-3xl px-3 py-3 ">
              <p className="mt-3 text-center bg-gray-200 w-auto text-5xl">
                Let's start awaReHouse
              </p>
              <img
                className="h-80 w-80 "
                src={require("../pictures/LOGO.png")}
                alt=""
              />
              <Button className="mx-3 my-3" onClick={() => setPlan("basic")}>
                Start
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
