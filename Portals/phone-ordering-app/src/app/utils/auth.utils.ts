import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  name: string; // corresponds to ClaimTypes.Name in .NET
  exp: number;
  iat: number;
}

export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.name || null;
  } catch (err) {
    return null;
  }
}
