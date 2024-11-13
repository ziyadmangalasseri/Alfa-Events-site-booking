const express=require('express');
const router=express.Router();
const {renderEmployeeForm,Employee} =require('../controller/AdminCtrl/EmployeeCtrl');

const {AddEventPage,AddEvent,ShowEventPage} = require('../controller/AdminCtrl/EventCtrl');
const {dashboard} = require("../controller/AdminCtrl/adminCtrl");


router.get('/addEmployee', renderEmployeeForm);
router.post('/addEmployee',Employee);


router.get("/dashboard",dashboard);
router.get('/addEmployeePage',createEmployeePage);
router.get('/addEventPage',AddEventPage);
router.get('/showEventPage',ShowEventPage);

router.post('/addEvent',AddEvent);


module.exports=router;