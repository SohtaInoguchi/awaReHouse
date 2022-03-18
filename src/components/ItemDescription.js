import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ItemDescription(props) {
  const {
    createDescription1,
    createDescription2,
    createDescription3,
    toggleIsHeavy,
    toggleIsFragile,
    submit2,
    typeBox,
    description1,
    description2,
    description3,
    address,
  } = props;

  return (
    // <div className="flex justify-center w-3/6 items-center ">
    <section id="item-description-wrapper">
      <article id="item-description">
        <Form
          action="/create-checkout-session"
          method="POST"
          id="confirmation-form"
          // className="bg-gray-200 text-blue-600 rounded-3xl px-3 py-3 mx-3 my-3 "
          className=" text-blue-600 px-3 py-3 "
        >
          <div id="box-select-header">
            <p>You selected a type {typeBox} box.</p>
            <p>
              Please provide a brief description of the items you want to store
              (e.g. Snowboard, summer clothes, barbecue set...)
            </p>
          </div>
          <Form.Group className="form-inputs">
            <Form.Control
              type="text"
              name="description1"
              placeholder="Item description (required)"
              required
              value={description1}
              onChange={createDescription1}
            />
          </Form.Group>
          <Form.Group className="form-inputs">
            <Form.Control
              type="text"
              name="description2"
              placeholder="Item description (optional)"
              value={description2}
              onChange={createDescription2}
            />
          </Form.Group>
          <Form.Group className="form-inputs">
            <Form.Control
              type="text"
              name="description3"
              placeholder="Item description (optional)"
              value={description3}
              onChange={createDescription3}
            />
          </Form.Group>
          <Form.Group className="form-inputs">
            <Form.Check
              type="checkbox"
              label="Heavy"
              onChange={toggleIsHeavy}
              className="item-description-checkbox"
            />
          </Form.Group>
          <Form.Group className="form-inputs">
            <Form.Check
              type="checkbox"
              label="Fragile"
              className="item-description-checkbox"
              onChange={toggleIsFragile}
            />
          </Form.Group>
          <p id="address">Your address: {address}</p>
          <Button id="update-button" onClick={submit2}>
            Update
          </Button>
          <Button
            id="submit-button"
            className="mx-2"
            name="name"
            value="Storage fee"
            type="submit"
            disabled="true"
          >
            Checkout
          </Button>
        </Form>
      </article>
    </section>
  );
}
