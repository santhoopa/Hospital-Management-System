import { LoginComponent } from './auth/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnlineAppointmentComponent } from './online-appointments/online-appointment/online-appointment.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path:'receptionist', loadChildren: './receptionist/receptionist.module#ReceptionistModule'},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'},
  {path:'doctor',loadChildren:'./doctor/doctor.module#DoctorModule'},
  {path:'echannelling',component:OnlineAppointmentComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})


export class AppRoutingModule {}
