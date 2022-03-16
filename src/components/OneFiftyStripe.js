import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const OneFiftyStripe = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p className="text-center">Charge applies JPY15000</p>

      <form className="flex " action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Extra retrieval" />
        <Button
          className="mx-2 my-2 px-2 py-2"
          id="checkout-and-portal-button"
          type="submit"
        >
          Yes
        </Button>
        <Button
          className="mx-2 my-2 px-2 py-2"
          onClick={() => navigate("/user")}
        >
          No
        </Button>
      </form>
    </div>
  );
};
