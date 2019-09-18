import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { ManualAppointment } from './../../models/manual_appointment.model';


@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  public doctors=[];
  public doctorAvailability=[];
  public selectedDoctorAvailability=[];
  appointmentNum:any=null;

  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }

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
  appointmentTime_Calculated;
  generateAppointmentTime(time:string){

    this.appointmentTime_Calculated="";
    var text:any=time;
    var numb_hour = text.match(/\d/g);
    numb_hour = numb_hour.join("");
    var numb_ampm = time.replace( /^\D+/g, '');
    var hour;
    var time_am_pm:string;
    if(numb_hour.length==3){
      // console.log("length is 3");
      hour=numb_hour[0];
      time_am_pm=numb_ampm[5]+""+numb_ampm[6];
    }else if (numb_hour.length==4){
      // console.log("length is 4");
      hour=numb_hour[0]+""+numb_hour[1];
      time_am_pm=numb_ampm[6]+""+numb_ampm[7];
    }
    var minutes=0;
    var count=this.appointmentCount;
    var time:string;
    if(count==1){
      time=hour+"."+15;
    }else if (count==2){
      time=hour+"."+30;
    }else if (count==3){
      time=hour+"."+45;
    }else if(count==4){
      hour++;
      time=hour+"."+"00";
    }else if (count==5){
      hour++;
      time=hour+"."+15;
    }else if (count==6){
      hour++;
      time=hour+"."+30;
    }else if (count==7){
      hour++;
      time=hour+"."+45;
    }else if(count==0){
      time=hour+"."+"00";
    }
    time+=time_am_pm;
    console.log(time);
    this.appointmentTime_Calculated=time;


  }

  appointmentCount;
  getAppointmentCount(date:Date,doctorRegistrationNumber:Number,timeSlot:string){
    console.log(doctorRegistrationNumber);
    console.log(timeSlot);

    const object={
      appointmentDate:new Date(date).toDateString(),
      doctorRegistrationNumber:doctorRegistrationNumber,
      timeSlot:timeSlot
    }
    this.receptionistService.getAppointmentCount(object).subscribe(response => {
      console.log(response.count);
      this.appointmentCount=response.count;
      this.generateAppointmentTime(timeSlot);
    });
  }

  onScheduleAppointment(scheduleAppointmentForm: NgForm){
    console.log(scheduleAppointmentForm.value)
    if(scheduleAppointmentForm.invalid)
    {
      this.snackBar.open("Please Enter Valid Details ", "OK", {
        panelClass: ['error']
      });
    }
    else
    {
        let raw_appNo=scheduleAppointmentForm.value.appointmentNumber;
        let appNo=raw_appNo.replace( /^\D+/g, '');

        // let raw_patientNo=scheduleAppointmentForm.value.patientRegistrationNumber;
        // let patientNo=raw_patientNo.replace( /^\D+/g, '');

        let raw_appointment_date=scheduleAppointmentForm.value.appointmentDate;
        let appointment_date = raw_appointment_date.getFullYear() + "-" + (raw_appointment_date.getMonth() + 1) + "-" + raw_appointment_date.getDate()
        //console.log(appointment_date);

        let current_datetime = new Date()
        let formatted_current_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
      // console.log(formatted_current_date)

        const appointment:ManualAppointment={
          appointmentNumber: appNo,
          doctorRegistrationNumber:scheduleAppointmentForm.value.selectDoctor,
          patientRegistrationNumber: scheduleAppointmentForm.value.patientRegistrationNumber,
          timeSlot:scheduleAppointmentForm.value.selectTimeSlot,
          appointmentDate:new Date(scheduleAppointmentForm.value.appointmentDate).toDateString(),
          dateCreated:formatted_current_date

        }

        console.log(appointment);
        this.receptionistService.scheduleAppointment(appointment).subscribe(responseData=>{
          //    console.log(responseData.message + "Added Patient name:" +responseData.patient);
          this.getNewAppointmentNumber();
          scheduleAppointmentForm.resetForm();
          this.selectedDoctorAvailability=[];
          this.snackBar.open( "Appointment Created", "OK", {
            panelClass: ['success']
          });
          });
    }

  }

  searchedAppointments_viewScheduledApps=[];
  doctorName_viewScheduledApps;
  searchedAppointmentDate_viewScheduledApps;
  showTable=false;
  findAppointments(doctorRegistrationNumber:string,date:Date){
    this.searchedAppointments_viewScheduledApps=[]
    this.doctorName_viewScheduledApps="";
    this.searchedAppointmentDate_viewScheduledApps="";
    this.showTable=true;
    console.log(doctorRegistrationNumber);
    console.log(date);
    this.receptionistService.viewScheduledManualAppointments(doctorRegistrationNumber,date).subscribe(response => {
      console.log(response);
      response.appointments.map(app =>{
        app.dateCreated=new Date(app.dateCreated).toDateString();
        this.searchedAppointments_viewScheduledApps.push(app);

      })
      this.doctorName_viewScheduledApps=this.searchedAppointments_viewScheduledApps[0].doctor[0].name.firstname+" "+ this.searchedAppointments_viewScheduledApps[0].doctor[0].name.lastname;
        this.searchedAppointmentDate_viewScheduledApps=new Date(this.searchedAppointments_viewScheduledApps[0].appointmentDate).toDateString();
    });
  }

  // dateClass = (d: Date) => {
  //   const date = d;
  //   console.log(date);
  //   // Highlight the 1st and 20th day of each month.
  //  // return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  // }
}
