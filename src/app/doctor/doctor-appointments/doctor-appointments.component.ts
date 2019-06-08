import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { DoctorService } from './../doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(public activate:ActivatedRoute,public doctorService: DoctorService,private router: Router,private snackBar: MatSnackBar) { }
  onlineAppointments_ByDate=[];
  normalAppointments_ByDate=[];
  currentDoctorRegNo;
  elements=[{},{}];
  ngOnInit() {
    this.currentDoctorRegNo=this.activate.snapshot.parent.params['id'];
    //console.log(this.currentDoctorRegNo);
  }
  serachedDate;
  onSearchAppointments(appointmentDate:Date){
    this.serachedDate=appointmentDate.toDateString();
   // let appointment_date = raw_appointment_date.getFullYear() + "-" + (raw_appointment_date.getMonth() + 1) + "-" + raw_appointment_date.getDate();

    //  appointmentDate.setHours(0);
    //  appointmentDate.setMinutes(0);
    //  appointmentDate.setSeconds(0);
   //  console.log(appointmentDate);
    this.onlineAppointments_ByDate=[];
    this.normalAppointments_ByDate=[];
    this.doctorService.getAppointments_ByDate(this.currentDoctorRegNo,appointmentDate).subscribe(response => {
     // console.log(response);
      if(response.normal_appointments.length==0 && response.online_appointments==0){
        this.snackBar.open( "No results", "OK", {
          panelClass: ['error']
        });
        return
      }
      response.normal_appointments.map(normalApp => {
        //console.log(normalApp)
        //console.log("he")
        //const app=
        this.normalAppointments_ByDate.push(normalApp);
      });
      response.online_appointments.map(onlineApp => {
        this.onlineAppointments_ByDate.push(onlineApp);
      });
    })
  }
  public selectedAppointment={};
  public selectedAppointmentType;
  public selectedPatient={};
  public selectedAppointmentNumber;
  public selectedAppointmentPatientName;
  public selectedPatientRegNo;
  public selectedPatientDob;
  onViewAppointment(appointment:any,type:string){
    this.selectedAppointmentType=type;
   // console.log(type)

      //console.log(appointment);
    // // console.log(type)
    this.selectedAppointment={};
    this.selectedPatient={};
    this.selectedAppointment=appointment;
    this.selectedPatient=appointment.patient[0];
    this.selectedAppointmentPatientName=appointment.patient[0].name.firstname+" "+appointment.patient[0].name.lastname;
    this.selectedPatientRegNo="PAT/"+appointment.patientRegistrationNumber;
    this.selectedPatientDob=new Date(appointment.patient[0].dob).toDateString();
    if(type=="Normal"){
      this.selectedAppointmentNumber="APP/"+appointment.appointmentNumber;

    }else if (type=="Online"){
      this.selectedAppointmentNumber="eAPP/"+appointment.appointmentNumber;
    }
    this.getTreatmentHistory(appointment.patientRegistrationNumber);
  }

  onlineAppointments_TreatmentHistory=[];
  normalAppointments_TreatmentHistory=[];
  getTreatmentHistory(patientRegistrationNumber:string){
    this.doctorService.getTreatmentHistory(patientRegistrationNumber).subscribe(response => {
      //console.log(response);
      response.normal_appointments.map(normalApp => {
        const app={
          appointment:normalApp,
          appointmentDate:new Date(normalApp.appointmentDate).toDateString()
        }
        console.log(app)
        this.normalAppointments_TreatmentHistory.push(app);
      });
      response.online_appointments.map(onlineApp => {
        const app={
          appointment:onlineApp,
          appointmentDate:new Date(onlineApp.appointmentDate).toDateString()
        }

        this.onlineAppointments_TreatmentHistory.push(app);
      });
    })
    // console.log(this.normalAppointments_TreatmentHistory);
    // console.log(this.onlineAppointments_TreatmentHistory);

  }



  onSave(form:NgForm){
    console.log(form.value);
    let appointmentNumber=form.value.appointmentNumber.replace( /^\D+/g, '');

    const treatmentInformation={
      appointmentNumber:appointmentNumber,
      symptoms:form.value.symptoms,
      disease:form.value.disease,
      prescription:form.value.prescription
    }
    // this.router.onSameUrlNavigation(()=>{
    //   do your things here
    // })

    // this.router.navigateByUrl('/doctor/1/appointment');
    this.doctorService.storeTreatmentInformation(treatmentInformation,this.selectedAppointmentType).subscribe(response =>{
      console.log(response);
      form.reset();
      this.onlineAppointments_ByDate=[];
      this.normalAppointments_ByDate=[];
      this.onlineAppointments_TreatmentHistory=[];
      this.normalAppointments_TreatmentHistory=[];
      this.selectedAppointment={};
      this.selectedPatient={};
      this.selectedAppointment={}
      this.selectedAppointmentPatientName="";
      this.selectedPatientRegNo="";
      this.selectedPatientDob="";
    })
  }
}
