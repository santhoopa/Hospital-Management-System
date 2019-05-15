const express=require('express');
const User=require('../models/user');
const Doctor=require('../models/doctor');
const router=express.Router();

router.post("/api/user/signup",(req,res,next) => {
  console.log("This is Add user route - Admin");
  console.log(req.body);
  const user=new User({
    username: req.body.username,
    role:req.body.role,
    registrationNumber: null,
    password: req.body.password,
  });
  user.save().then((addedUser) => {
    console.log(addedUser);
    res.status(201).json({
      message:"User Successfull Added"
    });
  });
});


router.post("/api/doctor/signup",(req,res,next) => {
  console.log("This is Add Doctor route - Admin");
  console.log(req.body);
  const user=new User({
    username: req.body.username,
    role:"doctor",
    registrationNumber: req.body.registrationNumber,
    password: req.body.password,
  });
  user.save().then((addedUser) => {
    console.log(addedUser);
    res.status(201).json({
      message:"User Successfull Added"
    });
  });
});

router.get("/api/doctor/getDoctorName/:regNo",(req,res,next) => {
  console.log("This is getting doctor name  - Adding doctor as a system user");
  Doctor.findOne({"doctorRegistrationNumber":req.params.regNo},'name doctorRegistrationNumber').then(results => {
    res.status(201).json({
      DoctorFirstName: results.name.firstname,
      DoctorLastName: results.name.lastname,
      DoctorNo:results.doctorRegistrationNumber
    });
  });
});
module.exports=router;
