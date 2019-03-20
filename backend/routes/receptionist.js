const express=require('express');
const router=express.Router();
const Patient=require('../models/patient');

router.post("/api/patient/register",(req,res,next) => {
  console.log("This is receptionist register patient route");
 // const patient=new Patient();
 // patients=req.body;
//  console.log(req.body.guardian.guardianType);
 // console.log(patients);
  const patient=new Patient({
    patientRegistrationNumber:"PAT/001",
    name:{
       firstname:req.body.name.firstname,
       lastname:req.body.name.lastname
    },
    gender:req.body.gender,
    address:req.body.address,
    city:req.body.city,
    district:req.body.district,
    nic:req.body.nic,
    maritalStatus:req.body.maritalStatus,
    contactNumber: req.body.contactNumber,
    email:req.body.email,
    guardian:{
      guardianType:req.body.guardian.guardianType,
      firstname:req.body.guardian.firstname,
      lastname:req.body.lastname,
      gender:req.body.guardian.gender,
      NIC:req.body.guardian.NIC,
      contactNumber:req.body.guardian.contactNumber
    }
  });

  patient.save().then(createdPatient => {
    res.status(201).json({
      message:"Patient Successfull Added",
      patient: createdPatient.name.firstname
    });
  });
  // console.log(patient.name.firstname);
  // res.status(200).json({
  //   message: "Patient Successfull Added",
  //   patient:patient.name.firstname

  // });
});

module.exports=router;
