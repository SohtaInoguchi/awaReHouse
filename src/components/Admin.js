import "../input.css";
import { useState, useEffect } from "react";
import ChatAdmin from "./ChatAdmin";

function Admin({ chatMessages, setChatMessages }) {
  return <div>
      <h1>Admin</h1>
      <ChatAdmin chatMessages={chatMessages} setChatMessages={setChatMessages}/>
  </div>;
}

export default Admin;
