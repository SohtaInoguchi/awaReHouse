import * as React from "react";
import { useState } from "react";
// import Button from "@mui/material/Button";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlanSelection from "./PlanSelection";
export default function ExplanationPage({}) {
  const [plan, setPlan] = useState("");

  const navigate = useNavigate();

  const userEmail = window.localStorage.getItem("email_user");

  function verifyEmail() {
    axios.post(`/login/verify/${userEmail}/${plan}`).then(() => {
      navigate("/user");
    });
  }

  return (
    <div>
      <h3 className="bg-white px-3 py-3 text-blue-600 text-center">
        Please make a selection below for your plan
      </h3>
      <PlanSelection plan={plan} setPlan={setPlan} />
      <div className="buttons border-8">
        <Button onClick={verifyEmail}>Confirm</Button>
        <Button variant="contained" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
