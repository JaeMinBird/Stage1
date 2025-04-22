import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLogin = true; // Toggle between login and signup
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    // Redirect if already logged in
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  async handleSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.isLogin) {
        await this.authService.signIn(this.email, this.password);
      } else {
        await this.authService.signUp(this.email, this.password);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred';
      console.error('Auth error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
