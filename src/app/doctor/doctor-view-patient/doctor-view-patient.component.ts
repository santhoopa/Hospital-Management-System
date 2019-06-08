import { Patient } from './../../models/patient.model';
import { MatSnackBar } from '@angular/material';
import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-view-patient',
  templateUrl: './doctor-view-patient.component.html',
  styleUrls: ['./doctor-view-patient.component.css']
})
export class DoctorViewPatientComponent implements OnInit {

  constructor(public doctorService: DoctorService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['patientRegistrationNumber','patientFirstName','patientLastName','patientGender','patientAddress','patientCity','patientDistrict','patientNIC','patientDOB','patientmaritalStatus','patientContact','patientemail','guardianName','guardianGender','guardianNIC','guardianContact'];
  dataSource = null;
  showTable=true;
  showForm=false;
  private patientsSub: Subscription;
  private newPatients:Patient[]=[];

  searchPatient(keyupevent:KeyboardEvent){
    //console.log((<HTMLInputElement>keyupevent.target).value.charCodeAt);
    this.doctorService.searchPatients((<HTMLInputElement>keyupevent.target).value);
    this.patientsSub=this.doctorService.getPatienttUpdateListner()
    .subscribe((patients:Patient[])=> {
      this.dataSource=patients;
      // console.log("This is postUpdateListener ");
    });
    //  console.log(this.dataSource)
   }

   clickedPatientOnlineAppointments=[];
   clickedPatientNormalAppointments=[];
   clickedPatient;
   viewPatient(patient:any){
    //  console.log(patient)
     this.clickedPatient=patient;
    //  this.clickedPatient.patientRegistrationNumber="PAT/"+this.clickedPatient.patientRegistrationNumber;
     console.log(this.clickedPatient);
     if(this.clickedPatient.guardian.guardianType=="Self"){
      this.clickedPatient.guardian.firstname="N/A";
      this.clickedPatient.guardian.lastname="N/A";
      this.clickedPatient.guardian.NIC="N/A";
      this.clickedPatient.guardian.gender="N/A";
      this.clickedPatient.guardian.contactNumber="N/A";
     }
     this.showForm=true;
     this.showTable=false;
     this.clickedPatientNormalAppointments=[];
     this.clickedPatientOnlineAppointments=[]
     this.doctorService.getPreviousAppointments_ViewPatient(patient.patientRegistrationNumber).subscribe(response =>{
      response.normal_appointments.map(normalApp => {
        normalApp.appointmentDate=new Date(normalApp.appointmentDate).toDateString();
        normalApp.disease=(normalApp.disease==null) ? "N/A":normalApp.disease;
        normalApp.symptoms=(normalApp.symptoms==null) ? "N/A":normalApp.symptoms;
        normalApp.prescription=(normalApp.prescription==null) ? "N/A":normalApp.prescription;
        this.clickedPatientNormalAppointments.push(normalApp);
      });
      response.online_appointments.map(onlineApp => {
        onlineApp.appointmentDate=new Date(onlineApp.appointmentDate).toDateString();
        onlineApp.disease=(onlineApp.disease==null) ? "N/A":onlineApp.disease;
        onlineApp.symptoms=(onlineApp.symptoms==null) ? "N/A":onlineApp.symptoms;
        onlineApp.prescription=(onlineApp.prescription==null) ? "N/A":onlineApp.prescription;
        this.clickedPatientOnlineAppointments.push(onlineApp);
      });
      console.log(this.clickedPatientNormalAppointments);
      console.log(this.clickedPatientOnlineAppointments);
     });
   }

   back(){
    this.showForm=false;
    this.showTable=true;
   }
}
