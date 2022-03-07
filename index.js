const dotenv = require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./server/db");
const bcrypt = require("bcrypt");
const app = express();

// This is your test secret API key.
const stripe = require("stripe")(process.env.API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(express.urlencoded({ extended: true }));

const server = app
  .use(cors())
  .use(express.static(__dirname + "/build"))
  .listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

const socketIO = require("socket.io");

// -------SOCKET IO----------
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("chat connected");
  socket.on("send-message", (text) => {
    console.log(`backend ${text}`);
    socket.broadcast.emit("send-back-message", text);
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  socket.on("bot-message", (req) => {
    console.log(req);
    let text;
    if (req === "Where can I check the seasonal retrieval / store period?")
      text = "You can find the period on your user page :)";
    else if (req === "extra")
      text =
        "You can click extra retrieval / storage. But please bear in mind it will apply charge :)";
    else
      text =
        "Please go to user page in the middle of the page, you can find it there :)";
    socket.emit("bot-send-back", text);
  });
});

//////////////////SOCKET IO /////////////////////////

app.get("/", (_, res) => {
  res.send("hehehehe");
});

//Grabs all items
app.post("/allItems", async (req, res) => {
  try {
    const items = await db
      .select("*")
      .from("inventory")
      .where("user_owner", req.body.email);
    console.log(items);
    res.send(items);
  } catch {
    res.send("No items found yet");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await db
      .select("password", "first_name", "email")
      .from("users")
      .where("email", req.body.email);
    console.log(user);

    // if (await bcrypt.compare(req.body.password, temp)) console.log("sameee");

    const input = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };

    // please comment out this line yet
    const token = await jwt.sign(
      { user: input },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(`token is below`);
    console.log(token);

    // const user = await db
    //   .select("password", "first_name", "email")
    //   .from("users")
    //   .where("email", req.body.email)
    //   .andWhere("first_name", req.body.first_name);

    // const boolean =
    // user.length >= 1 && input.password === user[0].password ? true : false;
    // ? true
    // : false;
    console.log("here");
    console.log(user);
    const boolean = await bcrypt.compare(req.body.password, user[0].password);

    console.log(`is it working?`);
    console.log(boolean);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      boolean,
      first_name: user[0].first_name,
      email: user[0].email,
    });
  } catch {
    res.json({ boolean: false, first_name: "User not found" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.cookie.split(" ")[3];
  console.log(`auth page`);
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split("=")[1];
    console.log(authHeader);
    console.log(token);
    req.token = token;
    next();
  } else res.send(403);
}

/////////////////STRIPE API/////////////////////////////
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

app.post("/create-checkout-session", authenticateToken, async (req, res) => {
  console.log("checkout page");
  console.log(req.token);
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

// app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

// // io.on("connection", (socket) => {
// //   // console.log(`backend id:${socket.id}`);
// //   socket.on("send-message", (input) => {
// //     console.log(input);
// //   });
// //   socket.emit("receive-message", "MESSAGE RECEIVED");
// // });

app.get("/users", async (req, res) => {
  try {
    const allData = await db.select("*").from("users");
    res.json(allData);
  } catch {
    console.error(err.message);
  }
});

app.get("/providers", async (req, res) => {
  try {
    const allData = await db.select("*").from("providers");
    res.json(allData);
  } catch {
    console.error(err.message);
  }
});

app.post("/users", async (req, res) => {
  const postData = req.body;
  console.log("backend");
  // console.log(req.body.picture_file);
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: encryptedPassword,
    adress: req.body.adress,
    email: req.body.email,
    picture_file: req.body.picture_file,
  };
  // res.send(user);

  try {
    console.log("from here");
    console.log(user);
    await db("users").insert(user);
    res.status(201).send("YEP users");
  } catch (err) {
    console.log("Backend server does not work - users");
    console.error(err);
  }
});

app.post("/providers", async (req, res) => {
  const postData = req.body;
  try {
    console.log(req.body);
    await db("providers").insert(postData);
    res.status(201).send("YEP providers");
  } catch {
    console.log("Backend server does not work - providers");
  }
});
