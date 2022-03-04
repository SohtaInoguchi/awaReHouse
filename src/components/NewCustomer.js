import React, { useState, useEffect } from "react";
import axios from "axios";
import "../input.css";

function NewCustomer() {
  
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [picValues, setPicValues] = useState({
    imagePreviewUrl: "", 
    picFile: null
  })
  
const fileInput = React.createRef(); 

const createFirstName = (e) =>{
  setUserFirstName(e.target.value)
}

const createLastName = (e) =>{
  setUserLastName(e.target.value)
}

const createPassword = (e) =>{
  setUserPassword(e.target.value)
}
const createAddress = (e) =>{
  setUserAddress(e.target.value)
}

const createEmail = (e) =>{
  setUserEmail(e.target.value)
}

const pictureHandler = (e) =>{
  e.preventDefault();
  let reader = new FileReader();
  let inFile = e.target.files[0];
  reader.onloadend = () => {
     setPicValues({...picValues, 
        picFile: inFile, 
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(inFile);
  };


const sendUser = () => {
  axios.post("/users", {
  first_name:userFirstName,
  last_name:userLastName,
  password:userPassword,
  adress:userAddress,
  email:userEmail,
  picture_file:picValues.imagePreviewUrl
  })
  .then(()=> {
    console.log("Your database has been updated!");
  })
  .catch(function (error) {
    console.log("NOPE! User Data NOT sent");
  });  
}

const handleSubmit = (e) =>{
  e.preventDefault()
  sendUser()
}


  return <div className="containerNewRegistration">
      <div className="newUser">
          REGISTER AS A STORAGE USER
          <form>
          <br></br>
            <label>
            First Name:
            <input type="text" name="firstname" placeholder="Your first name" value={userFirstName} onChange={createFirstName}/><br></br>
            Last Name:
            <input type="text" name="lastname" placeholder="Your last name" value={userLastName} onChange={createLastName}/><br></br>
            Password:
            <input type="password" name="password" placeholder="Your created password" value={userPassword} onChange={createPassword}/><br></br>
            Address:
            <input type="text" name="address" placeholder="Your address" value={userAddress} onChange={createAddress}/><br></br>
            Email:
            <input type="text" name="email" placeholder="Your email" value={userEmail} onChange={createEmail}/><br></br>
            Identification proof:
            <input type="file" name="file" onChange={pictureHandler}/><br></br>
          </label>
          <br></br>
          <input type="submit" value="Submit" style={{cursor:"pointer"}} onClick={handleSubmit}/>
          </form>
          </div>
      <div className="newProvider">REGISTER AS A STORAGE PROVIDER</div>  
      </div>;
}

export default NewCustomer;
