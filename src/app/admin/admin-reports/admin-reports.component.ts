import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  //data=[280,258,210,270,310,268,265,230,270,280,210,290];
  totalAppointments = [];
  totalAppointmentsByDoctor = [];
  totalAppointmentChart;
  totalAppointmentChart_data = [];
  totalAppointmentByDoctorChart;
  totalAppointmentByDoctorChart_data = [];
  totalAdmissions;
  totalAdmissions_data = [];
  patientByCity;
  patientsByCity_data=[];
  patientByAge;
  doctors=[];

  ageGroups;
  ngOnInit() {
    this.generateTotalAppoinmentsChart();
    this.generateTotalAppointmentsByDoctor();
    this.generateTotalAdmissions();


    this.adminService.getDoctorNames().subscribe(results =>{
      results.doctorNames.map(doctor =>{
        //console.log(doctor.name.firstname);
        this.doctors.push({firstName:doctor.name.firstname,lastName:doctor.name.lastname,doctorRegistrationNumber:doctor.doctorRegistrationNumber})
      });
    });

    this.adminService.getAgeGroups().subscribe(results =>{
      console.log(results.res);
      this.ageGroups=results.res;
      this.generatePatientPieChartByAge();
    });

    this.adminService.getPatientsDataByCity().subscribe(results => {
      this.patientsByCity_data=results.data;
      this.generatePatientsByCityChart();
    });

  }

  onSearchTotalAppointments(year:Number){
    //alert(year);
    this.adminService.getTotalAppointmentsData(year).subscribe(res=>{
      this.totalAppointmentChart_data=res.data;
      this.generateTotalAppoinmentsChart();
    });
  }

  onSearchTotalAppointmentsByDoctor(year:Number,doctor:Number){
    // alert(year+" "+doctor);
    this.adminService.getTotalAppointmentsData_ByDoctor(year,doctor).subscribe(res=>{
      this.totalAppointmentByDoctorChart_data=res.data;
      this.generateTotalAppointmentsByDoctor();
    });
  }

  onSearchTotalAdmissions(year:Number){
    // alert(year+" "+doctor);
    this.adminService.getTotalAdmissionData(year).subscribe(res=>{
      this.totalAdmissions_data=res.data;
      this.generateTotalAdmissions();
    });
  }

  generateTotalAppoinmentsChart(){
    this.totalAppointmentChart = new Chart('totalAppointments', {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "April", "May","June","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label:"Appointments",
            backgroundColor: ["#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
            data: this.totalAppointmentChart_data
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Appointments'
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 0,
                  precision:0
              }
          }],
        }
      }
    });
  }

  generateTotalAppointmentsByDoctor(){
    this.totalAppointmentByDoctorChart = new Chart('totalAppointments_doctor', {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "April", "May","June","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label:"Appointments",
            backgroundColor: "#20B2AA",
            data: this.totalAppointmentByDoctorChart_data
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Appointments by Doctor'
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 0,
                  precision:0   // minimum will be 0, unless there is a lower value.
                  // OR //
                  //beginAtZero: true   // minimum value will be 0.
              }
          }],

      }
      }
    });
  }

  generateTotalAdmissions(){
    this.totalAdmissions = new Chart('totalAdmissions', {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "April", "May","June","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label:"Admissions",
             backgroundColor: "#481A6B",
            //backgroundColor:"#FFEFD5",
            data: this.totalAdmissions_data
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Admissions'
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 0,
                  precision:0
              }
          }],

      }
      }
    });
  }
  // city=["Kelaniya","Kiribathgoda","Kadawatha","Kelaniya","Kiribathgoda","Kadawatha","Kelaniya","Kelaniya","Kadawatha","Kelaniya","Kelaniya","Kelaniya","Kelaniya","Kadawatha","Kelaniya"]
  city=[10,20,30,40,50,60];
  generatePatientPieChartByAge(){
    this.patientByAge = new Chart('patientsAge', {
      type: 'doughnut',
      data: {
        labels: ["1-5 Years Old","6-10 Years Old","11-18 Years Old","19-30 Years Old","31-50 Years Old","Over 50 Years Old"],
        datasets: [
          {
            label:"Age",
            backgroundColor: ["#7FFF00","#00FFFF","#DC143C","#3336FF","#FF7F50","#AB7F80"],
            data: this.ageGroups
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Patients By Age Pie Chart'
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 0,
                  precision:0
              }
          }],

      }
      }
    });
  }

  generatePatientsByCityChart(){
    this.patientByCity = new Chart('patientsByCity', {
      type: 'bar',
      data: {
        labels: ["Kelaniya", "Peliyagoda", "Makola", "Kiribathgoda", "Kadawatha","Gampaha","Ganemulla","Balummahara","Waththala","Ragama"],
        datasets: [
          {
            label:"Admissions",
             backgroundColor: "#FBA71D",
            //backgroundColor:"#FFEFD5",
            data: this.patientsByCity_data
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'No.of Patients by City'
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  suggestedMin: 0,
                  precision:0
              }
          }],

      }
      }
    });
  }

}
