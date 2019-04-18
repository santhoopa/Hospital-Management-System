const express=require('express');
const User=require('../models/user');
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

});


module.exports=router;
