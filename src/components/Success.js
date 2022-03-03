import React from "react";

export default function Success({ sessionId, message }) {
  return (
    <div>
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
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
    </div>
  );
}
