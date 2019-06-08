import { MatSnackBar } from '@angular/material';
import { Doctor } from './../../models/doctor.model';
import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { TimeSlot } from 'src/app/models/timeslot.model';

@Component({
  selector: 'app-receptionist-view-doctor',
  templateUrl: './receptionist-view-doctor.component.html',
  styleUrls: ['./receptionist-view-doctor.component.css']
})
export class ReceptionistViewDoctorComponent implements OnInit {
  showFirst:boolean=false;
  constructor(public receptionistService: ReceptionistService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  showForm=false;
  public doctor:Doctor={
    doctorRegistrationNumber: null,
      name:{
      firstname:null,
      lastname:null,
      },
      gender:null,
      dob:null,
      address:null,
      city:null,
      district:null,
      nic:null,
      maritalStatus:null,
      contactNumber:null,
      email:null,
      doctorType:null,
      SLMCRegNo:null,
      primaryQualification:{
        degree:null,
        year:null,
        university:null,
        country:null
      },
      postGradQualification:{
        degree:null,
        specialization:null,
        year:null,
        university:null,
        country:null
      },
    doctorAvailability:[]
  };
  public doctorAvailability=[];
  searchDoctor(keyword:string){
    this.showForm=false;
    console.log(keyword);
    let raw_doctorNo=keyword;
    // let doctorNo=raw_doctorNo.replace( /^\D+/g, '');
    // console.log(doctorNo=="")

    if(raw_doctorNo==""){
      this.snackBar.open( "Invalid Input", "OK", {
        panelClass: ['error']
      });
    }else{
      this.receptionistService.getDoctor(raw_doctorNo).subscribe(result =>{
        console.log(result.doctor==null);
        console.log("sdadja")
         if(result.doctor==null){
          this.snackBar.open( "Doctor Not found", "OK", {
            panelClass: ['error']
          });
           return
         }

       this.showForm=true;
       const doctor:Doctor={
        doctorRegistrationNumber: result.doctor.doctorRegistrationNumber,
        name:{
        firstname:result.doctor.name.firstname,
        lastname:result.doctor.name.lastname,
        },
        gender:result.doctor.gender,
        dob:new Date(result.doctor.dob).toDateString(),
        address:result.doctor.address,
        city:result.doctor.city,
        district:result.doctor.district,
        nic:result.doctor.nic,
        maritalStatus:result.doctor.maritalStatus,
        contactNumber:result.doctor.contactNumber,
        email:result.doctor.email,
        doctorType:result.doctor.doctorType,
        SLMCRegNo:result.doctor.SLMCRegNo,
        primaryQualification:{
          degree:result.doctor.primaryQualification.degree,
          year:result.doctor.primaryQualification.year,
          university:result.doctor.primaryQualification.university,
          country:result.doctor.primaryQualification.country,
        },
        postGradQualification:{
          degree:result.doctor.postGradQualification.degree,
          specialization:result.doctor.postGradQualification.specialization,
          year:result.doctor.postGradQualification.year,
          university:result.doctor.postGradQualification.university,
          country:result.doctor.postGradQualification.country,
        },
      doctorAvailability:null
       };
      this.doctor=doctor;
     //  console.log(this.doctor.doctorRegistrationNumber);
      });
      this.doctorAvailability=[];
      this.receptionistService.getDoctorAvailability(raw_doctorNo).subscribe(results =>{
        //console.log(results.timeSlots);
        results.timeSlots.map(timeSlot => {
          //console.log(timeSlot);
          this.doctorAvailability.push(timeSlot);
        });
      });
      console.log(this.doctorAvailability);
    }

  }


  timeSlots:TimeSlot[]=[];
  day;
  startTime;
  endTime;
  toggle=true;
  onAddTimeSlot(){
    this.timeSlots.push({
     day:this.day,
     startTime:this.startTime,
     endTime:this.endTime
    });
    console.log(this.timeSlots);

   }
   onClearTable(){
     this.timeSlots=[];
   }

   toggleToUpdateDoctorAvailability(){
     this.toggle=false;
   }

   toggleToViewDoctorAvailability(){
    this.toggle=true;
  }

  updateDoctorAvailability(){
    console.log(this.timeSlots.length)
    if(this.timeSlots.length==0)
    {
      this.snackBar.open( "Invalid Input", "OK", {
        panelClass: ['error']
      });

    }else{
      this.receptionistService.updateDoctorAvailability(this.doctor.doctorRegistrationNumber,this.timeSlots).subscribe(response =>{
        this.timeSlots=[];
        this.snackBar.open( "Doctor Availability Successfully Updated", "OK", {
          panelClass: ['success']
        });
        this.toggleToViewDoctorAvailability();
        this.doctorAvailability=[];
        this.receptionistService.getDoctorAvailability(this.doctor.doctorRegistrationNumber).subscribe(results =>{

          results.timeSlots.map(timeSlot => {

            this.doctorAvailability.push(timeSlot);
          });
        });
      })
    }

  }

}
