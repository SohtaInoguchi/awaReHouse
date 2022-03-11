import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button, Form } from "react-bootstrap";

export default function NerCustomer({ setMode }) {
  const [providerFirstName, setProviderFirstName] = useState("");
  const [providerLastName, setProviderLastName] = useState("");
  const [providerPassword, setProviderPassword] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPicValues, setProviderPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  const [providerBankReference, setProviderBankReference] = useState("");
  const [providerEmergencyContact, setProviderEmergencyContact] = useState("");
  const [providerEmergencyContactPhone, setProviderEmergencyContactPhone] =
    useState("");
  const [registrationDone, setRegistrationDone] = useState(false);

  const createProviderFirstName = (e) => {
    setProviderFirstName(e.target.value);
  };

  const createProviderLastName = (e) => {
    setProviderLastName(e.target.value);
  };

  const createProviderPassword = (e) => {
    setProviderPassword(e.target.value);
  };

  const createProviderAddress = (e) => {
    setProviderAddress(e.target.value);
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

  const handleProviderSubmit = (e) => {
    e.preventDefault();
    sendProvider();
    setRegistrationDone(true);
  };

  if (registrationDone === false) {
    return (
      <div className="containerNewRegistration">
        <div className="newProvider text-slate-900 m-5">
          SIGNUP AS A PROVIDER
          {/* <form> */}
          <Form>
            <Form.Group>
            {/* <br></br> */}
            {/* <Form.Label className="labels">First Name</Form.Label> */}
            <Form.Control 
              type="text"
              name="firstname"            
              placeholder="Enter first name"
              value={providerFirstName}
              onChange={createProviderFirstName}
              className="my-3"
            />
            </Form.Group>

            {/* <label>
              First Name:
              <input
                type="text"
                name="firstname"
                placeholder="Your first name"
                value={providerFirstName}
                onChange={createProviderFirstName}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Last Name</Form.Label> */}
            <Form.Control 
              type="text"
              name="lastname"            
              placeholder="Your last name"
              value={providerLastName}
              onChange={createProviderLastName}
              className="my-3"
            />
            </Form.Group>

              {/* Last Name:
              <input
                type="text"
                name="lastname"
                placeholder="Your last name"
                value={providerLastName}
                onChange={createProviderLastName}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Password</Form.Label> */}
            <Form.Control 
              type="password"
              name="password"
              placeholder="Your created password"
              value={providerPassword}
              onChange={createProviderPassword}
              className="my-3"
            />
            </Form.Group>

              {/* Password:
              <input
                type="password"
                name="password"
                placeholder="Your created password"
                value={providerPassword}
                onChange={createProviderPassword}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Address</Form.Label> */}
            <Form.Control 
              type="text"
              name="address"
              placeholder="Your address"
              value={providerAddress}
              onChange={createProviderAddress}
              className="my-3"
            />
            </Form.Group>

              {/* Address:
              <input
                type="text"
                name="address"
                placeholder="Your address"
                value={providerAddress}
                onChange={createProviderAddress}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Email</Form.Label> */}
            <Form.Control 
              type="text"
              name="email"
              placeholder="Your email"
              value={providerEmail}
              onChange={createProviderEmail}
              className="my-3"
            />
            </Form.Group>
              
              {/* Email:
              <input
                type="text"
                name="email"
                placeholder="Your email"
                value={providerEmail}
                onChange={createProviderEmail}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Banking Reference</Form.Label> */}
            <Form.Control 
              type="text"
              name="bankreference"
              placeholder="Your banking reference"
              value={providerBankReference}
              onChange={createProviderBankReference}
              className="my-3"
            />
            </Form.Group>

              {/* Banking Reference:
              <input
                type="text"
                name="bankreference"
                placeholder="Your banking reference"
                value={providerBankReference}
                onChange={createProviderBankReference}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Emergency Contact Person</Form.Label> */}
            <Form.Control 
              type="text"
              name="emergencycontact"
              placeholder="Emergency contact"
              value={providerEmergencyContact}
              onChange={createProviderEmergencyContact}
              className="my-3"
            />
            </Form.Group>

              {/* Emergency Contact Person:
              <input
                type="text"
                name="emergencycontact"
                placeholder="Emergency contact"
                value={providerEmergencyContact}
                onChange={createProviderEmergencyContact}
              />
              <br></br> */}

            <Form.Group>
            {/* <Form.Label className="labels">Emergency Contact</Form.Label> */}
            <Form.Control 
              type="text"
              name="emergencycontactphone"
              placeholder="Emergency contact phone"
              value={providerEmergencyContactPhone}
              onChange={createProviderEmergencyContactPhone}
              className="my-3"
            />
            </Form.Group>

              {/* Emergency Contact Phone:
              <input
                type="text"
                name="emergencycontactphone"
                placeholder="Emergency contact phone"
                value={providerEmergencyContactPhone}
                onChange={createProviderEmergencyContactPhone}
              /> */}

            <Form.Group>
            {/* <Form.Label className="labels">Emergency Contact</Form.Label> */}
            <Form.Control 
                type="file" 
                name="file" 
                onChange={pictureStorageHandler} 
                className="my-3"
                />
            </Form.Group>


              {/* <br></br>
              Storage place picture:
              <input 
                type="file" 
                name="file" 
                onChange={pictureStorageHandler} 
              />
              <br></br> */}
            {/* </label> */}
            <br></br>
            <Button 
            variant="light" 
            type="submit"
            onClick={handleProviderSubmit}>Submit</Button>
            {/* <input
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={handleProviderSubmit}
            /> */}
          {/* </form> */}
          </Form>
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
          <button onClick={() => setMode("homePage")}>Back to homepage</button>
        </div>
      </div>
    );
  }
}
