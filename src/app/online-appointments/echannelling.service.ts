import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class EchannelingService{
  constructor(private http: HttpClient, private router: Router) {}




  getDoctorsList(){
    return this.http.get<{doctors:any}>("http://localhost:3000/api/onlineAppointments/getDoctorList");
  }

  getDoctorAvailability(regno:string){
    return this.http.get<{ message:string; timeSlots:any}>("http://localhost:3000/api/doctors/getdoctorAvailability/"+regno);
  }

  makeOnlineAppointment(appointmentDetails:any){
    this.http.post("http://localhost:3000/api/onlineAppointments/makeAppointment",appointmentDetails).subscribe(response => {
      this.router.navigate(["/echannelling"]);

    });

  }

  getNewAppointmentNumber(){
    console.log("New Appointment no is fetched");
    return this.http.get<{NewAppointmentNumber:number}>("http://localhost:3000/api/onlineappointment/getNewNumber");

  }
}
