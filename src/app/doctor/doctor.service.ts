import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class DoctorService{

  constructor(private http: HttpClient, private router: Router) {}

  getDoctorName_SideMenu(RegNo){
    console.log("This is get doctor name");
    return this.http.get<{DoctorFirstName:string,DoctorLastName:string,DoctorNo:string}>("http://localhost:3000/api/doctor/getDoctorName/"+RegNo);

  }

  getAppointments_ByDate(doctorRegNo:any,appDate:string){
    const load={
      doctorRegistrationNumber:doctorRegNo,
      appointmentDate:appDate
    }

    return this.http.post<{normal_appointments:any,online_appointments:any}>("http://localhost:3000/api/profiles/doctor/getAppointmentsByDate",load);

  }

  storeTreatmentInformation(treatmentInformation:any,type:string){
    console.log(treatmentInformation);
    console.log(type);

    if(type=="Normal"){
      return this.http.post("http://localhost:3000/api/profiles/doctor/saveTreatmentInformation_Normal",treatmentInformation);
    }else if (type=="Online"){
      return this.http.post("http://localhost:3000/api/profiles/doctor/saveTreatmentInformation_Online",treatmentInformation);

    }
  }

  getTreatmentHistory(patientRegistrationNumber:string){
    const load={
      patientRegistrationNumber:patientRegistrationNumber

    }
    return this.http.post<{normal_appointments:any,online_appointments:any}>("http://localhost:3000/api/profiles/doctor/getTreatmentHistory",load);

  }
}
