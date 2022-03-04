import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";

function retrieveData() {
  console.log("CALLLLLLLLED");
}

function Userpage({ user, message, success, items }) {
  return (
    <div>
      Welcome {user}
      <h3>NEXT RETRIEVAL DATE IS BETWEEN: 2022/01-2022/03</h3>
      <ol>
        {/* {items.map((item) => {
          return <li key = {item.box_id}>{item.declared_content_one}</li>
        })} */}
      </ol>

      <button>Add Item</button>

      {success === true ? <Success message={message} /> : <Subscription />}
      <button onClick={retrieveData}>Retrieval</button>
      <button>Storage</button>

      <div>
        <form action="/action_page.php" className="form-container">
          <h1>Chat</h1>

          <label htmlFor="msg">
            <b>Message</b>
          </label>
          <textarea placeholder="Type message.." name="msg" required></textarea>

          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userpage;
