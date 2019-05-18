const mongoose=require('mongoose');

const onlineAppointmentSchema=mongoose.Schema({
  appointmentNumber:Number,
  doctorRegistrationNumber:Number,
  patientRegistrationNumber:Number,
  firstname:String,
  lastname:String,
  gender:String,
  contactNumber:Number,
  NIC:String,
  city:String,
  district:String,
  timeSlot:String,
  appointmentDate:Date,
  dateCreated:Date,
  appointmentStatus:String,
  symptoms:String,
  disease:String,
  prescription:String

});

module.exports=mongoose.model("OnlineAppointment", onlineAppointmentSchema);
