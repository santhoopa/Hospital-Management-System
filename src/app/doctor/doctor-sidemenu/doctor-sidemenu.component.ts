import { DoctorService } from './../doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doctor-sidemenu',
  templateUrl: './doctor-sidemenu.component.html',
  styleUrls: ['./doctor-sidemenu.component.css']
})
export class DoctorSidemenuComponent implements OnInit {
  @Input() public doctorID:string;

  constructor(public activate:ActivatedRoute,public doctorService: DoctorService) { }
  doctorRegNo;
  doctorname;
  ngOnInit() {
    this.doctorRegNo=this.activate.snapshot.params['id'];
    console.log(this.doctorRegNo + "Sidemenu");
    this.doctorService.getDoctorName_SideMenu(this.doctorRegNo).subscribe(response =>{
      console.log(response);
      this.doctorname="Dr. "+ response.DoctorFirstName + " " + response.DoctorLastName;
    })

  }

  getDoctorName(reNo:string){

  }

}
