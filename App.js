const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongooose=require('mongoose');
const PORT=process.env.PORT || 5000;
const MONGOURL=process.env.MONGO_URL;

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index');
})

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
