const mongoose=require('mongoose');
const doctorAvailabilitySchema=mongoose.Schema({
  doctorRegistrationNumber:  String,
  name:{
    firstname:String,
    lastname:String,
    },
  timeSlots:[{
    day:String,
    startTime:String,
    endTime:String
  }]
});

module.exports=mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
