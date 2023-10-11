import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  admin: boolean = false;
  @Input() employees: Employee[] = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.isAdmin();
    if (this.admin) {
      this.getAll();
    }
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "alFaqir") {
      this.admin = true;
    }
  }

  getAll(): void {
    this.employeeService.getAll().then(
      (resp) => {
        this.employees = resp;
      }
    );
  }

}
