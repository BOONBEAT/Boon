const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

dotenv.config();

const PORT = 4000;;
const MONGOURL = process.env.MONGODB_URI;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database running successfully");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
