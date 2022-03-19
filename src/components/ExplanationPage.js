import * as React from "react";
import { useState } from "react";
// import Button from "@mui/material/Button";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlanSelection from "./PlanSelection";
export default function ExplanationPage({ plan, setPlan }) {
  const navigate = useNavigate();

  const userEmail = window.localStorage.getItem("email_user");

  return (
    <div>
      <h3 className="bg-white px-3 py-3 text-blue-600 text-center">
        Please make a selection below for your plan
      </h3>
      <PlanSelection plan={plan} setPlan={setPlan} />
      <div className="buttons border-8">
        <Form action="/create-checkout-session" method="POST">
          <Button
            className="mx-2"
            name="name"
            value="Storage fee"
            type="submit"
            onClick={() => axios.post(`/login/verify/${userEmail}/${plan}`)}
          >
            Checkout
          </Button>
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Form>
      </div>
    </div>
  );
}
