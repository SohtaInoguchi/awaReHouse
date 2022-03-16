import React from 'react';
import { Accordion } from 'react-bootstrap';

export default function BoxSelection(props) {

   const { handleChange } = props;

  return (
    <div id='box-type-selection-wrapper'>
    <div id="box-type-selection">
            PLEASE SELECT THE SIZE OF BOX
        <div className="flex justify-center items-center">
            <img
            className=""
            src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}
            style={{ height: 200 }}
            />
        </div>
        <div
            className="btn-group btn-group-toggle"
            data-toggle="buttons"
        >
            <label className="btn btn-secondary active">
            <input
                type="radio"
                name="options"
                id="option1"
                value="A (27cm x 38cm x 29cm : Max weight = 7.5 kg)"
                onChange={handleChange}
            />{" "}
            Type A
            </label>
            <label className="btn btn-secondary">
            <input
                type="radio"
                name="options"
                id="option2"
                value="B (32cm x 46cm x 29cm : Max weight = 10.5 kg)"
                onChange={handleChange}
            />{" "}
            Type B
            </label>
            <label className="btn btn-secondary">
            <input
                type="radio"
                name="options"
                id="option3"
                value="C (40cm x 60cm x 40cm : Max weight = 24 kg)"
                onChange={handleChange}
            />{" "}
            Type C
            </label>
            <label className="btn btn-secondary">
            <input
                type="radio"
                name="options"
                id="option4"
                value="D (175cm x 30cm x 15cm : Max weight = 20 kg)"
                onChange={handleChange}
            />{" "}
            Type D
            </label>
        </div>
        <div className="flex justify-center items-center"></div>
    </div>
  </div>
  )
}
