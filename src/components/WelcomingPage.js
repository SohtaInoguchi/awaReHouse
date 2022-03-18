import React, { useState } from "react";
import axios from "axios";
import "../input.css";


export default function WelcomingPage() {

    
    return (
      <div>
          <div className="registrationMessage">
        <img
        className="pictureWelcome"
        src={require("../pictures/Welcome.jpg")}
        />
        <h1 className="welcomeCustomer">Thank you for joining awaReHouse</h1>
        <button className="backToHomeButton">Back to HOME</button>
        </div>
      </div>
    );
}
