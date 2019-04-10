import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.css']
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  public doctors=[];
  public doctorAvailability=[];
  public selectedDoctorAvailability=[];
  appointmentNum="APP/2015/010";

  constructor(public receptionistService: ReceptionistService) { }

  ngOnInit() {
    console.log("ngonit");
    //this.doctors.push({this.receptionistService.getDoctorNames()});
    this.receptionistService.getDoctorNames().subscribe(results =>{
      results.doctorNames.map(doctor =>{
        //console.log(doctor.name.firstname);
        this.doctors.push({firstName:doctor.name.firstname,lastName:doctor.name.lastname})
      });
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

  onChangeChooseDoctor(fname:any){

     this.doctorAvailability=[];
     //console.log(fname);
    // this.doctors.push({firstName:"Bhanu",
    // lastName:"Jayawardhana"});
    this.receptionistService.getDoctorAvailability(fname).subscribe(results =>{
      console.log(results.timeSlots);
      results.timeSlots.map(timeSlot => {
        console.log(timeSlot);
        this.doctorAvailability.push(timeSlot);
      });
    });
  }

  onChangeSelectDoctor(fname:any){
    this.selectedDoctorAvailability=[];
    this.receptionistService.getDoctorAvailability(fname).subscribe(results =>{
      console.log(results.timeSlots);
      results.timeSlots.map(timeSlot => {
        console.log(timeSlot);
        this.selectedDoctorAvailability.push(timeSlot);
      });
    });
  }

  onScheduleAppointment(scheduleAppointmentForm: NgForm){
    console.log(scheduleAppointmentForm.value);
  }
}
