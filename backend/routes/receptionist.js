const express=require('express');
const router=express.Router();
const Patient=require('../models/patient');

router.get("/api/patients/:keyword",(req,res,next) => {
  console.log("This is receptionist - get patients route "+req.params.keyword);
  Patient.find({$or:[{'name.firstname':req.params.keyword},{'name.lastname':req.params.keyword}]}).then(results => {
    res.status(200).json({
      message: "Patients fetched successfully",
      patients:results
    });
  });
});
router.post("/api/patient/register",(req,res,next) => {
  console.log("This is receptionist - register patient route");
 // const patient=new Patient();
 // patients=req.body;
 console.log(req.body.dob);
 // console.log(patients);
  const patient=new Patient({
    patientRegistrationNumber:"PAT/001",
    name:{
       firstname:req.body.name.firstname,
       lastname:req.body.name.lastname
    },
    gender:req.body.gender,
    address:req.body.address,
    dob:req.body.dob,
    city:req.body.city,
    district:req.body.district,
    nic:req.body.nic,
    maritalStatus:req.body.maritalStatus,
    contactNumber: req.body.contactNumber,
    email:req.body.email,
    guardian:{
      guardianType:req.body.guardian.guardianType,
      firstname:req.body.guardian.firstname,
      lastname:req.body.guardian.lastname,
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
