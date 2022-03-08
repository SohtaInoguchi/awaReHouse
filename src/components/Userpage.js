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
  const[typeBox, setTypeBox]=useState(null);
  const [address, setAddress] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const[tryAgain, setTryAgain] = useState(false);
  const[description1, setDescription1]=useState("");
  const[description2, setDescription2]=useState("");
  const[description3, setDescription3]=useState("");
  const [boxOrderReceived, setBoxOrderReceived] =useState(false);

  const createDescription1 = (e) =>{
    setDescription1(e.target.value)
  }

  const createDescription2 = (e) =>{
    setDescription2(e.target.value)
  }

  const createDescription3 = (e) =>{
    setDescription3(e.target.value)
  }

  const handleChange = (e) => {  
    setTypeBox(e.target.value)
  }
  
  const retrieveAddress = async () => {
    await axios.get(`/users/${email}`)
    .then((res)=> {
      setAddress(res.data[0].adress);
    })
    .catch(function (error) {
      console.log("NOPE! Address data not retrieved");
    });  
  }

  useEffect(()=>{
retrieveAddress()
  },[setAddItem])

const submit1 = () => {
  if(typeBox===null){
    setTryAgain(true);
  }
  if (typeBox!==null){
    setConfirmation(true)
  }
}

const submit2 = (e) => {
  setDescription1("");
  setDescription2("");
  setDescription3("");
  setConfirmation(false)
  e.preventDefault();
  setBoxOrderReceived(true);
console.log(description1, description2, description3, typeBox)

}

const cancel = () =>{
  setAddItem(false);
  setTryAgain(false);
  setTypeBox(null);
  setBoxOrderReceived(false)
}


  return (
    <div>
      <button style={{cursor:"pointer"}} onClick={()=>setMode("homePage")}>Back to homepage</button>
      <br></br>
      Welcome back {user},
        <br></br>
        <h3>NEXT RETRIEVAL PERIOD: April 22nd - May 10th</h3>
      <ol>
        List of goods currently stored at awaReHouse locations:
        {items.map((item) => {
          return (
            <div key={item.box_id}>
              <li>{item.declared_content_one}</li>
              <li>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "-"}
              </li>
              <li>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "-"}
              </li>
            </div>
          );
        })}
      </ol>
        <button style={{cursor:"pointer"}} onClick={()=>setAddItem(true)}>Add Storage Items</button>
        {addItem === true ? 
        <div className="containerNewItem">
        <div className="newUser">
          PLEASE SELECT ONE SUITABLE BOX FOR YOUR GOODS
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
            <input type="radio" name="boxType" value="A (27cm x 38cm x 29cm)" id="A" onChange={handleChange}/>
            <br></br>
            Box Type B (32cm x 46cm x 29cm):
            <input type="radio" name="boxType" value="B (32cm x 46cm x 29cm)" id="B" onChange={handleChange}/>
            <br></br>
            Box Type C (40cm x 60cm x 40cm):
            <input type="radio" name="boxType" value="C (40cm x 60cm x 40cm)" onChange={handleChange}/>
            <br></br>
            Box Type D (175cm x 30cm x 15cm):
            <input type="radio" name="boxType" value="D (175cm x 30cm x 15cm)" onChange={handleChange}/>
            <br></br>
          <br></br>
          <input type="submit" value="Submit" onClick={submit1}/>
          <button style={{cursor:"pointer"}} onClick={cancel}>Go back</button>
          </div>
        </div>: <div></div>}
        {confirmation === true ? <div>
          <form>
          <br></br>
          You selected a type {typeBox} box. Please provde a brief description of the goods you want to store (e.g. Snowboard, summer clothes, barbecue set...)
          <br></br>
          <label>
            Goods description (required):
            <input type="text" name="description1" placeholder="Goods description" value={description1} onChange={createDescription1}/><br></br>
            Goods description (optional):
            <input type="text" name="description2" placeholder="Goods description" value={description2} onChange={createDescription2}/><br></br>
            Goods description (optional):
            <input type="text" name="description3" placeholder="Goods description" value={description3} onChange={createDescription3}/><br></br>
          </label>
          <br></br>
          The boxes will be sent to your registered address: {address}
          <br></br>
          <input type="submit" value="Submit" style={{cursor:"pointer"}} onClick={submit2}/>
          </form>
          <button onClick={()=>setConfirmation(false)} style={{cursor:"pointer"}}>Cancel</button>
        </div> : <div></div>}
        {tryAgain === true ? <h4> PLEASE SELECT A BOX TYPE</h4>:<div></div>}
        {boxOrderReceived === true ? <h4> Thank you, your order is on its way. You can submit another request or click on "Go Back" to exit this section</h4>:<div></div>}
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
