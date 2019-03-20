import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ReceptionistSideMenuComponent } from './receptionist-sidemenu/receptionist-sidemenu.component';
import { ReceptionistAddDoctorComponent } from './receptionist-add-doctor/receptionist-add-doctor.component';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {ReceptionistRoutingModule} from './receptionist-routing.module'
import { ReceptionistRegisterPatientComponent } from './receptionist-register-patient/receptionist-register-patient.component';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatCardModule} from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material';
// import {MatButtonModule} from '@angular/material/button';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material'
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,

} from '@angular/material';

import { ReceptionistDashboardComponent } from './receptionist-dashboard/receptionist-dashboard.component';
import { ReceptionistViewPatientDetailsComponent } from './receptionist-view-patient-details/receptionist-view-patient-details.component';
import { ReceptionistScheduleAppointmentsComponent } from './receptionist-schedule-appointments/receptionist-schedule-appointments.component';
import { ReceptionistViewOnlineAppointmentsComponent } from './receptionist-view-online-appointments/receptionist-view-online-appointments.component';
import { ReceptionistAdmitPatientComponent } from './receptionist-admit-patient/receptionist-admit-patient.component';
import { ReceptionistViewDoctorComponent } from './receptionist-view-doctor/receptionist-view-doctor.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReceptionistRoutingModule,
   MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    FormsModule

  ],
  declarations: [
    ReceptionistComponent,
    ReceptionistSideMenuComponent,
    ReceptionistAddDoctorComponent,
    ReceptionistRegisterPatientComponent,
    ReceptionistDashboardComponent,
    ReceptionistViewPatientDetailsComponent,
    ReceptionistScheduleAppointmentsComponent,
    ReceptionistViewOnlineAppointmentsComponent,
    ReceptionistAdmitPatientComponent,
    ReceptionistViewDoctorComponent
  ]
})
export class ReceptionistModule{}
