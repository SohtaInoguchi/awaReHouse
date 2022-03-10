import React from "react";
import { useNavigate } from "react-router-dom";
export default function Response({ message }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>{message}</div>
      <button onClick={() => navigate("/user")}>Go back to user page</button>
    </div>
  );
}
