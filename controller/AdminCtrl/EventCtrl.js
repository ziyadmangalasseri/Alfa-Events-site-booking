const Event=require('../../model/EventSchema');
const Employee=require('../../model/userModel');
const Cron=require('node-cron');
const AddEventPage=async(req,res)=>{
    try {
        // const Event=await Event.find().populate('employee');
        // const Employee=await Employee.find();
        res.render('admin/addEvent',{Event,Employee})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:false,message:'Internal server error'});
    }
}

Cron.schedule('0 0 * * *',async ()=>{
    const now=Date.now();
    try {
        const result=await Event.deleteMany({expirationtime:{$lt:now}});
        console.log(`${result.deletedCount} expired Event deleted success`);
    } catch (error) {
        console.error('Error Expired Event deleting',error);
    }
});
const AddEvent=async(req,res)=>{
    try {
        const {place,date,reportingTime,exitTime,jobTitle,
            jobDescription,employerLimit,expirationTime} = req.body;
            console.log(place,date,reportingTime,exitTime,jobTitle,
                jobDescription,employerLimit,expirationTime)

const newEvent=new Event({
    place:place,
    date:date,
    reportingTime:reportingTime,
    exitTime:exitTime,
    jobTitle:jobTitle,
    jobDescription:jobDescription,
    employerLimit:employerLimit,
    expirationTime:expirationTime
})
await newEvent.save();
res.status(200).json({success:true, message:'new Event successfully created'});
} catch (error) {
console.error(error.message);
res.status(500).json({success:false,message:'Internal server error'});
}
}
module.exports={AddEvent,AddEventPage};