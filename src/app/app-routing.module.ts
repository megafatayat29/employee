import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/dashboard/list/list.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: ''
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'dashboard/list', 
    component: ListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
