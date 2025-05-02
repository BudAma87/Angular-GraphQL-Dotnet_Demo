import { Component } from '@angular/core';
import { AuthService } from '../../utils/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule]
  
})
export class NavbarComponent {
  username: string | null = null;
 
  constructor(private authService: AuthService) {
    console.log(authService);
   
    this.username = this.authService.getUsername();
  }
  // token: string | null = localStorage.getItem('token');
  // if (token: string) {
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     console.log("TEST",payload);
  //     this.username = payload?.name || payload?.sub || null;
  //   } catch (e) {
  //     console.error('Failed to decode token:', e);
  //   }
  // }

  logout() {
    this.authService.logout();
    location.reload(); // or use router navigation
  }
}