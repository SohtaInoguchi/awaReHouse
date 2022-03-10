import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";

export default function NewUser({ setMode }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [picValues, setPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  const [providerPicValues, setProviderPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });

  const [registrationDone, setRegistrationDone] = useState(false);

  const createFirstName = (e) => {
    setUserFirstName(e.target.value);
  };

  const createLastName = (e) => {
    setUserLastName(e.target.value);
  };

  const createPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const createAddress = (e) => {
    setUserAddress(e.target.value);
  };

  const createEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const pictureHandler = (e) => {
    const file = e.target.files[0];
    const output = Compress.imageFileResizer(
      file,
      480,
      480,
      "JPEG",
      70,
      0,
      (uri) => {
        setPicValues(uri);
      },
      "base64"
    );
  };

  const sendUser = () => {
    axios
      .post("/users", {
        first_name: userFirstName,
        last_name: userLastName,
        password: userPassword,
        adress: userAddress,
        email: userEmail,
        picture_file: picValues,
      })
      .then(() => {
        console.log("Your database has been updated!");
      })
      .catch(function (error) {
        console.log("NOPE! User Data NOT sent");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUser();
    setRegistrationDone(true);
  };

  if (registrationDone === false) {
    return (
      <div className="containerNewRegistration">
        <div className="newUser">
          REGISTER AS A STORAGE USER
          <form>
            <br></br>
            <label>
              First Name:
              <input
                type="text"
                name="firstname"
                placeholder="Your first name"
                value={userFirstName}
                onChange={createFirstName}
              />
              <br></br>
              Last Name:
              <input
                type="text"
                name="lastname"
                placeholder="Your last name"
                value={userLastName}
                onChange={createLastName}
              />
              <br></br>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Your created password"
                value={userPassword}
                onChange={createPassword}
              />
              <br></br>
              Address:
              <input
                type="text"
                name="address"
                placeholder="Your address"
                value={userAddress}
                onChange={createAddress}
              />
              <br></br>
              Email:
              <input
                type="text"
                name="email"
                placeholder="Your email"
                value={userEmail}
                onChange={createEmail}
              />
              <br></br>
              Identification proof:
              <input type="file" name="file" onChange={pictureHandler} />
              <br></br>
            </label>
            <br></br>
            <input
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            />
          </form>
        </div>
        <br></br>
      </div>
    );
  }
  if (registrationDone === true) {
    return (
      <div className="registrationDone">
        <div>
          THANK YOU FOR YOUR REGISTRATION
          <br></br>
        </div>
      </div>
    );
  }
}
