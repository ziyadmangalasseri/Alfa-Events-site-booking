const express = require("express");
const  {isAuthenticated}  = require("../middleware/isAuthenticated");

const router = express.Router();
const {
  homePage,
  profilePageDetails,
} = require("../controller/UserCtrl/UserCtrl");
const {
  showEvents,
  userEventDetails,
  bookEvent,
  bookedEvents,
  userBookedEventDetails,
} = require("../controller/UserCtrl/EventsCtrl");

router.get("/home",isAuthenticated, homePage);
router.get("/userProfile",isAuthenticated,profilePageDetails);

router.get("/upcomingEvents",isAuthenticated, showEvents);
router.get("/usereventDetails/:id",isAuthenticated, userEventDetails);
router.post("/bookEvent/:id",isAuthenticated, bookEvent);
router.get("/userbookedeventDetails/:id",isAuthenticated,userBookedEventDetails)

router.get("/bookedEvents",isAuthenticated,bookedEvents);

module.exports = router;
