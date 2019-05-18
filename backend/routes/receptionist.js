const express=require('express');
const router=express.Router();
const Patient=require('../models/patient');
const Doctor=require('../models/doctor');
const DoctorAvailability=require('../models/doctor_availability');
const Appointment=require('../models/appointment');
const Room=require('../models/room');
const Admission=require('../models/admission');
const OnlineAppointment=require('../models/online_appointment');

//Getting patient name to schedule appointment - By Receptionist
router.get("/api/patient/getPatientName/:regNo",(req,res,next) => {
  console.log("This is receptionist - Get patient name route");
  Patient.findOne({"patientRegistrationNumber":req.params.regNo},'name patientRegistrationNumber').then(results => {
    res.status(201).json({
      PatientFirstName: results.name.firstname,
      PatientLastName: results.name.lastname,
      PatientNo:results.patientRegistrationNumber
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
  console.log("This is receptionist - add doctors route ");
  console.log(req.body.doctorAvailability);

    const doctor=new Doctor({
    doctorRegistrationNumber:  req.body.doctorRegistrationNumber,
    name:{
    firstname:req.body.name.firstname,
    lastname:req.body.name.lastname,
    },
    gender:req.body.gender,
    dob:new Date(req.body.dob),
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
    console.log(new Date(req.body.dob));


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

//Searching Doctor - By receptionist
router.get("/api/findDoctors/:keyword",(req,res,next) => {
  console.log("This is receptionist - get doctors route "+req.params.keyword);
  Doctor.findOne({'doctorRegistrationNumber':Number(req.params.keyword)}).then(results => {
    console.log(results)
    res.status(200).json({
      doctor:results
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
  console.log(req.body);
  console.log(new Date(req.body.dob));
  const patient=new Patient({
    patientRegistrationNumber:req.body.patientRegistrationNumber,
    name:{
       firstname:req.body.name.firstname,
       lastname:req.body.name.lastname
    },
    gender:req.body.gender,
    address:req.body.address,
    dob:new Date(req.body.dob),
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

//Getting new appointment number from db - By Receptionist
router.get("/api/appointment/getNewNumber",(req,res,next) => {
  console.log("This is receptionist - Getting new appointment number route");
  Appointment.find(null,'appointmentNumber').sort('-appointmentNumber').limit(1).then(result => {
    console.log(result[0].appointmentNumber);
    const newNo=result[0].appointmentNumber +1;
    console.log(newNo);
    res.status(201).json({
      NewAppointmentNumber: newNo
    });
  });
});

//Getting new Online Appointment number from db - By Receptionist
router.get("/api/onlineappointment/getNewNumber",(req,res,next) => {
  console.log("This is receptionist - Getting new Online appointment number route");
  OnlineAppointment.find(null,'appointmentNumber').sort('-appointmentNumber').limit(1).then(result => {
    console.log(result[0]);
    const newNo=result[0].appointmentNumber +1;
    console.log(newNo);
    res.status(201).json({
      NewAppointmentNumber: newNo
    });
  });
});


//Schedule Appointment - Receptionist - Creating appointment
router.post("/api/appointment/scheduleAppointment",(req,res,next) => {
  console.log("Schedule Appointments");
  console.log(req.body);
  const appointment=new Appointment({
    appointmentNumber:  req.body.appointmentNumber,
    doctorRegistrationNumber:req.body.doctorRegistrationNumber,
    patientRegistrationNumber:req.body.patientRegistrationNumber,
    timeSlot:req.body.timeSlot,
    appointmentDate:new Date(req.body.appointmentDate),
    dateCreated:req.body.dateCreated,
    appointmentType:"Manual",
    appointmentStatus:"Pending",
    symptoms:null,
    disease:null,
    prescription:null
  });
  console.log(appointment);
  appointment.save().then(createdAppointment => {
    res.status(201).json({
      message:"Appointment Successfull Added"
    });
  });
});

//Schedule Appointments - Receptionist - Getting Doctor Names List
router.get("/api/doctors/getdoctorNames",(req,res,next) => {
  console.log("Schedule Appointments - Getting Doctor Names List");
  Doctor.find(null,'name doctorRegistrationNumber').then(results => {
   console.log(results);
    res.status(200).json({
      message: "Doctor Names successfully fetched",
      doctorNames:results
    });
  });
});

//Schedule Appointments - Receptionist - Getting Doctor Available Time Slots
router.get("/api/doctors/getdoctorAvailability/:doctorRegistrationNumber",(req,res,next) => {
  console.log(req.params.firstName);
  DoctorAvailability.findOne({'doctorRegistrationNumber':Number(req.params.doctorRegistrationNumber)}).then(results =>{
    //  console.log(results);
      res.status(200).json({
        message: "Doctor Availabilities successfully fetched",
        timeSlots:results.timeSlots
      });
  });
});

//Getting room availability - Admit Patient
router.get("/api/rooms",(req,res,next) => {
  console.log("This is Receptionist  - Get Room Availability Route")
  Room.find().then(results =>{
    res.status(200).json({
      rooms:results
    });
  });
});

//Getting vacant rooms
router.get("/api/rooms/getVacant",(req,res,next) => {
  console.log("This is Receptionist  - Get Vacant Room Route")
  Room.find({'status':'Vacant'}).then(results =>{
    res.status(200).json({
      VacantRooms:results
    });
  });

});
//Getting new admission ID - Admit Patient
router.get("/api/admission/getNewNumber",(req,res,next) => {
  console.log("This is receptionist - Getting new admission number route");
  Admission.find(null,'admissionNumber').sort('-admissionNumber').limit(1).then(result => {
    console.log(result[0].admissionNumber);
    const newNo=result[0].admissionNumber+1;
    console.log(newNo);
    res.status(201).json({
      NewAdmissionNumber: newNo
    });
  }).catch( error => {
    console.log("error")
  })
});



//Admit Patients
router.post("/api/patient/admit",(req,res,next) => {
  console.log("This is Receptionist  - Admit Patients Route")
  const admission=new Admission({
    admissionNumber:req.body.admissionNumber,
    patientRegistrationNumber:req.body.patientRegistrationNumber,
    appointmentNmber:req.body.appointmentNmber,
    roomNumber:req.body.roomNumber,
    admissionDate:req.body.admissionDate,
    dischargeDate:null,
    causeofAdmission:req.body.causeofAdmission,
    status:"Admitted",
  });
  console.log(req.body);
  admission.save().then( createdAdmission=>{
    Room.updateOne({'roomNumber':Number(req.body.roomNumber)},{'status':'Occupied'}).then(result =>{
      console.log(result);
    });
    res.status(201).json({
      message:"Patient Successfull Admitted"
    });
  });
});


// Current Patient Admissions - Discharge Patients
router.get("/api/admission/getCurrentAdmissions",(req,res,next) => {
  console.log("This is Receptionist  - Current Patient Admissions Route");
  Admission.aggregate([
    { $match: { "status" : "Admitted" } },
    {
     $lookup:
        {
          from: "rooms",
          localField: "roomNumber",
          foreignField: "roomNumber",
          as: "room"
        }
   },
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
        res.status(201).json({
          result:results
        });
    }).catch(err =>{
      console.log(err);
    });

});

//Search Admission - Discharge Patients
router.get("/api/admission/getAdmissionDetail/:admissionNumber",(req,res,next) => {
  console.log("This is Receptionist  - Search Patient Admissions Route");
  Admission.aggregate([
    { $match: { "admissionNumber" : Number(req.params.admissionNumber) } },
    { $match: { "status" : "Admitted" } },
    {
     $lookup:
        {
          from: "rooms",
          localField: "roomNumber",
          foreignField: "roomNumber",
          as: "room"
        }
   },
   {
    $lookup:
       {
         from: "patients",
         localField: "patientRegistrationNumber",
         foreignField: "patientRegistrationNumber",
         as: "patient"
       }
  }
    ]).then(result => {
      console.log(result);
        res.status(201).json({
          admissionDetail:result
        });
    }).catch(err =>{
      console.log(err);
    })
});

//Discharge Patient - Discharge Patient
router.post("/api/admission/dischargePatient",(req,res,next) => {
  console.log("This is receptionist - Discharge Patient Route");
  //console.log(req.body);
  Admission.updateOne({'admissionNumber':Number(req.body.admissionNum)},{'status':'Discharged'}).then(result =>{
    console.log(result);
    Room.updateOne({'roomNumber':Number(req.body.roomNum)},{'status':'Vacant'}).then(re =>{
      console.log(re);
      res.status(201).json({
      });
    });
  });


});

//Online Appointments - Getting doctors list
router.get("/api/onlineAppointments/getDoctorList",(req,res,next) => {
console.log("This is Online Appointments - Getting doctors list")
Doctor.find(null,'name doctorRegistrationNumber SLMCRegNo doctorType').then(results => {
  //console.log(results);
   res.status(200).json({
     doctors:results
   });
 });
});

//Online Appointment - Making Online Appointment
router.post("/api/onlineAppointments/makeAppointment",(req,res,next) => {
  console.log("This is Online Appointment - Making Online Appointment");
  console.log(req.body);
  console.log(req.body.appointmentNumber);
  const onlineApp=new OnlineAppointment({
    appointmentNumber:req.body.appointmentNumber,
    doctorRegistrationNumber:req.body.doctorRegistrationNumber,
    patientRegistrationNumber:null,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    gender:req.body.gender,
    contactNumber:req.body.contactNumber,
    NIC:req.body.NIC,
    city:req.body.city,
    district:req.body.district,
    timeSlot:req.body.timeSlot,
    appointmentDate:new Date(req.body.appointmentDate),
    dateCreated:new Date(req.body.dateCreated),
    appointmentStatus:"Pending",
    symptoms:null,
    disease:null,
    prescription:null
  })
  onlineApp.save().then(result =>{
    console.log(result);
    res.status(200).json({
    });
  })

});

//Receptionist - Online Appointment - View By Doctor - View Online Appointments
router.post("/api/onlineAppointments/viewByDoctor",(req,res,next) => {
  console.log("This is Viewing Online Appointments - View By Doctor - Receptionist");
  OnlineAppointment.find({'doctorRegistrationNumber':req.body.doctorRegistrationNumber}).then(results => {
    console.log(results);
     res.status(200).json({
      onlineAppointments:results
     });
   });
});

router.post("/api/onlineAppointments/viewByDoctor_LinkPatient",(req,res,next) => {
  console.log("This is Viewing Online Appointments for Linking Patient- View By Doctor - Receptionist");
  // Patient.find({$or:[{'name.firstname':req.params.keyword},{'name.lastname':req.params.keyword}]}).then(results => {
    OnlineAppointment.find({$and:[{'doctorRegistrationNumber':req.body.doctorRegistrationNumber},{'appointmentStatus':'Pending'}]}).then(results => {
      console.log(results);
      res.status(200).json({
       onlineAppointments:results
      });
    });
});

router.post("/api/onlineAppointments/linkPatient",(req,res,next) => {
  console.log("This is Linking Patient with Online Appointment - Receptionist");
  console.log(req.body);
  OnlineAppointment.updateOne({'_id':req.body.patientID},{$set:{'appointmentStatus':'Linked','patientRegistrationNumber':Number(req.body.patientRegistrationNumber)}}).then(results =>{
    console.log(results);
      res.status(200).json({
       results:results
      });
  })

});
module.exports=router;
