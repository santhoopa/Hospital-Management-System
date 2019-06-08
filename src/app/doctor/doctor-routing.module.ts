import { DoctorViewPatientComponent } from './doctor-view-patient/doctor-view-patient.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DoctorComponent } from './doctor/doctor.component';

const doctorRoutes: Routes = [
  {
    path: ':id',
    component:DoctorComponent,
    children: [
      { path: 'appointment', component: DoctorAppointmentsComponent },
      { path: 'ViewPatient', component: DoctorViewPatientComponent }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(doctorRoutes)],
  exports: [RouterModule],
  providers: []
})


export class DoctorRoutingModule {}
