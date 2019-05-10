const mongoose=require('mongoose');

const onlineAppointmentSchema=mongoose.Schema({
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
  appointmentDate:String,
  dateCreated:String,
  appointmentStatus:String,
  disease:String,
  prescription:String

});

module.exports=mongoose.model("OnlineAppointment", onlineAppointmentSchema);
