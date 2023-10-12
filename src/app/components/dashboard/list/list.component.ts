import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AlertMessage } from '../../../models/alert-message-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  admin: boolean = false;
  @Input() employees: Employee[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  message?: AlertMessage;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin();
    this.getAll();
    if (this.admin) {
      this.dtOptions = {
        pagingType: 'full_numbers'
      };
    }
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "admin") {
      this.admin = true;
    }
  }

  getAll(): void {
    this.employeeService.getAll().then(
      (resp) => {
        this.employees = resp;
        this.dtTrigger.next(null);
      }
    );
  }

  edit(name: string) {
    this.message = {
      status: 'warning',
      text: `Kamu menekan tombol edit untuk: ${name}`
    }
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  delete(name: string) {
    this.message = {
      status: 'danger',
      text: `Kamu menekan tombol hapus untuk: ${name}`
    }
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  add() {
    this.router.navigateByUrl('/add');
  }
}
