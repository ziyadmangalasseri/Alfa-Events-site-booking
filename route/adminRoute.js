const express = require("express");
const {isAuthenticated}  = require("../middleware/isAuthenticated");

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

router.get("/addEmployee",isAuthenticated, renderEmployeeForm);
router.post("/addEmployee",isAuthenticated, addEmployee);
router.get("/showemployeespage",isAuthenticated,renderallemployees);
router.get("/showEmployeeDetails/:id",isAuthenticated, employeeDetails);
router.get("/editEmployee/:id",isAuthenticated,editEmployeePage)
router.put("/editEmployee/:id", isAuthenticated,editEmployee);
router.delete("/deleteEmployee/:id",isAuthenticated,deleteEmployee);

router.get("/dashboard",isAuthenticated, dashboard);

router.get("/addEventPage",isAuthenticated, AddEventPage);
router.post("/addEvent",isAuthenticated, AddEvent);

router.get("/eventDetail/:id",isAuthenticated, EventdetailsPage);
router.get("/showEventPage",isAuthenticated, ShowEventPage);

router.get("/event/edit/:id",isAuthenticated, EditEventPage);
router.post("/event/edit/:id",isAuthenticated, EditEvent);
router.delete('/event/:eventId/employee/:userId',isAuthenticated, removeEmployeeFromEvent);


router.delete("/event/delete/:id",isAuthenticated, DeleteEvent);

module.exports = router;
