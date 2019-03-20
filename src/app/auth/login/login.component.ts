import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

  onLogin(loginForm: NgForm){
    if(loginForm.invalid){
      return
  }
    console.log("Login button clicked");
   // console.log(loginForm.value);
    this.authService.loginUser(loginForm.value.username,loginForm.value.role,loginForm.value.password);
  }

}
