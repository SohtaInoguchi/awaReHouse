import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Userpage({
  user,
  message,
  success,
  items,
  chatMessages,
  setChatMessages,
  setMode,
  email,
  setItems,
}) {
  function retrieveData() {
    setMode("extraCharge");
  }

  const storeOnClick = () => {
    console.log("store clicked");
  };

  const [addItem, setAddItem] = useState(false);
  const [typeBox, setTypeBox] = useState(null);
  const [address, setAddress] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [boxOrderReceived, setBoxOrderReceived] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [isHeavy, setIsHeavy] = useState(false);
  const [isFragile, setIsFragile] = useState(false);
  const [storagePlaces, setStoragePlaces] = useState("");
  const navigate = useNavigate();

  const createDescription1 = (e) => {
    setDescription1(e.target.value);
  };

  const createDescription2 = (e) => {
    setDescription2(e.target.value);
  };

  const createDescription3 = (e) => {
    setDescription3(e.target.value);
  };

  const handleChange = (e) => {
    setTypeBox(e.target.value);
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
    if (isHeavy === false) {
      setIsHeavy(true);
    } else {
      setIsHeavy(false);
    }
  };

  const toggleIsFragile = () => {
    if (isFragile === false) {
      setIsFragile(true);
    } else {
      setIsFragile(false);
    }
  };

  useEffect(() => {
    retrieveAddress();
  }, [setAddItem]);

  const submit1 = () => {
    if (typeBox === null) {
      setTryAgain(true);
    }
    if (typeBox !== null) {
      setConfirmation(true);
    }
  };

  const cancel = () => {
    setAddItem(false);
    setTryAgain(false);
    setTypeBox(null);
    setConfirmation(false);
    setBoxOrderReceived(false);
  };

  const possibleStoragelocations = async () => {
    await axios
      .get("/providers")
      .then((res) => {
        setStoragePlaces(res.data);
      })
      .catch(function (error) {
        console.log("NOPE! Address data not retrieved");
      });
  };

  useEffect(() => {
    possibleStoragelocations();
  }, []);

  const max = storagePlaces.length;
  const randomValue = Math.floor(Math.random() * max);

  const sendBoxRequest = () => {
    axios
      .post("/inventory", {
        declared_content_one: description1,
        declared_content_two: description2,
        declared_content_three: description3,
        storage_location: `${storagePlaces[randomValue].adress}`,
        weight_in_kg: "3.41",
        declared_as_fragile: false,
        expected_retrieval_season: "autumn",
        user_owner: email,
        fragile: isFragile,
        heavy: isHeavy,
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
    setDescription1("");
    setDescription2("");
    setDescription3("");
    setConfirmation(false);
    setBoxOrderReceived(true);
    setAddItem(false);
    setTryAgain(false);
    setIsFragile(false);
    setIsHeavy(false);
    sendBoxRequest();
  };

  return (
    <div>
      Welcome back {user}
      <h3>NEXT RETRIEVAL PERIOD: April 22nd - May 10th</h3>
      <div className="flex flex-row justify-between  border-8  ">
        <div className="flex flex-col justify-center items-center max-w-lg mx-5 px-5 border-8 ">
          <Button
            className="max-w-lg"
            onClick={() => {
              setAddItem(!addItem);
              // setDisplayTable(false);
              setBoxOrderReceived(false);
              setTimeout(() => {
                const items = document.getElementById("items");
                if (items.classList.contains("boxes-before")) {
                  items.classList.remove("boxes-before");
                  items.classList.add("boxes-after");
                } else {
                  items.classList.remove("boxes-after");
                  items.classList.add("boxes-before");
                }
              }, 1);
            }}
          >
            Add Storage Items
          </Button>

          <div id="items" className="containerNewItem boxes-before max-w-lg">
            <div className="newUser flex items-start justify-start">
              PLEASE SELECT A SUITABLE BOX FOR YOUR GOODS
              <img
                className="boxPicture"
                src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}
                style={{ height: 200 }}
              />
              <p>Box Type A (27cm x 38cm x 29cm) - Maximum weight = 7.5 kg:</p>
              <input
                type="radio"
                name="boxType"
                value="A (27cm x 38cm x 29cm)"
                id="A"
                onChange={handleChange}
              />
              <p>Box Type B (32cm x 46cm x 29cm) - Maximum weight = 10.5 kg:</p>
              <input
                type="radio"
                name="boxType"
                value="B (32cm x 46cm x 29cm)"
                id="B"
                onChange={handleChange}
              />
              <p>Box Type C (40cm x 60cm x 40cm) - Maximum weight = 24 kg:</p>
              <input
                type="radio"
                name="boxType"
                value="C (40cm x 60cm x 40cm)"
                onChange={handleChange}
              />
              <p>Box Type D (175cm x 30cm x 15cm) - Maximum weight = 20 kg:</p>
              <input
                type="radio"
                name="boxType"
                value="D (175cm x 30cm x 15cm)"
                onChange={handleChange}
              />
              <br />
              <br />
              <input type="submit" value="Submit" onClick={submit1} />
              <Button
                onClick={() => {
                  const items = document.getElementById("items");
                  items.classList.remove("boxes-after");
                  items.classList.add("boxes-before");
                }}
              >
                Go back
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end items-end border-emerald-700 border-8"> */}
        <div className="flex flex-col  max-w-lg mx-5 px-5 ">
          <Button
            className="max-w-lg"
            onClick={() => {
              updateItemList();
              setDisplayTable(!displayTable);
              setAddItem(false);
              setBoxOrderReceived(false);
              setTimeout(() => {
                const boxes = document.getElementById("boxes");

                if (boxes.classList.contains("boxes-before")) {
                  boxes.classList.remove("boxes-before");
                  boxes.classList.add("boxes-after");
                } else {
                  boxes.classList.remove("boxes-after");
                  boxes.classList.add("boxes-before");
                }
              }, 1);
            }}
          >
            {displayTable ? "CLOSE" : "DISPLAY"} STORED GOODS
          </Button>

          <div
            id="boxes"
            className="boxes-before flex flex-col justify-center items-center max-w-lg rounded-br-lg rounded-bl-lg"
          >
            Stored Items:
            {items.map((item, index) => {
              return (
                <div
                  className="bg-gray-100 text-blue-600 rounded-3xl max-w-md mx-3 px-2 my-3 py-3 shadow-2xl "
                  key={index}
                >
                  <div className="shadow-lg " key={`${index}a`}>
                    {item.declared_content_one} in box number {item.box_id}{" "}
                    {item.fragile === true ? `(fragile)` : ``}{" "}
                    {item.heavy === true ? `(heavy)` : ``}
                  </div>

                  {item.declared_content_two !== "" ? (
                    <div className="shadow-lg " key={`${index}b`}>
                      {item.declared_content_two} in box number {item.box_id}{" "}
                    </div>
                  ) : (
                    <></>
                  )}
                  {item.declared_content_three !== "" ? (
                    <div className="shadow-lg " key={`${index}c`}>
                      {item.declared_content_three} in box number {item.box_id}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* </div> */}
      </div>
      {confirmation === true ? (
        <div>
          <form>
            <br></br>
            You selected a type {typeBox} box. Please provde a brief description
            of the goods you want to store (e.g. Snowboard, summer clothes,
            barbecue set...)
            <br></br>
            <label>
              Goods description (required):
              <input
                type="text"
                name="description1"
                placeholder="Goods description"
                value={description1}
                onChange={createDescription1}
              />
              <br></br>
              Goods description (optional):
              <input
                type="text"
                name="description2"
                placeholder="Goods description"
                value={description2}
                onChange={createDescription2}
              />
              <br></br>
              Goods description (optional):
              <input
                type="text"
                name="description3"
                placeholder="Goods description"
                value={description3}
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
          <Button
            onClick={() => setConfirmation(false)}
            style={{ cursor: "pointer" }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4> : <div></div>}
      {boxOrderReceived === true ? (
        <h4> Thank you, you should receive the box within 5 days.</h4>
      ) : (
        <div></div>
      )}
      {success === true ? <Success message={message} /> : <Subscription />}
      {/* <button onClick={retrieveData}>Extra Retrieval</button> */}
      <Button className="mx-3" onClick={() => navigate("/extra-charge")}>
        Extra Retrieval
      </Button>
      <Button className="mx-3" onClick={storeOnClick}>
        Storage
      </Button>
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
