const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
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
const MONGOURL = process.env.MONGO_URI;

// EJS view engine setup
app.set("view engine", "ejs");
app.set("views", "views");

// Session configuration
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGOURL,
      collectionName: "sessions",
    }).on("error", (error) => {
      console.error("Session store error:", error);
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
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
  .connect(MONGOURL)
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Handle uncaught errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  process.exit(1);
});
