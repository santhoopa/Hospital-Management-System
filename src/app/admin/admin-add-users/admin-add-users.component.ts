import { User } from './../../models/user.model';
import { NgForm } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-add-users',
  templateUrl: './admin-add-users.component.html',
  styleUrls: ['./admin-add-users.component.css']
})

export class AdminAddUsersComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }

  onAddUser(addUserForm : NgForm){
    //console.log(addUserForm.value);
    const user:User={
      username: addUserForm.value.username,
      role: addUserForm.value.userRole,
      registrationNumber: null,
      password: addUserForm.value.password,
    }
    this.adminService.signupUser(user);
  }

  onAddDoctor(addDoctorForm : NgForm){
    const user:User={
      username: addDoctorForm.value.username,
      role: addDoctorForm.value.userRole,
      registrationNumber: Number(this.doctorRegNo),
      password: addDoctorForm.value.password,
    }
    this.adminService.signupDoctor(user);
    addDoctorForm.reset();

  }

  doctorName:string="";
  doctorRegNo:string="";
  onSearchDoctor(keyupevent:KeyboardEvent){
    this.doctorName="";
    let enteredKeyword=(<HTMLInputElement>keyupevent.target).value;
    let enteredKeyword_num=enteredKeyword.replace( /^\D+/g, '');
    this.adminService.searchDoctorByRegNo(enteredKeyword_num).subscribe(result =>{
      console.log(result.DoctorFirstName);
      this.doctorName=String(result.DoctorFirstName)+" "+String(result.DoctorLastName);
      this.doctorRegNo=result.DoctorNo;
    });

  }
}
