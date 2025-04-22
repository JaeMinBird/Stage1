import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userEmail: string | undefined = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Get current user email
    this.userEmail = this.authService.currentUser?.email;
  }

  async handleSignOut() {
    await this.authService.signOut();
  }
}
