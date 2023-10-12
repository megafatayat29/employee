import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/dashboard/list/list.component';
import { FormComponent } from './components/dashboard/form/form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'list', 
    component: ListComponent
  },
  { 
    path: 'add', 
    component: FormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
