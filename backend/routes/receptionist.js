const express=require('express');
const router=express.Router();
const Patient=require('../models/patient');
const Doctor=require('../models/doctor');
const DoctorAvailability=require('../models/doctor_availability');

//Getting patient name to schedule appointment - By Receptionist
router.get("/api/patient/getPatientName/:regNo",(req,res,next) => {
  console.log("This is receptionist - Get patient name route");
  Patient.findOne({"patientRegistrationNumber":req.params.regNo},'name').then(results => {
    res.status(201).json({
      PatientFirstName: results.name.firstname,
      PatientLastName: results.name.lastname
    });
  });
});

//Getting new Doctor registration number from db - By Receptionist
router.get("/api/doctor/getNewRegNumber",(req,res,next) => {
  console.log("This is receptionist - Getting new Doctor ID route");
  Doctor.find(null,'doctorRegistrationNumber').sort('-doctorRegistrationNumber').limit(1).then(result => {
    console.log(result[0].doctorRegistrationNumber);
    const newRegNo=result[0].doctorRegistrationNumber +1;
    console.log(newRegNo);
    res.status(201).json({
      NewDoctorRegistrationNumber: newRegNo
    });
  });

});



//Adding Doctors - By Receptionist
router.post("/api/doctors",(req,res,next) => {
  console.log("This is receptionist - add patients route ");
  console.log(req.body.doctorAvailability);

    const doctor=new Doctor({
    doctorRegistrationNumber:  req.body.doctorRegistrationNumber,
    name:{
    firstname:req.body.name.firstname,
    lastname:req.body.name.lastname,
    },
    gender:req.body.gender,
    dob:req.body.dob,
    address:req.body.address,
    city:req.body.city,
    district:req.body.district,
    nic:req.body.nic,
    maritalStatus:req.body.maritalStatus,
    contactNumber:req.body.contactNumber,
    email:req.body.email,
    doctorType:req.body.doctorType,
    SLMCRegNo:req.body.SLMCRegNo,
    primaryQualification:{
      degree:req.body.primaryQualification.degree,
      year:req.body.primaryQualification.year,
      university:req.body.primaryQualification.university,
      country:req.body.primaryQualification.country
    },
    postGradQualification:{
      degree:req.body.postGradQualification.degree,
      specialization:req.body.postGradQualification.specialization,
      year:req.body.postGradQualification.year,
      university:req.body.postGradQualification.university,
      country:req.body.postGradQualification.country
    }
    });
    console.log(doctor);


    doctor.save().then(createdDoctor => {

    const doctorAvailability=new DoctorAvailability({
      doctorRegistrationNumber:  req.body.doctorRegistrationNumber,
      name:{
      firstname:req.body.name.firstname,
      lastname:req.body.name.lastname,
      },
      timeSlots:req.body.doctorAvailability
    });
    console.log(doctorAvailability);
    doctorAvailability.save();

      res.status(201).json({
        message:"Doctor Successfull Added",
        doctor: createdDoctor.name.firstname
      });
    });



});

//Searching Patients - By Receptionist
router.get("/api/patients/:keyword",(req,res,next) => {
  console.log("This is receptionist - get patients route "+req.params.keyword);
  Patient.find({$or:[{'name.firstname':req.params.keyword},{'name.lastname':req.params.keyword}]}).then(results => {
    res.status(200).json({
      message: "Patients fetched successfully",
      patients:results
    });
  });
});

//Getting new patient registration number from db - By Receptionist
router.get("/api/patient/getNewRegNumber",(req,res,next) => {
  console.log("This is receptionist - Getting new patient ID route");
  Patient.find(null,'patientRegistrationNumber').sort('-patientRegistrationNumber').limit(1).then(result => {
    console.log(result[0].patientRegistrationNumber);
    const newRegNo=result[0].patientRegistrationNumber +1;
    console.log(newRegNo);
    res.status(201).json({
      NewPatientRegistrationNumber: newRegNo
    });
  });
});

//Adding Patients - By Receptionist
router.post("/api/patient/register",(req,res,next) => {
  console.log("This is receptionist - register patient route");
 // const patient=new Patient();
 // patients=req.body;
 console.log(req.body.dob);
 // console.log(patients);
  const patient=new Patient({
    patientRegistrationNumber:req.body.patientRegistrationNumber,
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
});

//Schedule Appointments - Receptionist - Getting Doctor Names List
router.get("/api/doctors/getdoctorNames",(req,res,next) => {
  console.log("Schedule Appointments - Getting Doctor Names List");
  Doctor.find(null,'name').then(results => {
   // console.log(results.name.firstname);
    res.status(200).json({
      message: "Doctor Names successfully fetched",
      doctorNames:results
    });
  });
});

//Schedule Appointments - Receptionist - Getting Doctor Available Time Slots
router.get("/api/doctors/getdoctorAvailability/:firstName",(req,res,next) => {
  DoctorAvailability.findOne({'name.firstname':req.params.firstName}).then(results =>{
      console.log(results);
      res.status(200).json({
        message: "Doctor Availabilities successfully fetched",
        timeSlots:results.timeSlots
      });
  });
});

  module.exports=router;
