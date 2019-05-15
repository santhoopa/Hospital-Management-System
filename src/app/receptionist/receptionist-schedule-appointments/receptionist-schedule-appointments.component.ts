import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { ManualAppointment } from './../../models/manual_appointment.model';


@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.css']
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  public doctors=[];
  public doctorAvailability=[];
  public selectedDoctorAvailability=[];
  appointmentNum:any=null;

  constructor(public receptionistService: ReceptionistService) { }

  ngOnInit() {
    console.log("ngonit");
    //this.doctors.push({this.receptionistService.getDoctorNames()});
    this.receptionistService.getDoctorNames().subscribe(results =>{
      results.doctorNames.map(doctor =>{
        //console.log(doctor.name.firstname);
        this.doctors.push({firstName:doctor.name.firstname,lastName:doctor.name.lastname,doctorRegistrationNumber:doctor.doctorRegistrationNumber})
      });
    });

    this.getNewAppointmentNumber();
  }

  getNewAppointmentNumber(){

    this.receptionistService.getNewAppointmentNumber().subscribe(responseData =>{
      this.appointmentNum="APP/"+responseData.NewAppointmentNumber;

    });
  }
   patientFirstName:string="";
   patientLastName:string="";
   name:string;
  onSearchPatient(keyupevent:KeyboardEvent){
    this.name="";
    let enteredKeyword=(<HTMLInputElement>keyupevent.target).value;
    let enteredKeyword_num=enteredKeyword.replace( /^\D+/g, '');
    //console.log(enteredKeyword_num);
    this.receptionistService.getPatientName(enteredKeyword_num).subscribe(result =>{
      console.log(result.PatientFirstName);
      //this.patientFirstName=String(result.PatientFirstName);
      //this.patientLastName=String(result.PatientLastName);

      this.name=String(result.PatientFirstName)+" "+String(result.PatientLastName);
      // console.log(result.firstname)

    });

  }

  onChangeChooseDoctor(regNo:any){

     this.doctorAvailability=[];
     //console.log(fname);
    // this.doctors.push({firstName:"Bhanu",
    // lastName:"Jayawardhana"});
    this.receptionistService.getDoctorAvailability(regNo).subscribe(results =>{
      console.log(results.timeSlots);
      results.timeSlots.map(timeSlot => {
        console.log(timeSlot);
        this.doctorAvailability.push(timeSlot);
      });
    });
  }

  onChangeSelectDoctor(regNo:any){
    this.selectedDoctorAvailability=[];
    this.receptionistService.getDoctorAvailability(regNo).subscribe(results =>{
      console.log(results.timeSlots);
      results.timeSlots.map(timeSlot => {
        console.log(timeSlot);
        this.selectedDoctorAvailability.push(timeSlot);
      });
    });
  }



  onScheduleAppointment(scheduleAppointmentForm: NgForm){
    console.log(scheduleAppointmentForm.value.appointmentDate);

    let raw_appNo=scheduleAppointmentForm.value.appointmentNumber;
    let appNo=raw_appNo.replace( /^\D+/g, '');

    let raw_patientNo=scheduleAppointmentForm.value.patientRegistrationNumber;
    let patientNo=raw_patientNo.replace( /^\D+/g, '');

    let raw_appointment_date=scheduleAppointmentForm.value.appointmentDate;
    let appointment_date = raw_appointment_date.getFullYear() + "-" + (raw_appointment_date.getMonth() + 1) + "-" + raw_appointment_date.getDate()
    //console.log(appointment_date);

    let current_datetime = new Date()
    let formatted_current_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
   // console.log(formatted_current_date)

    const appointment:ManualAppointment={
      appointmentNumber: appNo,
      doctorRegistrationNumber:scheduleAppointmentForm.value.selectDoctor,
      patientRegistrationNumber: patientNo,
      timeSlot:scheduleAppointmentForm.value.selectTimeSlot,
      appointmentDate:appointment_date,
      dateCreated:formatted_current_date

    }

    console.log(appointment);
    this.receptionistService.scheduleAppointment(appointment).subscribe(responseData=>{
      //    console.log(responseData.message + "Added Patient name:" +responseData.patient);
      this.getNewAppointmentNumber();
      scheduleAppointmentForm.resetForm();
        });
  }
}
