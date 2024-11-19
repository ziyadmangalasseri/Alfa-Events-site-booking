const express = require("express");
const router = express.Router();
const { homePage ,profilePageDetails} = require("../controller/UserCtrl/UserCtrl");
const {showEvents,userEventDetails,bookEvent} = require("../controller/UserCtrl/EventsCtrl");

router.get("/home", homePage);

const isAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
      return next();
    }
    res.redirect("/"); // Redirect to login page if not authenticated
  };
  
  // Profile route with authentication middleware
  router.get("/userProfile", isAuthenticated, profilePageDetails);

router.get("/upcomingEvents",showEvents);
router.get("/usereventDetails/:id",userEventDetails);
router.post("/bookEvent/:id",bookEvent);

module.exports = router;
