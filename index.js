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
    else if (
      req === "What do I need to do to get items outside of seasonal period?"
    )
      text =
        "You can click extra retrieval / storage. But please bear in mind it will apply charge :)";
    else
      text =
        "Please go to user page in the middle of the page, you can find it there :)";
    socket.emit("bot-send-back", text);
  });
});

//////////////////SOCKET IO /////////////////////////

//Grabs all items
app.post("/allItems", async (req, res) => {
  try {
    const items = await db
      .select("*")
      .from("inventory")
      .where("user_owner", req.body.email);
    res.send(items);
  } catch {
    res.send("No items found yet");
  }
});



//Verify if user has created account already
//Currently sends back an arr of objects with sub plan
app.get("/login/verify/:member", async (req, res) => {
  const isMember = await db
    .select("subscription_plan")
    .from("users")
    .where("email", req.params.member);
  res.send(isMember);
});

app.post("/login/verify/:member/:plan", async (req, res) => {
  const plan = await db("users")
    .where("email", req.params.member)
    .update("subscription_plan", req.params.plan);

  res.send("BACK END POST");
});

// to update pending_retrieval status
app.post("/inventory/:box_id", async (req, res) => {
  const { box_id } = req.body;
  try {
    await db("inventory").where({ box_id }).update({ pending_retrieval: true });
    res.status(200).json("YEP");
  } catch (err) {
    res.status(500).json({ message: "Error updating new post", error: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    // for user
    let user;
    console.log("auth middleware");
    console.log(req.token);
    req.body.mode === "user"
      ? (user = await db
          .select("password", "first_name", "email", "subscription_plan")
          .from("users")
          .where("email", req.body.email))
      : (user = await db
          .select("password", "first_name", "email")
          .from("providers")
          .where("email", req.body.email));

    const input = {
      firstname: req.body.first_name,
      email: req.body.email,
      password: req.body.password,
    };

    const token = await jwt.sign(
      { user: input },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const boolean = await bcrypt.compare(req.body.password, user[0].password);

    res.cookie("token", token, {
      httpOnly: true,
    });

    if (req.body.mode === "user") {
      res.json({
        boolean,
        first_name: user[0].first_name,
        email: user[0].email,
        plan: user[0].subscription_plan,
        token,
      });
    } else {
      res.json({
        boolean,
        first_name: user[0].first_name,
        email: user[0].email,
        token,
      });
    }

  } catch (err) {
    res.json({
      boolean: false,
      first_name: "User not found",
      message: `${err}`,
    });
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
  } else res.sendStatus(403);
  // .json({ message: "YOU ARE NOT ALLOWED TO USE I THIS SHIT!!" });
}

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

app.get("/payments", async (req, res) => {
  try {
    const allData = await db.select("*").from("payments");
    res.json(allData);
  } catch {
    console.error(err.message);
  }
});

app.post("/users", async (req, res) => {
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

  const input = {
    firstname: req.body.first_name,
    email: req.body.email,
    password: req.body.password,
  };

  const token = await jwt.sign(
    { user: input },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1s" }
  );
  res.cookie("token", token, {
    httpOnly: true,
  });
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

app.get("/inventory", async (req, res) => {
  try {
    const allData = await db.select("*").from("inventory");
    res.json(allData);
  } catch {
    console.error(err.message);
  }
});

app.post("/providers", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: encryptedPassword,
    adress: req.body.adress,
    email: req.body.email,
    bank_reference: req.body.bank_reference,
    emergency_contact_person: req.body.emergency_contact_person,
    emergency_contact_phone_number: req.body.emergency_contact_phone_number,
    picture_file: req.body.picture_file,
  };

  const input = {
    firstname: req.body.first_name,
    email: req.body.email,
    password: req.body.password,
  };

  const token = await jwt.sign(
    { user: input },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1s" }
  );
  res.cookie("token", token, {
    httpOnly: true,
  });
  try {
    console.log("from here");
    console.log(user);
    await db("providers").insert(user);
    res.status(201).send("YEP users");
  } catch (err) {
    console.log("Backend server does not work - users");
    console.error(err);
  }
});

app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userAddress = await db
      .select("adress")
      .from("users")
      .where({ email });
    res.json(userAddress);
  } catch {
    console.log("Error in retrieving address");
  }
});

app.get("/payments/:provider_email", async (req, res) => {
  try {
    const { provider_email } = req.params;
    const previousPayments = await db
      .select("*")
      .from("payments")
      .where({ provider_email });
    res.json(previousPayments);
  } catch {
    console.log("Error in retrieving address");
  }
});

app.get("/providers/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userAddress = await db.select("*").from("providers").where({ email });
    res.json(userAddress);
  } catch {
    console.log("Error in retrieving provider address");
  }
});

//grab items at single location
app.post("/providerItems", async (req, res) => {
  const { address } = req.body;
  try {
    const items = await db
      .select("*")
      .from("inventory")
      .where("storage_location", address);
    res.send(items);
  } catch {
    res.send("No items found yet");
  }
});

app.post("/inventory", async (req, res) => {
  const postData = req.body;
  try {
    console.log(req.body);
    await db("inventory").insert(postData);
    res.status(201).send("YEP inventory");
  } catch {
    console.log("Backend server does not work - inventory");
  }
});

app.get("/inventory/:user_owner", async (req, res) => {
  try {
    const { user_owner } = req.params;
    const userBoxes = await db
      .select("*")
      .from("inventory")
      .where({ user_owner });
    res.json(userBoxes);
  } catch {
    console.log("Error in retrieving user boxes");
  }
});

/////////////////STRIPE API/////////////////////////////
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;
app.post("/create-checkout-session", async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });

  let mode;
  let price;
  let subscriptionPlan = "";

  req.body.name.split("-")[0] === "Storage fee" &&
  req.body.name.split("-")[1] === "basic"
    ? (subscriptionPlan = "Storage fee-Basic")
    : req.body.name.split("-")[0] === "Storage fee" &&
      req.body.name.split("-")[1] === "premium"
    ? (subscriptionPlan = "Storage fee-Premium")
    : "";

  if (subscriptionPlan) {
    subscriptionPlanPrice = prices.data.filter((e) => {
      if (e.product.name.toLowerCase() === req.body.name.toLowerCase())
        return e.product.name;
    });

    price = subscriptionPlanPrice[0].id;
  } else {
    const gotya = prices.data.filter((e) => e.product.name === req.body.name);
    price = gotya[0].id;
  }

  req.body.name.includes("-") ? (mode = "subscription") : (mode = "payment");

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: price,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: `${YOUR_DOMAIN}?success=true`,
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
