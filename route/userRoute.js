const express = require("express");
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

router.get("/home", homePage);
router.get("/userProfile",profilePageDetails);

router.get("/upcomingEvents", showEvents);
router.get("/usereventDetails/:id", userEventDetails);
router.post("/bookEvent/:id", bookEvent);
router.get("/userbookedeventDetails/:id",userBookedEventDetails)

router.get("/bookedEvents",bookedEvents);

module.exports = router;
