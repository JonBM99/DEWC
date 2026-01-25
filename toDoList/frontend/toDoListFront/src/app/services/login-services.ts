import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ilogin, Iloginresponse } from '../interface/ilogin';
import { lastValueFrom } from 'rxjs';
import { Iregister } from '../interface/iregister';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private baseUrl: string = '/api/auth';

  register(user: Iregister): Promise<Iregister> {
    return lastValueFrom(this.httpClient.post<Iregister>(`${this.baseUrl}/register`, user));
  }

  login(user: Ilogin): Promise<Iloginresponse> {
    return lastValueFrom(this.httpClient.post<Iloginresponse>(`${this.baseUrl}/login`, user));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
