import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IHeroes } from '../interfaces/iheroes';
import { IApiHeroes } from '../interfaces/iapi-heroes';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroServices {

  private baseUrl: string = 'http://localhost:8080/api/characters';
  private httpClient = inject(HttpClient);

  constructor(){}

  async getAllHeroes(page: number = 0, size: number = 100):Promise<IApiHeroes>{
    const response = await lastValueFrom(this.httpClient.get<IApiHeroes>(`${this.baseUrl}?page=${page}&size=${size}`));
    return response;
  }

  async deleteHeroeById(id: number): Promise<IHeroes>{
    return lastValueFrom(this.httpClient.delete<IHeroes>(this.baseUrl + '/' + id));
  }

  async getHeroeById(id: number): Promise<IHeroes>{
        return lastValueFrom(this.httpClient.get<IHeroes>(this.baseUrl + '/' + id));
  }

  async createHeroe(heroe: IHeroes): Promise<IHeroes> {
    return lastValueFrom(this.httpClient.post<IHeroes>(this.baseUrl, heroe));
  }

  async updateHeroe(heroe: IHeroes): Promise<IHeroes> {
    return lastValueFrom(this.httpClient.put<IHeroes>(`${this.baseUrl}/${heroe.id}`, heroe));
  }

  async deleteHeroe(heroe: IHeroes): Promise<IHeroes> {
    return lastValueFrom(this.httpClient.delete<IHeroes>(`${this.baseUrl}/${heroe.id}`));
  }
}
