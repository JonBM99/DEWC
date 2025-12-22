import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Userservices } from '../../services/userservices';
import { IUsers } from '../../interfaces/iusers';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {

  userServices = inject(Userservices);
  @Input() user!: IUsers;
  @Output() userDeleted = new EventEmitter<string>();

  async deleteUser(user: IUsers) {
    const response = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al usuario ${user.first_name} ${user.last_name}. Esta acción no se puede deshacer.`, //Usamos las comillas al reves para poder insertar variables en el texto
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (response.isConfirmed) {
      try {
        await this.userServices.deleteUserById(user._id);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: `El usuario ${user.first_name} ${user.last_name} ha sido eliminado correctamente.`,
        });

        this.userDeleted.emit(user._id);
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ha ocurrido un error al eliminar el usuario ${user.first_name} ${user.last_name}. Por favor, inténtelo de nuevo más tarde.`,
        });
      }
    }
  }
}
