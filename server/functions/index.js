/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// Body parser for our json data
app.use(express.json());

// Cross Origin
const cors = require("cors");
app.use(cors({origin: true}));
app.use(( req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Firebase Credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// Api Endpoints
// eslint-disable-next-line comma-spacing
app.get("/",( req , res) => {
  return res.send("Hello World");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);