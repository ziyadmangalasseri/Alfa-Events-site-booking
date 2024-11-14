const express = require("express");
const router = express.Router();
const {
  renderEmployeeForm,
  Employee,
  renderallemployees,
} = require("../controller/AdminCtrl/EmployeeCtrl");

const {
  AddEventPage,
  AddEvent,
  ShowEventPage,
  EventdetailsPage,
} = require("../controller/AdminCtrl/EventCtrl");

const { dashboard } = require("../controller/AdminCtrl/adminCtrl");

router.get("/addEmployee", renderEmployeeForm);

router.post("/addEmployee", Employee);

// const {dashboard} = require("../controller/AdminCtrl/adminCtrl");
router.get("/showemployeespage", renderallemployees);

router.get("/dashboard", dashboard);
router.get("/addEventPage", AddEventPage);
router.get("/showEventPage", ShowEventPage);

router.post("/addEvent", AddEvent);


router.get("/eventDetail/:id", EventdetailsPage);

module.exports = router;
