import { map } from 'rxjs/operators';
import { EchannelingService } from './../echannelling.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-online-appointment',
  templateUrl: './online-appointment.component.html',
  styleUrls: ['./online-appointment.component.css']
})
export class OnlineAppointmentComponent implements OnInit {

  doctorDetails=[];
  public doctorAvailability=[];
  selectedDoctorName;
  selectedDoctorNo;
  selectedDay;
  selectedTime;
  constructor(public echannellingService: EchannelingService) { }

  ngOnInit() {
    this.getDoctorsList();
    this.getAppointmentNumber();

  }
  appointmentNum:any=null;

  getAppointmentNumber(){
    this.echannellingService.getNewAppointmentNumber().subscribe(responseData =>{
      this.appointmentNum="eAPP/"+responseData.NewAppointmentNumber;

    });
  }

  getDoctorsList(){
    this.echannellingService.getDoctorsList().subscribe(response => {

      response.doctors.map(doctor => {
       //console.log(doctor);
       this.doctorDetails.push(doctor);
      });
      console.log(this.doctorDetails);
    });
  }

  onBookNow(regNo:string,fname:string,lname:string){
    this.selectedDoctorNo=regNo;
    this.selectedDoctorName="Dr. " +fname+" "+lname;
    console.log(this.selectedDoctorName);
    this.doctorAvailability=[];
    this.echannellingService.getDoctorAvailability(regNo).subscribe(results => {
      results.timeSlots.map(timeSlot => {
        //console.log(timeSlot);
        this.doctorAvailability.push(timeSlot);
    });
  });
  }

  onSelectTime(day:string,time:string){
    this.selectedDay=day;
    this.selectedTime=time;
    console.log(this.selectedDay + this.selectedTime)
  }

  onSubmit(form:NgForm){
    //console.log(form.value);
    let raw_appointment_date=form.value.appointmentDate;
    let appointment_date = raw_appointment_date.getFullYear() + "-" + (raw_appointment_date.getMonth() + 1) + "-" + raw_appointment_date.getDate()


    let current_datetime = new Date()
    let formatted_current_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()


    let raw_appNo=form.value.appointmentNumber;
    let appNo=raw_appNo.replace( /^\D+/g, '');

    const onlineAppointment={
      appointmentNumber:appNo,
      doctorRegistrationNumber:this.selectedDoctorNo,
      firstname:form.value.firstName,
      lastname:form.value.lastName,
      gender:form.value.gender,
      contactNumber:form.value.contactNumber,
      NIC:form.value.NIC,
      city:form.value.city,
      district:form.value.district,
      timeSlot:this.selectedDay + " "+ this.selectedTime,
      appointmentDate:new Date(form.value.appointmentDate).toDateString(),
      dateCreated:new Date(current_datetime).toDateString(),
    };
    console.log(onlineAppointment);
   this.echannellingService.makeOnlineAppointment(onlineAppointment);
   form.resetForm();
   this.getAppointmentNumber();


  }
}
