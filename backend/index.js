const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const multer = require("multer");
const upload = require("./middleware/upload");

const Dps = require("./models/dps.model.js");
const dpsRoute = require("./routes/dps.routes.js");

const Riset = require("./models/riset.model.js");
const risetRoute = require("./routes/riset.routes.js");

const app = express();
const port = 3000;

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/dps", dpsRoute);
app.use("/api/riset", risetRoute);

app.get("/", (req, res) => {
  res.send("Running...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect("mongodb+srv://syariah:portal@cluster0.9z3cf.mongodb.net/");
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to MongoDB"));
