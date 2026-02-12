import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NinjaService } from '../../services/ninja-service';
import { INinja } from '../../interfaces/ininja';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ninja-card',
  imports: [RouterLink],
  templateUrl: './ninja-card.html',
  styleUrl: './ninja-card.css',
})
export class NinjaCard {

    ninjaService = inject(NinjaService);
    @Input() ninja! : INinja;
    @Output() ninjaDeleted = new EventEmitter<number>;

    async deleteNinja(ninja: INinja){
      const response = await Swal.fire({
      title: '¿Esta seguro?',
      text: `Vas a eliminar a ${ninja.ninjaname}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if(response.isConfirmed){
      try{
        await this.ninjaService.deleteNinjaById(ninja.id);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: `Ninja ${ninja.ninjaname} eliminado.`,
        });

        this.ninjaDeleted.emit(ninja.id);
      } catch(error){
        console.error('Error eliminado ninja:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error eliminado ninja: ${ninja.ninjaname}. Prueba de nuevo más tarde.`,
        });
      }
    }
    }
}
