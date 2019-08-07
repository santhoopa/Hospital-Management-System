const express=require('express');
const User=require('../models/user');
const Doctor=require('../models/doctor');
const Employee=require('../models/employee');
const Patient=require('../models/patient');
const Room=require('../models/room');
const Appointment=require('../models/appointment');
const OnlineAppointment=require('../models/online_appointment');
const Admission=require('../models/admission');
const router=express.Router();

// router.get("/api/user/userNameValidity/:keyword",(req,res,next) => {
//   User.find({'username':req.params.keyword}).then((response)=>{
//     res.status(201).json({
//       searchResults:response.length
//     });

//   })
// });

//This is getting age for pie chart - Admin
router.get("/api/reports/getAge",(req,res,next) => {
  Patient.aggregate([
    {
      $project:
        {
          year: { $year: "$dob" },
          month: { $month: "$dob" }
        }
    }
  ]).then(response => {
    console.log(response);
   let age=[];
   let ages={};
   let group1=0;
   let group2=0;
   let group3=0;
   let group4=0;
   let group5=0;
   let group6=0;
    let array=[2017,2017,2012,2012,2002,2002,2002,1995,1995,1995,1995,1975,1975,1975,1975,1975,1960,1960,1960,1960,1960,1960]
    response.forEach(r => {
      var thisYear = new Date().getFullYear();
      //console.log(thisYear);
      var x=thisYear-r.year;
      if(x>0 && x<6){
        group1++;
      }else if(x>5 && x<11){
        group2++;
      }else if(x>10 && x<19){
        group3++;
      }else if(x>18 && x<31){
        group4++;
      }else if(x>30 && x<51){
        group5++;
      }else if(x>50){
        group6++;
      }
      //age.push(x);
    });

    ages={
      1:group1,
      2:group2,
      3:group3,
      4:group4,
      5:group5,
      6:group6,
    }
      age.push(group1);
      age.push(group2);
      age.push(group3);
      age.push(group4);
      age.push(group5);
      age.push(group6);
      console.log(group1);
      console.log(group2);
      console.log(group3);
      console.log(group4);
      console.log(group5);
      console.log(group6);
    res.status(201).json({
     res:age
    });
  });
});



router.get("/api/user/userDetails",(req,res,next) => {
  console.log("This is getting System user deatials - Admin");
  User.aggregate([
    {
      $lookup:
         {
           from: "doctors",
           localField: "registrationNumber",
           foreignField: "doctorRegistrationNumber",
           as: "doctor"
         }
    }

  ]).then(response=>{
    console.log(response);
    res.status(201).json({
     users:response
    });
  })
});
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
      message:"User Successfull Added",
      userAdded:true
    });
  }).catch(err =>{
    console.log("Error");
    res.status(201).json({
      message:"User Cannot Added",
      userAdded:false
    });
  })
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
      message:"User Successfull Added",
      userAdded:true

    });
  }).catch(err =>{
    console.log("Error");
    res.status(201).json({
      message:"User Cannot Added",
      userAdded:false
    });
  })
});

router.get("/api/doctor/getDoctorName/:regNo",(req,res,next) => {
  console.log("This is getting doctor name  - Adding doctor as a system user/For Sidemenu");
  Doctor.findOne({"doctorRegistrationNumber":req.params.regNo},'name doctorRegistrationNumber').then(results => {
    res.status(201).json({
      DoctorFirstName: results.name.firstname,
      DoctorLastName: results.name.lastname,
      DoctorNo:results.doctorRegistrationNumber
    });
  }).catch(err =>{
    console.log("Error: "+err);
  });
});

//Adding Employee - Admin
router.post("/api/admin/createEmployee",(req,res,next) => {
  console.log("This is create employee - Admin");
  console.log(req.body);
   const employee=new Employee({
    employeeRegistrationNumber:  Number(req.body.employeeRegistrationNumber),
    name:{
    fullname:req.body.employeeFullname,
    firstname:req.body.employeeFirstName,
    lastname:req.body.employeeLastName,
    },
    gender:req.body.genderEmployee,
    dob:new Date(req.body.employeeDOB),
    address:req.body.employeeAddress,
    city:req.body.employeeCity,
    district:req.body.employeeDistrict,
    nic:req.body.employeeNIC,
    maritalStatus:req.body.maritalStatus,
    contactNumber:req.body.employeeContactNumber,
    email:req.body.employeeEmail,
    employeeType:req.body.employeeType,
    joinedDate:new Date(req.body.joinedDate),
    highestEducationalQualification:req.body.qualificationLevel,
    qualification:req.body.qualifications
   });
   employee.save().then(result => {
    res.status(201).json({
      message:"Employee Successfull Added"
        });
   })
});

// Generate Employee Registration Number
router.get("/api/employee/generateRegistrationNumber",(req,res,next) => {
  console.log("This is Generating Employee Reg No");
  Employee.find(null,'employeeRegistrationNumber').sort('-employeeRegistrationNumber').limit(1).then(result => {
    console.log(result[0].employeeRegistrationNumber);
    const newRegNo=result[0].employeeRegistrationNumber +1;
    console.log(newRegNo);
    res.status(201).json({
      NewEmployeeRegistrationNumber: newRegNo
    });
  });

});

//Searching Employees - Admin
router.get("/api/employee/getEmployees/:keyword",(req,res,next) => {
  console.log("This is Admin - get employees route ");
  Employee.find({$or:[{'name.firstname':new RegExp('^'+req.params.keyword,"i")},{'name.lastname':new RegExp('^'+req.params.keyword,"i")}]}).then(results => {
    res.status(200).json({
      employees:results
    });
  }).catch(err =>{
    console.log("Error: "+err);
  });
});

//Get new room number
router.get("/api/admin/getNewRoomNumber",(req,res,next) => {
  Room.countDocuments().then(response=>{
    count=Number(response)+1;
    res.status(200).json({
      roomNumber:count
    });
  }).catch(err =>{
    console.log("Error: "+err);
  });
});

//Adding Rooms - Admin
router.post("/api/admin/addRooms",(req,res,next) => {
  console.log("This is adding new rooms");
  const room=new Room({
    roomNumber:req.body.roomNumber,
    type:req.body.type,
    status:'Vacant'
  });

  room.save().then(response => {
    console.log(response);
    res.status(201).json({
    });

  }).catch(err =>{
    console.log("Error: "+err);
  });
});

//Getting total appointments by year - For Reports
router.get("/api/admin/reports/getAppointmentsByYear/:year",(req,res,next) => {
  console.log("This is Getting total appointments by year")
  result=[];
  sorted=[0,0,0,0,0,0,0,0,0,0,0,0];
  Appointment.aggregate([
    {$project: { "month":{$month: '$appointmentDate'},"year" : {$year: '$appointmentDate'}}},
    {$match: { year: Number(req.params.year)}}
  ]).then(response =>{
    result=response;

    result.forEach(element => {
      for(var x=0; x<12; x++){
        if(element.month==(x+1)){
          sorted[x]+=1;
        }
      }
    });
    OnlineAppointment.aggregate([
      {$project: { "month":{$month: '$appointmentDate'},"year" : {$year: '$appointmentDate'}}},
      {$match: { year: Number(req.params.year)}}
    ]).then(response1 =>{
      result=response1;

      result.forEach(element => {
        for(var x=0; x<12; x++){
          if(element.month==(x+1)){
            sorted[x]+=1;
          }
        }
      });
      console.log(sorted);
      res.status(200).json({
        data:sorted
      });
    });
  });
});

//Getting total appointments by year per doctor - For Reports
router.get("/api/admin/reports/getAppointmentsByDoctor/:year&:doctor",(req,res,next) => {
  console.log("This is Getting total appointments by doctor - For Reports")
  console.log(req.params.doctor);
  result=[];
  sorted=[0,0,0,0,0,0,0,0,0,0,0,0];
  Appointment.aggregate([
    {$match: {"doctorRegistrationNumber":Number(req.params.doctor)}},
    {$project: { "month":{$month: '$appointmentDate'},"year" : {$year: '$appointmentDate'}}},
    {$match: { year: Number(req.params.year)}},

  ]).then(response =>{
    console.log(response);
    result=response;
    result.forEach(element => {
      for(var x=0; x<12; x++){
        if(element.month==(x+1)){
          sorted[x]+=1;
        }
      }
    });
    OnlineAppointment.aggregate([
      {$match: {"doctorRegistrationNumber":Number(req.params.doctor)}},
      {$project: { "month":{$month: '$appointmentDate'},"year" : {$year: '$appointmentDate'}}},
      {$match: { year: Number(req.params.year)}},

    ]).then(response1 =>{
      console.log(response1);
      result=response1;
      result.forEach(element => {
        for(var x=0; x<12; x++){
          if(element.month==(x+1)){
            sorted[x]+=1;
          }
        }
      });
      console.log(sorted);
      res.status(200).json({
        data:sorted
      });
    });
  });
});

//Getting total appointments by year per doctor - For Reports
router.get("/api/admin/reports/getAdmissionData/:year",(req,res,next) => {
  console.log("This is Getting total admissions - For Reports");
  result=[];
  sorted=[0,0,0,0,0,0,0,0,0,0,0,0];
  Admission.aggregate([
    {$project: { "month":{$month: '$admissionDate'},"year" : {$year: '$admissionDate'}}},
    {$match: { year: Number(req.params.year)}},

  ]).then(response =>{
    //console.log(response);
    result=response;
    result.forEach(element => {
      for(var x=0; x<12; x++){
        if(element.month==(x+1)){
          sorted[x]+=1;
        }
      }
    });
    console.log(sorted);
    res.status(200).json({
      data:sorted
    });
  });
});


//Getting Patients By City - For Reports
router.get("/api/admin/reports/getPatientsByCity",(req,res,next) => {
  data=[0,0,0,0,0,0,0,0,0,0];
  Patient.find().then(result => {
    //console.log(result);
    result.forEach( element => {
      console.log(element.city);
      if(element.city=="Kelaniya"){
        data[0]++;
      }else if (element.city=="Peliyagoda"){
        data[1]++;
      }else if (element.city=="Makola"){
        data[2]++;
      }else if (element.city=="Kiribathgoda"){
        data[3]++;
      }else if (element.city=="Kadawatha"){
        data[4]++;
      }else if (element.city=="Gampaha"){
        data[5]++;
      }else if (element.city=="Ganemulla"){
        data[6]++;
      }else if (element.city=="Balummahara"){
        data[7]++;
      }else if (element.city=="Waththala"){
        data[8]++;
      }else if (element.city=="Ragama"){
        data[9]++;
      }
    });

    res.status(200).json({
      data:data
    });
  })
});
module.exports=router;
