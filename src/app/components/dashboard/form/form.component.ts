import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { map } from 'rxjs';
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
  isView: boolean = false;
  id?: string;
  currentData: any;
  data: Select2Data = [
    {
        value: 'health',
        label: 'Health',
        data: { color: 'white', name: 'Health' },
    },
    {
        value: 'music',
        label: 'Music',
        data: { color: 'red', name: 'Music' },
    },
    {
      value: 'sport',
      label: 'Sport',
      data: { color: 'white', name: 'Sport' },
    },
    {
        value: 'home',
        label: 'Home',
        data: { color: 'red', name: 'Home' },
    },
    {
      value: 'electronics',
      label: 'Electronics',
      data: { color: 'white', name: 'Electronics' },
    },
    {
        value: 'jewelery',
        label: 'Jewelery',
        data: { color: 'red', name: 'Jewelery' },
    },
    {
      value: 'baby',
      label: 'Baby',
      data: { color: 'white', name: 'Baby' },
    },
    {
        value: 'industrial',
        label: 'Industrial',
        data: { color: 'red', name: 'Industrial' },
    },
    {
      value: 'clothing',
      label: 'Clothing',
      data: { color: 'white', name: 'Clothing' },
    },
    {
        value: 'games',
        label: 'Games',
        data: { color: 'red', name: 'Games' },
    },
];

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
    private readonly employeeService: EmployeeService,
    private readonly activatedRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().substring(0, 10);
    this.selectedDate = this.today;
  }

  ngOnInit(): void {
    this.isAdmin();
    this.checkIsView();
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "admin") {
      this.admin = true;
    }
  }

  checkIsView(): void {
    if (this.router.url.match(/detail*/)) {
      this.isView = true;
    };
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        return params['id'] ? params['id'] : '';
      })
    )
    .subscribe(
      {
        next: (id: string) => {
          if(id){
            this.id = id;
            this.onView(id);
          }
        },
        error: console.error
      }
    )
  }

  get f() { return this.employeeForm.controls; }

  onView(id: string): void {
    this.employeeService.getById(id).then(
      (employee: Employee) => {
        this.currentData = employee;
        if (this.currentData) {
          this.f['username'].setValue(this.currentData.username);
          this.f['firstName'].setValue(this.currentData.firstName);
          this.f['lastName'].setValue(this.currentData.lastName);
          this.f['email'].setValue(this.currentData.email);
          this.f['birthDate'].setValue(this.datepipe.transform(this.currentData.birthDate, 'yyyy-MM-dd'));
          this.f['basicSalary'].setValue(this.currentData.basicSalary);
          this.f['status'].setValue(this.currentData.status);
          this.f['group'].setValue(this.currentData.group);
          this.f['description'].setValue(this.currentData.description);
        }
      }
    );
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
