const express = require("express");
const router = express.Router();
const { homePage ,profilePageDetails} = require("../controller/UserCtrl/UserCtrl");

router.get("/home", homePage);

const isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
      return next();
    }
    res.redirect("/"); // Redirect to login page if not authenticated
  };
  
  // Profile route with authentication middleware
  router.get("/userProfile", isAuthenticated, profilePageDetails);
module.exports = router;
