import { Component, OnInit,Input, Output } from '@angular/core';

@Component({
  selector: 'admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent implements OnInit {
  @Input() public adminID:string;
  constructor() { }

  ngOnInit() {
    console.log(String(this.adminID));
  }

}
