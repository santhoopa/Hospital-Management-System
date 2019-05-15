const mongoose=require('mongoose');

const appointmentSchema=mongoose.Schema({
  appointmentNumber:  Number,
  doctorRegistrationNumber:Number,
  patientRegistrationNumber:Number,
  timeSlot:String,
  appointmentDate:String,
  dateCreated:String,
  appointmentType:String,
  appointmentStatus:String,
  symptoms:String,
  disease:String,
  prescription:String

});

module.exports=mongoose.model("Appointment", appointmentSchema);
