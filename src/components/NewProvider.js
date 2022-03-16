import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button, Form, InputGroup } from "react-bootstrap";

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
  const [validated, setValidated] = useState(false);

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
    sendProvider();
    setRegistrationDone(true);
  };

  if (registrationDone === false) {
    return (
      <div className="containerNewRegistration">
        <div className="newProvider text-slate-900 m-5">
          Register as a storage provider
          <Form onSubmit={handleProviderSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="first name"
                value={providerFirstName}
                onChange={createProviderFirstName}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last name"
                value={providerLastName}
                onChange={createProviderLastName}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={providerPassword}
                onChange={createProviderPassword}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={providerAddress}
                onChange={createProviderAddress}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={providerEmail}
                onChange={createProviderEmail}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="bankreference"
                placeholder="Banking reference"
                value={providerBankReference}
                onChange={createProviderBankReference}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="emergencycontact"
                placeholder="Emergency contact name"
                value={providerEmergencyContact}
                onChange={createProviderEmergencyContact}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="emergencycontactphone"
                placeholder="Emergency contact phone"
                value={providerEmergencyContactPhone}
                onChange={createProviderEmergencyContactPhone}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <p className="bg-green-600 text-white rounded-md mx-2 my-2 py-2 px-2">
                Please attach a copy of a valid identification document
              </p>
              <Form.Control
                type="file"
                name="file"
                onChange={pictureStorageHandler}
                className="my-3"
                // required
              />
            </Form.Group>

            <Button
              variant="light"
              type="submit"
              // onClick={handleProviderSubmit}
            >
              Submit
            </Button>
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
          <button type="button" onClick={() => setMode("homePage")}>
            Back to homepage
          </button>
        </div>
      </div>
    );
  }
}
