import { IUser } from './../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';
import { IApi } from '../interfaces/iapi';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private baseUrl: string = 'https://peticiones.online/api/users';
  httpClient = inject(HttpClient);

  constructor(){

  }

  async getAllUsers(): Promise<IUser[]>{
    const response = await lastValueFrom(this.httpClient.get<IApi>(this.baseUrl));
    return response.results;
  }

  getById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>('${this.baseUrl}/${_id}'));
  }

  deleteById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>('${this.baseUrl}/${_id}'));
  }

  insertUser(user: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
  }

  updateUser(user: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.put<IUser>('${this.baseUrl}/${user._id}', user));
  }
}
