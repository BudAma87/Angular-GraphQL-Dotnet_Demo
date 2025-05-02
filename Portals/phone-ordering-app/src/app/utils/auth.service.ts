import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  name?: string;
  sub?: string;
  exp?: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.name || decoded.sub || null;
    } catch (err) {
      console.error('Token decode error:', err);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
