import { Admission } from './../../models/admission.model';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-admit-patient',
  templateUrl: './receptionist-admit-patient.component.html',
  styleUrls: ['./receptionist-admit-patient.component.css']
})
export class ReceptionistAdmitPatientComponent implements OnInit {
  rooms=[];
  vacantRooms=[];
  constructor(public receptionistService: ReceptionistService) { }

  ngOnInit() {
    this.receptionistService.getRoomAvailability().subscribe(results => {
      results.rooms.map(room =>{
        //console.log(room);
        this.rooms.push(room);
      });
    });

    this.receptionistService.getVacantRooms().subscribe(results => {
      results.VacantRooms.map(room =>{
       // console.log(room);
        this.vacantRooms.push(room);
      });
    });
  }

  name:string;
  onSearchPatient(keyupevent:KeyboardEvent){
    this.name="";
    let enteredKeyword=(<HTMLInputElement>keyupevent.target).value;
    let enteredKeyword_num=enteredKeyword.replace( /^\D+/g, '');
    this.receptionistService.getPatientName(enteredKeyword_num).subscribe(result =>{
     // console.log(result.PatientFirstName);
      this.name=String(result.PatientFirstName)+" "+String(result.PatientLastName);
    });

  }

  onPatientAdmission(admissionForm: NgForm){

    let raw_admission_date=admissionForm.value.selectAdmissionDate;
    let admission_date = raw_admission_date.getFullYear() + "-" + (raw_admission_date.getMonth() + 1) + "-" + raw_admission_date.getDate()

    let raw_patientNo=admissionForm.value.patientRegistrationNumber;
    let patientNo=raw_patientNo.replace( /^\D+/g, '');

    const admission:Admission={
      admissionNumber:1,
      patientRegistrationNumber:patientNo,
      appointmentNmber:null,
      roomNumber:admissionForm.value.selecRoom,
      admissionDate:admission_date,
      causeofAdmission:admissionForm.value.causeOfAdmission

    }
    console.log(admission);
  }


}
