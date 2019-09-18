
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

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

import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminSidemenuComponent } from './admin-sidemenu/admin-sidemenu.component';
import { AdminAddUsersComponent } from './admin-add-users/admin-add-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAddEmployeeComponent } from './admin-add-employee/admin-add-employee.component';
import { AdminViewEmployeeComponent } from './admin-view-employee/admin-view-employee.component';
import { AdminViewUsersComponent } from './admin-view-users/admin-view-users.component';
import { AdminAddRoomsComponent } from './admin-add-rooms/admin-add-rooms.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminReports2Component } from './admin-reports2/admin-reports2.component';
@NgModule({
  imports: [
  CommonModule,
  AdminRoutingModule,
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

  AdminComponent,

  AdminSidemenuComponent,

  AdminAddUsersComponent,

  AdminAddEmployeeComponent,

  AdminViewEmployeeComponent,

  AdminViewUsersComponent,

  AdminAddRoomsComponent,

  AdminReportsComponent,

  AdminReports2Component]
})


export class AdminModule{}
