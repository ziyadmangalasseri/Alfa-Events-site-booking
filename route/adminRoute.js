const express=require('express');
const router=express.Router();
const {renderEmployeeForm,Employee} =require('../controller/AdminCtrl/EmployeeCtrl');
const {AddEventPage,AddEvent} = require('../controller/AdminCtrl/EventCtrl');
const { dashboard } = require('../controller/AdminCtrl/adminCtrl');


router.get('/addEmployeePage',renderEmployeeForm,);
router.get('/addEventPage',AddEventPage);
router.post('/addEvent',AddEvent);
router.get("/dashboard",dashboard)


module.exports=router;