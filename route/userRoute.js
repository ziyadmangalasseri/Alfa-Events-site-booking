const express = require("express");
const  {userisAuthenticated}  = require("../middleware/isAuthenticated");

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

router.get("/home",userisAuthenticated, homePage);
router.get("/userProfile",userisAuthenticated,profilePageDetails);

router.get("/upcomingEvents",userisAuthenticated, showEvents);
router.get("/usereventDetails/:id",userisAuthenticated, userEventDetails);
router.post("/bookEvent/:id",userisAuthenticated, bookEvent);
router.get("/userbookedeventDetails/:id",userisAuthenticated,userBookedEventDetails)

router.get("/bookedEvents",userisAuthenticated,bookedEvents);

module.exports = router;
