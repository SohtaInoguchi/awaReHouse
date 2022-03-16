import React from "react";
import { useNavigate } from "react-router-dom";
export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div>
      <p>We hope to see you back in the near future!</p>
      <button onClick={() => navigate("/user")}>Go back to user page</button>
    </div>
  );
}
