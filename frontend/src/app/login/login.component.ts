import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/user.graphql';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      alert("Fill in both username and password.");
      return;
    }
  
    this.apollo.mutate({
      mutation: LOGIN,
      variables: this.loginForm.value
    }).subscribe({
      next: (result: any) => {
        this.loading = false;
    
        const message = result.data.login; 
    
        if (message.includes("successful")) { 
          //if works sends to the employee page
          this.router.navigate(['/employee-stuff']);
        } else {
          alert("Login failed: " + message);
        }
      },
      error: (error) => {
        this.loading = false;
        alert('Login failed: ' + error.message);
      }
    });
  }    
  
}