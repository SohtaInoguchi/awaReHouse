import { Subscription } from "./components/Subscription";
import "./input.css";
import{useEffect,useState} from 'react'
import { Success } from "./components/Success";
import Userpage from "./Userpage.js";
import Providerpage from "./Providerpage.js";

function App() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setMessage("Thank you for your purchase")
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);



  return (
    <div>
      {success === true ? <Success message = {message}/> : <Subscription/>}
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
