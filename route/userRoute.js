const express=require('express');
const router=express.Router();
const { homePage,profilePage } =require('../controller/user/UserCtrl');

router.get('/home',homePage);
router.get('/profile',profilePage);

module.exports= router;