import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class ReceptionistService{
  constructor(private http: HttpClient, private router: Router) {}
  registerPatient(patient: Patient)
  {
    // const patient:Patient={
    //   patientRegistrationNumber:  "PAT/0102",
    //   name:{
    //   firstname:"SANTHOOPA",
    //   lastname:"JAYAWARDHANA",
    //   },
    //   gender:"MALE",
    //   address:"139",
    //   city:"GAMPAHA",
    //   district:"GAMPAHA",
    //   nic:"953394405V",
    //   maritalStatus:"UNMARRIESD",
    //   contactNumber:1234567891,
    //   email:"SANTHOOPA@GMAIL.COM",
    //   guardian:{
    //     guardianType:"string",
    //     firstname:"string",
    //     lastname:"string",
    //     gender:"string",
    //     NIC:"string",
    //     contactNumber: 123,
    //   }
    // }
    console.log("Service Reached");
    console.log(patient);
    this.http.post<{ message: string, patient:string}>("http://localhost:3000/api/patient/register",patient).subscribe(responseData=>{
      console.log(responseData.message + "Added Patient name:" +responseData.patient);

    });
  }
}
