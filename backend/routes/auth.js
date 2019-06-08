const express=require('express');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.post("/api/user/login",(req,res,next) => {
  /*console.log("Got HTTP POST request to Login");
  const user=new User({
    username: "admin",
    role: "admin",
    password: 123

  });
  // user.save();
  res.status(200).json({
      message: "Login request is successfull",
      user:user

    });*/
    let fetchedUser;
    User.findOne({username:req.body.username,role:req.body.role})
     .then(user=>{
     // console.log(user);
      if(!user)
      {
          return res.status(401).json({
          message: "Authentication Failed"
        });
      }
      fetchedUser=user;
      if(user.password==req.body.password)
      {
        const token=jwt.sign({username: user.username,role:user.role,userId:user._id},"This is the secret text");
        console.log("Password Matches");
        console.log(user);
        res.status(200).json({
          token:token,
          username: user.username,
          role:user.role,
          registrationNumber:user.registrationNumber
        });
      }
      else
      {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
     })
     .catch(err => {
      console.log("Error: "+err)
    })


    res.status(200);
});



module.exports=router;
