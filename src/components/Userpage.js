import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { OneFiftyStripe } from "./OneFiftyStripe";
import e from "cors";
import { useNavigate } from "react-router-dom";
import { BoxFlow } from "./BoxFlow";
import { Accordion, Button, Form } from "react-bootstrap";
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass } from "react-icons/gi";
import Icon from "./Icon";
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
    console.log("store CLICKKK");
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

  function signOut() {
    window.localStorage.removeItem("firstName_user");
    window.localStorage.removeItem("email_user");
    window.localStorage.removeItem("token_user");
    navigate("/");
  }

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
        pending: true,
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
    // setDescription1("");
    // setDescription2("");
    // setDescription3("");
    setConfirmation(false);
    setBoxOrderReceived(true);
    setAddItem(false);
    setTryAgain(false);
    setIsFragile(false);
    setIsHeavy(false);
    sendBoxRequest();
    document.getElementById("submit-button").disabled = false;

    document
      .getElementById("confirmation-form")
      .classList.remove("boxes-before");
    document.getElementById("confirmation-form").classList.add("boxes-after");

    // navigate("/?success=true");
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="px-3 mx-3 py-2 rounded-3xl bg-gray-200 text-blue-600 w-72  text-center ">
          Welcome back {window.localStorage.getItem("firstName_user")}
        </p>
        <Button className="flex mx-5 " onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <h3 className=" text-center bg-gray-100 mx-3 my-3 px-3 py-3 text-blue-600 rounded-3xl shadow-2xl">
        Next retrieval/storing period: April 22nd - May 10th
      </h3>
      <div className="flex flex-row justify-between  ">
        {/* if I remove flex, looks better on boostrap */}
        <div className="flex flex-row justify-start items-start mx-5 px-5 ">
          <div className="flex flex-row ">
            {/* <Button
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
              </Button> */}
            <div className=" rounded-3xl mx-8">
              <Accordion>
                <Accordion.Item className="">
                  <Accordion.Header>
                    Please select the size of the box
                  </Accordion.Header>
                  <Accordion.Body>
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
          </div>
          {/* hehee---------------- */}

          <div className="flex justify-center items-center mx-5 px-5 ">
            <Form
              action="/create-checkout-session"
              method="POST"
              id="confirmation-form"
              className="bg-gray-200 text-blue-600 rounded-3xl px-3 py-3 "
            >
              You selected a type {typeBox} box. Please provide a brief
              description of the items you want to store (e.g. Snowboard, summer
              clothes, barbecue set...)
              <Form.Group className="w-96">
                <Form.Control
                  type="text"
                  name="description1"
                  placeholder="Goods description (required)"
                  required
                  value={description1}
                  onChange={createDescription1}
                />
              </Form.Group>
              <Form.Group className="w-96">
                <Form.Control
                  type="text"
                  name="description2"
                  placeholder="Goods description (optional)"
                  value={description2}
                  onChange={createDescription2}
                />
              </Form.Group>
              <Form.Group className="w-96">
                <Form.Control
                  type="text"
                  name="description3"
                  placeholder="Goods description (optional)"
                  value={description3}
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
              <p>Sending address: {address}</p>
              <Button onClick={submit2}>Update</Button>
              <Button
                id="submit-button"
                className="mx-2"
                name="name"
                value="Storage fee"
                type="submit"
                disabled="true"
              >
                {/* onClick={submit2} */}
                Submit
              </Button>
              {/* <Button
                  className="mx-2"
                  onClick={() => {
                    document
                      .getElementById("confirmation-form")
                      .classList.remove("boxes-after");
                    document
                      .getElementById("confirmation-form")
                      .classList.add("boxes-before");
                    setConfirmation(false);
                  }}
                >
                  Cancel
                </Button> */}
            </Form>
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

                console.log(document.getElementById("boxes"));
                if (boxes && boxes.classList.contains("boxes-before")) {
                  boxes.classList.remove("boxes-before");
                  boxes.classList.add("boxes-after");
                }
                // else {
                //   boxes.classList.remove("boxes-after");
                //   boxes.classList.add("boxes-before");
                // }
              }, 1);
            }}
          >
            {displayTable ? "CLOSE" : "DISPLAY"} Stored Items
          </Button>

          {displayTable ? (
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
                    <div
                      className="flex justify-center items-center   "
                      key={`${index}a`}
                    >
                      {item.pending ? (
                        <div
                          id="item"
                          className=" flex flex-col justify-center items-center  bg-green-300 rounded-lg mx-2 my-2 px-2 py-2"
                        >
                          {/* {item && item.pending
                          ? document
                              .getElementById("item")
                              .classList.add("bg-green-300")
                          : ""} */}
                          {item.declared_content_one} in box number{" "}
                          {item.box_id}:
                          {item.fragile === true ? (
                            <Icon icon={<GiShatteredGlass size="24" />} />
                          ) : (
                            ``
                          )}{" "}
                          {item.heavy === true ? (
                            <Icon icon={<FaWeightHanging size="24" />} />
                          ) : (
                            ``
                          )}
                          {item.declared_content_two !== "" ? (
                            <div className="shadow-sm " key={`${index}b`}>
                              {item.declared_content_two} in box number{" "}
                              {item.box_id}{" "}
                            </div>
                          ) : (
                            <></>
                          )}
                          {item.declared_content_three !== "" ? (
                            <div className="shadow-sm " key={`${index}c`}>
                              {item.declared_content_three} in box number{" "}
                              {item.box_id}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div
                          id="item"
                          className="flex flex-col justify-center items-center rounded-lg mx-2 my-2 px-2 py-2"
                        >
                          {/* {item && item.pending
                          ? document
                              .getElementById("item")
                              .classList.add("bg-green-300")
                          : ""} */}
                          {item.declared_content_one} in box number{" "}
                          {item.box_id}:
                          {item.fragile === true ? (
                            <Icon icon={<GiShatteredGlass size="24" />} />
                          ) : (
                            ``
                          )}{" "}
                          {item.heavy === true ? (
                            <Icon icon={<FaWeightHanging size="24" />} />
                          ) : (
                            ``
                          )}
                          {item.declared_content_two !== "" ? (
                            <div className="shadow-sm" key={`${index}b`}>
                              {item.declared_content_two} in box number{" "}
                              {item.box_id}{" "}
                            </div>
                          ) : (
                            <></>
                          )}
                          {item.declared_content_three !== "" ? (
                            <div className="shadow-sm" key={`${index}c`}>
                              {item.declared_content_three} in box number{" "}
                              {item.box_id}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>

                    {/* {item.declared_content_two !== "" ? (
                      <div className="shadow-lg " key={`${index}b`}>
                        {item.declared_content_two} in box number {item.box_id}{" "}
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.declared_content_three !== "" ? (
                      <div className="shadow-lg " key={`${index}c`}>
                        {item.declared_content_three} in box number{" "}
                        {item.box_id}
                      </div>
                    ) : (
                      <></>
                    )} */}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* </div> */}
      </div>
      {/* {confirmation === true ? ( */}

      {/*
       ) : (
         <div></div>
       )} */}
      {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4> : <div></div>}
      {boxOrderReceived === true ? (
        <h4>
          {/* <OneFiftyStripe/> */}
          Thank you, you should receive the box within 5 days.
        </h4>
      ) : (
        <div></div>
      )} 
      {/* {success === true ? <Success message={message} /> : <Subscription />} */}
      {/* <button onClick={retrieveData}>Extra Retrieval</button> */}
      <Button className="mx-3" onClick={() => navigate("/extra-charge")}>
        Extra Retrieval
      </Button>
      <Button className="mx-3" onClick={storeOnClick}>
      <BoxFlow addy = {address}/>
      </Button>
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
