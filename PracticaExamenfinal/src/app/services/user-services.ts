import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://dummyjson.com/auth/login';

  login(user: IUser): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, user));
  }
}
