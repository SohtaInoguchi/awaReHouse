import React from "react";
import { Button } from "react-bootstrap";
export default function Subscription() {
  return (
    <section>
      <div className="product">
        <div className="description">
          <h3>Subscription</h3>
          <h5>JPY 1000 / month</h5>
        </div>
      </div>

      <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Storage fee" />
        <Button id="checkout-and-portal-button" type="submit">
          Checkout
        </Button>
      </form>
    </section>
  );
}
