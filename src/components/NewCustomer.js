import "../input.css";
import { useState, useEffect } from "react";

function NewCustomer() {

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState(null);

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
  console.log(e.target.value)
  setUserPicture(e.target.value)
}

const handleSubmit = (e) =>{
  e.preventDefault()
  console.log(userFirstName, userLastName, userPassword, userAddress, userEmail, userPicture)
}

  return <div className="containerNewRegistration">
      <div className="newUser">
          REGISTER AS A STORAGE USER
          <form>
            <label>
            First Name:
            <input type="text" name="firstname" placeholder="Your first name" value={userFirstName} onChange={createFirstName}/><br></br>
            Last Name:
            <input type="text" name="lastname" placeholder="Your last name" value={userLastName} onChange={createLastName}/><br></br>
            Password:
            <input type="text" name="password" placeholder="Your created password" value={userPassword} onChange={createPassword}/><br></br>
            Address:
            <input type="text" name="address" placeholder="Your address" value={userAddress} onChange={createAddress}/><br></br>
            Email:
            <input type="text" name="email" placeholder="Your email" value={userEmail} onChange={createEmail}/><br></br>
            Identification proof:
            <input type="file" name="file" onChange={pictureHandler}/><br></br>
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit}/>
          </form>
          </div>
      <div className="newProvider">REGISTER AS A STORAGE PROVIDER</div>  
      </div>;
}

export default NewCustomer;
