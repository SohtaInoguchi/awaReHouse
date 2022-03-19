import React from "react";
import "../input.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { OneFiftyStripe } from "./OneFiftyStripe";
import { useNavigate } from "react-router-dom";
import { Accordion, Button, Form } from "react-bootstrap";

export default function BoxFlow({ email, setItems, addy }) {
  const [addItemFlow, setAddItemFlow] = useState(false);
  const [typeBoxFlow, setTypeBoxFlow] = useState(null);
  // const [address, setAddress] = useState("");
  const [confirmationFlow, setConfirmationFlow] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [description1Flow, setDescription1Flow] = useState("");
  const [description2Flow, setDescription2Flow] = useState("");
  const [description3Flow, setDescription3Flow] = useState("");
  const [boxOrderReceivedFlow, setBoxOrderReceivedFlow] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [isHeavyFlow, setIsHeavyFlow] = useState(false);
  const [isFragileFlow, setIsFragileFlow] = useState(false);
  const [storagePlacesFlow, setStoragePlacesFlow] = useState("");
  const navigate = useNavigate();

  const createDescription1 = (e) => {
    setDescription1Flow(e.target.value);
  };

  const createDescription2 = (e) => {
    setDescription2Flow(e.target.value);
  };

  const createDescription3 = (e) => {
    setDescription3Flow(e.target.value);
  };

  const handleChange = (e) => {
    setTypeBoxFlow(e.target.value);
  };

  // for toggling isHeavy/fragile
  const toggleIsHeavy = () => {
    if (isHeavyFlow === false) {
      setIsHeavyFlow(true);
    } else {
      setIsHeavyFlow(false);
    }
  };

  const toggleIsFragile = () => {
    if (isFragileFlow === false) {
      setIsFragileFlow(true);
    } else {
      setIsFragileFlow(false);
    }
  };

  // useEffect(() => {
  //   retrieveAddress();
  // }, [setAddItemFlow]);

  const submit1 = () => {
    if (typeBoxFlow === null) {
      setTryAgain(true);
    }
    if (typeBoxFlow !== null) {
      setConfirmationFlow(true);
    }
  };

  const cancel = () => {
    setAddItemFlow(false);
    setTryAgain(false);
    setTypeBoxFlow(null);
    setConfirmationFlow(false);
    setBoxOrderReceivedFlow(false);
  };

  const possibleStoragelocations = async () => {
    await axios
      .get("/providers")
      .then((res) => {
        setStoragePlacesFlow(res.data);
      })
      .catch(function (error) {
        console.log("NOPE! Address data not retrieved");
      });
  };

  useEffect(() => {
    possibleStoragelocations();
  }, []);

  const max = storagePlacesFlow.length;
  const randomValue = Math.floor(Math.random() * max);

  const sendBoxRequest = () => {
    axios
      .post("/inventory", {
        declared_content_one: description1Flow,
        declared_content_two: description2Flow,
        declared_content_three: description3Flow,
        storage_location: `${storagePlacesFlow[randomValue].adress}`,
        weight_in_kg: "3.41",
        declared_as_fragile: false,
        expected_retrieval_season: "autumn",
        user_owner: email,
        fragile: isFragileFlow,
        heavy: isHeavyFlow,
        // send heavy and fragile boolean
      })
      .then(() => {
        console.log("Your database has been updated!");
      })
      .catch(function (error) {
        console.log("NOPE! Problem with inventory update");
      });
  };

  const updateItemList = () => {
    axios.post("/allItems", { email }).then((res) => setItems(res.data));
  };

  const submit2 = (e) => {
    e.preventDefault();
    updateItemList();
    setDescription1Flow("");
    setDescription2Flow("");
    setDescription3Flow("");
    setConfirmationFlow(false);
    setBoxOrderReceivedFlow(true);
    setAddItemFlow(false);
    setTryAgain(false);
    setIsFragileFlow(false);
    setIsHeavyFlow(false);
    sendBoxRequest();
  };

  return (
    <div>
        <div className="buttonDiv">
          <button className="backButtonExtraStorage" onClick={() => navigate("/user")}>Back To User Page</button>
        </div>

      <div className=" rounded-3xl mx-8">
        <Accordion>
          <Accordion.Item className="">
            <Accordion.Header>
              PLEASE SELECT A SUITABLE BOX FOR YOUR ITEM
            </Accordion.Header>
            <Accordion.Body>
              <div className="flex justify-center items-center">
                <img
                  className=""
                  src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}
                  style={{ height: 350 }}
                />
              </div>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
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
              <div className="flex justify-center items-center">
                {/* <Button
                        className="my-3"
                        onClick={(e) => {
                          if (typeBox === null || typeBox.length === 0) return;
                          console.log(e.target);
                          setConfirmation(true);
                          document
                            .getElementById("confirmation-form")
                            .classList.remove("boxes-before");
                          document
                            .getElementById("confirmation-form")
                            .classList.add("boxes-after");
                        }}
                      >
                        Add Item
                      </Button> */}
                {/* <Button onClick={() => setConfirmation(false)}>
                    Go Back
                  </Button> */}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="flex justify-center items-center mx-5 px-5  ">
        <Form
          action="/create-checkout-session"
          method="POST"
          id="confirmation-form"
          className="bg-gray-200 text-blue-600 rounded-3xl px-3 py-3 "
        >
          You selected a type {typeBoxFlow} box.
          <br /> Please provide a brief description of the items you want to
          store (e.g. Snowboard, summer clothes, barbecue set...)
          <Form.Group className="w-96">
            <Form.Control
              type="text"
              name="description1"
              placeholder="Item description (required)"
              required
              value={description1Flow}
              onChange={createDescription1}
            />
          </Form.Group>
          <Form.Group className="w-96">
            <Form.Control
              type="text"
              name="description2"
              placeholder="Item description (optional)"
              value={description2Flow}
              onChange={createDescription2}
            />
          </Form.Group>
          <Form.Group className="w-96">
            <Form.Control
              type="text"
              name="description3"
              placeholder="Item description (optional)"
              value={description3Flow}
              onChange={createDescription3}
            />
          </Form.Group>
          {/* Fragile and heavy flag  */}
          <Form.Group className="w-96">
            <Form.Check
              type="checkbox"
              label="Heavy"
              onChange={toggleIsHeavy}
            />
          </Form.Group>
          <Form.Group className="w-96">
            <Form.Check
              type="checkbox"
              label="Fragile"
              onChange={toggleIsFragile}
            />
          </Form.Group>
          Sending address:{" "}
          <p className=" bg-blue-200  rounded-lg w-96">{addy}</p>
          <div className="flex justify-center items-center">
            <OneFiftyStripe />
          </div>
        </Form>
      </div>

      {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4> : <div></div>}
    </div>
  );
}
