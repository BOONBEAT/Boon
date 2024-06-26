const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const router = require("./routes/router");
const app = express();

const { checkUserHoldings } = require("./services/snapshot");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_DB_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database running successfully");
  })
  .catch((err) => {
    console.log(`error connecting to database ${err}`);
  });

//cron job

cron.schedule("0 0 * * *", async () => {
  console.log("Running BONK holdings check every 24 hours");
  await checkUserHoldings();
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://boon.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
