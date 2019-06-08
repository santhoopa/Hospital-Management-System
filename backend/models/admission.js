const mongoose=require('mongoose');

const admissionSchema=mongoose.Schema({
  admissionNumber:Number,
  patientRegistrationNumber:Number,
  appointmentNmber:String,
  roomNumber:Number,
  admissionDate:Date,
  dischargeDate:Date,
  causeofAdmission:String,
  status:String,
});


module.exports=mongoose.model("Admission", admissionSchema);

