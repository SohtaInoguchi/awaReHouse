import React from "react";

export default function Homepage({ setMode, setNewCustomer }) {
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
          <button className="loginButton" onClick={() => setMode("userLogin")}>
            User LOGIN
          </button>
          <div>
            Want to become a user? <br></br>
            <p className="signup" onClick={() => setMode("registration")}>SIGN UP</p>
          </div>
        </div>
        <div className="homeProvider">
          <button
            className="loginButton"
            onClick={() => {
              console.log("provider login page");
              setMode("providerLogin");
            }}
          >
            Provider LOGIN
          </button>
          <div>
            Want to become a provider? <br></br>
            <p className="signup" onClick={() => setMode("registration")}>SIGN UP</p>
          </div>
        </div>
        <h1 className="admin" onClick={() => setMode("admin")}>Admin</h1>
      </div>
    </div>
  );
}
