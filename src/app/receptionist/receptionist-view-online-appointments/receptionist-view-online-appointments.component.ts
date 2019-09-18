import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-receptionist-view-online-appointments',
  templateUrl: './receptionist-view-online-appointments.component.html',
  styleUrls: ['./receptionist-view-online-appointments.component.css']
})
export class ReceptionistViewOnlineAppointmentsComponent implements OnInit {

  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }
  public doctors=[];

  ngOnInit() {
    this.loadDoctorNames();
  }

  loadDoctorNames(){
    this.receptionistService.getDoctorNames().subscribe(results =>{
      results.doctorNames.map(doctor =>{
        this.doctors.push({firstName:doctor.name.firstname,lastName:doctor.name.lastname,doctorRegistrationNumber:doctor.doctorRegistrationNumber})
      });
    });
  }
  public onlineAppointment_byDoctor=[];
  showTable_ViewAppointments=false;
  onChangeChooseDoctor_ViewOnlineAppointments(doctorRegistrationNumber:any,date:Date){
    this.onlineAppointment_byDoctor=[];
    this.showTable_ViewAppointments=false;
    this.receptionistService.viewOnlineAppointments_ByDoctor(doctorRegistrationNumber,"",date).subscribe(results =>{
      if(results.onlineAppointments.length!=0){
        this.showTable_ViewAppointments=true;
      }else{
        this.snackBar.open("No results", null, {
          duration:2000,
          panelClass: ['error']
        });
      }
        results.onlineAppointments.map(appointment =>{
        //console.log(appointment);
        const app={
          appointment:appointment,
          appointmentDate:new Date(appointment.appointmentDate).toDateString(),
          dateCreated:new Date(appointment.dateCreated).toDateString()
        }
        this.onlineAppointment_byDoctor.push(app);
      //  console.log(this.onlineAppointment_byDoctor);
      })
    });
    console.log(this.onlineAppointment_byDoctor);
  }

  public onlineAppointments_LinkPatient=[];
  showTable_LinkPatient=false;
  onChangeChooseDoctor_LinkPatient(doctorRegistrationNumber:any){
    this.showTable_LinkPatient=false;
    this.onlineAppointments_LinkPatient=[];
    this.receptionistService.viewOnlineAppointments_ByDoctor_LinkPatient(doctorRegistrationNumber).subscribe(results =>{
      if(results.onlineAppointments.length!=0){
        this.showTable_LinkPatient=true;
      }else{
        this.snackBar.open("No online appointments to link", null, {
          duration:2000,
          panelClass: ['error']
        });
      }
      results.onlineAppointments.map(appointment =>{
        const app={
          appointment:appointment,
          appointmentDate:new Date(appointment.appointmentDate).toDateString(),
          dateCreated:new Date(appointment.dateCreated).toDateString()
        }
        this.onlineAppointments_LinkPatient.push(app);

      })
    });
  }

  firstName_LinkPatient:string;
  lastName_LinkPatient:string;
  NIC_LinkPatient:string;
  app_id:string;
  onLinkToPatient(appointment:any){
    console.log(appointment);
    this.firstName_LinkPatient=appointment.appointment.firstname;
    this.lastName_LinkPatient=appointment.appointment.lastname;
    this.NIC_LinkPatient=appointment.appointment.NIC;
    this.app_id=appointment.appointment._id;


  }

  linkPatient(form:NgForm){
    console.log(form.value);
    if(!this.isPatientFound){
      this.snackBar.open("Please Select a valid Patient Registration Number", "OK", {
        panelClass: ['error']
      });
      return
    }
    this.receptionistService.linkPatient_OnlineAppointment(this.app_id,form.value.patientRegistrationNumber).subscribe(results => {
      console.log(results);
      this.firstName_LinkPatient="";
      this.lastName_LinkPatient="";
      this.NIC_LinkPatient="";
      this.app_id="";
      this.name="";
      form.reset();
      this.onlineAppointment_byDoctor=[];
      this.onlineAppointments_LinkPatient=[]
      this.isPatientFound=false;
      this.snackBar.open("Patient Successfully Linked", "OK", {
        panelClass: ['success']
      });
    });
  }


  name:string;
  patientRegNo:string="";
  isPatientFound=false;
 onSearchPatient(keyupevent:KeyboardEvent){
   this.name="";
   this.patientRegNo="";
   let enteredKeyword=(<HTMLInputElement>keyupevent.target).value;
   let enteredKeyword_num=enteredKeyword.replace( /^\D+/g, '');

   this.receptionistService.getPatientName(enteredKeyword_num).subscribe(result =>{
     this.name=String(result.PatientFirstName)+" "+String(result.PatientLastName);
     this.patientRegNo=result.PatientNo;
    console.log(result.PatientNo=="")
    if(result.PatientNo==""){
      this.isPatientFound=false;
    }else{
      this.isPatientFound=true;
    }
   });

 }


}
