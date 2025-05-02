import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LOGIN_MUTATION } from './login.graphql';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class LoginComponent {
  private apollo = inject(Apollo); // ✅ Correct way with v10+
  form: FormGroup;
  error: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { username, password } = this.form.value;

    this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username, password }
    }).subscribe({
      next: (result: any) => {
        const token = result.data?.login;
        localStorage.setItem('token', token);
        this.snackBar.open('Login successful!', 'Close', { duration: 2000 });
        this.router.navigate(['/phones']);
      },
      error: (err) => {
        this.snackBar.open('Login failed. Check credentials.', 'Close', { duration: 3000 });
        console.error(err);
      }
    });
  }
}
