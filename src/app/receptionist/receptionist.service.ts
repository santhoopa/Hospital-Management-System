import { Doctor } from './../models/doctor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Patient } from '../models/patient.model';
import { map} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReceptionistService{
  patients:Patient[];
  private patientUpdated=new Subject<Patient[]>();

  constructor(private http: HttpClient, private router: Router) {}

  registerDoctor(doctor:Doctor){
    console.log("Service Reached");
    this.http.post<{ message: string, doctor:string}>("http://localhost:3000/api/doctors",doctor).subscribe((responseData)=>{
      console.log(responseData.message);
      console.log("Added Doctor name:" +responseData.doctor);

    });
  }
  registerPatient(patient: Patient){
    console.log("Service Reached");
    console.log(patient);
    this.http.post<{ message: string, patient:string}>("http://localhost:3000/api/patient/register",patient).subscribe(responseData=>{
      console.log(responseData.message + "Added Patient name:" +responseData.patient);

    });
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
            dob:patient.dob,
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

  //  Start - Schedule Appointments
  // public doctors=[
  //   {firstName:"Shirod",
  //   lastName:"Jayawardhana"}
  // ];
  getDoctorNames():Observable<any>{
      console.log("This is getDoctorNames()");
      return this.http.get<{ message:string; doctorNames:any}>("http://localhost:3000/api/doctors/getdoctorNames");
  }

  getDoctorAvailability(fname:string){
    console.log("This is getDoctorAvailability()");
    return this.http.get<{ message:string; timeSlots:any}>("http://localhost:3000/api/doctors/getdoctorAvailability/"+fname);


  }

  //  End - Schedule Appointments

}
