require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const sampleRoutes = require("./routes/sample");
const userRoutes = require("./routes/users");
const accountRoutes = require("./routes/account");
const passport = require("passport");
const jwtStrategy = require("./config/passport")();

app.get("/", (req, res) => res.status(200).send("You are on the homepage"));

// set logging for dev environment
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("combined"));
}

// setup database connection for mongoose
mongoose.set("debug", false);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/sample", sampleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);

// if no other routes match then we will get into this middle ware
// create a new error and then call next(error) to pass to the error handler
app.use((req, res, next) => {
  let error = new Error("Page Not Found");
  error.status = 404;
  error.message = "Page Could Not Be Found";
  next(error);
});

// final error handler
app.use((err, req, res, next) => {
  console.error(err.status, err.message);
  res.status(err.status || 500).send(err.message);
});

app.listen(8080, () => console.log("Server is listening"));

module.exports = app;
module.exports.closeServer = function() {
  app.close();
};
