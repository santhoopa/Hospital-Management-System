import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-view-online-appointments',
  templateUrl: './receptionist-view-online-appointments.component.html',
  styleUrls: ['./receptionist-view-online-appointments.component.css']
})
export class ReceptionistViewOnlineAppointmentsComponent implements OnInit {

  constructor(public receptionistService: ReceptionistService) { }
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
  onChangeChooseDoctor_ViewOnlineAppointments(doctorRegistrationNumber:any){
    this.onlineAppointment_byDoctor=[];
    this.receptionistService.viewOnlineAppointments_ByDoctor(doctorRegistrationNumber,"").subscribe(results =>{
      results.onlineAppointments.map(appointment =>{
        //console.log(appointment);
        this.onlineAppointment_byDoctor.push(appointment);
      })
    });
    //console.log(this.onlineAppointment_byDoctor);
  }

  public onlineAppointments_LinkPatient=[];
  onChangeChooseDoctor_LinkPatient(doctorRegistrationNumber:any){
    this.onlineAppointments_LinkPatient=[];
    this.receptionistService.viewOnlineAppointments_ByDoctor_LinkPatient(doctorRegistrationNumber).subscribe(results =>{
      results.onlineAppointments.map(appointment =>{
        this.onlineAppointments_LinkPatient.push(appointment);
      })
    });
  }

  firstName_LinkPatient:string;
  lastName_LinkPatient:string;
  NIC_LinkPatient:string;
  app_id:string;
  onLinkToPatient(appointment:any){
    console.log(appointment);
    this.firstName_LinkPatient=appointment.firstname;
    this.lastName_LinkPatient=appointment.lastname;
    this.NIC_LinkPatient=appointment.NIC;
    this.app_id=appointment._id;


  }

  linkPatient(form:NgForm){
    console.log(form.value);
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

    });
  }


  name:string;
  patientRegNo:string="";
 onSearchPatient(keyupevent:KeyboardEvent){
   this.name="";
   this.patientRegNo="";
   let enteredKeyword=(<HTMLInputElement>keyupevent.target).value;
   let enteredKeyword_num=enteredKeyword.replace( /^\D+/g, '');

   this.receptionistService.getPatientName(enteredKeyword_num).subscribe(result =>{
     this.name=String(result.PatientFirstName)+" "+String(result.PatientLastName);
     this.patientRegNo=result.PatientNo;
   });

 }


}
