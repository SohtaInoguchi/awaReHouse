import React from "react";
import { useNavigate } from "react-router-dom";
export default function Success({ sessionId, message }) {
  let navigate = useNavigate();
  return (
    <div>
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Thank you for using awaReHouse</h3>
            <br />
            <h3>{message}</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
        </form>
      </section>
      <button onClick={() => navigate("/user")}>Go back to user page</button>
    </div>
  );
}
