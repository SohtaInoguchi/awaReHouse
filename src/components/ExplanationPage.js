import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

export const ExplanationPage = ({}) => {
  const [plan, setPlan] = useState("");
  const [usersCurrentPlan, setUsersCurrentPlan] = useState("");

  // function userSelect() {
  //   setPlan("basic");
  //   console.log(plan)
  // }

  const userEmail = window.localStorage.getItem("email_user")

  const verifyEmail = () => {
    console.log(`THE EMAIL IS ${userEmail}`)
    axios.get(`/login/verify/${userEmail}`)
    .then((res) => {console.log(res.data)})
  };


  return (
    <div>
      <h1>Welcome</h1>
      <h3>Please make a selection below for your plan</h3>
      <p>
        There are two plans we are currently offering. The basic plan and the
        premium plan.
      </p>
      <div>
        <FormControl>
          <FormLabel>Plans:</FormLabel>
          <RadioGroup defaultValue="Small" name="box-buttons-group">
            <FormControlLabel
              value="basic"
              control={<Radio />}
              label="Basic"
              onClick={() => setPlan("basic")}
            />
            <FormControlLabel
              value="premium"
              control={<Radio />}
              label="Premium"
              onClick={() => setPlan("premium")}
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div>{plan === "basic" ? <div>
      <h4>Basic Plan</h4>
      <img
            className="max-w-96 max-h-96 "
            src={require("../pictures/5Boxes.jpeg")}
            alt="Picture for 5 boxes"
          />
        <p>This is the basic plan that allows you to store up to 5 boxes without any extra monthly cost.  Ideal for a single person.</p>
      </div> : <div></div>}</div>
      {plan === "premium" ? <div>
        <h4>Premium Plan</h4>
      <img
            className="max-w-96 max-h-96 "
            src={require("../pictures/10Boxes.jpeg")}
            alt="Picture for 10 boxes"
          />
        <p>This is the premium plan that allows you to store up to 10 boxes without any extra monthly cost.  Ideal for families or couples.</p>
      </div> : <div></div> }
      <Button variant="contained" onClick={verifyEmail()}>Confirm</Button>
      <Button variant="contained">Cancel</Button>
    </div>
  );
};
//Connect to db, check if the user is member.  If so go to user page, if not stay on page.