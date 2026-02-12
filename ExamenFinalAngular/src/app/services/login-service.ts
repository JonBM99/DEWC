import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private httpClient=inject(HttpClient);
  private baseUrl ='http://localhost:8080/api/login';

  login(user:IUser):Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, user));
  }
}
