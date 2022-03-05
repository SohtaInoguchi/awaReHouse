import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";

function Userpage({
  user,
  message,
  success,
  items,
  chatMessages,
  setChatMessages,
}) {
  return (
    <div>
      Welcome {user}
      <h3>NEXT RETRIEVAL DATE IS BETWEEN: 2022/01-2022/03</h3>
      <ol>
        {items.map((item) => {
          return (
            <div key={item.box_id}>
              <li>{item.declared_content_one}</li>
              <li>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "No Items added"}
              </li>
              <li>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "No Items added"}
              </li>
            </div>
          );
        })}
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
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
