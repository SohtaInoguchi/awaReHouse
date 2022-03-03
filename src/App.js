import "./input.css";
import Chat from "./Chat";
import Userpage from "./Userpage.js";
import Providerpage from "./Providerpage.js";

function App() {

  return (
    <div>
        {/* <Chat chatMessage={chatMessage} setChatMessage={setChatMessage}/> */}
        <Chat/>
      <div className = "homepageContainer">
      <div className="containerHomeLeft">
        <img
      className="logo"
      src={require("./pictures/LOGO.png")}
      alt="logo awaReHouse"
      />
      <h1 className="welcomeMessage">Welcome to <br></br>    awaReHouse</h1>
      </div>
      <div className="containerHomeRight">
      <img
      className="homeImages"
      src={require("./pictures/1.jpg")}
      alt="moving boxes"
      />
      <img
      className="homeImages"
      src={require("./pictures/2.jpg")}
      alt="storage place"
      />
      </div>
      </div>
      <div className= "homeButtons">
        <div className="homeUser">
      <button className="loginButton">User LOGIN</button>
      <p>Want to become a user? <br></br><p className="signup">SIGN UP</p></p>
      </div>
      <div className="homeProvider">
      <button className="loginButton">Provider LOGIN</button>
      <p>Want to become a provider? <br></br><p className="signup">SIGN UP</p></p>
      </div>
      </div>
      <Userpage />
      <Providerpage />
    </div>
  );
}

export default App;
