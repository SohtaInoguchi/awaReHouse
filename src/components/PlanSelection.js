import React from "react";

export default function PlanSelection({ plan, setPlan }) {
  return (
    <div>
      <div className="flex flex-row justify-center items-center  ">
        <div className="flex radio  w-auto">
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
          <div className="flex flex-col ">
            <div className="items flex  ">
              <div className="col  ">
                <img
                  className="h-60 w-60  animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
                <img
                  className=" h-60 w-60  animate-wiggle"
                  src={require("../pictures/boxes.png")}
                  alt="Picture for 10 boxes"
                />
              </div>
              <div className="ex border-8 bg-gray-200 rounded-3xl shadow-lg ">
                <h4 className="  text-center bg-gray-200 w-auto text-5xl">
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
              </div>
            </div>
          </div>
        ) : plan === "basic" ? (
          <div className="flex flex-col  ">
            <div className="items flex ">
              <img
                className=" h-80 w-80  animate-wiggle"
                src={require("../pictures/boxes.png")}
                alt="Picture for 5 boxes"
              />
              <div className="ex border-8 bg-gray-200 rounded-3xl shadow-lg ">
                <h4 className="   text-center bg-gray-200 w-auto text-5xl">
                  Basic Plan JPY3,999
                </h4>
                <p className=" bg-gray-200 text-2xl break-words ">
                  This is the basic plan that allows you to store up to 5 boxes
                  without any extra monthly cost. Ideal for a single person.
                </p>
                <div className="flex justify-center items-center bg-gray-300">
                  <img src={require("../pictures/basic.png")} alt="" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // <div className="flex flex-col ">
          //   <div className="items flex  ">
          //     <div className="col  ">
          //       <img
          //         className="h-80 w-80  animate-wiggle"
          //         src={require("../pictures/boxes.png")}
          //         alt="Picture for 5 boxes"
          //       />
          //     </div>
          //     <div className="ex border-8 bg-gray-200 rounded-3xl ">
          //       <h4 className="  text-center bg-gray-200 w-auto text-5xl">
          //         Basic Plan JPY3,999{" "}
          //       </h4>
          //       <p className=" bg-gray-200 text-2xl break-words  ">
          //         This is the basic plan that allows you to store up to 5 boxes
          //         without any extra monthly cost. Ideal for a single person.
          //       </p>
          //       <div className="flex justify-center items-center bg-gray-300">
          //         <img src={require("../pictures/basic.png")} alt="" />
          //       </div>
          //     </div>
          //   </div>
          // </div>
          ""
        )}
      </div>
    </div>
  );
}
