const mongoose=require('mongoose');

const admissionSchema=mongoose.Schema({
  admissionNumber:Number,
  patientRegistrationNumber:Number,
  appointmentNmber:Number,
  roomNumber:Number,
  admissionDate:String,
  dischargeDate:String,
  causeofAdmission:String,
  status:String,
});


module.exports=mongoose.model("Admission", admissionSchema);

