import { AdminService } from './../admin.service';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import * as jsPDF from 'jspdf'
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin-reports2',
  templateUrl: './admin-reports2.component.html',
  styleUrls: ['./admin-reports2.component.css']
})
export class AdminReports2Component implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    //this.generateReport("asas");
  }
  displayedColumns: string[] = ['patientRegistrationNumber','patientFirstName','patientLastName','patientGender','patientAddress','patientCity','patientDistrict','patientNIC','patientDOB','patientmaritalStatus','patientContact','patientemail','guardianName','guardianGender','guardianNIC','guardianContact'];
  dataSource = null;
  private patientsSub: Subscription;
  apps=[{},{}]
  showTable=false;
  showForm=false;
  searchPatient(keyupevent:KeyboardEvent){
    //console.log((<HTMLInputElement>keyupevent.target).value.charCodeAt);

    this.adminService.searchPatients((<HTMLInputElement>keyupevent.target).value);
    this.patientsSub=this.adminService.getPatienttUpdateListner()
    .subscribe((patients:Patient[])=> {

      this.dataSource=patients;
      if(patients.length==0){
        this.showTable=false;
      }else{
        this.showTable=true;
      }
      // console.log("This is postUpdateListener ");
    });
    //  console.log(this.dataSource)
   }

   generateReport(patient:any){
    console.log(patient);
    var doc = new jsPDF({
      // orientation: 'landscape',
      // unit: 'in',
      // format: [4, 2]
    })
    doc.setFontSize(16);
    doc.setFont("helvetica");
    //doc.setTextColor(100);
    doc.setFontStyle("bold");
    doc.text('Medical Center Management System - Patient Report ', 38, 15);
    doc.setFontSize(10);
    doc.setFontStyle("italic");
    doc.setTextColor(255, 51, 51);
    doc.text('Private & Confidential', 81, 21);
    doc.setTextColor(0);
    doc.setFontSize(12);
    //doc.setFont("times");
    var x=20;
    var y=35;
    var gap=9;
    // doc.setLineDash([2.0])
    doc.setLineWidth(0.4);
    doc.line(0, 28, 250,28);
    doc.setFontStyle("bold");
    doc.text("Patient Information",x,y+=gap);
    doc.setFontStyle("normal");
    doc.text("Patient Registration Number  :  PAT/"+patient.patientRegistrationNumber,x,y+=gap+2);
    doc.text("Name : "+patient.name.firstname+" "+patient.name.lastname,x,y+=gap);
    doc.text("Gender : "+patient.gender,x,y+=gap);
    doc.text("Address : "+patient.address,x,y+=gap);
    doc.text("NIC : "+patient.nic,x,y+=gap);
    doc.text("City : "+patient.city,x,y+=gap);
    doc.text("District : "+patient.district,x,y+=gap);
    doc.text("Date of Birth : "+new Date(patient.dob).toDateString(),x,y+=gap);
    doc.text("Marital Status : "+patient.maritalStatus,x,y+=gap);
    doc.text("Contact Number : "+patient.contactNumber,x,y+=gap);
    doc.text("Email : "+patient.email,x,y+=gap);
    doc.setFontStyle("bold");
    if(patient.guardian.guardianType!="Self"){
      doc.text("Guardian Information",x,y+=gap+5);
      doc.setFontStyle("normal");
      doc.text("Guardian Type: "+patient.guardian.guardianType,x,y+=gap+2);
      doc.text("Name : "+patient.guardian.firstname+" "+patient.guardian.lastname,x,y+=gap);
      doc.text("Gender : "+patient.guardian.gender,x,y+=gap);
      doc.text("Contact Number : "+patient.guardian.contactNumber,x,y+=gap);
      doc.text("NIC : "+patient.guardian.NIC,x,y+=gap);
    }
    doc.setFontStyle("italic");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Generated Using Medical Center Management System', 60, 290);
    doc.setTextColor(0);
    doc.addPage('a4');
    doc.setFontStyle("bold");
    y=20;
    doc.setFontSize(15);
    doc.text('Treatment History', x, y);
    doc.setFontSize(12);
    doc.setFontStyle("normal");
    //doc.text('Medical Center Management System - Patient Report ', 202, 290);


    this.adminService.getPreviousAppointments_ViewPatient(patient.patientRegistrationNumber).subscribe(response =>{
      console.log(response);
      var index=1;
      response.normal_appointments.map(normalApp => {
        doc.setFontStyle("bold");
        doc.text((index++)+".  Appointment Number  :  APP/"+normalApp.appointmentNumber,x,y+=gap+3);
        doc.setFontStyle("normal");
        doc.text("Doctor :  Dr. "+normalApp.doctor[0].name.firstname+" "+normalApp.doctor[0].name.lastname,x+6,y+=gap);
        doc.text("Doctor Type:  "+normalApp.doctor[0].doctorType,x+100,y);
        doc.text("Appointment Date : "+new Date(normalApp.appointmentDate).toDateString(),x+6,y+=gap);
        doc.text("Appointment Type : Manual",x+100,y);
        doc.text("Time Slot : "+normalApp.timeSlot,x+6,y+=gap);
        doc.text("Appointment Status : "+normalApp.appointmentStatus,x+6,y+=gap);
        doc.text("Symptoms : "+normalApp.symptoms,x+6,y+=gap);
        doc.text("Disease : "+normalApp.disease,x+6,y+=gap);
        doc.text("Prescription : "+normalApp.prescription,x+6,y+=gap);
        doc.text("Date Created : "+new Date(normalApp.dateCreated).toDateString(),x+6,y+=gap);
        y+=2;
        if(index==4){

          doc.setFontStyle("italic");
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text('Generated Using Medical Center Management System', 60, 290);
          doc.setTextColor(0);
          doc.setFontSize(12);
          doc.addPage('a4');
          y=20;
        }
      });
      response.online_appointments.map(normalApp => {
        doc.setFontStyle("bold");
        doc.text((index++)+".  Appointment Number  :  eAPP/"+normalApp.appointmentNumber,x,y+=gap+3);
        doc.setFontStyle("normal");
        doc.text("Doctor :  Dr. "+normalApp.doctor[0].name.firstname+" "+normalApp.doctor[0].name.lastname,x+6,y+=gap);
        doc.text("Doctor Type:  "+normalApp.doctor[0].doctorType,x+100,y);
        doc.text("Appointment Date : "+new Date(normalApp.appointmentDate).toDateString(),x+6,y+=gap);
        doc.text("Appointment Type : Online",x+100,y);
        doc.text("Time Slot : "+normalApp.timeSlot,x+6,y+=gap);
        doc.text("Appointment Status : "+normalApp.appointmentStatus,x+6,y+=gap);
        doc.text("Symptoms : "+normalApp.symptoms,x+6,y+=gap);
        doc.text("Disease : "+normalApp.disease,x+6,y+=gap);
        doc.text("Prescription : "+normalApp.prescription,x+6,y+=gap);
        doc.text("Date Created : "+new Date(normalApp.dateCreated).toDateString(),x+6,y+=gap);
        y+=2;
        if(index==4 || index==7 || index==10){

          doc.setFontStyle("italic");
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text('Generated Using Medical Center Management System', 60, 290);
          doc.setTextColor(0);
          doc.setFontSize(12);
          doc.addPage('a4');
          y=20;
        }
      });
      doc.output('dataurlnewwindow');
    });

   }
}
