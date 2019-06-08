import { user } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService{
  private isAuthenticated = false;
  private token: string;

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar) {}

  createUser(){
   /**/
  }

  loginUser(username:string, role:string, password:string){
    const user:user={
      username:username,
      role:role,
      password:password
    }
    this.http.post<{ token: string,username: string, role: string,registrationNumber:string}>
    ("http://localhost:3000/api/user/login", user)
    .subscribe(response => {

      const token = response.token;
      this.token = token;
      if (token) {
        this.isAuthenticated = true;

       console.log(response.role);
       if(response.role=="admin"){
         this.router.navigate(["/admin/"+response.username]);
        }
        else if (response.role=="receptionist"){
          this.router.navigate(["/receptionist"]);

        }
        else if(response.role=="doctor"){
          this.router.navigate(["/doctor/"+response.registrationNumber]);
          console.log(response.registrationNumber)
        }
      }

    },
    err=>{
      console.log(err);
      this.snackBar.open("Authentication Failed! Invalid username or password", "OK", {
      });
    })
  }


}
