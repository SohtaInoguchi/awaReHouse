import React from "react";
import { useNavigate } from "react-router-dom";
export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Come back to awaReHouse whenever you want!</p>
      <button onClick={() => navigate("/user")}>Go back to user page</button>
    </div>
  );
}
