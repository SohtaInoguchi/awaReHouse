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
  function retrieveData() {
    console.log("clicked hehehe");
  }
  return (
    <div>
      Welcome {user}
      <h3>NEXT RETRIEVAL DATE IS BETWEEN: 2022/01-2022/03</h3>
      <ol>
        {items &&
          items.map((item) => {
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
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
