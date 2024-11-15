const mongoose = require('mongoose');

const addEmployeeSchema = new mongoose.Schema({
    EmployeeName:{
        type:String,
        required:true,
    },
    Place:{
        type:String,
        required:true,
    },
    DateOfBirth:{
        type:Date,
        required:true,
    },
    JoinedDate:{
        type:Date,
        required:true,
    },
    BloodGroup:{
        type:String,
        required:true,
    },
    EmployeeId:{
        type:Number,
        required:true,
        unique:true,
    }

})

module.exports=mongoose.model('addemployee',addEmployeeSchema)