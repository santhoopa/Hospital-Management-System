const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
  employeeRegistrationNumber:  Number,
  name:{
  fullname:String,
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
  employeeType:String,
  joinedDate:Date,
  highestEducationalQualification:String,
  qualification:[{
    qualification:String,
    institute:String,
    year:String,
    grade:String,
    description:String
  }]
});

module.exports=mongoose.model("Employee", employeeSchema);
