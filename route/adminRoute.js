const express = require("express");
const router = express.Router();
const {
  AddEvent,
  ShowEventPage,
  AddEventPage,
  EventdetailsPage,
  EditEventPage,
  EditEvent,
  DeleteEvent,
} = require("../controller/AdminCtrl/EventCtrl");
const {
  renderEmployeeForm,
  addEmployee,
  renderallemployees,
  employeeDetails,
  editEmployeePage,
  editEmployee,
  deleteEmployee,
  removeEmployeeFromEvent
} = require("../controller/AdminCtrl/EmployeeCtrl");

const { dashboard } = require("../controller/AdminCtrl/adminCtrl");

router.get("/addEmployee", renderEmployeeForm);
router.post("/addEmployee", addEmployee);
router.get("/showemployeespage", renderallemployees);
router.get("/showEmployeeDetails/:id", employeeDetails);
router.get("/editEmployee/:id",editEmployeePage)
router.put("/editEmployee/:id", editEmployee);
router.delete("/deleteEmployee/:id",deleteEmployee);

router.get("/dashboard", dashboard);

router.get("/addEventPage", AddEventPage);
router.post("/addEvent", AddEvent);

router.get("/eventDetail/:id", EventdetailsPage);
router.get("/showEventPage", ShowEventPage);

router.get("/event/edit/:id", EditEventPage);
router.post("/event/edit/:id", EditEvent);
router.delete('/event/:eventId/employee/:userId', removeEmployeeFromEvent);


router.delete("/event/delete/:id", DeleteEvent);

module.exports = router;
