import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { HeroServices } from '../../services/hero-services';
import { IHeroes } from '../../interfaces/iheroes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  imports: [RouterLink],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.css',
})
export class HeroCard {

  heroServices = inject(HeroServices);
  @Input() heroe!: IHeroes;
  @Output() heroeDeleted = new EventEmitter<string>();

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
        await this.heroServices.deleteHeroeById(heroe.id);
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
