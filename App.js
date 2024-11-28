const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");



const { notFound, errorHandler } = require("./middleware/errorHandler");

const AuthRouter = require("./route/authRoute");
const UserRouter = require("./route/userRoute");
const AdminRouter = require("./route/adminRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// EJS view engine setup
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");

// Session configuration
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true if HTTPS is enabled
  })
);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors
  ({
  origin:["http://localhost:3000","https://alfa-events-site-booking.onrender.com"],
  methods:["GET","POST"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication middleware
// app.use(isAuthenticated);

// Route handlers
app.use(AuthRouter);
app.use(UserRouter);
app.use(AdminRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });


  