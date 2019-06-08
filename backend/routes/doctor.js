const express=require('express');
const router=express.Router();
const Patient=require('../models/patient');
const Doctor=require('../models/doctor');
const DoctorAvailability=require('../models/doctor_availability');
const Appointment=require('../models/appointment');
const Room=require('../models/room');
const Admission=require('../models/admission');
const OnlineAppointment=require('../models/online_appointment');

//Doctor - Getting new appointments By Date
router.post("/api/profiles/doctor/getAppointmentsByDate",(req,res,next) => {
  let normal_appointments=[];
  let online_appointments=[];
  let date=new Date(req.body.appointmentDate);
  //console.log(new Date(req.body.appointmentDate));
  //console.log(req.body)
  var today = new Date();
   //console.log(today);
  Appointment.aggregate([
    { $match: { "doctorRegistrationNumber" : Number(req.body.doctorRegistrationNumber) } },
    { $match: { "appointmentDate" : new Date(req.body.appointmentDate)}},
    { $match: { "appointmentStatus" : "Pending" } },
    {
      $lookup:
         {
           from: "patients",
           localField: "patientRegistrationNumber",
           foreignField: "patientRegistrationNumber",
           as: "patient"
         }
    }
  ]).then(results => {
    console.log(results);
    results.map(app =>{
      //console.log(app)
      normal_appointments.push(app);
    });
    OnlineAppointment.aggregate([
    { $match: { "doctorRegistrationNumber" : Number(req.body.doctorRegistrationNumber) } },
    { $match: { "appointmentDate" : new Date(req.body.appointmentDate) } },
    { $match: { "appointmentStatus" : "Linked" } },
    {
      $lookup:
         {
           from: "patients",
           localField: "patientRegistrationNumber",
           foreignField: "patientRegistrationNumber",
           as: "patient"
         }
    }

    ]).then(resu => {
      resu.map(oapp =>{
      //  console.log(oapp)
        online_appointments.push(oapp);
      });
      res.status(200).json({
        normal_appointments:normal_appointments,
        online_appointments:online_appointments
      });
    });
  });
});

//Doctor - Saving Treament Information - Normal Appointments
router.post("/api/profiles/doctor/saveTreatmentInformation_Normal",(req,res,next) => {
  console.log("This is saveTreatmentInformation_Normal")
  console.log(req.body);
  Appointment.updateOne({'appointmentNumber':Number(req.body.appointmentNumber)},{$set:{'appointmentStatus':'Concluded','symptoms':req.body.symptoms,'disease':req.body.disease,'prescription':req.body.prescription}}).then(results => {
    console.log(results);
    res.status(200).json({
     results:results
    });
  }).catch( err => {
    console.log("Error: "+err);
  })
});

//Doctor - Saving Treament Information - Online Appointments
router.post("/api/profiles/doctor/saveTreatmentInformation_Online",(req,res,next) => {
  console.log("This is saveTreatmentInformation_Online")
  console.log(req.body);
  OnlineAppointment.updateOne({'appointmentNumber':Number(req.body.appointmentNumber)},{$set:{'appointmentStatus':'Concluded','symptoms':req.body.symptoms,'disease':req.body.disease,'prescription':req.body.prescription}}).then(results => {
    console.log(results);
    res.status(200).json({
     results:results
    });
  }).catch( err => {
    console.log("Error: "+err);
  })
});




//Doctor - Getting treatment history
router.post("/api/profiles/doctor/getTreatmentHistory",(req,res,next) => {
  console.log("This is Getting Treatment History")
  console.log(req.body);
  let normal_appointments=[];
  let online_appointments=[];
  Appointment.aggregate([
    { $match: { "patientRegistrationNumber" : Number(req.body.patientRegistrationNumber) } },
    { $match: { "appointmentStatus" : "Concluded" } },
    {
      $lookup:
         {
           from: "doctors",
           localField: "doctorRegistrationNumber",
           foreignField: "doctorRegistrationNumber",
           as: "doctor"
         }
    }

  ]).then(results => {
    console.log(results);
    results.map(app =>{
      console.log(app)
      normal_appointments.push(app);
    });
    OnlineAppointment.aggregate([
      { $match: { "patientRegistrationNumber" : Number(req.body.patientRegistrationNumber) } },
      { $match: { "appointmentStatus" : "Concluded" } },
    {
      $lookup:
         {
           from: "doctors",
           localField: "doctorRegistrationNumber",
           foreignField: "doctorRegistrationNumber",
           as: "doctor"
         }
    }

    ]).then(resu => {
      resu.map(oapp =>{
        console.log(oapp)
        online_appointments.push(oapp);
      });
      res.status(200).json({
        normal_appointments:normal_appointments,
        online_appointments:online_appointments
      });
    });
  });
});
module.exports=router;
