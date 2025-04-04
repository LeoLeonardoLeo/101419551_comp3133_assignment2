import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-stuff/employee-stuff.component';
import { AddEmployeeComponent } from './add-employees/add-employees.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';

export const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent },
  {path: 'employee-stuff', component: EmployeeListComponent},
  {path: 'add-employees', component: AddEmployeeComponent },
  {path: 'employee/:id', component: ViewEmployeesComponent},
  {path: 'edit-employee/:id', component: EditEmployeesComponent},
  { path: '**', redirectTo: 'signup' } 
];