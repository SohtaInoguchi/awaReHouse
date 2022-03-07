import React from "react";

export default function Subscription() {
  return (
    <section>
      <div className="product">
        <div className="description">
          <h3>Basic plan</h3>
          <h5>1000円 / month</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="lookup_key" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
}
