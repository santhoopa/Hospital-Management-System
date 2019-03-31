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

}
