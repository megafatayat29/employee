import { Component, Inject, Input, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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

  constructor(
    private readonly employeeService: EmployeeService,
    @Inject(HttpClient) private httpClient: HttpClient
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

}
