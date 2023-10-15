import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  handleError(error: any): Observable<any> {
    console.error(error);

    alert('Terjadi kesalahan!');

    return EMPTY;
  }

  public getAll(): Promise<any> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    
    return fetch('https://6526b1c4917d673fd76cd1d8.mockapi.io/employees', options)
      .then((response) => response.json())
      .catch(err => console.error(err));
  }

  public insert(employee: Employee): Promise<any> {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mockData: employee,
      })
    };
    
    return fetch('https://6526b1c4917d673fd76cd1d8.mockapi.io/employees', options)
    .then(res => res.json())
    .catch(err => console.error(err)); 
  }
}
