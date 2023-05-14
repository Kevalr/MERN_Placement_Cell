require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(cors());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/"));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  console.log("Connected to MONGODB database");
});

mongoose.connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    err
  );
});
