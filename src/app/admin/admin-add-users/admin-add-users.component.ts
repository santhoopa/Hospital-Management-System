import { MatSnackBar } from '@angular/material';
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

  constructor(public adminService: AdminService,private snackBar: MatSnackBar) { }

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
    this.adminService.signupUser(user).subscribe((responseData)=>{
      console.log(responseData.userAdded);
      if(responseData.userAdded==true){
        this.snackBar.open( "User Added", "OK", {
          panelClass: ['success']
        });
        addUserForm.reset();
      }else if(responseData.userAdded==false){
        this.snackBar.open( "User Cannot be addded, username already exist. Enter Another Username", "OK", {
          panelClass: ['error']
        });
      }
    });
  }

  onAddDoctor(addDoctorForm : NgForm){
    const user:User={
      username: addDoctorForm.value.username,
      role: addDoctorForm.value.userRole,
      registrationNumber: Number(this.doctorRegNo),
      password: addDoctorForm.value.password,
    }
    this.adminService.signupDoctor(user).subscribe((responseData)=>{
      if(responseData.userAdded==true){
        this.snackBar.open( "User Added", "OK", {
          panelClass: ['success']
        });
        addDoctorForm.reset();
      }else if(responseData.userAdded==false){
        this.snackBar.open( "User Cannot be addded, username already exist. Enter Another Username", "OK", {
          panelClass: ['error']
        });
      }
    });

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
