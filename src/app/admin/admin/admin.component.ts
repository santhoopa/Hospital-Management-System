import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public activate:ActivatedRoute) { }
  id:string;
  ngOnInit() {
    this.id=this.activate.snapshot.params['id'];
    console.log(this.id);
  }

}
