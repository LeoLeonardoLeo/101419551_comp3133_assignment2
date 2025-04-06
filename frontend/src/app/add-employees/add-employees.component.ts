import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE } from '../graphql/employee.graphql';
import { Router, RouterLink } from '@angular/router';
import { GET_ALL_EMPLOYEES } from '../graphql/employee.graphql';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employees.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: {
          ...this.employeeForm.value,
          salary: parseFloat(this.employeeForm.value.salary)
        },
        refetchQueries: [{
          query: GET_ALL_EMPLOYEES
        }]
      }).subscribe({
        next: () => {
          this.router.navigate(['/employee-stuff']);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/employee-stuff']);
  }
}