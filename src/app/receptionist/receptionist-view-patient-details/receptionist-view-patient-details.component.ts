import { MatSnackBar } from '@angular/material';
import { Patient } from './../../models/patient.model';
import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ReceptionistService } from '../receptionist.service';
import { Subscription } from 'rxjs';

// const patientData: Patient[]=[
//   { patientRegistrationNumber: "PAT/001",
//     name:{
//     firstname:"Santhoopa",
//     lastname:"Jayawardhana",
//     },
//     gender:"Male",
//     address:"139/3,Kandy",
//     dob:"1995/12/04",
//     city:"Gampaha",
//     district:"Colombo",
//     nic:"95339440",
//     maritalStatus:"Married",
//     contactNumber:123,
//     email:"santhoopa@gmail.com",
//     guardian:{
//       guardianType:"self",
//       firstname:"null",
//       lastname:"null",
//       gender:"null",
//       NIC:"null",
//       contactNumber: 123,
//      },
//     },
//     { patientRegistrationNumber: "PAT/001",
//     name:{
//     firstname:"Santhoopa",
//     lastname:"Jayawardhana",
//     },
//     gender:"Male",
//     address:"139/3,Kandy",
//     dob:"1995/12/04",
//     city:"Gampaha",
//     district:"Colombo",
//     nic:"95339440",
//     maritalStatus:"Married",
//     contactNumber:123,
//     email:"santhoopa@gmail.com",
//     guardian:{
//       guardianType:"self",
//       firstname:"null",
//       lastname:"null",
//       gender:"null",
//       NIC:"null",
//       contactNumber: 123,
//      },
//     },
//     { patientRegistrationNumber: "PAT/001",
//     name:{
//     firstname:"Santhoopa",
//     lastname:"Jayawardhana",
//     },
//     gender:"Male",
//     address:"139/3,Kandy",
//     dob:"1995/12/04",
//     city:"Gampaha",
//     district:"Colombo",
//     nic:"95339440",
//     maritalStatus:"Married",
//     contactNumber:123,
//     email:"santhoopa@gmail.com",
//     guardian:{
//       guardianType:"Father",
//       firstname:"B",
//       lastname:"Jayawardhana",
//       gender:"Male",
//       NIC:"56565656",
//       contactNumber: 123,
//      },
//     },
//     ]


@Component({
  selector: 'app-receptionist-view-patient-details',
  templateUrl: './receptionist-view-patient-details.component.html',
  styleUrls: ['./receptionist-view-patient-details.component.css'],
})
export class ReceptionistViewPatientDetailsComponent implements OnInit {
  displayedColumns: string[] = ['patientRegistrationNumber','patientFirstName','patientLastName','patientGender','patientAddress','patientCity','patientDistrict','patientNIC','patientDOB','patientmaritalStatus','patientContact','patientemail','guardianName','guardianGender','guardianNIC','guardianContact'];
  dataSource = null;
  private patientsSub: Subscription;
  apps=[{},{}]
  showTable=true;
  showForm=false;
  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  private newPatients:Patient[]=[];

  searchPatient(keyupevent:KeyboardEvent){
    //console.log((<HTMLInputElement>keyupevent.target).value.charCodeAt);
    this.receptionistService.searchPatients((<HTMLInputElement>keyupevent.target).value);
    this.patientsSub=this.receptionistService.getPatienttUpdateListner()
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
     this.receptionistService.getPreviousAppointments_ViewPatient(patient.patientRegistrationNumber).subscribe(response =>{
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
