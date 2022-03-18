import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import { useNavigate } from "react-router-dom";


export default function WelcomingPage() {

    const navigate = useNavigate();
    
    return (
      <div>
          <button className="registrationMessage" onClick={() => navigate("/")}>
        <img
        className="pictureWelcome"
        src={require("../pictures/Welcome.jpg")}
        />
        <h1 className="welcomeCustomer">Thank you for joining awaReHouse</h1>
        </button>
      </div>
    );
}
