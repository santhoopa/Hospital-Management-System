import { MatSnackBar } from '@angular/material';
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
  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }

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
          console.log(admission.patientRegistrationNumber);
          admission.patientRegistrationNumber="PAT/"+admission.patientRegistrationNumber;
          this.currentAdmissions.push(admission);
        });
    });
  }

//Start - Search Admission()
  public searchedAdmission={};
  admissionNum_Discharge;
  roomNumber_Discharge;
  searchAdmission(keyword:string){
    console.log(keyword=="");
    this.searchedAdmission={};
    if(keyword==""){
      this.snackBar.open( "Results Not Found", null, {
        duration:2000,
        panelClass: ['error']
      });
      return
    }
    let raw_admissionNo=keyword;
    let admissionNumber=raw_admissionNo.replace( /^\D+/g, '');
    this.receptionistService.getAdmissionDetails(admissionNumber).subscribe(result => {
      console.log(result.admissionDetail.length);
      if(result.admissionDetail.length==0){
        this.snackBar.open( "Results Not Found", null, {
          duration:2000,
          panelClass: ['error']
        });
      }else{
        const admission={
          admissionNumber:"ADM/"+result.admissionDetail[0].admissionNumber,
          patientRegistrationNumber:"PAT/"+result.admissionDetail[0].patient[0].patientRegistrationNumber,
          name:result.admissionDetail[0].patient[0].name.firstname +" "+result.admissionDetail[0].patient[0].name.lastname,
          appointmentNumber:result.admissionDetail[0].appointmentNmber,
          admissionDate:new Date(result.admissionDetail[0].admissionDate).toDateString(),
          room:result.admissionDetail[0].room[0].roomNumber + " " + result.admissionDetail[0].room[0].type,
          roomType:result.admissionDetail[0].room[0].type,
          cause:result.admissionDetail[0].causeofAdmission,
        };
       this.admissionNum_Discharge=result.admissionDetail[0].admissionNumber;
       this.roomNumber_Discharge=result.admissionDetail[0].room[0].roomNumber;
       this.searchedAdmission=admission;
      }

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
    console.log(admissionForm.value);
    if(admissionForm.invalid)
    {
      this.snackBar.open("Please Enter Valid Details ", "OK", {
        panelClass: ['error']
      });
    }
    else
    {
      let raw_admission_date=admissionForm.value.selectAdmissionDate;
      let admission_date = raw_admission_date.getFullYear() + "-" + (raw_admission_date.getMonth() + 1) + "-" + raw_admission_date.getDate()

      let patientNo=admissionForm.value.patientRegistrationNumber;
      //let patientNo=raw_patientNo.replace( /^\D+/g, '');


      let raw_admissionNo=admissionForm.value.admissionNumber;
      let admissionNumber=raw_admissionNo.replace( /^\D+/g, '');

      const admission:Admission={
        admissionNumber:admissionNumber,
        patientRegistrationNumber:patientNo,
        appointmentNmber:admissionForm.value.appointmentType+""+admissionForm.value.appointmentNumber,
        roomNumber:admissionForm.value.selecRoom,
        admissionDate:admission_date,
        causeofAdmission:admissionForm.value.causeOfAdmission

      }
      console.log(admission);
      this.receptionistService.admitPatient(admission).subscribe((responseData)=>{
        this.getVacantRooms();
        this.getNewAdmissionNumber();
        admissionForm.reset();
        this.snackBar.open( "Patient Successfuly Admitted", "OK", {
          panelClass: ['success']
        });
        this.rooms=[];
        this.getRoomAvailability();

      });
    }

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
    this.snackBar.open( "Patient Successfuly Discharged", "OK", {
      panelClass: ['success']
    });
    });
  }

  admissionHistory=[];
  searchedDate_admissionHistory;
  showTable=false;
  findAdmissionsHistory(date:Date){
    console.log();
    this.admissionHistory=[];
    this.receptionistService.viewAdmissionHistory(date).subscribe(response =>{
      console.log(response.admissions.length);
      this.showTable=(response.admissions.length==0) ? false:true;
      if(response.admissions.length==0){
        this.snackBar.open("No admissions", null, {
          duration: 2000,
          panelClass: ['error']
        });
      }
      if(this.showTable){
        response.admissions.map(admission => {
          admission.admissionDate=new Date(admission.admissionDate).toDateString();
          admission.dischargeDate=(admission.dischargeDate==null) ? "N/A":new Date(admission.dischargeDate).toDateString();
          admission.appointmentNmber=(admission.appointmentNmber==null) ? "N/A":admission.appointmentNmber;
          this.admissionHistory.push(admission);
          this.searchedDate_admissionHistory=date.toDateString();
        });
      }
      console.log(this.admissionHistory);
    })
  }
}
