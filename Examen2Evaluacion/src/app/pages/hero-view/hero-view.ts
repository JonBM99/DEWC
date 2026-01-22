import { HeroServices } from './../../services/hero-services';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { IHeroes } from '../../interfaces/iheroes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-view',
  imports: [RouterLink],
  templateUrl: './hero-view.html',
  styleUrl: './hero-view.css',
})
export class HeroView {

  heroe!: IHeroes;
  heroesService = inject(HeroServices);
  activatedRoute = inject(ActivatedRoute);
  heroeDeleted: any;
  constructor(){}

  ngOnInit():void{
    this.activatedRoute.params.subscribe(async(params:any) =>{
      let id = params.id;
      if(id != undefined){
        let response = await this.heroesService.getHeroeById(id);
        if(response != undefined){
          this.heroe = response;
        }
      }
    })
  }

  async deleteHeroe(heroe: IHeroes){
      const response = await Swal.fire({
        title: 'Estas seguro?',
        text: `Vas a eliminar al heroe ${heroe.heroname}. No puedes deshacer esta accion.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Canelar'
      });
      if(response.isConfirmed){
        try{
          await this.heroesService.deleteHeroeById(heroe.id);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: `Heroe ${heroe.heroname} eliminado.`,
          });

          this.heroeDeleted.emit(heroe.heroname);
        } catch (error) {
          console.error('Error eliminado al heroe:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `ha ocurrido un error cuando eliminabamos al heroe: ${heroe.heroname}. Intentalo de nuevo mas tarde.`,
          });
        }
      }
    }
}
