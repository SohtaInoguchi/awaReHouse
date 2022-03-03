const dotenv = require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./server/db");
const knex = require("./server/db");

const app = express()
// .use(cors())
// .use(express.static(__dirname + "/build"))
// .use(express.urlencoded({ extended: true }))
// .use(express.json())
// .listen(PORT, () => console.log(`Listening on ${PORT}`));

/////////////////////////////////////
// const server = express()
//   .use(express.static(__dirname + "/build"))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
// const server = express()
/////////////////////////////////////////////////////////

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(express.urlencoded({ extended: true }));

const stripe = require("stripe")(process.env.API_KEY);

const server = app.use(cors()).use(express.static(__dirname + "/build")).listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

// ----------SOCKET IO SERVER---------
// const server = express()
//   .use(cors())
//   .use(express.static(__dirname + "/build"))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
// ----------SOCKET IO SERVER---------


const socketIO = require('socket.io');

// -------SOCKET IO----------
const io = socketIO(server);
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   // socket.on('disconnect', () => console.log('Client disconnected'));
// });

io.on('connection', (socket) => {
    console.log("Socket io connected");
    socket.on('send-message', (text) => {
      // io.emit("receive-message","Please pack in box");
    // socket.emit('send-message', (text) => {
      console.log('is called')
      console.log(text)
      // io.emit("receive-message", (message)=> {console.log("Please pack in box" )});
    })
  });

// ---------SOCKET IO ------------->


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

