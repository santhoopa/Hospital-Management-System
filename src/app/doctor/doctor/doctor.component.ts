import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(public activate:ActivatedRoute) { }
  doctorRegNo:string;
  ngOnInit() {
    this.doctorRegNo=this.activate.snapshot.params['id'];
    console.log(this.doctorRegNo);
  }

}
