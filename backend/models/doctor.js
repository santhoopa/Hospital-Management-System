const mongoose=require('mongoose');

const doctorSchema=mongoose.Schema({
  doctorRegistrationNumber:  Number,
  name:{
  firstname:String,
  lastname:String,
  },
  gender:String,
  dob:Date,
  address:String,
  city:String,
  district:String,
  nic:String,
  maritalStatus:String,
  contactNumber:Number,
  email:String,
  doctorType:String,
  SLMCRegNo:Number,
  primaryQualification:{
    degree:String,
    year:Number,
    university:String,
    country:String
  },
  postGradQualification:{
    degree:String,
    specialization:String,
    year:Number,
    university:String,
    country:String
  }
});

module.exports=mongoose.model("Doctor", doctorSchema);
