import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservices {
  constructor() {}

  // Verifica si hay un token en localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Guarda el token al hacer login
  login(token: string): void {
    localStorage.setItem('token', token);
  }

  // Elimina el token al hacer logout
  logout(): void {
    localStorage.removeItem('token');
  }
}
