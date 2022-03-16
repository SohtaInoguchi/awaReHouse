import React from "react";

export const OneFiftyStripe = () => {
  return (
    <div>
        <h2>Additional cost:</h2>
      <h2>¥ 15,000</h2>
      
      <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Extra retrieval" />
        <button id="checkout-and-portal-button" type="submit">
          Yes
        </button>
      </form>
      <h3>No</h3>
    </div>
  );
};
;
