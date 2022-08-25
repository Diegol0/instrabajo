import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  filteredEmployees: any[] = [];
  employees: any[] = [];
  value: string = '';
  showImages: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.employees = [];
  }

  filter() {
    if (this.value) {
      this.filteredEmployees = this.employees.filter((employee) =>
        String(employee.employee)
          .toLowerCase()
          .includes(this.value.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }
}
