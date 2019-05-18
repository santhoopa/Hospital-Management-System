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
  admissionNum:any=null;
  constructor(public receptionistService: ReceptionistService) { }

  ngOnInit() {
    this.getRoomAvailability()
    this.getVacantRooms();
    this.getNewAdmissionNumber();
  }
  getRoomAvailability(){
    this.rooms=[];
    this.receptionistService.getRoomAvailability().subscribe(results => {
      results.rooms.map(room =>{
        this.rooms.push(room);
      });
    });
  }
  getVacantRooms(){
    this.vacantRooms=[];
    this.receptionistService.getVacantRooms().subscribe(results => {
      results.VacantRooms.map(room =>{
       // console.log(room);
        this.vacantRooms.push(room);
      });
    });
  }
  getNewAdmissionNumber(){
    this.receptionistService.getNewAdmissionNumber().subscribe(responseData =>{
      this.admissionNum="ADM/"+responseData.NewAdmissionNumber;

    });
  }
  public currentAdmissions=[];
  onClickDischarge(index){
    if(index==1)
    {
      this.loadCurrentAdmissions();
    }
  }

  loadCurrentAdmissions(){
    this.currentAdmissions=[];
    this.receptionistService.getCurrentAdmissions().subscribe(responseData => {
        responseData.result.map(admission=>{
          admission.admissionDate=new Date(admission.admissionDate).toDateString();
          console.log(admission.admissionDate);
          this.currentAdmissions.push(admission);
        });
    });
  }

//Start - Search Admission()
  public searchedAdmission={};
  admissionNum_Discharge;
  roomNumber_Discharge;
  searchAdmission(keyword:string){
    console.log(keyword);
    let raw_admissionNo=keyword;
    let admissionNumber=raw_admissionNo.replace( /^\D+/g, '');
    this.receptionistService.getAdmissionDetails(admissionNumber).subscribe(result => {
      console.log(result.admissionDetail[0]);
      const admission={
        admissionNumber:result.admissionDetail[0].admissionNumber,
        patientRegistrationNumber:result.admissionDetail[0].patient[0].patientRegistrationNumber,
        name:result.admissionDetail[0].patient[0].name.firstname +" "+result.admissionDetail[0].patient[0].name.lastname,
        appointmentNumber:result.admissionDetail[0].appointmentNmber,
        admissionDate:result.admissionDetail[0].admissionDate,
        room:result.admissionDetail[0].room[0].roomNumber + " " + result.admissionDetail[0].room[0].type,
        roomType:result.admissionDetail[0].room[0].type,
        cause:result.admissionDetail[0].causeofAdmission,
      };
     this.admissionNum_Discharge=result.admissionDetail[0].admissionNumber;
     this.roomNumber_Discharge=result.admissionDetail[0].room[0].roomNumber;
     this.searchedAdmission={};
     this.searchedAdmission=admission;
    console.log(this.searchedAdmission);
    });
  }
//End - Search Admission()

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


    let raw_admissionNo=admissionForm.value.admissionNumber;
    let admissionNumber=raw_admissionNo.replace( /^\D+/g, '');

    const admission:Admission={
      admissionNumber:admissionNumber,
      patientRegistrationNumber:patientNo,
      appointmentNmber:null,
      roomNumber:admissionForm.value.selecRoom,
      admissionDate:admission_date,
      causeofAdmission:admissionForm.value.causeOfAdmission

    }
    console.log(admission);
    this.receptionistService.admitPatient(admission).subscribe((responseData)=>{
      this.getRoomAvailability()
      this.getVacantRooms();
      this.getNewAdmissionNumber();
      admissionForm.reset();
    });
  }


  onDischargePatient(){

   this.receptionistService.dischargePatient(this.admissionNum_Discharge,this.roomNumber_Discharge).subscribe(responseData=>{
    this.searchedAdmission={};
    this.loadCurrentAdmissions();
    this.admissionNum_Discharge=null;
    this.roomNumber_Discharge=null;
    this.getRoomAvailability()
    this.getVacantRooms();
    this.getNewAdmissionNumber();
    });
  }
}
