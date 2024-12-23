const express = require("express");
const { adminisAuthenticated } = require("../middleware/isAuthenticated");

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
  removeEmployeeFromEvent,
  changePassword,
  updatePassword,
  employeeReported,
  unReportEmployee,
  makeAdmin,
  removeAdmin,
} = require("../controller/AdminCtrl/EmployeeCtrl");

const { dashboard } = require("../controller/AdminCtrl/adminCtrl");
const { route } = require("./adminRoute");

router.get("/addEmployee", adminisAuthenticated, renderEmployeeForm);
router.post("/addEmployee", adminisAuthenticated, addEmployee);
router.get("/showemployeespage", adminisAuthenticated, renderallemployees);
router.get("/showEmployeeDetails/:id", adminisAuthenticated, employeeDetails);
router.get("/editEmployee/:id", adminisAuthenticated, editEmployeePage);
router.put("/editEmployee/:id", adminisAuthenticated, editEmployee);
router.delete("/deleteEmployee/:id", adminisAuthenticated, deleteEmployee);

router.get("/dashboard", adminisAuthenticated, dashboard);

router.get("/addEventPage", adminisAuthenticated, AddEventPage);
router.post("/addEvent", adminisAuthenticated, AddEvent);

router.get("/eventDetail/:id", adminisAuthenticated, EventdetailsPage);
router.get("/showEventPage", adminisAuthenticated, ShowEventPage);

router.get("/event/edit/:id", adminisAuthenticated, EditEventPage);
router.post("/event/edit/:id", adminisAuthenticated, EditEvent);
router.delete(
  "/event/:eventId/employee/:userId",
  adminisAuthenticated,
  removeEmployeeFromEvent
);
router.post("/employeeReported/:id", adminisAuthenticated, employeeReported);
router.delete(
  "/employeeUnreported/:id",
  adminisAuthenticated,
  unReportEmployee
);

router.get("/changePassword/:id", adminisAuthenticated, changePassword);
router.put("/updatePassword/:id", adminisAuthenticated, updatePassword);
router.put("/makeadmin/:id", adminisAuthenticated, makeAdmin);
router.put("/removeadmin/:id", adminisAuthenticated, removeAdmin);

router.delete("/event/delete/:id", adminisAuthenticated, DeleteEvent);

module.exports = router;
