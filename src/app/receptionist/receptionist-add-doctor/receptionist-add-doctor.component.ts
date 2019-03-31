import { Doctor } from './../../models/doctor.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceptionistService } from '../receptionist.service';
import { TimeSlot } from 'src/app/models/timeslot.model';


@Component({
  selector: 'receptionist-add-doctor',
  templateUrl: './receptionist-add-doctor.component.html',
  styleUrls: ['./receptionist-add-doctor.component.css']


})

export class ReceptionistAddDoctorComponent{
  constructor(public receptionistService: ReceptionistService) { }
  timeSlots:TimeSlot[]=[];
  day;
  startTime;
  endTime;

  doctorRegistrationNo="DR/001";

  public timeSlot:TimeSlot={
    day:null,
    startTime:null,
    endTime:null
  };



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


  onRegister(registrationForm: NgForm){
    const doctor:Doctor={
      doctorRegistrationNumber: registrationForm.value.doctorRegistrationNumber,
      name:{
      firstname:registrationForm.value.doctorFirstName,
      lastname:registrationForm.value.doctorLastName,
      },
      gender:registrationForm.value.genderDoctor,
      dob:registrationForm.value.doctorDOB,
      address:registrationForm.value.doctorAddress,
      city:registrationForm.value.doctorCity,
      district:registrationForm.value.doctorDistrict,
      nic:registrationForm.value.doctorNIC,
      maritalStatus:registrationForm.value.maritalStatus,
      contactNumber:registrationForm.value.doctorContactNumber,
      email:registrationForm.value.doctorEmail,
      doctorType:registrationForm.value.doctorType,
      SLMCRegNo:registrationForm.value.slmcRegNo,
      primaryQualification:{
        degree:registrationForm.value.primaryDegree,
        year:registrationForm.value.primaryYearObtained,
        university:registrationForm.value.primaryUniversity,
        country:registrationForm.value.primaryCountry,
      },
      postGradQualification:{
        degree:registrationForm.value.postGradDegree,
        specialization:registrationForm.value.postGradSpecialization,
        year:registrationForm.value.postGradYearObtained,
        university:registrationForm.value.postGradUniversity,
        country:registrationForm.value.postGradCountry,
      },
    doctorAvailability:this.timeSlots
    }
  console.log(doctor);
  this.receptionistService.registerDoctor(doctor);
  }
}
