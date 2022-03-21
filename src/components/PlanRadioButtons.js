import React from "react";

export default function PlanRadioButtons({ setPlan }) {
  return (
    <div className="flex radio  w-auto ">
      <label className="btn btn-secondary active option ">
        <input
          type="radio"
          name="options"
          value="basic"
          onClick={() => {
            setPlan("basic");
          }}
        />{" "}
        Basic plan
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
      </label>
    </div>
  );
}
