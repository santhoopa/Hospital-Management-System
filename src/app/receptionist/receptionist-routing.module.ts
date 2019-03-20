import { ReceptionistViewOnlineAppointmentsComponent } from './receptionist-view-online-appointments/receptionist-view-online-appointments.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ReceptionistAddDoctorComponent } from './receptionist-add-doctor/receptionist-add-doctor.component';
import { ReceptionistRegisterPatientComponent } from './receptionist-register-patient/receptionist-register-patient.component';
import { ReceptionistDashboardComponent } from './receptionist-dashboard/receptionist-dashboard.component';
import { ReceptionistViewPatientDetailsComponent } from './receptionist-view-patient-details/receptionist-view-patient-details.component';
import { ReceptionistScheduleAppointmentsComponent } from './receptionist-schedule-appointments/receptionist-schedule-appointments.component';
import { ReceptionistAdmitPatientComponent } from './receptionist-admit-patient/receptionist-admit-patient.component';
import { ReceptionistViewDoctorComponent } from './receptionist-view-doctor/receptionist-view-doctor.component';


const receptionistRoutes: Routes = [
  {
    path: '',
    component: ReceptionistComponent,
    children: [
      { path: 'RegisterDoctor', component: ReceptionistAddDoctorComponent },
      { path:'RegisterPatient', component: ReceptionistRegisterPatientComponent},
      { path:'Dashboard', component:ReceptionistDashboardComponent},
      { path:'ViewPatientDetails', component: ReceptionistViewPatientDetailsComponent},
      { path:'OnlineAppoinments', component: ReceptionistViewOnlineAppointmentsComponent},
      { path:'ScheduleAppointments', component: ReceptionistScheduleAppointmentsComponent},
      { path:'AdmitPatient', component: ReceptionistAdmitPatientComponent},
      { path:'ViewDoctor', component: ReceptionistViewDoctorComponent}

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(receptionistRoutes)],
  exports: [RouterModule],
  providers: []
})


export class ReceptionistRoutingModule {}
