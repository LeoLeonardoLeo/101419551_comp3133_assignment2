import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { GET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/employee.graphql';

@Component({
  selector: 'app-employee-stuff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-stuff.component.html',
  styleUrls: ['./employee-stuff.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees$!: Observable<any>;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.employees$ = this.apollo.watchQuery<any>({
      query: GET_ALL_EMPLOYEES
    }).valueChanges;
  }

    deleteEmployee(id: string){
    if (confirm("Do you want to delete this employee?")) {
      this.apollo.mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
        refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
      }).subscribe({
        
        //the following auto updates the list because i dont want to always refresh
        next: () => {
          this.employees$ = this.apollo.watchQuery<any>({
            query: GET_ALL_EMPLOYEES,
            fetchPolicy: 'network-only' //force refreshes
          }).valueChanges
        }
      });
    }
  }

  viewEmployee(id: string){
    this.router.navigate(['/employee', id]);
  }

  editEmployee(id: string){
    this.router.navigate(['/edit-employee', id])
  }

}