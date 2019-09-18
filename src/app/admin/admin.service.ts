import { Patient } from './../models/patient.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
// import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AdminService{

  constructor(private http: HttpClient, private router: Router) {}

  signupUser(user:User){
    return this.http.post<{message:string, userAdded:boolean}>("http://localhost:3000/api/user/signup",user);

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
    return this.http.post<{message:string, userAdded:boolean}>("http://localhost:3000/api/doctor/signup",user);
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

  getSystemUsers(){
    return this.http.get<{users:any}>("http://localhost:3000/api/user/userDetails");
  }

  getRoomAvailability(){
    return this.http.get<{rooms:any}>("http://localhost:3000/api/rooms");
  }

  getNewRoomNumber(){
    return this.http.get<{roomNumber:any}>("http://localhost:3000/api/admin/getNewRoomNumber");

  }

  addRoom(room:any){

    return this.http.post("http://localhost:3000/api/admin/addRooms",room);

  }

  getDoctorNames():Observable<any>{
    console.log("This is getDoctorNames()");
    return this.http.get<{ message:string; doctorNames:any}>("http://localhost:3000/api/doctors/getdoctorNames");
  }

  getTotalAppointmentsData(year:Number){
    return this.http.get<{ data:any}>("http://localhost:3000/api/admin/reports/getAppointmentsByYear/"+year);
  }

  getTotalAppointmentsData_ByDoctor(year:Number,doctor:Number){
    return this.http.get<{ data:any}>("http://localhost:3000/api/admin/reports/getAppointmentsByDoctor/"+year+"&"+doctor);
  }

  getTotalAdmissionData(year:Number){
    return this.http.get<{ data:any}>("http://localhost:3000/api/admin/reports/getAdmissionData/"+year);
  }

  getAgeGroups(){
    return this.http.get<{ res:any}>("http://localhost:3000/api/reports/getAge");
  }

  getPatientsDataByCity(){
    return this.http.get<{ data:any}>("http://localhost:3000/api/admin/reports/getPatientsByCity");
  }

  patients:Patient[];
  private patientUpdated=new Subject<Patient[]>();
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
