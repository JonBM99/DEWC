import { Component, inject } from "@angular/core";
import { IHeroes } from "../../interfaces/iheroes";
import { HeroServices } from "../../services/hero-services";
import Swal from "sweetalert2";
import { RouterLink } from "@angular/router";
import { HeroCard } from "../../components/hero-card/hero-card";


@Component({
  selector: 'app-hero-list',
  imports: [RouterLink, HeroCard],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})
export class HeroList {

  arrayHeroes: IHeroes[];
  heroesServices = inject(HeroServices);

  constructor(){
    this.arrayHeroes = [];
  }

  pageActual: number = 0;
  heroesPerPage: number = 100;
  loading: boolean = false;

  async loadHeroes(page: number): Promise<void>{
    this.loading = true;
    try{
      const response = await this.heroesServices.getAllHeroes(page);
      this.arrayHeroes = response.content;
      this.pageActual = response.page;
      this.heroesPerPage = response.size;
    }catch (error){
      console.error('Error cargando heroes', error);
    }finally{
      this.loading = false;
    }
    console.log('Heroes cargados: ', this.arrayHeroes);
  }

  async ngOnInit(): Promise<void>{
    await this.loadHeroes(this.pageActual);
  }

  async onDeleteHeroe(heroeId: number): Promise<void>{
    try{
      await this.heroesServices.deleteHeroeById(heroeId);
      this.arrayHeroes = this.arrayHeroes.filter(heroe => heroe.id !== heroeId);
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Heroe eliminado correctamente.',
      });
    } catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error eliminando heroe, intentelo de nuevo mas tarde.',
      });
      console.log('Error eliminando heroe: ', error)
    }
  }

  //Métodos de navegación de páginas
  goToPage(page: number): void { // Ir a una página específica
    if (page >= 1 && page <= 1) { // Verificamos que la página esté dentro de los límites
      this.loadHeroes(page);
    }
  }

  goOneBack(): void{ // Ir una página atrás
    if(this.pageActual > 1){
      this.loadHeroes(this.pageActual - 1);
    }
  }

  goOneForward(): void{ // Ir una página adelante
    if(this.pageActual < 1){
      this.loadHeroes(this.pageActual + 1);
    }
  }
}
