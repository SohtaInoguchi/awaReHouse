import React from "react";

export default function Subscription() {
  return (
    <section>
      {/* <div className="product"> */}
        {/* <div className="description">
          <h3>Basic plan</h3>
          <h5>1000円 / month</h5>
        </div> */}
      {/* </div> */}

      <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Storage fee" />
        <button id="checkout-and-portal-button" type="submit">
        </button>
      </form>
    </section>
  );
}
