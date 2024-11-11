const express=require('express');
const router=express.Router();
const { login,userLogin,signup, createAccount }=require('../controller/auth');

router.get('/signup',signup);
router.post('/createAccount', createAccount);

router.get('/',login);
router.post("/userlogin", userLogin);


module.exports=router;