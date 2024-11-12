const mongoose=require('mongoose');

const EventSchema=new mongoose.Schema({
    place:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        reuired:true,
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
}
}, {timestamps:true});
  module.exports=mongoose.model('events',EventSchema);