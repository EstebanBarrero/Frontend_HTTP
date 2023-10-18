import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent} from './vistas/login/login.component';
import { NuevoComponent} from './vistas/nuevo/nuevo.component';
import { EditComponent} from './vistas/edit/edit.component';
import { DashboardComponent} from './vistas/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'nuevo',
    component: NuevoComponent
  },
  {
    path:'edit/:first_name',
    component: EditComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardComponent,NuevoComponent,EditComponent]
