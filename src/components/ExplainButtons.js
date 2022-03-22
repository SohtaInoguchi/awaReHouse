import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ExplainButtons({ plan, setPlan }) {
  const navigate = useNavigate();
  const userEmail = window.localStorage.getItem("email_user");
  function signOut() {
    window.localStorage.removeItem("firstName_user");
    window.localStorage.removeItem("email_user");
    window.localStorage.removeItem("token_user");
    window.localStorage.removeItem("plan_user");
    window.localStorage.removeItem("boxes_user");
    navigate("/");
  }
  return (
    <div className="buttons  flex justify-center items-center my-3 ">
      <Form action="/create-checkout-session" method="POST">
        <Button className="mx-10" onClick={signOut}>
          Cancel
        </Button>
        <Button
          className="mx-10"
          name="name"
          value={`Storage fee-${plan}`}
          type="submit"
          onClick={() => axios.post(`/login/verify/${userEmail}/${plan}`)}
        >
          Checkout
        </Button>
      </Form>
    </div>
  );
}
