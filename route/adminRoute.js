const express = require("express");
const router = express.Router();
const {
  AddEvent,
  ShowEventPage,
  AddEventPage,
  EventdetailsPage,
  EditEventPage,
  EditEvent,
  DeleteEvent
} = require("../controller/AdminCtrl/EventCtrl");
const {
  renderEmployeeForm,
  Employee,
  renderallemployees,
  detailsOfEditEmployee,
  editEmployee,
} = require("../controller/AdminCtrl/EmployeeCtrl");

const { dashboard } = require("../controller/AdminCtrl/adminCtrl");


router.get("/addEmployee", renderEmployeeForm);
router.post("/addEmployee", Employee);
router.get("/showemployeespage", renderallemployees);

router.get("/editemployee/:id",detailsOfEditEmployee);
router.post("/editEmployee/:id",editEmployee);


router.get("/dashboard", dashboard);

router.get("/addEventPage", AddEventPage);
router.post("/addEvent", AddEvent);

router.get("/eventDetail/:id", EventdetailsPage);
router.get("/showEventPage", ShowEventPage);

router.get("/event/edit/:id",EditEventPage)
router.post("/event/edit/:id",EditEvent);

router.post("/event/delete/:id",DeleteEvent);




module.exports = router;
