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
      <div className="flex flex-row border-8 justify-center   ">
        <div className="border-2 flex flex-col items-end w-fit">
          <img
            className="flex  w-28 h-28 rounded-lg"
            src={require("../pictures/LOGO.png")}
            alt="aware house logo"
          />
          {/* <h5 className="w-auto flex-wrap break-words ">
            Welcome to The awaReHouse User Area
          </h5> */}
        </div>
        <div className=" bg-white rounded-lg shadow-lg">
          <form className="flex justify-center flex-col">
            <br></br>
            <label className="flex flex-col text-center justify-center items-center">
              <h3>Sign up</h3>
              <input
                className="flex rounded-sm bg-gray-200 "
                type="text"
                name="firstname"
                placeholder="Your first name"
                value={userFirstName}
                onChange={createFirstName}
              />
              <br></br>
              <input
                className="flex  rounded-sm bg-gray-200"
                type="text"
                name="lastname"
                placeholder="Your last name"
                value={userLastName}
                onChange={createLastName}
              />
              <br></br>
              <input
                className="flex  rounded-sm bg-gray-200"
                type="password"
                name="password"
                placeholder="Your created password"
                value={userPassword}
                onChange={createPassword}
              />
              <br></br>
              <input
                className="flex  rounded-sm bg-gray-200"
                type="text"
                name="address"
                placeholder="Your address"
                value={userAddress}
                onChange={createAddress}
              />
              <br></br>
              <input
                className="flex justify-border rounded-sm bg-gray-200"
                type="text"
                name="email"
                placeholder="Your email"
                value={userEmail}
                onChange={createEmail}
              />
              <br></br>
              Identification image:
              <input
                className="flex justify-center rounded-md text-center "
                type="file"
                name="file"
                onChange={pictureHandler}
              />
              <br></br>
            </label>
            <br></br>

            <input
              className=" shadow-lg border-2 text-center bg-blue-300 hover:bg-blue-400 rounded-lg mx-5 my-2 px-7 py-2 "
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            />
          </form>
        </div>
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
