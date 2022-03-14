import React from 'react'
import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { OneFiftyStripe } from "./OneFiftyStripe";
import e from "cors";
import { useNavigate } from "react-router-dom";

export const BoxFlow = ({  user,
    message,
    success,
    items,
    chatMessages,
    setChatMessages,
    setMode,
    email,
    setItems,}) => {

    const [addItemFlow, setAddItemFlow] = useState(false);
    const [typeBoxFlow, setTypeBoxFlow] = useState(null);
    const [address, setAddress] = useState("");
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
  
    const retrieveAddress = async () => {
      await axios
        .get(`/users/${email}`)
        .then((res) => {
          setAddress(res.data[0].adress);
        })
        .catch(function (error) {
          console.log("NOPE! Address data not retrieved");
        });
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
  
    useEffect(() => {
      retrieveAddress();
    }, [setAddItemFlow]);
  
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
      <button style={{ cursor: "pointer" }} onClick={() => {
      setAddItemFlow(true);
      setDisplayTable(false);
      }}>
        Extra Storage
      </button>
        {addItemFlow === true ? (
        <div className="containerNewItem">
          <div className="newUser">
            PLEASE SELECT A SUITABLE BOX FOR YOUR GOODS
            <br></br>
            <br></br>
            <img
              className="boxPicture"
              src={require("../pictures/corrugated-boxes.jpg")}
              style={{ height: 200 }}
            />
            <br></br>
            <br></br>
            Box Type A (27cm x 38cm x 29cm) - Maximum weight = 7.5 kg:
            <input
              type="radio"
              name="boxType"
              value="A (27cm x 38cm x 29cm)"
              id="A"
              onChange={handleChange}
            />
            <br></br>
            Box Type B (32cm x 46cm x 29cm) - Maximum weight = 10.5 kg:
            <input
              type="radio"
              name="boxType"
              value="B (32cm x 46cm x 29cm)"
              id="B"
              onChange={handleChange}
            />
            <br></br>
            Box Type C (40cm x 60cm x 40cm) - Maximum weight = 24 kg:
            <input
              type="radio"
              name="boxType"
              value="C (40cm x 60cm x 40cm)"
              onChange={handleChange}
            />
            <br></br>
            Box Type D (175cm x 30cm x 15cm) - Maximum weight = 20 kg:
            <input
              type="radio"
              name="boxType"
              value="D (175cm x 30cm x 15cm)"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <input type="submit" value="Submit" onClick={submit1} />
            <button style={{ cursor: "pointer" }} onClick={cancel}>
              Go back
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {confirmationFlow === true ? (
        <div>
          <form>
            <br></br>
            You selected a type {typeBoxFlow} box. Please provde a brief description
            of the goods you want to store (e.g. Snowboard, summer clothes,
            barbecue set...)
            <br></br>
            <label>
              Goods description (required):
              <input
                type="text"
                name="description1"
                placeholder="Goods description"
                value={description1Flow}
                onChange={createDescription1}
              />
              <br></br>
              Goods description (optional):
              <input
                type="text"
                name="description2"
                placeholder="Goods description"
                value={description2Flow}
                onChange={createDescription2}
              />
              <br></br>
              Goods description (optional):
              <input
                type="text"
                name="description3"
                placeholder="Goods description"
                value={description3Flow}
                onChange={createDescription3}
              />
              <br></br>
              <p style={{ display: "inline" }}>
                Check if box weighs more than 15 kg
              </p>
              <input
                type="checkbox"
                className="isHeavy"
                onChange={toggleIsHeavy}
              />
              <br></br>
              <p style={{ display: "inline" }}>
                Check if goods to be stored are fragile
              </p>
              <input
                type="checkbox"
                className="isFragile"
                onChange={toggleIsFragile}
              />
              <br></br>
            </label>
            The boxes will be sent to your registered address: {address}
            <br></br>
            <input
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={submit2}
            />
          </form>
          <button
            onClick={() => setConfirmationFlow(false)}
            style={{ cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4> : <div></div>}
      {boxOrderReceivedFlow === true ? (
        <h4>
          <OneFiftyStripe/>
        </h4>
      ) : (
        <div></div>
      )}


      {success === true ? <Success message={message} /> : <Subscription />}
    </div>
  )
}
