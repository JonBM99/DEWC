import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IApi } from '../interfaces/iapi';
import { Iheroe } from '../interfaces/iheroe';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private baseUrl = 'http://localhost:8080/api/characters';

  constructor(private http: HttpClient) {}

  // GET /api/characters - Con paginación
  getAllCharacters(page: number = 0, size: number = 10, sortBy: string = 'id'): Promise<IApi> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);

    return lastValueFrom(
      this.http.get<IApi>(`${this.baseUrl}`, { params })
    );
  }

  // GET /api/characters/{id}
  getCharacterById(id: number): Promise<Iheroe> {
    return lastValueFrom(
      this.http.get<Iheroe>(`${this.baseUrl}/${id}`)
    );
  }

  // GET /api/characters/search?q=
  searchCharacters(query: string): Promise<Iheroe[]> {
    const params = new HttpParams().set('q', query);
    return lastValueFrom(
      this.http.get<Iheroe[]>(`${this.baseUrl}/search`, { params })
    );
  }

  // GET /api/characters/alignment/{alignment}
  getCharactersByAlignment(
    alignment: string,
    page: number = 0,
    size: number = 10
  ): Promise<IApi> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return lastValueFrom(
      this.http.get<IApi>(`${this.baseUrl}/alignment/${alignment}`, { params })
    );
  }

  // GET /api/characters/publisher/{publisher}
  getCharactersByPublisher(publisher: string): Promise<Iheroe[]> {
    return lastValueFrom(
      this.http.get<Iheroe[]>(`${this.baseUrl}/publisher/${publisher}`)
    );
  }

  // POST /api/characters
  createCharacter(character: Iheroe): Promise<Iheroe> {
    return lastValueFrom(
      this.http.post<Iheroe>(`${this.baseUrl}`, character)
    );
  }

  // PUT /api/characters/{id}
  updateCharacter(id: number, character: Iheroe): Promise<Iheroe> {
    return lastValueFrom(
      this.http.put<Iheroe>(`${this.baseUrl}/${id}`, character)
    );
  }

  // DELETE /api/characters/{id}
  deleteCharacter(id: number): Promise<void> {
    return lastValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${id}`)
    );
  }
}
