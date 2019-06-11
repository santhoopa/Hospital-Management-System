import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ReceptionistService } from '../receptionist.service';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: ['./receptionist-dashboard.component.css']
})
export class ReceptionistDashboardComponent implements OnInit {
  showMsg: boolean = true;
  constructor(private snackBar: MatSnackBar,public receptionistService: ReceptionistService) {}

  click(message: string, action: string) {
    this.snackBar.open("Error", null, {
      duration: 4000,
      panelClass: ['success']
    });
  }

  patientsRegistered:Number=0;
  doctorsRegistered:Number=0;
  appointmentsScheduled:Number=0;
  patientAdmissions:Number=0;
  roomsAdded:Number=0;
  employeesRegistered:Number=0;
  ngOnInit() {
    this.receptionistService.countPatients().subscribe(response =>{
      this.patientsRegistered=response.count;
    });

    this.receptionistService.countDoctors().subscribe(response =>{
      this.doctorsRegistered=response.count;
    });

    this.receptionistService.countAdmissions().subscribe(response =>{
      this.patientAdmissions=response.count;
    });

    this.receptionistService.countNormalAppointments().subscribe(response =>{
      this.appointmentsScheduled+=response.count;
    });

    this.receptionistService.countOnlineAppointments().subscribe(response =>{
      this.appointmentsScheduled+=response.count;
    });

    this.receptionistService.countRooms().subscribe(response =>{
      this.roomsAdded=response.count;
    });

    this.receptionistService.countEmployees().subscribe(response =>{
      this.employeesRegistered=response.count;
    });


  }


}

