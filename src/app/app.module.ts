import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { ListComponent } from './components/dashboard/list/list.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/dashboard/form/form.component';
import { Select2Module } from 'ng-select2-component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    ListComponent,
    NavbarComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    Select2Module
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
