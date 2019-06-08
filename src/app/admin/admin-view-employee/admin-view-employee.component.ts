import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-employee',
  templateUrl: './admin-view-employee.component.html',
  styleUrls: ['./admin-view-employee.component.css']
})
export class AdminViewEmployeeComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }
  showTable=false;
  showForm=false;
  a=""
  b=[{},{}]
  displayedColumns: string[] = ['employeeRegistrationNumber','employeeFirstName','employeeLastName','employeeGender','employeeAddress','employeeCity','employeeDistrict','employeeNIC','employeemaritalStatus','employeeContact','employeeemail','employeeType','highestEducation'];
  emloyeeSource=null;
  searchEmployee(keyupevent:KeyboardEvent){
    this.adminService.searchEmployee((<HTMLInputElement>keyupevent.target).value).subscribe(response =>{
      this.showTable=true;
      this.emloyeeSource=response.employees;
      console.log(this.emloyeeSource);
    })

   }

   clickedEmployee;
   clickedEmployeeQualifications=[];
   viewEmployee(employee:any){
     console.log(employee);
     this.showForm=true;
     this.showTable=false;
     this.clickedEmployee=employee;
    //  this.clickedEmployee.employeeRegistrationNumber="EMP/"+this.clickedEmployee.employeeRegistrationNumber;
     this.clickedEmployee.dob=new Date(this.clickedEmployee.dob).toDateString();
     this.clickedEmployee.joinedDate=new Date(this.clickedEmployee.joinedDate).toDateString();

     this.clickedEmployeeQualifications=employee.qualification;
   }

   onBack(){
    this.showForm=false;
    this.showTable=true;
   }
}
