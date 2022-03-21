import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ExplainButtons({ plan, setPlan }) {
  const navigate = useNavigate();
  const userEmail = window.localStorage.getItem("email_user");
  return (
    <div className="buttons  flex justify-center items-center my-3 ">
      <Form action="/create-checkout-session" method="POST">
        <Button className="mx-10" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button
          className="mx-10"
          name="name"
          value="Storage fee"
          type="submit"
          onClick={() => axios.post(`/login/verify/${userEmail}/${plan}`)}
        >
          Checkout
        </Button>
      </Form>
    </div>
  );
}
