const mongoose=require('mongoose');

const patientSchema=mongoose.Schema({
  patientRegistrationNumber: {type: Number, required:true},
  name:{
  firstname:String,
  lastname:String
  },
  gender:String,
  address:String,
  dob:Date,
  city:String,
  district:String,
  nic:String,
  maritalStatus:String,
  contactNumber:Number,
  email:String,
  guardian:{
    guardianType:String,
    firstname:String,
    lastname:String,
    gender:String,
    NIC:String,
    contactNumber:Number
  }
});

module.exports=mongoose.model("Patient", patientSchema);
