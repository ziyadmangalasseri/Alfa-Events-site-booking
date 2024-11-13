const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongooose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URI;
const AuthRouter = require("./route/authRoute");
const UserRouter = require("./route/userRoute");
const AdminRouter=require('./route/adminRoute');

app.set("view engine", "ejs");
app.set("views", "views");

//  Session configuration
app.use(session({
  secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}))
app.use(express.static("public"));

app.use(cors());

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(AuthRouter);
app.use( UserRouter);
app.use(AdminRouter);

mongooose
  .connect(MONGOURL)
  .then(() => {
    console.log(`mongodb connection successfull`);
    app.listen(PORT, () => {
      console.log(`server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
