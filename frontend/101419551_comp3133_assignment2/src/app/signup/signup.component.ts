import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGNUP } from '../graphql/user.graphql';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  error: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (!this.signupForm.valid) {
      alert("Please fill in all fields correctly.");
      return;
    }
  
    this.loading = true;
    this.error = null;
  
    this.apollo.mutate({
      mutation: SIGNUP,
      variables: this.signupForm.value
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employee-stuff']);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message;
        console.error('Signup error:', error);
      }
    });
  }
  
}