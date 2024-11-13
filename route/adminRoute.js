const express=require('express');
const router=express.Router();
const {createEmployeePage} =require('../controller/AdminCtrl/EmployeeCtrl');
const {AddEventPage,AddEvent} = require('../controller/AdminCtrl/EventCtrl');
const {dashboard} = require("../controller/AdminCtrl/adminCtrl");


router.get("/dashboard",dashboard);
router.get('/addEmployeePage',createEmployeePage);
router.get('/addEventPage',AddEventPage);
router.post('/addEvent',AddEvent);


module.exports=router;