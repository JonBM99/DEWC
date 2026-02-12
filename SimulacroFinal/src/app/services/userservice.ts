import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApi } from '../interfaces/iapi';
import { last, lastValueFrom } from 'rxjs';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root',
})
export class Userservice {

  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  constructor() {}

  async getAllUsers(page: number =1): Promise<IApi>{
    const response = await lastValueFrom(this.httpClient.get<IApi>(`${this.baseUrl}?page=${page}`));
    return response;
  }

  async deleteUserById(_id: string): Promise<Iusuario>{
    return lastValueFrom(this.httpClient.delete<Iusuario>(`${this.baseUrl}/${_id}`));
  }

  async getUserById(_id: string): Promise<Iusuario>{
    return lastValueFrom(this.httpClient.get<Iusuario>(this.baseUrl + '/' + _id));
  }

  async createUser(user: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpClient.post<Iusuario>(this.baseUrl, user));
  }

  async updateUser(user: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpClient.put<Iusuario>(`${this.baseUrl}/${user._id}`, user));
  }

  async deleteUser(user: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpClient.delete<Iusuario>(`${this.baseUrl}/${user._id}`));
  }
}
