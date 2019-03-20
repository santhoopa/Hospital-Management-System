import { Patient } from './../../models/patient.model';
import { NgForm } from '@angular/forms';
import { ChangeDetectionStrategy,Component } from '@angular/core';
import { ReceptionistService } from '../receptionist.service';
import { MatRadioChange, MatRadioButton } from '@angular/material';
//import { Component, OnInit } from '@angular/core';
//import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'receptionist-register-patient',
  templateUrl: './receptionist-register-patient.component.html',
  styleUrls: ['./receptionist-register-patient.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReceptionistRegisterPatientComponent{
  constructor(public receptionistService: ReceptionistService) { }

  public pat: string="PAT/010";
  public gender:string;

  onRegister(registrationForm: NgForm){

    // if(registrationForm.invalid){
    //   return
    //  }
    console.log("Register Button clicked");
    // console.log(registrationForm.value);
    const patient:Patient={
      patientRegistrationNumber:  registrationForm.value.patientRegistrationNumber,
      name:{
      firstname:registrationForm.value.patientFirstName,
      lastname:registrationForm.value.patientLastName,
      },
      gender:registrationForm.value.genderPatient,
      address:registrationForm.value.patientAddress,
      city:registrationForm.value.patientCity,
      district:registrationForm.value.patientDistrict,
      nic:registrationForm.value.patientNIC,
      maritalStatus:registrationForm.value.maritalStatus,
      contactNumber:registrationForm.value.patientContactNumber,
      email:registrationForm.value.patientEmail,
      guardian:{
        guardianType:registrationForm.value.guardianType,
        firstname:registrationForm.value.guardianFirstName,
        lastname:registrationForm.value.guardianLastName,
        gender:registrationForm.value.genderGuardian,
        NIC:registrationForm.value.guardianNIC,
        contactNumber:registrationForm.value.guardianContactNumber ,
      }
    }
   // console.log(patient);
    //this.receptionistService.registerPatient(patient);
    //registrationForm.reset();
  }

  onChange(mrChange: MatRadioChange,registrationForm: NgForm) {
    console.log("changed");
    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.checked);
    if(mrButton.checked && mrChange.value=="self")
    {
      registrationForm.controls['guardianFirstName'].disable();
      registrationForm.controls['guardianLastName'].disable();
      registrationForm.controls['genderGuardian'].disable();
      registrationForm.controls['guardianNIC'].disable();
      registrationForm.controls['guardianContactNumber'].disable();
    }
    else
    {
      registrationForm.controls['guardianFirstName'].enable();
      registrationForm.controls['guardianLastName'].enable();
      registrationForm.controls['genderGuardian'].enable();
      registrationForm.controls['guardianNIC'].enable();
      registrationForm.controls['guardianContactNumber'].enable();
    }
  }
}


