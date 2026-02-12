import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApi } from '../interfaces/iapi';
import { lastValueFrom } from 'rxjs';
import { INinja} from '../interfaces/ininja';

@Injectable({
  providedIn: 'root',
})
export class NinjaService {

  private baseUrl: string = 'http://localhost:8080/api/ninjas';
  private httpClient = inject(HttpClient);

  constructor(){}

  async getAllNinjas( page: number = 1, size: number = 100): Promise<IApi>{ //pongo todos los ninjas para que se pueda ver que crea porque las flechas de mover la paginacion no va
    const response = await lastValueFrom(this.httpClient.get<IApi>(`${this.baseUrl}?page=${page}&size=${size}`));
    return response;
  }

  async getNinjaById(id: number): Promise<INinja>{
    return lastValueFrom(this.httpClient.get<INinja>(this.baseUrl + '/' + id));
  }

  async deleteNinjaById(id: number): Promise<INinja>{
    return lastValueFrom(this.httpClient.delete<INinja>(this.baseUrl + '/' + id));
  }

  async createNinja(ninja: INinja): Promise<INinja>{
    return lastValueFrom(this.httpClient.post<INinja>(this.baseUrl, ninja));
  }

  async updateNinja(ninja: INinja): Promise<INinja> {
    return lastValueFrom(this.httpClient.put<INinja>(`${this.baseUrl}/${ninja.id}`, ninja));
  }

  async deleteNinja(ninja: INinja): Promise<INinja>{
    return lastValueFrom(this.httpClient.delete<INinja>(`${this.baseUrl}/${ninja.id}`));
  }

}
