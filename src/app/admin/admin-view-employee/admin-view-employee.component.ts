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
  a=""
  b=[{},{}]
  displayedColumns: string[] = ['employeeRegistrationNumber','employeeFirstName','employeeLastName','employeeGender','employeeAddress','employeeCity','employeeDistrict','employeeNIC','employeemaritalStatus','employeeContact','employeeemail','employeeType','highestEducation'];
  emloyeeSource=null;
  searchEmployee(keyupevent:KeyboardEvent){
    this.adminService.searchEmployee((<HTMLInputElement>keyupevent.target).value).subscribe(response =>{
      this.emloyeeSource=response.employees;
      console.log(this.emloyeeSource);
    })

   }
}
