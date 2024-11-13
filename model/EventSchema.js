const mongoose=require('mongoose');

const EventSchema=new mongoose.Schema({
    place:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    reportingTime:{
        type:String,
        required:true
    },
  exitTime:{
    type:String,
    required:true,
},
  jobTitle:{
    type:String,
    required:true
},
  jobDescription:{
    type:String,
    required:true,
},
  employerLimit:{
    type:String,
    required:true,
    default:0,
    min:0
},
  expirationTime:{
    type:Date,
    required:true
},
currentEmployers:{
  type:Number,
  default:0
}
}, {timestamps:true});
  module.exports=mongoose.model('events',EventSchema);