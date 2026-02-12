import { Component, inject } from '@angular/core';
import { NinjaCard } from "../../components/ninja-card/ninja-card";
import { RouterLink } from '@angular/router';
import { INinja } from '../../interfaces/ininja';
import { NinjaService } from '../../services/ninja-service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-ninjas-list',
  imports: [NinjaCard, RouterLink],
  templateUrl: './ninjas-list.html',
  styleUrl: './ninjas-list.css',
})
export class NinjasList {

  arrayNinjas: INinja[];
  ninjaService = inject(NinjaService);
  httpClient = inject(HttpClient);

  constructor(){
    this.arrayNinjas = [];
  }

  page: number = 0;
  size: number = 0;
  total_pages: number = 0;
  loading: boolean = false;

  async loadNinjas(size: number): Promise<void>{
    this.loading = true;
    try {
      const response = await this.ninjaService.getAllNinjas(size);
      this.arrayNinjas = response.content;
      this.page = response.page;
      this.size = response.size;
      this.total_pages = 5;
    } catch(error){
      console.error('Error al cargar ninjas:', error);
    } finally {
      this.loading = false;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadNinjas(this.page);
  }

  async onDeleteNinja(ninjaId: number): Promise<void> {
    try {
      await this.ninjaService.deleteNinjaById(ninjaId);
      this.arrayNinjas = this.arrayNinjas.filter(ninja => ninja.id !== ninjaId);
      if(this.arrayNinjas.length === 1 && this.page > 0){
        await this.loadNinjas(this.page - 1);
      }
      if(this.arrayNinjas.length === 1 && this.page === 0){
        await this.loadNinjas(this.page);
      }
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Ninja correctamente eliminado.',
      });
    } catch(error){
      console.error('Error al eliminar ninja:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fallo al eliminar ninja.',
      });
    }
  }

  goOneBack(): void{ // Ir una página atrás
    if(this.page > 0){
      this.loadNinjas(this.page - 1);
    }
  }

  goOneForward(): void{ // Ir una página adelante
    if(this.page < this.total_pages){
      this.loadNinjas(this.page + 1);
    }
  }
}
