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

  constructor(public receptionistService: ReceptionistService) { }

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
}
