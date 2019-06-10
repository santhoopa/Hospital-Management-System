import { MatSnackBar } from '@angular/material';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeQualification } from 'src/app/models/employee_qualification.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {
  enteredQualification;
  enteredInstitute;
  enteredYear;
  enteredGrade;
  enteredDescription;


  addedQualifications:EmployeeQualification[]=[];

  qualification=[{},{}]
  constructor(public adminService: AdminService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generateRegNo();
  }

  onAddQualification(){
    this.addedQualifications.push({
      qualification:this.enteredQualification,
      year:this.enteredYear,
      institute:this.enteredInstitute,
      grade:this.enteredGrade,
      description:this.enteredDescription
    });

    this.enteredQualification="";
    this.enteredInstitute="";
    this.enteredYear="";
    this.enteredGrade="";
    this.enteredDescription="";

  }
onClearTable(){
  this.addedQualifications=[]
}

onRegisterEmployee(form:NgForm){
  // if(form.invalid){
  //   this.snackBar.open("Please Enter Valid Details ", "OK", {
  //     panelClass: ['error']
  //   });
  //   return
  // }

  let regno_string:String = form.value.employeeRegistrationNumber;
  var regNum = regno_string.replace( /^\D+/g, '');
  const employee={
    employeeRegistrationNumber:regNum,
    employeeFirstName:form.value.employeeFirstName,
    employeeLastName:form.value.employeeLastName,
    employeeFullname:form.value.employeeFullname,
    genderEmployee:form.value.genderEmployee,
    employeeAddress:form.value.employeeAddress,
    employeeCity:form.value.employeeCity,
    employeeDistrict:form.value.employeeDistrict,
    employeeNIC:form.value.employeeNIC,
    employeeDOB:new Date(form.value.employeeDOB).toDateString(),
    maritalStatus:form.value.maritalStatus,
    employeeContactNumber:form.value.employeeContactNumber,
    employeeEmail:form.value.employeeEmail,
    employeeType:form.value.employeeType,
    qualificationLevel:form.value.qualificationLevel,
    joinedDate:new Date(form.value.joinedDate).toDateString(),
    qualifications:this.addedQualifications
  }

  console.log(employee);
  this.adminService.registerEmployee(employee).subscribe(res => {
    this.generateRegNo();
    this.snackBar.open("Employee Successfully Added ", "OK", {
      panelClass: ['success']
    });
    form.resetForm();
    this.onClearTable();
  })
}

employeeRegistrationNo=null;
generateRegNo(){
  this.adminService.getNewEmployeeRegNo().subscribe(responseData =>{
    this.employeeRegistrationNo=null;
    this.employeeRegistrationNo="EMP/"+responseData.NewEmployeeRegistrationNumber;
  });
}
}
