import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApi } from '../interfaces/iapi';
import { lastValueFrom } from 'rxjs';
import { IUsers } from '../interfaces/iusers';

@Injectable({
  providedIn: 'root',
})

export class Userservices {

  private baseUrl: string = 'https://peticiones.online/api/users';
  httpClient = inject(HttpClient);

  constructor() { }

  async getAllUsers(page: number = 1): Promise<IApi>{ //Pedimos todos los usuarios de una pagina
    const response = await lastValueFrom(this.httpClient.get<IApi>(`${this.baseUrl}?page=${page}`));
    return response;  //Ahora devuelvo el Iapi como tal, no solo los usuarios con el results
  }

  async deleteUserById(_id: string): Promise<IUsers> { //Eliminamos un usuario por su id
    return lastValueFrom(this.httpClient.delete<IUsers>(`${this.baseUrl}/${_id}`));
  }

  async getUserById(_id: string): Promise<IUsers> { //Obtenemos un usuario por su id
    return lastValueFrom(this.httpClient.get<IUsers>(this.baseUrl + '/' + _id)); //esta es la otra forma de pedir con la url
  }

  async createUser(user: IUsers): Promise<IUsers> { //Creamos un usuario
    return lastValueFrom(this.httpClient.post<IUsers>(this.baseUrl, user));
  }

  async updateUser(user: IUsers): Promise<IUsers> { //Actualizamos un usuario
    return lastValueFrom(this.httpClient.put<IUsers>(`${this.baseUrl}/${user._id}`, user));
  }

  async deleteUser(user: IUsers): Promise<IUsers> { //Eliminamos un usuario
    return lastValueFrom(this.httpClient.delete<IUsers>(`${this.baseUrl}/${user._id}`));
  }
}
