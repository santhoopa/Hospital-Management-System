const express=require('express');
const User=require('../models/user');
const Doctor=require('../models/doctor');
const Employee=require('../models/employee');
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
  Employee.find({$or:[{'name.firstname':new RegExp('^'+req.params.keyword+'$',"i")},{'name.lastname':new RegExp('^'+req.params.keyword+'$',"i")}]}).then(results => {
    res.status(200).json({
      employees:results
    });
  });
});

module.exports=router;
