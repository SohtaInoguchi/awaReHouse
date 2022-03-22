import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button, Form } from "react-bootstrap";
import WelcomingPage from "./WelcomingPage.js";

export default function NewUser() {
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
  const setInputFieldValue = (e, setMethod) => {
    const input = e.target.value;
    setMethod(input);
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
      <div className="containerNewRegistration login  ">
        <div className=" text-white text-center">
          Register as a storage user
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First name"
                id="firstName"
                onChange={(e) => setInputFieldValue(e, setUserFirstName)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last name"
                onChange={(e) => setInputFieldValue(e, setUserLastName)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setInputFieldValue(e, setUserPassword)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setInputFieldValue(e, setUserAddress)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setInputFieldValue(e, setUserEmail)}
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

            <Button variant="primary" type="submit">
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
        <WelcomingPage />
      </div>
    );
  }
}
