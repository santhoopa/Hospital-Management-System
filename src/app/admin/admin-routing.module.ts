import { AdminViewEmployeeComponent } from './admin-view-employee/admin-view-employee.component';
import { AdminAddEmployeeComponent } from './admin-add-employee/admin-add-employee.component';
import { AdminAddUsersComponent } from './admin-add-users/admin-add-users.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const adminRoutes: Routes = [
  {
    path: ':id',
    component: AdminComponent,
    children: [
      { path: 'AddUser/asd', component: AdminAddUsersComponent },
      { path: 'AddEmployee', component: AdminAddEmployeeComponent },
      { path: 'ViewEmployee', component: AdminViewEmployeeComponent },

    ]


  },

];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers: []
})


export class AdminRoutingModule {}



