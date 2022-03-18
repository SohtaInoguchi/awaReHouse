import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button, Form } from "react-bootstrap";
import WelcomingPage from "./WelcomingPage.js"

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
      <div className="containerNewRegistration login  px-72 py-72">
        <div className="newUser text-gray-600 text-center">
          Register as a storage user
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First name"
                value={userFirstName}
                onChange={createFirstName}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last name"
                value={userLastName}
                onChange={createLastName}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={userPassword}
                onChange={createPassword}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={userAddress}
                onChange={createAddress}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={userEmail}
                onChange={createEmail}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <p>Please attach a copy of a valid identification document</p>
              <Form.Control
                type="file"
                name="file"
                onChange={pictureHandler}
                // required
                className="my-3"
              />
            </Form.Group>

            <Button variant="light" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
  if (registrationDone === true) {
    return (
      <div>
      <WelcomingPage/>  
      </div>
    );
  }
}
