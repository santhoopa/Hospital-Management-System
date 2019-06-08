import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  constructor(public adminService: AdminService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSystemUsers()
  }
  systemUsers=[];
  getSystemUsers(){
    this.systemUsers=[]
    this.adminService.getSystemUsers().subscribe(response =>{
      console.log(response)
      response.users.map(user =>{
        if(user.doctor.length==0)
        {
          const doc={
            name:{
              firstname:"N/A",
              lastname:"",
            }
          }

          user.doctor.push(doc)
        }
        if(user.role=="doctor")
        {
          user.registrationNumber="DR/"+user.registrationNumber
        }
        else {
          user.registrationNumber="N/A"

        }
        this.systemUsers.push(user);
      })
    })
  }
}
