const express = require("express");
const db = require("./db/db_index");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const user = require("./routes/user-route");
const friends = require("./routes/friend-route")
const corsMiddleware = require("./middleware/cors.middleware");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.use(express.json());
// simple route
app.use("/user", user);
app.use("/friend", friends);
app.get("/", (req, res) => {
  res.send("Hello, user!");
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
