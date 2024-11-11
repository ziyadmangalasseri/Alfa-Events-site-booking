const mongoose=require('mongoose');

var userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:String,
        require:true,
        unique:true
    },
    place:{
        type:String,
        required:true
    },
    JoiningDate:{
        type:String,
        required:true
    },
    DateofBirth:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    }

});
module.exports=mongoose.model('employees',userSchema);