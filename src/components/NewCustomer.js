import React, { useState, useEffect } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button } from "react-bootstrap";

function NewCustomer({ setMode }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [providerFirstName, setProviderFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [providerLastName, setProviderLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [providerPassword, setProviderPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [picValues, setPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  const [providerPicValues, setProviderPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  const [providerBankReference, setProviderBankReference] = useState("");
  const [providerEmergencyContact, setProviderEmergencyContact] = useState("");
  const [providerEmergencyContactPhone, setProviderEmergencyContactPhone] =
    useState("");
  const [registrationDone, setRegistrationDone] = useState(false);

  const createFirstName = (e) => {
    setUserFirstName(e.target.value);
  };

  const createProviderFirstName = (e) => {
    setProviderFirstName(e.target.value);
  };

  const createLastName = (e) => {
    setUserLastName(e.target.value);
  };

  const createProviderLastName = (e) => {
    setProviderLastName(e.target.value);
  };

  const createPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const createProviderPassword = (e) => {
    setProviderPassword(e.target.value);
  };

  const createAddress = (e) => {
    setUserAddress(e.target.value);
  };

  const createProviderAddress = (e) => {
    setProviderAddress(e.target.value);
  };

  const createEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const createProviderEmail = (e) => {
    setProviderEmail(e.target.value);
  };

  const createProviderBankReference = (e) => {
    setProviderBankReference(e.target.value);
  };

  const createProviderEmergencyContact = (e) => {
    setProviderEmergencyContact(e.target.value);
  };

  const createProviderEmergencyContactPhone = (e) => {
    setProviderEmergencyContactPhone(e.target.value);
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

  const pictureStorageHandler = (e) => {
    const file = e.target.files[0];
    const output = Compress.imageFileResizer(
      file,
      480,
      480,
      "JPEG",
      70,
      0,
      (uri) => {
        setProviderPicValues(uri);
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

  const sendProvider = () => {
    axios
      .post("/providers", {
        first_name: providerFirstName,
        last_name: providerLastName,
        password: providerPassword,
        adress: providerAddress,
        email: providerEmail,
        bank_reference: providerBankReference,
        emergency_contact_person: providerEmergencyContact,
        emergency_contact_phone_number: providerEmergencyContactPhone,
        picture_file: providerPicValues,
      })
      .then(() => {
        console.log("Your database has been updated!");
      })
      .catch(function (error) {
        console.log("NOPE! Provider Data NOT sent");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUser();
    setRegistrationDone(true);
  };

  const handleProviderSubmit = (e) => {
    e.preventDefault();
    sendProvider();
    setRegistrationDone(true);
  };

  if (registrationDone === false) {
    return (
      <div className="containerNewRegistration login  px-72 py-72">
        <div className="newUser ">
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
        <div className="newProvider">
          REGISTER AS A STORAGE PROVIDER
          <form>
            <br></br>
            <label>
              First Name:
              <input
                type="text"
                name="firstname"
                placeholder="Your first name"
                value={providerFirstName}
                onChange={createProviderFirstName}
              />
              <br></br>
              Last Name:
              <input
                type="text"
                name="lastname"
                placeholder="Your last name"
                value={providerLastName}
                onChange={createProviderLastName}
              />
              <br></br>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Your created password"
                value={providerPassword}
                onChange={createProviderPassword}
              />
              <br></br>
              Address:
              <input
                type="text"
                name="address"
                placeholder="Your address"
                value={providerAddress}
                onChange={createProviderAddress}
              />
              <br></br>
              Email:
              <input
                type="text"
                name="email"
                placeholder="Your email"
                value={providerEmail}
                onChange={createProviderEmail}
              />
              <br></br>
              Banking Reference:
              <input
                type="text"
                name="bankreference"
                placeholder="Your banking reference"
                value={providerBankReference}
                onChange={createProviderBankReference}
              />
              <br></br>
              Emergency Contact Person:
              <input
                type="text"
                name="emergencycontact"
                placeholder="Emergency contact"
                value={providerEmergencyContact}
                onChange={createProviderEmergencyContact}
              />
              <br></br>
              Emergency Contact Phone:
              <input
                type="text"
                name="emergencycontactphone"
                placeholder="Emergency contact phone"
                value={providerEmergencyContactPhone}
                onChange={createProviderEmergencyContactPhone}
              />
              <br></br>
              Storage place picture:
              <input type="file" name="file" onChange={pictureStorageHandler} />
              <br></br>
            </label>
            <br></br>
            <Button
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={handleProviderSubmit}
            ></Button>
          </form>
        </div>
        <button onClick={() => setMode("homePage")}>Back to homepage</button>
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
          <button onClick={() => setMode("homePage")}>Back to homepage</button>
        </div>
      </div>
    );
  }
}

export default NewCustomer;
