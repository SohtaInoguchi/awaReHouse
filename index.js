const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const db = require("./server/db");
const knex = require("./server/db");
const PORT = process.env.PORT || 8000;


// This is your test secret API key.
const stripe = require('stripe')(process.env.API_KEY);
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));


app.get("/items", async (req, res) => {
  const items = await db.select("*").from("inventory")
  res.send(items);
});

app.post("/test", (req, res) => {
  const input = {
    firstname: "Toni",
    lastname: "Peña",
    email: "toni@gmail.com",
    password: "toniTheBest",
  };

  jwt.sign({ user: input }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    token && res.json({ token });
  });
});

app.post("/post", authenticateToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    res.json({
      message: "NOICE HEHEHEHEHEH",
      data,
    });
  });
});

app.post("/login", async (req, res) => {
  try {
    const input = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };


    // jwt.sign({ user: input }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    //   token && res.json({ token });
    // });

    const user = await db
      .select("password", "first_name")
      .from("users")
      .where("email", req.body.email)
      .andWhere("first_name", req.body.first_name);

    const boolean =
      user.length >= 1 && input.password === user[0].password ? true : false;

    res.json({ boolean, first_name: user[0].first_name });
  } catch {
    res.json({ boolean: false, first_name: "User not found" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
    next();
  }

  res.sendStatus(403);
}

app.get("/post", authenticateToken, (req, res) => {
  res.send("hehehehcjodhcnae");
});

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/////////////////STRIPE API/////////////////////////////

app.post("/create-checkout-session", async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/?success=true`,

    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = "whsec_12345";
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

/////////////////STRIPE API/////////////////////////////

app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

// io.on("connection", (socket) => {
//   // console.log(`backend id:${socket.id}`);
//   socket.on("send-message", (input) => {
//     console.log(input);
//   });
//   socket.emit("receive-message", "MESSAGE RECEIVED");
// });
