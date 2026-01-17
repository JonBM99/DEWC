import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://dummyjson.com/auth/';

  constructor() {}

  login(user: Iuser): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'login', user));
  }
}
