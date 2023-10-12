import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  admin: boolean = false;

  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin(): void {
    const user = sessionStorage.getItem('username');
    if (user == "admin") {
      this.admin = true;
    }
  }
}
