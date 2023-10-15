import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/models/alert-message-interface';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  admin: boolean = false;
  today: string;
  selectedDate: string;
  message?: AlertMessage;

  employeeForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthDate: new FormControl(null, [Validators.required]),
    basicSalary: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    group: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  })

  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeeService
  ) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().substring(0, 10);
    this.selectedDate = this.today;
  }

  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "admin") {
      this.admin = true;
    }
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): {[key: string]: boolean} {
    let control: AbstractControl = this.employeeForm.get(fieldName) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false
    }

    if (parent) {
      control = parent;
    }
    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    } else if (control && control.valid) {
      classes['is-valid'] = true;
    } 
    
    return classes;
  }

  onClickCancel(): void {
    this.router.navigateByUrl('/list');
  }

  onSubmit(): void {
    const employee: Employee = this.employeeForm.value;

    this.employeeService.insert(employee).then(
      (resp: any) => {
        this.message = {
          status: 'success',
          text: `You just add new employee with username: ${resp.mockData.username}!`
        };
        setTimeout(() => {
          this.message = undefined;
          this.router.navigateByUrl('/list');
        }, 5000);
      }
    )
  }
}
