import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";

function Userpage({
  user,
  message,
  success,
  items,
  chatMessages,
  setChatMessages,
  setMode,
  email
}) {
  function retrieveData() {
    console.log("clicked hehehe");
  }

  const [addItem, setAddItem] = useState(false);
  const [boxAChecked, setBoxAChecked] = useState(false);
  const [boxBChecked, setBoxBChecked] = useState(false);
  const [boxCChecked, setBoxCChecked] = useState(false);
  const [boxDChecked, setBoxDChecked] = useState(false);

  const handleAChange = (e) => {
    setBoxAChecked(!boxAChecked);
  }

  const handleBChange = (e) => {
    setBoxBChecked(!boxBChecked);
  }

  const handleCChange = (e) => {
    setBoxCChecked(!boxCChecked);
  }

  const handleDChange = (e) => {
    setBoxDChecked(!boxDChecked);
  }

  const boxObject = {
    "Type A": boxAChecked,
    "Type B": boxBChecked,
    "Type C": boxCChecked,
    "Type D": boxDChecked
  }
  
  const retrieveAddress = async () => {
    await axios.get(`/users/${email}`)
    .then((res)=> {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log("NOPE! Address data not retrieved");
    });  
  }
  retrieveAddress()

  return (
    <div>
      <button onClick={()=>setMode("homePage")}>Back to homepage</button>
      <br></br>
      Welcome {user}
        <br></br>
        <h3>NEXT RETRIEVAL PERIOD: 2022/04/25-2022/05/10</h3>
      <ol>
        CURRENTLY STORED GOODS:
        {items.map((item) => {
          return (
            <div key={item.box_id}>
              <li>{item.declared_content_one}</li>
              <li>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "No Items added"}
              </li>
              <li>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "No Items added"}
              </li>
            </div>
          );
        })}
      </ol>
        <button onClick={()=>setAddItem(true)}>Add Storage Items</button>
        {addItem === true ? 
        <div className="containerNewItem">
        <div className="newUser">
          PLEASE SELECT A SUITABLE BOX FOR YOUR GOODS
          <br></br>
          <br></br>
          <img
          className="boxPicture"
          src={require("../pictures/corrugated-boxes.jpg")}
          style={{ height: 200}}
          />
          <br></br>
          <br></br>
            Box Type A (27cm x 38cm x 29cm):
            <input type="checkbox" id="box1" name="boxType" value="A" onChange={handleAChange}/>
            <br></br>
            Box Type B (32cm x 46cm x 29cm):
            <input type="checkbox" id="box2" name="boxType" value="B" onChange={handleBChange}/>
            <br></br>
            Box Type C (40cm x 60cm x 40cm):
            <input type="checkbox" id="box3" name="boxType" value="C" onChange={handleCChange}/>
            <br></br>
            Box Type D (175cm x 30cm x 15cm):
            <input type="checkbox" id="box4" name="boxType" value="D" onChange={handleDChange}/>
            <br></br>
          <br></br>
          <input type="submit" value="Submit" onClick={()=>console.log(boxObject)}/>
          <button onClick={()=>setAddItem(false)}>Cancel</button>
          </div>
        </div>: <div></div>}
      {success === true ? <Success message={message} /> : <Subscription />}
      <button onClick={retrieveData}>Retrieval</button>
      <button>Storage</button>
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
