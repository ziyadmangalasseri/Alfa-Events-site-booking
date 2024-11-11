const express=require('express');
const router=express.Router();
const {createEmployeePage} =require('../controller/admin/EmployeeCtrl');
const {AddEventPage,AddEvent} = require('../controller/admin/EventCtrl');

router.get('/addEmployeePage',createEmployeePage);
router.get('/addEventPage',AddEventPage);

router.post('/addEvent',AddEvent);

module.exports=router;