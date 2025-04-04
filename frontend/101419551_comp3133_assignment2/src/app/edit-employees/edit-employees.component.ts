import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from '../graphql/employee.graphql';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {
  editForm: FormGroup
  employeeId: string | null = null
  loading = true

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo,
    public router: Router
  ) {
    this.editForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
  
    this.apollo.watchQuery({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id: this.employeeId }
    }).valueChanges.subscribe({
      next: (result: any) => {
        if (result?.data?.getEmployeeById) {
          const employee = result.data.getEmployeeById;
  

          //sets the form to the current user info
          this.editForm.patchValue({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,  
            designation: employee.designation,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining 
              ? new Date(employee.date_of_joining).toISOString().split('T')[0]
              : '',
            department: employee.department
          });
  
          this.loading = false
        } else {
          console.error("Employee data not found.")
          this.loading = false
        }
      },
      error: (error) => {
        console.error("Error fetching employee:", error)
        this.loading = false
      }
    });
  }
  

  onSubmit() {
    if (this.editForm.valid && this.employeeId) {
      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.employeeId,
          ...this.editForm.value,
          salary: parseFloat(this.editForm.value.salary)
        }
      }).subscribe({
        next: () => {
          this.router.navigate(['/employee-stuff'])
        },
        error: (error) => {
          console.error("Issue updating employee:", error)
        }
      })
    }
  }
}
