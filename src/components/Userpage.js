import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
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
    axios.post("/allItems", { email }).then((res) => setItems(res.data));
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

  return (
    <div>
      <nav id="user-page-nav">
        <p id="user-name">
          Welcome back {window.localStorage.getItem("firstName_user")}
        </p>

        <Button id="signout-button" onClick={signOut}>
          Sign out
        </Button>
      </nav>

      <h3 id="next-period">
        Next retrieval/storing period: April 22nd - May 10th
      </h3>

      <section id="nav-button">
        <Button
          id="retrieve-button"
          // className="mx-3 my-7 py-7 "
          onClick={() => navigate("/extra-charge")}
        >
          Need to retrieve?
          <p className="popup-message">
            Through extra retrieval, items can be removed from storage anytime
          </p>
        </Button>
        <Button
          id="storage-button"
          // className="mx-3 my-7 py-7 "
          onClick={() => navigate("/extra-storage")}
        >
          Need Extra Storage?
          <p className="popup-message">
            Through extra storage, items can be sent to storage anytime
          </p>
        </Button>
      </section>

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

      <div className="flex flex-row justify-center items-center "></div>

      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
