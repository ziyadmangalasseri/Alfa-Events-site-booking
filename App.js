const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongooose=require('mongoose');
const PORT=process.env.PORT || 5000;
const MONGOURL=process.env.MONGO_URI;
const AuthRouter= require('./route/authRoute');

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static('public'));

app.use(AuthRouter);

mongooose.connect(MONGOURL)
.then(()=>{
    console.log(`mongodb connection successfull`);
    app.listen(PORT,()=>{
        console.log(`server is running http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})
