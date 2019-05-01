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

    ]


  },

];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers: []
})


export class AdminRoutingModule {}



