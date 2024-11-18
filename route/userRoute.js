const express = require("express");
const router = express.Router();
const { homePage, profilePage } = require("../controller/UserCtrl/UserCtrl");
const {showEvents,userEventDetails,bookEvent} = require("../controller/UserCtrl/EventsCtrl");

router.get("/home", homePage);
router.get("/userProfile", profilePage);

router.get("/upcomingEvents",showEvents);
router.get("/usereventDetails/:id",userEventDetails);
router.post("/bookEvent/:id",bookEvent);

module.exports = router;
