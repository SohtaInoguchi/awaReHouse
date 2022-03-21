import "../input.css";
import Success from "./Success";
import Subscription from "./Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { OneFiftyStripe } from "./OneFiftyStripe";

import { useNavigate } from "react-router-dom";
import { BoxFlow } from "./BoxFlow";
import { Accordion, Button, Form } from "react-bootstrap";
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass } from "react-icons/gi";
import BoxSelection from "./BoxSelection";
import ItemDescription from "./ItemDescription";

import Icon from "./Icon";
import StoredItems from "./StoredItems";
import { ListItem } from "@mui/material";
import Login from "./Login";

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
  address,
  setAddress,
}) {
  const [addItem, setAddItem] = useState(false);
  const [typeBox, setTypeBox] = useState(null);
  // const [address, setAddress] = useState("");
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
  const [numberOfBoxes, setNumberOfBoxes] = useState(0);
  const [maxNumberBoxes, setMaxNumberBoxes] = useState();
  let boxCapacity = parseInt(window.localStorage.getItem("boxes_user"));

  const plan = window.localStorage.getItem("plan_user");

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

  const planIntoValue = () => {
    if (window.localStorage.getItem("plan_user") === "premium") {
      setMaxNumberBoxes(10);
    } else {
      setMaxNumberBoxes(5);
    }
  };

  useEffect(() => {
    planIntoValue();
  }, [items]);

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

  function signOut() {
    window.localStorage.removeItem("firstName_user");
    window.localStorage.removeItem("email_user");
    window.localStorage.removeItem("token_user");
    window.localStorage.removeItem("plan_user");
    window.localStorage.removeItem("boxes_user");
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
    window.scrollTo(200, 200);
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
    // axios.post("/allItems", { email }).then((res) => setItems(res.data));
    axios
      .post("/allItems", { email: localStorage.getItem("email_user") })
      .then((res) => setItems(res.data));
  };

  const submit2 = (e) => {
    e.preventDefault();
    updateItemList();

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

  // if (window.localStorage.getItem("plan_user")==="premium"){
  //   setMaxNumberBoxes(10)
  // };
  // if (window.localStorage.getItem("plan_user")==="basic"){
  //   setMaxNumberBoxes(5)
  // } ;

  const retrieveNumberOfBoxes = async (req, res) => {
    try {
      await axios.get(`/inventory/${email}`).then((res) => {
        // setNumberOfBoxes(maxNumberBoxes - res.data.length);
        // setNumberOfBoxes(numberOfBoxes - res.data.length); //boxCapacity
        console.log(boxCapacity - res.data.length);
        window.localStorage.setItem(
          "boxes_user",
          boxCapacity - res.data.length
        );
        // console.log(numberOfBoxes);
      });
    } catch {
      console.log("NOPE! Number of boxes can't be retrieved");
    }
  };

  useEffect(() => {
    retrieveNumberOfBoxes();
  }, []); //planIntoValue

  return (
    <div>
      <nav id="user-page-nav">
        <div className="containerPremium">
          <p id="user-name">
            Welcome back {window.localStorage.getItem("firstName_user")}
          </p>
          {window.localStorage.getItem("plan_user") === "premium" ? (
            <img
              className="premiumIcon"
              src={require("../pictures/PREMIUM.png")}
            />
          ) : (
            <img
              className="premiumIcon"
              src={require("../pictures/basic.png")}
            />
          )}
        </div>

        <button id="signoutButton" onClick={signOut}>
          Sign out
        </button>
      </nav>

      <h3 id="next-period">
        Next retrieval/storing period: April 22nd - May 10th
      </h3>

      <div className="remainingBoxes">
        You can order and store
        {boxCapacity < 2 ? (
          <h3 className="numberBoxesRed">{boxCapacity}</h3>
        ) : (
          <h3 className="numberBoxes">{boxCapacity}</h3>
        )}{" "}
        more boxes
      </div>

      {boxCapacity > 0 ? (
        <section id="box-select">
          <div id="box-selection-wrapper">
            <BoxSelection handleChange={handleChange} />
            <ItemDescription
              createDescription1={createDescription1}
              createDescription2={createDescription2}
              createDescription3={createDescription3}
              toggleIsHeavy={toggleIsHeavy}
              toggleIsFragile={toggleIsFragile}
              submit2={submit2}
              typeBox={typeBox}
              description1={description1}
              description2={description2}
              description3={description3}
              address={address}
            />
          </div>

          <StoredItems
            updateItemList={updateItemList}
            setDisplayTable={setDisplayTable}
            setAddItem={setAddItem}
            setBoxOrderReceived={setBoxOrderReceived}
            items={items}
            displayTable={displayTable}
          />
        </section>
      ) : (
        <section id="box-select">
          <div className="noMoreBoxes">
            <img
              className="noboxespic"
              src={require("../pictures/NOBOXES.png")}
            />
            <h3>Unfortunately, you do not have any storage capacity left</h3>
            <h4 className="osusume">
              - If you are a Basic user, please upgrade your plan
            </h4>
            <h4 className="osusume">
              - If you are a Premium user, please use the Extra Storage option
            </h4>
          </div>

          <StoredItems
            updateItemList={updateItemList}
            setDisplayTable={setDisplayTable}
            setAddItem={setAddItem}
            setBoxOrderReceived={setBoxOrderReceived}
            items={items}
            displayTable={displayTable}
          />
        </section>
      )}

      <div className="flex flex-row justify-center items-center "></div>

      <h3 id="next-period">
        Can't wait the next storing/retrieval period or have exhausted your
        quota of boxes?
        <section id="nav-button">
          <Button
            id="retrieve-button"
            // className="mx-3 my-7 py-7 "
            onClick={() => navigate("/extra-charge")}
          >
            Extra Retrieval?
            <p className="popup-message">To retrieve items anytime</p>
          </Button>
          <Button
            id="storage-button"
            // className="mx-3 my-7 py-7 "
            onClick={() => navigate("/extra-storage")}
          >
            Extra Storage?
            <p className="popup-message">To store items anytime</p>
          </Button>
        </section>
      </h3>

      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
