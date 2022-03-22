import React from "react";
import { Form, Button } from "react-bootstrap";

export default function LoginForm({ mode, sendLoginRequest }) {
  return (
    <Form
      className="text-center "
      onSubmit={(e) => {
        e.preventDefault();
        sendLoginRequest();
      }}
    >
      <p className="text-white text-4xl">
        {mode === "user" ? "User" : "Provider"} Login
      </p>
      <Form.Group>
        <Form.Control
          className="my-3"
          id="email"
          type="text"
          placeholder="Email"
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          className="my-3"
          id="password"
          type="password"
          placeholder="Password"
          required
        ></Form.Control>
      </Form.Group>
      <Button className="px-5 py-2 " variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
