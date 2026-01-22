import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://dummyjson.com/auth/login';

  login(user: Iuser): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, user));
  }
}
