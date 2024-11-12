const express=require('express');
const router=express.Router();
const {createEmployeePage} =require('../controller/AdminCtrl/EmployeeCtrl');
const {AddEventPage,AddEvent} = require('../controller/AdminCtrl/EventCtrl');


router.get('/addEmployeePage',createEmployeePage);
router.get('/addEventPage',AddEventPage);

router.post('/addEvent',AddEvent);


module.exports=router;