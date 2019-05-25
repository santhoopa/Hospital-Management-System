import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatButtonModule,
          MatCardModule,
          MatDialogModule,
          MatInputModule,
          MatTableModule,
          MatToolbarModule,
          MatMenuModule,
          MatIconModule,
          MatProgressSpinnerModule,
          MatSelectModule,
          MatFormFieldModule,
          MatStepperModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatRadioModule,
          MatSnackBarModule,
          } from '@angular/material';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { OnlineAppointmentComponent } from './online-appointments/online-appointment/online-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OnlineAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatStepperModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
