import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage({ setMode, setNewCustomer, updateItemList }) {
  let navigate = useNavigate();
  return (
    <div>
      <div className="homepageContainer">
        <div className="containerHomeLeft">
          <img
            className="logo"
            src={require("../pictures/LOGO.png")}
            alt="logo awaReHouse"
          />
          <h1 className="welcomeMessage">
            Welcome to <br></br> awaReHouse
          </h1>
        </div>
        <div className="containerHomeRight">
          <img
            className="homeImages"
            src={require("../pictures/1.jpg")}
            alt="moving boxes"
          />
          <img
            className="homeImages"
            src={require("../pictures/2.jpg")}
            alt="storage place"
          />
        </div>
      </div>
      <div className="homeButtons">
        <div className="homeUser">
          <button
            className="loginButton"
            style={{ cursor: "pointer" }}
            // onClick={() => setMode("userLogin")}
            onClick={() => navigate("/login/user")}
          >
            User LOGIN
          </button>
          <div>
            <br></br>
            Want to become a user? <br></br>
            <p
              className="signup"
              style={{ cursor: "pointer" }}
              // onClick={() => {
              //   setMode("registration");
              //   updateItemList();
              // }}
              onClick={() => navigate("/signup/user")}
            >
              SIGN UP
            </p>
          </div>
        </div>
        <div className="homeProvider">
          <button
            className="loginButton"
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   console.log("provider login page");
            //   setMode("providerLogin");
            // }}
            onClick={() => {
              navigate("/login/provider");
            }}
          >
            Provider LOGIN
          </button>
          <div>
            <br></br>
            Want to become a provider? <br></br>
            <p
              className="signup"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup/provider")}
            >
              SIGN UP
            </p>
          </div>
        </div>
        <h1 className="admin" onClick={() => setMode("admin")}>
          Admin
        </h1>
      </div>
    </div>
  );
}
