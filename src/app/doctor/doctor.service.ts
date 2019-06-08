import { Subject } from 'rxjs';
import { Patient } from './../models/patient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DoctorService{
  patients:Patient[];
  private patientUpdated=new Subject<Patient[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getDoctorName_SideMenu(RegNo){
    console.log("This is get doctor name");
    return this.http.get<{DoctorFirstName:string,DoctorLastName:string,DoctorNo:string}>("http://localhost:3000/api/doctor/getDoctorName/"+RegNo);

  }

  getAppointments_ByDate(doctorRegNo:any,appDate:Date){
    const load={
      doctorRegistrationNumber:doctorRegNo,
      appointmentDate:appDate.toDateString()
    }
    console.log(load)
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

  searchPatients(keyword:string){
    if (keyword=="")
     { keyword=null;}

    this.http.get<{ message:string; patients:any}>("http://localhost:3000/api/patients/"+keyword)
    .pipe(map((response)=>{
      return response.patients.map(patient =>{
        return {
          patientRegistrationNumber: patient.patientRegistrationNumber,
           name:{
            firstname:patient.name.firstname,
            lastname:patient.name.lastname,
            },
            gender:patient.gender,
            address:patient.address,
            dob:new Date(patient.dob).toDateString(),
            city:patient.city,
            district:patient.district,
            nic:patient.nic,
            maritalStatus:patient.maritalStatus,
            contactNumber:patient.contactNumber,
            email:patient.email,
            guardian:{
              guardianType:patient.guardian.guardianType,
              firstname:patient.guardian.firstname,
              lastname:patient.guardian.lastname,
              gender:patient.guardian.gender,
              NIC:patient.guardian.NIC,
              contactNumber:patient.guardian.contactNumber ,
             }
       }
      })
    }))
    .subscribe(response =>{
      this.patients=response;
      this.patientUpdated.next([...this.patients]);


    });
  }

  getPatienttUpdateListner(){
    return this.patientUpdated.asObservable();
  }

  getPreviousAppointments_ViewPatient(patientRegistrationNumber:string){
    const load={
      patientRegistrationNumber:patientRegistrationNumber
    }

    return this.http.post<{normal_appointments:any,online_appointments:any}>("http://localhost:3000/api/patient/getPreviousAppointmentDetails",load);

  }
}
