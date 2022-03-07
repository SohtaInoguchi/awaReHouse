import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";

// <<<<<<< HEAD
// function Userpage({ user, message, success, chatMessages, setChatMessages, setMode }) {

//   const extraChargeOnClick = () => {
//     setMode("extraCharge");
//   }

// =======
function Userpage({
  user,
  message,
  success,
  items,
  chatMessages,
  setChatMessages,
  setMode
}) {
  function retrieveData() {
    console.log("clicked hehehe");
  }

  const extraChargeOnClick = () => {
    setMode("extraCharge");
  }

// >>>>>>> ef5e10e5eb04acfea18b9bc93a5b0788cc307df8
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
{/* <<<<<<< HEAD */}
      <button onClick={extraChargeOnClick} id="extra-charge">Extra retrieval/storage</button>
{/* ======= */}
      <button onClick={retrieveData}>Retrieval</button>
      <button>Storage</button>
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
{/* >>>>>>> ef5e10e5eb04acfea18b9bc93a5b0788cc307df8 */}
    </div>
  );
}

export default Userpage;
