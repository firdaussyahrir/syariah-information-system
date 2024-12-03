const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const dpsRoute = require("./routes/dps.routes.js");
const risetRoute = require("./routes/riset.routes.js");
const buletinRoute = require("./routes/buletin.routes.js");
const regulasiRoute = require("./routes/regulasi.routes.js");
const lrsaRoute = require("./routes/lrsa.routes.js");
const userRoute = require("./routes/user.routes.js");

const app = express();
const port = 3000;

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/dps", dpsRoute);
app.use("/api/riset", risetRoute);
app.use("/api/buletin", buletinRoute);
app.use("/api/regulasi", regulasiRoute);
app.use("/api/lrsa", lrsaRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Syariah Information System");
});

app.listen(port, () => {
  console.log(`SIS Running on Port ${port}`);
});

mongoose.connect("mongodb+srv://syariah:portal@cluster0.9z3cf.mongodb.net/");
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to MongoDB"));
