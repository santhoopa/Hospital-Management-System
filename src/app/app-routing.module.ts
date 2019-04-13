import { LoginComponent } from './auth/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path:'receptionist', loadChildren: './receptionist/receptionist.module#ReceptionistModule'},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})


export class AppRoutingModule {}
