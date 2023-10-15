import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/models/alert-message-interface';
import { LoginAdmin } from 'src/app/models/login-admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;
  loginAdmin!: LoginAdmin;
  message?: AlertMessage;
  
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private readonly router: Router
  ) { }

  renderPassErrMessage():string {
    const errorObj = this.loginForm.controls?.['password']?.errors
    if(errorObj?.['required']){
      return 'Password harus diisi'
    }
    return 'Password minimal 8 karakter'
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): {[key: string]: boolean} {
    let control: AbstractControl = this.loginForm.get(fieldName) as AbstractControl;

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

  onSubmit(): void {
    this.loading = true;
    const loginAdmin: LoginAdmin = this.loginForm.value;
    if (this.loginForm.value.username === "admin") {
      if (this.loginForm.value.password === "admin123") {
        sessionStorage.setItem('username', loginAdmin.username);
        sessionStorage.setItem('submenu', 'list');

        this.message = {
          status: 'success',
          text: `Selamat, ${loginAdmin.username} berhasil login!`
        }
      } else {
        this.message = {
          status: 'warning',
          text: `Maaf, ${loginAdmin.username}. Password salah.`
        }
      }
    } else {
      this.message = {
        status: 'danger',
        text: `Maaf, ${loginAdmin.username} tidak terdaftar sebagai admin`
      }
    }

    setTimeout(() => {
      this.message = undefined;
    }, 10000);

    this.onReset();
    this.router.navigateByUrl('/list');
  }

  onReset(): void {
    this.loginForm.reset();
  }
}
