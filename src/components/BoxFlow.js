import React from "react";
import "../input.css";

import { useState, useEffect } from "react";

import axios from "axios";
import { OneFiftyStripe } from "./OneFiftyStripe";

import { useNavigate } from "react-router-dom";
import { Accordion, Button, Form } from "react-bootstrap";
import BoxSelection from "./BoxSelection";
import ExtraStorageModal from "./ExtraStorageModal";

export default function BoxFlow({ email, setItems, address }) {
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
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
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
        // user_owner: email,
        user_owner: window.localStorage.email_user,
        fragile: isFragileFlow,
        heavy: isHeavyFlow,
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

    // document.getElementById("extra-storage").disabled = false;
  };

  const check = () => {
    console.log("isconfirmed", isConfirmed);
  }

  const sendDataAndCheckout = () => {
    setIsConfirmed(!isConfirmed);
    setModalShow(!modalShow);
  }

  return (
    <div>
      <div className="flex justify-center items-center  ">
        <p className="flex bg-gray-200 text-red-600 rounded-lg px-3 py-3 mx-3 my-3">
          Extra Storage Page
        </p>
      </div>
      <div className="flex justify-end mx-5 my-2 px-2 py-2">
        <Button onClick={() => navigate("/user")}>Go Back To User Page</Button>
      </div>

    <section id="box-select-extra-storage">
      <div id="box-selection-wrapper">

      <BoxSelection handleChange={handleChange} />


        <section id="item-description-wrapper">
          <article id="item-description">
              <Form
                action="/create-checkout-session"
                method="POST"
                id="confirmation-form"
                className=" text-blue-600 px-3 py-3 "
              >
              <div id="box-select-header">
                <p>You selected a type {typeBoxFlow} box.</p>
                <p>Please provide a brief description of the items you want to
                store (e.g. Snowboard, summer clothes, barbecue set...)</p>
              </div>
                <Form.Group className="form-inputs">
                  <Form.Control
                    type="text"
                    name="description1"
                    placeholder="Item description (required)"
                    required
                    value={description1Flow}
                    onChange={createDescription1}
                  />
                </Form.Group>
                <Form.Group className="form-inputs">
                  <Form.Control
                    type="text"
                    name="description2"
                    placeholder="Item description (optional)"
                    value={description2Flow}
                    onChange={createDescription2}
                  />
                </Form.Group>
                <Form.Group className="form-inputs">
                  <Form.Control
                    type="text"
                    name="description3"
                    placeholder="Item description (optional)"
                    value={description3Flow}
                    onChange={createDescription3}
                  />
                </Form.Group>
                {/* Fragile and heavy flag  */}
                <Form.Group className="form-inputs">
                  <Form.Check
                    type="checkbox"
                    label="Heavy"
                    onChange={toggleIsHeavy}
                    className="item-description-checkbox"
                  />
                </Form.Group>
                <Form.Group className="form-inputs">
                  <Form.Check
                    type="checkbox"
                    label="Fragile"
                    onChange={toggleIsFragile}
                    className="item-description-checkbox"
                  />
                </Form.Group>
                <p id="address">Your address: {address}</p>

                <Button 
                className='ml-10 my-8' 
                id='extra-storage' 
                onClick={() => setModalShow(true)}
                >Checkout</Button>
                <ExtraStorageModal show={modalShow}
                onHide={setModalShow}
                submit2={submit2}
                />
                <Button onClick={() => console.log("email", email)}>Check email</Button>
                {/* <div className="flex justify-center items-center">
                  <OneFiftyStripe />
                </div> */}
              </Form>
            </article>
        </section>
      {/* </div> */}
      {/* -------box-selection-wrapper END-------- */}
      </div>
    </section>
      {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4> : <div></div>}
    </div>
// --------ITEM DESCRIPTION FORM END-------
  );
}
