import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class EchannelingService{
  constructor(private http: HttpClient, private router: Router) {}




  getDoctorsList(){
    return this.http.get<{doctors:any}>("http://localhost:3000/api/onlineAppointments/getDoctorList");
  }

  getDoctor(keyword:string){
    return this.http.get<{message:string; doctors:any}>("http://localhost:3000/api/onlineAppointments/searchDoctor/"+keyword);
  }
  getDoctorAvailability(regno:string){
    return this.http.get<{ message:string; timeSlots:any}>("http://localhost:3000/api/doctors/getdoctorAvailability/"+regno);
  }

  makeOnlineAppointment(appointmentDetails:any){
    return this.http.post("http://localhost:3000/api/onlineAppointments/makeAppointment",appointmentDetails);

  }

  getNewAppointmentNumber(){
    console.log("New Appointment no is fetched");
    return this.http.get<{NewAppointmentNumber:number}>("http://localhost:3000/api/onlineappointment/getNewNumber");

  }
}
