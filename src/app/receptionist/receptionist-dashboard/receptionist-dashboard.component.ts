import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: ['./receptionist-dashboard.component.css']
})
export class ReceptionistDashboardComponent implements OnInit {
  showMsg: boolean = true;
  constructor(private snackBar: MatSnackBar) {}

  click(message: string, action: string) {
    this.snackBar.open("Error", null, {
      duration: 4000,
      panelClass: ['success']
    });
  }
  ngOnInit() {
  }


}

