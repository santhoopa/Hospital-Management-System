import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";



@Injectable({ providedIn: 'root' })
export class AdminService{

  constructor(private http: HttpClient, private router: Router) {}

  signupUser(user:User){
    console.log("This is user");
    this.http.post("http://localhost:3000/api/user/signup",user).subscribe((responseData)=>{

    });

  }

  searchDoctorByRegNo(RegNo:string){
    if (RegNo==""){
      return null
    }
  else
  {
    return this.http.get<{DoctorFirstName:string,DoctorLastName:string,DoctorNo:string}>("http://localhost:3000/api/doctor/getDoctorName/"+RegNo);

  }
  }

  signupDoctor(user:User){
    console.log("This is doctor");
    this.http.post("http://localhost:3000/api/doctor/signup",user).subscribe((responseData)=>{

    });
  }

  registerEmployee(employee:any){
    const load={
      employee
    }

    return this.http.post("http://localhost:3000/api/admin/createEmployee",employee);

  }

  getNewEmployeeRegNo(){
    return this.http.get<{NewEmployeeRegistrationNumber:number}>("http://localhost:3000/api/employee/generateRegistrationNumber");
  }

  searchEmployee(keyword:string){
    if (keyword==""){
      keyword=null;
    }

    return this.http.get<{employees:any}>("http://localhost:3000/api/employee/getEmployees/"+keyword);


  }
}
